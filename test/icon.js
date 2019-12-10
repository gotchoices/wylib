//Test #3
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
import Vue from 'vue'
Vue.config.productionTip = false
import Icons from '../src/icons.js'

const Template = `
  <div>
    <div>
      <svg class="icon" :style="testStyle" v-html="iconGuts"></svg>
    </div>
    <hr>
    <div v-for="ic in icons" style="display: inline" :title="'Icon:' + ic">
      <svg class="icon" :style="iconStyle" v-html="icon(ic)"></svg>
    </div>
  </div>`

const Config = {
//  components: {'wylib-calc': Calc, 'wylib-trans': Trans,}
//  data() { return {
//    var1: '',
//  }},
  computed: {
    icons() {return Icons()},
    iconStyle() {return {
      stroke:	'#202020',
      fill:	'#606060',
      width:	'64px',
      height:	'64px',
      border:	'1px solid blue',
    }},
    testStyle() {return {
      stroke:	'#200000',
      fill:	'#000060',
      width:	'320px',
      height:	'320px',
      border:	'1px solid green',
    }},
    iconGuts() {return `
      <svg viewBox="0 0 32 32">
        <path d="M 14 16  C 14 13 8 14 8 10  C 8 2 24 2 24 10  C 24 14 18 13 18 16  C 18 19 24 18 24 22  C 24 30 8 30 8 22  C 8 18 14 19 14 16" fill="none" stroke-width="2.5"/>
        <path d="M 13.75 1 V 31 M 18.25 1 V 31" stroke-width="1.75" stroke-linecap="round">
      </svg>
    `}
  },
  methods: {
    icon(ic) {
      return Icons(ic)
    },
    test1(event) {
console.log("Test 1:" + event)
    },
    test2(event) {
console.log("Test 2:" + event)
    }
  },
}

new Vue(Object.assign({el: '#app', template: Template}, Config))

//        <path d="M 10 29 L 16 19 L 22 29 M 13 9 L 16 14 L 19 9 Z" stroke-width="1"/>
//        <path d="M 6 4 L 26 4 M 6 28 L 26 28" stroke-width="3" stroke-linecap="round"/>
//        <path d="M 7 4 L 14 16 L 7 28  M 25 4 L 18 16 L 25 28" stroke-width="2" fill="none"/>
//        <path d="M 14 1 V 4 M 18 1 V 4 M 14 31 V 28 M 18 31 V 28" stroke-width="2" stroke-linecap="round"/>
