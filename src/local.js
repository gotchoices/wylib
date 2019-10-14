//Manage localStorage using a cache object of all application state values
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// Stores an object in localstorage[wylib_info] that tells what app profiles are
// stored and how.  The key is the application tag and the value is one of:
// null (don't store), '' (stored unencrypted), <prompt> (stored with a password).
// The app data itself is stored, if enabled, under the key: wylib_<appTag>
//- TODO:
//X- Optionally encrypt/decrypt data stored in localStorage
//- Erase local storage after N bad password attempts
//- 
//- 
const Com = require('./common')

const LocalTag = 'wylib_'
const LocalInfo = LocalTag + 'info'
var localCache = {}

module.exports = {
  init: function(context, pwState, appTag, cb) {
    this.context = context
    this.appTag = appTag
    this.readyCB = cb
    let wylibInfo = this.getLocal(LocalInfo)		//Stored passphrase prompts for any/all apps
      , appInfo = this.appInfo = (wylibInfo ? wylibInfo[appTag] : undefined)	//Prompt for this app
      , appIdx = LocalTag + appTag
//console.log("Init local:", pwState, appTag, "info:", appInfo)
    if (appInfo) {					//Is there a prompt specified
      pwState.prompt = appInfo
    } else {						//No password is enabled
      let savedCache = this.getLocal(appIdx)
      if (savedCache) localCache = savedCache	//Initialize our cache from what was last saved
      cb(true)
    }
  },

  check: function(site) {		//See if/how user wants to store state info locally
    let top = this.context.top
      , wm = this.context ? this.context.wm : {}
//console.log("Local check mode for site", site, this.context)

    if (this.appInfo == undefined) {		//This is a first-time run; no stored info yet
      let dewDat = {q: 'Passphrase'}
        , p = 'password'
        , dews = top.dewArray([['q','!appLocalPrompt'], ['p1','!appLocalP1',p], ['p2','!appLocalP2',p]])
      top.query('!appLocalAsk', dews, dewDat, (ans) => {	//Ask if user wants storage password protected
        if (ans != 'diaYes') this.appInfo = null
        else this.appInfo = dewDat.p1 ? dewDat.q : ''
        this.passPhrase = dewDat.p1
        let wylibInfo = this.setInfo(this.appInfo)
        this.flush()
      }, (dat)=>{				//Validity check callback
        return (dat.q && (dat.p1 == dat.p2)) || (!dat.p1 && !dat.p2)	//Passwords must match
      })
    }
//  Com.encrypt("hello", "world")
//    .then(v => console.log("Encrypted:", v) || v)
//    .then(v => Com.decrypt("hello", v) || v)
//    .then(v => console.log("Decrypted:", v) || v)
  },

  setInfo: function(info) {		//Change app info in localStorage
    let wylibInfo = this.getLocal(LocalInfo)
    if (!wylibInfo || typeof wylibInfo != 'object') wylibInfo = {}	//Make sure it is valid data
    if (info == undefined)
      delete wylibInfo[this.appTag]
    else
      wylibInfo[this.appTag] = info			
//console.log("Write localInfo:", wylibInfo)
    localStorage.setItem(LocalInfo, JSON.stringify(wylibInfo))
    return info
  },
    
  getLocal: function(idx) {		//Retrieve information from local storage
    let strVal = localStorage.getItem(idx)
    return (strVal && strVal != 'undefined') ? JSON.parse(strVal) : null
  },
    
  flush: function() {			//Optionaly write local cache to local storage
    let idx = LocalTag + this.appTag
    if (this.appInfo) {
      let strVal = JSON.stringify(localCache)
      Com.encrypt(this.passPhrase, strVal).then(v=>{
        localStorage.setItem(idx, v)
      })
    } else {
      localStorage.setItem(idx, JSON.stringify(localCache))
    }
//console.log("Write local storage:", this.appInfo, "pass:", this.passPhrase, JSON.stringify(localCache,null,2))
  },
    
  pw: function(ev) {				//Handle submission of user's password
    this.passPhrase = ev.target.value
//console.log("Got pw:", ev, this.passPhrase)
    ev.target.value = null
    if (this.passPhrase == 'reset' && ev.shiftKey)
      return false
    let idx = LocalTag + this.appTag
      , strVal = localStorage.getItem(idx)
    if (strVal && strVal != 'undefined') {
      Com.decrypt(this.passPhrase, strVal).then(v=>{
        localCache = JSON.parse(v)
//console.log("Got app data:", localCache)
        if (this.readyCB) this.readyCB(true)
      }).catch(err=>{
//console.log("Incorrect password:", err)
      })
    }
    return true
  },

  set: function(idx, data, flush) {		//Save information in local storage
//console.log("Saving local:", idx, data, flush)
    localCache[idx] = Com.clone(data)
    if (flush) this.flush()
  },
    
  get: function(idx) {				//Retrieve information from local storage
//console.log("Getting local:", idx, localCache)
    return Com.clone(localCache[idx])
  },
    
  clear: function(idx) {
    if (idx in localCache) delete localCache[idx]
  },

  reset: function() {				//Delete all app information stored in local storage and reload
    let re = new RegExp('^' + LocalTag)
      , idx = LocalTag + this.appTag
console.log("Resetting localStorage:", idx)
    localStorage.removeItem(idx)		//Delete any state data
    this.setInfo()				//Delete passphrase prompt for this app
  },

}
