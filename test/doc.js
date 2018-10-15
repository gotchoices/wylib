//Document preview
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
import Vue from 'vue'
Vue.config.productionTip = false
import WylibWin from '../src/win.vue'
import WylibSVG from '../src/svg.vue'

const Template = `
  <div>
    <h4>Preview:</h4>
    <button @click="openDoc" title="Open a preview tab/window">Open Doc</button>
    <button @click="modifyDoc" title="Modify the document contents">Modify Doc</button>
    <button @click="openVector" title="Open a preview tab/window">Open Vector</button>
    <hr>
  </div>`

const Config = {
  components: {'wylib-svg': WylibSVG},
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
