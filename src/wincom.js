//Manage communication between windows/reports/iframes
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Reports can submit requests back to the parent
//- Reports restore after reload
//- 
var winCBs = {}				//Callbacks for known report windows
var repWins = {}			//Track child windows

window.addEventListener('message', function (ev) {		//Listen for messages from report popups/iframes
  let { request, data } = (typeof ev.data == 'object') ? ev.data : {request:ev.data}
    , name = ev.source.name
//if (!ev.data.payload) console.log("WinCom got message:", ev.source, "Data:", ev.data, "wins:", Object.keys(winCBs).length)

  if (request && winCBs[name]) {			//If this window is registered
//console.log("Got window request:", request, "from:", name)
    if (!(name in repWins)) repWins[name] = ev.source	//Remember how to call this child
    winCBs[name](request, data, ev.source)		//call its handler
  }
})

module.exports = {
  unique: function(inTag) {		//Return a unique tag for a window, based on some base tag name such as the report name
    for (let i = 0; true; i++) {
      let winTag = inTag + ':u' + i
      if (!(winTag in winCBs)) return winTag
    }
  },

  mom: function(msg) {			//Send a message to my parent or opener
    let to = window.opener || window.parent
    to.postMessage(msg, location.origin)
  },

  child: function(winTag, msg) {		//Send a message to a report window/iframe
    if (winTag in repWins) {
//console.log("wincom child:", winTag, msg)
      repWins[winTag].postMessage(msg, location.origin)
    }
  },

  listen: function(winTag, cb) {	//Register a callack for the specified report tag
    if (cb)
      winCBs[winTag] = cb
    else
      delete winCBs[winTag]
  },
}
