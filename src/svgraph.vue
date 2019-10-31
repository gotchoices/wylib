//Manage a reactive SVG figure which can be updated on the fly
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Bias bump algorithm toward a wider aspect ratio
//- 
//- Later:
//- Tug rubber bands from center of hubs? (could be more expensive in CPU time)
//- Retain placement as a saved state
//- Can change scale on the fly with the scroll wheel?
//- Can pan view window around to display a desired view of the SVG
//- 
<template>
  <div class="wylib wylib-svg">
    <svg class="graph" :viewBox="viewCoords">
      <defs>
        <marker id="marker-arrow" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto" markerUnits="strokeWidth" stroke=inherit fill=inherit>
          <path d="M0,0 L0,8 L12,4 z"/>
        </marker>
      </defs>
      <path :d="border" stroke="grey" stroke-width="1" fill="none"/>
      <wylib-svgnode v-for="spr,idx in state.nodes" :key="idx" :state="spr" ref="node" @drag="moveHandler"/>
    </svg>
    <div class="tools" ref="tools" :style="toolStyle">
      <div class="menu">
        <svg class="icon" style="stroke:black; fill: black" v-html="iconSvg('menu')"></svg>
      </div>
      <div class="toolbox">
        <button class="nodrag" @mousedown="buttonDown" @mouseup="buttonUp" @mouseleave="buttonUp" title="Attempt to distribute objects on the chart (hold to repeat)">Arrange</button>
        <button class="nodrag" @click="$emit('refresh')" title="Reload chart from its source data">Refresh</button>
        <button class="nodrag" @click="$emit('reset')" title="Reload chart and reinitialize arrangement">Reset</button>
        <div class="sliders">
          <input type="range" min="1" max="100" v-model="state.pushForce" class="slider nodrag" title="How hard the nodes repel each other">Repel: {{state.pushForce}}</input>
          <input type="range" min="1" max="100" v-model="state.pullForce" class="slider nodrag" title="How hard the links attract connected nodes">Attract: {{state.pullForce}}</input>
          <input type="range" min="1" max="100" v-model="state.randForce" class="slider nodrag" title="How much random force to introduce">Random: {{state.randForce}}</input>
          <input type="range" min="-50" max="50" v-model="state.aspForce" class="slider nodrag" title="How much to squish vertically">Aspect: {{state.aspForce}}</input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Com from './common.js'
import Interact from 'interactjs'
import svgNode from './svgnode.vue'
import vector from './vector.js'
const Icons = require('./icons.js')

