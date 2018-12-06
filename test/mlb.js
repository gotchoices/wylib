//Test #3
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
import Vue from 'vue'
Vue.config.productionTip = false
import WylibMlb from '../src/mlb.vue'
import WylibStretch from '../src/stretch.vue'
//import jQuery from 'jquery'	//Doesn't actually put jQuery in the global space (Use: https://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack)

const Template = `
  <div>
    <h4><a name="Mlb">Mlb:</a></h4>
    <div id="anMlb" style="height: 200px; border: 1px solid blue;">
      <wylib-mlb ref="anMlb" label="List of Stuff" :columns="gridColumns" :data="gridData" :height="height"/>
<!--      <wylib-mlb ref="anMlb" label="List of Stuff"/> -->
      <button @click="height -= 5">Smaller</button>
      <button @click="height += 5">Bigger</button>
    </div>

    <h4><a name="Mlb">A Mlb with lots of data:</a></h4>
    <div id="aBigMlb" style="border: 1px solid red;">
      <wylib-stretch style="border: 1px solid grey;" @drag='(w, h) => {bigHeight = h}'>
        <wylib-mlb ref="anMlb" label="List of Stuff" :columns="bigGridColumns" :data="bigGridData" :height="bigHeight"/>
      </wylib-stretch>
      <br>
      <button @click="test3">Regenerate</button>
      <button @click="test4">Test 4</button>
    </div>

    <h4><a name="End">End:</a></h4>
  </div>`

const Config = {
  data() { return {
    searchQuery: '',
    height: 150,
    bigHeight: 300,
    gridColumns: [
      {label: 'ID',	field: 'id',		title: "A unique identification number", just:'right' },
      {label: 'Name',	field: 'std_name',	title: "The person's identity" },
      {label: 'Rating',	field: 'rating',	title: "How good they are",	just: 'right'},
      {label: 'State',	field: 'state',		title: "Where they were born" }
    ],
    gridData: [
      { id: 1, std_name: 'Chuck Jones',		rating: 100, state: 'AL' },
      { id: 2, std_name: 'Friz Freleng',	rating: 200, state: 'MS' },
      { id: 3, std_name: 'Robert McKimson',	rating: 300, state: 'NY' },
      { id: 4, std_name: 'Mel Blanc',		rating: 800, state: 'CT' },
      { id: 5, std_name: 'June Foray',		rating: 500, state: 'WA' },
      { id: 6, std_name: 'Stan Freberg',	rating: 400, state: 'CA' },
      { id: 7, std_name: 'Hal Smith',		rating: 250, state: 'WY' },
      { id: 8, std_name: 'Mack David',		rating: 350, state: 'NV' },
      { id: 9, std_name: 'Jerry Livingston',	rating: 450, state: 'NC' }
    ],
    bigGridColumns: [{label: 'A', field: 'a'}, {label: 'B', field: 'b'}],
    bigGridData: [{a: 'hi', b: 'ho'}, {a: 'hey', b: 'hum'}]
  }},
  methods: {
    test1(event) {
console.log("Test 1:" + event)
    },
    test2(event) {
console.log("Test 2:" + event)
    },
    test3(event) {
console.log("Re-generating data")
      this.makeBigData()
    },
    test4(event) {
console.log("Test 4:" + event)
    },
    makeBigData() {
      var cols = 20
      var rows = 1000
      var newData = []
      var newCols = []
      function randomInt(min,max) {return Math.floor(Math.random() * Math.floor(max - min) + min);}
      for (let c = 0; c < cols; c++) {
        var field = 'index'
        if (c > 0) field = Math.random().toString(36).substring(2,randomInt(6,15))
        newCols[c] = {label: field[0].toUpperCase() + field.substring(1), field}
        for (let r = 0; r < rows; r++) {
          var val = r.toString()
          if (c > 0) val = Math.random().toString(36).substring(2,randomInt(4,18))
          if (!newData[r]) newData[r] = {}
          newData[r][field] = val
        }
      }
      this.bigGridColumns = newCols
      this.bigGridData = newData
    }
  },
  created: function() {
    this.makeBigData()
  },
  components: {
    'wylib-mlb': WylibMlb,
    'wylib-stretch': WylibStretch
  }
}

new Vue(Object.assign({el: '#app', template: Template}, Config))
