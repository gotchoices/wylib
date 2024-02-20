//Manage communication between windows/reports/iframes
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
var winCBs = {}				//Callbacks for known report windows
var repWins = {}			//Track child windows
var myMom = window.opener || window.parent

window.addEventListener('message', function (ev) {	//Listen for messages from report popups/iframes
//console.log("WinCom got message:", ev.source, "Data:", ev.data, "wins:", Object.keys(winCBs).length)
  let oData = (typeof ev.data == 'string') ? JSON.parse(ev.data) : ev.data
    , { request, data } = oData
    , name = ev.source.name

  if (request && winCBs[name]) {			//If this window is registered
//console.log("WinCom request:", request, "from:", name, "data:", data, "s:", ev.source)
    if (!(name in repWins))				//Remember how to call this child
      repWins[name] = ev.source
    winCBs[name](request, data, ev.source)		//call its handler
  }
})

//console.log("myMom:", myMom, "self:", window)
if (window.self !== myMom) {				//;console.log("  setup closing hook")
  window.addEventListener('beforeunload', ev => {
    WinCom.post(myMom, {request: 'unload'})		;console.log("I am dying:", ev)
//    myMom.postMessage('unload', location.origin)
  })
}

const WinCom = {
  unique: function(inTag) {		//Return a unique tag for a window, based on some base tag name such as the report name
    for (let i = 0; true; i++) {
      let winTag = inTag + ':u' + i
      if (!(winTag in winCBs)) return winTag
    }
  },

  post: function(win, msg) {		//Send a message object to another window
    let sMsg = JSON.stringify(msg)
    if (win) win.postMessage(sMsg, location.origin)
  },

  mom: function(msg) {			//Send a message to my parent or opener
    WinCom.post(myMom, msg)
  },

  child: function(winTag, msg) {	//Send a message to a report window/iframe
    if (winTag in repWins) {
//console.log("wincom child:", winTag, msg)
      WinCom.post(repWins[winTag], msg)
    }
  },

  listen: function(winTag, cb) {	//Register a callack for the specified report tag
//console.log("Wincom listen:", winTag)
    if (cb)
      winCBs[winTag] = cb
    else
      delete winCBs[winTag]
  },
}

module.exports = WinCom
