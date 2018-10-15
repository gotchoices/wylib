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
      <wylib-sprite v-for="spr,idx in state.sprites" :key="idx" :state="spr"/>
    </svg>
</template>

<script>
import Com from './common.js'
import Sprite from './sprite.vue'

export default {
  name: 'wylib-vector',
  components: {'wylib-sprite': Sprite},
  props: {
    state:	{type: Object, default: () => ({sprites: [{}, {}]})},
    width:	{default: 200},
    height:	{default: 200},
  },
  data() { return {
    wxy:	{},
    xyz:	{}
  }},
  computed: {
    viewCoords: function() {
      return [0, 0, this.width, this.height].join(' ')
    },
    border: function() {
      return `M 0 0 H ${this.width} V ${this.height} H 0 V 0`
    }
  },
  beforeMount: function() {
console.log("Vector state:", JSON.stringify(this.state))
    Com.react(this, {
      x: 0, y: 0, xScale: 1, yScale: 1, rotate: 0, drag: true, code: '<g/>'
    })
  },
}
</script>

<style lang="less">
//  iframe {
//    border: 4px solid blue;
//  }
</style>
