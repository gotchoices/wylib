//Manage communication to/from the toplevel window for generating dialogs and reports
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
//- 
import Com from './common.js'
import RepCom from './repcom.js'
import Wyseman from './wyseman.js'
const ReportFile = '/report.html'
const zLevelMod = 10
var topWins = {}		//Keep the state of all toplevel windows

module.exports = function topHandler(context) {
  this.postCB = null
  this.context = context
  this.dialogCB = {}

  if (context) topWins[context.id] = context		//Keep a list of all participating windows
//console.log("Registering ID", context ? context.id : null)

  this.registerDialog = function(dialogTag, cb) {	//Register handlers for our standard dialog actions
//console.log("Top register:", dialogTag)		//so callbacks are persistent across reloads
    if (cb) this.dialogCB[dialogTag] = cb; else delete this.dialogCB[dialogTag]
  }
    
  this.submitDialog = function(dialogTag, ...args) {
    let actTag = dialogTag.split(':').slice(0,3).join(':')	//First three define the action we will be calling
//console.log("Top call:", dialogTag, actTag, ...args)
    if (this.dialogCB[actTag]) {
      return this.dialogCB[actTag](dialogTag, ...args)
    }
  }

  this.emit = function(code, ev) {		//Do we still use this?
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
//console.log("Modal:", this.context.modal, client.message)
    }
  }

  this.diaButs1 = ['diaOK'],
  this.diaButs2 = ['diaCancel','diaYes'],
  this.diaButs3 = ['diaCancel','diaApply','diaYes'],
  this.error = function(msg, cb) {
    this.postModal(msg, {reason:'diaError', buttons: this.diaButs1, dews:[], data:{}, cb})
  }
  this.notice = function(msg, cb) {
    this.postModal(msg, {reason:'diaNotice', buttons: this.diaButs1, dews:[], data:{}, cb})
  }
  this.confirm = function(msg, cb) {
    this.postModal(msg, {reason:'diaConfirm', buttons: this.diaButs2, dews:[], data:{}, cb})
  }
  this.query = function(msg, dews, data, cb) {
    this.postModal(msg, {reason:'diaQuery', buttons: this.diaButs2, dews, data, cb})
  }

  this.dialog = function(message, dews, data, cb, tag='dialog', buttons=this.diaButs2) {
    if (this.context.state && this.context.state.dialogs) {
//console.log("Dialog launch", tag, dews, data)
      dews.forEach(dew=>{
        if (!(dew.field in data)) data[dew.field] = null
      })
      let client = {message, reason:'diaQuery', buttons, dews, data, tag, cb}
        , newState = {posted: true, client, x:50, y:50}
      Com.addWindow(this.context.state.dialogs, newState, this.context)
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

  this.actionLaunch = function(view, action, info, keys) {	//Handle request for a report/action
    if (typeof action == 'string') {
      return notImplemented()				//Fixme: fetch action metadata, and call actionLaunch recursively
    }
    let { buttonTag, options, dialogIndex, popUp } = info
      , name = action.name
      , actTag = ['action', view, name].join(':')
      , getKeys = () => {return (typeof keys == 'function') ? keys() : keys}
      , repTag = (dialogIndex != null) ? (actTag + ':' + dialogIndex) : (action.single ? actTag : RepCom.unique(actTag))
      , config = {view, action, info, keys:getKeys()}		//Will save this
//console.log("Action Launcher:", view, "act:", action, "keys:", keys, "info:", info)
//console.log("  repTag:", repTag, "buttonTag:", buttonTag, "options:", options, "dialogIndex:", dialogIndex, "popUp:", popUp)

    if (buttonTag == 'diaCancel') {			//If we came from a dialog, and user says cancel
      this.context.closeRep(repTag)			//Close our window if it is open
      return true
    }
    
    var perform = (req, data, win) => {			//Function to query database
//console.log("Report query:", repTag, req, data, location.origin)
      if (req == 'ready') {
        Wyseman.request(repTag, 'action', {view, name, data:{options, keys:getKeys()}}, (msg) => {
          if (msg.error) {this.notice(msg.error); return}
//console.log("DB answers:", msg)
          if (win && msg.content)
            win.postMessage({request:'populate', format:action.format, content:msg.content, config}, location.origin)	//send content to report window
        })
      } else {
console.log("Report:", repTag, "requests:", req, data)
      }
    }
    
    if (action.format) {				//This action is a report, has a window
      RepCom.register(repTag, perform)
      this.context.reportWin(repTag, ReportFile, config)
    } else {						//Immediate query, execute it
      perform('ready')
    }
    return (buttonTag != 'diaApply')		//Tell top window to close the options dialog, if any
  }
}
