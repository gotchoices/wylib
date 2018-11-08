//Manage a reactive SVG figure which can be updated on the fly
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Display a blank SVG background
//X- Can scale SVG to fit its container
//X- Can create native SVG objects
//- Re-adjust viewport after bumping objects (eliminate extra space on edges)
//X- Draw link arrows for all objects
//X- Incorporate attractive force from links
//X- Can I still drag/drop objects?
//X- Optional button to turn bump sort on/off
//- 
//- Later:
//- Immunize objects that have no links? (max proximity to any object?)
//- Retain placement as a saved state
//- Can change scale on the fly with the scroll wheel?
//- Can pan view window around to display a desired view of the SVG
//- 
<template>
    <svg :viewBox="viewCoords">
      <defs>
        <marker id="marker-arrow" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto" markerUnits="strokeWidth" stroke=inherit fill=inherit>
          <path d="M0,0 L0,8 L12,4 z"/>
        </marker>
      </defs>
      <path :d="border" stroke="grey" stroke-width="1" fill="none"/>
      <wylib-svgnode v-for="spr,idx in state.nodes" :key="idx" :state="spr" ref="node"/>
    </svg>
</template>

<script>
import Com from './common.js'
import svgNode from './svgnode.vue'
import vector from './vector.js'

export default {
  name: 'wylib-svg',
  components: {'wylib-svgnode': svgNode},
  props: {
    state:	{type: Object, default: null},
    bumpTimer:	{default: 400},
    pushForce:	{default: 1},
    pullForce:	{default: 5}
  },
  data() { return {
    timerID:	null,
    xMin:	0,
    yMin:	0,
    xMax:	this.state.width,
    yMax:	this.state.height
  }},
  
  computed: {
    viewCoords: function() {		//Viewport of SVG space
//console.log('Re-render')
      return [this.xMin, this.yMin, this.xMax-this.xMin, this.yMax-this.yMin].join(' ')
    },
    border: function() {		//Outline the normal drawing area
      return `M this.xMin this.xMax H ${this.xMax} V ${this.yMax} H this.xMin V this.yMin`
    }
  },
  
  methods: {
    nodeState(n) {			//Return the state object for the named node
      return this.state.nodes[n]
    },
    bump() {			//Nudge each object according to the computed forces on it
      let forces = []
      this.$refs.node.forEach((vm, ix) => {forces[ix] = {r:0, a:0}})
      this.$refs.node.forEach((vm1, ix1) => {
        this.$refs.node.forEach((vm2, ix2) => {
          if (ix1 != ix2) {
            let rect12 = vector.sub(vm2.center, vm1.center)	//Distance between 2 nodes
              , polar12 = vector.rtop(rect12)
              , push = this.pushForce * 100000 / Math.pow(polar12.r,2)
              , pull = 0
//console.log("bump:", ix1, ix2, rect12, polar12, push)

            if (vm1.state.links.includes(vm2.state.tag)) {
              pull = this.pullForce * Math.pow(polar12.r,2) / 100000
//console.log("tug:", vm1.state.tag, vm2.state.tag, pull)
            }
            forces[ix1] = vector.add(forces[ix1], {r:-push + pull, a:polar12.a})
            forces[ix2] = vector.add(forces[ix2], {r: push - pull, a:polar12.a})
          }
        })
      })
      this.$refs.node.forEach((vm, ix) => {	//Now do the nudging
//console.log("Bump:", ix, forces[ix])
        vm.state.x += forces[ix].x
        vm.state.y += forces[ix].y
        if (vm.state.x + vm.state.width > this.xMax) this.xMax = vm.state.x + vm.state.width
        if (vm.state.y + vm.state.height > this.yMax) this.yMax = vm.state.y + vm.state.height
        if (vm.state.x < this.xMin) this.xMin = vm.state.x
        if (vm.state.y < this.yMin) this.yMin = vm.state.y
      })
    },
  },

  beforeMount: function() {
//console.log("SVG state:", JSON.stringify(this.state))
    Com.react(this, {width: 400, height: 400, nodes: {}})
  },

  mounted: function() {
//    this.timerID = setInterval(this.bump, this.bumpTimer)	//Continuous
//    this.timerID = setTimeout(this.bump, this.bumpTimer)	//Once only
  },
}
</script>

<style lang="less">
//  iframe {
//    border: 4px solid blue;
//  }
</style>
