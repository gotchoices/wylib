//Logical expression builder
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Connector can't be drawn in a computed value--has to be after render
//X- Compute height of connector SVG reactively
//X- Standard close button shows up in upper right corner
//X- Build dbsearch wrapper over loglist
//- Keyboard navigation:
//-  Default focus to first left field
//-  Generate search from enter in RHS
//-  Tab from RHS will add a new line if non exists below, then move focus to its LHS
//- 
<template>
  <div class="wylib wylib-loglist" ref="root">
    <div class="header">
      <svg ref="connector" class="connector"><path ref="connectPath"/></svg>
      <button class="button andor" :class="{and: state.and}" @click="state.and = !state.and" :title="wMsg('lstAndOr')">{{joinFunction}}</button>
      <button class="button add" @click="addNew" :title="wMsg('lstAddCond')">+</button>
      <button class="button close" @click="$emit('close')" :title="wMsg('lstRemove')">X</button>
    </div>
    <div class="subdivision" v-for="(item, index) in state.items">
      <wylib-loglist v-if="item && 'and' in item" :key="`l-${index}`" :index="index" :state="item" :env="env" @input="val => {item = val}" @close="closeChild(index)" :config="config" @geometry="childGeometry"/>
      <wylib-logitem v-else :key="`i-${index}`" :index="index" :state="item" :env="env" @input="val=>{item = val}" @submit="submit" :config="config" @lower="lower(index)" @close="closeChild(index)" @insert="insert" @geometry="childGeometry"/> <!--{{index}} Debug -->
    </div>
  </div>
</template>

<script>
const Com = require('./common.js')
import LogItem from './logitem.vue'
import Button from './button.vue'

export default {
  name: 'wylib-loglist',
  components: { 'wylib-logitem': LogItem},
  props: {
    state:	{type: Object, default: () => ({})},
    config:	Object,
    index:	Number,
    defOper:	{type: String, default: '='},
    env:	{type: Object, default: Com.envTpt},
  },

  data() { return {
//    wm:		{},
    isAnd:	true,
    childYs:	[],
    stateTpt:	{and: true, items: []},
  }},

  computed: {
    wm() {return this.env.wm},
    pr() {return this.env.pr},
    joinFunction() {
      return (this.state.and ? 'And' : 'Or')
    },
  },

  methods: {
    wMsg(msg, sub = 'help') {return(this.wm[msg] ? this.wm[msg][sub] : null)},
    submit(ev) {this.$emit('submit', ev)},
    addNew() {
      this.state.items.push({left: null, not: false, oper: this.defOper})
      this.$emit('geometry', this, true)
    },
    closeChild(idx) {
//console.log("Close: ", idx, this.state.items)
      this.state.items.splice(idx, 1)
      if (this.state.items.length <= 0)
        this.$emit('close')
      this.$emit('geometry', this, true)
      this.drawConnectors()			//Remove connector to this item
    },
    lower(idx) {				//Turn an item component into a list component
console.log("Lower: " + idx)
      let itemState = Object.assign({},this.state.items[idx])
      this.state.items[idx] = {and: 'true', items: [itemState]}
    },
    insert(idx, state) {
//console.log("Insert:" + idx + " State:" + state)
      this.state.items.splice(idx, 0, state)
    },
    childGeometry(child, cascade) {		//When a child has just rendered itself, capture its position
      let childBox = child.$refs?.root?.getBoundingClientRect()
      let parBox = this.$refs?.root?.getBoundingClientRect()
//console.log("Child rendered:", childBox, "\n par box:", parBox)
      let halfHeight = Math.round(childBox.height / 2)
      let childY = Math.round(childBox.y) - Math.round(parBox.y) + halfHeight
      this.childYs[child.index] = childY
//console.log(" index:" + child.index + " half:" + halfHeight + " Casc:" + cascade)
      if (cascade) this.$children.forEach(c => {		//Recheck geometry of children below this one
        if (c.index > child.index) c.$forceUpdate()
      })
      this.$nextTick(() => {this.drawConnectors()})
      this.$emit('geometry', this, true)
    },
    drawConnectors() {
      let path = "M 0 0"
      let hfudge = 5		//Move right to ready item
      let vfudge = 28		//Move down to first item
      let rad = 6
      this.childYs.splice(this.state.items.length)	//trim array if necessary of any old values
      for (let i = 0; i < this.childYs.length; i++) {
//console.log(" child:", i, "Y:", this.childYs[i])
         if (i == 0) {
           path += ' v ' + (this.childYs[i] - vfudge)				//First vertical stub
         } else {
           path += ' v ' + (this.childYs[i] - this.childYs[i-1] - 2*rad)	//Down from last item
         }
         path += ' a ' + rad + ' ' + rad + ' 90 0 0 ' + rad + ' ' + rad		//Entry radius
         path += ' h ' + hfudge + ' h ' + (-hfudge)
         if (i < this.childYs.length - 1) {
           path += ' a ' + rad + ' ' + rad + ' 90 0 0 ' + (-rad) + ' ' + rad
         }
      }
//console.log("  path:", JSON.stringify(path))
    this.$refs.connectPath.setAttribute('d', path)
    this.$refs.connector.style.height = (this.childYs[this.childYs.length-1] + 10) + 'px'
    }
  },

  beforeCreate: function() {
    this.$options.components['wylib-loglist'] = require('./loglist.vue').default
  },

//  watch: {
//    state: function() {
//console.log("LogList state: ", JSON.stringify(this.state))
//    }
//  },

  beforeUpdated: function() {
    this.conPath = "M 0 0"		//Start to build connector pathway
    this.childPaths = 0
    this.conLastY = 0
  },
  updated: function() {
//console.log("Updated:", this.index)
    this.$emit('geometry', this, true)
  },
//  created: function() {
//  },
  beforeMount: function() {
    Com.stateCheck(this)
//console.log("Loglist stateCheck:", this.state)
  },
  mounted: function() {
    this.$nextTick(() => {this.$emit('geometry', this, true)})
//console.log("LogList state: ", JSON.stringify(this.state))
  }
}
</script>

<style lang='less'>
  .wylib-loglist {
    padding: 2px;
    border: 2px solid #cc9900;
    border-radius: 8px;
    background: #f8f8f8;
/*    width: 100%; */
  }
  .wylib-loglist .connector {
    position: absolute;
  }
  .wylib-loglist .subdivision {
    padding: 3px;
    margin: 0 0 0 15px;
    display: flex;
/* border: 1px solid orange; */
  }
//  .wylib-loglist .spacer {
//    position: relative;
//    display: inline-block;
//    height: 1em;
//    width: 12px;
//    flex: 0 0 auto;
////background: lightblue; opacity: 0.5;
//  }
  .wylib-loglist .header {
    cursor: move;
    position: relative;
background: #e0e0e0;
  }
  .wylib-loglist .connector {
    position: absolute;
    left: 8px;
    top: 18px;
    width: 16px;
    height: auto;
    fill: none;
    stroke: #999999;
    stroke-width: 2;
//border: 1px solid green;
  }
  .wylib-loglist .spacer .lower {
    position: absolute;
    left: 6px;
    top: 20px;
    height: 12px;
  }
  .wylib-loglist .button {
    border-radius: 4px;
  }
  .wylib-loglist .button .icon {
    height: 12px;
    width: 12px;
  }
  .wylib-loglist .button:hover {
    background: #bbeebb;
  }
  .wylib-loglist .button.andor.and {
    background: #aaaaee;
  }
  .wylib-loglist .button.andor {
    background: #eeee88;
  }
</style>
