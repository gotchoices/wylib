//Represents an SVG object grouping, to be used inside vector.vue
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
//- 
//- 
<template>
    <g :transform="transform" v-html="state.code" :style="objStyle">
    </g>
</template>

<script>
import Com from './common.js'
import Interact from 'interactjs'

export default {
  name: 'wylib-sprite',
  props: {
    state:	{type: Object, default: () => ({})},
//    svgObject:	{default: '<circle r="40" stroke="black" stroke-width="1" fill="pink"/>'},
  },
  data() { return {
    xyz:	{},
  }},
  computed: {
    transform: function() {
      return `translate(${this.state.x}, ${this.state.y}) rotate(${this.state.rotate}) scale(${this.state.xScale}, ${this.state.yScale})`
    },
    objStyle: function () {return {
      cursor:		this.state.drag ? 'move' : 'arrow',
    }},
  },
  methods: {
    moveHandler(event) {
console.log("Moving: " + JSON.stringify(event.rect))
      this.state.x += event.dx
      this.state.y += event.dy
    },
  },
  beforeMount: function() {
console.log("Sprite state:", JSON.stringify(this.state))
    Com.react(this, {		//Create any state properties that don't yet exist
      x: 0, y: 0, xScale: 1, yScale: 1, rotate: 0, drag: true
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
//  .wylib-sprite .draggable {
//    cursor: move;
//  }
//  iframe {
//    border: 4px solid blue;
//  }
</style>
