//Mask off the parent window, allowing access only to what is in this container
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Strip out only modal functionality--not dialog specific
//-
<template>
  <div class="wylib wylib-modal" :style="screenStyle">
    <div class="dialog" :style="dialogStyle">
      <slot :state="state.client"></slot>
    </div>
  </div>
</template>

<script>
const Com = require('./common.js')
const TopHandler = require('./top.js')

export default {
  name: 'wylib-modal',
  props: {
    state:	{type: Object, default: () => ({})},
    env:	{type: Object, default: Com.envTpt},
  },
  data() { return {
    top:	null,
    stateTpt:	{posted: false, client:{}},
  }},
  computed: {
//    id() {return 'modal_' + this.$.uid},
    pr() {return this.env.pr},
    screenStyle() {return {
      display:		this.state.posted ? 'flex' : 'none',
    }},
    dialogStyle() {return {
      background:	this.pr.dataBackground,
      borderColor:	this.pr.winHighlightColor,
      borderWidth:	this.pr.winBorderWidth + 'px'
    }},
  },
  watch: {			//Let parent and any content clients, we just posted
    'state.posted': function(isPosted) {
//console.log("Posted, children:", this.$scopedSlots)
      if (isPosted) this.$nextTick(() => {
        this.$emit('posted') 				//Tell parent
        if (this.top) this.top.posted()			//and anyone else who might be listening
      })
    },
  },

  beforeMount:	function() {
    Com.stateCheck(this)
  },

  mounted:	function() {
    this.top = new TopHandler()
  },
}
</script>

<style lang='less'>
  .wylib-modal {
    position:	absolute;
    justify-content: center;
    align-items: center;
    min-width:	100%;
    min-height:	100%;
    left:	0;
    top:	0;
    background: rgba(230,230,230,0.5);
    z-index:	1000;
//border: 1px solid red;
  }
  .wylib-modal .dialog {
    position:	relative;
    flex: 0 0 auto;
    min-width:	50%;
    max-width:  90%;
    padding:	5px;
    border-radius: 6px;
    border-style: solid;
//    border-width: 10px;
  }
</style>
