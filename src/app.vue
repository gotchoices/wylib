//Application framework
//A connection dialog, and a set of tabs for various tasks
//Copyright MyCHIPs.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
// TODO:
//X- Has to be independent of database, wylib until connection made
//X- Add main menu
//X-   Save state
//X-   Restore state
//-   Edit preferences
//- Are there more preview windows to add besides just wylib.data_v? (prefs done this way?)
//- Default language to english, but update to current language once connection made
//- Move CSS styling to preferences (once connection made)
//- 

<template>
  <div class="wylib-app">
    <div class="header">
      <div class="title" :title="help">{{ title }}</div>
      <div class="status">
        <button @click="conMenuPosted=!conMenuPosted" title="Open a dialog for connecting to backend servers">Site:</button>
        <span title="The server you are currently connected to">{{ currentSite || 'Not connected' }}</span>
        {{ retryIn ? ' (' + retryIn + ')' : null}}
        <wylib-connect v-if="conMenuPosted" :default="siteTry"/>
      </div>
    </div>
    <hr/>
    <div class="application">
      <div class="tabset">
        <div v-for="tab in tabs" class="tab" @click="tabSelect(tab.tag)" :class="tabClass(tab.tag)">
          {{ tab.title }}
        </div>
        <div class="tab-filler">
          <wylib-button :size="tabHeight" icon="menu" :toggled="appMenu.posted" @click="postAppMenu($event)" :title="appMenu.title"/>
          <wylib-win :state="appMenu" pinnable=true @close="appMenu.posted=false" :lang="lang">
            <wylib-menu :state="appMenu.client" :config="appMenuConfig" @done="appMenu.posted=appMenu.pinned"/>
          </wylib-win>
        </div>
      </div>
      <div class="subwindows">
        <wylib-modal v-if="modal.posted" :state="modal"/>
        <wylib-win v-for="win,idx in previews" topLevel=true :key="idx" :state="win" :lang="{title: win.client.dbView + ':' + idx, help: 'Preview listing of view: ' + win.client.dbView}" @close="win.posted=false">
          <wylib-dbp slot-scope="ws" :top="ws.top" :state="win.client"/>
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
import Connect from './connect.vue'
import Wyseman from './wyseman.js'
import Button from './button.vue'
import Menu from './menu.vue'
import WylibDbp from '../src/dbp.vue'
import Modal from './modal.vue'
import Win from './win.vue'

