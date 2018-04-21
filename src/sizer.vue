//Pane resizing divider button
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
<template>
  <div class="wylib wylib-sizer" title="Drag to resize" draggable="true" v-on:dragstart="grab" v-on:drag="drag" v-on:dragend="drop">&nbsp
  </div>
</template>

<script>
export default {
  data() { return {
    startPos: 0
  }},
  methods: {
    grab(ev) {
      this.startPos = (this.type[0].toUpperCase() == 'H' ? ev.clientX : ev.clientY);
      this.$emit('grab')
//console.log("Grab: " + this.startPos)
    },
    drag(ev) {
      let curr = (this.type[0].toUpperCase() == 'H' ? ev.clientX : ev.clientY)
      let delta = curr - this.startPos
//console.log("Drag: " + delta + " Curr: " + curr + " Delta: " + delta)
      if (curr) this.$emit('drag', curr - this.startPos)
    },
    drop(ev) {
      this.$emit('drop')
//console.log("Drop: ")
    }
  },
  props: ['type']
}
</script>

<style scoped>
  .wylib-sizer {
    cursor: col-resize;
    padding: 0px;
    margin: 0px;
//background-color: #f8f8f8;
  }
</style>
