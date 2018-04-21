//Common support functions
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//Components are responsible to tap into this object and bind to any
//appropriate properties.
//- 
import Wyseman from './wyseman.js'
var docIndex = 0

module.exports = {

  langTemplate() {return {title: null, help: null}},

  react(vm, properties, node = vm['state']) {	//Initialize properties at a specified node in a component object
    Object.keys(properties).forEach(key => {
//console.log("React:", key);
      if (!(key in node)) vm.$set(node, key, null)
      if (!node[key]) node[key] = properties[key]
    })
  },
  
  messageBus(vm) {
    this.master = vm
    this.clients = {}
    
    this.register = function(id, cb) {	//Clients register to receive callbacks
//console.log("Bus register:", id, cb)
      if (cb) 
        this.clients[id] = cb
      else if (id in this.clients && !cb)
        delete this.clients[id]
    },
    
    this.notify = function(message, data) {
      let replies = []
//console.log("Bus notify:", this.clients)
      Object.keys(this.clients).forEach(key => {
//console.log("Bus:", this.master, "notifying:", key)
        replies.push(this.clients[key](message, data))
      })
//console.log("Bus ans:", this.master, replies)
      return replies
    }
  },

  topHandler(cb) {		//Create a handler for communicating to/from the toplevel window
    this.modalCB = cb
    this.postCB = null

    this.makeMessage = function(msg) {		//Make a message, possibly from a message object
      if (typeof msg == 'string') return msg
      if (typeof msg == 'object') {
        if (msg.lang && msg.lang.title && msg.lang.help)
          return msg.lang.title + ':<br>' + msg.lang.help + (msg.detail ? '<br>(' + msg.detail + ')' : '')
        if (msg.message) return msg.message
      }
      return msg
    }

    this.error = function(msg, cb) {
      this.modalCB({posted: true, reason:'modError', message: this.makeMessage(msg), buttons: ['modOK'], affirm: 'modOK', cb})
    }
    this.notice = function(msg, cb) {
      this.modalCB({posted: true, reason:'modNotice', message: this.makeMessage(msg), buttons: ['modOK'], affirm: 'modOK', cb})
    }
    this.confirm = function(msg, cb) {
      this.modalCB({posted: true, reason:'modConfirm', message: this.makeMessage(msg), buttons: ['modCancel', 'modYes'], affirm: 'modYes', cb})
    }
    this.query = function(msg, dews, cb) {
      this.modalCB({posted: true, reason:'modQuery', message: this.makeMessage(msg), buttons: ['modCancel', 'modYes'], affirm: 'modYes', cb})
    }
    
    this.onPosted = function(cb) {		//Register to get a callback when toplevel window posts
//console.log("TopHandler got registration", cb)
      this.postCB = cb
    }
    this.posted = function() {			//Toplevel should call this when it posts
//console.log("TopHandler sees posted", this.postCB)
      if (this.postCB) this.postCB()
    }
  },
  
  clone: function(o) {				//Deep object copy
    let output = Array.isArray(o) ? [] : {}, v, key
    for (key in o) {
      v = o[key];
      output[key] = (typeof v === "object") ? this.clone(v) : v;
    }
    return output;
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
