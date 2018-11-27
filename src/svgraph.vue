//Manage a reactive SVG figure which can be updated on the fly
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Display a blank SVG background
//X- Can scale SVG to fit its container
//X- Can create native SVG objects
//X- Draw link arrows for all objects
//X- Incorporate attractive force from links
//X- Can I still drag/drop objects?
//X- Optional button to turn bump sort on/off
//X- Re-adjust viewport after bumping objects (eliminate extra space on edges)
//X- Make tools disappear, then appear on mouse hover
//X- Label sliders
//X- Immunize objects that have no links? (max proximity to any object?)
//- 
//- Later:
//- Tug rubber bands from center of hubs? (could be more expensive in CPU time)
//- Retain placement as a saved state
//- Can change scale on the fly with the scroll wheel?
//- Can pan view window around to display a desired view of the SVG
//- 
<template>
  <div class="wylib wylib-svg">
    <svg :viewBox="viewCoords">
      <defs>
        <marker id="marker-arrow" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto" markerUnits="strokeWidth" stroke=inherit fill=inherit>
          <path d="M0,0 L0,8 L12,4 z"/>
        </marker>
      </defs>
      <path :d="border" stroke="grey" stroke-width="1" fill="none"/>
      <wylib-svgnode v-for="spr,idx in state.nodes" :key="idx" :state="spr" ref="node" @drag="moveHandler"/>
    </svg>
    <div class="tools" ref="tools" :style="toolStyle">
      <button class="nodrag" @mousedown="buttonDown" @mouseup="buttonUp" @mouseleave="buttonUp" title="Attempt to arrange objects on the chart">Arrange</button>
      <div class="sliders">
        <input type="range" min="1" max="100" v-model="pushForce" class="slider nodrag" title="How hard the nodes repel each other">Repel: {{pushForce}}</input>
        <input type="range" min="1" max="100" v-model="pullForce" class="slider nodrag" title="How hard the links attract connected nodes">Attract: {{pullForce}}</input>
      </div>
    </div>
  </div>
</template>

<script>
import Com from './common.js'
import Interact from 'interactjs'
import svgNode from './svgnode.vue'
import vector from './vector.js'

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
    minX:		0,
    minY:		0,
    maxX:		this.state.width,
    maxY:		this.state.height,
    pushForce:		50,
    pullForce:		50,
    startTimer:		null,
    repeatTimer:	null,
    toolX:		0,
    toolY:		0
  }},
  
  computed: {
    viewCoords: function() {		//Viewport of SVG space
//console.log('Re-render')
      return [this.minX, this.minY, this.maxX-this.minX, this.maxY-this.minY].join(' ')
    },
    border: function() {		//Outline the normal drawing area
      return `M ${this.minX} ${this.maxX} H ${this.maxX} V ${this.maxY} H ${this.minX} V ${this.minY}`
    },
    toolStyle: function () {return {
      transform:	'translate(' + this.toolX + 'px, ' + this.toolY + 'px)',
    }},
  },
  
  methods: {
    nodeState(n) {			//Return the state object for the named node
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
      if (this.startTimer) {		//If waiting for button to repeat	
        clearTimeout(this.startTimer)	//Cancel that
        this.startTimer = null
        this.bump()			//And do a single bump
      }
      if (this.repeatTimer) {		//If we have already been repeating
        clearInterval(this.repeatTimer)	//Just quit
        this.repeatTimer = null
      }
    },
    moveHandler(event, state) {		//Called when dragging nodes
//console.log("Move handler", this.minX, this.maxX, this.$el.getBoundingClientRect().width, ratio)
      let ratio = (this.maxX - this.minX) / this.$el.getBoundingClientRect().width	//Scale moves by the current scale of the svg
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
              , maxMove = (this.maxX - this.minX) / 10					//Don't try to expand faster than this
              , mag = Math.max(polar12.r - vm1.state.radius - vm2.state.radius, 10)	//Ignore closer than 10 (or negative)
              , push = Math.min(this.pushForce * 1000 / Math.pow(mag,2), maxMove)
              , pull = this.pullForce * mag / 1000000000	//All objects have a little attractive gravity
//console.log("bump:", ix1, ix2, rect12, polar12, maxMove, push)

            if (links.includes(vm2.state.tag)) {
              pull += this.pullForce * Math.pow(mag,2) / 1000000	//Linked objects have a lot more
//console.log("tug:", vm1.state.tag, vm2.state.tag, pull)
            }
            forces[ix1] = vector.add(forces[ix1], {r:-push + pull, a:polar12.a})
            forces[ix2] = vector.add(forces[ix2], {r: push - pull, a:polar12.a})
          }
        })
      })
      let minX = Number.MAX_VALUE, minY = minX, maxX = -Number.MAX_VALUE, maxY = maxX
      this.$refs.node.forEach((vm, ix) => {		//Now do the nudging
        let hubs = vm.$el.getElementsByClassName("hubs")
          , bBox = hubs.length >= 1 ? hubs[0].getBBox() : {x:0, y:0, width:this.state.width, height:this.state.height}
          , range = {minX:vm.state.x+Math.min(bBox.x, 0), minY:vm.state.y+Math.min(bBox.y, 0), maxX:vm.state.x+Math.max(bBox.width+bBox.x,vm.state.width), maxY:vm.state.y+Math.max(bBox.height+bBox.y,vm.state.height)}
        
//console.log("Bump:", ix, forces[ix])
        vm.state.x += forces[ix].x			//Nudge
        vm.state.y += forces[ix].y

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
      this.minX = this.minY = 0				//And adjust viewport to show all objects
      this.maxX = maxX - minX + 20
      this.maxY = maxY - minY + 20
    },
  },

  beforeMount: function() {
//console.log("SVG state:", JSON.stringify(this.state))
    Com.react(this, {width: 400, height: 400, nodes: {}})
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
    opacity: 0.02;
    border: 1px solid blue;
    border-radius: 4px;
    background: white;
    position: absolute;
    padding: 4px;
    transition: all 300ms ease-in-out;
  }

  .wylib-svg .tools:hover {
    opacity: 1.0;
  }
  .wylib-svg button {
    width: 100%;
    padding: 4px;
    background: lightBlue;
  }
  .wylib-svg .sliders input {
    display: block;
  }
  .wylib-svg svg {
    position: absolute;
  }
</style>
