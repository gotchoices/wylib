//Preview records from a database view in a grid/listbox
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Initial sort order comes from wyseman, apply to indicators
//- If up/down button takes selection off screen, adjust to show highlighted record
//- Retain previous scroll position after reload
//- Allow calling view actions with multiple record keys
//- 
//- Make menu module use toggled field correctly (instead of call function)
//- Display summaries in footer
//- Can disable reload on sort controls
//- Implement maximum rows to fetch parameter in menu settings
//- 
<template>
  <div class="wylib wylib-dbp">
    <div class="header">
      <wylib-menudock ref="headMenu" :config="dockConfig" :state="state.dock" :env="env" :lang="wm.dbpMenu"/>
      <div class="headerfill"/>
      <div ref="headStatus" class="wylib-dbp headstatus" :title="wm.h.dbpLoaded">#:<input disabled :value="state.loaded" :size="loadedSize"/></div>
    </div>
    <div class="subwindows">
      <wylib-win :state="state.colMenu" :env="env" @close="state.colMenu.posted=false">
        <wylib-menu :state="state.colMenu.client" :env="env" :config="colMenuConfig" :lang="wm.dbpColumn" @done="state.colMenu.posted=false"/>
      </wylib-win>
      <wylib-win v-if="this.editPosts" :state="state.edit" topLevel=true @close="state.edit.posted=false" :env="env">
        <wylib-dbe :state="state.edit.client" :env="env" @modified="modified" :bus="dbeBus" :master="master"/>
      </wylib-win>
      <wylib-win v-if="this.filtPosts" :state="state.filter" :env="env" topLevel=true @close="state.filter.posted=false">
        <wylib-dbs :fields="logicFields" :state="state.filter.client" :env="env" :bus="dbsBus" @search="search" @default="dbsDefault"/>
      </wylib-win>
    </div>
    <wylib-mlb ref="mlb" :state="state.grid" :env="env" :data="gridData" :config="mlbConfig" @execute="executeRows" @headerMenu="colMenuHandler" @sort="sort" @geometry="geometry" :bus="mlbBus"/>
  </div>
</template>

<script>
const Bus = require('./bus.js')
const Com = require('./common.js')
const Wyseman = require('./wyseman.js')
const FileSaver = require('file-saver')
import Menu from './menu.vue'
import MenuDock from './menudock.vue'
import Mlb from './mlb.vue'
import Dbs from './dbs.vue'

