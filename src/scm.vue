//Scrolled menu for selecting a record of data
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
//- 
<template>
  <div class="wylib wylib-scm">
    <wylib-dew :state="state.search" :env="env"/>
    <wylib-mlb ref="mlb" :state="state.grid" :env="env" :data="gridData" :config="mlbConfig" @execute="executeRows" @sort="sort" @geometry="geometry" :bus="mlbBus"/>
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
    view: 'base.language',
    fields: ['code', 'eng_name', 'fra_name'],
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
  },
  data() { return {
    gridData:	[],
    mlbBus:	new Bus.messageBus(this),
    spec:	{},
    viewMeta:	null,
//    lastMenu:	null,
//    lastView:	null,
  }},
  inject: ['top'],

  computed: {
    id() {return 'scm_' + this._uid + '_'},
    wm() {return this.env.wm},
    pr() {return this.env.pr},
//    stateTpt() {return {
//      dock: {}, loaded: 0, autoLoad:false, lastLoad: {}, colMenu: {x: 100, y:0},
//      edit: {posted: false, x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: this.pr.winInitHeight, client: {dbView: this.state.dbView}},
//      filter: {posted: false, x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: 120, client: {}},
//      grid: {footerOn: false, sorting: {}, columns: []}
//    }},
//    logicFields() {
//      let flds = []
//      for (let key in this.mlbConfig) {
//        let conf = this.mlbConfig[key]
//        flds.push({tag: key, title: conf.title, help: key+"\n"+conf.help})
//      }
//      return flds.sort((a,b) => {return (a.title > b.title) ? 1 : -1})
//    },
//    loadedSize() {
//      let len = 3
//      if (this.loaded) len = this.loaded.length > 8 ? 8 : this.loaded.length
//      return len
//    },

    mlbConfig() {				//Make the column description format mlb expects
      let colConfigs = {}
console.log("Scm mlbConfig:", this.state.dbView, this.viewMeta)
      this.spec?.fields?.forEach(field => {
        let conf = {
          field,
          width: 20,
          visible: true
        }
        colConfigs[field] = conf
console.log("  field:", field)

      })
//        let defWidth
//          , key = meta.col
//        if (meta?.styles?.size) {
//          let size = meta.styles.size		//console.log('size:', meta?.styles?.size)
//          defWidth = (size.x ?? size) * this.pr.mlbCharWidth
//        }
//        if (meta.styles && 'display' in meta.styles) foundDisplay = true
//        let config = {
//          field:	key,
//          title:	meta.title || key,
//          help:		meta.help,
//          order:	parseInt(meta.styles.display || 9999),
//          just:		meta.type.match(/(int|float)[0-9]/) ? 'right' : 'left',
//          width:	defWidth ? (defWidth <= this.pr.mlbMaxWidth ? defWidth : this.pr.mlbMaxWidth) : this.pr.mlbDefWidth,
//          visible:	('display' in meta.styles) ? !!parseInt(meta.styles.display) : false,
//        }
////console.log("  width:", key, meta.styles.size, "d:", defWidth, "->", config.width)
//        colConfigs[key] = config
//      })
//console.log("colConfigs:", colConfigs)
//      if (!foundDisplay) Object.keys(colConfigs).forEach(key=>{colConfigs[key].visible = true})		//If no display data, display them all
      return colConfigs
    },
  },

  methods: {
    autoTog(ev) {				//Toggle auto loading mode
      this.state.autoLoad = !this.state.autoLoad
    },
    autoLoadValue(v) {				//Set/get autoload value
      if (v != null) this.state.autoLoad = v
      return this.state.autoLoad
    },
    sumTog(ev) {				//Toggle column summaries
      this.state.showSum = !this.state.showSum
    },
    showSumValue(v) {				//Set/get showSumm value
      if (v != null) this.state.grid.footerOn = this.state.showSum = v
      return this.state.showSum
    },
    editTog(ev) {				//Toggle the editing window
      this.state.edit.posted = !this.state.edit.posted
      if (this.state.edit.posted) {
//        this.editPosts++
        this.executeRows()
      }
    },
    advance(delta=1) {this.mlbBus.notify('advance', delta)},
    next(ev) {this.advance(1)},
    prev(ev) {this.advance(-1)},

    executeRows(selection) {
      if (!selection) selection = this.$refs.mlb.getSelection()
//console.log("Scm execute rows: ", selection, this.viewMeta.pkey)
      if (selection.length <= 0) return
      if (!this.viewMeta || !this.viewMeta.pkey) {this.top().error(this.wm.scmNoPkey); return}
      let idx = selection[0]
        , row = this.gridData[idx]
        , keyVal = []
      if (row) this.viewMeta.pkey.forEach(fld => {
        keyVal.push(row[fld])
      })
//console.log("   row: ", row, keyVal)
      if (row && this.autoEdit) {
        this.state.edit.posted = true
//        this.editPosts++
        this.$nextTick(()=>{this.dbeBus.notify('load', keyVal)})
      } else this.$emit('execute', row, this.viewMeta.pkey, keyVal)
    },

    load(spec) {
      if (!spec) {
        if (this.viewMeta.styles && this.viewMeta.styles.where)
          spec = {where: this.viewMeta.styles.where}
      }
//console.log("Scm load:", this.state.dbView, spec, this.viewMeta)
      Wyseman.request('scm_'+this._uid, 'select', Object.assign({view: this.state.dbView, fields: '*'}, spec), (data, err) => {
//console.log("  data:", data)
        if (err) this.top().error(err); else this.gridData = data
        if (this.state.edit.posted && this.state.autoLoad) this.executeRows()
      })
      if (spec) this.state.lastLoad = spec
    },
    reload(spec) {
//console.log("Scm reload:", this.state.dbView, this.state.lastLoad, spec)
      this.load(Object.assign(this.state.lastLoad, spec))
    },
    loadAll(ev) {
      this.load({where: null})
    },
    clear() {
      this.gridData = []
    },
    
    modified(data) {this.reload()},		//On signal from dbe
    sort(cols) {
//console.log("Scm sort:", cols)
      this.reload(cols ? {order: cols.reverse()} : null)
    },
    search(where) {
      this.reload({where})
    },
    dbsDefault() {
//console.log("Scm default logic:")
      if (this.viewMeta.styles && this.viewMeta.styles.where)
        this.dbsBus.notify('load', Com.clone(this.viewMeta.styles.where))
    },

    loadBy() {
      this.state.filter.posted = !this.state.filter.posted
    },

    colMenuHandler(e, index, x, y) {
//console.log("Menu handler:", index, x, y)
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

    autoSize() {
      let col = this.state.grid.columns.find(e => (e.field == this.lastMenu))
//console.log("Auto size:", this.lastMenu, "Col:", col)
      this.mlbBus.notify('autosize', col.field)
    },
    hideColumn() {
      let col = this.state.grid.columns.find(e => (e.field == this.lastMenu))
//console.log("Hide:", this.lastMenu, "Col:", col)
      if (col) col.visible = false
    },
    defColumns(ev) {
      for (let key in this.mlbConfig) {
        let conf = this.mlbConfig[key]
          , col = this.state.grid.columns.find(e => (e.field == key))
//console.log("Scm defColumns:", key, col)
        col.visible = conf.visible
        col.order = conf.order
        col.width = conf.width
      }
    },
    geometry(ev) {
//console.log("Geometry changed:", top, ev)
      this.top().emit('geometry', ev)
    },
    hideCol() {
      let col = this.state.grid.columns.find(e => (e.field == this.lastMenu))
//console.log("Hide Column:", this.lastMenu, "Col:", col)
      col.visible = false
    },

  },

//  watch: {
//    'state.edit.posted': function(newVal, oldVal) {
//      if (!oldVal && newVal) this.editPosts++
//    },
//    'state.filter.posted': function(newVal, oldVal) {
////console.log("filter (de)posted:", newVal)
//      if (!oldVal && newVal) this.filtPosts++
//    },
//    'state.dbView': function(newVal, oldVal) {		//If we change our view, reset data, columns
////console.log("Scm dbView changed!")
//      this.gridData = []
//      this.viewMeta = null
//      if (newVal != oldVal) this.metaListen()
//    },
//    gridData: function() {
//      this.state.loaded = this.gridData ? this.gridData.length : 0
////console.log("Scm gridData changed:", this.state.loaded)
//    },
//  },

  beforeCreate: function() {
    this.$options.components['wylib-dew'] = require('./dew.vue').default
  },

//  created: function() {
//    Wyseman.register(this.id+'wm', 'wylib.data', (data, err) => {
//      if (data.msg) this.wm = data.msg
//    })
//    this.metaListen()
//  },

  beforeMount: function() {
//console.log("Scm before, state: ", JSON.stringify(this.state, null, 2))
//    if (this.bus) this.bus.register(this.id, (msg) => {		//Respond to commands from a master dbe
//console.log("Scm got from master: ", msg)
//      if (msg == 'clear') {
//        this.clear()
//      } else if (msg == 'load') {
//        this.followMaster()
//      }
//    })
    Com.stateCheck(this)
//console.log("Scm after, state: ", this.state)
  },

  mounted: function() {
console.log('Scm mounted state:', this.id, 'st:', this.state, 'da:', this.data)
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

    if (this.spec.view && this.spec.fields) {
console.log("  Scm requesting DB:", this.spec)
      Wyseman.request(this.id+'d', 'select', this.spec, (data, err) => {
console.log("  Scm got data:", data)
        if (err) {this.top().error(err); return}
        this.gridData = data
      })
      Wyseman.register(this.id+'m', this.spec.view, (data, err) => {
        if (err) {this.top().error(err); return}
console.log("Scm got metadata for:", this.spec.view, data)
        this.viewMeta = data
      })
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
