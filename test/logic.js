//Test logic builder
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
import Vue from 'vue'
Vue.config.productionTip = false
import WylibLogList from '../src/loglist.vue'
import '../src/wylib.css'

const Template = `
  <div>
    <h4><a name="Logic">Logic Builder:</a></h4>
    <div>
      <button @click="addNew">+</button>
      <button @click="save">Save</button>
      <button @click="recall">Recall</button>
      <wylib-loglist :state="logicState" :config="logicConf" @add="addNew">
      </wylib-loglist>
    </div>

    <h4><a name="End">End:</a></h4>
  </div>`

const Config = {
  data() { return {
    abc: '1',
    logicState: {and: 'true', items: [
      {left: 'own', oper: 'equ', right: 'pig'},
      {and: 'false', items: [
        {left: 'nei', oper: 'neq', right: 'cow'},
        {left: 'pet', oper: 'neq', right: '_', entry: 'puppy'}
      ]}
    ]},
    logicConf: {
      left: [
        {tag: 'pet', title: 'Pet', help: 'Small fuzzy animal'},
        {tag: 'own', title: 'Owner', help: 'Big fuzzy animal'},
        {tag: 'nei', title: 'Neighbor', help: 'Angry fuzzy animal'}
      ],
      oper: [
        {tag: 'equ', title: 'Equal', help: 'Of the same value'},
        {tag: 'neq', title: 'Not Equal', help: 'Not of the same value'}
      ],
      right: [
        {tag: 'cow', title: 'Cow', help: 'Big tasty animal'},
        {tag: 'dog', title: 'Dog', help: 'Smaller friendly animal'},
        {tag: 'pig', title: 'Pig', help: 'Medium tasty animal'}
      ]
    },
  }},
  methods: {
    addNew(event) {
console.log("Adding Item:")
      let newItem = Object.assign({}, this.logicState.items.slice(-1)[0])
//      newItem.idx++
      this.logicState.items.push(newItem)
    },
    save(event) {
      localStorage.saveState = JSON.stringify(this.logicState)
console.log("Saving:", JSON.stringify(this.logicState))
    },
    recall() {
      let ss = localStorage.saveState
      if (ss != 'undefined') this.logicState = JSON.parse(ss)
console.log("Recalling:", this.logicState)
    }
  },
  mounted: function() {
//    this.recall()
  },
  components: {'wylib-loglist': WylibLogList,}
}

new Vue(Object.assign({el: '#app', template: Template}, Config))
