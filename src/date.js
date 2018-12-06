//Date selectors for input components
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 

import Flatpickr from 'flatpickr'
import '../node_modules/flatpickr/dist/themes/light.css'

module.exports = function(selector = '.date', defaultValue = 'today', container) {
  this.picker = Flatpickr(selector, {
    allowInput: true,
//    defaultDate: defaultValue,
//    appendTo: container || window.body,
    onClose: this.closeHandler
  })

  this.closeHandler = function() {
    let dstrg = this.element.value, now = new Date()
    if (/\s*^[0-9]{1,2}\s*$/.test(dstrg)) {		//Adapt to some incomplete date formats
      dstrg = now.getFullYear() + '/' + (now.getMonth()+1) + '/' + dstrg
    } else if (/^\s*[0-9]{1,2}[/-][0-9]{1,2}\s*$/.test(dstrg)) {
      dstrg = now.getFullYear() + '-' + dstrg
    } else if (/^\s*[A-Za-z]\s*[,]*\s*[0-9]{1,2}\s*$/.test(dstrg)) {
      dstrg = dstrg + now.getFullYear()
    }
//console.log("Now:", now, "dstrg:", dstrg)
    let date = new Date(dstrg)
//console.log("Check date:", this.element.value, date)
    if (date == 'Invalid Date') 
      this.element.value = ''
    else
      this.element.value = this.formatDate(date, 'Y-m-d')
  }

  this.destroy = function() {this.picker.destroy()}
  
  return(this.picker)
}
