//Document preview
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
import Vue from 'vue'
Vue.config.productionTip = false
import WylibDew from '../src/dew.vue'
//import WylibView from '../src/preview.js'

const Template = `
  <div>
    <h4>Preview:</h4>
    <button @click="open" title="Open a preview tab/window">Open</button>
    <button @click="modify" title="Modify the document contents">Modify</button>
    <hr>
  </div>`

const Config = {
  components: {'wylib-dew': WylibDew},
  data() { return {
    abc:	null,
  }},
  methods: {
    open() {
console.log("Open preview:")
    },
    modify() {
console.log("Modify data:")
    },
  },
  created: function() {
  },
}

new Vue(Object.assign({el: '#app', template: Template}, Config))
