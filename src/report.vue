//Report container, primarily an iframe
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// TODO:
//- Behaves analogously to a popup window as far as report module needs
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
  }},
  inject: ['top'],
  computed: {
    id: function() {return 'report_' + this._uid + '_'},
//    tagTitle: function () {return this.tag || this.title},
  },
  methods: {
    reload(req, data) {
console.log("Reloading iframe:", this.state.src)
      let win = this.$refs.iframe ? this.$refs.iframe.contentWindow : null
        , location = win ? win.location : null
      if (location) location.reload()
    },
  },

//  created: function() {
//  },
  beforeMount: function() {
    Com.stateCheck(this)
    if (this.bus) this.bus.register(this.id, this.state.name, (command)=>{
//console.log("Report got command:", command)
      if (command == 'reload')
        this.reload()
    })
  },

  mounted: function () {
    let {view, action, info, keys} = this.state.config
//console.log("Report mounted:", this.ready, this.state.name, this.state.config)
    this.$parent.$emit('customize', action.lang, this.state.name)

    if (this.ready && (typeof this.ready == 'function')) {
      this.ready(this.$refs.iframe)
    } else if (!this.ready && this.state.config) {
//console.log("Report restoring from config:", view, action, info, keys)
      this.$parent.$emit('report', view, action, info, keys)
    }
  },

//  beforeDestroy: function() {
//  },
}
</script>

<style lang='less'>
//.wylib-rep {
//  width: 100%;
//  border: 1px solid #c0c0c0;
//}
</style>
