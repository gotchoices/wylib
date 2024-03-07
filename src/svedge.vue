//An SVG connector line between nodes, to be used inside svgraph.vue
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
<template>
  <path class="wylib-svedge"
    :marker-end="markEnd" :marker-start="markStart"
    :d="pathData" :stroke="state.color" stroke-width="state.stroke" fill="none"
  />
</template>

<script>
const Com = require('./common.js')
const Vector = require('./vector.js')
const Color = 'blue'

export default {
  name: 'wylib-svedge',
  props: {
    bus:	null,
    query:	{type: Function, default: null},
    state:	{type: Object, default: () => ({})},
    curve:	0
  },
  data() { return {
    stateTpt:	{
      id: null,
      color: Color, 
      stroke: 1, 
      source: {tag: null, end: null, aim: null},
      target: {tag: null, end: null, aim: null}
    },
  }},
  computed: {
    markEnd() {
      return `url(${this.state.markEnd || '#marker-arrow'})`
    },
    markStart() {
      this.state.markStart ? `url(${this.state.markStart})` : null
    },
    pathData() {
      let src = this.state.source, tgt = this.state.target
        , aims = src.aim && tgt.aim
        , p1 = `M${src.end.x ?? 0}, ${src.end.y ?? 0}`
        , p2 = aims ? ` C${src.aim.x},${src.aim.y}` : ''
        , p3 = aims ? ` ${tgt.aim.x},${tgt.aim.y}` : ''
        , p4 = ` ${tgt.end.x}, ${tgt.end.y}`		//;console.log("pD:", src, tgt, p1, p2, p3, p4)
      return p1 + p2 + p3 + p4
    },
  },

  methods: {
    closest(base, ends, point) {	//Find closest vertex from a list of relative endpoints, to an absolute point
      let x = 0				//Base(state) and point contain absolute coordinates
        , y = 0				//ends are relative to base
        , lenMin = Number.MAX_SAFE_INTEGER	//console.log("Closest:", base, ends, point)
      ends.forEach(e => {
        let len = Math.sqrt(
          Math.pow(base.x + e.x - point.x,2) + Math.pow(base.y + e.y - point.y,2)
        )
        if (len < lenMin) {			//if smallest distance yet, remember it
          x = e.x
          y = e.y
          lenMin = len
        }
      })
      return {x, y}					//Return closest point, relative to base
    },

    request(thisSide, otherSide, defPoint) {		//Request end point(s) from connecting node
//console.log("Edge req T:", thisSide, "O:", otherSide, "D:", defPoint)
      let result, aimOff, endOff
      if (this.query) {					//If app-defined endpoint query provided
        result = this.query(thisSide, otherSide, this.state)	//Ask the application
      } else {
        thisSide.end = defPoint
      }
//console.log("  result:", defPoint, result)
      if (!result) {					//No endpoints found
        return

      } else if (Array.isArray(result)) {		//Multiple points to choose from
        endOff = this.closest(defPoint, result, otherSide.end)

      } else if (('end' in result)) {			//App gives end and aim point
        endOff = result.end
        aimOff = result.aim

      } else {						//Assume it is a relative endpoint object
        endOff = result
      }
//console.log(" end:", endOff)
      thisSide.end = Vector.add(defPoint, endOff)	//Calculate absolute end point
      if (this.curve && !aimOff) {			//Auto curve point addition enabled
        if ('r' in endOff && 'a' in endOff) {		//end is in radial coordinates
          aimOff = {r: endOff.r * this.curve, a:endOff.a}
        } else if ('x' in endOff && 'y' in endOff) {	//rectangular
          aimOff = {x:endOff.x * this.curve, y:endOff.y * this.curve}
        }
//console.log(" aim:", aimOff)
        thisSide.aim = Vector.add(defPoint, aimOff)	//Absolute curve point
      }
//console.log(" thisSide:", thisSide)
    },
  },

  created: function() {
    let { id, source, target } = this.state
//console.log("Edge created:", this.state)

    if (this.bus) {			//Listen for updates to our end nodes' positions
      this.bus.register(id, source.tag, (pos) => {
        this.request(source, target, pos)
      })
      this.bus.register(id, target.tag, (pos) => {
        this.request(target, source, pos)
      })
    }
  },

  beforeMount: function() {
//console.log("Edge beforeMount:", this.state)
    Com.stateCheck(this)
    if (!this.state.source.end)		//Make default endpoints if they don't exist
      this.state.source.end = {x:0, y:0}
    if (!this.state.target.end)
      this.state.target.end = {x:0, y:0}
  },

//  mounted: function() {
//console.log("Edge Mount:", this.state)
}
</script>
