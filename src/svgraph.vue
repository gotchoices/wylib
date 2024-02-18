//Manage a reactive SVG figure which can be updated on the fly
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Menu item to re-center graph on existing objects
//- Can pan view window around to display a desired view of the SVG
//- 
<template>
  <div class="wylib wylib-svgraph" @wheel.prevent="zoom">
    <svg class="graph" :viewBox="viewCoords" ref="svg">
      <defs>
        <marker id="marker-arrow" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto" markerUnits="strokeWidth" stroke=inherit fill=inherit>
          <path d="M0,0 L0,8 L12,4 z"/>
        </marker>
        <slot name="def"></slot>
      </defs>
<!--
      <path :d="border" stroke="green" stroke-width="1" fill="none"/>
      <path :d="crossHair" stroke="green" stroke-width="1" fill="none"/>
-->
      <wylib-svnode v-for="spr,idx in state.nodes" :key="idx" :state="spr" ref="node" :bus="bus" @drag="dragHandler" @dragend="dropHandler"/>
      <wylib-svedge v-for="spr,idx in state.edges" :key="idx" :state="spr" ref="edge" :query="edge" :bus="bus" :curve="edgeCurve"/>
    </svg>
    <div class="tools" ref="tools" :style="toolStyle">
      <div class="menu">
        <svg class="icon" style="stroke:black; fill: black" v-html="iconSvg('menu')"></svg>
      </div>
      <div class="toolbox">
        <div class="buttons">
          <button class="nodrag" @click="$emit('refresh')" :title="wm.h.svgRefresh">{{wm.t.svgRefresh}}</button>
          <button class="nodrag" @click="$emit('reset')" :title="wm.h.svgReset">{{wm.t.svgReset}}</button>
          <button class="nodrag" @click="extent" :title="wm.h.svgExtent">{{wm.t.svgExtent}}</button>
          <button class="nodrag" @click="defaults" :title="wm.h.svgDefaults">{{wm.t.svgDefaults}}</button>
          </div>
        <div class="sliders">
          <span v-for="set,idx in settings" :key="idx">
            {{set.lang?.title}}: {{state.setting[set.tag]}}
            <input type="range"
              :min="set.min" :max="set.max" :step="set.step" v-model="state.setting[set.tag]"
              class="slider nodrag" :title="set.lang?.help" @input="e=>$emit('input',e,state)">
            </input>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Com = require('./common.js')
const Bus = require('./bus.js')
const vector = require('./vector.js')
const Icons = require('./icons.js')
const Interact = require('interactjs')
const Canvas = 500

import svNode from './svnode.vue'
import svEdge from './svedge.vue'

