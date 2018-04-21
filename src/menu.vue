//Menu component
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Can launch from a button
//X- Can configure items from a reactive prop
//X- A click on the master window will unpost the menu
//X- Common code for movables, stretchables?
//X- Allow to pin a sub menu while unposting its parent
//X- Allow shortcuts to invoke menus (like dbe)
//- Can do sub-menus
//- Configuration separate from contents
//- Configuration tells columns
//- Configuration to tell if execute on single press, or double
//- Configuration tells if closes after execute (work with window?)
//- Contents gives actual menu items
//- Can have multiple text fields, icons, cascades
//- Implement state variable
//- Move Fixme's in CSS to prefs
//- Move subMenuPosted[] into state object
//- Standardize code in "created:" (Con.init?)
//- Menu icon inside menu toggles, as done shortcut button
//- Default menu icon for sub-menus
//- 
//- Implement window save/restore using menu component
//- 
<template>
  <div class="wylib wylib-menu">
    <div class="menu" title=''>
      <table>
        <tr v-for="item in config" :key="item.idx" @click="execute(item.call)" v-on:mouseenter="enterItem(item.idx, item.menu)" :title="(item.lang?item.lang.help:null)">
          <td v-for="fld in layout" :key="fld">
            <svg v-if="fld=='icon'" class="icon" style="height:1em; width:1em;" v-html="iconSvg(item.icon)"></svg>
            <div v-else-if="fld=='lang'">{{ (item.lang?item.lang.title:null) || item.idx }}</div>
            <input v-else-if="fld=='input' && item.input" :type="item.input"/>
            <svg v-else-if="fld=='input' && item.menu" class="icon" style="height: 1em; width: 1em" v-html="iconSvg('play3')"></svg>
            <div v-else-if="fld==item.idx">{{ item[fld] }}</div>
          </td>
        </tr>
      </table>
    </div>
    <div class="submenus">
      <wylib-win v-for="item in config" v-if="item.menu" :state="state.subs[item.idx]" :key="item.idx" pinnable=true @close="state.subs[item.idx].posted=false" :lang="item.lang">
        <wylib-menu :state="state.subs[item.idx].client" :config="item.menu"/>
      </wylib-win>
    </div>
  </div>
</template>

<script>
import Com from './common.js'
const Icons = require('./icons.js')
//import Win from './win.vue'		//Recursive, defined in beforeCreate

export default {
  name: 'wylib-menu',
//components: {'wylib-win': Win}
  props: {
    state:	{type: Object, default: () => ({})},
    layout:	{type: Array, default: () => (['icon','lang','input'])},
    config:	Array,
//    isPinned:	Boolean,
  },
  data() { return {
    pr:		require('./prefs'),
  }},
  methods: {
    iconSvg(icon) {
      return Icons(icon)
    },
    closeMenu() {
console.log("Close menu: ")
      this.$emit('close')
    },
    closeCheck() {
//      if (!this.state.pinned) this.$emit('close')	//Fixme: should window decide?
    },
    enterItem(idx, itemMenu) {
console.log("Entering menu item: ", idx, "itemMenu:", itemMenu, this.state.subs)
      Object.keys(this.state.subs).forEach(key => {
        if (this.state.subs[key]) this.state.subs[key].posted = false
      })
      if (itemMenu) this.state.subs[idx].posted = true
//console.log("  Posted: ", this.state.subs[idx])
    },
    execute(cb) {		//Execute the specified callback
      if (cb) cb()
      this.closeCheck()
    },
  },
  beforeCreate: function() {
    this.$options.components['wylib-win'] = require('./win.vue').default
  },
  created: function() {
    Com.react(this, {subs: {}})
    this.config.forEach((item, x) => {		//Set object properties that are not known until now
      if (item.menu) {
//console.log("Set default for: ", item.idx)
        this.$set(this.state.subs, item.idx, {posted: false, pinned: false, client: {}})
      }
    })
//console.log("State client: ", JSON.stringify(this.state))
  },
  mounted: function() {
//console.log("Menu components: " + JSON.stringify(this.$options.components))
  },
}
</script>

<style lang='less'>
  .wylib-menu {
    min-height: 3em;
    display: flex;
  }
  .wylib-menu .menu, .wylib-menu .submenus {
    display: inline;
  }
//  .wylib-menu .submenus {min-height: 10px; min-width: 10px; border: 1px solid blue;} //Debug 
  .wylib-menu > .menu {
    width: calc(100% - 6px);	//Fixme: can do with padding or borders?
    position: relative;
    top: 3px;			//Fixme: can do with padding or borders?
    left: 3px;			//Fixme: can do with padding or borders?
//    overflow-x: hidden;
//    overflow-y: scroll;
//    border: 1px solid purple;
  }
  .wylib-menu .menu tr:hover {
    background: lightblue;	//Fixme: prefs
  }
  .wylib-menu .menu table {
    border-collapse: collapse;
    background: #f6f6f6;	//Fixme: prefs
    user-select: none;
  }
  .wylib-menu .menu td {
    white-space: nowrap;
  }
  .wylib-menu .icon {
    display: block;
    fill: #2482a4;		//Fixme: prefs
    stroke: #222222;		//Fixme: prefs
  }
</style>
