//Preview records from a database view in a grid/listbox
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Implement auto-execute option: execute the current (or first) row on each load/reload
//X- Should be able to reset to default column specs
//- If up/down button takes selection off screen, adjust to show highlighted record
//- An initial load should respect existing sort fields, and the autoexecute flag
//- Reload should retain sort fields
//- Display the number of loaded records
//- Retain previous scroll position after reload
//- Allow calling actions with multiple record keys
//- 
//- Sorting:
//-  Initial sort order comes from wyseman, apply to indicators
//- 
//- Make menu module use toggled field correctly (instead of call function)
//- Toggle display of footers
//- Can disable reload on sort controls
//- Implement maximum rows to fetch parameter in menu settings
//- 
<template>
  <div class="wylib wylib-dbp">
    <div ref="header" class="header">
      <wylib-menudock :config="dockConfig" :state="state.dock" :lang="wm.dbpMenu"/>
      <div class="headerfill"/>
    </div>
    <div class="subwindows">
      <wylib-win v-if="this.editPosts" :state="state.edit" topLevel=true @close="state.edit.posted=false">
        <wylib-dbe :state="state.edit.client" @modified="modified" :bus="dbeBus" :master="master"/>
      </wylib-win>
      <wylib-win :state="state.colMenu" @close="state.colMenu.posted=false">
        <wylib-menu :state="state.colMenu.client" :config="colMenuConfig" :lang="wm.dbpColumn" @done="state.colMenu.posted=false"/>
      </wylib-win>
      <wylib-win v-if="this.filtPosts" :state="state.filter" topLevel=true @close="state.filter.posted=false">
        <wylib-dbs :fields="logicFields" :state="state.filter.client" :bus="dbsBus" @search="search" @default="dbsDefault"/>
      </wylib-win>
    </div>
    <wylib-mlb ref="mlb" :state="state.grid" :data="gridData" :config="mlbConfig" @execute="executeRows" @headerMenu="colMenuHandler" @sort="sort" @geometry="geometry" :bus="mlbBus"/>
  </div>
</template>

