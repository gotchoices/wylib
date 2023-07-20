//Toplevel handler meant to live inside a popup or iframe
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// TODO:
//- 

<template>
  <div class="wylib-pop">
<!--    <div class="header"></div> -->
    <div class="subwindows">
      <wylib-modal v-if="modal.posted" :state="modal" :env="env" v-slot="ws">
        <wylib-dialog :state="ws.state" :env="env"/>
      </wylib-modal>
    </div>
    <div class="pop-content" v-if="state.render == 'html'" v-html="parseContent"/>
    <component v-else :is="compName" :env="env" :state="state.content" :bus="compBus" @submit="submit"/>
  </div>
</template>

<script>
const Bus = require('./bus.js')
const Prefs = require('./prefs.js')
const TopHandler = require('./top.js')
import Dialog from './dialog.vue'
import Modal from './modal.vue'
import StructDoc from './strdoc.vue'

export default {
  name: 'wylib-pop',
  components: {'wylib-modal': Modal, 'wylib-dialog': Dialog, 'wylib-strdoc': StructDoc},
//  props: {
//    tag:	{type: String},
//  },
  data() { return {
    state:	{render: 'dialog', content: {}},
    modal:	{posted: false, client: {}},
    top:	null,
    env:	{wm: {h:{}, t:{}}, pr: Prefs.values},
    compBus:	new Bus.messageBus(this),
//    config:	{}			//Any applicable report configuration
  }},
  provide() { return {
    top: () => {return this.top},
    app: () => {return this.top}
  }},
  computed: {
    id() {return 'pop_' + this._uid + '_'},
    compName() {		//What standard component we will use
//console.log("compName:", this.state.render)
      if (!this.state.render || this.state.render == 'html') return null
      if (this.state.render.includes('-')) return this.state.render
      return 'wylib-' + this.state.render
    },
    parseContent() {
      let cont = this.state.content
//console.log("Pop content:", typeof cont)
      if (typeof cont == 'string')
        return cont
      else if (Array.isArray(cont))
        return cont.join('')
      else if (typeof cont == 'object')
        return JSON.stringify(cont)
    }
  },
  methods: {
    submit(request, data) {		//If the widget we contain emits 'submit'
//console.log("Pop got submit:", request, data)
      this.top.momWin({request, data})
    },
  },

  created() {
//console.log("Pop env:", this.env)
    this.top = new TopHandler(this, true)
  },

  mounted() {
    this.top.momWin({request:'control'})		//Let parent window know we are ready to load content

    this.top.listenWin('', (request, data) => {		//Listen for messages from '' (master window)
//console.log("Popup got message:", request, "Data:", data)
      if (request == 'populate' && data.render) {
//console.log("Popup got populate:", data)
        let { render, content, config } = data
          , { action } = config || {}
        this.state.render = render
        this.state.content = content
//        this.config = config				//Save original report configuration
        if (window.opener && action) window.document.title = action.lang.title
        if (render != 'html')			//Not straight html, some vue component will interpret content
          this.top.momWin({request:'env'})	//Vue components will need language and prefs

      } else if (request == 'env' && data) {
        Object.assign(this.env, data)
//console.log("Popup got env:", this.env)

      } else if (request == 'child' && data) {
//console.log("Popup send to child:", data)
        this.compBus.notify(data)
      }
    })
  },

//  beforeDestroy() {
//console.log("Pop closing:", window.opener)	//Do I need to inform the parent?
//    this.top.momWin({request:'close'})
//  },
}
</script>

<style lang='less'>
.wylib-pop * {
  box-sizing: border-box;
}
.wylib-pop {
  height: 100vh;
  border: 0;
//  border: 4px solid tan;
}
.wylib-pop .pop-content {
  width: 100%;
  height: 100%;
//  border: 4px solid purple;
}
</style>
