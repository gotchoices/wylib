//Toplevel window
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- send 'close' event to parent and let it decide what to do with it.
//X- Incorporate a state prop to keep sizing and menu-posted status
//X- Try speeding up drag/move by using smaller style object
//X- Can sub-menus be visible when parent isn't?
//X- dbe is getting squished horizontally when parent win is too narrow (overflow?)
//X- Subwindows keep their state in same object
//X- Implement modal query/alert window
//X- Move z-index calcs to state object
//X- Menu item to save/restore state
//X- Windows like dbs/dbe shouldn't unpost on outside clicks--only menu windows
//- Get rid of separate topClick for each menu, use bus to unpost menus
//- 
//- Later:
//- Implement corner menu functions (using z-index)
//-   Move to top
//-   Send to back
//-   Clone window
//- Double click on header to full-size?
//- 
<template>
  <div class="wylib wylib-win" :class="{toplevel: topLevel}" :style="[winStyleS, winStyleF]">
    <div class="header" :title="lang.help" :style="headerStyle">
      <div class="headerbar">
        <wylib-button v-if="topLevel" :size="headerHeight" icon="menu" :toggled="winMenu.posted" @click="winMenu.posted = !winMenu.posted" :title="wm.winMenu ? wm.winMenu.help : null"/>
        <wylib-button v-if="!topLevel && pinnable" :size="headerHeight" icon="pushpin" :toggled="state.pinned" @click="state.pinned = !state.pinned" :title="wm.winPinned ? wm.winPinned.help : null"/>
        <div ref="childMenu" class="childmenu"></div>
      </div>
      <div class="handle" v-on:dblclick="minimize" v-on:click="()=>{if (top) top.layer(1)}">
        <div class="label" :style="{'font-size': (headerHeight < 16) ? (headerHeight-2) + 'px' : '1em'}">
          {{ lang.title }}
        </div>
      </div>
      <div class="headerbar operations">
        <div ref="childStatus" class="childstatus"></div>
        <wylib-button class="closebutton" v-if="topLevel || state.pinned" :size="headerHeight" icon="close" @click="close" :color="pr.butCloseColor" :hoverColor="pr.butCloseHoverColor" :title="wm.winClose ? wm.winClose.help : null"/>
      </div>
    </div>
    <div class="subwindows">
      <wylib-win v-if="topLevel" :state="winMenu" pinnable=true @close="winMenu.posted=false" :lang="wm.winMenu">
        <wylib-menu :state="winMenu.client" :config="winMenuConfig" @done="winMenu.posted=winMenu.pinned"/>
      </wylib-win>
      <wylib-modal v-if="topLevel && modal.posted" :state="modal"/>
    </div>
    <div v-show="!state.minim" class="content wylib-win-nodrag" :style="{ height: 'calc(100% - ' + (headerHeight + 4) + 'px)'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const MenuLayer = 1000

import Com from './common.js'
import Menu from './menu.vue'
import Button from './button.vue'
import Interact from 'interactjs'
import Wyseman from './wyseman.js'
import Modal from './modal.vue'
import State from './state.js'
//console.log("Interact:", Interact)

