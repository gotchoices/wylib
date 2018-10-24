//Represents an SVG object grouping, to be used inside vector.vue
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Need to be able to send an event to some other node I'm linked to
//- Ask for its link position list
//- Reconcile the shortest path, draw line
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
var vmsByTag = {}

export default {
  name: 'wylib-svgnode',
  props: {
    state:	{type: Object, default: () => ({})},
//    svgObject:	{default: '<circle r="40" stroke="black" stroke-width="1" fill="pink"/>'},
  },
  data() { return {
    cent:	{x: 0, y: 0},			//Center of mass of possible connection points
  }},
//  watch: {
//    'state.links': function(v) {
//console.log("Links changed", this.state.links)	//Fixme: insert or delete from pointsToMe as needed
//    },
//  },

  computed: {
    transform: function() {				//Moves the object around
      return `translate(${this.state.x}, ${this.state.y}) rotate(${this.state.rotate}) scale(${this.state.xScale}, ${this.state.yScale})`
    },
    center: function() {
      return {x: this.state.x + this.cent.x, y: this.state.y + this.cent.y}
    },
    objStyle: function () {return {			//Change the cursor over movable item
      cursor:		this.state.drag ? 'move' : 'arrow',
    }},
  },
  methods: {
    closest(base, points, point) {			//Find closest vertex from a list to a given point
      let x = 0, y = 0, lenMin = Number.MAX_SAFE_INTEGER		//Base, point: absolute
//console.log("Closest:", base, points, point)				//points: relative to object
      points.forEach(p => {
        let len = Math.sqrt(Math.pow(base.x+p.x-point.x,2) + Math.pow(base.y+p.y-point.y,2))
        if (len < lenMin) {x = p.x; y = p.y; lenMin = len}
      })
      return {x, y}					//Return closest (relative) point
    },
    connection(xYou, yYou) {				//Return my closest connection point
//console.log("Position: (", xYou, yYou,")", this.state.tag, "@", this.state.x, this.state.y)
      let cp = this.closest(this.state, this.state.ends, {x:xYou, y:yYou})
      let xs = cp.x*2-this.cent.x + this.state.x, ys = cp.y*2-this.cent.y + this.state.y
      let x = this.state.x + cp.x, y = this.state.y + cp.y	//Compute absolute point
      return({x, y, xs, ys})
    },
    moveHandler(event) {
//console.log("Moving: ", this.state.tag)
      this.state.x += event.dx
      this.state.y += event.dy
    },
    connector(link) {
      let linkVM = vmsByTag[link]					//Who I'm pointing to
      let con = linkVM ? linkVM.connection(this.state.x+this.cent.x, this.state.y+this.cent.y) : {x:0, y:0}	//Ask his position
//console.log("Found his connection:", con.x, con.y, con.xs, con.ys)
      let cp = this.closest(this.state, this.state.ends, con)		//Closest point on me
//console.log("Found my connection:", cp.x, cp.y, this.cent.x, this.cent.y)
      let xMyC = cp.x*2 - this.cent.x, yMyC = cp.y*2 - this.cent.y	//Curve control point on my end
      let xEnd = con.x  - this.state.x, yEnd = con.y  - this.state.y	//Convert his closest point to relative x,y
      let xEnC = con.xs - this.state.x, yEnC = con.ys - this.state.y	//Curve conrol point on his end
      let d = `M${cp.x},${cp.y} C${xMyC},${yMyC}, ${xEnC},${yEnC}, ${xEnd},${yEnd}`
//      let d = `M${cp.x},${cp.y} L${xMyC},${yMyC} L${xEnC},${yEnC} L${xEnd},${yEnd}`		//Debug: Show control points
//console.log("Connecting:", this.state.tag, 'at', cp.x, cp.y, 'to', link, 'at', xEnd, yEnd)
      return d
    },
  },
  created: function() {
//    this.$on('position', () => {return {x: this.state.x, y: this.state.y}})
//    this.$on('center', () => {return {x: this.state.x + this.cent.x, y: this.state.y + this.cent.y}})
    vmsByTag[this.state.tag] = this				//Keep a table of my peers
  },

  beforeMount: function() {
console.log("Node state:", JSON.stringify(this.state))
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
