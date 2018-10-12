//Document preview
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
import Vue from 'vue'
Vue.config.productionTip = false
import WylibWin from '../src/win.vue'
import WylibVector from '../src/vector.vue'

const Template = `
  <div>
    <h4>Preview:</h4>
    <button @click="openDoc" title="Open a preview tab/window">Open Doc</button>
    <button @click="modifyDoc" title="Modify the document contents">Modify Doc</button>
    <button @click="openVector" title="Open a preview tab/window">Open Vector</button>
    <hr>
  </div>`

const Config = {
  components: {'wylib-vector': WylibVector},
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
    openVector() {
console.log("Open vector:")
    },
  },
  created: function() {
  },
}

new Vue(Object.assign({el: '#app', template: Template}, Config))