<script>
import Com from './common.js'
import Bus from './bus.js'
import Wyseman from './wyseman.js'
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
  },
  data() { return {
    pr:		require('./prefs'),
    wm:		{},
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
    id: function() {return 'dbp_' + this._uid + '_'},
    stateTpt:	function() {return {
      dock: {}, loaded: 0, autoLoad:true, lastLoad: {}, colMenu: {x: 100, y:0},
      edit: {posted: false, x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: this.pr.winInitHeight, client: {dbView: this.state.dbView}},
      filter: {posted: false, x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: 120, client: {}},
      grid: {footerOn: false, sorting: {}, columns: []}
    }},
    logicFields: function() {
      let flds = []
      for (let key in this.mlbConfig) {
        let conf = this.mlbConfig[key]
        flds.push({tag: key, title: conf.title, help: key+"\n"+conf.help})
      }
      return flds.sort((a,b) => {return (a.title > b.title) ? 1 : -1})
    },
    dockConfig: function() { return [
      {idx: 'lod', lang: this.wm.dbpLoad,     call: ev=>this.load(),   icon: 'download',  shortcut: true},
      {idx: 'all', lang: this.wm.dbpLoadAll,  call: this.loadAll,      icon: 'download2'},
      {idx: 'rld', lang: this.wm.dbpReload,   call: ev=>this.reload(), icon: 'spinner',   shortcut: true},
      {idx: 'clr', lang: this.wm.dbpClear,    call: ev=>this.clear(),  icon: 'sun'},
      {idx: 'fil', lang: this.wm.dbpFilter,   call: this.loadBy,       icon: 'filter',    shortcut: true, toggled: this.state.filter.posted},
      {idx: 'edi', lang: this.wm.dbe,         call: this.editTog,      icon: 'pencil',    shortcut: true, toggled: this.state.edit.posted},
      {idx: 'ald', lang: this.wm.dbpAutoLoad, call: this.autoTog,      icon: 'truck',	  type: 'checkbox', toggled: this.state.autoLoad, input: this.autoLoadValue},
      {idx: 'prv', lang: this.wm.dbpPrev,     call: this.prev,         icon: 'arrowup',   shortcut: true},
      {idx: 'nxt', lang: this.wm.dbpNext,     call: this.next,         icon: 'arrowdown', shortcut: true},
      {idx: 'dec', lang: this.wm.dbpDefault,  call: this.defColumns,   icon: 'sun'},
//      {idx: 'tst', lang: {title: 'T', help: 'H'}, call: this.test, icon:'circle', shortcut: true},
      {idx: 'cvi', lang: this.wm.dbpVisible, icon:'eye', menu: this.visibleMenu},
    ]},
    visibleMenu: function() { 
      let items = [], conf = this.mlbConfig
//console.log("Visible:", this.state.dbView)
      Object.keys(this.mlbConfig).sort((a,b)=>{return conf[a].title < conf[b].title ? -1 : 1}).forEach(key=>{
        let col = this.state.grid.columns.find(e => (e.field == key))
        items.push({idx: key, lang:{title: conf[key].title, help: key+'\n'+conf[key].help}, type: 'checkbox', input: (v)=>{
//console.log("inp:", key, v, col.visible)
          if (v != null && col) {col.visible = v}
          return col ? col.visible : null
        }})
      })
      return items
    },
    colMenuConfig: function() {return [
      {idx: 'siz', lang: this.wm.dbpColAuto, call: this.autoSize, icon:'width'},
      {idx: 'hid', lang: this.wm.dbpColHide, call: this.hideColumn, icon:'eyeblock'},
    ]},
    headerHeight: function() {
      return this.pr.winFullHeader - 1		//Fit in parent header, plus top border
    },

    mlbConfig: function() {			//Make the column description format mlb expects
      let colConfigs = {}, foundDisplay = false
//console.log("mlbConfig:", this.viewMeta)
      if (this.viewMeta) this.viewMeta.columns.forEach((meta) => {		//For each column element
        let defWidth
          , key = meta.col
        if (meta.styles && ('size' in meta.styles) && meta.styles.size) {
          defWidth = meta.styles.size.split(' ')[0] * this.pr.mlbCharWidth
        }
        if ('display' in meta.styles) foundDisplay = true
        let config = {
          field:	key,
          title:	meta.title || key,
          help:		meta.help,
          order:	parseInt(meta.styles.display || 9999),
          just:		meta.type.match(/(int|float)[0-9]/) ? 'right' : 'left',
          width:	defWidth ? (defWidth <= this.pr.mlbMaxWidth ? defWidth : this.pr.mlbMaxWidth) : this.pr.mlbDefWidth,
          visible:	('display' in meta.styles) ? !!parseInt(meta.styles.display) : false,
        }
//console.log("Width:", meta.styles.size, config.field, defWidth, config.width)
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

    load(spec) {
      if (!spec) {
        if (this.viewMeta.styles && this.viewMeta.styles.where)
          spec = {where: this.viewMeta.styles.where}
      }
console.log("Dbp load:", this.state.dbView, spec, this.viewMeta)
      Wyseman.request('dbp_'+this._uid, 'select', Object.assign({view: this.state.dbView, fields: '*'}, spec), (data, err) => {
//console.log("  data:", data)
        if (err) this.top().error(err); else this.gridData = data
        if (this.state.edit.posted && this.state.autoLoad) this.executeRows()
      })
      if (spec) this.state.lastLoad = spec
    },
    reload(spec) {
console.log("Dbp reload:", this.state.dbView, this.state.lastLoad, spec)
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
console.log("Dbp defColumns:", key, col)
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
        let title = (this.wm.dbp ? this.wm.dbp.title : '') + ': ' + data.title
        this.$parent.$emit('customize', {title, help: this.state.dbView+':\n'+data.help}, 'dbp:'+this.state.dbView)
      })
    },
    followMaster() {		//Register which view we are dealing with
      let { view, values, keys } = this.master
        , hisCols = keys.join(',')
        , keyLink = this.viewMeta.fkeys.find(el=>(el.table == view && el.foreign.join(',') == hisCols))
//console.log("Got command from master dbe:", view, hisCols, this.master, keyLink)
//    this.viewMeta.fkeys.forEach(el=>{if (el.table == 'mychips.users_v') console.log("  el:", el.table, el.foreign.join(','))})
      if (keyLink) {
        let where = {}
        keyLink.columns.forEach((key,idx)=>{where[key] = values[idx]})
//console.log("  where:", where)
        this.load({where})
      }
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
    Wyseman.register(this.id+'wm', 'wylib.data', (data, err) => {
      if (data.msg) this.wm = data.msg
    })
    this.metaListen()
  },

  beforeMount: function() {
//console.log("Dbp before, state: ", JSON.stringify(this.state, null, 2))
    if (this.bus) this.bus.register(this.id, (msg) => {		//Respond to commands from a master dbe
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
    this.$parent.$emit('swallow', this.$refs['header'])
//console.log('Dbp mounted state:', this.id, this.state)
    this.$nextTick(() => {
      if (this.state.edit && this.state.edit.posted) this.editPosts = 1		//What was posted before we quit
      if (this.state.filter && this.state.filter.posted) this.filtPosts = 1
//console.log('Was loaded, reload?', this.id, this.state.loaded, this.state.lastLoad)
      if (this.state.loaded > 0)		//If state says we had data loaded before, reload now
        this.reload()
      else if (this.bus)
        this.followMaster()
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
    width: 100%;	//Fixme: prefs
    height: 1.4em;	//Fixme: prefs
    display: flex;
//    border: 1px solid green;
  }
  .wylib-dbp .header wylib-menudock {
    flex: 0 0 auto;
  }
  .wylib-dbp .header .headerfill {
    flex: 1 1 auto;
  }
</style>
