//Toplevel window
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Menu item to save/restore state
//X- Windows like dbs/dbe shouldn't unpost on outside clicks--only menu windows
//- Default state doesn't seem to do anything
//- Get rid of separate topClick for each menu, use bus to unpost menus
//- Reload window after state reset (send close signal to parent with reopen option?)
//- 
//- Later:
//- Implement corner menu functions (using z-index)
//-   Move to top
//-   Send to back
//-   Clone window
//- Double click on header to full-size?
//- 
<template>
  <div :id="'win'+_uid" class="wylib wylib-win" v-show="state.posted" :class="{toplevel: topLevel}" :style="[winStyleS, winStyleF]">
    <div class="header" :title="lang.help" :style="headerStyle" @click.stop="headerClick">
      <div class="headerbar">
        <wylib-button v-if="topLevel" icon="menu" :env="env" :toggled="winMenu.posted" @click="winMenu.posted = !winMenu.posted" :title="wm.h.winMenu"/>
        <wylib-button v-if="!topLevel && pinnable" :env="env" icon="pushpin" :size="buttonSize" :toggled="state.pinned" @click="state.pinned = !state.pinned" :title="wm.h.winPinned"/>
        <div ref="childMenu" class="childmenu"></div>
      </div>
      <div class="handle" v-on:dblclick="minimize" v-on:click="()=>{if (top) top.layer(1)}">
        <div class="label" :style="{'font-size': (headerHeight < 16) ? (headerHeight-2) + 'px' : '1em'}">
          {{ lang.title }}
        </div>
      </div>
      <div class="headerbar operations">
        <div ref="childStatus" class="childstatus"></div>
        <wylib-button class="closebutton" v-if="topLevel || state.pinned" icon="close" :env="env" :size="buttonSize" @click="close" :color="pr.butCloseColor" :hoverColor="pr.butCloseHoverColor" :title="wm.h.winClose"/>
      </div>
    </div>
    <div class="subwindows">
      <wylib-win v-if="topLevel" :state="winMenu" :env="env" pinnable=true @close="winMenu.posted=false">
        <wylib-menu v-if="winMenu.posted" :state="winMenu.client" :env="env" :config="winMenuConfig()" @done="winMenu.posted=winMenu.pinned" :lang="wm.winMenu"/>
      </wylib-win>
      <wylib-win v-for="dia,key in state.dialogs" topLevel=true :key="key" :state="dia" @close="r=>{closeDia(key,r)}" :env="env">
        <wylib-dialog :state="dia.client" :env="env" @submit="(...a)=>{dialogSubmit(key,...a)}"/>
      </wylib-win>
      <wylib-win v-for="rep,key in state.reports" topLevel=true :key="key" :state="rep" :env="env" @close="r=>{closeRep(key,r)}" @report="(v,a,i,b)=>{top.actionLaunch(v,a,i,b)}">
        <wylib-report :bus="repBus" :render="rep.posted" :ready="rep.ready" :state="rep.client" :env="env"/>
      </wylib-win>
      <wylib-modal v-if="topLevel && modal.posted" :state="modal" :env="env" v-slot="ws">
        <wylib-dialog :state="ws.state" :env="env"/>
      </wylib-modal>
    </div>
    <div v-show="!state.minim" ref="content" class="content wylib-win-nodrag" :style="{ height: 'calc(100% - ' + (headerHeight + 4) + 'px)'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const MenuLayer = 1000

const Bus = require('./bus.js')
const Com = require('./common.js')
const Local = require('./local.js')
const State = require('./state.js')
const TopHandler = require('./top.js')
const Interact = require('interactjs')
import Menu from './menu.vue'
import Button from './button.vue'
import Dialog from './dialog.vue'
import Report from './report.vue'
import Modal from './modal.vue'
//console.log("Interact:", Interact)

