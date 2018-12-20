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
//- Need to renormalize all registered windows after raise
//- 
import Wyseman from './wyseman.js'
var docIndex = 0
var topWins = {}
const zLevelMod = 10
const storeKey = 'wylibState_'

module.exports = {

  langTemplate() {return {title: null, help: null}},

  react(vm, properties, node = vm.state) {	//Initialize properties at a specified node in a component object
    Object.keys(properties).forEach(key => {
//console.log("React:", key);
      if (!(key in node)) vm.$set(node, key, properties[key])
//      if (!(key in node)) vm.$set(node, key, null)
//      if (!node[key]) node[key] = properties[key]
    })
  },
  
  topHandler(cb, context) {		//Create a handler for communicating to/from the toplevel window and generating modal dialogs there
    this.modalCB = cb
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

    this.error = function(msg, cb) {
      this.modalCB({posted: true, reason:'modError', message: this.makeMessage(msg), buttons: ['modOK'], affirm: 'modOK', dews:{}, data:{}, cb})
    }
    this.notice = function(msg, cb) {
      this.modalCB({posted: true, reason:'modNotice', message: this.makeMessage(msg), buttons: ['modOK'], affirm: 'modOK', dews:{}, data:{}, cb})
    }
    this.confirm = function(msg, cb) {
      this.modalCB({posted: true, reason:'modConfirm', message: this.makeMessage(msg), buttons: ['modCancel', 'modYes'], affirm: 'modYes', dews:{}, data:{}, cb})
    }
    this.query = function(msg, fields, data, cb) {
      this.modalCB({posted: true, reason:'modQuery', message: this.makeMessage(msg), buttons: ['modCancel', 'modYes'], affirm: 'modYes', dews: {fields}, data, cb})
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

  saveState: function(tag, data) {
    localStorage.setItem(storeKey + tag, JSON.stringify(data))
  },
    
  getState: function(tag) {
    let st = localStorage.getItem(storeKey + tag)
//console.log("Getting:", st)
    return ((st && st != 'undefined') ? JSON.parse(st) : null)
  },
    
  clearState: function(tag) {
    if (tag) {			//Clear a single state item
      localStorage.removeItem(storeKey + tag)
    } else {			//Clear all state items
      let re = new RegExp('^' + storeKey)
      for (var i = 0, len = localStorage.length; i < len; i++) {
        let key = localStorage.key(i)
//console.log("Storage key:", key, typeof key)
        if (key && key.match(re)) localStorage.removeItem(key)
      }
    }
  },
    
//  docView: function(view) {
//    docIndex++
//console.log("Ddocument preview:", view)
//    Wyseman.request('doc_'+docIndex, 'preview', {view}, (data) => {
//console.log("Open document preview:", data)
////      window.open
//    })
//  }
}
