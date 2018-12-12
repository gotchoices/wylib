//Browse/modify a wyseman database
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Table preview context help should come from the DB help for that table
//- Implement Users edit
//- Implement Address edit
//- Implement Communications edit
//- Implement Privileges edit
//- 
//- Later:
//- Implement ERD display
//- 

import Vue from 'vue'
Vue.config.productionTip = false
import WylibApp from '../src/app.vue'
import TabEdit from './tabedit.vue'
import EntEdit from './entity.vue'
import ErdView from './erd.vue'

const AppTemplate = `
  <wylib-app tag="wylib_wysegi" title="Wyseman GUI" :state="state" :tabs="tabs" :current="state.curTab" @tab="(t)=>{state.curTab = t}" help="Viewer for tables and views in a Wyseman managed database">
    <keep-alive><component :is="currentComp" :state="state.tabs[state.curTab]"/></keep-alive>
  </wylib-app>
`
new Vue(Object.assign({el: '#app', template: AppTemplate}, {
  components: {'wylib-app': WylibApp, 'erdViewer': ErdView, 'tabEditor': TabEdit, 'entEditor': EntEdit},
  data() { return {
    state:	{
      curTab: 'db', 
      tabs: {
        db:	{windows: [{posted: true, client: {dbView: 'wm.table_data', loaded: true}}]},
        ent:	{windows: [{posted: true, client: {dbView: 'base.ent', loaded: true}}]},
        erd:	{}
      }
    },
    tabs:	[
      {tag: 'db',  component: 'tabEditor', title: 'Database', help: 'Direct access to database tables'},
      {tag: 'ent', component: 'entEditor', title: 'Users', help: 'View and edit database user entities'},
      {tag: 'erd', component: 'erdViewer', title: 'ERD', help: 'Graphical view of database tables and their relations'},
    ],
  }},
  computed: {
    currentComp: function() {
      return this.tabs.find(e=>(e.tag == this.state.curTab)).component
    },
  },
//  methods: {
//    addWin(row, pkey, keyVals) {
//console.log("Add Window", row, pkey, keyVals)
//      let i, view = keyVals.slice(0,2).join('.')
//      for (i = 0; this.state.windows[i]; i++) {}
//      if (i <= 0) view = 'wm.table_pub'
//      let newWin = {posted: true, client: {dbView: view, loaded: true}}
//      this.state.windows.splice(i, 0, newWin)
////console.log(" windows:", this.state.windows)
//      this.$forceUpdate()
//    },
//  },
//  beforeMount: function() {
//    this.db = {windows: [{posted: true, client: {dbView: 'wm.table_pub', loaded: true}}]}
//  },
}))
