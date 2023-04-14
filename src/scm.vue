//Scrolled menu for selecting a record of data
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Make static data work (like state below)
//- Make reordering work (or disable it)
//- Can search for choices (maybe as you type the selection)
//- 
<template>
  <div class="wylib wylib-scm">
    <wylib-dew :state="state.search" :env="env"/>
    <wylib-mlb ref="mlb" :state="state.grid" :env="env" :data="gridData" :config="mlbConfig" @execute="execute" @sort="sort" @geometry="geometry" :bus="mlbBus"/>
  </div>
</template>

<script>
const Bus = require('./bus.js')
const Com = require('./common.js')
const Wyseman = require('./wyseman.js')
import Mlb from './mlb.vue'
import Dew from './dew.vue'

const Stock = {
  country: {
    view: 'base.country',
    fields: ['iso_3','co_name'],
    order: [1],
    token: 'iso_3'
  },
  language: {
    view: 'base.language_v',
    fields: ['code', 'eng_name', 'fra_name'],
    where: {left: 'tables', oper: '>', entry: 0},
    order: [1],
    token: 'code'
  },
  state: {
    fields: ['code', 'state'],
    data: [['','Blank'],['AK','Alaska'],['AL','Alabama'],['AR','Arkansas'],['AZ','Arizona'],['CA','California'],['CO','Colorado'],['CT','Connecticut'],['DC','Washington DC'],['DE','Delaware'],['FL','Florida'],['GA','Georgia'],['HI','Hawaii'],['IA','Iowa'],['ID','Idaho'],['IL','Illinois'],['IN','Indiana'],['KS','Kansas'],['KY','Kentucky'],['LA','Louisiana'],['MA','Massachussetts'],['MD','Maryland'],['ME','Maine'],['MI','Michigan'],['MN','Minnesota'],['MO','Missouri'],['MS','Mississippi'],['MT','Montana'],['NC','North Carolina'],['ND','North Dakota'],['NE','Nebraska'],['NH','New Hamshire'],['NJ','New Jersey'],['NM','New Mexico'],['NV','Nevada'],['NY','New York'],['OH','Ohio'],['OK','Oklahoma'],['OR','Oregon'],['PA','Pennsylvania'],['PR','Puerto Rico'],['RI','Rhode Island'],['SC','South Carolina'],['SD','South Dakota'],['TN','Tennesse'],['TX','Texas'],['UT','Utah'],['VA','Virgina'],['VI','Virgin Islands'],['VT','Vermont'],['WA','Washington State'],['WI','Wisconson'],['WV','West Virginia'],['WY','Wyoming']]
  }
}

