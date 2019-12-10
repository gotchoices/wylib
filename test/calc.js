//Test #3
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
import Vue from 'vue'
Vue.config.productionTip = false
import Trans from '../src/trans.vue'
import Calc from '../src/calc.vue'

const Template = `
  <div>
    <h4><a name="Trans">Transaction:</a></h4>
      <wylib-trans style="border: 1px solid red; border-radius: 4px;"/>
    <hr>
    <h4><a name="Calc">Calc:</a></h4>
    <div style="height: 240px; width: 320px; border: 1px solid blue;">
      <wylib-calc/>
      <button @click="test1">Test 1</button>
      <button @click="test2">Test 2</button>
    </div>
    <h4><a name="End">End:</a></h4>
  </div>`

const Config = {
  data() { return {
    var1: '',
  }},
//  computed: {
//  },
  methods: {
    test1(event) {
console.log("Test 1:" + event)
    },
    test2(event) {
console.log("Test 2:" + event)
    }
  },
  components: {
    'wylib-calc': Calc,
    'wylib-trans': Trans,
  }
}

new Vue(Object.assign({el: '#app', template: Template}, Config))
