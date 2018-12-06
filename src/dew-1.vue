//Database record editing component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Pass in a configuration object at any time to rebuild the widget
//X- Select has an object describing the choices
//X- Harvest the value, how?
//- Implement date/time selector
//- Implement calculator selector
//- Implement integer spinners
//- Check contents against validator regexp
//- Background changes from red, yellow, white on validator
//- Emit event when data changed
//- Check all dew types from old wylib
//- Code multi-line text entry (textarea)
//- 
<template>
  <div class="wylib wylib-dew" :title="title">
    <div class="wylib-dew-label" ref="labelDiv" :style="{ width: labelWidth + 'px' }">
      <label ref="label" :for="_uid">{{label}}:</label>
      <Sizer class="wylib-dew-sizer" type="horiz" @grab="grabHand" @drag="dragHand" @drop="dropHand"/>
    </div>
    <input  ref="input" v-if="type == 'ent'" :id="_uid" class="wylib wylib-dew-data" type="text"     v-model="dataValue" :autofocus="focus"/>
    <input  ref="input" v-if="type == 'chk'" :id="_uid" class="wylib wylib-dew-data" type="checkbox" v-model="dataValue" :autofocus="focus"/>
    <select ref="input" v-if="type == 'pdm'" :id="_uid" class="wylib wylib-dew-data" type="select"   v-model="dataValue" :autofocus="focus">
      <option v-for="opt in options" :label="opt.label" :value="opt.tag" :title="opt.title"/>
    </select>
  </div>
</template>

<script>
import Sizer from './Sizer.vue'

export default {
  name: 'wylib-dew',
  components: { Sizer },
  props: {
    type: {type: String,	default: 'ent'},
    label: {type: String},
    title: {type: String},
    width: {type: Number,	default: 80},
    focus: {type: Boolean,	default: false},
    value: {},
    options: {}
  },
  data() { return {
    dataValue: this.value || '',
    grabWidth: null,
    labelWidth: this.width || 80,
  }},
  methods: {
    grabHand() {
      this.grabWidth = this.$refs.labelDiv.offsetWidth
//console.log("Grab: ", this.grabWidth)
    },
    dragHand(delta) {
      this.labelWidth = this.grabWidth + delta
      this.$emit('resize', this.labelWidth)
//console.log("Resize: " + delta)
    },
    dropHand() {
      this.$emit('drop', this.labelWidth)
//console.log("Drop: " + this.labelWidth)
    },
    ref(reference) {
//console.log("Hello from Dew ref:" + reference)
      return this.$refs[reference]
    },
    prefs() {			//Return preference settings
      return { width: this.width }
    }
  },
  watch: {
    width: function() {this.labelWidth = this.width},
    value: function() {this.dataValue = this.value},
    dataValue: function() {
//console.log("Dew dataValue changed:" + this.dataValue)
      this.$emit('input', this.dataValue)
    }
  },
//  mounted: function() {
//    if (this.width) this.titleWidth = this.width
//    if (this.default) this.dataValue = this.default
//  }
}
</script>

<style>
  .wylib-dew {
    padding: 1px 7px 1px 1px;
    position: relative;
    display: table;
//border: 1px solid black;
  }
  .wylib-dew-label {
    text-align: right;
    display: table-cell;
    position: relative;
    left: 0px;
    padding: 0px 0px 0px 4px;
//border: 1px solid red;
  }
  .wylib-dew-label label {
    position: relative;
    right: 3px;
//background-color: lightgrey;
  }
  .wylib-dew-sizer {
    position: absolute;
    right: 0px;
    top: 0px;
    min-height: 100%;
    width: 3px;
//background-color: red;
  }
  .wylib-dew-data {
    width: 100%;
    display: table-cell;
//border: 1px solid blue;
  }
</style>
