//Manage a reactive SVG figure which can be updated on the fly
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Display a blank SVG background
//X- Can scale SVG to fit its container
//- Can create native SVG objects
//- Can group objects
//- Can change attributes of objects
//- 
//- Later:
//- Can change scale on the fly with the scroll wheel (later)
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
      <wylib-svgnode v-for="spr,idx in state.nodes" :key="idx" :state="spr"/>
    </svg>
</template>

<script>
import Com from './common.js'
import svgNode from './svgnode.vue'

export default {
  name: 'wylib-svg',
  components: {'wylib-svgnode': svgNode},
  props: {
    state:	{type: Object, default: () => ({nodes: [{}, {}]})},
    width:	{default: 200},
    height:	{default: 200},
  },
  data() { return {
    wxy:	{},
    xyz:	{}
  }},
  computed: {
    viewCoords: function() {
      return [0, 0, this.state.width, this.state.height].join(' ')
    },
    border: function() {
      return `M 0 0 H ${this.state.width} V ${this.state.height} H 0 V 0`
    }
  },
  beforeMount: function() {
console.log("SVG state:", JSON.stringify(this.state))
    Com.react(this, {
      width: 400, height: 400
    })
  },
}
</script>

<style lang="less">
//  iframe {
//    border: 4px solid blue;
//  }
</style>