export default {
  name: 'wylib-scm',
  components: {'wylib-mlb': Mlb, 'wylib-dew': Dew},
  props: {
    state:	{type: Object, default: () => ({})},
    data:	null,
    env:	{type: Object, default: Com.envTpt},
    handle:	null
  },
  data() { return {
    gridData:	[],
    mlbBus:	new Bus.messageBus(this),
    spec:	{},
    viewMeta:	null,
    stateTpt:	{grid: {columns: []}},
//    lastMenu:	null,
//    lastView:	null,
  }},
  inject: ['top'],

  computed: {
    id() {return 'scm_' + this._uid + '_'},
    wm() {return this.env.wm},
    pr() {return this.env.pr},

    mlbConfig() {				//Make the column description format mlb expects
//console.log("Scm mlbConfig:", this.viewMeta, JSON.stringify(this.state.grid?.columns))
      let colConfigs = this.state.grid?.columns?.reduce(	//Default config in case no viewMeta yet
        (ac, el) => Object.assign(ac, {[el.field]: {field: el.field}}),
        {}
      )

      if (this.viewMeta) this.viewMeta.columns.forEach((meta) => {		//For each column element
        let defWidth
          , field = meta.col
        if (this.spec?.fields?.includes(field)) {
          if (meta?.styles?.size) {
            let size = meta.styles.size		//console.log('size:', meta?.styles?.size)
            defWidth = (size.x ?? size) * this.pr.mlbCharWidth
          }
          let config = {
            field,
            title:	meta.title || field,
            help:	meta.help,
            order:	parseInt(meta.styles.display || 9999),
            just:	meta.type.match(/(int|float)[0-9]/) ? 'right' : 'left',
            width:	defWidth ? (defWidth <= this.pr.mlbMaxWidth ? defWidth : this.pr.mlbMaxWidth) : this.pr.mlbDefWidth,
            visible:	true,
          }
//console.log("  width:", field, meta.styles.size, "d:", defWidth, "->", config.width)
          colConfigs[field] = config
        }
      })
//console.log("  grid cols:", JSON.stringify(colConfigs), JSON.stringify(this.state.grid?.columns))
      return colConfigs
    },
  },

  methods: {
    execute(selection) {
console.log("Scm execute: ", selection, this.token)
      if (selection?.length <= 0) return
      let idx = selection[0]
        , row = this.gridData[idx]
        , value = row[this.token]
console.log("   row: ", value, row)
      if (typeof this.handle === 'function')
        this.handle(value, row)
      this.$emit('done', value, row)
    },

    sort(cols) {
console.log("Scm sort:", cols)
//      this.reload(cols ? {order: cols.reverse()} : null)
    },

    colMenuHandler(e, index, x, y) {
console.log("Menu handler:", index, x, y)
      if (index != this.lastMenu) {
        this.state.colMenu.posted = true
      } else {
        this.state.colMenu.posted = !this.state.colMenu.posted
      }
      if (this.state.colMenu.posted) {
        this.state.colMenu.x = x - 10
        this.state.colMenu.y = y
      }
      this.lastMenu = index
    },

    geometry(ev) {
console.log("Geometry changed:", this.top(), ev)
      this.top().emit('geometry', ev)
    },
  },

  beforeCreate: function() {
    this.$options.components['wylib-dew'] = require('./dew.vue').default
  },

  beforeMount: function() {
    Com.stateCheck(this)
  },

  mounted: function() {
//console.log('Scm mounted:', this.id, 'st:', this.state, 'da:', this.data)
    let d = this.data
    if (typeof d == 'string' && d in Stock) {
      this.spec = Stock[d]
    } else if (typeof d == 'object') {
      this.spec = d
    }
    Object.assign(this.spec, {fields: this.spec.fields, token: this.spec.token, view: this.spec.view})
    if (this.spec.data)
      this.gridData = this.spec.data.map(el => {
        if (Array.isArray(el)) {		//Convert [[],[]] data to [{},{}] format
          let newEl = {}
            , fields = this.spec.fields
          for (let i = 0; i < fields.length; i++) newEl[fields[i]] = el[i]
          return newEl
        }
        return el
      })

    if (this.spec.token && !this.token)
      this.token = this.spec.token
    if (this.spec.view && this.spec.fields) {
//console.log("  Scm requesting DB:", this.spec)
      Wyseman.request(this.id+'d', 'select', this.spec, (data, err) => {
//console.log("  Scm got data:", data)
        if (err) {this.top().error(err); return}
        this.gridData = data
      })
      Wyseman.register(this.id+'m', this.spec.view, (data, err) => {
        if (err) {this.top().error(err); return}
//console.log("Scm got metadata for:", this.spec.view, data)
        this.viewMeta = data
        if (!this.token)		//Guess at what to return
          this.token = data.pkey[0]
      })
//      this.$parent.$emit('customize', {title:'Hi', help: 'Ho'}, 'scm:'+this.spec.view)
    }
  },

//  beforeDestroy: function() {
//console.log('Scm about to die:', this.state)
//  }
}
</script>

<style lang='less'>
//  .wylib-scm {
//    border: 1px solid blue;
//    height: 100%;
//  }
</style>
