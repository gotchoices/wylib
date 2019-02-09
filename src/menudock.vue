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
      <wylib-button class="menubutton" icon="menu" :toggled="state.menu.posted" @mousedown="state.menu.posted = !state.menu.posted" :title="lang.title"/>
      <wylib-button class="shortcut" v-for="conf in config" v-if="conf.shortcut"
      	:key="conf.idx" :icon="conf.icon" :toggled="conf.toggled" @click="conf.call" 
      	:disabled="('disabled' in conf) ? conf.disabled : false"
      	:title="(conf.lang?conf.lang.title:null) + ':\n' + (conf.lang?conf.lang.help:null)"/>
    </div>
    <div class="subwindows">
      <wylib-win :state="state.menu" pinnable=true @close="state.menu.posted=false">
        <wylib-menu :state="state.menu.client" :config="config" :lang="lang" @done="state.menu.posted=state.menu.pinned"/>
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
  },
  data() { return {
    stateTpt:	{menu: {client: {}}},
  }},

//  mounted: function() {
//console.log("Menu components: " + JSON.stringify(this.$options.components))
//    this.$on('customize', (lang, tag)=>{this.$parent.$emit(lang, tag)})
//    this.$parent.$emit('customize', this.lang)
//  },
  beforeMount: function() {
    Com.stateCheck(this)
    this.$parent.$emit('customize', this.lang)
  },
  mounted: function() {
  }
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
