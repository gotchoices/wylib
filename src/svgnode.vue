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
      <g class="hubs">
        <g v-for="link in state.links" v-html="hubs[linkName(link)]"></g>
      </g>
      <g class="connectors" v-for="link in state.links">
        <path :d="connectors[linkName(link)]" marker-end="url(#marker-arrow)" stroke="blue" stroke-width="1" fill="none"/>
      </g>
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
      this.state.links.forEach(lk => {			//For each node I point to
        let link = lk, draw = true, ends = this.state.ends, center = this.cent, guid, hub, radius = this.state.radius || this.state.width/2		//Assume node is a simple box
        if (typeof lk == 'object') {({ guid, link, draw, center, ends, hub } = lk)}	//But if it is not, get hub-specific data
        
        if (draw) {					//Draw a link line, in addition to any optional hub
          let d, refState, refPoint, refVM = nodeBus.notify(link)[0]
//console.log("Connecting:", this.state.tag, 'at', this.state.x, this.state.y, 'to', link)
          if (refVM) {					//If it already exists
            refState = refVM.state			//Generate connection
            refPoint = refVM.connection({x:this.state.x+center.x, y:this.state.y+center.y}, guid)	//Ask for coordinates of the other node's connection point
//console.log("  found his connection:", refPoint.x, refPoint.y)
          } else {					//Create placeholder, for now
            refState = this.$parent.nodeState(link)
            refPoint = {x:refState.x, y:refState.y, xs:refState.x, ys:refState.y}
          }
//console.log(" at:", refState.x, refState.y)
          let myPoint = this.closest(this.state, ends, refPoint)		//Now find closest point on me, to other node's point
//console.log("  found my connection:", myPoint.x, myPoint.y)
          let xMyC = myPoint.x*2 - center.x, yMyC = myPoint.y*2 - center.y	//Curve control point on my end
          let xEnd = refPoint.x  - this.state.x, yEnd = refPoint.y  - this.state.y	//Convert his closest point to relative x,y
          let xEnC = refPoint.xs - this.state.x, yEnC = refPoint.ys - this.state.y	//Curve control point on his end, as relative coordinates
          d = `M${myPoint.x},${myPoint.y} C${xMyC},${yMyC}, ${xEnC},${yEnC}, ${xEnd},${yEnd}`
//          d = `M${myPoint.x},${myPoint.y} L${xMyC},${yMyC}, L${xEnC},${yEnC}, L${xEnd},${yEnd}`
          paths[link] = d
        }
      })
      return paths
    },
    hubs: function () {				//Generate SVG code for appendages where connecting arrows should terminate
      var code = {}
      this.state.links.forEach(lk => {		//For each node I point to
        if (typeof lk == 'object') {
          let link = lk.link
          code[link] = lk.hub(link)
//        code[link] = `<ellipse x=${x} rx="40" ry="10" stroke="black" stroke-width="1" fill="red"/>`
        }
      })
      return code
    },
  },

  methods: {
    linkName(link) {					//Link might be a node name, or an object with more data including the node name
      if (typeof link == 'object') {return link.link} else {return link}
    },
    closest(base, points, point) {			//Find closest vertex from a list of points, to a specified point
      let x = 0, y = 0, lenMin = Number.MAX_SAFE_INTEGER	//Base(state) and point contain absolute coordinates
//console.log("Closest:", base, points, point)			//points are relative to object
      points.forEach(p => {
        let len = Math.sqrt(Math.pow(base.x + p.x - point.x,2) + Math.pow(base.y + p.y - point.y,2))
        if (len < lenMin) {x = p.x; y = p.y; lenMin = len}	//if smallest distance yet, remember it
      })
      return {x, y}					//Return closest point, relative to base
    },
    connection(Him, guid) {				//Return my closest connection point to other coordinate 'Him'
      let center = this.cent, ends = this.state.ends, me = this.state
      if (guid) this.state.links.forEach(lk => {	//Find the matching hub, if there is one
        if (lk.guid == guid) {({ center, ends } = lk)}
      })
//console.log("Position: (", Him.x, Him.y,")", this.state.tag, "@", me.x, me.y, guid)
      let cp = this.closest(this.state, ends, Him)	//cp=closest point, 'ends' describes possible relative locations to terminate connector lines
        , xs = cp.x*2 - center.x + me.x			//Compute curve control points
        , ys = cp.y*2 - center.y + me.y
        , x = me.x + cp.x				//Compute absolute connection point
        , y = me.y + cp.y
      return({x, y, xs, ys})
    },
  },

  created: function() {
    nodeBus.register(this.state.tag, this.state.tag, dat => {	//Listen for anyone asking for me by tag
      return this
    })
  },

  beforeMount: function() {
//console.log("Node beforeMount:", this.state.tag)
    Com.react(this, {		//Create any state properties that don't yet exist
      x: 0, y: 0, xScale: 1, yScale: 1, rotate: 0, drag: true, links: [], ends: [], radius: 0
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
