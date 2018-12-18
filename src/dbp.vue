//Preview records from a database view in a grid/listbox
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Preferred display columns (wyseman)
//X- Preferred display column order (wyseman)
//X- Can launch a dbe on the same view
//X- WyseGI, can launch another dbp, rather than edit window from double-click
//X- Implement loadBy
//X- Make column widths stick from one run to the next
//X- Implement column menu commands
//X- Split mlb state into layout(user-controlled) and config(meta-data-defined)
//X- Meta-data fetched from database is not overwriting stored state data
//- Remove test routine in menu
//- Tables with no default view columns display nothing
//- 
//- Sorting:
//-  Initial sort order comes from wyseman, apply to indicators
//X-  Maintain an array of fields indicating sort order
//X-  User can change sort order from mlb buttons
//X-  Sort order is included in load query sent to backend
//- Menu option to restore default column order, and default sort order
//- 
//- Make menu module use toggled field correctly (instead of call function)
//- Toggle display of columns
//- Toggle display of footers
//- Move context menu to mlb?
//- 
//- Display the number of records loaded
//- Can clone another similar window
//- Can disable reload on sort controls
//- Implement maximum rows to fetch parameter in menu settings
//- 
<template>
  <div class="wylib wylib-dbp">
    <div ref="header" class="header">
      <wylib-menudock :config="dockConfig" :height="headerHeight" :state="state.dock" :lang="wm.dbpMenu"/>
      <div class="headerfill"/>
    </div>
    <div class="subwindows">
      <wylib-win v-if="this.editPosts" :state="state.edit" topLevel=true :tag="'dbe:'+state.dbView" :lang="editLang" @close="state.edit.posted=false">
        <wylib-dbe :state="state.edit.client" @modified="modified" :bus="dbeBus"/>
      </wylib-win>
      <wylib-win :state="state.colMenu" @close="state.colMenu.posted=false" :lang="wm.dbeColMenu">
        <wylib-menu :state="state.colMenu.client" :config="colMenuConfig" @done="state.colMenu.posted=false"/>
      </wylib-win>
      <wylib-win v-if="this.filtPosts" :state="state.filter" topLevel=true :tag="'dbs:'+state.dbView" :lang="wm.dbs" @close="state.filter.posted=false">
        <wylib-dbs :fields="logicFields" :state="state.filter.client" @search="search"/>
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
  },
  data() { return {
    pr:		require('./prefs'),
    wm:		{},
    viewMeta:	null,
    gridData:	[],
    lastMenu:	null,
    mlbBus:	new Bus.messageBus(this),
    dbeBus:	new Bus.messageBus(this),
    lastSpec:	{},
    lastView:	null,
    editPosts:	0,
    filtPosts:	0,
  }},
  inject: ['top'],

  watch: {
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

  computed: {
    id: function() {return 'dbp_' + this._uid + '_'},
    editLang: function() {return {
      title: (this.wm.dbe?this.wm.dbe.title:null) + ':' + this.state.dbView, 
      help: (this.wm.dbe?this.wm.dbe.help:null) + ': ' + this.state.dbView
    }},
    logicFields: function() {
      let flds = []
      for (let key in this.mlbConfig) {
        let conf = this.mlbConfig[key]
        flds.push({tag: key, title: conf.title, help: conf.help})
      }
      return flds
    },
    dockConfig: function() { return [
      {idx: 'lod', lang: this.wm.dbpLoad,     call: ev=>this.load(),   icon: 'download',  shortcut: false},
      {idx: 'rld', lang: this.wm.dbpReload,   call: ev=>this.reload(), icon: 'spinner',   shortcut: true},
      {idx: 'all', lang: this.wm.dbpLoadAll,  call: this.loadAll,      icon: 'download2', shortcut: false},
      {idx: 'fil', lang: this.wm.dbpFilter,   call: this.loadBy,       icon: 'filter',    shortcut: true, toggled: this.state.filter.posted},
      {idx: 'edi', lang: this.wm.dbe,         call: this.editTog,      icon: 'pencil',    shortcut: true, toggled: this.state.edit.posted},
      {idx: 'prv', lang: this.wm.dbpPrev,     call: this.prev,         icon: 'arrowup',   shortcut: true},
      {idx: 'nxt', lang: this.wm.dbpNext,     call: this.next,         icon: 'arrowdown', shortcut: true},
      {idx: 'dec', lang: this.wm.dbpDefault,  call: this.defColumns,   icon: 'sun'},
      {idx: 'tst', lang: {title:'Test', help:'XYZ!'}, call: this.test, icon: 'cirdot'},
      {idx: 'cvi', lang: this.wm.dbpVisible, icon:'eye', menu: this.visibleMenu},
    ]},
    visibleMenu: function() { 
      let items = []
//console.log("Visible:", this.state.dbView)
      for (let key in this.mlbConfig) {
        let conf = this.mlbConfig[key]
          , col = this.state.grid.columns.find(e => (e.field == key))
        items.push({idx: key, lang:{title: conf.title, help: conf.help}, type: 'checkbox', input: (v)=>{
//console.log("inp:", key, v, col.visible)
          if (v != null && col) {col.visible = v}
          return col ? col.visible : null
        }})
      }
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
          , col = this.state.grid.columns.find(e => (e.field == key))
        if (meta.styles && ('size' in meta.styles) && meta.styles.size) {
          defWidth = meta.styles.size.split(' ')[0] * this.pr.mlbCharWidth
        }
        if ('display' in meta.styles) foundDisplay = true
        let config = {
          field:	key,
          width:	null, 
          title:	meta.title || key,
          help:		meta.help,
          order:	parseInt(meta.styles.display || 9999),
          just:		meta.type.match(/(int|float)[0-9]/) ? 'right' : 'left',
          width:	(defWidth && defWidth < this.pr.mlbDefWidth) ? defWidth : this.pr.mlbDefWidth,
          visible:	('display' in meta.styles) ? !!(meta.styles.display) : false,
        }
        colConfigs[key] = config
      })
//console.log("colConfigs:", colConfigs)
      if (!foundDisplay) Object.keys(colConfigs).forEach(key=>{colConfigs[key].visible = true})		//If no display data, display them all
      return colConfigs
    },
  },

  methods: {
    editTog(ev) {				//Toggle the editing window
      this.state.edit.posted = !this.state.edit.posted
      if (this.state.edit.posted) {
        this.editPosts++
        this.executeRows(this.$refs.mlb.getSelection())
      }
    },
    advance(delta=1) {this.mlbBus.notify('advance', delta)},
    next(ev) {this.advance(1)},
    prev(ev) {this.advance(-1)},

    executeRows(selection) {
//console.log("Execute rows: ", selection, this.viewMeta.pkey)
      if (!selection || selection.length <= 0) return
      let idx = selection[0], row = this.gridData[idx], keyVal = []
      this.viewMeta.pkey.forEach(fld => {
        keyVal.push(row[fld])
      })
//console.log("   row: ", row, keyVal)
      if (this.autoEdit) {
        this.state.edit.posted = true
        this.dbeBus.notify('load', keyVal)
      } else this.$emit('execute', row, this.viewMeta.pkey, keyVal)
    },

    load(spec) {
//console.log("Dbp load:", spec)
      Wyseman.request('dbp_'+this._uid, 'select', Object.assign({view: this.state.dbView, fields: '*'}, spec), (data, err) => {
//console.log("  data:", data)
        if (err) this.top().error(err); else this.gridData = data
      })
      this.lastSpec = spec
    },
    reload(spec) {this.load(Object.assign(this.lastSpec, spec))},
    loadAll(ev) {this.load({where: null})},
    clear() {this.gridData = []},		//Fixme: Should dbe also get cleared or not?
    
    modified(data) {this.reload()},		//On signal from dbe
    sort(cols) {this.reload({order: cols.reverse()})},
    search(where) {this.reload({where})},

    loadBy() {
      this.state.filter.posted = !this.state.filter.posted
      if (this.state.filter.posted) this.filtPosts++
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
console.log("Not yet implemented")
    },
    test() {
      this.top().confirm('A test message', (yesno, tag) => {
console.log("Modal answers:", yesno, tag)
      })
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
      if (this.state.dbView) Wyseman.register(this.id+'cv', this.state.dbView, (data) => {
//console.log("Dbp got metadata for:", this.state.dbView, data)
        this.viewMeta = data
      })
    },
  },

  beforeCreate: function() {
    this.$options.components['wylib-dbe'] = require('./dbe.vue').default
    this.$options.components['wylib-win'] = require('./win.vue').default
  },

  created: function() {
    Wyseman.register(this.id+'wm', 'wylib.data', (data) => {this.wm = data.msg})
    this.metaListen()
  },

  beforeMount: function() {
//console.log("Dbp before, state: ", this.state);
    Com.react(this, {
      dock: {},
      loaded: 0, lastLoad: {}, colMenu: {x: 100, y:0},
      edit: {posted: false, x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: this.pr.winInitHeight, client: {dbView: this.state.dbView}},
      filter: {posted: false, x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: 120, client: {}},
      grid: {footerOn: false, sorting: {}, columns: []}
    })
  },

  mounted: function() {
    this.$parent.$emit('swallow', this.$refs['header'])
console.log('State:', this.id, this.state.loaded)
    this.$nextTick(() => {
console.log('Was loaded, reload?', this.id, this.state.loaded)
      if (this.state.loaded > 0)		//If state says we had data loaded before, reload now
        this.reload()
    })
  },

  beforeDestroy: function() {
console.log('Dbp about to die:', this.state)
  }
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
