//Report container, primarily an iframe
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// TODO:
//X- Behaves analogously to a popup window as far as report module needs
//- Can this auto size its popup window based on content size?
//- 

<template>
  <iframe class="wylib-rep" v-if="render" ref="iframe" :src="state.src" :name="state.name"></iframe>
</template>

<script>
import Com from './common.js'

export default {
  name: 'wylib-report',
  props: {
    state:	{type: Object, default: () => ({})},
    ready:	{type: Function},
    render:	{type: Boolean},
    bus:	{default: null},		//Communication from parent window
  },
  data() { return {
    stateTpt:		{src: '', name: '', config:null},
    dirty:		false,
  }},
  inject: ['top'],
  computed: {
    id() {return 'report_' + this._uid + '_'},
//    tagTitle() {return this.tag || this.title},
  },
  methods: {
    reload(req, data) {
//console.log("Reloading iframe:", this.state.src)
      let win = this.$refs.iframe ? this.$refs.iframe.contentWindow : null
        , location = win ? win.location : null
      if (location) location.reload()
    },
  },

//  created: function() {
//  },
  beforeMount: function() {
    Com.stateCheck(this)
    if (this.bus) this.bus.register(this.id, this.state.name, (req, data)=>{
//console.log("Report got request:", req, data)
      if (req == 'reload') this.reload()
      else if (req == 'dirty') this.dirty = data
    })
  },

  mounted: function () {
    let action = this.state.config ? this.state.config.action : null
//console.log("Report mounted:", this.ready, this.state.name, this.state.config)
    this.$parent.$emit('customize', action.lang, this.state.name, true, ()=>{return this.dirty})

    if (this.ready && (typeof this.ready == 'function')) {
      this.ready(this.$refs.iframe)

    } else if (!this.ready && this.state.config) {
//console.log("Report restoring from config:", this.state.config, this.bus)
      if (this.bus) this.$nextTick(()=>{
        this.bus.master.$emit('report', this.state.config)
      })
    }
  },

//  beforeDestroy: function() {
//  },
}
</script>

<style lang='less'>
.wylib-rep {
  width: 100%;
  min-height: 100%;
  border: 1px solid #c0c0c0;
}
</style>
