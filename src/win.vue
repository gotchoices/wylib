//Toplevel window
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
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
  <div :id="id" ref="root" class="wylib wylib-win" v-show="state.posted" :class="{toplevel: topLevel}" :style="[winStyleS, winStyleF]">
    <div class="header" :title="lang?.help" :style="headerStyle" @click.stop="headerClick">
      <div class="headerbar">
        <wylib-button v-if="topLevel" icon="menu" :env="env" :toggled="winMenu.posted" @activate="winMenu.posted = !winMenu.posted" :title="wm.h.winMenu"/>
        <wylib-button v-if="!topLevel && pinnable" :env="env" icon="pushpin" :size="buttonSize" :toggled="state.pinned" @activate="state.pinned = !state.pinned" :title="wm.h.winPinned"/>
        <div ref="childMenu" class="childmenu"></div>
      </div>
      <div class="handle" v-on:dblclick="minimize" v-on:click="()=>{if (top) top.layer(1)}">
        <div class="label" :style="{'font-size': (headerHeight < 16) ? (headerHeight-2) + 'px' : '1em'}">
          {{ lang?.title }}
        </div>
      </div>
      <div class="headerbar operations">
        <div ref="childStatus" class="childstatus"></div>
        <wylib-button class="closebutton" v-if="topLevel || state.pinned" icon="close" :env="env" :size="buttonSize" @activate="close" :color="pr.butCloseColor" :hoverColor="pr.butCloseHoverColor" :title="wm.h.winClose"/>
      </div>
    </div>
    <div class="subwindows">
      <wylib-win v-if="topLevel" :state="winMenu" :env="env" pinnable=true @close="winMenu.posted=false">
        <wylib-menu v-if="winMenu.posted" :state="winMenu.client" :env="env" :config="winMenuConfig()" @done="winMenu.posted=winMenu.pinned" :lang="wm.winMenu"/>
      </wylib-win>
      <wylib-win v-for="dia,key in state?.dialogs" topLevel=true :key="key" :state="dia" @close="r=>{closeDia(dia,r)}" :env="env">
        <wylib-dialog :state="dia.client" :env="env" @submit="(...a)=>{dialogSubmit(dia,...a)}"/>
      </wylib-win>
      <wylib-win v-for="rep,key in state?.reports" topLevel=true :key="key" :state="rep" :env="env" @close="r=>{closeRep(key,r)}" @report="(v,a,i,b)=>{top.actionLaunch(v,a,i,b)}">
        <wylib-report :bus="repBus" :render="rep.posted" :ready="rep.ready" :state="rep.client" :env="env"/>
      </wylib-win>
      <wylib-modal v-if="topLevel && modal.posted" :state="modal" :env="env" v-slot="ws">
        <wylib-dialog :state="ws.state" :env="env" @submit="modal.posted=false"/>
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
const Prefs = require('./prefs.js')
const State = require('./state.js')
const TopHandler = require('./top.js')
const Interact = require('interactjs')
import Menu from './menu.vue'
import Button from './button.vue'
import Dialog from './dialog.vue'
import Report from './report.vue'
import Modal from './modal.vue'
//console.log("Interact:", Interact)
Prefs.mod('win', {
  winBorderColor:	{m:'win', d:'#c0c0c0',	input:'color',	lang: 'Border Color'},
  winHighlightColor:	{m:'win', d:'#202060',	input:'color',	lang: 'Highlight Color'},
  winHeadColorHigh:	{m:'win', d:'#f0f0f8',	input:'color',	lang: 'Header Gradient Light'},
  winHeadColorLow:	{m:'win', d:'#b8b8c0',	input:'color',	lang: 'Header Gradient Dark'},
  winBorderWidth:	{m:'win', d:2,		input:'number', min:0, max:20, step:1,	lang:'Border Width'},
  winBorderRad:		{m:'win', d:5,		input:'number', min:0, max:20, step:1,	lang:'Border Radius'},
  winOpacity:		{m:'win', d:0.94,	input:'number', min:0, max:1, step:0.05,lang:'Opacity'},
  winFullHeader:	{m:'win', d:22,		input:'number', min:8, max:50, step:1,	lang:'Large Header Height'},
  winSmallHeader:	{m:'win', d:12,		input:'number', min:4, max:50, step:1,	lang:'Small Header Height'},
  winSubWindowX:	{m:'win', d:40,		input:'number', min:0, max:500, step:10,lang:'Sub Offset X'},
  winSubWindowY:	{m:'win', d:40,		input:'number', min:0, max:500, step:10,lang:'Sub Offset Y'},
})

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
    repBus:		null,
    winMenu:		{client:{}, posted: false},
    stateTpt:		{x: null, y: null, posted: false, pinned: false, layer: 10, minim: false, dialogs:{}, reports:{}, height: null, width: null, fresh: true},
  }},
  inject: ['app'],
  provide() { 
    if (this.topLevel)
      return {
        top: () => {return this.top}
      }
    else
      return {}
  },
  computed: {
    id() {return 'win_' + this.$.uid},
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
      zIndex:		this.topLevel ? this.state?.layer : MenuLayer,
    }},
    winStyleF() {return {		//Faster moves with these separate?
      transform:	'translate(' + this.state?.x + 'px, ' + this.state?.y + 'px)',
      height:		this.state?.minim ? (this.headerHeight + 6) + 'px' : (this.state?.height ? this.state.height + 'px': null),
      width:		this.state?.width ? this.state.width + 'px' : null,
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
      {idx: 'prf', lang: wm.appPrefs,     icon: 'cog',       menu: Prefs.menu('win'), layout: ['lang', 'dew']},
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
      let frame = this.$refs.root?.querySelector('iframe')
//console.log("Found iframe:", frame)
      if (frame) frame.contentWindow.print()
    },
    popup() {			// Generate printable version of a window
      let pop = this.popWin, body, style, popId = this.id+'_pop'
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
    defaultSize() {
      this.state.width = this.state.height = null
      this.top.geometry()
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

    closeDia(dia, reopen) {
      Com.closeWindow(this.state.dialogs, dia, this, reopen)
    },
    dialogSubmit(dia, ev, buttonTag, dialogTag, options) {
//console.log("Dialog submit", dia, dialogTag, buttonTag, options, ev)
      if (this.top)
        if (this.top.submitDialog(dialogTag, {buttonTag, options, dia, popUp:event.shiftKey}))
          this.closeDia(dia)
    },

    reportWin(repTag, src, config) {
      let winState = this.state.reports[repTag]
        , popUp = config.info ? config.info.popUp : null
        , ready = (iframe) => {}	//Dummy function can't survive reload in state
        , wasPosted = winState?.posted
        , foundState = false
//console.log("ReportWin state:", winState, 'repTag:',repTag, 'reps:', Object.keys(this.state.reports))
      if (winState) {
        if (!winState.ready) winState.ready = ready	//Function will have been lost in any reload
        foundState = true				//Found existing report status
        winState.client.config = config		//;console.log("Report config:", config, popUp)
      } else {
        winState = {posted: false, x:25, y:25, client:{src, config, name:repTag}, ready}
        this.state.reports[repTag] = winState		//Create new report record
      }
      if (popUp) {			//Generate browser popup
        winState.posted = false
        this.$nextTick(()=>{		//Let any report iframe die before launching the popup
//console.log("!pop:", src, "tag:", repTag, winState.posted)
          if (!window.open(src, repTag, 'height=600,width=600'))
            this.top.error(this.wm.dbePopupErr)
        })
      } else {				//Regular internal report window
//console.log("!regular:", winState, foundState, winState.posted, wasPosted)
        winState.posted = true
        if (foundState) {
          if (wasPosted)						//If existing internal window
            this.repBus.notify(repTag, 'reload')			//reload it
          else								//If there was a previous popup open
            window.open('', repTag, 'height=600,width=600').close()	//find it and close it
        }
      }
    },

    closeRep(repTag, reopen, notPosted) {
      let oldState = this.state.reports[repTag]
//console.log("closeRep:", repTag, oldState, reopen, notPosted)
      if (notPosted && oldState.posted) return		//Ignore if a regular report is currently posted
      delete this.state.reports[repTag]
      if (reopen)
        this.reportWin(repTag, oldState.src, Com.clone(oldState.client.config))
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
  },

  beforeMount: function() {		//Create any state properties that don't yet exist
    Com.stateCheck(this)
//    if (this.topLevel) console.log("Win state:", this.state)

    this.repBus = new Bus.eventBus((msg, data) => {
      if (msg == 'report') this.$nextTick(() => {	//console.log("Win asked to relaunch report: ", data.repTag)
        let { action, repTag, info } = data		//;console.log("Relaunch:", repTag)
        this.top.submitDialog(repTag, info)
      })
    })
  },

  mounted: function() {
    let wId = '#'+this.id
    Interact(this.$refs.root).resizable({		//Set up moving/resizing of windows
      inertia: true,
      margin: 7,
      edges: {top:true, left: true, right: true, bottom: true},
      restrictSize: {min: {width: 50, height: 50}},
      ignoreFrom: wId + ' .subwindows',
//      allowFrom: wId + '> .content',
      onmove: this.sizeHandler,
      onend: () => this.top?.geometry()
    }).draggable({
//      ignoreFrom: '.wylib-win-nodrag',	//Do we need this?
      allowFrom: '.wylib-win .handle',
      inertia: true,
      onmove: this.moveHandler
    })
//console.log("Mounted; this: ", wId, this.title, "topLevel:", this.topLevel, "top:", this.top)

//    this.$on('geometry', (ev)=>{this.storeState()})	//When window layout changes, save it in localstorage

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
    position: fixed;
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
