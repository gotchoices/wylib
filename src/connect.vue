//Application framework
//A connection dialog, and a set of tabs for various tasks
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// TODO:
//- Has to be independent of database, wylib until connection made
//- Default language to english, but update to current language once connection made
//- 

<template>
  <div class="wylib-connect">
    <div class="header" title="Keeps a list of servers and ports you normally connect to">Connections:</div>
    <table>
      <tbody>
        <tr>
          <td><input v-model:value="newSite" v-on:keyup.13="addSite(newSite)" title="Type in the URL (domain:port) of the server you want to connect to"/></td>
          <td><button @click="connectSite(newSite)" title="Connect to an application server at this URL">Connect</button></td>
          <td><button @click="addSite(newSite)" title="Add a new server URL to my list">+</button></td>
        </tr>
        <tr v-for="site in sites">
          <td><label>{{ site }}</label></td>
          <td><button @click="connectSite(site)" title="Connect to an application server at this URL">Connect</button></td>
          <td><button @click="removeSite(site)" title="Remove this server from my list">-</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Wyseman from './wyseman.js'

export default {
  props: {
    siteKey:	{type: String, default: 'wylib_sites'},
    default:	{type: String, default: ''}
  },
  data() { return {
    newSite: this.default,
    sites: []
  }},
  watch: {
    default: function(val) {this.newSite = this.default}
  },
  methods: {
    connectSite(addr) {		//Force connection to a specified site
//console.log("Connecting to: " + addr)
      Wyseman.connect(addr)
    },
    addSite(addr) {		//Add favorite site to our list
//console.log("Add: " + addr)
      if (addr != '' && (this.sites.length == 0 || this.sites.indexOf(addr) < 0))
        this.sites.push(addr)
      localStorage.setItem(this.siteKey, JSON.stringify(this.sites))
    },
    removeSite(addr) {		//Remove site from our favorites list
//console.log("Remove: " + addr)
      this.sites.splice(this.sites.indexOf(addr),1)
      localStorage.setItem(this.siteKey, JSON.stringify(this.sites))
    }
  },

  mounted: function () {	//When this GUI element is activated
//console.log("Mounted:", this.sites)
    this.$nextTick(function () {
      if (localStorage[this.siteKey])	//Get our list of favorites
        this.sites = JSON.parse(localStorage.getItem(this.siteKey))
        
      let suggested = window.location.hostname + ":54321"
      if (this.sites.length == 0 || this.sites.indexOf(suggested) < 0)
        this.newSite = suggested	//Offer a resonable default to connect to
//console.log("newSite:", this.newSite)
    })
  }
}
</script>

<style lang='less'>
.wylib-connect {
  border: 1px solid black;
  border-radius: 4px;
  background: white;
  padding: 4px;
}
.wylib-connect .header {
  padding: 4px;
}
.wylib-connect table label {
  font-family: Helvetica;
  font-size: 0.8em;
}
</style>
