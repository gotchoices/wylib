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
//- Re-import on launch of any restored keys
//- Save last-connected site and auto-connect, if possible
//- 
//- Do I need bwm() anymore if I use $set(this,'wm',msg)?
//- Can only store one key at a time with same host, port, user
//- Can store keys in browser localStorage
//- Can password-protect keys exported, and/or stored in localStorage
//- Get automatic reconnect working again
//- 

<template>
  <div class="wylib-connect">
    <div class="header">
      <wylib-menudock :config="dockConfig" :state="dock" :lang="wm.conMenu"/>
      <div>{{lang(status)}}</div>
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
const CountDown = 5
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
  conRetry:   {title:'Retrying', help:'Attempting to connect again'},
  conUsername: {title:'Username', help:'Input the authorized username you will connect by'},
  conNoCrypto: {title:'No Crypto', help:'No crypto library found in browser.  Make sure you are connected by https.'},
  conCryptErr: {title:'Generating Key', help:'There was an error generating a connection key pair'},
  conExpFile: {title:'Export Filename', help:'The name of the file the browser will export keys to in your download area'},
}
const SiteKey = 'connectSites'
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
    dock:		{},		//State for menu dock
    currentSite:	null,		//URL we are connected to, if any
    status:		null,		//Name of a language key to display in status area
    tryEvery:		CountDown,
    retryIn:		2,
    tryTimer:		null,
  }},
  inject: ['top'],
  computed: {
    id() {return 'con_' + this._uid + '_'},
    selectedSite()  {return (this.lastSelect == null) ? null : this.sites[this.lastSelect]},
    connected() {return !!this.currentSite},
    tryView() {return this.tryTimer ? this.retryIn : null},
    dockConfig: function() { return [
      {idx:'con', lang:this.wm.conConnect, call:this.togConn,   icon:'link',   shortcut:true, toggled:this.connected},
      {idx:'sub', lang:this.wm.conDelete,  call:this.delSites,  icon:'minus',  shortcut:true},
      {idx:'exp', lang:this.wm.conExport,  call:this.exportKeys,icon:'boxout'},
    ]},
  },
  methods: {
    bwm(key, extend) {
      let theLang =  this.wm[key] || WmDefs[key] || {}
      if (extend) theLang.help += ` (${extend})`
      return theLang
    },
    lang(key, title, defVal='') {
      return this.bwm(key)[title ? 'title' : 'help'] || defVal
    },
    keyIcon(site) {
      let icon = site.priv ? 'key' : (site.token ? 'ticket' : 'exclaim')
      return Icons(icon)
    },
    keyStyle(site) {
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
    selectSite(ev, idx) {			//Select, deselect a site
      if (ev.shiftKey) {
        if (this.lastSelect != null) {
          let min = Math.min(this.lastSelect, idx), max = Math.max(this.lastSelect, idx)
          for(let i = min; i <= max; i++) this.sites[i].selected = true
        } else {
          this.sites[idx].selected = true
        }
      } else if (ev.ctrlKey || ev.metaKey) {
        this.sites[idx].selected = !this.sites[idx].selected
      } else {
        this.sites.forEach(el=>{el.selected = false})
        this.sites[idx].selected = true
      }
      this.lastSelect = idx
//console.log("Select:", this.lastSelect, this.sites)
    },
    togConn(ev) {	 			//Connect/disconnect
//console.log("Toggle Connection:", this.connected, this.lastSelect, this.selectedSite)
      if (this.connected) 
        this.disconnect()	
      if (this.selectedSite && !ev.shiftKey)
       this.$nextTick(()=>{this.connectSite()})
    },
//    buf2ex(buffer) {				//Convert ArrayBuffer to hex string
//      var s = '', h = '0123456789ABCDEF'
//      ;(new Uint8Array(buffer)).forEach((v) => { s += h[v >> 4] + h[v & 15]; })
//      return s
//    },
    keyCheck(site, cb) {			//Check for, and possibly generate connection keys
//console.log("Key check:")
      if (site.priv) cb(site)
      else if (Crypto) {			//Crypto API found
//console.log("  generating key:")
        Crypto.generateKey(KeyConfig, true, ['sign','verify']).then(keyPair => {
          site.priv = keyPair.privateKey
          return Crypto.exportKey('spki', keyPair.publicKey)
        }).then(pubKey => {
          site.pub = Com.buf2hex(pubKey)
//console.log("  pub:", site.pub)
          cb(site)
        }).catch(err => {
console.log("Error:", err.message)
          this.top().error(this.bwm('conCryptErr', err.message))
        })
      } else if (location.protocol == 'http:') {
        site.proto = 'ws:'			//Try to connect insecurely
        cb(site)
      } else {
        this.top().error(this.bwm('conNoCrypto')) 
      }
    },
    userCheck(site, cb) {			//Make sure the key has a username
//console.log("User check:", site, this.db)
      if (this.db) {				//Pass db config info to connect query
        site.db = Com.buf2hex(Buffer(JSON.stringify(this.db)))
      }
      if (site.user) cb()
      else this.top().input(this.bwm('conUsername'), (ans, data)=>{
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
      if (site.token) cb()			//Don't need to sign if we have a token
      else Com.ajax(window.location.origin + '/clientinfo', (data)=>{
        let encoder = new TextEncoder()
          , { ip, cookie, userAgent, date } = data
          , message = JSON.stringify({ip, cookie, userAgent, date})	//Rebuild in this same order in backend!
//console.log("  Client data:", data, date, site.priv)
        if (Crypto) {
          Crypto.sign(SignConfig, site.priv, encoder.encode(message)).then((sign)=>{
//console.log("  signed:", sign, date)
            site.sign = Com.buf2hex(sign)
            site.date = date
            cb()
          }, (err)=>{
//console.log("Error:", err.message)
            this.top().error(this.bwm('conCryptErr', err.message))
          })
        } else if (site.proto == 'ws:') 
          cb(site)
      })
    },
    connectSite(site = this.selectedSite) {		//Make connection to a specified site
//console.log("Connecting to:", site, window.location.origin)
      this.keyCheck(site, ()=>this.userCheck(site, ()=>{
        this.signCheck(site, ()=>{
//        this.tryEvery = CountDown			//Retry if disconnected
          Wyseman.connect(site)
          Local.set(LastKey, {host:site.host, port:site.port, user:site.user})
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
console.log("Error:", err.message)
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

    exportKeys(v) {					//Write selected keys to a file
console.log("Export:")
      let expData = [], expKeys = []			//Make local copy of the keys
        , writeToFile = (keyData) => {
            if (keyData.length > 0) this.top().input(this.bwm('conExpFile'), (ans, file) => {
              if (ans == 'diaYes' && file.value) {
console.log("Export file:", file.value)
                if (keyData.length == 1) keyData = keyData[0]	//Write a single object rather than an array
                let blob = new Blob([JSON.stringify(keyData)], {type: "text/plain;charset=utf-8"})
                FileSaver.saveAs(blob, file.value)
              }
            }, 'keys.json')
          }
      for (let i = this.sites.length-1; i >= 0; i--) {		//Get just the selected ones, in reverse order
        if (this.sites[i].selected && this.sites[i].priv) expKeys.push(this.sites[i])
      }
console.log(" keys:", this.sites, expKeys)
      for (let i = 0; i < expKeys.length; i++) {	//Get just the selected ones
        Crypto.exportKey('jwk', expKeys[i].priv).then(keyData=>{
console.log(" key data:", keyData)
          let k = expKeys[i]
          expData.push({login: {host:k.host, port:k.port, user:k.user, jwk:keyData}})
          expKeys.splice(i,1)
          if (expKeys.length <= 0) writeToFile(expData)
        },(err)=>{
console.log("Error:", err.message)
          this.top().error(this.bwm('conCryptErr', err.message))
        })
      }
    },

    disconnect() {
console.log("Disconnect:")
      this.tryEvery = null		//And don't retry connect
      Wyseman.close()
    },

//Disabled for now
//    retryConnect(init) {
//console.log("Retry connect", this.currentSite, this.tryEvery, this.retryIn)
//      if (this.currentSite) {			//If we got reconnected
//        this.retryIn = this.tryEvery = CountDown
//        this.tryTimer = null
//      } else if (this.retryIn <= 0) {		//If we counted down to zero
//console.log("  try connect", this.currentSite, this.retryIn)
//        Wyseman.connect()			//Try a reconnect, next time we'll wait longer
//        this.retryIn = this.tryEvery++
//        this.tryTimer = null
//      } else {
//        this.retryIn--				//Else keep counting down
//console.log("  decrement", this.retryIn)
//        this.timer = setTimeout(this.retryConnect, 1000)
//      }
//    },
  },

  created: function() {
    Wyseman.register(this.id+'wm', 'wylib.data', (data, err) => {
      if (data.msg) this.wm = data.msg
    })
  },

  mounted: function () {
    let last = Local.get(LastKey)
    this.sites = Local.get(SiteKey) || []		//Get our list of favorites
    this.sites.forEach(site=>{
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
//console.log("Connect callback:", addr, this.retryIn)
      this.$emit('site', this.currentSite = addr)	//Tell my parent about connection change
//Disable retrying for now
//      if (!addr && this.tryEvery && !this.tryTimer) {
//        this.retryConnect()
//      } else if (addr) {
//        this.tryEvery = CountDown		//Retry if disconnected
//        if (this.timer) {clearTimeout(this.timer); this.timer = null}
//      }
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
