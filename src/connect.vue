//Application framework
//A connection dialog, and a set of tabs for various tasks
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// TODO:
//X- Has to be independent of database, wylib until connection made
//X- Default language to english, but update to current language once connection made
//X- Add icons to show if each connection has a key or a ticket
//X- How to enter a username for a new connection (with ticket)
//X- Kickstart generates a ticket for admin
//X- Can't connect without ticket
//X- Re-import on launch of any restored keys
//X- Save last-connected site and auto-connect, if possible
//X- Can store keys in browser localStorage
//- 
//- Do I need bwm() anymore if I use $set(this,'wm',msg)?
//- Should only be able to store one key at a time with same host, port, user
//- Can password-protect keys exported to a file
//- Get automatic connect retry working again? (for example, after killing backend)
//- 

<template>
  <div class="wylib-connect">
    <div class="header">
      <wylib-menudock :config="dockConfig" :state="dock" :lang="wm.conMenu"/>
      <div>{{status}}</div>
    </div>
    <div class="label" :title="lang('conTitle')">{{lang('conTitle', 1)}}:</div>
    <div class="sitelist" :title="lang('conTitle')">
      <table>
        <tr v-for="site,idx in sites" :style="rowStyle(site.selected)" v-on:click="selectSite($event, idx)" v-on:dblclick="()=>{connectSite()}">
          <td><svg :style="keyStyle(site)" v-html="keyIcon(site)"/></td>
          <td>{{site.host}}</td>
          <td>{{site.port}}</td>
          <td>{{site.user}}</td>
        </tr>
      </table>
    </div>
    <div class="label" :title="lang('conImport')">{{lang('conImport',1)}}:<input type="file" @input="importKeys"/></div>
  </div>
</template>

<script>
const CountDown = 7
const Crypto = window.crypto.subtle
const KeyConfig = {
  name: 'RSA-PSS',
  modulusLength: 2048,
  publicExponent: new Uint8Array([1,0,1]),
  hash: 'SHA-256'
}
const SignConfig = {
  name: 'RSA-PSS',
  saltLength: 128
}
const SaltLength = 128		//For signing with RSA-PSS

import Com from './common.js'
import Local from './local.js'
import Wyseman from './wyseman.js'
import FileSaver from 'file-saver'
import MenuDock from './menudock.vue'
import Button from './button.vue'
import Icons from './icons.js'

const WmDefs = {		//English defaults, as we may not yet be connected
  conmenu:    {title:'Connect Menu', help:'Functions controlling how you connect to server sites'},
  conTitle:   {title:'Connection Keys',  help:'A list of servers where you normally connect'},
  conConnect: {title:'Connect',	help:'Connect/disconnect with this server'},
  conDelete:  {title:'Delete', help:'Remove this server from my list'},
  conImport:  {title:'Import Key', help:'Drag/drop file here or click to use a connection key or one-time access ticket'},
  conExport:  {title:'Export Keys', help:'Save connection keys to a file'},
  conRetry:   {title:'Retrying in', help:'Will attempt to connect again in this many seconds'},
  conUsername: {title:'Username', help:'Input the authorized username you will connect by'},
  conNoCrypto: {title:'No Crypto', help:'No crypto library found in browser.  Make sure you are connected by https.'},
  conCryptErr: {title:'Generating Key', help:'There was an error generating a connection key pair'},
  conExpFile: {title:'Export Filename', help:'The name of the file the browser will export keys to in your download area'},
  conConErr: {title:'Connection Error', help:'Your connection credentials may be invalid'},
}
//  conDiscon: {title:'Server Disconnected', help:'The backend server disconnected unexpectedly'},	Not used?
const SiteKey = 'connectSites'		//Hard-coded keys for localStorage
const LastKey = 'lastSite'

