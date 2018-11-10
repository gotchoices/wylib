//Represents an SVG object that moves as a group, to be used inside svg.vue
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Consolidate first two parameters of closest()?
//- Should parameter of connection() be a point, rather than two parms?
//- 
<template>
    <g :transform="transform">
      <g v-html="state.code" :style="objStyle"/>
      <path v-for="link in state.links" :d="connectors[link]" marker-end="url(#marker-arrow)" stroke="blue" stroke-width="2" fill="none"/>
    </g>
</template>

<script>
import Com from './common.js'
import Interact from 'interactjs'
var nodeBus = new Com.eventBus()	//Discover vms with a given tag

export default {
  name: 'wylib-svgnode',
  props: {
    state:	{type: Object, default: () => ({})},
  },
  data() { return {
    cent:	{x:0, y:0},	//Centroid of possible connection points (relative to node's local origin)
  }},

  computed: {
    transform: function() {				//Moves the object around when we change x or y
      return `translate(${this.state.x}, ${this.state.y}) rotate(${this.state.rotate}) scale(${this.state.xScale}, ${this.state.yScale})`
    },
    center: function() {				//Compute my centroid in absolute terms
      return {x: this.state.x + this.cent.x, y: this.state.y + this.cent.y}
    },
    objStyle: function () {return {			//Change the cursor to show our object as movable
      cursor:		this.state.drag ? 'move' : 'arrow',
    }},
    connectors: function () {				//Generate SVG code for connector lines to other objects
      var paths = {}
      this.state.links.forEach(link => {		//For each node I point to
        let d, refState, refPoint, refVM = nodeBus.notify(link)[0]
//console.log("Connecting:", this.state.tag, 'at', this.state.x, this.state.y, 'to', link)
        if (refVM) {					//If it already exists
          refState = refVM.state			//Generate connection
          refPoint = refVM.connection(this.state.x+this.cent.x, this.state.y+this.cent.y)	//Ask for coordinates of the other node's connection point
//console.log("  found his connection:", refPoint.x, refPoint.y)
        } else {					//Create placeholder, for now
          refState = this.$parent.nodeState(link)
          refPoint = {x:refState.x, y:refState.y, xs:refState.x, ys:refState.y}
        }
//console.log(" at:", refState.x, refState.y)
        let myPoint = this.closest(this.state, this.state.ends, refPoint)		//Now find closest point on me, to other node's point
//console.log("  found my connection:", myPoint.x, myPoint.y)
        let xMyC = myPoint.x*2 - this.cent.x, yMyC = myPoint.y*2 - this.cent.y	//Curve control point on my end
        let xEnd = refPoint.x  - this.state.x, yEnd = refPoint.y  - this.state.y	//Convert his closest point to relative x,y
        let xEnC = refPoint.xs - this.state.x, yEnC = refPoint.ys - this.state.y	//Curve control point on his end, as relative coordinates
        d = `M${myPoint.x},${myPoint.y} C${xMyC},${yMyC}, ${xEnC},${yEnC}, ${xEnd},${yEnd}`
        paths[link] = d
      })
      return paths
    },
  },

  methods: {
    closest(base, points, point) {			//Find closest vertex from a list of points, to a specified point
      let x = 0, y = 0, lenMin = Number.MAX_SAFE_INTEGER	//Base(state) and point contain absolute coordinates
//console.log("Closest:", base, points, point)			//points are relative to object
      points.forEach(p => {
        let len = Math.sqrt(Math.pow(base.x + p.x - point.x,2) + Math.pow(base.y + p.y - point.y,2))
        if (len < lenMin) {x = p.x; y = p.y; lenMin = len}	//if smallest distance yet, remember it
      })
      return {x, y}					//Return closest point, relative to base
    },
    connection(xYou, yYou) {				//Return my closest connection point to 'you'
//console.log("Position: (", xYou, yYou,")", this.state.tag, "@", this.state.x, this.state.y)
      let cp = this.closest(this.state, this.state.ends, {x:xYou, y:yYou})			//cp=closest point, 'ends' describes possible relative locations to terminate connector lines
        , xs = cp.x*2 - this.cent.x + this.state.x	//Compute curve control points
        , ys = cp.y*2 - this.cent.y + this.state.y
        , x = this.state.x + cp.x			//Compute absolute connection point
        , y = this.state.y + cp.y
      return({x, y, xs, ys})
    },
//    moveHandler(event) {				//Called when dragging objects
//console.log("Moving: ", this.state.tag, event.dx, event.dy)
//      this.$emit('drag', event, this.state)
//      this.state.x += event.dx
//      this.state.y += event.dy
//    },
  },

  created: function() {
    nodeBus.register(this.state.tag, this.state.tag, dat => {	//Listen for anyone asking for me by tag
      return this
    })
  },

  beforeMount: function() {
//console.log("Node beforeMount:", this.state.tag)
    Com.react(this, {		//Create any state properties that don't yet exist
      x: 0, y: 0, xScale: 1, yScale: 1, rotate: 0, drag: true, links: [], ends: []
    })
    if (this.state.ends.length) {			//If I have connection points
      let xSum = 0, ySum = 0, count = 0
      this.state.ends.forEach(el => {xSum += el.x; ySum += el.y; count++;})
      this.cent = {x: xSum / count, y: ySum / count}	//Calculate center of mass for my connections
//console.log("Center: ", this.cent)
    }
  },

  mounted: function() {
//console.log("Node Mount:", this.state.tag)
    Interact(this.$el).draggable({
      inertia: true,
      onmove: event => {this.$emit('drag', event, this.state)}
    })
  }
}
</script>

<style lang="less">
//  .wylib-svgnode .draggable {
//    cursor: move;
//  }
//  iframe {
//    border: 4px solid blue;
//  }
</style>
