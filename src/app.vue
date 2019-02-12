//Application framework
//A connection dialog, and a set of tabs for various tasks
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// TODO:
//X- Has to be independent of database, wylib until connection made
//X- Add main menu
//X-   Save state
//X-   Restore state
//X-   Edit preferences
//- Are there more preview windows to add besides just wylib.data_v? (prefs done this way?)
//- Default language to english, but update to current language once connection made
//- Move CSS styling to preferences (once connection made)
//- 

<template>
  <div class="wylib-app">
    <div class="header">
      <div class="title" :title="help">{{ title }}</div>
      <div class="status">
        <button @click="conMenuPosted=!conMenuPosted" :title="lang('appServer')">{{lang('appServer',1,'Server')}}:</button>
        <span :title="lang('appServerURL')">{{ siteConnected }}</span>
        <wylib-connect :db="db" v-show="conMenuPosted" @site="siteChange"/>
      </div>
    </div>
    <hr/>
    <div class="application">
      <div class="tabset">
        <div v-for="tab in tabs" class="tab" @click="tabSelect(tab.tag)" :class="tabClass(tab.tag)">
          {{ tab.title }}
        </div>
        <div class="tab-filler">
          <wylib-button icon="menu" :toggled="appMenu.posted" @click="postAppMenu($event)" :title="appMenu.title"/>
          <wylib-win :state="appMenu" pinnable=true @close="appMenu.posted=false">
            <wylib-menu :state="appMenu.client" :config="appMenuConfig" @done="appMenu.posted=appMenu.pinned"/>
          </wylib-win>
        </div>
      </div>
      <div class="subwindows">
        <wylib-modal v-if="modal.posted" :state="modal">
          <wylib-dialog slot-scope="ws" :state="ws.state"/>
        </wylib-modal>
        <wylib-win v-for="win,idx in previews" v-if="win.posted" topLevel=true :key="idx" :state="win" @close="win.posted=false">
          <wylib-dbp :state="win.client"/>
        </wylib-win>
      </div>
      <div class="app-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Com from './common.js'
import TopHandler from './top.js'
import Connect from './connect.vue'
import Wyseman from './wyseman.js'
import Button from './button.vue'
import Menu from './menu.vue'
import WylibDbp from '../src/dbp.vue'
import Modal from './modal.vue'
import Dialog from './dialog.vue'
import Win from './win.vue'
import State from './state.js'