export default {
  name: 'wylib-connect',
  components: {'wylib-button': Button, 'wylib-menudock': MenuDock},
  props: {
    db:		null
  },
  data() { return {
    pr:			require('./prefs'),
    wm:			WmDefs,		//Language data
    sites:		null,		//site keys we have in memory
    lastSelect:		null,		//index of the last one clicked on
    lastConnected:	null,		//site object we were last connected to
    dock:		{},		//State for menu dock
    currentSite:	null,		//URL we are connected to, if any
    status:		null,		//Status message to display in window
    tryEvery:		CountDown,	//Fixme: reimplement auto retry
    retryIn:		CountDown,
    tryTimer:		null,
  }},
  inject: ['top'],
  computed: {
    id() {return 'con_' + this._uid + '_'},
    selectedSite()  {return (this.lastSelect == null) ? null : this.sites[this.lastSelect]},
    connected() {return !!this.currentSite},
    dockConfig: function() { return [
      {idx:'con', lang:this.wm.conConnect, call:this.togConn,   icon:'link',   shortcut:true, toggled:this.connected},
      {idx:'sub', lang:this.wm.conDelete,  call:this.delSites,  icon:'minus',  shortcut:true},
      {idx:'exp', lang:this.wm.conExport,  call:this.exportKeys,icon:'boxout'},
    ]},
  },
  methods: {
    bwm(key, extend) {		//Get a string from hardcoded language, or from data dictionary if possible
      let theLang =  this.wm[key] || WmDefs[key] || {}
      if (extend) theLang.help += ` (${extend})`
      return theLang
    },
    lang(key, title, defVal='') {
      return this.bwm(key)[title ? 'title' : 'help'] || defVal
    },
    keyIcon(site) {		//What icon to display in the site list
      let icon = site.priv ? 'key' : (site.token ? 'ticket' : 'exclaim')
      return Icons(icon)
    },
    keyStyle(site) {		//How the key/ticket icon displays in the site list
      let color = site.priv ? 'gold' : (site.token && site.user) ? 'green' : 'red'
      return {
        height: '1.1em', width: '1.1em',
        fill: color, stroke: color,
        backgroundColor: '#888888',
      }
    },
    rowStyle(sel) {return {
      backgroundColor: sel ? this.pr.highlightBackground : this.pr.dataBackground,
      userSelect:'none'
    }},
    selectSite(ev, idx) {			//Select, deselect a site from the list
      if (ev.shiftKey) {			//Range select
        if (this.lastSelect != null) {
          let min = Math.min(this.lastSelect, idx), max = Math.max(this.lastSelect, idx)
          for(let i = min; i <= max; i++) this.sites[i].selected = true
        } else {
          this.sites[idx].selected = true
        }
      } else if (ev.ctrlKey || ev.metaKey) {	//Multiple select
        this.sites[idx].selected = !this.sites[idx].selected
      } else {					//Single select
        this.sites.forEach(el=>{el.selected = false})
        this.sites[idx].selected = true
      }
      this.lastSelect = idx
//console.log("Select:", this.lastSelect, this.sites)
    },
    togConn(ev) {	 			//Connect/disconnect
//console.log("Toggle Connection:", this.connected, this.lastSelect, this.selectedSite)
      if (this.connected) {
        this.disconnect()	
      } else {
        if (this.selectedSite) this.$nextTick(()=>{this.connectSite()})
        if (this.tryTimer) clearTimeout(this.tryTimer)
        this.status = null
        this.retryIn = this.tryEvery = CountDown		//Retry if disconnected again
      }
    },
    keyCheck(site, cb) {			//Check for, and possibly generate connection keys
//console.log("Key check:")
      if (location.protocol == 'http:') {
        site.proto = 'ws:'			//Try to connect insecurely
        cb(site)
      } else if (site.priv)			//We already have a private key
        cb(site)
      else if (Crypto) {			//Crypto API found
//console.log("  generating key:")
        Crypto.generateKey(KeyConfig, true, ['sign','verify']).then(keyPair => {
          site.priv = keyPair.privateKey
          return Crypto.exportKey('spki', keyPair.publicKey)
        }).then(pubKey => {
          site.pub = Com.buf2hex(pubKey)
console.log("  pub:", site.pub)
          cb(site)
        }).catch(err => {
console.log("Error in keyCheck:", err.message)
          this.top().error(this.bwm('conCryptErr', err.message))
        })
      } else {
        this.top().error(this.bwm('conNoCrypto')) 
      }
    },
    userCheck(site, cb) {			//Make sure the key has a username
//console.log("User check:", site, this.db)
      if (this.db) {				//Pass db config info to connect query
        site.db = Com.buf2hex(Buffer(JSON.stringify(this.db)))
      }
      if (site.user)
        cb()
      else this.top().input(this.bwm('conUsername'), (ans, data)=>{	//Prompt for username
        if (ans == 'diaYes' && data.value) {
          let oldIdx = this.sites.findIndex(el=>(el.host==site.host && el.port == site.port && el.user == data.value))
//console.log("Delete old key:", oldIdx)
          if (oldIdx >= 0) this.sites.splice(oldIdx, 1)		//Delete old key by same name if one exists
          site.user = data.value
          cb()
        }
      })
    },
    signCheck(site, cb) {			//Add a current signature with the key
//console.log("Sign check:", site)
      if (site.token) cb()			//Don't need to sign if our credential is a connection token
      else Com.ajax(window.location.origin + '/clientinfo', (data)=>{
        let encoder = new TextEncoder()
          , { ip, cookie, userAgent, date } = data
          , message = JSON.stringify({ip, cookie, userAgent, date})	//Must rebuild in this same order in the backend!
//console.log("  Client data:", data, date, site.priv, Crypto)
        if (site.proto == 'ws:') {
          cb(site)
        } else if (Crypto) {
          Crypto.sign(SignConfig, site.priv, encoder.encode(message)).then((sign)=>{
//console.log("  signed:", sign, date)
            site.sign = Com.buf2hex(sign)
            site.date = date
            cb()
          }, (err)=>{
console.log("Error in signCheck:", err.message)
            this.top().error(this.bwm('conCryptErr', err.message))
          })
        }
      })
    },
    connectSite(site = this.selectedSite) {		//Make connection to a specified site
//console.log("Connecting to:", site, window.location.origin)
      this.keyCheck(site, ()=>this.userCheck(site, ()=>{
        this.signCheck(site, ()=>{
          this.tryEvery = CountDown			//Retry if disconnected
          this.lastConnected = site			//Remember where we last connected to
          Wyseman.connect(site, (errCode)=>{
            this.top().error(this.bwm(errCode))
          })
//          delete site.token				//No longer a connection token, now a credential
          Local.set(LastKey, {host:site.host, port:site.port, user:site.user})
          this.exportList(this.sites, (keyData)=>{	//Save keys locally in exportable format
            Local.set(SiteKey, keyData)
          })
        })
      }))
    },
    delSites(ev) {					//Remove site from our favorites list
      for (let i = this.sites.length-1; i >= 0; i--) {
//console.log("Remove site", i, this.sites[i].selected)
        if (this.sites[i].selected) this.sites.splice(i, 1)
      }
      Local.set(SiteKey, this.sites)
    },

    exportList(sites, cb) {				//Create exportable array of sites/keys
      let expData = [], expKeys = sites.slice()		//Make local copy
//console.log(" keys:", this.sites, expKeys)
      if (!Crypto) return				//Can't do this for insecure connections?
      for (let i = expKeys.length-1; i >= 0; i--) {
        Crypto.exportKey('jwk', expKeys[i].priv).then(keyData=>{
//console.log(" key data:", keyData)
          let k = expKeys[i]
          expData.unshift({host:k.host, port:k.port, user:k.user, jwk:keyData})
          expKeys.splice(i,1)				//remove this key from our list
          if (expKeys.length <= 0) cb(expData)		//when last one done, run callback
        },(err)=>{
//console.log("Error in exportSites:", err.message)
          this.top().error(this.bwm('conCryptErr', err.message))
        })
      }
    },

    exportKeys(ev) {					//Write selected keys to a file
//console.log("Export:", ev)
      let expKeys = []					//Make local copy of the keys
      for (let i = this.sites.length-1; i >= 0; i--) {		//Get just the selected ones, in reverse order
        if (this.sites[i].selected && this.sites[i].priv) expKeys.push(this.sites[i])
      }
      this.exportList(expKeys, (keyData)=>{
        if (keyData.length > 0) this.top().input(this.bwm('conExpFile'), (ans, file) => {	//Prompt for a filename
          if (ans == 'diaYes' && file.value) {
console.log("Export file:", file.value, keyData.length, keyData)
            keyData = keyData.map(el=>{return {login: el}})	//Prefix each element with a descriptor
            if (keyData.length == 1) keyData = keyData[0]	//Write 1 element long array as a single object rather than an array
            let blob = new Blob([JSON.stringify(keyData)], {type: "text/plain;charset=utf-8"})
            FileSaver.saveAs(blob, file.value)		//File saved as a browser download
          }
        }, 'keys.json')
      })
    },

    importKeys(ev) {					//Set/get ticket value
      Com.fileReader(ev.target, 1500, (fileData) => {
//console.log("Keys data:", fileData)
        let eatObject = (obj) => {			//Import a key object
//console.log("  eat:", obj)
          for (let keyType in obj) {
            let site = obj[keyType]
            if (keyType == 'ticket' || keyType == 'login') {
              let oldIdx = this.sites.findIndex(el=>(el.host==site.host && el.port == site.port && el.user == site.user))
              if (!site.user) site.user = null		//Empty stubs so user is reactive
              site.priv = null
              site.selected = null
console.log("Adding:", oldIdx)
              if (oldIdx >= 0)
                this.sites.splice(oldIdx, 1, site)	//Replace old key
              else
                this.sites.splice(0, 0, site)		//Add in new
              if (site.jwk) Crypto.importKey('jwk', site.jwk, KeyConfig, true, ['sign']).then((priv)=>{
                site.priv = priv
                Local.set(SiteKey, this.sites)
              }, (err)=>{
console.log("Error in importKeys:", err.message)
                this.top().error(this.bwm('conCryptErr', err.message))
              })
            }
          }
        }
        if (Array.isArray(fileData)) fileData.forEach(el => {
          eatObject(el)
        }); else if (typeof fileData == 'object')
          eatObject(fileData)
      })
    },

    disconnect() {
//console.log("Disconnect:")
      this.tryEvery = null		//And don't retry connect
      Wyseman.close()
    },

    retryConnect() {
//console.log("Retry connect", this.lastConnected, this.tryEvery, this.retryIn, this.currentSite)
      if (this.retryIn <= 0) {			//If we counted down to zero
//console.log("  try connect:", this.lastConnected, "retryIn:", this.retryIn)
        if (this.lastConnected) this.connectSite(this.lastConnected)	//Try a reconnect
        this.retryIn = this.tryEvery + CountDown	//next time we'll wait longer
      } else {
        this.retryIn--				//Else keep counting down
//console.log("  decrement", this.retryIn)
      }
      this.status = this.lang('conRetry', true) + ' (' + this.retryIn + ')'	//Update status message
      if (this.tryTimer) clearTimeout(this.tryTimer)
      this.tryTimer = setTimeout(this.retryConnect, 1000)
    },
  },

  created: function() {
    Wyseman.register(this.id+'wm', 'wylib.data', (data, err) => {
      if (data.msg) this.wm = data.msg
    })
  },

  mounted: function () {
    let last = Local.get(LastKey)
    this.sites = Local.get(SiteKey) || []		//Get our saved list of credentials
    this.sites.forEach(site=>{				//Create digital in-memory key info for each credential
      this.$set(site, 'selected', null)			//GUI needs to react to this
//console.log("Processing saved key:", site)
      if (site.jwk) Crypto.importKey('jwk', site.jwk, KeyConfig, true, ['sign']).then((priv)=>{
        site.priv = priv
        if (site.host == last.host && site.port == last.port && site.user == last.user)
          this.connectSite(site)			//Auto reconnect to last connected site
      }, (err)=>{
        this.top().error(this.bwm('conCryptErr', err.message))
      })
    })
//console.log("Connect mounted:", this.sites)

//    let suggested = window.location.hostname + ":" + this.port
//    if (this.sites.length == 0 || this.sites.indexOf(suggested) < 0)
//      this.newSite = suggested			//Offer a resonable default to connect to
//console.log("newSite:", this.newSite)

    Wyseman.request('_main', 'connect', {stay: true}, addr => {
//console.log("Connect callback addr:", addr, "retryIn:", this.retryIn)
      this.$emit('site', this.currentSite = addr)	//Tell my parent about connection change

      if (!addr && this.tryEvery && !this.tryTimer) {
        this.retryConnect()
      } else if (addr) {
        this.status = null
        this.retryIn = this.tryEvery = CountDown		//Retry if disconnected again
        if (this.tryTimer) {clearTimeout(this.tryTimer); this.tryTimer = null}
      }
    })
  },	//mounted
}	//component
</script>

<style lang='less'>
.wylib-connect {
  border: 1px solid blue;
  border-radius: 4px;
  background: white;
  padding: 4px;
}
.wylib-connect .header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.wylib-connect input {
  width: 100%;
}
.wylib-connect .label {
  padding: 0.4em 0 0 0.1em;
}
.wylib-connect .sitelist {
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 4px;
  font-family: Helvetica;
  font-size: 0.8em;
  min-height: 6em;
  max-height: 12em;
  max-width: 30em;
  min-width: 15em;
  overflow-y: scroll;
}
</style>
