//Menu component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Implement maximum height preference for menus (1/2 of screen size?)
//- Don't create menus until the first time they are posted (win)
//- Configuration separate from contents?
//- Contents gives actual menu items
//- Move Fixme's in CSS to prefs
//- Move subMenuPosted[] into state object
//- Standardize code in "created:" (Con.init?)
//- Menu icon inside menu toggles, as done with shortcut button
//- 
<template>
  <div class="wylib wylib-menu">
    <div class="menu" title=''>
      <table>
        <tr v-for="item in config" :key="item.idx" @click.stop="execute(item.call, $event, item)" v-on:mouseenter="enterItem($event, item)" :title="item?.lang?.help">
          <td v-for="fld in layout" :key="fld">
            <svg v-if="fld=='icon'" class="icon" 
              style="height:1em; width:1em" :style="iconStyle(item.toggled)" v-html="iconSvg(item.icon)">
            </svg>
            <div v-else-if="fld=='lang'">
              {{ item?.lang?.title ?? item?.lang ?? item.idx }}
            </div>
            <svg v-else-if="fld=='input' && item.menu" class="icon" 
              style="height: 1em; width: 1em" v-html="iconSvg('play3')">
            </svg>
            <input v-else-if="fld=='input' && (item.input!=undefined) && item.type == 'checkbox'"
              type="checkbox" :checked="item.input()" @input="item.input($event.target.checked)"
            />
            <input v-else-if="fld=='input' && (item.input!=undefined)"
              :type="item.type" :value="item.input()" @input="item.input($event.target.value, item.idx)"
            />
            <wylib-dew v-else-if="fld=='dew'" :env="env"
              :field="item.idx" :config="item.config" :values="item.values" :lang="item.lang"
              :value="item.input()" @input="(va,ix,d,v)=>{item.input(va, ix, d, v)}"
            />
<!-- Just use a dew for file?  Input code below looks invalid anyway!
            <input v-else-if="fld=='input' && (item.input!=undefined) && item.type == 'file'" 
              type="file" @input="item.input($event.target.checked)"
            />
-->
            <div v-else>
              {{ item[fld] }}
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="submenus subwindows">
      <wylib-win v-for="item in haveMenu" ref="submenu" :state="state.subs[item.idx]" :env="env" :key="item.idx" pinnable=true @close="state.subs[item.idx].posted=false">
        <wylib-menu :state="state.subs[item.idx].client" :env="env" :lang="item.lang" :config="item.menu" :layout="item.layout?item.layout:layout" @done="state.subs[item.idx].posted = state.subs[item.idx].pinned; $emit('done')"/>
      </wylib-win>
    </div>
  </div>
</template>

<script>
const Com = require('./common.js')
const Icons = require('./icons.js')
import Dew from './dew.vue'
//import Win from './win.vue'		//Recursive, so defined in beforeCreate

