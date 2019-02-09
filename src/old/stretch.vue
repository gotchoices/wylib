//A stretchable container
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
<template>
  <div class="wylib wylib-stretch" ref="container">
    <div class="wylib-stretch-right" :style="rightStyle" draggable="true" v-on:dragstart="grabHand" v-on:drag="dragHand" v-on:dragend="dropHand"/>
    <div class="wylib-stretch-bottom" :style="bottomStyle" draggable="true" v-on:dragstart="grabHand" v-on:drag="dragHand" v-on:dragend="dropHand"/>
    <div class="wylib-stretch-corner" :style="cornerStyle" draggable="true" v-on:dragstart="grabHand" v-on:drag="dragHand" v-on:dragend="dropHand"/>
    <div class="wylib-stretch-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {type: Number, default: 4},
    right: {type: Boolean, default: true},
    bottom: {type: Boolean, default: true},
  },
  data() { return {
    grabWidth: null,
    grabHeight: null,
    grabX: null,
    grabY: null,
  }},
  computed: {
    rightStyle: function(){ return { "min-width": this.width + "px" }},
    bottomStyle: function(){ return { "min-height": this.width + "px" }},
    cornerStyle: function(){ return { "min-width": this.width + "px", "min-height": this.width + "px"}},
  },
  methods: {
    grabHand(ev) {
      this.grabX = ev.clientX;			//Cursor position when we grab the handle
      this.grabY = ev.clientY;
      this.grabWidth = this.$refs.container.offsetWidth	//Window size when we grab
      this.grabHeight = this.$refs.container.offsetHeight
//      this.grabWidth = ev.target.parentElement.offsetWidth	//Window size when we grab
//      this.grabHeight = ev.target.parentElement.offsetHeight
      this.$emit('grab')
//      console.log("Drag Start; w=" + this.grabWidth + " h=" + this.grabHeight)
    },
    dragHand(ev) {
      var x = ev.clientX, y = ev.clientY;
      if (x == 0 && y == 0) return			//Can be zero on last event of drag

// console.log("Drag ev.id:" + ev.target.id)
      let deltaX = ev.target.id == 'bottom' ? 0 : x - this.grabX
      let deltaY = ev.target.id == 'right' ? 0 : y - this.grabY
      let newWidth = this.grabWidth + deltaX
      let newHeight = this.grabHeight + deltaY
// console.log("Drag; deltaX=" + deltaX + " New=" + newWidth)
// console.log("Drag; deltaY=" + deltaY + " New=" + newHeight)
      if (deltaX) this.$refs.container.style.width = newWidth + 'px';
      if (deltaY) this.$refs.container.style.height = newHeight + 'px';
      this.$emit('drag', newWidth, newHeight)
    },
    dropHand(ev) {
      this.$emit('drop')
//      console.log("Drop: ")
    },
    prefs(prefConfig) {		//Set or return preferences
      if (prefConfig) {
      } else {
        return {
        }
      }
    }
  },
//  mounted: function() {
//    this.$nextTick( function () {    
//console.log("Stretch mounted: ")
//    })
//  }
}
</script>

<style>
  .wylib-stretch {
    position: relative;
    padding: 0px;
    margin: 0px;
    height: 100%;
    width: 100%;
//background-color: #e0ffe0;
  }
  .wylib-stretch-content {
    overflow-x: auto;
    overflow-y: auto;
    white-space: nowrap;
    height: 100%;
/* border: 1px solid green; */
  }
  .wylib-stretch-right {
    position: absolute;
    right: 0px;
    cursor: ew-resize;
    min-height: 100%;
background-color: red;
  }
  .wylib-stretch-bottom {
    position: absolute;
    bottom: 0px;
    cursor: ns-resize;
    min-width: 100%;
background-color: blue;
  }
  .wylib-stretch-corner {
    position: absolute;
    bottom: 0px;
    right: 0px;
    cursor: nwse-resize;
//background-color: yellow;
  }
</style>