export default {
  name: 'wylib-app',
  components: {'wylib-connect': Connect, 'wylib-button': Button, 'wylib-menu': Menu, 'wylib-win': Win, 'wylib-modal': Modal, 'wylib-dbp': WylibDbp},
  props: {
    state:	{type: Object, default: {}},
    title:	{type: String},
    help:	{type: String},
    tabs:	{type: Array},
    tag:	{type: String},
    current:	{type: String},
    tryEvery:	{default: 5},
    lang:	{type: Object, default: Com.langTemplate},
  },
  data() { return {
    conMenuPosted:	true,
    appMenu:		{posted: false, client: {}, title: 'Application menu'},
    modal:		{posted: false, dews:{}, data:{}},
    currentSite:	null,
    siteTry:		'',
    retryIn:		null,
    menuTitle:		'',
    wm:			{},
    persistent:		true,
    top:		null,			//portal to communicate with toplevel window
    restoreMenu:	[],
    previews:		[{posted: false, client:{dbView: 'wylib.data_v'}}],
  }},
  computed: {
    id: function() {return 'app_' + this._uid + '_'},
    tagTitle: function () {return this.tag || this.title},
    tabHeight: function () {
      return 20
    },
    appMenuConfig: function() {let wm = this.wm
      return [
      {idx: 'sav', lang: wm.appSave,      icon: 'circle',    call: this.saveState},
      {idx: 'res', lang: wm.appRestore,   menu: this.restoreMenu},
      {idx: 'def', lang: wm.appDefault,   icon: 'circle',    call: this.defaultState},
      {idx: 'edi', lang: wm.appEditState, icon: 'circle',    call: ()=>{this.previews[0].posted = true}},
    ]},
  },
  watch: {
    currentSite: function(val, oldVal) {
      if (!val && oldVal) {		//If connection lost
        this.conMenuPosted = true
        this.retryConnect()
      }
    }
  },
  methods: {
    postAppMenu(ev) {
//console.log("postAppMenu:", ev, this.appMenu.x, this.appMenu.y, this.appMenu)
      if (!(this.appMenu.posted = !this.appMenu.posted)) return
      if (this.appMenu.x == null || this.appMenu.y == null) {	//If this is the first time posted
        this.appMenu.x = 0					//Place the menu to miss the button
        this.appMenu.y = ev.target.getBoundingClientRect().height + 4
      }
      if (this.restoreMenu.length <= 0) this.getSavedStates()	//Force query the first time
    },

    getSavedStates() {						//Build the menu to select saved states for loading
      let view = 'wylib.data_v', fields = ['ruid','own_name','name','descr','data'], where = {component: this.tag}, order=[3]
      Wyseman.request(this.id+'gs', 'select', {view, fields, where, order}, (rows, err) => {
        if (err) {this.top.error(err); return}
        let menu = []
//console.log("Rows:", rows)
        if (rows && rows.length > 0) rows.forEach(row=>{
          menu.push({idx:row.ruid, lang:{title:row.name, help:row.descr}, call:()=>{Object.assign(this.state, row.data)}})
        })
        if (menu.length <= 0) menu.push({idx:0, lang:'<None>'})
        this.restoreMenu = menu
      })
    },

    tabClass(tag) {return {
      tab:	true,
      active:	this.current == tag ? true : false,
    }},
    tabSelect(idx) {
//console.log("tabSelect:", idx)
      this.$emit('tab', idx)
    },
    retryConnect() {
//console.log("retryConnect", this.current)
      if (this.currentSite) {this.retryIn = null; return}
      if (this.retryIn == 0) Wyseman.connect()
      if (!this.retryIn) {this.retryIn = this.tryEvery} else {this.retryIn--}
      setTimeout(this.retryConnect, 1000)
    },
    saveState() {
      let resp = {t:'Default'}
        , dewArr = this.top.dewArray([['t', this.wm.appStateTag], ['h', this.wm.appStateDescr]])
      this.top.query(this.wm.appStatePrompt.help, dewArr, resp, (yesNo, tag) => {
//console.log("Response:", yesNo, tag, resp.t, resp.h)
        let view = 'wylib.set_data(text,text,text,int,jsonb)'
          , params = [this.tag, resp.t, resp.h, null, JSON.stringify(this.state)]
        if (yesNo) Wyseman.request(this.id+'ss', 'tuple', {view, params}, (res, err) => {if (err) this.top.error(err)})
      })
    },
    defaultState() {
      this.top.confirm(this.wm.appDefault.help, (yesNo, tag) => {
        if (yesNo) {this.persistent = false; location.reload()}
      })
    },
    beforeUnload() {
//console.log("About to unload.  Saving state:", JSON.stringify(this.state))
      if (this.persistent) Com.saveState(this.tagTitle, this.state); else Com.clearState(this.tagTitle)
    },
  },

  created: function() {
    Wyseman.register(this.id+'wm', 'wylib.data', (data) => {this.wm = data.msg})
  },

  beforeMount: function() {
    let savedState = Com.getState(this.tagTitle)
//console.log("Restoring state:", JSON.stringify(savedState))
    if (savedState) Object.assign(this.state, savedState)	//Comment line for debugging from default state

    Wyseman.listen(this.id+'as', 'wylib', dat =>{
//console.log("Got async:", dat, this.restoreMenu)
      if (dat.target == "data") this.getSavedStates()		//Refresh restore states menu
    })
//    Com.react(this, {})
  },

  mounted: function () {
    Wyseman.request('_main', 'connect', {stay: true}, addr => {
      if (this.currentSite = addr) this.conMenuPosted = false;
    })
    Wyseman.connect()
    window.addEventListener('beforeunload', this.beforeUnload)
    this.top = new Com.topHandler((st) => {Object.assign(this.modal, st)})
//console.log("mounted:", this.state)
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
  z-index: 10000;
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
