//Represents an SVG object that moves as a group, to be used inside svgraph.vue
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
<template>
    <g :transform="transform" ref=root>
      <g class="wylib-svnode" v-html="state.body" :style="objStyle"/>
    </g>
</template>

<script>
const Com = require('./common.js')
const Interact = require('interactjs')

export default {
  name: 'wylib-svnode',
  props: {
    bus:	null,					//To propagate moves to edges
    query:	{type: Function, default: null},	//Not yet implemented
    state:	{type: Object, default: () => ({})},
  },
  data() { return {
    stateTpt:	{x: 0, y: 0, xScale: 1, yScale: 1, rotate: 0, drag: true, body:''},
  }},
  computed: {
    transform() {				//Moves the object around when we change x or y
//console.log('Node XY', this.state.tag, this.state.x, this.state.y)
      return `translate(${this.state.x}, ${this.state.y}) rotate(${this.state.rotate}) scale(${this.state.xScale}, ${this.state.yScale})`
    },
    location() {				//Where this node is placed on the graph
      return {x: this.state.x, y: this.state.y}
    },
    objStyle() {return {			//Change the cursor to show our object as movable
      cursor:		this.state.drag ? 'move' : 'arrow',
    }},
  },

//  methods: {
//  },
  
  watch: {
    'transform': function(newVal, oldVal) {
      this.bus.notify(this.state.tag, this.location)		//Tell edges about movement
    },
  },

  beforeMount: function() {
//console.log("Node beforeMount:", this.state.x, this.state.y)
    Com.stateCheck(this)
    if (this.state.x === null || this.state.x === undefined)	//Recover from garbage in stored state
      Object.assign(this.state, this.stateTpt)
  },

  mounted: function() {
//console.log("Node Mount:", this.state.tag, this.state, this.query)
    Interact(this.$refs.root).draggable({
      inertia: true,
      onmove: event => {this.$emit('drag', event, this.state)},
      onend: event => {this.$emit('dragend', event, this.state)}
    })
  }
}
</script>

<style lang="less">
//  .wylib-svnode .draggable {
//    cursor: move;
//  }
//  iframe {
//    border: 4px solid blue;
//  }
</style>