export default {
  name: 'wylib-win',
  components: {'wylib-menu': Menu, 'wylib-button': Button, 'wylib-dialog': Dialog, 'wylib-modal': Modal, 'wylib-report': Report},
  props: {
    state:	{type: Object, default: () => ({})},
    topLevel:	{default: false},		//Full header and window menu
    fullHeader: {default: false},		//Full header only
    pinnable:	{default: false},		//Include pinning button/function
    env:	{type: Object, default: Com.envTpt},
  },
  data() { return {
    lang:		{title: null, help: null},
    stateTag:		'win',
    top:		null,
    modal:		{posted: false, client:{}},
    restoreMenu:	[],
    lastLoadIdx:	null,
    lastLoadName:	null,
    popWin:		null,
    dirty:		null,
    printable:		false,
    repBus:		new Bus.eventBus(this),
    winMenu:		{client:{}}, client: {}, modal: {posted: false}, //Fixme: what is this?
    stateTpt:		{x: null, y: null, posted: false, pinned: false, layer: 10, minim: false, dialogs:{}, reports:{}, height: null, width: null, fresh: true},
  }},
  inject: ['app'],
  provide() { return {
    top: () => {return this.top}
  }},
  computed: {
    id() {return 'win_' + this._uid + '_'},
    wm() {return this.env.wm},
    pr() {return this.env.pr},
    buttonSize() {
      return ((this.topLevel || this.fullHeader) ? 1.25 : 0.8)
    },
    headerHeight() {
      return ((this.topLevel || this.fullHeader) ? this.pr.winFullHeader : this.pr.winSmallHeader)
    },
    saveTitle() {
      let lang = Object.assign({}, this.wm.winSave)
      if (this.lastLoadName) lang.title += ' (' + this.lastLoadName + ')'
      return lang
    },
    winStyleS() {return {
      borderColor:	this.pr.winBorderColor,
      background:	this.pr.dataBackground,
      borderWidth:	this.pr.winBorderWidth + 'px',
      opacity:		this.pr.winOpacity,
      borderRadius:	this.pr.winBorderRad + 'px',
      zIndex:		this.topLevel ? this.state.layer : MenuLayer,
    }},
    winStyleF() {return {		//Faster moves with these separate?
      transform:	'translate(' + this.state.x + 'px, ' + this.state.y + 'px)',
      height:		this.state.minim ? (this.headerHeight + 6) + 'px' : (this.state.height ? this.state.height + 'px': null),
      width:		this.state.width ? this.state.width + 'px' : null,
    }},
    headerStyle() {return {
      borderRadius:	(this.pr.winBorderRad - 1) + 'px', 
      background:	`linear-gradient(to top, ${this.pr.winHeadColorLow}, ${this.pr.winHeadColorHigh})`,
    }},
  },
  methods: {
    winMenuConfig() {let wm = this.wm
      let prElem = this.printable ?
        {idx: 'prn', lang: wm.winPrint,   icon: 'printer',   call: this.print} :
        {idx: 'pop', lang: wm.winPopUp,   icon: 'rocket',    call: this.popup}
      return [
      {idx: 'sav', lang: this.saveTitle,  icon: 'upload',    call: this.saveState},
      {idx: 'sas', lang: wm.winSaveAs,    icon: 'upload2',   call: this.saveStateAs},
      {idx: 'res', lang: wm.winRestore,   icon: 'download',  menu: this.restoreMenu, layout: ['lang','owner','access']},
      {idx: 'def', lang: wm.winDefault,   icon: 'home',      call: this.defaultState},
      {idx: 'geo', lang: wm.winGeom,      icon: 'shrink',    call: this.defaultSize},
      prElem,
      {idx: 'prf', lang: wm.appPrefs,     icon: 'cog',       menu: this.pr.menu('win'), layout: ['lang', 'dew']},
      {idx: 'top', lang: wm.winToTop,     icon: 'arrowup',   call: ()=>{this.top.layer(1)}},
      {idx: 'bot', lang: wm.winToBottom,  icon: 'arrowdown', call: ()=>{this.top.layer(-1)}},
      {idx: 'min', lang: wm.winMinimize,  icon: 'eyeblock',  call: this.minimize},
      {idx: 'cls', lang: wm.winClose,     icon: 'close',     call: this.close}
    ]},
    close(ev) {
//console.log("In close", this.id, this.dirty, this.dirty ? this.dirty() : null)
      let closeIt = () => {
        this.state.pinned = false
        this.$emit('close')
      }
      if (this.dirty ? this.dirty() : false) this.top.confirm('!winModified', tag => {
        if (tag == 'diaYes') closeIt()
      }); else closeIt()
    },
    headerClick() {		//Capture this to keep it away from the app toplevel (for moving windows around while menus posted)
    },
    minimize() {
      this.state.minim = !this.state.minim
    },
    print() {
      let frame = this.$el.querySelector('iframe')
//console.log("Found iframe:", frame)
      if (frame) frame.contentWindow.print()
    },
    popup() {			// Generate printable version of a window
      let pop = this.popWin, body, style, popId = this.id+'popUp'
console.log("Clone to popup:", popId)
      if (!pop || pop.closed) {
        pop = this.popWin = window.open('', popId, 'height=9in,width=7in')
        pop.document.write('<html><head></head><body></body></html>')
        pop.document.close()
      }
      if (body = pop.document.body) {
        if (body.firstChild) body.firstChild.remove()
      }
      let fragment = Com.deepCloneWithStyles(this.$refs.content)
        , newNode = pop.document.importNode(fragment, true)
      pop.document.body.appendChild(newNode)
    },
    saveStateAs() {
      let resp = {t:'Default'}
        , dewArr = this.top.dewArray([['t', this.wm.appStateTag], ['h', this.wm.appStateDescr]])
      this.top.query('!appStatePrompt', dewArr, resp, (tag) => {
//console.log("tag", tag)
        if (tag == 'diaYes') State.saveAs(this.stateTag,resp.t,resp.h,this.state,this.top.error,(ruid)=>{
          this.lastLoadIdx=ruid
          this.lastLoadName=resp.t
        })
      })
    },
    saveState() {
      if (this.lastLoadIdx) 
        State.save(this.lastLoadIdx, this.state, this.top)
      else
        this.saveStateAs()
    },
    storeState() {		//Redundant with stored app state?
//console.log("Storing window state:", this.stateTag)
      if (this.topLevel && this.stateTag) Local.set(this.stateTag, this.state)
    },
    defaultSize() {
      this.state.width = this.state.height = null
      this.storeState()
    },
    defaultState() {
      this.top.confirm(this.wm.h.winDefault, (tag) => {
        if (tag == 'diaYes') {
          Local.set(this.stateTag)
          this.$emit('close', true)
        }
      })
    },

    moveHandler(event) {
//console.log("Moving: ", event, this.state, this.winStyleF);
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
//console.log("Swallow Menu:", childMenu, childStatus)
      if (childMenu && '$el' in childMenu) childMenu = childMenu.$el		//Can pass in element or vue object
      if (childStatus && '$el' in childStatus) childStatus = childStatus.$el
      let cmenu = this.$refs['childMenu'], cstat = this.$refs['childStatus']
      cmenu.innerHTML = ''		//Get rid of any prior contents
      cstat.innerHTML = ''
      cmenu.appendChild(childMenu)
      if (childStatus) cstat.appendChild(childStatus)
    },

//    addDia(...args) {return Com.addWindow(this.state.dialogs, ...args)},	//Obsolete?
    closeDia(idx, reopen) {Com.closeWindow(this.state.dialogs, idx, this, reopen)},
    dialogSubmit(dialogIndex, ev, buttonTag, dialogTag, options) {
//console.log("Dialog submit", dialogIndex, dialogTag, buttonTag, options, ev)
      if (this.top)
        if (this.top.submitDialog(dialogTag, {buttonTag, options, dialogIndex, popUp:event.shiftKey}))
          this.closeDia(dialogIndex)
    },

    reportWin(repTag, src, config) {
      let winState = this.state.reports[repTag]
        , popUp = config.info ? config.info.popUp : null
        , ready = (iframe) => {}	//Dummy function can't survive reload in state
        , wasPosted = winState ? winState.posted : null
        , foundState = false
//console.log("ReportWin state:", winState, repTag, Object.keys(this.state.reports))
      if (!winState) {
        winState = {posted: false, x:25, y:25, client:{src, name:repTag}, ready}
        this.$set(this.state.reports, repTag, winState)	//Create new report record
      } else {
        if (!winState.ready) winState.ready = ready	//Function will have been lost in any reload
        foundState = true				//Found existing report status
      }
      winState.client.config = config			//;console.log("Report config:", config, popUp)
      if (popUp) {			//Generate browser popup
        winState.posted = false
        this.$nextTick(()=>{		//Let any report iframe die before launching the popup
//console.log("!pop:", src, "tag:", repTag, winState.posted)
          if (!window.open(src, repTag, 'height=600,width=600'))
            this.top.error(this.wm.dbePopupErr)
        })
      } else {				//Regular internal report window
//console.log("!regular:", winState, winState.posted)
        winState.posted = true
        if (foundState) {
          if (wasPosted)						//If existing internal window
            this.repBus.notify(repTag, 'reload')			//reload it
          else								//If there was a popup open
            window.open('', repTag, 'height=600,width=600').close()	//find it and close it
        }
      }
    },

    closeRep(repTag, reopen) {
      let oldState = this.state.reports[repTag]
//console.log("closeRep:", repTag, oldState, reopen)
      this.$delete(this.state.reports, repTag)
      if (reopen) this.reportWin(repTag, oldState.src, oldState.client.config)
      if (oldState && oldState.popWin) oldState.popWin.close()
    },
  },

  watch: {		//Let parent and any content clients know we just posted
    'state.posted': function(isPosted) {
//console.log("Posted, children:", this.$scopedSlots, this.state.x, this.state.y)
      if (isPosted) this.$nextTick(() => {
        this.$emit('posted') 				//Tell parent
        if (this.top) this.top.posted()			//Tell anyone else who might be listening
        if (this.pinnable) this.app().listenClick(this.id, () => {
//console.log("win", this.id, "sees app click")
          this.state.posted = this.state.pinned			//Unpost me on external clicks
        })
      }); else
        this.app().listenClick(this.id)				//Un-listen for clicks
    },
  },

  created: function() {
    if (this.topLevel) this.top = new TopHandler(this)
//console.log("Win created; top:", this.id, this.topLevel, this.top)
    this.$on('swallow', this.swallowMenu)
  },

  beforeMount: function() {		//Create any state properties that don't yet exist
    Com.stateCheck(this)
//if (this.topLevel) console.log("Win state:", this.state);

    if (this.topLevel) this.$on('customize', (lang, tag, print, dirty)=>{	//Allow child to set the window's title and tagging ID
//console.log("Customize", this.id, lang, tag, print, dirty)
      this.lang = lang
      if (tag) this.stateTag = tag
      this.printable = print
      if (dirty) this.dirty = dirty

      State.listen(this.id+'sl', this.stateTag, (menuData) => {	//Handle response from the database containing stored states for this window
//console.log("Process:", this.id, this.restoreMenu.length, "Data:", menuData);
        let menuItems = menuData.map(el=>{
          return Object.assign(el, {call:()=>{
            Object.assign(this.state, Com.clone(el.data))
            Com.stateCheck(this)
            this.lastLoadIdx = el.idx
            this.lastLoadName = el.lang.title
          }})
        })
        this.restoreMenu.splice(0, this.restoreMenu.length, ...menuItems)
//console.log("WMC:", 1, this.winMenuConfig)
      }, this.top.error)
    })

    this.$on('report', (config)=>{
      let { action, repTag, info } = config
//console.log("Win got message to relaunch report: ", config)
      this.top.submitDialog(repTag, info)
    })
  },

  mounted: function() {
    let wId = '#win'+this._uid
    Interact(this.$el).resizable({		//Set up moving/resizing of windows
      inertia: true,
      margin: 7,
      edges: {top:true, left: true, right: true, bottom: true},
      restrictSize: {min: {width: 50, height: 50}},
      ignoreFrom: wId + ' .subwindows',
//      allowFrom: wId + '> .content',
      onmove: this.sizeHandler,
      onend: this.storeState
    }).draggable({
//      ignoreFrom: '.wylib-win-nodrag',	//Do we need this?
      allowFrom: '.wylib-win .handle',
      inertia: true,
      onmove: this.moveHandler
    })
//console.log("Mounted; this: ", wId, this.title, "topLevel:", this.topLevel, "top:", this.top)

    this.$on('geometry', (ev)=>{this.storeState()})	//When window layout changes, save it in localstorage

    if (this.topLevel && this.state.fresh) {		//This is a brand new window--not one restored from saved state
      this.state.fresh = false				//Mark so we don't overwrite stored state next time
      let savedState = Local.get(this.stateTag)
//console.log("Win state template:", this.id, this.stateTag, this.state.fresh, savedState)
      if (savedState) {
        delete savedState.x; delete savedState.y	//So window doesn't land right on top of the last one
        delete savedState.posted			//Honor current intent as whether visible
        Object.assign(this.state, savedState)		//Comment line for debugging from default state
//console.log("Win restoring state:", this.id, savedState)
      }
    }
//Object.keys(this.state.reports).forEach(key=>{let rep = this.state.reports[key]; console.log("Rep:",key, rep, JSON.stringify(rep.client.config))})	//Debug
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
    position: relative;
    margin: 1px 1px 0 1px;
    display: flex;
    flex-flow: row nowrap;
//    border: 1px solid red;
  }
  .wylib-win > .menus, .wylib-win > .operations {
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
    margin: 0px 2px 1px 2px;
//    overflow-x: auto;
    user-select: none;
    overflow-y: auto;
    z-index: 1;
  }
  .wylib-win .wylib-menu {
    z-index: 2;
  }
</style>
