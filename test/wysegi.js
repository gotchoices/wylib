//Browse/modify a wyseman database
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
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
import WylibWin from '../src/win.vue'
import WylibDbp from '../src/dbp.vue'

const TabTemplate = `
  <div style="width: 100%; height: 100%; resize: both; overflow: auto; padding: 0 4px 4px 0;">
    <div class="subwindows">
      <wylib-win v-for="win,idx in state.windows" v-if="idx > 0 && win" topLevel=true :key="idx" :state="win" :lang="lang(win,idx)" @close="close(idx)">
        <wylib-dbp :state="win.client" slot-scope="ws" :top="ws.top"/>
      </wylib-win>
    </div>
    <wylib-dbp :state="state.windows[0].client" :autoEdit="false" @execute="addWin"/>
  </div>
`
Vue.component('tabEditor', {
  template: TabTemplate,
  components: {'wylib-win': WylibWin, 'wylib-dbp': WylibDbp},
  data() { return {
    state:	{windows: [{posted: true, client: {dbView: 'wm.table_pub', loaded: true}}]},
  }},
  methods: {
    lang: function(win,idx) { return {
      title:	win.client.dbView + ':' + idx, 
      help:	'Preview listing of view: ' + win.client.dbView
    }},
    addWin(row, pkey, keyVals) {
console.log("Add Window", row, pkey, keyVals)
      let i, view = keyVals.slice(0,2).join('.')
      for (i = 0; this.state.windows[i]; i++) {}
      if (i <= 0) view = 'wm.table_pub'
      let newWin = {posted: true, client: {dbView: view, loaded: true}}
      this.state.windows.splice(i, 0, newWin)
//console.log(" windows:", this.state.windows)
      this.$forceUpdate()
    },
    close(idx) {
      this.state.windows[idx] = null
      this.$forceUpdate()
    },
  },
})

Vue.component('entEditor', {
  template: '<div>Entity Editor</div>',
})

Vue.component('erdViewer', {
  template: '<div>ERD Viewer</div>',
})

const AppTemplate = `
  <wylib-app title="Wyseman GUI" :tabs="tabs" :current="currentTab" @tab="(t)=>{currentTab = t}" help="Viewer for tables and views in a Wyseman managed database">
    <keep-alive><component :is="currentComp"/></keep-alive>
  </wylib-app>
`
new Vue(Object.assign({el: '#app', template: AppTemplate}, {
  components: {'wylib-app': WylibApp},
  data() { return {
    tabs:	[
      {tag: 'db',  component: 'tabEditor', title: 'Database', help: 'Direct access to database tables'},
      {tag: 'ent', component: 'entEditor', title: 'Users', help: 'View and edit database user entities'},
      {tag: 'erd', component: 'erdViewer', title: 'ERD', help: 'Graphical view of database tables and their relations'},
    ],
    currentTab: 'db'
  }},
  computed: {
    currentComp: function() {
      return this.tabs.find(e=>(e.tag == this.currentTab)).component
    },
  },
  methods: {
    addWin(row, pkey, keyVals) {
console.log("Add Window", row, pkey, keyVals)
      let i, view = keyVals.slice(0,2).join('.')
      for (i = 0; this.state.windows[i]; i++) {}
      if (i <= 0) view = 'wm.table_pub'
      let newWin = {posted: true, client: {dbView: view, loaded: true}}
      this.state.windows.splice(i, 0, newWin)
//console.log(" windows:", this.state.windows)
      this.$forceUpdate()
    },
  },
}))
