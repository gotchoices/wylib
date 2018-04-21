//A date input component
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
<template>
  <input class="wylib wylib-indate"/>
</template>

<script>
import Flatpickr from 'flatpickr'
import '../node_modules/flatpickr/dist/themes/light.css'

export default {
  name: 'wylib-indate',
  props: {
    container:	{default: null},
  },
  data() { return {
    picker:	{},
  }},
  mounted: function() {
    this.picker = Flatpickr('.date', {
      defaultDate: 'today',
      allowInput: true,
      appendTo: this.container || window.body,
      onClose: function() {
        let dstrg = this.element.value, now = new Date()
        if (/\s*^[0-9]{1,2}\s*$/.test(dstrg)) {		//Adapt to some incomplete date formats
          dstrg = now.getFullYear() + '/' + (now.getMonth()+1) + '/' + dstrg
        } else if (/^\s*[0-9]{1,2}[/-][0-9]{1,2}\s*$/.test(dstrg)) {
          dstrg = now.getFullYear() + '-' + dstrg
        } else if (/^\s*[A-Za-z]\s*[,]*\s*[0-9]{1,2}\s*$/.test(dstrg)) {
          dstrg = dstrg + now.getFullYear()
        }
console.log("Now:", now, "dstrg:", dstrg)
        let date = new Date(dstrg)
console.log("Check date:", this.element.value, date)
        if (date == 'Invalid Date') 
          this.element.value = ''
        else
          this.element.value = this.formatDate(date, 'Y-m-d')
      }
    })
  }
}
</script>