export default {
  name: 'wylib-svg',
  components: {'wylib-svgnode': svgNode},
  props: {
    state:		{type: Object, default: null},
    bumpTimer:		{default: 400},
    startTime:		{default: 500},
    repeatTime:		{default: 200}
  },
  data() { return {
    startTimer:		null,
    repeatTimer:	null,
    toolX:		0,
    toolY:		0,
    stateTpt:		{minX:0, minY:0, maxX:400, maxY: 400, nodes: {}, pushForce:50, pullForce:50, randForce:1, aspForce:1},
  }},
  
  computed: {
    viewCoords: function() {		//Viewport of SVG space
//console.log('Re-render')
      return [this.state.minX, this.state.minY, this.state.maxX-this.state.minX, this.state.maxY-this.state.minY].join(' ')
    },
    border: function() {		//Outline the normal drawing area
      return `M ${this.state.minX} ${this.state.maxX} H ${this.state.maxX} V ${this.state.maxY} H ${this.state.minX} V ${this.state.minY}`
    },
    boundBox: function () {return {
      x:this.state.minX, y:this.state.minY, width:this.state.maxX-this.state.minX, height:this.state.maxY-this.state.minY
    }},
    toolStyle: function () {return {
      transform:	'translate(' + this.toolX + 'px, ' + this.toolY + 'px)',
    }},
  },
  
  methods: {
    iconSvg(icon) {return Icons(icon)},
    nodeState(n) {			//Return the state object for the named node
//console.log("nodestate:", n, this.state.nodes)
      return this.state.nodes[n]
    },
    buttonDown() {			//Make arrange button repeat if it is held down
//console.log("Button down")
      if (this.startTimer) clearTimeout(this.startTimer)
      if (this.repeatTimer) clearInterval(this.repeatTimer)
      this.startTimer = setTimeout(() => {	//After initial timeout
        this.startTimer = null
        this.repeatTimer = setInterval(this.bump, this.repeatTime)	//Start repeating more rapidly
      }, this.startTime)
    },
    buttonUp() {
//console.log("Button up")
      if (this.startTimer) {			//If waiting for button to repeat	
        clearTimeout(this.startTimer)		//Cancel that
        this.startTimer = null
        this.bump()				//And do a single bump
      }
      if (this.repeatTimer) {			//If we have already been repeating
        clearInterval(this.repeatTimer)		//Just quit
        this.repeatTimer = null
      }
    },
    moveHandler(event, state) {		//Called when dragging nodes
//console.log("Move handler", this.state.minX, this.state.maxX, this.$el.getBoundingClientRect().width, ratio)
      let ratio = (this.state.maxX - this.state.minX) / this.$el.getBoundingClientRect().width	//Scale moves by the current scale of the svg
      state.x += (event.dx * ratio)
      state.y += (event.dy * ratio)
    },
    bump() {			//Nudge each object according to the computed forces on it
      let forces = []
      this.$refs.node.forEach((vm, ix) => {forces[ix] = {r:0, a:0}})
      this.$refs.node.forEach((vm1, ix1) => {
        let links = vm1.state.links.map(lk => {return (typeof lk == 'object') ? lk.link : lk})	//in case links involve a hub object
//console.log("links:", links)
        this.$refs.node.forEach((vm2, ix2) => {
          if (ix1 != ix2) {
            let rect12 = vector.sub(vm2.center, vm1.center)	//Distance between 2 nodes
              , polar12 = vector.rtop(rect12)
              , aspectBias = {x:vm2.center.x * 0.00005 * this.state.aspForce, y: -vm2.center.y * 0.00005 * this.state.aspForce}		//Squish vertically a little
              , maxMove = (this.state.maxX - this.state.minX) / 10			//Don't try to expand faster than this
              , mag = Math.max(polar12.r - vm1.state.radius - vm2.state.radius, 10)	//Ignore closer than 10 (or negative)
              , push = Math.min(this.state.pushForce * 800 / Math.pow(mag,2), maxMove)
              , pull = this.state.pullForce * mag / 1000000000	//All objects have a little attractive gravity
              , randPull = 0
//console.log("bump:", ix1, ix2, rect12, polar12, maxMove, push, aspectBias)

            if (links.includes(vm2.state.tag)) {
              pull += this.state.pullForce * Math.pow(mag,2) / 1000000			//Linked objects have a lot more attraction
              if (Math.random() < 0.02) {randPull = pull * (Math.random() - 0.5) * this.state.randForce}	//Inject an extra random burst 2% of the time
            }
            forces[ix1] = vector.add(forces[ix1], {r:-push + pull + randPull, a:polar12.a})
            forces[ix2] = vector.add(forces[ix2], {r: push - pull + randPull, a:polar12.a}, aspectBias)
          }
        })
      })
      let minX = Number.MAX_VALUE, minY = minX, maxX = -Number.MAX_VALUE, maxY = maxX
      this.$refs.node.forEach((vm, ix) => {		//Now do the nudging
//console.log("Bump:", ix, forces[ix])
        vm.state.x += forces[ix].x			//Nudge
        vm.state.y += forces[ix].y

        let hubs = vm.$el.getElementsByClassName("hubs")
          , bBox = hubs.length >= 1 ? hubs[0].getBBox() : vm.$el.getBBox()
          , range = {minX:vm.state.x+Math.min(bBox.x, 0), minY:vm.state.y+Math.min(bBox.y, 0), maxX:vm.state.x+Math.max(bBox.width+bBox.x,vm.state.width), maxY:vm.state.y+Math.max(bBox.height+bBox.y,vm.state.height)}
        
//console.log(" size:", vm.state.width, vm.state.height, range)
        if (range.maxX > maxX) maxX = range.maxX	//Determine proper range of canvas
        if (range.maxY > maxY) maxY = range.maxY
        if (range.minX < minX) minX = range.minX
        if (range.minY < minY) minY = range.minY
      })
//console.log("  mins:", minX, minY)
      this.$refs.node.forEach((vm, ix) => {		//Move all objects back relative to origin
        vm.state.x -= (minX - 10)
        vm.state.y -= (minY - 10)
      })
      this.state.minX = this.state.minY = 0		//And adjust SVG viewport to show all objects
      this.state.maxX = maxX - minX + 20
      this.state.maxY = maxY - minY + 20
    },
  },

  beforeMount: function() {
    Com.stateCheck(this)
  },

  mounted: function() {
    Interact(this.$refs.tools).draggable({
      onmove: (event) => {this.toolX += event.dx; this.toolY += event.dy},
      ignoreFrom: '.nodrag'
    })
  },
}
</script>

<style lang="less">
  .wylib-svg .tools {
    position: absolute;
    right: 10px;
  }

  .wylib-svg button {
    width: 100%;
    padding: 4px;
    background: #bbddff;
  }
  .wylib-svg .sliders input {
    display: block;
  }
  .wylib-svg .menu {
    position:absolute;
    right: .25em;
    top: .25em;
//    z-index: 1;
  }
  .wylib-svg .menu .icon {
    height: 1em;
    width: 1em;
  }
  .wylib-svg .toolbox {
    opacity: 0.20;
    display: none;
    border: 1px solid blue;
    border-radius: 4px;
//    background: yellow;
    padding: 4px;
    transition: all 500ms ease-in-out;
  }
  .menu:hover + .toolbox {
//    background: red;
    display: block;
    opacity: 1.0;
  }
  .wylib-svg .toolbox:hover {
    opacity: 1.0;
    display: block;
  }
  .wylib-svg .graph {
    position: absolute;
  }
</style>
