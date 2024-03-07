//Application framework
//A connection dialog, and a set of tabs for various tasks
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// TODO:
//- Move import/export functions to wyseman/lib/client_ws.js
//-   Password-protect keys exported to a file (Crypto.wrapkey?)
//-   Key encryption must remain compatible with Client library
//- 
<template>
  <div class="wylib-connect">
    <div class="header">
      <wylib-menudock :config="dockConfig" :state="dock" :env="env" :lang="wm.conMenu"/>
      <div>{{status}}</div>
    </div>
    <div class="label" :title="wm.h.conTitle">{{wm.t.conTitle}}:</div>
    <div class="sitelist" :title="wm.h.conTitle">
      <table>
        <tr v-for="site,idx in sites" :style="rowStyle(site.selected)" v-on:click="selectSite($event, idx)" v-on:dblclick="()=>{connectSite()}">
          <td><svg :style="keyStyle(site)" v-html="keyIcon(site)"/></td>
          <td>{{site.host}}</td>
          <td>{{site.port}}</td>
          <td>{{site.user}}</td>
        </tr>
      </table>
    </div>
    <div class="label" :title="wm.h.conImport">{{wm.t.conImport}}:<input type="file" @input="importKeys"/></div>
  </div>
</template>

<script>
const CountDown = 3
const Crypto = window.crypto
const Subtle = Crypto.subtle

const Com = require('./common')
const Local = require('./local')
const Icons = require('./icons')
const Wyseman = require('./wyseman')
const FileSaver = require('file-saver')
const Encrypt = require('wyseman/lib/encrypt')
const ClientWs = require('wyseman/lib/client_ws')
const { KeyConfig } = require('wyseman/lib/crypto')
import MenuDock from './menudock.vue'
import Button from './button.vue'
var encrypt = new Encrypt(Crypto)

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
  conExpPass: {title:'Passphrase', help:'A secret passphrase used to encrypt/decrypt saved private keys'},
  conExpPass2: {title:'Retype Passphrase', help:'Enter passphrase again'},
  conConErr: {title:'Connection Error', help:'Your connection credentials may be invalid'},
}
//  conDiscon: {title:'Server Disconnected', help:'The backend server disconnected unexpectedly'},	Not used?
const SiteKey = 'connectSites'		//Hard-coded keys for localStorage
const LastKey = 'lastSite'

