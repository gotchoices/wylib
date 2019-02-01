//Report communication message manager
// -----------------------------------------------------------------------------
//TODO:
//- Reports can submit requests back to the parent
//- Reports restore after reload
//- 
var repWins = {}		//Callbacks for known report windows

window.addEventListener('message', function (ev) {		//Listen for messages from report popups/iframes
  let { request, data } = (typeof ev.data == 'object') ? ev.data : {request:ev.data}
//if (!ev.data.payload) console.log("Got message:", ev.source, ev.data, repWins)

  if (request && repWins[ev.source.name]) {			//If this window is registered
//console.log("Got report request:", request, "from:", ev.source.name)
    repWins[ev.source.name](request, data, ev.source)		//call its handler
  }
})

module.exports = {
  unique: function(actTag) {		//Return a unique tag, based on the base report tag
    for (let i = 0; true; i++) {
      let repTag = actTag + ':u' + i
      if (!(repTag in repWins)) return repTag
    }
  },

  register: function(repTag, cb) {	//Register a callack for the specified report tag
    if (cb)
      repWins[repTag] = cb
    else
      delete repWins[repTag]
  },
}
