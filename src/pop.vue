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
    <div class="header">
    </div>
    <div class="subwindows">
      <wylib-modal v-if="modal.posted" :state="modal">
        <wylib-dialog slot-scope="ws" :state="ws.state"/>
      </wylib-modal>
    </div>
    <div class="pop-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TopHandler from './top.js'
import Dialog from './dialog.vue'
import Modal from './modal.vue'

export default {
  name: 'wylib-pop',
  components: {'wylib-modal': Modal, 'wylib-dialog': Dialog},
  props: {
    state:	{type: Object, default: () => ({})},
    title:	{type: String},
    help:	{type: String},
    tag:	{type: String},
  },
  data() { return {
    modal:		{posted: false, client: {}},
//    wm:			{},
    top:		new TopHandler(this),
  }},
  provide() { return {
    top: () => {return this.top}
  }},
  computed: {
    id: function() {return 'pop_' + this._uid + '_'},
//    tagTitle: function () {return this.tag || this.title},
  },
//  methods: {
//  },

//  beforeDestroy: function() {
//console.log("Pop closing:", window.opener)
//    if (window.opener) window.opener.postMessage({request:'close'}, location.origin)
//  },
}
</script>

<style lang='less'>
.wylib-pop * {
  box-sizing: border-box;
}
.wylib-pop > .header {
  width: 100%;
}
.wylib-pop .pop-content {
//  width: 100%;
//  border: 1px solid #c0c0c0;
}
</style>
