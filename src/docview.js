//Document viewer
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//- 
import Wyseman from './wyseman.js'
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
