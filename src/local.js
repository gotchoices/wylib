//Manage localStorage using a cache object of all application state values
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// Stores an object in localstorage[wylib_info] that tells what app profiles are
// stored and how.  The key is the application tag and the value is one of:
// null (don't store), '' (stored unencrypted), <prompt> (stored with a password).
// The app data itself is stored, if enabled, under the key: wylib_<appTag>
//- TODO:
//- Optionally encrypt/decrypt data stored in localStorage
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
    let wylibInfo = this.getLocal(LocalInfo)
      , appInfo = this.appInfo = (wylibInfo ? wylibInfo[appTag] : undefined)
      , appIdx = LocalTag + appTag
      , appData = this.getLocal(appIdx)
//console.log("Init local:", pwState, appTag, "info:", appInfo)
    if (appInfo) {
      pwState.prompt = appInfo
    } else {
      localCache = this.getLocal(LocalTag+this.appTag)
      cb(true)
    }
  },

  check: function(site) {		//See if/how user wants to store state info locally
    let top = this.context.top
      , wm = this.context ? this.context.wm : {}
//console.log("Local check mode for site", site, this.context)

    if (this.appInfo == undefined) {
      let dewDat = {q: 'Passphrase'}
        , p = 'password'
        , dews = top.dewArray([['q','!appLocalPrompt'], ['p1','!appLocalP1',p], ['p2','!appLocalP2',p]])
      top.query('!appLocalAsk', dews, dewDat, (ans) => {
        if (ans != 'diaYes') this.appInfo = null
        else this.appInfo = dewDat.p1 ? dewDat.q : ''
        this.passPhrase = dewDat.p1
        let wylibInfo = this.setInfo(this.appInfo)
        this.flush()
      }, (dat)=>{
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
      , val = (strVal && strVal != 'undefined') ? JSON.parse(strVal) : null
    return val
  },
    
  flush: function() {			//Optionaly write local cache to local storage
    let idx = LocalTag+this.appTag
//console.log("Write local storage:", this.appInfo, "pass:", this.passPhrase, localCache)
    if (this.appInfo != null)
      localStorage.setItem(idx, JSON.stringify(localCache))
  },
    
  pw: function(ev) {		//Handle submission of user's password
    this.passPhrase = ev.target.value
//console.log("Got pw:", ev, this.passPhrase)
    ev.target.value = null
    if (this.passPhrase == 'reset' && ev.shiftKey)
      this.reset()
    localCache = this.getLocal(LocalTag+this.appTag)
//console.log("Got app data:", localCache)
    if (this.readyCB) this.readyCB(true)
  },

  set: function(idx, data, flush) {		//Save information in local storage
//console.log("Saving local:", idx, data)
    localCache[idx] = Com.clone(data)
    if (flush) this.flush()
  },
    
  get: function(idx) {				//Retrieve information from local storage
//console.log("Getting local:", idx, localCache[idx])
    return Com.clone(localCache[idx])
  },
    
  clear: function(idx) {
    if (idx in localCache) delete localCache[idx]
  },

  reset: function() {				//Delete all app information stored in local storage and reload
    let re = new RegExp('^' + LocalTag)
      , idx = LocalTag + this.appTag
    this.setInfo()				//Delete our app setting
    if (localStorage[idx]) localStorage.removeItem(idx)		//Delete any state data
    location.reload()
  },

}
