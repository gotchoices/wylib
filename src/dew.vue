//Database record editing component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Emit event when data changed
//X- Validity doesn't show on first load
//X- Why do fields show changed after a clear?
//X- Allow arbitrary misc attributes to be added to an input
//- Honor -justify field from wyseman wmd files
//- 
//- Later:
//- Display special function indicator on right side of entry
//- How to invoke special function (right click, or icon press)
//- Handlers for each kind of special function
//X-   Calendar
//-   Calculator
//-   Spinner
//-   Scrolled menu (static data, or callback to parent somewhere)
//-   Editing window
//- Can select from scrolled menu of available countries (and other queries)
//- 

//<--template>		Changed to render function below
//  <div class="wylib wylib-dew" :title="lang ? lang.help : null">
//    <div v-if="state.input == 'chk'" class="check" :style="genStyle">
//      <input ref="input" type="checkbox" class="checkbox" :checked="userValue" @change="input($event, $event.target.checked)" :autofocus="state.focus" :disabled="disabled"/>
//    </div>
//    <textarea ref="input" v-else-if="state.input == 'mle'" :rows="height" :cols="width" :value="userValue" @input="input" :autofocus="state.focus" :disabled="disabled" :style="genStyle"/>
//    <select ref="input" v-else-if="state.input == 'pdm'" :value="userValue" @input="input" :autofocus="state.focus" :disabled="disabled" :style="genStyle">
//      <option v-for="val in pdmValues" :label="val.title" :value="val.value" :title="val.help"/>
//    </select>
//    <input ref="input" v-else-if="state.input == 'ent'" type="text" class="text" :value="userValue" @input="input" @keyup.enter="submit" :autofocus="state.focus" :placeholder="hint" :disabled="disabled" :style="genStyle"/>
//    <input ref="input" v-else :type="state.input" :value="userValue" @input="input" @keyup.enter="submit" :autofocus="state.focus" :placeholder="hint" :disabled="disabled" :style="genStyle"/>
//  </div>
//<--template>

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
  date: '^\\d{4}[-/\\.](\\d{1,2}|[\\w]{3})[-/\\.]\\d{1,2}$',
}

