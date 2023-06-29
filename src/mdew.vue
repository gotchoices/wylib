//Multiple data field editing widget
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Make clean/dirty work correctly
//X- Change dew state to config? (probably not--just trim state at this level)
//- Implement built-in template codes (date, time, etc)
//- Should an mle save its state when the user enlarges it?  How do we get the default back?
//- 
//- Can do 2D array with: 
//X-   Columnspans
//-   Piggybacks
//-   Derived values
//- 

<script>
const Bus = require('./bus.js')
const Com = require('./common.js')
import Dew from './dew.vue'

export default {
  name: 'wylib-mdew',
  components: {'wylib-dew': Dew},
  props: {
    state:	{type: Object, default: () => ({})},
    data:	{type: Object, default: () => ({})},
    config:	{type: Array, default: () => ([])},
    bus:	null,
    height:	{type: Number, default: 300},		//Fixme: used?
    env:	{type: Object, default: Com.envTpt},
    },
  data() { return {
//    wm:		{},
    valids:	{},
    dirtys:	{},
    userData:	{},
    dewBus:	new Bus.messageBus(this),
    stateTpt:	{optional: false, dews: {}},
  }},

  computed: {
    id() {return 'mdew_' + this._uid + '_'},
    wm() {return this.env.wm},
    pr() {return this.env.pr},
    dirty() {
      return Object.values(this.dirtys).some(v=>(v))
    },
    valid() {
      return Object.values(this.valids).every(v=>(v))
    },
    hideOpts() {return !this.state.optional},
    optStyle() {return {
      background:	this.state.optional ? this.pr.butToggledColor : this.pr.butBackground
    }},
    gridConfig() {				//Build a 2D grid from flat configuration data
      let minX, maxX, rows = []
        , noSpecs = []
        , nextRow = 0
      for (let con of this.config) {
//console.log("Mdew config rec:", con)
        let styles = con.styles
        if (styles?.hide != null && styles.hide) continue
        if (styles?.subframe) {			//Does this field have any placement styling
          let { x, y, xspan, yspan } = styles.subframe
          con.grid = {x, y, xspan, yspan}
//console.log("  grid:", y, con.grid)
          if (x == null) x = 0
          if (y == null) y = nextRow
          if (rows[y] == null) rows[y] = []
          rows[y][x] = con
          if (minX == null || x < minX) minX = x
          if (maxX == null || x > maxX) maxX = x
          if (y >= nextRow) nextRow = y + 1
        } else {
          noSpecs.push(con)
        }
      }
      if (minX > 0) rows = rows.map(row=>{		//Trim off any unfilled leading columns, such as 0
        let len = row.length
        return row.slice(minX, len - minX + 1)
      })
//console.log("  noSpecs:", noSpecs)
      noSpecs.forEach(con=>{				//Handle any columns with no explicit grid info
        if (nextRow > 0)
          Object.assign(con, {grid: {x:minX, y:nextRow++, xspan:maxX-minX}})
        rows.push([con])
      })
//console.log("  rows:", rows)
      return rows
    },
  },
  
  methods: {
    wmLang(tag, type='title') {return this.wm[tag] ? this.wm[tag][type] : tag},
    togOption() {this.state.optional = !this.state.optional},
    submit(ev) {this.$emit('submit', ev)},
    input(value, field, dirty, valid, extra) {		//An input has been changed
      this.$set(this.dirtys, field, dirty)
      this.$set(this.valids, field, valid)
      this.userData[field] = value
//console.log("Mdew input:", field, value, dirty, valid, this.dirty, this.valid, extra)
      this.$emit('input', value, field, this.dirty, this.valid)

      if (extra) Object.keys(extra).forEach(key => {		//Widget is attempting to set other related fields
        this.dewBus.notify('input', {field: key, value: extra[key]})	//Notify all fields, let them decide
      })
    },
  },

//  created: function() {
//  },

  beforeMount: function() {
    Com.stateCheck(this, true)
    if (this.bus) this.bus.register(this.id, (msg, data) => {
      if (msg == 'userData') {
        if (!data) return this.userData			//Get all records
        let retData = {}				//Otherwise, get only dirty records
        for (const [key, val] of Object.entries(this.userData)) {
          if (this.dirtys[key]) retData[key] = val
        }
        return retData
      } else {						//set or clear
        let answers = this.dewBus.notify(msg, data)	//Pass down to children
//console.log("Mdew bus: ", msg, answers)
        answers.forEach(el => {				//These don't generate input events, so grab values now
          let { value, field, dirty, valid } = el
          this.userData[field] = value
          this.$set(this.dirtys, field, dirty)
          this.$set(this.valids, field, valid)
        })
        return answers
      }
    })
//console.log("Mdew before:", this.config, this.data)
  },

  render: function(h, context) {
//console.log("Rendering", context)
    let rowOpts, tabRows = []
    for (let y = 0; y < this.gridConfig.length; y++) {		//Iterate through the rows
      let row = this.gridConfig[y]
        , tabItems = []
        , colCount = 0
        , rowOptional = false
        , len = row ? row.length : 0				//How many fields on this row
      for (let x = 0; x < len; x++) {				//Iterate through them
        let item = row[x]
          , col = item?.grid?.x
          , xspan = item?.grid?.xspan ?? 1
          , yspan = item?.grid?.yspan ?? 1
//console.log("  item:", item)
//console.log("    row:", y, "item:", x, col, colCount, 'xs:', xspan)
        if (item) {
          let field = item.field
          if (item.styles?.optional) rowOptional = true
          if (!this.state.dews[field]) this.$set(this.state.dews,field,{})
          let dew = h('wylib-dew', {			//Make our data editing widget
            attrs: {value: this.data[field]},
            props: {
              field,
              config: item.styles, 
              state: this.state.dews[field],
              lang: item.lang, 
              values: item.values, 
              nonull: item.nonull, 
              bus: this.dewBus, 
              env: this.env
            },
            on: {input: this.input, submit: this.submit},
          })
          tabItems.push(h('td', {class: "label"}, item.lang ? item.lang?.title + ':' : null))
          tabItems.push(h('td', {attrs: {colspan:(xspan * 2 - 1), rowspan:yspan}}, [dew]))
        } else if (colCount < col) {			//Assuming prior columns haven't spanned available space
          tabItems.push(h('td'))			//pad it with dead cells
          tabItems.push(h('td'))
        }
        colCount += xspan
      }
      if (rowOpts == null && rowOptional) {		//Time for the 'optional' button?
        let optButton = h('div', {
          class: "wylib-mdew-option",
          attrs:{title:this.wmLang('mdewMore','help')},
          style:this.optStyle,
//          domProps:{innerHTML: this.wmLang('mdewMore')},
          on: {click: this.togOption}
        })
        rowOpts = {class: {				//All rows optional from here on
          'wylib-mdew-hide': this.hideOpts
        }}
        tabRows.push(h('tr', {class: 'wylib-mdew-optline'}, [optButton]))
      }
      if (tabItems.length > 0) tabRows.push(h('tr', rowOpts, tabItems))
    }

    return h('div', {class: "wylib wylib-mdew"}, [
      h('table', {}, tabRows)
    ])
  },
}
</script>

<style lang='scss'>
//  .wylib-mdew {
//  }
  .wylib-mdew table {
    border-collapse: collapse;
    width: 100%;
//    border: 1px solid blue;
  }
  .wylib-mdew table .label {
    text-align: right;
  }
  .wylib-mdew table tr:nth-child(even) .label {
    background: #f0f0f0;
  }
  .wylib-mdew .wylib-mdew-hide {
    display: none;
    background: #ff8080;
  }
  .wylib-mdew-option {
//    border: 1px solid blue;
    height: 0.25em;
    width: 100%;
  }
  .wylib-mdew-optline {
    line-height: 0;
  }
  .wylib-mdew td {
    border: 1px solid #e8e8e8;
    white-space: nowrap;
  }
</style>
