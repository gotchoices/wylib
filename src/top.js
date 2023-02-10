//Manage communication to/from the toplevel window primarily for generating dialogs and reports.
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
const Com = require('./common')
const WinCom = require('./wincom')
const Wyseman = require('./wyseman')
const ReportFile = '/report.html'
const zLevelMod = 10
var topWins = {}		//Keep the state of all toplevel windows

module.exports = function topHandler(context, amSlave) {
  this.postCB = null
  this.context = context
  this.amSlave = amSlave
  this.dialogCB = {}
  this.clickCB = {}
  this.envCB = {}

  if (context && context.id) topWins[context.id] = context	//Keep a list of all participating windows
//console.log("Registering ID", context ? context.id : null)
//if (context.state) context.state.layer = 10		//Recover from trouble with layers (debug)

  this.env = () => {return this.context.env}
  
  this.listenWin = WinCom.listen			//Make calls available to component
  this.momWin = WinCom.mom

  this.registerDialog = function(dialogTag, cb) {	//Register handlers for our standard dialog actions
//console.log("Top register:", dialogTag)		//so callbacks are persistent across reloads
    if (cb)
      this.dialogCB[dialogTag] = cb
    else
      delete this.dialogCB[dialogTag]
  }
    
  this.submitDialog = function(dialogTag, ...args) {
    let actTag = dialogTag.split(':').slice(0,3).join(':')	//First three define the action we will be calling
//console.log("Top call:", dialogTag, actTag, ...args)
    if (this.dialogCB[actTag]) {
      return this.dialogCB[actTag](dialogTag, ...args)
    }
  }

  this.listenClick = function(tag, cb) {		//Register for a callback upon any click in the toplevel
//console.log("Top click register:", tag, !!cb)
    if (cb) this.clickCB[tag] = cb; else delete this.clickCB[tag]
  }

  this.notifyClick = function(ev) {			//Notify any listers of clicks
//console.log("Top notify click:", ev)
    Object.keys(this.clickCB).forEach(key => this.clickCB[key](ev))
  }

  this.emit = function(code, ev) {		//Do we still use this?
    this.context.$emit(code, ev)
  },

  this.layer = function(layer) {
    if (!layer) return
    let th = this.context, newLayer
      , maxLevel = -Number.MAX_VALUE
      , minLevel =  Number.MAX_VALUE
//      , levArray = []
//console.log("Layer request:", layer, "from:", th.id, th.$options.name, "cur:", th.state.layer)
    Object.keys(topWins).forEach(id => {
      let st = topWins[id].state
        , slay = st.layer
//console.log("  loop id:", id, slay)
      if (slay > maxLevel) maxLevel = slay
      if (slay < minLevel) minLevel = slay
//      if (id != th.id) levArray.push({id, slay, st})	//List of every window except the one just raised/lowered
    })
//console.log("      min:", minLevel, "max:", maxLevel)
//WIP: attempt to get child windows to render below the parent
//    levArray.sort((a,b)=>(b.slay - a.slay))		//Order windows top-down
//console.log("Sorted::", levArray)
//    let lCnt = -10
//    levArray.forEach(el=>{
//console.log(" set:", el.id, "to:", lCnt)
//      el.st.layer = lCnt
//      lCnt -= 10
//    })
//    th.layer = 100

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

  this.dewArray = function(arg1, arg2, arg3 = 'ent') {	//Make an array of objects suitable for mdew configuration
    let retArr = []						//Call as: field,lang,style or [[field,lang,style] [field,lang,style]]
    if (typeof arg1 == 'string') arg1 = [[arg1, arg2, arg3]]	//array of prompt fields
    if (Array.isArray(arg1)) {
      let focus = true;
      arg1.forEach((el)=>{
        let [ field, lang, input ] = el
        if (!input) input = arg3
        retArr.push({field, lang:this.wmCheck(lang), styles:{input, focus}})
        focus = false
      })
    }
//console.log("retArr:", retArr)
    return retArr
  },

  this.wmCheck = function(msg) {		//Is the message a shortcut wylib language code?
    if (msg[0] == '!' && ('env' in this.context)) {
      let tag = msg.slice(1)
        , wm = this.context.env.wm
//console.log("wmCheck", this.context.env)
      return wm[tag]
    } else return msg
  },

  this.makeMessage = function(msg) {		//Make a dialog message, possibly from a message object
//console.log("makeMessage:", msg, typeof msg, msg[0], this.context.wm)
    if (typeof msg == 'string')
      return this.wmCheck(msg)
    if (typeof msg == 'object') {
      if (msg.title && msg.help)
        return msg
      if (msg.lang?.title && msg.lang?.help) {
        if (msg.detail || msg.message)		//DB errors
          return {
            title: msg.lang?.title + '; ' + msg.lang?.help,
            help: msg.message ?? msg.detail
          }
        return msg.lang				//reports
      }
      if (msg.message && msg.detail)
        return {
          title: msg.message,
          help: msg.detail
        }
      if (msg.code)
        return {
          title: this.context.wm.winUnCode.title + ": " + msg.code,
          help: msg.message ?? msg.detail ?? this.context.wm.winUnCode.help
        }
      return this.makeMessage('!winUnknown')
    }
    return msg
  }
    
  this.postModal = function(message, conf) {
    if (this.context.modal) {
      let client = Object.assign({message: this.makeMessage(message, conf)}, conf)
//console.log("Modal:", this.context.modal, client)
      Object.assign(this.context.modal, {posted: true, client})
    }
  }

  this.diaButs1 = ['diaOK'],
  this.diaButs2 = ['diaCancel','diaYes'],
  this.diaButs3 = ['diaCancel','diaApply','diaOK'],
  this.error = function(lang, cb) {
    this.postModal(lang, {reason:'diaError', buttons: this.diaButs1, dews:[], data:{}, cb})
  }
  this.notice = function(lang, cb) {
    this.postModal(lang, {reason:'diaNotice', buttons: this.diaButs1, dews:[], data:{}, cb})
  }
  this.confirm = function(lang, cb) {
    this.postModal(lang, {reason:'diaConfirm', buttons: this.diaButs2, dews:[], data:{}, cb})
  }
  this.query = function(lang, dews, data, cb, check) {
    this.postModal(lang, {reason:'diaQuery', buttons: this.diaButs2, dews, data, cb, check})
  }
  this.input = function(lang, cb, defVal) {		//Ask for one value in an entry
    let data = {value:defVal}
      , dews = [{field:'value', lang, styles:{focus:true}}]
    this.postModal(lang, {reason:'diaQuery', buttons: this.diaButs2, dews, data, cb})
    return data						//Caller can also get reference to data here, in addition to callback
  }

  this.dialog = function(message, dews, data, cb, tag='dialog', buttons=this.diaButs2) {
    if (this.context.state && this.context.state.dialogs) {
//console.log("Dialog launch", tag, dews, data)
      dews.forEach(dew=>{			//;console.log(" dialog dew", dew)
        if (!(dew.field in data)) data[dew.field] = dew.styles?.initial || dew.values?.[0]?.value
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

  this.actionLaunch = function(view, action, info, bus) {	//Handle request for a report/action
    if (typeof action == 'string') {
      return notImplemented()			//Fixme: fetch action metadata, and call actionLaunch recursively
    }
    let { buttonTag, options, dialogIndex, popUp} = info
      , name = action.name
      , actTag = ['action', view, name].join(':')	//tag unique to this action
      , getKeys = () => {				//Try to get keys from dbe message bus, or fall back to key value in info
        let fromFunc = (bus && bus.mom) ? bus.mom() : null	//Will fail if restoring from saved state
//console.log("Get keys:", fromFunc || info.keys)
        return fromFunc || info.keys			//We will have to rely on stored key from last session
      }
      , repTag = (dialogIndex != undefined && dialogIndex != null)
        ? (actTag + ':' + dialogIndex) 			//link report to its option dialog
        : (action.single ? actTag : WinCom.unique(actTag))	//Make tag unique to this action
      , config = {repTag, view, action, info, actTag}	//Will save this for restore purposes

    info.keys = getKeys()				//Remember the last key values too
//console.log("Action Launcher:", view, "act:", action, "info:", info, "config:", config, "key:", JSON.stringify(info.keys))
//console.log("  repTag:", repTag, "buttonTag:", buttonTag, "options:", options, "dialogIndex:", dialogIndex, "popUp:", popUp, "bus:", bus)

    if (buttonTag == 'diaCancel') {			//If we came from a dialog, and user says cancel
      this.context.closeRep(repTag)			//Close our window if it is open
      return true
    }
    
    if (bus) bus.register(repTag, (data, pKey) => {	//Relay messages from dbe to the report slave
//console.log(" slave relay:", repTag, data, pKey, info.keys[0])

//Fixme: move this back to the dbe:?
      if (data == 'load' && pKey) info.keys[0] = pKey	//New record, remember the new primary key
      
      WinCom.child(repTag, {request:'child', data})
    })
    
    let perform = (target, message, win) => {		//Respond to messages from report window
      let {request, data} = message ? message : {}
//console.log("Report perform:", repTag, 't:', target, 'm:', message)

      if (target == 'unload') {				//Window could be closing
//console.log("Got unload from window:", repTag, "dirty:", data)
        setTimeout(() => {				//;console.log("  3 closed:", win.closed)
          if (win.closed)				//If user closed popup window
            this.context.closeRep(repTag)		//Remove the control record
        }, 500)

      } else if (target == 'report') {
//console.log("Report report:", repTag, "dirty:", data)
        this.context.repBus.notify(repTag, request, data)

      } else if (target == 'control') {			//Report window content is mounted and asking for content from the control layer on the backend
        let request = data
          , keys = getKeys()
//console.log("DB request:", view, request, options, "k:", JSON.stringify(keys))
        Wyseman.request(repTag, 'action', {view, name, data:{request, options, keys}}, (content, error) => {
//console.log("DB answers:", content, "error:", error)
          if (error) {this.error(error); return}
          if (win && content)
            win.postMessage({request:'populate', data:{render:action.render, content, config}}, location.origin)	//send content to report window
        })

      } else if (target == 'editor') {				//Content is a record editor and asking for an editing sub-command to be performed
//console.log("Command for Dbe:", request, "data:", data, "keys:", info.keys)
        if (bus && bus.mom) bus.mom(request, data, info.keys[0], ()=>{
          win.postMessage({request:'child', data:'clean'}, location.origin)	//Confirm update with report window
        })

      } else if (target == 'env') {			//Content is asking for data for its environment
//console.log("Request for env", win)
        win.postMessage({request:'env', data:{
          wm:this.context.wm, 
          pr:Object.assign({}, this.context.pr)
        }}, location.origin)	//send prefs, language metadata to report window
      }
    }
    
    if (action.render) {				//This action is a report, has a window
//console.log("Report render", repTag)
      WinCom.listen(repTag, perform)			//Get ready to communicate with it
      this.context.reportWin(repTag, ReportFile, config)	//Create the window
//setTimeout(() => {console.log("Way after:", config.repTag)}, 1000)
    } else {						//Immediate query, execute it
      perform('control')
    }
    return (buttonTag != 'diaApply')		//Tell top window to close the options dialog, if any
  }
}