export default {
  name: 'wylib-dew',
//  components: {'wylib-indate': InDate},
  props: {
    state:	{type: Object, default: () => ({})},	//Configuration
    lang:	null,
    value:	{default: null},			//value to compare dirty to
    values:	{type: Array, default: () => ([])},	//valid values for select
    field:	{default: null},			//column or field code
    nonull:	{type: Boolean, default: false},	//No nulls allowed
    bus:	null,					//message bus from parent
  },
  inject: ['top'],
  data() { return {
    pr:		require('./prefs'),
    userValue:	null,					//Value, as modified by user
    datePicker: null,
    stateTpt:	{input: 'ent', size: null, state: null, template: null, special: {}},
  }},

  computed: {
    pdmValues: function() {
      let vals = []
      this.values.forEach(el=>{
        if (typeof el != 'object') {
          el = {value: el, title: el, help:null}
        } else if ('value' in el && !('title' in el)) {
          el.title = el.value
        }
        vals.push(el)
      })
      return vals
    },
    hint: function() {
      let hint = this.state ? this.state.hint : null
      if (hint in shortHints) return shortHints[hint]; else return hint
    },
    template: function() {
      let temp = this.state ? this.state.template : null
      if (temp in shortTpts) return shortTpts[temp]; else return temp
    },
    disabled: function() {				//No user data entry, just for looking at
      return (this.state.input == 'inf' || this.state.state == 'readonly' || this.state.hide || false)
    },
    mapValue() {
//console.log("mapValue", this.field, this.value, typeof this.value)
      return (this.value != null && typeof this.value == 'object') ? JSON.stringify(this.value,null,2) : this.value
    },
    dirty() {						//The user has changed the value
      let dirty = (this.userValue != this.mapValue)
//console.log("dirty:", this.field, this.mapValue, this.userValue, dirty)
      return dirty
    },
    valid() {						//The value matches the specified template pattern or seems otherwise valid, given the field type
      let isValid = false
      if (this.state.input == 'chk' || this.state.input == 'inf') {
        isValid = true
      } else if (this.state.input == 'pdm') {
//console.log(' values:', this.userValues ? this.values.map(e=>(e.value)) : null)
        isValid = this.values ? this.pdmValues.map(e=>(e.value)).includes(this.userValue || '') : true
      } else if (this.template == null) {
        isValid = true
      } else {
        if (this.userValue == '' || this.userValue == null)
          isValid = true
        else
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
//x:console.log("width:", this.field, this.width),
      minWidth: this.width/2 + 'em',		//Better way to compare to actual text size?
    }},
    dims: function() {
      if (typeof this.state.size == 'string') return this.state.size.split(' ')
      return (typeof this.state.size == 'number') ? [this.state.size] : []
    },
    height: function() {			//Specified height in characters
//console.log("Height:", this.state.size, this.dims)
      return this.dims[1] || this.pr.dewMleHeight || 1
    },
    width: function() {				//In characters
//console.log("Width:", this.field, this.state.size, this.pr.dewEntWidth)
      return this.dims[0] || (
        this.state.input == 'mle' ? (this.pr.dewMleWidth || 40) : 
          (this.state.input != 'chk' ? (this.pr.dewEntWidth || 4) : 2)
    )},
  },

  methods: {
    input(ev, value = ev.target.value) {
//console.log("Dew input:", ev, this.nonull, value)
      if (this.state.input == 'file' && ev.target.files) {	//Special handler for file selectors
        value = ev.target.files
      } else {
        if (!this.nonull && !value) value = null		//Map '' to null if allowed
        this.userValue = value
      }
      this.$emit('input', value, this.field, this.dirty, this.valid)
    },
    submit(ev) {this.$emit('submit')},
    focus() {			//Focus cursor on this entry field
//console.log("Focusing:", this.$refs, this.field)
      this.$refs.input.focus()
    },
    set(val) {
      return({value: this.userValue = val, field: this.field, dirty: this.dirty, valid: this.valid})
    },
    clear() {
      return this.set(this.state.initial)
    }
  },

  created: function() {
//console.log("Dew init:", this.field, this.mapValue)
    this.userValue = this.mapValue
  },
  beforeMount: function() {
//console.log("Dew state:", this.field, this.value, this.userValue, JSON.stringify(this.state))
    Com.stateCheck(this)
    
    if (!('initial' in this.state)) this.state.initial = null
//console.log(" Refs:", this.field, this.state.initial, JSON.stringify(this.$refs))

    if (this.bus) this.bus.register(this.field, (msg, data) => {
//console.log('dew', this.field, 'got bus message:', msg, data)
      if (msg == 'clear')			//Set to default value
        return this.clear()
      else if (msg == 'set')			//User value = current top-down value
        return this.set(this.mapValue)
    })
  },

  mounted: function() {
//console.log(" Dew mounted:", this.field, this.state, this.mapValue, typeof this.mapValue)
    if (this.state.special == 'cal') this.datePicker = new DatePicker(this.$refs.input)
    if (this.state.focus && this.top) this.top().onPosted(() => {this.focus()})
  },
  beforeDestroy: function() {
    if (this.datePicker) this.datePicker.destroy()
  },
  
  render: function(h, context) {
    let entry
      , st = this.state
      , attrs = {value: this.userValue, autofocus: st.focus, disabled: this.disabled}
      , on = {input: this.input}
      , style = this.genStyle
      , ref = 'input'
      , conf = {ref, style, attrs, on}
//console.log("render:", this.field, st)
    if (st.other) attrs = Object.assign(attrs, st.other)
    if (st.input == 'mle') {			//Multi-line entry / textarea
      Object.assign(attrs, {rows: this.height, cols: this.width})
      entry = h('textarea', conf)
    } else if (st.input == 'chk') {		//Checkbox
      Object.assign(attrs, {type: 'checkbox'})
      delete attrs.value; Object.assign(attrs, {checked: this.userValue})
      entry = h('div', {class: 'check', style}, [h('input',
        {ref, attrs, on: {change: ev=>this.input(ev, ev.target.checked)}}
      )])
    } else if (st.input == 'pdm') {		//Pull-down menu
      let optList = []
      for (let val of this.pdmValues) {
        optList.push(h('option', {
          attrs: {label: val.title, value: val.value, title: val.help}
        }))
      }
      entry = h('select', conf, optList)
    } else if (st.input == 'button') {		//Action button
//console.log("button lang:", this.lang)
      let txt = (this.lang ? this.lang.title || this.lang : 'Reset')
        , innerHTML = txt.split(' ')[0]
      Object.assign(on, {click: ev=>this.input(ev, true)})
      Object.assign(conf, {domProps: {innerHTML}})
      entry = h('button', conf)
    } else {					//Text or other input type
      Object.assign(attrs, {type: st.input == 'ent' ? 'text' : st.input, placeholder: this.hint})
      Object.assign(conf, {class: 'text'})
      Object.assign(on, {keyup: ev=>{
        if (ev.code == 'Enter') this.submit()
      }})
//console.log("Render:", conf)
      entry = st.input ? h('input', conf) : null
    }
    return h('div', {
      class: "wylib wylib-dew",
      attrs: {title: this.lang ? this.lang.help || this.lang.title || this.lang : null},
    }, [entry])
  },
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
    width: 100%;			//Make a preferences option
  }
  .wylib-dew button {
    height: 1.5em;
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
