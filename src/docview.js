//Document viewer
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//- 
const Wyseman = require('./wyseman.js')
var counter = 0

module.exports = function(view, options) {
  this.view = view
  this.options = options
  
  this.close = function() {
console.log("Close window:")
  }

  this.launch = function() {
    counter++
    Wyseman.request('doc_'+counter, 'preview', {view: 'this.view'}, (data) => {
console.log("Open window:", data)
//      window.open
    })
  }
}
