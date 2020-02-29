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
  <div class="wylib wylib-svg" @wheel.prevent="zoom">
    <svg class="graph" :viewBox="viewCoords" ref="svg">
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
          <input type="range" min="0" max="100" v-model="state.pushForce" class="slider nodrag" title="How hard the nodes repel each other (r^3)">Repel: {{state.pushForce}}</input>
          <input type="range" min="0" max="100" v-model="state.pullForce" class="slider nodrag" title="How hard the links attract connected nodes (r^3)">Attract: {{state.pullForce}}</input>
          <input type="range" min="0" max="100" v-model="state.gravForce" class="slider nodrag" title="General linear attractive force">Gravity: {{state.gravForce}}</input>
          <input type="range" min="0" max="100" v-model="state.randForce" class="slider nodrag" title="How much random force to introduce">Random: {{state.randForce}}</input>
          <input type="checkbox" v-model="state.autoBump" class="checkbox nodrag" title="Try to arrange nodes each time a change is registered">Auto Arrange:</input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Com = require('./common.js')
const vector = require('./vector.js')
const Icons = require('./icons.js')
const Interact = require('interactjs')
import svgNode from './svgnode.vue'

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
    stateTpt:		{minX:0, minY:0, maxX:400, maxY: 400, nodes: {}, pushForce:50, pullForce:50, randForce:0, aspForce:1, gravForce:50, autoBump:true},
  }},
  
  computed: {
    viewCoords() {			//Viewport of SVG space
//console.log('Re-render')
      return [this.state.minX, this.state.minY, this.state.maxX-this.state.minX, this.state.maxY-this.state.minY].join(' ')
    },
    border() {				//Outline the normal drawing area
      return `M ${this.state.minX} ${this.state.maxX} H ${this.state.maxX} V ${this.state.maxY} H ${this.state.minX} V ${this.state.minY}`
    },
    boundBox() {return {
      x:this.state.minX, y:this.state.minY, width:this.state.maxX-this.state.minX, height:this.state.maxY-this.state.minY
    }},
    toolStyle() {return {
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
    clip(val, max) {
      let i = val
      if (val > max) return max
      if (val < -max) return -max
      return val
    },
    bump() {			//Nudge each object according to the computed forces on it
      let forces = []
        , xSize = this.state.maxX - this.state.minX
        , ySize = this.state.maxY - this.state.minY
        , svgAsp = xSize / ySize
        , winAsp = window.innerWidth / (window.innerHeight * 0.80)		//Estimate vertical space used for display of SVG
        , adjAsp = Math.log10(winAsp/svgAsp)
        , maxMove = Math.min(xSize, ySize) / 5
//console.log("Bump:", maxMove, svgAsp, winAsp, adjAsp)
      this.$refs.node.forEach((vm, ix) => {forces[ix] = {x:0, y:0}})		//Init forces
      this.$refs.node.forEach((vm1, ix1) => {
//console.log("vm1:", vm1.state.x, vm1.state.y)
        this.$refs.node.forEach((vm2, ix2) => {
          if (ix1 != ix2) {
            let rect12 = vector.sub(vm2.center, vm1.center)	//Distance between 2 nodes
              , polar12 = vector.rtop(rect12)
              , aspectBias = {x:vm2.center.x / 10 * adjAsp, y: -vm2.center.y / 10 * adjAsp}		//Squish vertically a little
              , mag = Math.max(polar12.r - vm1.state.radius - vm2.state.radius, 10)	//Ignore closer than 2, or negative
              , maxPull = Math.min(maxMove, mag / 10)
              , push = Math.min(this.state.pushForce * 100 / Math.pow(mag,2), maxMove/20)
              , pull = this.state.gravForce * mag / 50000				//All objects have a little attractive gravity
              , randPull = 0
              , link = vm1.state.links.find(el=>(el.link == vm2.state.tag))
              , linkBias

            if (link) {
//console.log("link:", ix1, ix2, link)
              if (link.bias) linkBias = link.bias()
              pull += this.state.pullForce * Math.pow(mag,2) / 200			//Linked objects have a lot more attraction
              if (this.state.randForce && Math.random() < 0.02) {			//Inject an extra random burst 2% of the time
                randPull = pull * (Math.random() - 0.5) * this.state.randForce
              }
            }
            pull = Math.min(pull, maxPull)
//console.log("PP:", ix1, ix2, push.toFixed(4), pull.toFixed(4), maxPull.toFixed(1))	//, adjAsp, aspectBias)
//console.log("vals:", vm1.center, vm2.center, rect12, polar12, linkBias)
            forces[ix1] = vector.add(forces[ix1], {r:-push + pull + randPull, a:polar12.a}, linkBias)
            forces[ix2] = vector.add(forces[ix2], {r: push - pull + randPull, a:polar12.a}, aspectBias)
//console.log("  pp:", forces[ix1], forces[ix2])
          }
        })
      })
      let minX = Number.MAX_VALUE, minY = minX, maxX = -Number.MAX_VALUE, maxY = maxX
      this.$refs.node.forEach((vm, ix) => {		//Now do the nudging
//console.log("Nudge:", ix, forces[ix].x.toFixed(3), forces[ix].y.toFixed(3), maxMove.toFixed(1))
        vm.state.x += this.clip(forces[ix].x, maxMove)		//Nudge
        vm.state.y += this.clip(forces[ix].y, maxMove)

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
        vm.state.x -= (minX - 20)
        vm.state.y -= (minY - 20)
//console.log("x:", vm.state.x, "y:", vm.state.y)
      })
      this.state.minX = this.state.minY = 0		//And adjust SVG viewport to show all objects
      this.state.maxX = maxX - minX + 60
      this.state.maxY = maxY - minY + 60
    },
    zoom(ev) {
      let delta = ev.deltaY				//Magnitude of zoom
        , st = this.state
        , bBox = this.$refs.svg.getBoundingClientRect()		//DOM coordinates of svg
        , xRat = bBox.width / (st.maxX - st.minX)		//ratio of DOM scale to SVG scale
        , yRat = bBox.height / (st.maxY - st.minY)
        , wid = bBox.width || 1					//Control nulls
        , hei = bBox.height || 1
        , h1 = (ev.clientX - bBox.left)   || 1
        , h2 = (bBox.right - ev.clientX)  || 1
        , v1 = (ev.clientY - bBox.top)    || 1
        , v2 = (bBox.bottom - ev.clientY) || 1
      
//console.log("zoom:", parseInt(st.minX), parseInt(st.minY), parseInt(st.maxX), parseInt(st.maxY), 'box:', parseInt(bBox.left), parseInt(bBox.top), parseInt(bBox.right), parseInt(bBox.bottom), 'cur:', ev.clientX, ev.clientY)
//console.log("h1:", parseInt(h1), "v1:", parseInt(v1), "h2:", parseInt(h2), "v2:", parseInt(v2))
      st.minX -= delta / xRat * h1 / wid		//Adjust SVG view coordinates
      st.minY -= delta / yRat * v1 / hei
      st.maxX += delta / xRat * h2 / wid
      st.maxy += delta / yRat * v2 / hei
    },
  },

  beforeMount: function() {
    Com.stateCheck(this)
    if (this.state.maxX == null) Object.assign(this.state, this.stateTpt)	//Recover from garbage in stored state
//console.log("SVGraph beforeMount:", this.state)
  },

  mounted: function() {
    Interact(this.$refs.tools).draggable({
      onmove: (event) => {this.toolX += event.dx; this.toolY += event.dy},
      ignoreFrom: '.nodrag'
    })
    this.$on('bump', ()=>{this.bump()})
    this.$on('change', ()=>{
//console.log("Change:", this.state.autoBump)
      if (this.state.autoBump) this.bump()
    })
  },
}
</script>

<style lang="less">
  .wylib-svg {
    height: auto;
    background: blue;
    touch-action: none;
  }
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
