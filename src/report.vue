//Report container, primarily an iframe
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// TODO:
//X- Behaves analogously to a popup window as far as report module needs
//- Can this auto size its popup window based on content size?
//- Can reports/popups remember their geometry from previous runs?
//- Is a report menu needed for anything?
//- Reports with options launched in internal window don't need dialog box
//- 

<template>
  <div class="wylib-rep">
<!-- Do we need a menu here?
    <div ref="header" class="header">
      <wylib-menudock ref="headMenu" :state="state.dock" :config="dockConfig" :env="env" :lang="wm.repMenu"/>
      <div class="headerfill"/>
    </div>
-->
    <iframe v-if="render" ref="iframe" :src="state.src" :name="state.name"></iframe>
  </div>
</template>

<script>
const Com = require('./common.js')

export default {
  name: 'wylib-report',
//  components: {'wylib-menudock': MenuDock},	//To avoid recursion problems
  props: {
    state:	{type: Object, default: () => ({})},
    ready:	{type: Function},
    render:	{type: Boolean},
    bus:	{default: null},		//Communication from parent window
    env:	{type: Object, default: Com.envTpt},
  },
  data() { return {
    stateTpt:		{src: '', name: '', config:null},
    dirty:		false,
  }},
  inject: ['top'],
  computed: {
    id() {return 'report_' + this._uid + '_'},
    wm() {return this.env.wm},
    pr() {return this.env.pr},
//    tagTitle() {return this.tag || this.title},
//    dockConfig() { return [
//      {idx: 'run', lang: this.wm.repRun,     call: this.run,     icon: 'wand',   shortcut: true},
//    ]},
  },
  methods: {
    run(ev) {
console.log("Run report:", ev)
    },
    reload(req, data) {
//console.log("Reloading iframe:", this.state.src)
      let win = this.$refs.iframe ? this.$refs.iframe.contentWindow : null
        , location = win ? win.location : null
      if (location) location.reload()
    },
  },

  beforeCreate() {
    this.$options.components['wylib-menudock'] = require('./menudock.vue').default	//Seems to work better here to avoid recursion problems
  },
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
      , actTag = this.state.config ? this.state.config.actTag : null
//console.log("Report mounted:", this.ready, this.state.config, actTag, this.render)
    if (actTag)
      this.$parent.$emit('customize', action.lang, actTag, true, ()=>{return this.dirty})
//    this.$parent.$emit('swallow', this.$refs.header)		//Only if we re-enable a report menu

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
//    this.bus.master.$emit('destroy', this.state.config)		;console.log('Report destroy')
//  },
}
</script>

<style lang='less'>
.wylib-rep {
  width: 100%;
  height: 100%;
}
.wylib-rep iframe {
  width: 100%;
  min-height: 100%;
  border: 1px solid #c0c0c0;
  border-radius: 4px;
}
</style>
