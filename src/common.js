//Common support functions
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// Z-Level Descriptions:
// 0-9: Features within a single window
// 10, 20, 30 ...: Toplevel windows, dbp, dbs, dbe, etc (10 .. 990)
// 1000: Popup menus
// 2000: 
// -----------------------------------------------------------------------------
//- TODO:
//- Moving windows to the front will eventually overflow 990
//- Allow a child window to move behind its parent?
//- Re-normalize all registered window layers after raise
//- Add a trim option to stateCheck to remove obsolete properties?
//- 
import Wyseman from './wyseman.js'
var actIndex = 0
var topWins = {}
const zLevelMod = 10
const storeKey = 'wylibState_'

module.exports = {

  langTemplate() {return {title: null, help: null}},

  stateCheck(context, properties = context.stateTpt) {			//Initialize any needed properties in a component's state
    let st = context.state
//console.log("stateCheck:", context, properties, st)
    if (st && properties) Object.keys(properties).forEach(key => {
      if (!(key in st)) context.$set(st, key, properties[key])
    })
  },

  topHandler(context) {		//Manage communication to/from the toplevel window for generating dialogs
    this.postCB = null
    this.context = context
    
    if (context) topWins[context.id] = context	//Keep a list of all participating windows
//console.log("Registering ID", context ? context.id : null)

    this.emit = function(code, ev) {
      this.context.$emit(code, ev)
    },

    this.layer = function(layer) {
      if (!layer) return
      let th = this.context, newLayer
        , maxLevel = -Number.MAX_VALUE
        , minLevel =  Number.MAX_VALUE
//console.log("Layer request:", layer, "from:", th.id, th.$options.name, "cur:", th.state.layer)
      Object.keys(topWins).forEach((id) => {
        let st = topWins[id].state
//console.log("  loop id:", id, st.layer)
        if (st.layer > maxLevel) maxLevel = st.layer
        if (st.layer < minLevel) minLevel = st.layer
      })
//console.log("      min:", minLevel, "max:", maxLevel)
      if (layer > 0)
        newLayer = maxLevel + zLevelMod
      else
        newLayer = minLevel - zLevelMod
//console.log("Set:", th.id, "to:", newLayer)
      th.state.layer = newLayer
      if (newLayer < 0) Object.values(topWins).forEach(vmthis=>{
//console.log("  adjusting", vmthis.id, "to:", vmthis.state.layer - newLayer)
        vmthis.state.layer -= newLayer
      })
    }

    this.makeMessage = function(msg) {		//Make a dialog message, possibly from a message object
      if (typeof msg == 'string') return msg
      if (typeof msg == 'object') {
        if (msg.lang && msg.lang.title && msg.lang.help)
          return msg.lang.title + ':<br>' + msg.lang.help + (msg.detail ? '<br>(' + msg.detail + ')' : '')
        if (msg.message) return msg.message
      }
      return msg
    }
    
    this.dewArray = function(arg1, arg2, arg3 = 'ent') {	//Make an array of objects suitable for mdew configuration
      let retArr = []						//Call as: field,lang,style or [[field,lang,style] [field,lang,style]]
      if (typeof arg1 == 'string' && typeof arg2 == 'object') arg1 = [[arg1, arg2, arg3]]
      if (Array.isArray(arg1)) {
        let focus = true;
        arg1.forEach((el)=>{
          let [ field, lang, style ] = el
          if (!style) style = arg3
          retArr.push({field, lang, styles:{style, focus}})
          focus = false
        })
      }
//console.log("retArr:", retArr)
      return retArr
    }

    this.postModal = function(msg, conf) {
      if (this.context.modal) {
        let client = {message: this.makeMessage(msg)}
        Object.assign(client, conf)
        Object.assign(this.context.modal, {posted: true, client})
//console.log("Modal:", this.context.modal)
      }
    }
    this.error = function(msg, cb) {
      this.postModal(msg, {reason:'modError', buttons: ['modOK'], affirm: 'modOK', dews:[], data:{}, cb})
    }
    this.notice = function(msg, cb) {
      this.postModal(msg, {reason:'modNotice', buttons: ['modOK'], affirm: 'modOK', dews:[], data:{}, cb})
    }
    this.confirm = function(msg, cb) {
      this.postModal(msg, {reason:'modConfirm', buttons: ['modCancel', 'modYes'], affirm: 'modYes', dews:[], data:{}, cb})
    }
    this.query = function(msg, fields, data, cb) {
      this.postModal(msg, {reason:'modQuery', buttons: ['modCancel', 'modYes'], affirm: 'modYes', dews: fields, data, cb})
    }

    this.dialog = function(message, fields, data, cb, tag='dialog', buttons = ['modCancel', 'modYes']) {
      if (this.context.state && this.context.state.dialogs) {
//console.log("Dialog launch", this.context.state.dialogs)
        let client = {lang: message, reason:'modQuery', buttons, affirm: 'modYes', dews: fields, data, cb}
        let newState = {posted: true, tag, client, x:50, y:50}
          , wins = this.context.state.dialogs
//console.log("  newState:", newState)
        for(var i = 0; wins[i]; i++); wins.splice(i, 1, newState)
      }
    }
    
    this.onPosted = function(cb) {		//Register to get a callback when a dialog window posts
//console.log("TopHandler got registration", cb)
      this.postCB = cb
    }
    this.posted = function() {			//Modal dialog should call this when it posts
//console.log("TopHandler sees posted", this.postCB)
      if (this.postCB) this.postCB()
    }
  },
  
  clone: function(o) {				//Deep object copy
    let output = Array.isArray(o) ? [] : {}, v, key
    for (key in o) {
      v = o[key]
      output[key] = (typeof v === "object") ? this.clone(v) : v
    }
    return output
  },

  saveState: function(tag, data) {		//Save a component's state in local storage
    localStorage.setItem(storeKey + tag, JSON.stringify(data))
  },
    
  getState: function(tag) {			//Retrieve a stored state from local storage
    let st = localStorage.getItem(storeKey + tag)
//console.log("Getting:", st)
    return ((st && st != 'undefined') ? JSON.parse(st) : null)
  },
    
  clearState: function(tag) {			//Delete state data stored in local storage
    if (tag) {					//Clear a single state item
      localStorage.removeItem(storeKey + tag)
    } else {					//Clear all state items
      let re = new RegExp('^' + storeKey)
      for (var i = 0, len = localStorage.length; i < len; i++) {
        let key = localStorage.key(i)
//console.log("Storage key:", key, typeof key)
        if (key && key.match(re)) localStorage.removeItem(key)
      }
    }
  },
  
  addWindow(winArr, template, placement) {		//Create a new subwindow in an array of config objects
//console.log("Add Window")
    let newState = this.clone(template)
    if (placement) {
      if (typeof placement == 'object') {
        newState.x = placement.x
        newState.y = placement.y
      } else {
        newState.x += (Math.random() - 0.5) * 100
        newState.y += (Math.random() - 0.5) * 100
      }
    }
    for(var i = 0; winArr[i]; i++); winArr.splice(i, 1, newState)
  },

  closeWindow(winArr, idx, template) {
//console.log("Close Window", idx, "reopen:", reopen)
    let { x, y } = winArr[idx]
    winArr.splice(idx,1)
    if (template) this.$nextTick(()=>{this.addWindow(winArr, template, {x, y})})
  },
    
  action: function(view, action, top) {
    actIndex++
//console.log("Launch action:", action.name, action)
    top().dialog(action.lang, action.options, {}, (yesno) => {
console.log("Dialog answers:", yesno)
//      Wyseman.request('act_'+actIndex, 'action', {view, action}, (msg) => {
//        window.open
//      })
    }, 'action.name', ['modCancel','modApply','modYes'])

  }
}
