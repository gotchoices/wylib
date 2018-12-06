//Database search query component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Show basic logic list in component
//X- Include menudock
//X- Can generate JSON from logic choices
//X- Do display columns, display, order save with query
//- Implement togglable "not" button before operator
//- Can save/restore searches from database
//- Implement full suite of matching operators (see old TCL wylib)
//- Implement case-independent matches
//- Adjust window size to content, unless/until window has been manually sized
//- 

<template>
  <div class="wylib wylib-dbs">
    <div ref="header" class="header">
      <wylib-menudock :state="state.dock" :config="dockConfig" :height="headerHeight" label="Search" title="Functions relating to stored queries"/>
      <div class="headerfill"/>
    </div>
    <wylib-loglist :state="state.logic" :config="logicConfig" @add="addNew" @geometry="geometry"/>
  </div>
</template>

<script>
import Com from './common.js'
import Logic from './loglist.vue'
import Wyseman from './wyseman.js'
import MenuDock from './menudock.vue'

export default {
  name: 'wylib-dbs',
  components: {'wylib-loglist': Logic, 'wylib-menudock': MenuDock},
  props: {
    state:	{type: Object, default: () => ({})},
    fields:	{type: Array}
  },

  data() { return {
    pr:		require('./prefs'),
    wm:		{},
    viewMeta:	null,
    viewLang:	null,
    dbData:	[],
    operators: [
      {tag: '=', title: '=', help: 'The left and right are the same value'},
      {tag: '<', title: '<', help: 'The left value compares less than the right value'},
      {tag: '<=', title: '<=', help: 'The left value compares less than or equal to the right value'},
      {tag: '>', title: '>', help: 'The left value compares more than the right value'},
      {tag: '>=', title: '>=', help: 'The left value compares more than or equal to the right value'},
      {tag: '!=', title: 'Not =', help: 'The left and right side have different values'},
      {tag: '~', title: '~', help: 'The left side matches the regular expression given on the right'},
      {tag: 'in', title: 'In', help: 'The left value exists in a list or array expressed on the right side'},
    ]
  }},

  computed: {			//Fixme: get langauge from wyseman/db
    id: function() {return 'dbp_' + this._uid + '_'},
    logicConfig:function() {
//console.log("logicConf:", this.fields)
      return {left: this.fields, oper: this.operators, right: this.fields}
    },
    dockConfig: function() { return [
      {idx: 'sch', lang: this.wm.dbsSearch, call: this.search, icon: 'wand', shortcut: true},
    ]},
    headerHeight: function() {
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
    save() {
//console.log("Dbs save (not implemented)")
    },
    recall() {
//console.log("Dbs recall (not implemented)")
    },
    geometry(vm) {		//Fixme: auto adjust parent geometry?
//console.log("Dbs check geometry", vm.$el.getBoundingClientRect())
    },
  },

  created: function() {
    Wyseman.register(this.id+'wm', 'wylib.data', (data) => {this.wm = data.msg})
  },

  beforeMount: function() {
    Com.react(this, {logic: {and: true, items: [{left: null, oper: '='}]}, dock: {}})
  },

  mounted: function() {
    this.$parent.$emit('swallow', this.$refs['header'])
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
