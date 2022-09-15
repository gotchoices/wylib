//Launch a singleton wyseman message handler/cache
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------

const Message = require('wyseman/lib/client_msg')
const Local = require('./local')
var log				// = console.log	//Print debug messages from library

var instance
module.exports = (function() {
  if (!instance) instance = new Message(Local, log)
  return instance
}())