export default {
  name: 'wylib-menu',
  components: {'wylib-dew': Dew},
  props: {
    state:	{type: Object, default: () => ({})},
    layout:	{type: Array, default: () => (['icon', 'lang', 'input'])},
    config:	Array,
    lang:	{type: Object, default: Com.langTpt},
    env:	{type: Object, default: Com.envTpt},
  },
  data() { return {
    stateTpt:	{subs: {}}
  }},
  inject: ['top'],
  computed: {
    id() {return 'menu_' + this._uid + '_'},
    pr() {return this.env.pr},
    haveMenu() {return this.config.filter(c => c.menu)}
  },
  methods: {
    iconSvg(icon) {
      return Icons(icon)
    },
    iconStyle(tog) {return {
      backgroundColor: tog ? this.pr.butToggledColor : this.pr.butBackground
    }},
    enterItem(ev, item) {
      let idx = item.idx, theSubs = this.state.subs, theSub = theSubs[idx]
//console.log("Entering item: ", idx, "menu:", item.menu, "Subs:", theSubs, "Sub:", theSub)
      if (!theSubs || theSubs.length <= 0) return
      Object.keys(this.state.subs).forEach(key => {	//Close any subwindows when moving around
        if (theSubs[key] && !theSubs[key].pinned) theSubs[key].posted = false
      })

      if (item.menu && theSub) {			//But open any submenu associated with this line
        theSub.posted = true
        if (theSub.x == null || theSub.y == null) this.$nextTick(()=>{	//If this is the first time posted, let it post, then place it
//console.log("Refs:", this.$refs)
          let itemBBox = ev.target.getBoundingClientRect()
            , menuBBox = ev.target.closest('.wylib-menu').getBoundingClientRect()
            , viewWidth = (window.innerWidth || document.documentElement.clientWidth)
            , rightGap = viewWidth - (menuBBox.x + menuBBox.width)
            , subComp = this.$refs.submenu.find(cur=>{return (cur.state == theSub)})
            , subElem = subComp ? subComp.$el : null
            , subBBox = subElem ? subElem.getBoundingClientRect() : null
            , subWidth = subBBox ? subBBox.width : 200
//console.log("rightGap:", rightGap, "subWidth:", subWidth, "Menu wid:", menuBBox.width, "sub:", subElem.getBoundingClientRect())
          theSub.y = itemBBox.y - menuBBox.y - itemBBox.height		//Place the menu relevant to the invoking menu item
          theSub.x = (rightGap < subWidth) ? -(menuBBox.width + subWidth) : 0
//console.log("Posting sub:", theSub.x, theSub.y, "Item:",itemBBox, "Menu:",menuBBox, viewWidth, "Comp:", subComp, "Elem:", subElem)
        })
      }
//console.log("  Posted: ", theSub)
    },
    execute(cb, ev, item) {		//Execute the specified callback
      if (cb) cb(ev)
//console.log("Menu Execute: ", item.idx, ev)
      if (item.menu) {			//Clicking on sub-menu selector
        let { idx } = item
          , sub = this.state.subs[idx]
        sub.posted = (sub.pinnable && sub.pinned) ? true : !sub.posted	//Toggle sub-menu
      } else if (item.input) {		//Is this a data input item, don't execute anything
//console.log("  Input menu item: ", item.idx)
      } else {
        this.$emit('done')
      }
    },
  },

  beforeCreate: function() {
    this.$options.components['wylib-win'] = require('./win.vue').default
  },

  created: function() {
    Com.stateCheck(this)
//console.log("Menu state: ", this.lang.title, this.state)

    this.config.forEach((item, x) => {		//Set any object properties that are not known until now
      if (item.menu && !this.state.subs[item.idx]) {
//        this.$set(this.state.subs, item.idx, {posted: false, pinned: false, x:null, y:null, client: {}})
        this.state.subs[item.idx] = {posted: false, pinned: false, x:null, y:null, client: {}}
//console.log("Set default for: ", item.idx, "State:", this.state.subs[item.idx])
      }
    })
  },

  mounted: function() {
//console.log("M:", this.layout, this.config)
//console.log("Menu components: " + JSON.stringify(this.$options.components))
    this.top().custom(this.lang)
  },
  beforeUnmount: function() {
    this.top().listenClick(this.id)		//De-register
  }
}
</script>

<style lang='less'>
  .wylib-menu {
    min-height: 3em;
    max-height: 40vh;
    display: flex;
  }
  .wylib-menu .menu, .wylib-menu .submenus {
    display: inline;
  }
  .wylib-menu input {
    width: 3em;
    text-align: right;
  }
//  .wylib-menu .submenus {min-height: 10px; min-width: 10px; border: 1px solid blue;} //Debug 
  .wylib-menu > .menu {
    width: calc(100% - 6px);	//Fixme: can do with padding or borders?
    position: relative;
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
    padding-left: 4px;
    padding-right: 4px;
    border: 1px solid #f2f2f2;
  }
  .wylib-menu .icon {
    display: block;
    fill: #2482a4;		//Fixme: prefs
    stroke: #222222;		//Fixme: prefs
  }
</style>
