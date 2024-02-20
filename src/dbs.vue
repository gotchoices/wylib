//Database search query component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Implement case-independent matches
//- Adjust window size to content, unless/until window has been manually sized
//- 

<template>
  <div class="wylib wylib-dbs">
    <div ref="header" class="header">
      <wylib-menudock :state="state.dock" :env="env" :config="dockConfig" label="Search" title="Functions relating to stored queries"/>
      <div class="headerfill"/>
    </div>
    <wylib-loglist :state="state.logic" :env="env" :config="logicConfig" @add="addNew" @geometry="geometry" @submit="search"/>
  </div>
</template>

<script>
const Com = require('./common.js')
const Bus = require('./bus.js')
import Logic from './loglist.vue'
import MenuDock from './menudock.vue'

export default {
  name: 'wylib-dbs',
  components: {'wylib-loglist': Logic, 'wylib-menudock': MenuDock},
  props: {
    state:	{type: Object, default: () => ({})},
    bus:	null,			//Commands from my parent dbp
    fields:	{type: Array},
    env:	{type: Object, default: Com.envTpt},
  },

  data() { return {
    stateTpt:	{logic: {and: true, items: [{left: null, not: false, oper: '='}]}, dock: {}},
  }},
  inject: ['top'],

  computed: {			//Fixme: get langauge from wyseman/db
    id() {return 'dbs_' + this.$.uid},
    wm() {return this.env.wm},
    pr() {return this.env.pr},
    logicConfig() {
//console.log("logicConf:", this.fields)
      return {left: this.fields, oper: this.operators, right: this.fields}
    },
    operators() {return [
      {tag: '=',	lang: this.wm.dbsEqual	},
      {tag: '<',	lang: this.wm.dbsLess	},
      {tag: '<=',	lang: this.wm.dbsLessEq	},
      {tag: '>',	lang: this.wm.dbsMore	},
      {tag: '>=',	lang: this.wm.dbsMoreEq	},
      {tag: '~',	lang: this.wm.dbsRexExp	},
      {tag: 'in',	lang: this.wm.dbsIn	},
      {tag: 'isnull',	lang: this.wm.dbsNull	},
      {tag: 'true',	lang: this.wm.dbsTrue	},
      {tag: 'diff',	lang: this.wm.dbsDiff	},
      {tag: 'nop',	lang: this.wm.dbsNop	},
    ]},
    dockConfig() { return [
      {idx: 'sch', lang: this.wm.dbsSearch, call: this.search, icon: 'wand', shortcut: true},
      {idx: 'clr', lang: this.wm.dbsClear, call: this.clear, icon: 'sun', shortcut: true},
      {idx: 'def', lang: this.wm.dbsDefault, call: this.default, icon: 'download'},
    ]},
    headerHeight() {
      return this.pr.winFullHeader - 1	//Fit in parent header, plus top border
    },
  },

  methods: {
    addNew() {
//console.log("Adding")
      let newItem = Object.assign({}, this.logicState.items.slice(-1)[0])
      this.logic.items.push(newItem)
    },
    search() {
      this.$emit('search', this.state.logic)
    },
    default() {
      this.$emit('default')	//Request default load logic from dbp
    },
    clear() {
      this.state.logic = this.stateTpt.logic
    },
    geometry() {		//Fixme: auto adjust parent geometry?
//console.log("Dbs check geometry", vm.$el.getBoundingClientRect())
    },
  },

//  created: function() {
//  },

  beforeMount: function() {
    Com.stateCheck(this)
//console.log("Dbs beforeMount state: ", this.state)
  },

  mounted: function() {
    this.top().swallow(this.$refs.header)
    this.top().custom(this.wm.dbs)

    if (this.bus) this.bus.register(this.id, (msg, data) => {	//Commands from my parent dbp
//console.log("Dbs bus message: ", msg, data);
      if (msg == 'load') this.state.logic = data
    })
  },
}
</script>

<style lang='less'>
  .wylib-dbs {
//    border: 1px solid red;
  }
  .wylib-dbs > .header {
    background: linear-gradient(to top, #c0c0c0, #e0e0e0);	//Fixme: Prefs
    width: 100%;
    height: 1.4em;
    display: flex;
  }
  .wylib-dbs .header wylib-menudock {
    flex: 0 0 auto;
  }
  .wylib-dbs .header .headerfill {
    flex: 1 1 auto;
  }
</style>
