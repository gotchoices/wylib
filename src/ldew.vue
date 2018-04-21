//A scrollable list of data editing fields
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Pack into remaining height, after label
//- Separate way to update data
//- Separate way to update configuration
//- Track clean/dirty flag for whole ldew
//- Test: can stretch sizer?
//- Snap align label widths
//- 
//        v-bind:autofocus="dew.tag == 'name'"
<template>
  <div class="wylib wylib-ldew" :title="title">
    <div class="wylib-ldew-header">
      <div class="wylib-ldew-label">{{label}}</div>
    </div>
    <Stretch class="wylib-ldew-dews">
      <wylib-dew class="wylib-ldew-dews-dew" v-for="dew in dews" :key="dew.tag" :ref="dew.tag" 
        :focus="dew.tag == focus"
        :width="dewWidths" :type="dew.type" :label="dew.label" :title="dew.title" 
      	:value="dataValues[dew.tag]" @input="inputHand(dew.tag, $event)" 
      	@drop="dewDrop"/>
    </Stretch>
  </div>
</template>

<script>
import Stretch from './stretch.vue'
import WylibDew from './dew.vue'

export default {
  name: 'wylib-ldew',
  components: { Stretch, 'wylib-dew': WylibDew },
  props: {
    value: {type: Object},
    label: {type: String},
    title: {type: String},
    focus: {type: String},
    dews: {type: Array}
  },
  data() { return {
    dataValues: this.value,
    dataClean: true,
    dewWidths: 80,
  }},
  methods: {
    prefs(prefConfig) {
    },
    inputHand(tag, val) {
      this.dataValues[tag] = val
      this.$emit('input', this.dataValues)
//console.log("Ldew input changed:" + tag + " Val:" + val + " Obj:" + JSON.stringify(this.dataValues))
    },
    dewDrop(wid) {
//console.log("dewDrop:" + wid)
      this.dewWidths = wid;
    },
    ref(reference) {
//console.log("Hello from Ldew ref:" + reference)
//console.log(" ref keys:" + Object.keys(this.$refs))
      return this.$refs[reference]['0']	//Not sure why I need to index into an array here
    }
  },
//  watch: {
//    dataValues: function () {
//console.log("Ldew data changed: " + JSON.stringify(this.dataValues))
//    }
//  },
//  mounted: function() {
//    this.$nextTick( function () {    
//console.log("Ldew mounted: " + JSON.stringify(this.dews))
//    })
//  },
}
</script>

<style>
  .wylib-ldew {
  }
  .wylib-ldew-header {
  }
  .wylib-ldew-label {
    padding: 0px 0px 0px 2px;
    background-color: #eeeeee;
  }
  .wylib-ldew-dews {
    min-width: 100%;
    border: 1px solid #eeeeee;
  }
/*  .wylib-ldew-dews-dew {
    min-width: 96%;		/* Should add a sizer for the data field?
  } */
</style>
