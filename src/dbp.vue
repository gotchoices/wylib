//Preview records from a database view in a grid/listbox
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Preferred display columns (wyseman)
//X- Preferred display column order (wyseman)
//X- Can launch a dbe on the same view
//X- WyseGI, can launch another dbp, rather than edit window from double-click
//X- Implement loadBy
//- Make column widths stick from one run to the next
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
      <wylib-win :state="state.edit" topLevel=true :tag="'dbe:'+state.dbView" :lang="editLang" @close="state.edit.posted=false">
        <wylib-dbe slot-scope="ws" :top="ws.top" :state="state.edit.client" @modified="modified" :bus="dbeBus"/>
      </wylib-win>
      <wylib-win :state="state.colMenu" @close="state.colMenu.posted=false" :lang="wm.dbeColMenu">
        <wylib-menu :state="state.colMenu.client" :config="colMenuConfig" @done="state.colMenu.posted=false"/>
      </wylib-win>
      <wylib-win :state="state.filter" topLevel=true :tag="'dbs:'+state.dbView" :lang="wm.dbs" @close="state.filter.posted=false">
        <wylib-dbs :fields="logicFields" :state="state.filter.client" @search="search"/>
      </wylib-win>
    </div>
    <wylib-mlb ref="mlb" :state="state.grid" :data="gridData" @execute="executeRows" @headerMenu="colMenuHandler" @sort="sort" :bus="mlbBus"/>
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
    top:	null,			//From parent window
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
  }},

  computed: {
    id: function() {return 'dbp_' + this._uid + '_'},
    editLang: function() {return {title: (this.wm.dbe?this.wm.dbe.title:null) + ':' + this.state.dbView, help: (this.wm.dbe?this.wm.dbe.help:null) + ': ' + this.state.dbView}},
    logicFields: function() {
      let flds = []
      this.state.grid.columns.forEach(col => {flds.push({tag: col.field, title: col.title, help: col.help})})
      return flds
    },
    dockConfig: function() { return [
      {idx: 'lod', lang: this.wm.dbpLoad   ,  call: ev=>this.load(),	icon: 'download',  shortcut: false},
      {idx: 'rld', lang: this.wm.dbpReload,   call: ev=>this.reload(),	icon: 'spinner', shortcut: true},
      {idx: 'all', lang: this.wm.dbpLoadAll,  call: this.loadAll, icon: 'download2',  shortcut: false},
      {idx: 'fil', lang: this.wm.dbpFilter,   call: this.loadBy,  icon: 'filter',    shortcut: true, toggled: this.state.filter.posted},
      {idx: 'edi', lang: this.wm.dbe,         call: this.editTog, icon: 'pencil',    shortcut: true, toggled: this.state.edit.posted},
      {idx: 'prv', lang: this.wm.dbpPrev   ,  call: this.prev,    icon: 'arrowup',   shortcut: true},
      {idx: 'nxt', lang: this.wm.dbpNext   ,  call: this.next,    icon: 'arrowdown', shortcut: true},
      {idx: 'dec', lang: this.wm.dbpDefault,  call: this.defColumns, icon: 'sun'},
      {idx: 'tst', lang: {title:'Test', help:'XYZ!'}, call: this.test, icon:'cirdot'},
      {idx: 'cvi', lang: this.wm.dbpVisible, icon:'eye', menu: [
        {idx: 'c1', lang: this.wm.dbpVisCheck, input: 'checkbox'},
        {idx: 'c2', lang: this.wm.dbpVisCheck, input: 'checkbox'},
        {idx: 'c3', lang: this.wm.dbpVisCheck, input: 'checkbox'},
        {idx: 'c4', lang: this.wm.dbpVisCheck, input: 'checkbox'},
      ]}
    ]},
    colMenuConfig: function() {return [
      {idx: 'siz', lang: this.wm.dbpColAuto, call: this.autoSize,     icon: 'circle'},
      {idx: 'hid', lang: this.wm.dbpColHide, call: this.hideColumn,   icon: 'circle'},
    ]},
    headerHeight: function() {
      return this.pr.winFullHeader - 1		//Fit in parent header, plus top border
    },
  },

  watch: {
    'state.dbView': function(newVal, oldVal) {		//If we change our view, reset data, columns
console.log("Dbp dbView changed!")
      this.gridData = []
      this.viewMeta = null
      let zid = this.id+'cv'				//Must be the same as in created:
      if (oldVal) Wyseman.register(zid, oldVal)		//Un-register
      if (newVal) Wyseman.register(zid, newVal, (data) => {this.viewMeta = data})
    },
    viewMeta: function(newVal, oldVal) {
console.log("viewMeta updated")
      this.state.grid.columns = this.mlbLayout()
},
    gridData: function() {this.state.loaded = (this.gridData && this.gridData.length > 0)},

//    'state.loaded': function() {
//console.log("Loaded changed!")
//      this.$nextTick(() => {if (this.state.loaded) this.reload(); else this.clear();})
//    }
  },

  methods: {
    mlbLayout() {		//Make the column description format mlb is looking for
      let colArray = []
//console.log("updateGrid:", this.state.grid.columns, JSON.stringify(this.viewMeta.col))
      if (this.viewMeta) this.viewMeta.columns.forEach((meta) => {		//For each column element
        let stateElem = this.state.grid.columns.find(e => (e.field == meta.col)),
            maxLength = meta.length * this.pr.mlbCharWidth
//console.log("Col:", meta.col, "Disp:", JSON.stringify(meta.styles))
        if (!stateElem) stateElem = {
          field:	meta.col,
          order:	parseInt(meta.styles.display || 9999),
          visible:	('display' in meta.styles) ? !!(meta.styles.display) : true,
          width:	(maxLength > this.pr.mlbDefWidth) ? this.pr.mlbDefWidth : maxLength,
          title:	meta.title || meta.col,
          just:		meta.type.match(/(int|float)[0-9]/) ? 'right' : 'left',
          help:		meta.help
        }
//console.log(" col:", meta.col, stateElem)
        colArray.push(stateElem)
      })
//console.log("colArray:", JSON.stringify(colArray))
      return colArray
    },

    editTog(ev) {				//Toggle the editing window
      this.state.edit.posted = !this.state.edit.posted
      if (this.state.edit.posted) this.executeRows(this.$refs.mlb.getSelection())
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
        if (err) this.top.error(err); else this.gridData = data
      })
      this.lastSpec = spec
    },
    reload(spec) {this.load(Object.assign(this.lastSpec, spec))},
    loadAll(ev) {this.load({where: null})},
    clear() {this.gridData = []},	//Fixme: Should dbe also get cleared or not?
    
    modified(data) {this.reload()},		//On signal from dbe
    sort(cols) {this.reload({order: cols.reverse()})},
    search(where) {this.reload({where})},

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
console.log("Auto size:", this.lastMenu, "Col:", col)
//    Fixme: call slickgrid autosize function?
    },
    defColumns(ev) {
console.log("Not yet implemented")
    },
    test() {
      this.top.confirm('A test message', (yesno, tag) => {
console.log("Modal answers:", yesno, tag)
      })
    },
    hideCol() {
      let col = this.state.grid.columns.find(e => (e.field == this.lastMenu))
console.log("Hide Column:", this.lastMenu, "Col:", col)
      col.visible = false
    },
  },

  beforeCreate: function() {
    this.$options.components['wylib-dbe'] = require('./dbe.vue').default
    this.$options.components['wylib-win'] = require('./win.vue').default
  },

  created: function() {
    Wyseman.register(this.id+'wm', 'wylib.data', (data) => {this.wm = data.msg})
    if (this.state.dbView)
      Wyseman.register(this.id+'cv', this.state.dbView, (data) => {
//console.log("Dbp got new metadata:", data.help)
this.viewMeta = data
})	//Fixme: what is this doing?
  },

  beforeMount: function() {
//console.log("Dbp before, state: ", this.state);
    Com.react(this, {
      dock: {},
      loaded: true, lastLoad: {}, colMenu: {x: 100, y:0},
      edit: {x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: this.pr.winInitHeight, client: {dbView: this.state.dbView}},
      filter: {x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: 120, client: {}},
      grid: {footerOn: false, sorting: {}, columns: []}
    })
  },

  mounted: function() {
    this.$parent.$emit('swallow', this.$refs['header'])
    if (this.state.loaded) {			//Better handled here or in watch?
console.log('Was loaded, reloading')
      this.$nextTick(() => {this.reload()})	//If state says we had data loaded, reload now
    }
  },
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
