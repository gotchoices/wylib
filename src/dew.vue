//Database record editing component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Emit event when data changed
//- Validity doesn't show on first load
//- 
//- Later:
//- Display special function indicator on right side?
//- How to invoke special function?
//- Handlers for each kind of special function
//X-   Calendar
//-   Calculator
//-   Spinner
//-   Scrolled menu (static data, or callback to parent somewhere)
//-   Editing window
//- Can select from scrolled menu of available countries
//- 
<template>
  <div class="wylib wylib-dew" :title="lang ? lang.help : null">
    <div v-if="state.style == 'chk'" class="check" :style="genStyle">
      <input ref="input" type="checkbox" class="checkbox" :checked="userValue" @change="changed($event.target.checked)" :autofocus="state.focus" :disabled="disabled"/>
    </div>
    <textarea ref="input" v-else-if="state.style == 'mle'" :rows="height" :cols="width" :value="userValue" @input="input" :autofocus="state.focus" :disabled="disabled" :style="genStyle"/>
    <select ref="input" v-else-if="state.style == 'pdm'" :value="userValue" @input="input" :autofocus="state.focus" :disabled="disabled" :style="genStyle">
      <option v-for="val in values" :label="val.title" :value="val.value" :title="val.help"/>
    </select>
    <input ref="input" v-else="state.style == 'ent'" type="text" class="text" :value="userValue" @input="input" @keyup.enter="submit" :autofocus="state.focus" :placeholder="hint" :disabled="disabled" :style="genStyle"/>
  </div>
</template>

<script>
import Com from './common.js'
//import InDate from './indate.vue'
import DatePicker from './date.js'
const shortHints = {
  date: 'YYYY-MM-DD',
}
const shortTpts = {
  alpha: '^[a-zA-Z.]*$',
  alnum: '^[\\w.]*$',
  date: '^\\d{4}[-/\\.]\\d{1,2}[-/\\.]\\d{1,2}$',
}

export default {
  name: 'wylib-dew',
//  components: {'wylib-indate': InDate},
  props: {
    state:	{type: Object, default: () => ({})},	//Configuration
    lang:	{type: Object},
    value:	{default: null},			//value to compare dirty to
    values:	{type: Array, default: () => ([])},	//valid values for select
    field:	{default: null},			//column or field code
    bus:	null,					//message bus from parent
  },
  inject: ['top'],
  data() { return {
    pr:		require('./prefs'),
    userValue:	this.value,				//Value, as modified by user
    datePicker: null,
    stateTpt:	{style: 'ent', size: null, state: null, template: null, special: {}},
  }},

  computed: {
    hint: function() {
      let hint = this.state ? this.state.hint : null
      if (hint in shortHints) return shortHints[hint]; else return hint
    },
    template: function() {
      let temp = this.state ? this.state.template : null
      if (temp in shortTpts) return shortTpts[temp]; else return temp
    },
    disabled: function() {				//No user data entry, just for looking at
      return (this.state.style == 'inf' || this.state.state == 'readonly' || this.state.hide || false)
    },
    dirty() {						//The user has changed the value
      let dirty = (this.userValue != this.value)
//console.log("dirty:", this.field, this.value, this.userValue, dirty)
      return dirty
    },
    valid() {						//The value matches the specified template pattern or seems otherwise valid, given the field type
      let isValid = false
      if (this.state.style == 'chk' || this.state.style == 'inf') {
        isValid = true
      } else if (this.state.style == 'pdm') {
//console.log(' values:', this.userValues ? this.values.map(e=>(e.value)) : null)
        isValid = this.values ? this.values.map(e=>(e.value)).includes(this.userValue || '') : true
      } else if (this.template == null) {
        isValid = true
      } else {
        isValid = RegExp(this.template).test(this.userValue)
      }
//console.log("Valid:", this.field, this.userValue, this.template, this.disabled, isValid)
      return isValid
    },
    genStyle() { return {		//Generate style, based on data state
      borderLeftColor: this.disabled ? this.pr.dataBackground : (this.valid ? this.pr.dewBorderColor : this.pr.dewInvalidColor),
      borderRightColor: (this.disabled || !this.dirty) ? this.pr.dewBorderColor : this.pr.dewDirtyColor,
      borderBottomColor: (this.disabled ? this.pr.dataBackground : this.pr.dewBorderColor),
      background: ('background' in this.state) ? this.state.background : this.pr.dataBackground,
      borderLeftWidth: this.pr.dewFlagWidth + 'px',
      borderRightWidth: this.pr.dewFlagWidth + 'px',
    }},
    height: function() {
//console.log("Height:", this.state.size)
      return this.state.size.split(' ')[1] || this.pr.dewDefHeight || 2
    },
    width: function() {
//console.log("Width:", this.state.size)
      return this.state.size.split(' ')[0] || this.pr.dewDefWidth || 40
    },
  },

  watch: {
    value: function(val) {
      this.userValue = val
//console.log("Watched value:", this.field, val, this.userValue)
    },
  },

  methods: {
    input(ev) {this.changed(ev.target.value)},
    submit(ev) {this.$emit('submit')},
    changed(val) {
//console.log("Dew input:", this.field, val)
      this.userValue = val
      this.$emit('input', val, this.field, this.dirty, this.valid)
    },
    focus() {			//Focus cursor on this entry field
//console.log("Focusing:", this.$refs, this.field)
      this.$refs.input.focus()
    },
    set(val) {return([this.userValue = val, this.field, this.dirty, this.valid])},
    clear() {return this.set(this.state.initial)}
  },

  beforeMount: function() {
//console.log("Dew state:", this.field, JSON.stringify(this.state))
    Com.stateCheck(this)
    
    if (!('initial' in this.state)) this.state.initial = null
//console.log(" Refs:", this.field, this.state.initial, JSON.stringify(this.$refs))

    if (this.bus) this.bus.register(this.field, (msg, data) => {
//console.log('dew', this.field, 'got bus message:', msg, data)
      if (msg == 'clear') return this.clear()
      else if (msg == 'set') return this.set(data)
//      else if (msg == 'init') return this.init(data)
    })
  },

  mounted: function() {
//console.log(" Dew mounted:", this.field, this.state)
    if (this.state.special == 'cal') this.datePicker = new DatePicker(this.$refs.input)
    if (this.state.focus && this.top) this.top().onPosted(() => {this.focus()})
  },
  beforeDestroy: function() {
    if (this.datePicker) this.datePicker.destroy()
  }
}
</script>

<style lang="less">
  .wylib-dew {
//    padding: 1px 7px 1px 1px;
//    position: relative;
//border: 1px solid black;
  }
  .wylib-dew input.text, .wylib-dew div.check {
    border-style: solid;
    border-bottom-width: 1px;
    border-top-width: 0;
    border-radius: 3px;
//border: 1px solid blue;
  }
  .wylib-dew input.text {
    width: 100%;
  }
  .wylib-dew div.check {
    width: 1.7em;
  }
  .wylib-dew input.checkbox {
//border: 3px solid blue;
    margin: 0 0 2px 4px;;
  }
</style>