export default {
  name: 'wylib-win',
  components: {'wylib-menu': Menu, 'wylib-button': Button, 'wylib-modal': Modal},
  props: {
    state:	{type: Object, default: () => ({})},
    topLevel:	{default: false},		//Full header and window menu
    fullHeader: {default: false},		//Full header only
    pinnable:	{default: false},		//Include pinning button/function
    lang:	{type: Object, default: Com.langTemplate},
    tag:	{type: String, default: 'win'}
  },
  data() { return {
    pr:			require('./prefs'),
    wm:			{},
    myTopElement:	null,
    top:		null,
    modal:		{posted: false},
    restoreMenu:	[],
    lastLoadIdx:	null,
    winMenu:		{client:{}}, client: {}, modal: {posted: false},
  }},
  provide() { return {
    top: () => {return this.top}
  }},
  computed: {
    id: function() {return 'win_' + this._uid + '_'},
    headerHeight: function () {
      return ((this.topLevel || this.fullHeader) ? this.pr.winFullHeader : this.pr.winSmallHeader)
    },
    winMenuConfig: function() {let wm = this.wm
      return [
      {idx: 'sav', lang: wm.winSave,     icon: 'upload',    call: this.saveState},
      {idx: 'sas', lang: wm.winSaveAs,   icon: 'upload2',   call: this.saveStateAs},
      {idx: 'res', lang: wm.winRestore,  icon: 'download',  menu: this.restoreMenu, layout: ['lang','owner','access']},
      {idx: 'def', lang: wm.winDefault,  icon: 'home',      call: this.defaultState},
      {idx: 'top', lang: wm.winToTop,    icon: 'arrowup',   call: ()=>{this.top.layer(1)}},
      {idx: 'bot', lang: wm.winToBottom, icon: 'arrowdown', call: ()=>{this.top.layer(-1)}},
      {idx: 'min', lang: wm.winMinimize, icon: 'eyeblock',  call: this.minimize},
      {idx: 'cls', lang: wm.winClose,    icon: 'close',     call: ()=>{this.$emit('close')}}
    ]},
    winStyleS: function () {return {
      borderColor:	this.pr.winBorderColor,
      background:	this.pr.dataBackground,
      borderWidth:	this.pr.winBorderWidth + 'px',
      opacity:		this.pr.winOpacity,
      borderRadius:	this.pr.winBorderRad + 'px',
      visibility:	this.state.posted ? 'visible' : 'hidden',
      zIndex:		this.topLevel ? this.state.layer : MenuLayer,
    }},
    winStyleF: function () {return {		//Faster moves with these separate?
      transform:	'translate(' + this.state.x + 'px, ' + this.state.y + 'px)',
      height:		(this.state.minim ? this.headerHeight + 6 : this.state.height) + 'px',
      width:		this.state.width + 'px',
    }},
    headerStyle: function () {return {
      borderRadius:	(this.pr.winBorderRad - 1) + 'px', 
      background:	`linear-gradient(to top, ${this.pr.winHeadColorLow}, ${this.pr.winHeadColorHigh})`,
    }},
  },
  methods: {
    close(ev) {
      this.state.pinned = false
//console.log("In close", this.id)
      this.$emit('close')
    },
    minimize() {
      this.state.minim = !this.state.minim
    },
    saveStateAs() {
      let resp = {t:'Default'}
        , dewArr = this.top.dewArray([['t', this.wm.appStateTag], ['h', this.wm.appStateDescr]])
      this.top.query(this.wm.appStatePrompt.help, dewArr, resp, (yesNo, tag) => {
        if (yesNo) State.saveas(this.tag,resp.t,resp.h,this.state,this.top.error,(ruid)=>{this.lastLoadIdx=ruid})
      })
    },
    saveState() {
      if (this.lastLoadIdx) 
        State.save(this.lastLoadIdx, this.state, this.top)
      else
        this.saveStateAs()
    },
    storeState() {
console.log("Storing window state:", this.tag)
      if (this.topLevel && this.tag) Com.saveState(this.tag, this.state)
    },
    defaultState() {
      this.top.confirm(this.wm.winDefault.help, (yesNo, tag) => {
        if (yesNo) {Com.saveState(this.tag)}
      })
    },

    topClick(ev) {		//Any click in bounds of our toplevel window
      if (!this.state.posted) return			//Only posted windows need to check
//console.log("Top window click:", ev.target.nodeName, "This:", this.$el.classList.value, "Target: ", ev.target.classList.value)
      if (ev.target.closest('.wylib-menu')) return	//Click came from another menu
      if (ev.target.closest('.wylib-button')) return	//Click came from the menu button itself
      if (this.$el.contains(ev.target)) return		//Click is within our own window
//console.log("  pinnable:", this.pinnable, this.state.pinned)
      if (!this.pinnable || !this.state.pinned) this.$emit('close')
    },

    moveHandler(event) {
//console.log("Moving: " + JSON.stringify(event.rect));
      this.state.x += event.dx
      this.state.y += event.dy
    },
    sizeHandler(event) {
//console.log("Sizing: " + JSON.stringify(event.rect));
      this.state.width = event.rect.width
      this.state.height = event.rect.height
      this.state.x += event.deltaRect.left
      this.state.y += event.deltaRect.top
    },
    swallowMenu(childMenu, childStatus) {	//Eat the menu bar, and optionally status bar of a child component
//console.log("Swallow Menu:", typeof childMenu)
      if (childMenu && '$el' in childMenu) childMenu = childMenu.$el		//Can pass in element or vue object
      if (childStatus && '$el' in childStatus) childStatus = childStatus.$el
      let cmenu = this.$refs['childMenu'], cstat = this.$refs['childStatus']
      cmenu.innerHTML = ''		//Get rid of any prior contents
      cstat.innerHTML = ''
      cmenu.appendChild(childMenu)
      if (childStatus) cstat.appendChild(childStatus)
    },
  },

  watch: {		//Let parent and any content clients, we just posted
    'state.posted': function(isPosted) {
//console.log("Posted, children:", this.$scopedSlots, this.state.x, this.state.y)
      if (isPosted) this.$nextTick(() => {
        this.$emit('posted') 				//Tell parent
        if (this.top) this.top.posted()			//Tell anyone else who might be listening
      })
    },
  },

  created: function() {
    Wyseman.register(this.id+'wm', 'wylib.data', (data) => {this.wm = data.msg})
    this.$on('swallow', this.swallowMenu)

    if (this.topLevel) this.top = new Com.topHandler((st) => {Object.assign(this.modal, st)}, this)
  },

  beforeMount: function() {		//Create any state properties that don't yet exist
    if (this.topLevel && !('estab' in this.state)) {		//Is this structure already established?
      let savedState = Com.getState(this.tag)
//console.log("Win state template:", this.state.estab, this.tag, savedState)
      if (savedState) Object.assign(this.state, savedState)	//Comment line for debugging from default state
    }

//console.log("Win State:", this.state);
    Com.react(this, {
      x: null, y: null, posted: false, pinned: false, layer: 10, minim: false, estab: false,
      width: this.topLevel ? this.pr.winInitWidth : null, 
      height: this.topLevel ? this.pr.winInitHeight : null,
    })
  },

  mounted: function() {
    Interact(this.$el).resizable({
      inertia: true,
      margin: 3,
      edges: {top:true, left: true, right: true, bottom: true},	//Can't do top: true without losing dragability!
      restrictSize: {min: {width: 50, height: 50}},
      onmove: this.sizeHandler,
      onend: this.storeState
    }).draggable({
      ignoreFrom: '.wylib-win-nodrag',
      allowFrom: '.wylib-win .handle',
      inertia: true,
      onmove: this.moveHandler
    })
//console.log("Mounted; this: ", this.title, "topLevel:", this.topLevel, "top:", this.top)

    if (this.topLevel) {
//      this.top = new Com.topHandler((st) => {this.modal = st}, this)
    } else {
      this.myTopElement = this.$el.closest('.wylib-win.toplevel')
    }
    if (this.myTopElement) this.myTopElement.addEventListener('click', this.topClick)
//console.log("Win components: " + JSON.stringify(this.$options.components))

    if (this.topLevel) State.listen(this.id+'sl', this.tag, (menuData) => {
//console.log("Process:", this.id, this.restoreMenu.length, "Data:", menuData);
      let menuItems = menuData.map(el=>{
        return Object.assign(el, {call:()=>{
          Object.assign(this.state,el.data)
          this.lastLoadIdx = el.idx
        }})
      })
      this.restoreMenu.splice(0, this.restoreMenu.length, ...menuItems)
//console.log("WMC:", 1, this.winMenuConfig)
    }, this.top.error)
    
    this.$on('geometry', (ev)=>{this.storeState()})	//When window layout changes
  },

  beforeDestroy: function() {
    if (this.myTopElement) this.myTopElement.removeEventListener('click', this.topClick)
  },
}
</script>

