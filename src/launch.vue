//Generic preview launcher;  Start with one or more previews of specified views
//Copyright MyCHIPs.org; See license in root of this package
// -----------------------------------------------------------------------------
// TODO:
//- How/where to put importer
//- Importer language from DB
//- 
//- 

<template>
  <div class="wylib-launch">
    <div class="header">{{insTitle || state.title || 'Preview Launcher'}}
      <div class="controls">
        <label v-if="launchData && launchData.import">
          {{ wm.t.lchImport }}:
          <input type="file" @change="importFile" accept="*.json" multiple :title="wm.h.lchImport"/>
        </label>
        <button @click="addWin" :title="wm.h.lchAdd">{{wm.t.lchAdd}}</button>
      </div>
    </div>
    <div class="subwindows">
      <wylib-win v-for="win,key in state.windows" topLevel=true :key="key" :state="win" :env="env" @close="r=>{closeWin(win,r)}">
        <wylib-dbp :state="win.client" :env="env"/>
      </wylib-win>
    </div>
    <div v-if="instructions" class="instructions" v-html="instructions"/>
  </div>
</template>

<script>
const Com = require('./common.js')
const Wyseman = require('./wyseman.js')
import Win from './win.vue'
import Dbp from '../src/dbp.vue'

export default {
  name: 'wylib-launch',
  components: {'wylib-win': Win, 'wylib-dbp': Dbp},
  props: {
    state:	{type: Object, default: ()=>({})},
    view:	{type: String},
    tag:	{type: String},
    env:	{type: Object, default: Com.envTpt},
  },
  inject: ['app','top'],
  data() { return {
    stateTpt:		{windows: {}},
    viewMeta:		null,
    launchData:		null,
  }},

  computed: {
    id() {return 'launch_' + this.$.uid},
    wm() {return this.env.wm},
    pr() {return this.env.pr},
    viewMsg() {
      return this.viewMeta ? this.viewMeta.msg : null
    },
    insTitle() {
      let title = this.viewMsg ? this.viewMsg['launch.title'] : null
      return title ? title.help : null
    },
    instructions() {
      let instruct = this.viewMsg ? this.viewMsg['launch.instruct'] : null
      return instruct ? instruct.help : null
    },
    launchNum() {
      return this.launchData ? this.launchData.initial : 1
    },
  },
  methods: {
    addWin() {
      let newState = {posted: true, client: {dbView: this.view}}
      Com.addWindow(this.state.windows, newState, this, true)
    },
    closeWin(win, reopen) {
      Com.closeWindow(this.state.windows, win, this, reopen)
    },
    importFile(ev) {
      Com.fileReader(ev.target, 1000, (data)=>{
        let spec = {view: this.launchData.import + '(jsonb)', params: [data]}
//console.log("Launch got file import:", data, "spec:", spec)
        Wyseman.request(this.id+'_im', 'tuple', spec, (res, err) => {
          if (err) this.top().error(err)
        })
      })
    }
  },

  beforeMount: function() {
    Com.stateCheck(this)
    Wyseman.register(this.id+'_vm', this.view, (data, err) => {
      if (err) {console.log(err.msg); return}
      this.viewMeta = data
      this.launchData = (this.viewMeta && this.viewMeta.styles) ? this.viewMeta.styles.launch : null
//console.log("Launch got meta data:", this.view, 'm:', data.msg, this.launchData)

      let launchLang = this.viewMeta.msg?.launch?.title || {title:this.viewMeta?.title, help:this.viewMeta?.help}
      if (this.viewMeta.title)
        this.top().custom(this.tag, launchLang)
      if (this.launchNum > 0 && Object.keys(this.state.windows).length <= 0)
        for (let i = 0; i < this.launchNum; i++) this.addWin()
    })
  },
}

</script>
<style lang='less'>
.wylib-launch > .header {
  font-size: 1.25em;
  display: flex;
  justify-content: space-between;
}
.wylib-launch .header > .controls {
  display: flex;
  flex-direction: column;
  font-size: 0.75em;
}
  
</style>
