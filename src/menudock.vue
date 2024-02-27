//Display a menu button, and optionally shortcut buttons from the menu itself
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Integrate button changes
//X- Show spaces between buttons
//- 
<template>
  <div class="wylib wylib-menudock">
    <div class="buttons">
      <wylib-button class="menubutton" icon="menu" :env="env" :toggled="state.menu?.posted" @activate="state.menu.posted = !state.menu.posted" :title="lang?.title"/>
      <wylib-button class="shortcut" v-for="conf in haveShortcut" :env="env"
      	:key="conf.idx" :icon="conf.icon" :toggled="conf.toggled" @activate="conf.call" 
      	:disabled="('disabled' in conf) ? conf.disabled : false"
      	:title="conf?.lang?.title + ':\n' + conf?.lang?.help"/>
    </div>
    <div class="subwindows">
      <wylib-win :state="state.menu" :env="env" pinnable=true @close="state.menu.posted=false">
        <wylib-menu :state="state.menu?.client" :env="env" :config="config" :lang="lang" @done="state.menu.posted=state.menu.pinned"/>
      </wylib-win>
    </div>
  </div>
</template>

<script>
const Com = require('./common.js')
import Win from './win.vue'
import Menu from './menu.vue'
import Button from './button.vue'

export default {
  name: 'wylib-menudock',
  components: {'wylib-win': Win, 'wylib-menu': Menu, 'wylib-button': Button},
  props: {
    state:	{type: Object, default: () => ({})},
    lang:	{type: Object, default: Com.langTpt},
    config:	Array,
    env:	{type: Object, default: Com.envTpt},
  },
  data() { return {
    stateTpt:	{menu: {client: {}, posted: false}},
  }},
  inject: ['top'],
  computed: {
    haveShortcut() {return this.config.filter(c => c.shortcut)},
  },

  beforeMount: function() {		//console.log("Menudock state: ", this.state)
    Com.stateCheck(this)
    this.top().custom(this.lang)
  },
}
</script>

<style>
  .wylib-menudock {
    border: 1px solid #666688;
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
    padding: 0;
  }
  .wylib-menudock .buttons {
    display: flex;
  }
  .wylib-menudock wylib-button {
    flex: 0 0 auto;
  }
  .wylib-menudock > .wylib-win {
    position: relative;
    top: 1em;
  }
</style>
