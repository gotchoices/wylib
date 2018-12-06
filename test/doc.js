//Document preview
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
import Vue from 'vue'
Vue.config.productionTip = false
import WylibWin from '../src/win.vue'
import WylibSVGraph from '../src/svgraph.vue'

const Template = `
  <div>
    <h4>Preview:</h4>
    <button @click="openDoc" title="Open a preview tab/window">Open Doc</button>
    <button @click="modifyDoc" title="Modify the document contents">Modify Doc</button>
    <button @click="openVector" title="Open a preview tab/window">Open Vector</button>
    <hr>
  </div>`

const Config = {
  components: {'wylib-svgraph': WylibSVGraph},
  data() { return {
    abc:	null,
  }},
  methods: {
    openDoc() {
console.log("Open preview:")
    },
    modifyDoc() {
console.log("Modify data:")
    },
    openSVG() {
console.log("Open svg:")
    },
  },
  created: function() {
  },
}

new Vue(Object.assign({el: '#app', template: Template}, Config))