export default {
  name: 'wylib-connect',
  components: {'wylib-menudock': MenuDock},
  props: {
    db:		null,
    env:	{type: Object, default: Com.envTpt},
  },
  data() { return {
    sites:		null,		//site keys we have in memory
    lastSelect:		null,		//index of the last one clicked on
    lastConnected:	null,		//site object we were last connected to
    dock:		{},		//State for menu dock
    currentSite:	null,		//URL we are connected to, if any
    status:		null,		//Status message to display in window
    tryEvery:		CountDown,
    retryIn:		CountDown,
    tryTimer:		null,
    ws:			null,		//Websocket to backend
    conn:		null,		//Connection handler
  }},
  inject: ['top'],
  computed: {
    id() {return 'con_' + this.$.uid},
    wm() {return this.env.wm},
    pr() {return this.env.pr},
    selectedSite()  {return (this.lastSelect == null) ? null : this.sites[this.lastSelect]},
    connected() {return !!this.currentSite},
    dockConfig() { return [
      {idx:'con', lang:this.wm.conConnect, call:this.togConn,   icon:'link',   shortcut:true, toggled:this.connected},
      {idx:'sub', lang:this.wm.conDelete,  call:this.delSites,  icon:'minus',  shortcut:true},
      {idx:'exp', lang:this.wm.conExport,  call:this.exportKeys,icon:'boxout'},
    ]},
  },
  methods: {
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
    userCheck(site, cb) {			//Make sure the key has a username
//console.log("User check:", site, this.db)
      if (site.user)
        cb()
      else this.top().input(this.wm.conUsername, (ans, data)=>{	//Prompt for username
        if (ans == 'diaYes' && data.value) {
          let oldIdx = this.sites.findIndex(el=>(el.host==site.host && el.port == site.port && el.user == data.value))
//console.log("Delete old key:", oldIdx)
          if (oldIdx >= 0) this.sites.splice(oldIdx, 1)		//Delete old key by same name if one exists
          site.user = data.value
          cb()
        }
      })
    },
    connectSite(site = this.selectedSite) {		//Make connection to a specified site
//console.log("Connecting to:", site, window.location.origin)

      this.userCheck(site, ()=>{
        this.conn.uri(site).then(wsURI => {
          let address = site.host + ':' + site.port
          this.ws = new WebSocket(wsURI)
          this.lastConnected = site			//;console.log("Connected to:", site)
          this.ws.addEventListener('close', event => {
            Wyseman.onClose()
//            this.top().error(this.wm.conConErr)	//Obvious enough without this
          })
          this.ws.addEventListener('error', event => {
            Wyseman.onClose()
            this.top().error(this.wm.conConErr + ': ' + event.error)
          })
          this.ws.addEventListener('message', event => {
            let m = event.data
            Wyseman.onMessage(m)}
          )
          this.ws.addEventListener('open', () => {
//console.log("OPEN!")
            delete site.token				//No longer a connection token, now uses a key
            Local.set(LastKey, {host:site.host, port:site.port, user:site.user})
            this.exportList(this.sites, (keyData)=>{	//Save keys locally in exportable format
              Local.set(SiteKey, keyData)
            })
            Wyseman.onOpen(address, m => {
//console.log("Sending:", m)
              this.ws.send(m)
            })
          })	//on open
        })	//uri
      })	//userCheck
    },
    delSites(ev) {					//Remove site from our favorites list
      for (let i = this.sites.length-1; i >= 0; i--) {
//console.log("Remove site", i, this.sites[i].selected)
        if (this.sites[i].selected) this.sites.splice(i, 1)
      }
      Local.set(SiteKey, this.sites)
    },

    exportList(sites, cb) {			//Create exportable array of sites/keys
      let expData = [], expKeys = sites.slice()		//Make local copy
//console.log(" exportList:", this.sites, expKeys)
      if (!Subtle) return				//Can't do this for insecure connections?
      for (let i = expKeys.length-1; i >= 0; i--) {
        Subtle.exportKey('jwk', expKeys[i].priv).then(keyData=>{
          let k = expKeys[i]
//console.log(" key data:", keyData)
          expData.unshift({host:k.host, port:k.port, user:k.user, key:keyData})
          expKeys.splice(i,1)				//remove this key from our list
          if (expKeys.length <= 0) cb(expData)		//when last one done, run callback
        },(err)=>{
console.log("Error in exportList:", err.message)
          this.top().error(this.wm.conCryptErr, err.message)
        })
      }
    },

    exportKeys(ev) {					//Write selected keys to a file
//console.log("Export:", ev)
      let expKeys = []					//Make local copy of the keys
      for (let i = this.sites.length-1; i >= 0; i--) {		//Get just the selected ones, in reverse order
        if (this.sites[i].selected && this.sites[i].priv) expKeys.push(this.sites[i])
      }
      if (expKeys.length <= 0) expKeys = this.sites.slice().reverse()	//Export all keys
      if (expKeys.length <= 0) return			//Nothing to export
      
      let resp = {file: 'keys.json'}			//Prepare to prompt user
        , inp = 'password'
        , dews = this.top().dewArray([['file',this.wm.conExpFile], ['p1',this.wm.conExpPass,inp], ['p2',this.wm.conExpPass2,inp]])
//console.log("ExportList:", dews)
      this.top().query(this.wm.conExport, dews, resp, (ans) => {	//Prompt for a filename, passphrase
        if (ans != 'diaYes' || !resp.file) return
        this.exportList(expKeys, (keyData)=>{
console.log("Export file:", resp.file, resp.p1, keyData.length, keyData)
          keyData = keyData.map(el=>{return {login: el}})	//Prefix each element with a descriptor
          if (keyData.length == 1) keyData = keyData[0]		//Write 1 element long array as a single object rather than an array
          let keysString = JSON.stringify(keyData)
            , saveIt = (data) => {
              let blob = new Blob([data], {type: "text/plain;charset=utf-8"})
              FileSaver.saveAs(blob, resp.file)		//File saved as a browser download
            }
          if (resp.p1)					//User provided a password
            encrypt.encrypt(resp.p1, keysString).then(saveIt)	//So encrypt the file
          else
            saveIt(keysString)				//Save unencrypted
        })
      }, d=>{				//Validity check callback
        return (d.file && (d.p1 == d.p2)) || (!d.p1 && !d.p2)	//Passwords must match
      })
    },

    installKey(obj) {					//Store a key or ticket object
      var site
//console.log("  installKey:", obj)
      for (let keyType in obj) {
        site = obj[keyType]
        if (keyType == 'ticket' || keyType == 'login') {
          let oldIdx = this.sites.findIndex(el=>(el.host==site.host && el.port == site.port && el.user == site.user))
          if (!site.user) site.user = null		//Empty stubs so user is reactive
          site.priv = null
          site.selected = null
//console.log("Adding:", oldIdx, oldIdx >= 0)
          if (oldIdx >= 0)				//Is there already a key for this same connection?
            this.sites.splice(oldIdx, 1, site)		//Replace old key
          else
            this.sites.splice(0, 0, site)		//Add in as a new one
          if (site.key) Subtle.importKey('jwk', site.key, KeyConfig, true, ['sign']).then((priv)=>{
            site.priv = priv
            Local.set(SiteKey, this.sites)
          }, (err)=>{
console.log("Error installing Key:", err.message)
            this.top().error(this.wm.conCryptErr, err.message)
          })
        }
      }
      return site
    },
    
    importKeys(ev) {					//Set/get ticket value
      Com.fileReader(ev.target, 1500, (fileData) => {
//console.log("Keys data:", typeof fileData, fileData)
        let installEm = (jsonData) => {
          if (Array.isArray(jsonData)) jsonData.forEach(el => {
            this.installKey(el)
          }); else if (typeof jsonData == 'object')
            this.installKey(jsonData)
        }
        if (!fileData.s || !fileData.i || !fileData.d) {	//Doesn't appear to be encrypted
          installEm(fileData)
        } else {					//Will try decrypting
          let resp = {}
            , dews = this.top().dewArray([['p',this.wm.conExpPass, 'password']])
          this.top().query('!diaQuery', dews, resp, (ans) => {	//Prompt for password
            if (ans != 'diaYes' || !resp.p) return
            encrypt.decrypt(resp.p, JSON.stringify(fileData)).then(d => {
//console.log("Decrypted::", d)
              installEm(JSON.parse(d))
            })
          })
        }
      })
    },

    disconnect() {
//console.log("Disconnect:")
      this.tryEvery = null		//And don't retry connect
      this.ws.close()
    },

    retryConnect() {
//console.log("Retry connect", this.lastConnected, this.tryEvery, this.retryIn, this.currentSite)
      if (this.retryIn <= 0) {			//If we counted down to zero
//console.log("  try connect:", this.lastConnected, "retryIn:", this.retryIn)
        if (this.lastConnected)
          this.connectSite(this.lastConnected)	//Try a reconnect
        this.tryEvery *= 2;			//next time we'll wait longer
        this.retryIn = this.tryEvery
      } else {
        this.retryIn--				//Else keep counting down
//console.log("  decrement", this.retryIn)
      }
      this.status = this.wm.t.conRetry + ' (' + this.retryIn + ')'	//Update status message
      if (this.tryTimer) clearTimeout(this.tryTimer)
      this.tryTimer = setTimeout(this.retryConnect, 1000)
    },
  },

  created: function() {
    this.conn = new ClientWs({
      webcrypto: Crypto,			// debug: console.log,
      httpPort: location.port,
      fetch: u => fetch(u),
      listen: this.db,
      saveKey: jKey => {
        Local.set(LastKey, {host:jKey.host, port:jKey.port, user:jKey.user})
//console.log("saveKey:", jKey, JSON.stringify(jKey.priv))
      }
    })		//Websocket connection handler
    Wyseman.langDefs(this.env.wm, WmDefs)
  },

  mounted: function () {
    let last = Local.get(LastKey)
      , parms = Com.urlParms()
      , conSite

    this.sites = Local.get(SiteKey) || []		//Get our saved list of credentials

    if (parms) {				//In case a ticket was specified in our URL
      let ticket = (({token,host,port,user}) => ({token,host,port,user}))(parms)	//Reduce to object with only the allowed attributes
//console.log("  URL ticket:", ticket)
      if (!ticket.host) ticket.host = location.hostname
      if (ticket.token && ticket.host && ticket.port) {
        let conSite = this.installKey({ticket})
        this.connectSite(conSite)		//Automatically connect
       }
    }

//console.log("Connect sites:", this.sites)
    this.sites.forEach(site=>{				//Create digital in-memory key info for each credential
      site.selected - null
//console.log("Processing saved key:", site)
      if (site.key) Subtle.importKey('jwk', site.key, KeyConfig, true, ['sign']).then((priv)=>{
        site.priv = priv
        if (!conSite && site.host == last.host && site.port == last.port && site.user == last.user)
          this.connectSite(site)			//Automatically connect
      }, (err)=>{
console.log("Error importing key:", site)
        this.top().error(this.wm.conCryptErr, err.message)
      })
    })

    Wyseman.request('_main', 'connect', {stay: true}, addr => {
//console.log("Connect callback addr:", addr, "retryIn:", this.retryIn)
      this.$emit('site', this.currentSite = addr)	//Tell my parent about connection change

      if (!addr && this.tryEvery && !this.tryTimer) {		//Failed to connect
        this.retryConnect()
      } else if (addr) {					//Success
//console.log("Success parms:", parms, "loc:", location)
        if (parms) {		//If loaded from a ticket, any reload should happen without query fields in the URL
          history.replaceState(null, '', location.origin + location.pathname)
        }
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
