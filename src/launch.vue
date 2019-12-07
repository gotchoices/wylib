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
      <wylib-win v-for="win,key in state.windows" topLevel=true :key="key" :state="win" :env="env" @close="r=>{closeWin(key,r)}">
        <wylib-dbp :state="win.client" :env="env"/>
      </wylib-win>
    </div>
    <div v-if="instructions" class="instructions" v-html="instructions"/>
  </div>
</template>

<script>
import Com from './common'
import Wyseman from './wyseman'
import Win from './win.vue'
import Dbp from '../src/dbp.vue'

export default {
  name: 'wylib-launch',
  components: {'wylib-win': Win, 'wylib-dbp': Dbp},
  props: {
    state:	{type: Object, default: ()=>({})},
    view:	{type: String},
    tag:	{type: String},
    env:	{type: Object},
  },
  inject: ['app','top'],
  data() { return {
    stateTpt:		{windows: {}},
    viewMeta:		null,
    launchData:		null,
  }},

  computed: {
    id() {return 'launch_' + this._uid + '_'},
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
    closeWin(idx, reopen) {Com.closeWindow(this.state.windows, idx, this, reopen)},
    importFile(ev) {
      Com.fileReader(ev.target, 1000, (data)=>{
//console.log("Launch got file import:", data)
        let spec = {view: this.launchData.import + '(jsonb)', params: [data]}
        Wyseman.request('import.'+this.id, 'tuple', spec, (res, err) => {
          if (err) this.top().error(err)
        })
      })
    }
  },

  beforeMount: function() {
    Com.stateCheck(this)
    Wyseman.register(this.id+'vm', this.view, (data, err) => {
      if (err) {console.log(err.msg); return}
      this.viewMeta = data
      this.launchData = (this.viewMeta && this.viewMeta.styles) ? this.viewMeta.styles.launch : null
//console.log("Launch got meta data:", this.view, data, this.launchData)

      let launchLang = this.viewMeta.msg['launch.title'] || {title:this.viewMeta.title, help:this.viewMeta.help}
      if (this.viewMeta.title)
        this.$parent.$emit('customize', this.tag, launchLang)
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
