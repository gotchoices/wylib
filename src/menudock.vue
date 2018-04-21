//Display a menu button, and optionally shortcut buttons from the menu itself
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Integrate button changes
//X- Show spaces between buttons
//- 
<template>
  <div class="wylib wylib-menudock">
    <div class="buttons">
      <wylib-button class="menubutton" icon="menu" :size="height" :toggled="state.menu.posted" @mousedown="state.menu.posted = !state.menu.posted" :title="lang.title"/>
      <wylib-button class="shortcut" v-for="conf in config" v-if="conf.shortcut" :size="height" 
      	:key="conf.idx" :icon="conf.icon" :toggled="conf.toggled" @click="conf.call" 
      	:disabled="('disabled' in conf) ? conf.disabled : false"
      	:title="(conf.lang?conf.lang.title:null) + ':\n' + (conf.lang?conf.lang.help:null)"/>
    </div>
    <div class="subwindows">
      <wylib-win :state="state.menu" pinnable=true @close="state.menu.posted=false" :lang="lang">
        <wylib-menu :state="state.menu.client" :config="config" @close="state.menu.posted=false"/>
      </wylib-win>
    </div>
  </div>
</template>

<script>
import Com from './common.js'
import Win from './win.vue'
import Menu from './menu.vue'
import Button from './button.vue'

export default {
  name: 'wylib-menudock',
  components: {'wylib-win': Win, 'wylib-menu': Menu, 'wylib-button': Button},
  props: {
    state:	{type: Object, default: () => ({})},
    lang:	{type: Object, default: Com.langTemplate},
    config:	Array,
    height:	{type: Number, default: 18}
  },

  beforeMount: function() {
//console.log("MenuDock:", JSON.stringify(this.config))
    Com.react(this, {menu: {client: {}}})
  },
  mounted: function() {
  }
}
</script>

<style>
  .wylib-menudock {
    border: 1px solid black;
    border-bottom: 0;
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
