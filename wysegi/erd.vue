//Display an interactive Entity Relation Diagram
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
//- 

<template>
  <div style="width: 100%; height: 100%; resize: both; overflow: auto; padding: 0 4px 4px 0;">
    <button @click="sort">Sort</button>
    <wylib-vector :state="state"/>
  </div>
</template>

<script>
import WylibVector from '../src/vector.vue'

export default {
  components: {'wylib-vector': WylibVector},
  data() { return {
    state:	{sprites: []},
  }},
  methods: {
    sort() {
console.log("Sort")
    },
    table(name,columns) {
      let style = 'stroke="black" stroke-width="1" fill="pink"'
//      return `<circle r="40" ${style}/>`
      return `<rect rx="4" ry="4" width="20" height="40" ${style}/>`
    },
  },
  beforeMount: function() {
    let obj
    obj = {x: 100, y: 30, code: this.table('Fred', ['Col 1', 'Col 2', 'Col 3', 'Col 4'])}
    this.state.sprites.push(obj)

    obj = {x: 10, y: 30, code: this.table('Joe', ['Col A', 'Col B', 'Col C', 'Col D'])}
    this.state.sprites.push(obj)
  },
}

</script>
