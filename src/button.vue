//Reactive button
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
<template>
  <div class="wylib wylib-button button" :style="buttonStyle" v-on:mouseenter="mouseEnter" v-on:mouseleave="mouseLeave" v-on:mousedown="mouseDown" v-on:mouseup="mouseUp" v-on:click="click">
    <svg class="icon" :style="iconStyle" v-html='iconSvg'></svg>
  </div>
</template>

<script>
const Icons = require('./icons.js')

export default {
  name: 'wylib-button',
  props: {
    icon:		String,
    color:		String,
    hoverColor:		String,
    activeColor:	String,
    fill:		String,
    stroke:		String,
    toggled:		Boolean,
    disabled:		{type: Boolean, default: false},
    size:		{type: Number, default: 20},
  },
  data() { return {
    pr:		require('./prefs'),
    isHover:	false,
    isActive:	false,
  }},
  methods: {
    mouseEnter: function(ev) {if (this.disabled) return; this.isHover = true;	this.$emit('mouseenter',ev)},
    mouseLeave: function(ev) {if (this.disabled) return; this.isHover = false;	this.$emit('mouseenter',ev)},
    mouseDown:	function(ev) {if (this.disabled) return; this.isActive = true;	this.$emit('mousedown',ev)},
    mouseUp:	function(ev) {if (this.disabled) return; this.isActive = false;	this.$emit('mouseup',ev)},
    click:	function(ev) {if (this.disabled) return; this.$emit('click', ev)},
  },
  computed: {
    iconSvg: function () {return Icons(this.icon)},
    iconStyle: function () {return {
      fill:	this.disabled ? this.pr.butDisabledColor : (this.fill || this.pr.butIconfill),
      stroke:	this.disabled ? this.pr.butDisabledColor : (this.stroke || this.pr.butIconStroke),
    }},
    buttonStyle: function () {return {
      width:  (this.size || this.pr.butSize) + 'px',
      height: (this.size || this.pr.butSize) + 'px',
      padding: parseInt(this.size / 10) + 'px',
      backgroundColor: this.backgroundColor
    }},
    backgroundColor: function () {
      if (this.disabled)
        return this.pr.butDisabledBackground
      else if (this.isActive)
        return this.activeColor || this.pr.butActiveColor
      else if (this.isHover)
        return this.hoverColor || this.pr.butHoverColor
      else if (this.toggled)
        return this.toggledColor || this.pr.butToggledColor
      return this.color || this.pr.butBackground
    },
  }
}
</script>

<style lang='less'>
  .wylib-button {
    display: inline-block;
    border-width: 1px;
    border-radius: 4px;
    margin: 0 1px 0 1px;
//    border: 1px solid green;
  }
  .wylib-button .icon {
    display: block;
    height: 100%;
    width: 100%;
//    border: 1px solid black;
  }
</style>
