//Toplevel handler meant to live inside a popup or iframe
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// TODO:
//- Build webpack page that has basic, configurable page
//- Talk to my opener on load, ask for my contents
//- Build version with a dialog in it as a report widget
//- Can display in a popup
//- Can display in an iframe
//- 

<template>
  <div class="wylib-pop">
<!--    <div class="header"></div> -->
    <div class="subwindows">
      <wylib-modal v-if="modal.posted" :state="modal" :env="env" v-slot="ws">
        <wylib-dialog :state="ws.state" :env="env"/>
      </wylib-modal>
    </div>
    <div class="pop-content">
      <div v-if="state.format == 'html'" v-html="state.content"/>
      <component v-else :is="compName" :env="env" :state="state.content" :bus="compBus" @submit="submit"/>
<!--      <slot></slot> -->
    </div>
  </div>
</template>

<script>
const Bus = require('./bus.js')
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
    state:	{format: 'dialog', content: {}},
    modal:	{posted: false, client: {}},
    top:	null,
    env:	{wm: {h:{}, t:{}}, pr: require('./prefs')},
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
      if (!this.state.format || this.state.format == 'html') return null
      if (this.state.format.includes('-')) return this.state.format
      return 'wylib-' + this.state.format
    },
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
      if (request == 'populate' && data.format) {
//console.log("Popup got populate:", format, content, config)
        let { format, content, config } = data
          , { action } = config || {}
        this.state.format = format
        this.state.content = content
//        this.config = config				//Save original report configuration
        if (window.opener && action) window.document.title = action.lang.title
        if (format != 'html') this.top.momWin({request:'env'})	//Components will need language and prefs

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
//.wylib-pop > .header {
//  width: 100%;
//}
//.wylib-pop .pop-content {
//  width: 100%;
//  border: 1px solid #c0c0c0;
//}
</style>
