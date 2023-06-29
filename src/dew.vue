//Database record editing component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Split out configuration from state prop
//- Handlers for each kind of special function
//X-   Calendar
//X-   Calculator
//X-   Spinner
//-   Scrolled menu (static data, or callback to parent somewhere)
//-   Editing window
//- Can select from scrolled menu of available countries (and other queries)
//- 

<script>
import Win from './win.vue'
import Calc from './calc.vue'
import File from './file.vue'
import Scm from './scm.vue'

const Com = require('./common.js')
const DatePicker = require('./date.js')
const Buffer = require('buffer/').Buffer
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
  components: {'wylib-calc': Calc, 'wylib-scm': Scm, 'wylib-file': File},
  props: {
    state:	{type: Object, default: () => ({})},	//Configuration
    config:	{type: Object, default: () => ({input: 'ent'})},
    lang:	null,
    value:	{default: null},			//value to compare dirty to
    values:	{type: Array, default: () => ([])},	//valid values for select
    field:	{default: null},			//column or field code
    nonull:	{type: Boolean, default: false},	//No nulls allowed
    bus:	null,					//message bus from parent
    env:	{type: Object, default: Com.envTpt},
  },
  inject: ['top'],
  data() { return {
    userValue:	null,					//Value, as modified by user
    datePicker: null,
    stateTpt:	{menu: {posted: false, client: {}}},
  }},

  computed: {
    pr() {return this.env.pr},

    pdmValues() {
      let vals = []
      this.values?.forEach(el=>{
        if (typeof el != 'object') {
          el = {value: el, title: el, help:null}
        } else if ('value' in el && !('title' in el)) {
          el.title = el.value
        }
        vals.push(el)
      })
      return vals
    },

    hint() {
      let hint = this.config ? this.config.hint : null
      if (hint in shortHints) return shortHints[hint]; else return hint
    },

    template() {
      let temp = this.config ? this.config.template : null
      if (temp in shortTpts) return shortTpts[temp]; else return temp
    },

    disabled() {				//No user data entry, just for looking at
      return (this.config.input == 'inf' || this.config.state == 'readonly' || this.config.hide || false)
    },

    mapValue() {
//console.log("mapValue", this.field, this.value, typeof this.value)
      let val = this.value 
        , mapped = (val === null || val === undefined) ? null :
          (typeof val != 'object') ? val :
          (val.type == 'Buffer' && val.data) ? Buffer.from(val,'binary').toString('hex').slice(0, 128) :
          JSON.stringify(this.value,null,2)
      return mapped
    },

    dirty() {			//The user has changed the value
      let dirty = (this.userValue != this.mapValue)
//console.log("dirty:", this.field, this.mapValue, this.userValue, dirty)
      return dirty
    },

    valid() {			//The value matches the specified template pattern or seems otherwise valid, given the field type
      let isValid = false
//console.log("Valid top:", this.field, this.config.input)
      if (this.config.input == 'chk' || this.config.input == 'inf') {
        isValid = true
      } else if (this.config.input == 'pdm') {
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
//console.log(" valid res:", this.field, this.userValue, this.template, this.disabled, isValid)
      return isValid
    },

    genStyle() { return {			//Generate style, based on data state
      borderLeftColor: this.disabled ? this.pr.dataBackground : (this.valid ? this.pr.dewBorderColor : this.pr.dewInvalidColor),
      borderRightColor: (this.disabled || !this.dirty) ? this.pr.dewBorderColor : this.pr.dewDirtyColor,
      borderBottomColor: (this.disabled ? this.pr.dataBackground : this.pr.dewBorderColor),
      background: ('background' in this.config) ? this.config.background : this.pr.dataBackground,
      borderLeftWidth: this.pr.dewFlagWidth + 'px',
      borderRightWidth: this.pr.dewFlagWidth + 'px',
//x:console.log("width:", this.field, this.width),
      minWidth: this.width/2 + 'em',		//Better way to compare to actual text size?
      textAlign: Com.unabbrev(this.config?.justify?.toLowerCase(), ['left','center','right'])
    }},

    dims() {
      if (Array.isArray(this.config.size)) {
        let [x, y] = this.config.size
        return {x, y}
      } else if (typeof this.config.size == 'object') {
        return this.config.size
      } else if (typeof this.config.size == 'string') {
        let [x, y] = this.config.size.split(' ')
        return {x, y}
      } else if (typeof this.config.size == 'number') {
        return {x: this.config.size}
      }
      return {}
    },

    height() {					//Specified height in characters
//console.log("Height:", this.config.size, this.dims)
      return this.dims?.y ?? this.pr.dewMleHeight ?? 1
    },

    width() {					//In characters
//console.log("Width:", this.field, this.config.input, this.config.size, this.pr.dewEntWidth, this.dims)
      return this.dims?.x ?? (
        this.config.input == 'mle' ? (this.pr.dewMleWidth ?? 40) : 
        this.config.input == 'chk' ? 2 : (this.pr.dewEntWidth ?? 12)
    )},
  },

  methods: {
    input(ev, value = ev?.target?.value) {
//console.log("Dew input:", ev, this.nonull, value)
      if (this.config.input == 'file' && ev.target.files) {	//Special handler for file selectors
        value = ev.target.files
      } else {
        if (!this.nonull && !value) value = null		//Map '' to null if allowed
        this.userValue = value
      }
      this.$emit('input', value, this.field, this.dirty, this.valid)
    },
    submit() {						//console.log("Dew submit:")
      this.$emit('submit', this.userValue, this.field, this.dirty, this.valid)
    },
    focus() {			//Focus cursor on this entry field
//console.log("Focusing:", this.$refs, this.field)
      this.$refs.input.focus()
    },
    set(val) {
      return({value: this.userValue = val, field: this.field, dirty: this.dirty, valid: this.valid})
    },
    clear() {
      return this.set(this.config.initial)
    },

    specResult: function(res, extra) {		//console.log('specResult:', res, extra)
      this.set(res)
      this.$emit('input', res, this.field, this.dirty, this.valid, extra)
      this.submit()
    },

    special: function() {
      let spec = this.config.special
        , menu = this.state.menu
//console.log("Dew special:", this.field, 'st:', this.state, spec)
      if (spec == 'cal') {			//Calendar not handled in regular wylib window
        this.datePicker?.toggle()
        return
      }
      menu.posted = !menu.posted
      if (spec == 'calc') {
        menu.component = 'wylib-calc'
      } else if (spec == 'scm') {
        menu.component = 'wylib-scm'
      } else if (spec == 'file') {
        menu.component = 'wylib-file'
      }
    },		//special
  },		//methods

  beforeCreate: function() {
    this.$options.components['wylib-win'] = require('./win.vue').default
  },
  
  created: function() {
//console.log("Dew init:", this.field, this.config)
    this.userValue = this.mapValue
  },

  beforeMount: function() {
//console.log("Dew state:", this.field, this.value, this.userValue, this.values, JSON.stringify(this.state))
    if (this.config.special) {			//Only have sub-window for special menus
      Com.stateCheck(this, false)					//dew
      Com.stateCheck(this, false, this.state.menu, this.stateTpt.menu)	//menu window
    }
//console.log("dew state:", this.field, this.value, this.userValue, this.values, JSON.stringify(this.state))
    
    if (this.bus) this.bus.register(this.field, (msg, data) => {
//console.log('dew', this.field, 'got bus message:', msg, data)
      if (msg == 'clear')			//Set to default value
        return this.clear()
      else if (msg == 'set')			//User value = current top-down value
        return this.set(this.mapValue)
      else if (msg == 'input') {		//Simulate user input of specified field
        let {field, value} = data		//console.log(' force:', data, this.config)
        if (field == this.field || field == this.config.alias)
          return this.set(value)
      }
    })
  },

  mounted: function() {
//console.log(" Dew mounted:", this.field, this.state, this.mapValue, typeof this.mapValue)
    if (this.config.special == 'cal')
      this.datePicker = new DatePicker(this.$refs.input)
    if (this.config.focus && this.top) this.top().onPosted(() => {this.focus()})
  },
  beforeDestroy: function() {
    if (this.datePicker) this.datePicker.destroy()
  },
  
  render: function(h, context) {
    let entry, kids
      , st = this.state
      , cf = this.config
      , input = cf.input ?? 'ent'
      , domProps = {value: this.userValue}
      , attrs = {autofocus: cf.focus, disabled: this.disabled}
      , on = {input: this.input}
      , style = this.genStyle
      , ref = 'input'
      , conf = {ref, style, attrs, domProps, on}
//console.log("Dew render:", this.field, input, cf, typeof this.userValue)
    if (input == 'mle') {			//Multi-line entry / textarea
      Object.assign(attrs, {rows: this.height, cols: this.width})
      entry = h('textarea', conf)
    } else if (input == 'chk') {		//Checkbox
      Object.assign(attrs, {type: 'checkbox'})
      entry = h('div', {class: 'check', style}, [h('input',
        {ref, attrs, domProps:{checked: this.userValue}, on: {change: ev=>this.input(ev, ev.target.checked)}}
      )])
    } else if (input == 'pdm') {		//Pull-down menu
      let optList = []
      for (let val of this.pdmValues) {
        optList.push(h('option', {
          attrs: {label: val.title, title: val?.help},
          domProps: {value: val.value}
        }, val.title))
      }
      entry = h('select', conf, optList)

    } else if (input == 'button') {		//Action button
//console.log("button lang:", this.lang)
      let txt = (this.lang?.title ?? this.lang ?? 'Reset')
        , innerHTML = txt.split(' ')[0]
      Object.assign(on, {click: ev=>this.input(ev, true)})
      Object.assign(conf, {domProps: {innerHTML}})
      entry = h('button', conf)

    } else {					//Text or other input type
      let type = Com.unabbrev(input, ['text', 'number'])
      Object.assign(attrs, {type: input == 'ent' ? 'text' : type, placeholder: this.hint})
      Object.assign(conf, {class: ['text', !cf.special ? '' : 'special']})
      Object.assign(on, {keyup: ev=>{
        if (ev.code == 'Enter') this.submit()
      }})
//console.log("Render:", this.field, 'A:', attrs, conf, on)
      entry = input ? h('input', conf) : null
    }
    kids = [entry]
//console.log("R:", this.field, typeof cf.special, cf.special)
    if (!!cf.special) {
      let attrs = {type: 'button'}
        , on = {click: this.special}
        , spButton = h('input', {attrs, on, class: 'special button'})
      kids.push(spButton)
//console.log("M:", st, 'm:', JSON.stringify(st.menu))
      if (st.menu?.posted) {		//Is the special menu posted?
        let client = h(st.menu.component, {
              props: {
                state: st.menu.client,
                data: cf.data,
                handle: (...v) => this.specResult(...v),
                env: this.env,
              }, on: {done: (...v) => {			//console.log('dew; spf done:', ...v)
                st.menu.posted = st.menu.pinned
              }}
            })
          , menWin = h('wylib-win', {
              props: {
                state: st.menu,
                topLevel: false,
                fullHeader: false,
                pinnable: true,
                env: this.env
              }
            }, [client])
//console.log("P:", st.menu.component)
        kids.push(menWin)
      }
    }
    return h('div', {
      class: ['wylib', 'wylib-dew'],
      attrs: {title: this.lang?.help ?? this.lang?.title ?? this.lang},
    }, kids)
  },
}
</script>

<style lang="scss">
  .wylib-dew {
    position: relative;
    display: inline;
//    padding: 1px 7px 1px 1px;
//border: 1px solid black;
  }
  .wylib-dew input.text, .wylib-dew div.check {
    border-style: solid;
    border-bottom-width: 1px;
    border-top-width: 0;
    border-radius: 3px;
//border: 1px solid blue;
  }
  .wylib-dew input.text, select {
    width: 100%;			//Make a preferences option
  }
  .wylib-dew input.special.button {
    position: absolute;
    border: none;
    top: 50%;
    right: 0.5em;
    height: 1em;
    transform: translateY(-40%);
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23104010' d='M0 0 L50 50 L100 0 Z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    display: none;
  }
  .wylib-dew:hover input.special.button {
    display: block;
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
  
  @import '../node_modules/flatpickr/dist/themes/light.css'
</style>