export default {
  name: 'wylib-svgraph',
  components: {'wylib-svnode': svNode, 'wylib-svedge': svEdge},
  props: {
    state:		{type: Object, default: null},
    edge:		{type: Function, default: null},
    env:		{type: Object, default: Com.envTpt},
    menu:		{type: Array, default: null},
  },
  data() { return {
    toolX:		0,
    toolY:		0,
    bus:		new Bus.eventBus(this),
    stateTpt:		{minX:-Canvas, minY:-Canvas, maxX:Canvas, maxY: Canvas, nodes: {}, setting: {}},
  }},
  
  computed: {
    wm() {return this.env.wm},
    pr() {return this.env.pr},
    settings() { return [
      {tag: 'curve', min:1, max:4, step: 0.1, lang: this.wm.svgCurve}
    ].concat(this.menu)},
    edgeCurve() {
      let sets = this.state.setting
      if (!sets.curve) sets.curve = 2
      return sets.curve
    },
    viewCoords() {			//Viewport of SVG space
//console.log('Re-render')
      return [this.state.minX, this.state.minY, this.state.maxX-this.state.minX, this.state.maxY-this.state.minY].join(' ')
    },
    border() {				//Outline the normal drawing area
      return `M ${this.state.minX} ${this.state.minY} H ${this.state.maxX} V ${this.state.maxY} H ${this.state.minX} V ${this.state.minY}`
    },
    crossHair() {			//Outline the normal drawing area
      return `M -10,0 H 10 M 0,-10 V 10`
    },
//    boundBox() {return {
//      x:this.state.minX, y:this.state.minY, width:this.state.maxX-this.state.minX, height:this.state.maxY-this.state.minY
//    }},
    toolStyle() {return {
      transform:	'translate(' + this.toolX + 'px, ' + this.toolY + 'px)',
    }},
  },
  
  methods: {
    iconSvg(icon) {return Icons(icon)},
    dragHandler(event, state) {		//Called when dragging nodes
//console.log("Move handler", this.state.minX, this.state.maxX, this.$el.getBoundingClientRect().width, ratio)
      let ratio = (this.state.maxX - this.state.minX) / this.$el.getBoundingClientRect().width	//Scale moves by the current scale of the svg
      state.x += (event.dx * ratio)
      state.y += (event.dy * ratio)
      this.$emit('drag', event, state)
    },
    dropHandler(event, state) {
      this.$emit('drop', event, state)
    },

    defaults(ev) {
//console.log("Setting defaults:", this.settings)
      this.settings.forEach(set => {
//console.log(" set:", set)
        this.state.setting[set.tag] = set.default
      })
      this.$emit('input', ev, this.state)
    },

    extent(ev) {
//console.log("Zoom extent:", this.state)
      let nodes = this.state.nodes
        , minX = Number.MAX_VALUE, minY = minX, maxX = -Number.MAX_VALUE, maxY = maxX
      for (let tag in nodes) {
        let node = nodes[tag]
          , space = node.radius * 2
          , nodeMinX = node.x - space,	nodeMaxX = node.x + space
          , nodeMinY = node.y - space,	nodeMaxY = node.y + space
//console.log("  node:", node)
        if (nodeMinX < minX) minX = nodeMinX
        if (nodeMaxX > maxX) maxX = nodeMaxX
        if (nodeMinY < minY) minY = nodeMinY
        if (nodeMaxY > maxY) maxY = nodeMaxY
      }
//console.log(" extent:", minX, minY, maxX, maxY)
      Object.assign(this.state, {minX, minY, maxX, maxY})
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
      st.maxY += delta / yRat * v2 / hei
    },
  },

  beforeMount: function() {
    Com.stateCheck(this)
    if (this.state.maxX == null) Object.assign(this.state, this.stateTpt)	//Recover from garbage in stored state
//console.log("SVGraph beforeMount:", this.state, this.state.setting)
    this.menu.forEach(m => {
      if (m.tag && !(m.tag in this.state.setting))
        this.state.setting[m.tag] = m.default
//        this.$set(this.state.setting, m.tag, m.default)
    })
  },

  mounted: function() {
    Interact(this.$refs.tools).draggable({
      onmove: (event) => {this.toolX += event.dx; this.toolY += event.dy},
      ignoreFrom: '.nodrag'
    })
  },
}
</script>

<style lang="less">
  .wylib-svgraph {
    touch-action: none;
  }
  .wylib-svgraph .graph {
    height: 85%;
    width: 98%;
//    border: 1px solid red;
  }
  .wylib-svgraph .tools {
    position: absolute;
    right: 10px;
  }
  .wylib-svgraph button {
    width: 100%;
    padding: 4px;
    background: #bbddff;
    display: block;
    border: 1px solid black;
  }
  .wylib-svgraph .sliders input {
    display: block;
  }
  .wylib-svgraph .menu {
    position:absolute;
    right: .25em;
    top: .25em;
//    z-index: 1;
  }
  .wylib-svgraph .menu .icon {
    height: 1em;
    width: 1em;
  }
  .wylib-svgraph .toolbox {
    display: none;
    border: 1px solid blue;
    border-radius: 4px;
    padding: 4px;
    transition: all 500ms ease-in-out;
  }
  .menu:hover + .toolbox {
//    background: red;
    display: block;
  }
  .wylib-svgraph .toolbox:hover {
    opacity: 0.85;
    background: white;
    display: block;
  }
  .wylib-svgraph .graph {
    position: absolute;
  }
</style>
