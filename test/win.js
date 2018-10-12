//Test Windows
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
import Vue from 'vue'
Vue.config.productionTip = false
import WylibDoc from '../src/doc.vue'
import WylibWin from '../src/win.vue'
import WylibDbp from '../src/dbp.vue'
import WylibVector from '../src/vector.vue'
import Wyseman from '../src/wyseman.js'
var wmAddress = 'lux2.batemans.org:54320'
import '../src/wylib.css'

const Template = `
  <div>
    <h2>Win:</h2>
    Connected to: {{ currSite }} Language: {{this.pr.language}}
    <div>
      <input v-model="backend"/>
      <button @click="connect">Connect</button>
    </div>
    <button @click="addWin">New</button>
    <button @click="save">Save</button>
    <button @click="recall">Recall</button>
    <button @click="printState">State</button>
    <button @click="language">Language</button>
    <button @click="state.doc.posted=!state.doc.posted">Document</button>
    <button @click="state.vect.posted=!state.vect.posted">Vector</button>
    <button @click="updateAll(null)">Update</button>
    <div>
      <wylib-win v-for="win,idx in state.windows" topLevel=true :key="idx" :state="win" :lang="{title: win.client.dbView + ':' + idx, help: 'Preview listing of view: ' + win.client.dbView}">
        <wylib-dbp slot-scope="ws" :top="ws.top" :state="win.client"/>
      </wylib-win>
      <wylib-win v-if="state.doc.posted" topLevel=true :state="state.doc" :lang="{title: 'Doc Preview', help: 'Ho'}" @close="state.doc.posted=false">
        <wylib-doc/>
      </wylib-win>
      <wylib-win v-if="state.vect.posted" topLevel=true :state="state.vect" :lang="{title: 'Vector Figure', help: 'A vector'}" @close="state.vect.posted=false">
        <wylib-vector/>
      </wylib-win>
    </div>
  </div>`

const Config = {
  components: {'wylib-doc': WylibDoc, 'wylib-win': WylibWin, 'wylib-dbp': WylibDbp, 'wylib-vector': WylibVector},
  data() { return {
    pr:		require('../src/prefs.js'),
    backend:	wmAddress,
    currSite:	null,
    state:	{windows: [{posted: true, client: {dbView: 'mychips.users_v'}}], doc: {posted: false}, vect: {posted: true}},
  }},
  computed: {
  },
  methods: {
    addWin() {
console.log("Add Window")
      this.state.windows.push(this.state.windows[0])
    },
    printState() {
console.log("State:", JSON.stringify(this.state))
    },
    save() {
      localStorage.saveWinState = JSON.stringify(this.state)
console.log("Saving state:")
    },
    recall() {
console.log("Recalling state:")
      if (localStorage.saveWinState) this.state = JSON.parse(localStorage.saveWinState)
    },
    language(event) {
      this.pr.language = this.pr.language == 'en' ? 'fi' : 'en'
    },
    updateAll(vm) {
      vm = vm || this
//console.log("Update:", vm)
      vm.$children.forEach((c,x) => {
        this.update(c)
      })
      vm.$forceUpdate()
    },
    connect() {Wyseman.connect(this.backend)},
  },
  mounted: function() {
    Wyseman.request('_main', 'connect', {}, addr => {this.currSite = addr})
    Wyseman.connect(this.backend)
//    this.recall()
  },
}

new Vue(Object.assign({el: '#app', template: Template}, Config))
