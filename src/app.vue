//Application framework
//A connection dialog, and a set of tabs for various tasks
//Copyright MyCHIPs.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
// TODO:
//X- Has to be independent of database, wylib until connection made
//- Add main menu
//-   Save state
//-   Restore state
//-   Edit preferences
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
    <div v-if="currentSite" class="application">
      <div class="tabset">
        <div v-for="tab in tabs" class="tab" @click="tabSelect(tab.tag)" :class="tabClass(tab.tag)">
          {{ tab.title }}
        </div>
        <div class="tab-filler"/>
      </div>
      <div class="app-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Connect from './connect.vue'
import Wyseman from './wyseman.js'

export default {
  name: 'wylib-app',
  components: {'wylib-connect': Connect},
  props: {
    title:	{type: String},
    help:	{type: String},
    tabs:	{type: Array},
    current:	{type: String},
    tryEvery:	{default: 5}
  },
  data() { return {
//    state:      {},
    conMenuPosted:	true,
    currentSite:	null,
    siteTry:		'',
    retryIn:		null,
  }},
  computed: {
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
    tabClass(tag) {return {
      tab:	true,
      active:	this.current == tag ? true : false,
    }},
    tabSelect(idx) {
//console.log("tabSelect:", idx)
      this.$emit('tab', idx)
    },
    retryConnect() {
//console.log("rtC", this.currentSite)
      if (this.currentSite) {this.retryIn = null; return}
      if (this.retryIn == 0) Wyseman.connect()
      if (!this.retryIn) {this.retryIn = this.tryEvery} else {this.retryIn--}
      setTimeout(this.retryConnect, 1000)
    }
  },
  mounted: function () {
    Wyseman.request('_main', 'connect', {stay: true}, addr => {
      if (this.currentSite = addr) this.conMenuPosted = false;
    })
    Wyseman.connect()
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
