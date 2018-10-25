//Represents an SVG object that moves as a group, to be used inside svg.vue
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Can't lookup relational nodes that haven't been created yet
//- Need a way to register a callback when the final end of a connection is rendered, fill in the SVG connection path then
//- Create a queue
//- If I can look up my peer and draw the line now, do it
//- Otherwise, log it in the queue to be completed when the peer node is rendered
//- 
//- 
<template>
    <g :transform="transform">
      <path v-for="link,idx in state.links" :d="connector(link)" marker-end="url(#marker-arrow)" stroke="black" stroke-width="1" fill="none"/>
      <g v-html="state.code" :style="objStyle"/>
    </g>
</template>

<script>
import Com from './common.js'
import Interact from 'interactjs'
var pointToMe = {}			//Cache info about nodes that are pointing to a given node
//var vmsByTag = {}		//Moved to svg parent

export default {
  name: 'wylib-svgnode',
  props: {
    state:	{type: Object, default: () => ({})},
  },
  data() { return {
    cent:	{x: 0, y: 0},		//Centroid of possible connection points (relative to node's local origin)
  }},
//  watch: {
//    'state.links': function(v) {
//console.log("Links changed", this.state.links)	//Fixme: insert or delete from pointsToMe as needed
//    },
//  },

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
    moveHandler(event) {				//Called when dragging objects
//console.log("Moving: ", this.state.tag)
      this.state.x += event.dx
      this.state.y += event.dy
    },
    connector(link) {			//Generate SVG code for connector line to object with tag = link
//      let linkVM = vmsByTag[link]	//Moved to svg parent
      let linkVM = this.$emit('nodevm',link)				//Ask parent for the vm of the node I'm pointing to
console.log("Link:", link, linkVM.state.tag)
      let con = linkVM ? linkVM.connection(this.state.x+this.cent.x, this.state.y+this.cent.y) : {x:0, y:0}	//Ask for coordinates of the other node's connection point
console.log("Found his connection:", con.x, con.y, con.xs, con.ys)
      let cp = this.closest(this.state, this.state.ends, con)		//Now find closest point on me, to him
console.log("Found my connection:", cp.x, cp.y, this.cent.x, this.cent.y)
      let xMyC = cp.x*2 - this.cent.x, yMyC = cp.y*2 - this.cent.y	//Curve control point on my end
      let xEnd = con.x  - this.state.x, yEnd = con.y  - this.state.y	//Convert his closest point to relative x,y
console.log("xyz:", con.x, this.state.x, con.y, this.state.y)
console.log("Connecting:", this.state.tag, 'at', cp.x, cp.y, 'to', link, 'at', xEnd, yEnd)
      let xEnC = con.xs - this.state.x, yEnC = con.ys - this.state.y	//Curve control point on his end, as relative coordinates
      let d = `M${cp.x},${cp.y} C${xMyC},${yMyC}, ${xEnC},${yEnC}, ${xEnd},${yEnd}`
//      let d = `M${cp.x},${cp.y} L${xMyC},${yMyC} L${xEnC},${yEnC} L${xEnd},${yEnd}`		//Debug: Show control points
      return d
    },
  },
  created: function() {
//    this.$on('position', () => {return {x: this.state.x, y: this.state.y}})
//    this.$on('center', () => {return {x: this.state.x + this.cent.x, y: this.state.y + this.cent.y}})
//    vmsByTag[this.state.tag] = this				//Keep a table of my peers
//console.log("Storing:", this.state.tag)
  },

  beforeMount: function() {
//console.log("Node state:", JSON.stringify(this.state))
    Com.react(this, {		//Create any state properties that don't yet exist
      x: 0, y: 0, xScale: 1, yScale: 1, rotate: 0, drag: true, links: [], ends: []
    })
    if (this.state.ends.length) {
      let xSum = 0, ySum = 0, count = 0
      this.state.ends.forEach(el => {xSum += el.x; ySum += el.y; count++;})
      this.cent = {x: xSum / count, y: ySum / count}		//Calculate center of possible connection points
//console.log("Center: ", this.cent)
    }
    this.state.links.forEach(link => {
console.log("Node:", this.state.tag, "is linked to:", link)
      if (!(link in pointToMe)) pointToMe[link] = []
      let pToMe = pointToMe[link]
      if (!(pToMe.includes(this.state.tag))) pToMe.push(this.state.tag)
    })
  },

  mounted: function() {
    Interact(this.$el).draggable({
      inertia: true,
      onmove: this.moveHandler
    })
  },
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