export default {
  name: 'wylib-dbp',
  components: {'wylib-mlb': Mlb, 'wylib-menudock': MenuDock, 'wylib-menu': Menu, 'wylib-dbs': Dbs},
  props: {
    state:	{type: Object, default: () => ({})},
    autoEdit:	{type: Boolean, default: true},
    bus:	null,				//My master dbe, if any
    master:	null,				//Current key info of my master, if any
    env:	{type: Object, default: Com.envTpt},
  },
  data() { return {
    viewMeta:	null,
    gridData:	[],
    lastMenu:	null,
    mlbBus:	new Bus.messageBus(this),
    dbeBus:	new Bus.messageBus(this),
    dbsBus:	new Bus.messageBus(this),
    lastView:	null,
    editPosts:	0,			//Don't instantiate until we've posted once
    filtPosts:	0,
  }},
  inject: ['top'],

  computed: {
    id() {return 'dbp_' + this._uid + '_'},
    wm() {return this.env.wm},
    pr() {return this.env.pr},
    stateTpt() {return {
      dock: {}, loaded: 0, autoLoad:false, lastLoad: {}, colMenu: {x: 100, y:0},
      edit: {posted: false, x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: this.pr.winInitHeight, client: {dbView: this.state.dbView}},
      filter: {posted: false, x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: 120, client: {}},
      grid: {footerOn: false, sorting: {}, columns: []}
    }},
    logicFields() {
      let flds = []
      for (let key in this.mlbConfig) {
        let conf = this.mlbConfig[key]
        flds.push({tag: key, title: conf.title, help: key+"\n"+conf.help})
      }
      return flds.sort((a,b) => {return (a.title > b.title) ? 1 : -1})
    },
    loadedSize() {
      let len = 3
      if (this.loaded) len = this.loaded.length > 8 ? 8 : this.loaded.length
      return len
    },
    dockConfig() { return [
      {idx: 'lod', lang: this.wm.dbpLoad,     call: ev=>this.load(),   icon: 'download',  shortcut: true},
      {idx: 'all', lang: this.wm.dbpLoadAll,  call: this.loadAll,      icon: 'download2'},
      {idx: 'rld', lang: this.wm.dbpReload,   call: ev=>this.reload(), icon: 'spinner',   shortcut: true},
      {idx: 'clr', lang: this.wm.dbpClear,    call: ev=>this.clear(),  icon: 'sun'},
      {idx: 'fil', lang: this.wm.dbpFilter,   call: this.loadBy,       icon: 'filter',    shortcut: true, toggled: this.state.filter.posted},
      {idx: 'edi', lang: this.wm.dbe,         call: this.editTog,      icon: 'pencil',    shortcut: true, toggled: this.state.edit.posted},
      {idx: 'ald', lang: this.wm.dbpAutoLoad, call: this.autoTog,      icon: 'truck',	  type: 'checkbox', toggled: this.state.autoLoad, input: this.autoLoadValue},
      {idx: 'sum', lang: this.wm.dbpShowSum,  call: this.sumTog,       icon: 'circle',	  type: 'checkbox', toggled: this.state.showSum, input: this.showSumValue},
      {idx: 'exp', lang: this.wm.dbpExport,   call: this.export,       icon: 'boxout'},
      {idx: 'prv', lang: this.wm.dbpPrev,     call: this.prev,         icon: 'arrowup',   shortcut: true},
      {idx: 'nxt', lang: this.wm.dbpNext,     call: this.next,         icon: 'arrowdown', shortcut: true},
      {idx: 'dec', lang: this.wm.dbpDefault,  call: this.defColumns,   icon: 'sun'},
//      {idx: 'tst', lang: {title: 'T', help: 'H'}, call: this.test, icon:'circle', shortcut: true},
      {idx: 'cvi', lang: this.wm.dbpVisible, icon:'eye', menu: this.visibleMenu},
    ]},
    visibleMenu() { 
      let items = [], conf = this.mlbConfig
//console.log("Visible:", this.state.dbView, this.state.grid)
      Object.keys(this.mlbConfig).sort((a,b)=>{return conf[a].title < conf[b].title ? -1 : 1}).forEach(key=>{
        let col = this.state.grid?.columns?.find(e => (e.field == key))
        if (col) items.push({idx: key, lang:{title: conf[key].title, help: key+'\n'+conf[key].help}, type: 'checkbox', input: (v)=>{
          if (v != null && col) {		//console.log("inp:", key, v, col.visible)
            col.visible = v
          }
          return col?.visible
        }})
      })
      return items
    },
    colMenuConfig() {return [
      {idx: 'siz', lang: this.wm.dbpColAuto, call: this.autoSize, icon:'width'},
      {idx: 'hid', lang: this.wm.dbpColHide, call: this.hideColumn, icon:'eyeblock'},
    ]},
    headerHeight() {
      return this.pr.winFullHeader - 1		//Fit in parent header, plus top border
    },

    mlbConfig() {				//Make the column description format mlb expects
      let colConfigs = {}, foundDisplay = false
//console.log("mlbConfig:", this.state.dbView, this.viewMeta)
      if (this.viewMeta) this.viewMeta.columns.forEach((meta) => {		//For each column element
        let defWidth
          , key = meta.col
        if (meta?.styles?.size) {
          let size = meta.styles.size		//console.log('size:', meta?.styles?.size)
          defWidth = (size.x ?? size) * this.pr.mlbCharWidth
        }
        if (meta.styles && 'display' in meta.styles) foundDisplay = true
        let config = {
          field:	key,
          title:	meta.title || key,
          help:		meta.help,
          order:	parseInt(meta.styles.display || 9999),
          just:		meta.type.match(/(int|float)[0-9]/) ? 'right' : 'left',
          width:	defWidth ? (defWidth <= this.pr.mlbMaxWidth ? defWidth : this.pr.mlbMaxWidth) : this.pr.mlbDefWidth,
          visible:	('display' in meta.styles) ? !!parseInt(meta.styles.display) : false,
        }
//console.log("  width:", key, meta.styles.size, "d:", defWidth, "->", config.width)
        colConfigs[key] = config
      })
//console.log("colConfigs:", colConfigs)
      if (!foundDisplay) Object.keys(colConfigs).forEach(key=>{colConfigs[key].visible = true})		//If no display data, display them all
      return colConfigs
    },
  },

  methods: {
//    test() {
//console.log("Test!", this.top)
//      this.top().confirm('A test message', (tag) => {
//console.log("Modal answers:", tag)
//      })
//    },
    autoTog(ev) {				//Toggle auto loading mode
      this.state.autoLoad = !this.state.autoLoad
    },
    autoLoadValue(v) {				//Set/get autoload value
      if (v != null) this.state.autoLoad = v
      return this.state.autoLoad
    },
    sumTog(ev) {				//Toggle column summaries
      this.state.showSum = !this.state.showSum
    },
    showSumValue(v) {				//Set/get showSumm value
      if (v != null) this.state.grid.footerOn = this.state.showSum = v
      return this.state.showSum
    },
    editTog(ev) {				//Toggle the editing window
      this.state.edit.posted = !this.state.edit.posted
      if (this.state.edit.posted) {
//        this.editPosts++
        this.executeRows()
      }
    },
    advance(delta=1) {this.mlbBus.notify('advance', delta)},
    next(ev) {this.advance(1)},
    prev(ev) {this.advance(-1)},

    executeRows(selection) {
      if (!selection) selection = this.$refs.mlb.getSelection()
//console.log("Dbp execute rows: ", selection, this.viewMeta.pkey)
      if (selection.length <= 0) return
      if (!this.viewMeta || !this.viewMeta.pkey) {this.top().error(this.wm.dbpNoPkey); return}
      let idx = selection[0]
        , row = this.gridData[idx]
        , keyVal = []
      if (row) this.viewMeta.pkey.forEach(fld => {
        keyVal.push(row[fld])
      })
//console.log("   row: ", row, keyVal)
      if (row && this.autoEdit) {
        this.state.edit.posted = true
//        this.editPosts++
        this.$nextTick(()=>{this.dbeBus.notify('load', keyVal)})
      } else this.$emit('execute', row, this.viewMeta.pkey, keyVal)
    },

    selectWhere(selection) {		//Generate new where-clause based on selected records
      if (!selection) selection = this.$refs.mlb.getSelection()
      if (!this.viewMeta || !this.viewMeta.pkey) return 'false'
      let keys=[]
        , left = this.viewMeta.pkey
        , oldWhere = this.state.lastLoad.where
      if (selection.length <= 0 || selection.length >= this.state.loaded)
        return oldWhere			//Including all loaded records
console.log("selectWhere: ", this.viewMeta, oldWhere, left)
      selection.forEach(idx=>{
        let row = this.gridData[idx]
          , keyVal = left.map(el=>(row[el]))
        keys.push(keyVal)
      })
      let thisWhere = {left, oper: 'in', entry: keys}
console.log("  in (" + keys.join(',') + ')')
      if (oldWhere)
        return {and:true, items: [oldWhere, thisWhere]}
      return thisWhere
    },

    load(spec) {
      if (!spec) {
        if (this.viewMeta.styles && this.viewMeta.styles.where)
          spec = {where: this.viewMeta.styles.where}
      }
//console.log("Dbp load:", this.state.dbView, spec, this.viewMeta)
      Wyseman.request('dbp_'+this._uid, 'select', Object.assign({view: this.state.dbView, fields: '*'}, spec), (data, err) => {
//console.log("  data:", data)
        if (err) this.top().error(err); else this.gridData = data
        if (this.state.edit.posted && this.state.autoLoad) this.executeRows()
      })
      if (spec) this.state.lastLoad = spec
    },
    reload(spec) {
//console.log("Dbp reload:", this.state.dbView, this.state.lastLoad, spec)
      this.load(Object.assign(this.state.lastLoad, spec))
    },
    loadAll(ev) {
      this.load({where: null})
    },
    clear() {
      this.gridData = []
    },
    
    modified(data) {this.reload()},		//On signal from dbe
    sort(cols) {
//console.log("Dbp sort:", cols)
      this.reload(cols ? {order: cols.reverse()} : null)
    },
    search(where) {
      this.reload({where})
    },
    dbsDefault() {
//console.log("Dbp default logic:")
      if (this.viewMeta.styles && this.viewMeta.styles.where)
        this.dbsBus.notify('load', Com.clone(this.viewMeta.styles.where))
    },

    loadBy() {
      this.state.filter.posted = !this.state.filter.posted
    },

    colMenuHandler(e, index, x, y) {
//console.log("Menu handler:", index, x, y)
      if (index != this.lastMenu) {
        this.state.colMenu.posted = true
      } else {
        this.state.colMenu.posted = !this.state.colMenu.posted
      }
      if (this.state.colMenu.posted) {
        this.state.colMenu.x = x - 10
        this.state.colMenu.y = y
      }
      this.lastMenu = index
    },

    autoSize() {
      let col = this.state.grid.columns.find(e => (e.field == this.lastMenu))
//console.log("Auto size:", this.lastMenu, "Col:", col)
      this.mlbBus.notify('autosize', col.field)
    },
    hideColumn() {
      let col = this.state.grid.columns.find(e => (e.field == this.lastMenu))
//console.log("Hide:", this.lastMenu, "Col:", col)
      if (col) col.visible = false
    },
    defColumns(ev) {
      for (let key in this.mlbConfig) {
        let conf = this.mlbConfig[key]
          , col = this.state.grid.columns.find(e => (e.field == key))
//console.log("Dbp defColumns:", key, col)
        col.visible = conf.visible
        col.order = conf.order
        col.width = conf.width
      }
    },
    geometry(ev) {
//console.log("Geometry changed:", top, ev)
      this.top().emit('geometry', ev)
    },
    hideCol() {
      let col = this.state.grid.columns.find(e => (e.field == this.lastMenu))
//console.log("Hide Column:", this.lastMenu, "Col:", col)
      col.visible = false
    },

    metaListen() {		//Register which view we are dealing with
      let zid = this.id+'cv'
      if (this.lastView) Wyseman.register(zid, this.lastView)		//Un-register
      if (this.state.dbView) Wyseman.register(this.id+'cv', this.state.dbView, (data, err) => {
        if (err) {this.top().error(err); return}
//console.log("Dbp got metadata for:", this.state.dbView, data)
        this.viewMeta = data
        let title = (this.wm.t.dbp || '') + ': ' + data.title
        this.$parent.$emit('customize', {title, help: this.state.dbView+':\n'+data.help}, 'dbp:'+this.state.dbView)
      })
    },
    followMaster() {		//Handle a load request from a master dbe
      let { view, keys } = this.master
        , hisPKey = keys.join(',')
        , fKeyLinks = this.viewMeta.fkeys.filter(el => (el.table == view))
        , fKeyLink = (fKeyLinks && fKeyLinks.length == 1) ? fKeyLinks[0] : fKeyLinks.find(el => (el.foreign.join('.') == hisPKey))
//console.log("Got load from master dbe:", this.state.dbView, "h:", hisPKey, "m:", this.master, "fks:", fKeyLinks, "l:", JSON.stringify(fKeyLink))
//this.viewMeta.fkeys.forEach(el=>{if (el.table == view) console.log("  el:", el.table, el.foreign.join(','))})

      if (fKeyLink) {
        let where = {}
        fKeyLink.columns.forEach((key,idx) => {
          let fKeyField = fKeyLink.foreign[idx]
            , fValue = this.master.get(fKeyField)
//console.log("  w:", key, fKeyField, fValue)
          where[key] = fValue
        })
//console.log("  where:", where)
        this.load({where})
      }
    },

    export() {				//Export selected records
      let resp = {file: (this.viewMeta.title || this.state.dbView || 'Document') + '.json'}
        , dews = [
            {field:'file', lang:this.wm.dbpExportAsk, styles:{focus:true}},
            {field:'pretty', lang:this.wm.dbpExportFmt, styles:{input:'chk'}}]
//console.log("Meta:", this.viewMeta)
      this.top().query('!dbpExportAsk', dews, resp, (ans) => {
        if (ans == 'diaYes' && resp.file) {
          let selects = this.$refs.mlb.getSelection()
            , where = this.selectWhere()
            , spec = {view: this.state.dbView, fields: 'json', where}
            , tag = (this.viewMeta.styles ? this.viewMeta.styles.export : null) || this.viewMeta.obj	//Identifies the record type on export
//console.log("Export:", resp.file, selects, where)
           
          Wyseman.request('dbp_x_'+this._uid, 'select', spec, (data, err) => {
//console.log("  err:", err, " data:", data)
            if (err) {this.top().error(err); return}
            let expData = data.map(el=>({[tag]:el.json}))
              , blob = new Blob([JSON.stringify(expData,null,resp.pretty?2:null)], {type: "text/plain;charset=utf-8"})
            FileSaver.saveAs(blob, resp.file)
//console.log(" to file:", resp.file, expData)
          })
        }
      })
    },

  },

  watch: {
    'state.edit.posted': function(newVal, oldVal) {
      if (!oldVal && newVal) this.editPosts++
    },
    'state.filter.posted': function(newVal, oldVal) {
//console.log("filter (de)posted:", newVal)
      if (!oldVal && newVal) this.filtPosts++
    },
    'state.dbView': function(newVal, oldVal) {		//If we change our view, reset data, columns
//console.log("Dbp dbView changed!")
      this.gridData = []
      this.viewMeta = null
      if (newVal != oldVal) this.metaListen()
    },
    gridData: function() {
      this.state.loaded = this.gridData ? this.gridData.length : 0
//console.log("Dbp gridData changed:", this.state.loaded)
    },
  },

  beforeCreate: function() {
    this.$options.components['wylib-dbe'] = require('./dbe.vue').default
    this.$options.components['wylib-win'] = require('./win.vue').default
  },

  created: function() {
//    Wyseman.register(this.id+'wm', 'wylib.data', (data, err) => {
//      if (data.msg) this.wm = data.msg
//    })
    this.metaListen()
  },

  beforeMount: function() {
//console.log("Dbp before, state: ", JSON.stringify(this.state, null, 2))
    if (this.bus) this.bus.register(this.id, (msg) => {		//Respond to commands from a master dbe
//console.log("Dbp got from master: ", msg)
      if (msg == 'clear') {
        this.clear()
      } else if (msg == 'load') {
        this.followMaster()
      }
    })
    Com.stateCheck(this)
//console.log("Dbp after, state: ", this.state)
  },

  mounted: function() {
    this.$parent.$emit('swallow', this.$refs['headMenu'], this.$refs['headStatus'])
//console.log('Dbp mounted state:', this.id, this.state)
    this.$nextTick(() => {
      if (this.state.edit && this.state.edit.posted) this.editPosts = 1		//What was posted before we quit
      if (this.state.filter && this.state.filter.posted) this.filtPosts = 1
//console.log('Was loaded, reload?', this.id, this.state.loaded, this.state.lastLoad)
      if (this.state.loaded > 0)		//If state says we had data loaded before, reload now
        this.reload()
//      else if (this.bus)			//Too early, master not yet loaded
//        this.followMaster()
    })
  },

//  beforeDestroy: function() {
//console.log('Dbp about to die:', this.state)
//  }
}
</script>

<style lang='less'>
  .wylib-dbp {
//    border: 1px solid blue;
    height: 100%;
  }
  .wylib-dbp > .header {
    background: linear-gradient(to top, #c0c0c0, #e0e0e0);	//Fixme: prefs
    width: 100%;
//    height: 1.4em;	//Fixme: prefs
    display: flex;
//    border: 1px solid green;
  }
  .wylib-dbp .header wylib-menudock {
    flex: 0 0 auto;
  }
  .wylib-dbp .header .headerfill {
    flex: 1 1 auto;
  }
  .wylib-dbp.headstatus {
    flex: 0 0 auto;
    white-space: nowrap;
    display: flex;
    align-items: flex-end;
  }
</style>
