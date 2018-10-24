//Manage a reactive SVG figure which can be updated on the fly
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Display a blank SVG background
//X- Can scale SVG to fit its container
//X- Can create native SVG objects
//- Re-adjust viewport after bumping objects
//- Draw link arrows for all objects
//- Incorporate attractive force from links
//- Immunize objects that have no links (max proximity to any object?)
//- Can I still drag/drop objects?
//- Optional button to turn bump sort on/off
//- Stop bumping if all moves are tiny
//- 
//- Later:
//- Can change scale on the fly with the scroll wheel?
//- Can pan view window around to display a desired view of the SVG
//- 
<template>
    <svg :viewBox="viewCoords">
      <defs>
        <marker id="marker-arrow" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto" markerUnits="strokeWidth">
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
    state:	{type: Object, default: () => ({nodes: [{}, {}]})},
    interval:	{default: 2000},
    repel:	{default: 100000}
  },
  data() { return {
    wxy:	{},
    timer:	null
  }},
  computed: {
    viewCoords: function() {
console.log('Re-render')
      return [0, 0, this.state.width, this.state.height].join(' ')
    },
    border: function() {
      return `M 0 0 H ${this.state.width} V ${this.state.height} H 0 V 0`
    }
  },
  methods: {
    bump() {			//Nudge each object according to the computed forces on it
      let forces = []
      this.$refs.node.forEach((vm, ix) => {forces[ix] = {r:0, a:0}})
      this.$refs.node.forEach((vm1, ix1) => {
        this.$refs.node.forEach((vm2, ix2) => {
          if (ix1 != ix2) {			//Find all combinations of any two nodes
            let c1 = vm1.center, c2 = vm2.center
              , rect12 = vector.sub(vm2.center, vm1.center)
              , polar12 = vector.rtop(rect12)
              , force = this.repel / Math.pow(polar12.r,2)
//console.log("bump:", ix1, ix2, rect12, polar12, force)
            forces[ix1] = vector.add(forces[ix1], {r:-force, a:polar12.a})
            forces[ix2] = vector.add(forces[ix2], {r: force, a:polar12.a})
          }
        })
      })
      this.$refs.node.forEach((vm, ix) => {
console.log("Bump:", ix, forces[ix])
        vm.state.x += forces[ix].x
        vm.state.y += forces[ix].y
      })
    },
  },
  beforeMount: function() {
console.log("SVG state:", JSON.stringify(this.state))
    Com.react(this, {
      width: 400, height: 400
    })
  },
  mounted: function() {
//    this.timer = setInterval(this.bump, this.interval)
    this.timer = setTimeout(this.bump, this.interval)
  },
}
</script>

<style lang="less">
//  iframe {
//    border: 4px solid blue;
//  }
</style>