<style lang='less'>
  .wylib-win {
    touch-action: none;		//Overcome dragging bug in android chrome
    position: absolute;
    border-style: solid;
  }
  .wylib-win.toplevel {
    z-index: 1;
    min-width: 120px;
    min-height: 14px;
  }
  .wylib-win > .header {
    margin: 1px 1px 0 1px;
    display: flex;
    flex-flow: row nowrap;
  }
  .wylib-win > .menus, .wylib-win > operations {
    flex: 0 0 auto;
  }
  .wylib-win .header > .handle {
    flex: 1 1 auto;
    overflow: hidden;
    display: flex;
//    border: 1px solid blue;
  }
  .wylib-win .header .handle .label {
    padding: 0 0 0 0.3em;
    position: relative;
    display: inline-block;
    align-self: flex-end;
    white-space: nowrap;
//    border: 1px solid yellow;
  }
  .wylib-win .headerbar {
    display: flex;
  }
  .wylib-win .childmenu {
    display: flex;
    align-items: flex-end;
//border: 1px solid red;
  }
//  .wylib-win .headerbar .childmenu > div {
//border: 1px solid green;
//  }
//  .wylib-win .subwindows {
//    border: 1px solid red;
//  }
  .wylib-win .content {
//    border: 2px solid green;
    overflow-x: hidden;
    overflow-y: scrolled;
    z-index: 1;
  }
  .wylib-win .wylib-menu {
    z-index: 2;
  }
</style>
