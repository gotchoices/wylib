//Communicate with the wyseman backend, control and model layers
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//This is one of multiple possible simultaneous front-end views
//Any GUI element can generate a request for data, for example:
//  id: A unique ID indicating the GUI element requesting the data
//  action: connect, fetch, insert, update, delete, meta, setting, etc.
//  cb: if a callback is given, we will store it until a response comes back tagged with the same action:view
//  options {
//    view: refers to a database view the action/request pertains to
//    data: other data applicable to the action: {k1: v1, k2: v2, ...}
//    stay: keep the callback registered for future actions (may be unsolicited)
//  }
//Messages from the backend will reference the original id and action, and also contains the relevant response data
// { id:id_string action: action_name, data: {k1: v1, k2: v2, ...}}
// -----------------------------------------------------------------------------
// TODO:
//- Make it so this module does not rely on wylib prefs
//- Instead initialize the object with cb to access current language
//- 
const Local = require('./local')

const Wyseman = {
  address:	'',			//To remember node:port when we are currently connected
  sendQue:	[],			//Backlog of commands to send (in cases where channel is not yet available)
  handlers:	{},			//Callbacks waiting for responses from the backend
  langCache:	{},			//Store all language queries we have done
  metaCache:	{},			//Store all table meta-data we have done
  cache:	null,			//Pointer to local copies of meta/language data
  pending:	{meta: {}, lang:{}},	//Remember details of pending requests
  callbacks:	{},			//Callbacks waiting for meta/language changes
  listens:	{},			//Callbacks waiting for async messages
  localCache:	{},			//Temporary cache just for calls from localStorage
  language:	'eng',			//Current language

  close() {				//Close server connection from this end
    this.socket.close()
    this.notify(this.addr = '')
  },

  connect(authConfig, errorCB) {			//Attempt to connect to backend server
    let { proto, host, port } = authConfig
      , address = (proto || 'wss:') + '/' + host + ':' + port
      , query = () => {					//Build the URL query
          let qList = []
          ;['user','db','token','pub','sign','date'].forEach(k => {
            if (k in authConfig) qList.push(k + '=' + authConfig[k])
          })
          return qList.join('&')
        }
//    if (!address) address = localStorage.siteSocket	//If no address given, default to the last used one
    if (!host || !port) return				//If still nothing to connect to, give up
    this.url = address + '/?' + query()			//Build websocket URL with username and token
//console.log("Connect: ", this.url)
    this.socket = new WebSocket(this.url)		//Try to connect

    this.socket.addEventListener('error', event => {	//If we get an error connecting
console.log("Error connecting to site:", address, event, event.error)
      this.notify(this.address = '')
      errorCB('conConErr')
    })

    this.socket.addEventListener('close', event => {	//If the socket gets closed
console.log("Connection closed to:", address, event)
      this.notify(this.address = '')
//      errorCB('conDiscon')
    })

    this.socket.addEventListener('open', event => {	//When socket is open and ready
      this.notify(this.address = address)		//Tell everyone we're connected
//      localStorage.setItem('siteSocket', address)	//Remember where we were connected
//console.log("Connected to backend: " + address)

      this.socket.addEventListener('message', ev => {	//When we get packets from the backend
        let pkt = JSON.parse(ev.data)			//Make it into an object
        let {id, view, action, data, error} = pkt

//console.log('Message from server: ', pkt, id, action, error)
        if (action == 'notify' && pkt.channel) {
          let chan = pkt.channel
          if (this.listens[chan]) Object.values(this.listens[chan]).forEach(cb => {
//console.log('Notify group: ', chan, data)
            cb(data)				//Call any listeners
          })
        }

        if (!id || !view || !action) return		//Invalid packet

        if (data && (action == 'meta' || action == 'lang')) {	//Special handling for meta and language data
          this.procColumns(data)			//Reorganize columns array as object
          let index = action + '~' + view		//Where we will save in local storage
          if (action == 'lang') {
//console.log(" opt.language:", id, this.handlers[id], this.handlers[id].lang.language)
            let language = this.handlers[id].lang.language || 'en'
            index = 'lang_' + language + '~' + view	//Save each language separately
            this.procMessages(data)			//Reorganize messages array as object
            this.langCache[language][view] = data	//Cache language data for this view
          } else {					//action == meta
//console.log(" meta data:", data)
            this.metaCache[view] = data			//Cache meta data
            this.linkLang(view)				//Can access language information from the view meta data
            if (data.styles && data.styles.subviews) data.styles.subviews.forEach((sv, ix)=>{	//We will be needing meta data for these sub-views too
//console.log("  meta subview:", sv)
              let svName = (typeof sv == 'string') ? sv : sv.view
                , inCache = this.metaCache[svName]
              if (inCache) {
                data.styles.subviews.splice(ix, 1, {view:svName, lang:{title:inCache.title, help:inCache.help}})
              } else {
                this.request(view + '~' + ix, 'meta', sv, dat=>{
//console.log("   got subview meta:", dat)
                  data.styles.subviews.splice(ix, 1, {view:sv, lang:{title:dat.title, help:dat.help}})
                })
              }
            })

//Fixme: also request language for any subordinate views
          }
//console.log("To localStorage:", index)
          Local.set(index, data)			//Save also to browser cache
          delete this.localCache[index]			//Free up this cache, not needed now
          this.pending[action][view] = false		//Mark pending as now complete
          setTimeout(() => {this.procQueue()}, 50)	//See if any other meta commands are queued up
        }

        if (this.handlers[id] && this.handlers[id][action] && this.handlers[id][action].cb) {	//If we have a registered handler,
//console.log("Calling handler:", id, action, "data:", data, "error:", error)
          if (error && error.code && error.code.match(/^!\w*/)) {	//If there is an error that needs translation
            let [ sch, tab, code ] = error.code.slice(1).split('.'),	//Where will we find language info
                errView = [sch, tab].join('.'),
                cache = this.cache.lang[errView]
if (error) console.log("Error:", error, errView, code, cache)
            if (!cache) {						//If we don't already have it
              this.request('_wm_E_' + id, 'lang', {language: this.language, view: errView}, (d,e) => {
                let cache = this.cache.lang[errView]			//Get it and cache it
//console.log("Now have:", error, errView, code, cache)
                if (cache.msg[code]) error.lang = cache.msg[code]	//No guaranty this language query worked (do we need to check for secondary errors?)
                this.handlers[id][action].cb(data, error)		//Execute call back
              }); return
            } else if (cache.msg[code]) {				//We have it cached
              error.lang = cache.msg[code]				//So just provide translation
            }
          }
          this.handlers[id][action].cb(data, error)	//call back with what language info we may or may not have, will call back again (above) when we have language data
        }			//handle message
      })			//message

      this.procQueue()		//Process any queued requests
    })				//open
  },				//connect

  procQueue() {					//Process requests waiting in the queue
//console.log('Processing queue:')
    let p, i, len = this.sendQue.length		//Handle only what is queued when we first enter this function
    for (i = 0; i < len; i++) {			//Else we can go into a perpetual loop
      p = this.sendQue.shift()
//console.log('  queue item:' + JSON.stringify(p) + " Len: ", this.sendQue.length)
      this.request(...p)
    }
  },

  procColumns(data) {				//Reindex columns array into column object
    if (!data) return
//console.log('Store meta/lang:', data)
    if (!data.columns) data.columns = []
    if (!data.col) data.col = {}		//Make node of columns indexed by col
    data.columns.forEach((rec, idx) => {data.col[rec['col']] = data.columns[idx]})
  },

  procMessages(data) {				//Reindex messages array into message object
    if (!data) return
    if (!data.messages) data.messages = []
    if (!data.msg) data.msg = {}		//Make node of messages indexed by code
    let msg = data.msg
    if (!msg.help) msg.h = {}			//Also make objects of just helps
    if (!msg.title) msg.t = {}			//and just titles
    data.messages.forEach((rec, idx) => {
      let code = rec.code
//console.log("Proc msg:", code, rec)
      msg[code] = data.messages[idx]
      msg.h[code] = rec.help
      msg.t[code] = rec.title
    })
  },

  linkLang(view) {				//Merge in table language data
    let lang = this.cache.lang[view]
      , meta = this.cache.meta[view]
    if (!lang || !meta) return			//No language data...
//console.log("LinkLang\n  lang:", lang, "  meta:", meta)
    if (!meta.msg) meta.msg = {}
    if (lang.msg) Object.assign(meta.msg,lang.msg)
    if (lang.help) meta.help = lang.help
    if (lang.title) meta.title = lang.title
    Object.keys(meta.col).forEach((key) => {
      if (lang.col[key]) Object.assign(meta.col[key], lang.col[key])
    })
    if (meta.styles && meta.styles.actions) meta.styles.actions.forEach(act=>{
      act.lang = meta.msg[act.name]
      if (act.options) act.options.forEach((opt,x)=>{	//Link to language for action options
        let langTag = act.name + '.' + opt.tag		//Re-structure to look more like native table column data structure
          , newElem = {field: opt.tag, lang: lang.msg[langTag], type: opt.type, styles: opt}
        act.options[x] = newElem
//console.log("  act:", act, x, act.name, newElem)
      })
    })
  },

  langDefs(langObj, defaults) {		//Create a default language object from defaults
    if (!langObj) langObj = {}
    if (!langObj.h) langObj.h = {}
    if (!langObj.t) langObj.t = {}
    Object.keys(defaults).forEach(key=>{
      langObj[key] = defaults[key]
      langObj.h[key] = defaults[key].help
      langObj.t[key] = defaults[key].title
    })
console.log('langDefs:', langObj)
    return langObj
  },

  request(id, action, opt, cb) {			//Ask to receive specified information back asynchronously
    if (typeof opt === 'string') {opt = {view: opt}}	//Shortcut: just give view rather than full options object
//console.log("Request ID: " + id + " action: " + action + " Opt: " + JSON.stringify(opt))
    let view = (opt ? opt.view : null)
    if (!this.address || this.address == '') {		//If connection not yet open
      this.sendQue.push([id,action,opt,cb])		//Queue the request for later

      if (action != 'connect') {
        let data, idx = action + '~' + view		//Where saved in local storage
        if (this.localCache[idx]) {			//Did we already fetch this from local storage once?
//console.log("From localCache:", idx, data)
          data = this.localCache[idx]
        } else {					//Use any historic value from browser for now
//console.log("From localStorage?:", idx, data)
          data = this.localCache[idx] = Local.get(idx)
        }
        if (data && cb) cb(data)			//Call back with cached (possibly obsolete) data
      }
      return						//Nothing else we can do until connection made
    }

//console.log("  processing: ", action, " View:", view)
    if (action == 'meta') {
      if (!this.cache.lang[view])		//Force language request before our meta data requested
        this.request('_wm_L_' + id, 'lang', {language: this.language, view})
    }

    if (action == 'meta' || action == 'lang') {
      if (this.cache[action][view]) {			//If we already have this data in the cache
//console.log("  got data from cache:", action, view, this.cache[action][view])
        if (cb) cb(this.cache[action][view])		//Use it
        return
      } else if (this.pending[action][view]) {		//If there is already a pending meta request for this view
        this.sendQue.push([id, action, opt, cb])	//Queue the request for later, see if the first request succeeds
//console.log("  queuing data request:", action, view)
        return
      }
//console.log("  will send request: ", action, view)
      this.pending[action][view] = true			//Note a pending meta request for this view
      setTimeout(() => {this.pending[action][view] = false}, 5000)	//Can retry after 5 seconds and on next queue check
    }
      
    let hand = this.handlers
    if (!hand[id]) hand[id] = {}			//If no handlers for this id yet
    if (!hand[id][action]) hand[id][action] = {}	//If no handler for this id, action yet
    Object.assign(hand[id][action], opt, {cb})		//Remember the options from this request {view, data, stay}
    
    if (action == 'connect') {				//Don't actually send a packet for connection status requests
      if (cb) cb(this.address)				//Just update with our address, if anyone registered to get the callback
      return
    }
    let msg = Object.assign({id, action}, opt)		//Construct message packet
//console.log("Write to backend:","Data:" + JSON.stringify(msg))
    this.socket.send(JSON.stringify(msg))		//send it to the back end
  },			//request

  notify(addr) {		//Tell any registered parties about our connection status
//console.log("Notify: " + addr + " Hands: ", this.handlers)
    Object.keys(this.handlers).forEach( id => {
      let tc = this.handlers[id].connect
      if (tc && tc.cb) {
        tc.cb(addr)
        if (!tc.stay) delete this.handlers[id].connect
      }
    })
  },

  register(id, view, cb) {	//Register to receive a call whenever view metadata updates
    if (!cb && this.callbacks[view] && this.callbacks[view][id]) {
      delete this.callbacks[view][id]
      return
    }
//console.log("Register:", id, view)
    if (!this.callbacks[view]) this.callbacks[view] = {}
    this.callbacks[view][id] = cb
    this.request(id + '~' + view, 'meta', view, cb)
  },

  listen(id, chan, cb) {		//Register to receive a call whenever asynchronous DB events happen
    if (!cb && this.listens[chan] && this.listens[chan][id]) {
      delete this.listens[chan][id]
      return
    }
    if (!this.listens[chan]) this.listens[chan] = {}
//console.log("Listening for:", id, chan)
    this.listens[chan][id] = cb
  },

  newLanguage(language) {		//Call here if our language preference changes
console.log("Wyseman new language:", language)
    this.language = language
    if (!this.langCache[language]) this.langCache[language] = {}
    this.cache.lang = this.langCache[language]	//Point to stored data in the new language
  
    let view = 'wylib.data'
    this.request('_wyseman_' + view, 'lang', {language, view})
    
    Object.keys(this.cache.meta).forEach((view) => {	//Fetch all necessary text in new language
      this.request('_wyseman_' + view, 'lang', {language, view}, (data) => {
        this.linkLang(view)
console.log("  got new language for:", view, data)
        Object.keys(this.callbacks[view]).forEach(id => {
//console.log("    CB:", view, id, this.metaCache[view])
          this.callbacks[view][id](this.metaCache[view])
        })
      })
    })
  }

}

if (!Wyseman.cache) {					//Initialize local cache
  let lang = Wyseman.language
  if (!Wyseman.langCache[lang]) Wyseman.langCache[lang] = {}
  Wyseman.cache = {meta: Wyseman.metaCache, lang: Wyseman.langCache[lang]}
}

module.exports = Wyseman
