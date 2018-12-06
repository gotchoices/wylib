//Logical expression item: left-hand-side, comparator, right-hand-side
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
<template>
  <div class="wylib wylib-logitem" draggable='true' v-on:dragover="zoneEnter" v-on:dragleave="zoneLeave" v-on:dragend="drop" :style="{background}">
    <wylib-button class="button lower" :size="12" icon="play3" @click="$emit('lower')" title="Move this item to a sub-grouping"/>
    <select class="left" v-model="state.left">
      <option v-for="opt in config.left" :value="opt.tag" :label="opt.title" :title="opt.help">{{opt.title}}</option>
    </select>
    <select class="operator" v-model="state.oper">
      <option v-for="opt in config.oper" :value="opt.tag" :label="opt.title" :title="opt.help">{{opt.title}}</option>
    </select>
    <select class="right" v-if="config.right" v-model="state.right" :class="{inactive: !state.right || state.right == ''}">
      <option value="" label="<Manual>" title="Enter a manual value"></option>
      <option v-for="opt in config.right" :value="opt.tag" :label="opt.title" :title="opt.help">{{opt.title}}</option>
    </select>
    <input v-model="state.entry" title="Specify an explicit right-hand value" :class="{inactive: state.right && state.right != ''}">
    </input>
    <wylib-button class="button close" :size="12" icon="close" @click="$emit('close')" title="Remove this item from the list"/>
  </div>
</template>

<script>
import WylibButton from './button.vue'
import Interact from 'interactjs'
var dragTarget = null		//Communicate with each other about drag/drop through this

export default {
  name: 'wylib-logitem',
  components: {'wylib-button': WylibButton},
  props: {
    state:	{type: Object, default: () => ({})},
    config:	Object,
    index:	Number,
  },
  data() { return {
    dragOver: false,
    pr: require('./prefs.js'),
  }},
  computed: {
    rhValue: function() {
      return (this.state.right == "_")
    },
    background: function() {
      return (this.dragOver ? this.pr.dragOverBackground : this.pr.titleBackground)
    }
  },
  methods: {
    prefs() {
      return {}
    },
    drop(ev) {						//Event for the one being dragged
      if (!dragTarget || dragTarget == this) return	//Aborted drag
//console.log("This (dragged):" + this.index, " State:" + JSON.stringify(this.state))
//console.log("Target:" + dragTarget.index + " State:" + JSON.stringify(dragTarget.state))
      dragTarget.$emit('insert', dragTarget.index, this.state)
      dragTarget.dragOver = false			//Clear target highlighting
      this.$forceUpdate()
      //this.$emit('close')	Can't use close because index can change as a result of the above insert
      let closeIndex = (dragTarget.$parent === this.$parent && this.index > dragTarget.index) ? this.index + 1 : this.index
//console.log("Delete:" + closeIndex)
      this.$parent.closeChild(closeIndex)
      dragTarget = null
    },
    zoneEnter(ev) {					//Events for the one being dragged over
      this.dragOver = true				//Illuminate me (the drag target)
      dragTarget = this					//And remember who I am
//console.log("Over item: " + JSON.stringify(this.state))
    },
    zoneLeave(ev) {
      if (ev.clientX == 0 && ev.clientY == 0) return	//Extra leave event fired at end of drag
      this.dragOver = false
      dragTarget = null
//console.log("Leave: " + JSON.stringify(this.state))
    },
  },
  watch: {
    state: function() {
//console.log("Watch state: ", JSON.stringify(this.state))
    }
  },
  updated: function() {
    this.$nextTick(() => {this.$emit('geometry', this)})
  },
  mounted: function() {
    this.$nextTick(() => {this.$emit('geometry', this)})
//console.log("LogItem state: ", JSON.stringify(this.state))
//console.log("       config: ", JSON.stringify(this.config))
  },
}
</script>

<style lang='less'>
  .wylib-logitem {
//border: 1px solid black;
    cursor: move;
    padding: 3px;
    border-radius: 4px;
    display: flex;
    align-items: center;
  }
  .wylib-logitem select {
    margin: 0 4px 0 4px;
//  flex: 0 0 auto;
// border: 1px solid #88ff88;
  }
  .wylib-logitem .right.inactive {
    max-width: 2em;
  }
  .wylib-logitem input.inactive {
    max-width: 0;
    visibility: hidden;
  }
  .wylib-logitem .button.close:hover {		//Fixme: prefs
    background: #ffcccc;
  }
  .wylib-logitem .button.lower:hover {		//Fixme: prefs
    background: #ccffcc;
  }
</style>