export default {
  name: 'wylib-app',
  components: {'wylib-connect': Connect, 'wylib-button': Button, 'wylib-menu': Menu, 'wylib-win': Win, 'wylib-dialog': Dialog, 'wylib-modal':Modal, 'wylib-dbp': WylibDbp},
  props: {
    state:	{type: Object, default: () => ({})},
    title:	{type: String},
    help:	{type: String},
    tabs:	{type: Array},
    tag:	{type: String},
    current:	{type: String},
    db:		null,
  },
  data() { return {
    conMenuPosted:	true,
    appMenu:		{posted: false, client: {}, title: 'Application menu'},
    modal:		{posted: false, client: {}},
    currentSite:	null,
    menuTitle:		'',
    persistent:		true,
    top:		new TopHandler(this),
    restoreMenu:	[],
    previews:		[{posted: false, x:null, y:null, client:{dbView: 'wylib.data_v'}}],
    lastLoadIdx:	null,
    wm:			{			//English defaults
      appServer:	{title:'Server',	help:'Toggle menu for connecting to various servers'},
      appServerURL:	{title:'Server URL',	help:'The domain and port of the server you are currently connected to'},
      appNoConnect:	{title:'Not Connected',	help:'The application is not connected to a backend server'},
    },
  }},
  provide() { return {
    top: () => {return this.top}
  }},
  computed: {
    id: function() {return 'app_' + this._uid + '_'},
    siteConnected: function() {
      return this.currentSite || this.lang('appNoConnect',1,'Not Connected')
    },
    tagTitle: function () {return this.tag || this.title},
    appMenuConfig: function() {let wm = this.wm
      return [
      {idx: 'sav', lang: wm.appSave,      icon: 'upload', call: this.saveState},
      {idx: 'sas', lang: wm.appSaveAs,    icon: 'upload2', call: this.saveStateAs},
      {idx: 'res', lang: wm.appRestore,   icon: 'download', menu: this.restoreMenu, layout: ['lang','owner','access']},
      {idx: 'def', lang: wm.appDefault,   icon: 'home',   call: this.defaultState},
      {idx: 'edi', lang: wm.appEditState, icon: 'pencil', call: ()=>{this.previews[0].posted = true}},
    ]},
  },
  methods: {
    lang(key, title, defVal) {
      return this.wm[key] ? this.wm[key][title?'title':'help'] : defVal
    },
    siteChange(site) {
      this.currentSite = site
//      this.conMenuPosted = !site	//Fixme!
    },
    postAppMenu(ev) {
//console.log("postAppMenu:", ev, this.appMenu.x, this.appMenu.y, this.appMenu)
      if (!(this.appMenu.posted = !this.appMenu.posted)) return
      if (this.appMenu.x == null || this.appMenu.y == null) {	//If this is the first time posted
        this.appMenu.x = 0					//Place the menu to miss the button
        this.appMenu.y = ev.target.getBoundingClientRect().height + 4
      }
    },
    tabClass(tag) {return {
      tab:	true,
      active:	this.current == tag ? true : false,
    }},
    tabSelect(idx) {
//console.log("tabSelect:", idx)
      this.$emit('tab', idx)
    },
    saveStateAs() {
      let resp = {t:'Default'}
        , dewArr = this.top.dewArray([['t', this.wm.appStateTag], ['h', this.wm.appStateDescr]])
      this.top.query(this.wm.appStatePrompt.help, dewArr, resp, (tag) => {
        if (tag == 'diaYes') State.saveAs(this.tag,resp.t,resp.h,this.state,this.top.error,(ruid)=>{this.lastLoadIdx=ruid})
      })
    },
    saveState() {
      if (this.lastLoadIdx)
        State.save(this.lastLoadIdx, this.state, this.top)
      else
        this.saveStateAs()
    },
    defaultState() {
      this.top.confirm(this.wm.appDefault.help, (tag) => {
        if (tag == 'diaYes') {
          this.persistent = false
          Com.clearState()
          location.reload()
        }
      })
    },
    beforeUnload() {
//console.log("About to unload.  Saving state:", JSON.stringify(this.state))
      if (this.persistent)
        Com.saveState(this.tagTitle, this.state)
      else
        Com.clearState(this.tagTitle)
    },
  },

  created: function() {
    Wyseman.register(this.id+'wm', 'wylib.data', (data) => {this.wm = data.msg})
  },

  beforeMount: function() {
    let savedState = Com.getState(this.tagTitle)
//console.log("Restoring state:", JSON.stringify(savedState))
    if (savedState) this.$nextTick(()=>{Object.assign(this.state, savedState)})	//Comment line for debugging from default state
//    Com.stateCheck(this)
  },

  mounted: function () {
    window.addEventListener('beforeunload', this.beforeUnload)

    State.listen(this.id+'sl', this.tag, (menuData) => {
//console.log("Process:", this.id, this.restoreMenu.length, "Data:", menuData);
      let menuItems = menuData.map(el=>{
        return Object.assign(el, {call:()=>{
          Object.assign(this.state, el.data)
          this.lastLoadIdx = el.idx
        }})
      })
      this.restoreMenu.splice(0, this.restoreMenu.length, ...menuItems)
    }, this.top.error)
  },

  beforeDestroy: function() {
    window.removeEventListener('beforeunload', this.beforeUnload)
  },
}
</script>

<style lang='less'>
.wylib-app * {
  box-sizing: border-box;
}
.wylib-app > .header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 1.1em;
}
.wylib-app > .header .title {
  font-size: 1.5em;
  text-shadow: 1px 1px 2px #aaaacc;
}
.wylib-app .header .status {
  position: relative;
//  border: 1px solid brown;
}
.wylib-app .header .status .wylib-connect {
  position: absolute;
  right: 0;
  top: 1.25em;
  z-index: 100000;
}
.wylib-app .tabset {
  width: 100%;
  display: flex;
}
.wylib-app .tabset .tab {
  min-height: 20px;
  display: inline;
  border: 1px solid #c0c0c0;
  border-radius: 6px 6px 0 0;
  padding: 0.25em 0.5em 0 0.5em;
  margins: 0;
  user-select: none;
  background-color: #e0e0e0;
  flex: 0 0 auto;
}
.wylib-app .tabset .tab-filler {
  flex: 1 1 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  border-bottom: 1px solid #c0c0c0;
}
.wylib-app .tabset .tab.active {
  border-bottom-style: none;
  background-color: #ffffff;
}
.wylib-app .tabset .tab:hover {
  background-color: #fafaff;
}
.wylib-app .app-content {
  width: 100%;
  min-height: 100px;
  border-radius: 2px;
  border: 1px solid #c0c0c0;
  border-top-style: none;
}
</style>
