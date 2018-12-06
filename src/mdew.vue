//Multiple data field editing widget
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Can layout multiple dews in a grid
//X- Start with a single column of value
//- Can get rid of ref= now?
//- 
//- Later:
//- Can do 2D array with: 
//-   Columnspans
//-   Piggybacks
//-   Derived values
//- 

<template>
  <div class="wylib wylib-mdew">
    <table class="wylib-mdew-nodrag">
      <colgroup><col class="titles"/></colgroup>
      <tr v-for="f in state.fields" :key="f.field" :title="f.lang ? f.lang.help : null">
        <td class="label">
          {{ f.lang ? f.lang.title : null }}:
        </td>
        <td>
          <wylib-dew :top="top" :ref="'dew~'+f.field" :field="f.field" :state="f.styles" :value="data[f.field]" :values="f.values" :lang="f.lang" @input="input" @submit="submit" :bus="dewBus"/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Com from './common.js'
import Bus from './bus.js'
import Dew from './dew.vue'
import InDate from './indate.vue'

export default {
  name: 'wylib-mdew',
  components: {'wylib-dew': Dew, 'wylib-indate': InDate},
  props: {
    state:	{type: Object, default: () => ({})},
    data:	{type: Object, default: () => ({})},
    top:	null,
    bus:	null,
    height:	{type: Number, default: 300},		//Fixme: used?
    },

  data() { return {
    valid:	null,
    dirtys:	{},
    userData:	{},
    dewBus:	new Bus.messageBus(this),
  }},

  computed: {
    id: function() {return 'mdew_' + this._uid + '_'},
    dirty: function() {
      return Object.values(this.dirtys).every(v=>(v))
    },
  },
  
  methods: {
    submit(ev) {this.$emit('submit')},
    input(value, field, dirty, valid) {			//An input has been changed
      this.$set(this.dirtys, field, dirty)
      this.valid = valid
      this.userData[field] = value
//console.log("Mdew input:", field, value, dirty, valid, this.dirty)
      this.$emit('input', value, field, this.dirty, valid)
    },
  },

  beforeMount: function() {
    Com.react(this, {fields: []})
    if (this.bus) this.bus.register(this.id, (msg, data) => {
      return this.dewBus.notify(msg, data)		//Pass down to children
    })
//console.log("Mdew before:", this.id, this.state, this.data)
  },
//  mounted: function() {
//  }
}
</script>

<style>
  .wylib-mdew table {
    border-collapse: collapse;
    width: 100%;
//    border: 1px solid blue;
  }
  .wylib-mdew table .label {
    text-align: right;
  }
  .wylib-mdew table .titles {
    width: 10%;
  }
  .wylib-mdew table tr:nth-child(even) .label {
    background: #f0f0f0
  }
  .wylib-mdew td {
    border: 1px solid #e8e8e8;
    white-space: nowrap;
  }
</style>
