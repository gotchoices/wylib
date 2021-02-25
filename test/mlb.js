//Test #3
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
import Vue from 'vue'
Vue.config.productionTip = false
import WylibMlb from '../src/mlb.vue'
const { Grid } = require('slickgrid-es6')
import './slick.grid.css'

const Template = `
  <div>
    <h4><a name="Mlb">Mlb:</a></h4>
    <div style="height: 150px; border: 1px solid blue;">
      <wylib-mlb label="List of Stuff" :state="state.m1" :config=gridConf :data="gridData"/>
<!--      <button @click="height -= 5">Smaller</button>
      <button @click="height += 5">Bigger</button> -->
    </div>

    <h4><a name="Big Mlb">A Mlb with lots of data:</a></h4>
    <div style="border: 1px solid red;">
      <wylib-mlb label="List of Stuff" :state="state.m2" :config="bigGridConf" :data="bigGridData"/>
      <br>
      <button @click="test3">Regenerate</button>
      <button @click="test4">Test 4</button>
    </div>
    
    <h4><a name="Slick">Native slickgrid:</a></h4>
    <div ref="slick" style="border: 1px solid yellow; height: 200px;">
    </div>

  </div>`

const Config = {
  data() { return {
    state:      {type: Object, default: () => ({m1: {}, m2: {}})},
    searchQuery: '',
    height: 150,
    bigHeight: 300,
    gridConf: {
      id: {field: 'id', title: 'ID', help: "A unique identification number", just:'right' },
      name: {field: 'name', width: 200, title: 'Name', help: "The person's identity" },
      rating: {field: 'rating', title: 'Rating', help: "How good they are", just: 'right'},
      state: {field: 'state', title: 'State', help: "Where they were born" }
    },
    gridData: [
      { id: 1, name: 'Chuck Jones',	rating: 100, state: 'AL' },
      { id: 2, name: 'Friz Freleng',	rating: 200, state: 'MS' },
      { id: 3, name: 'Robert McKimson',	rating: 300, state: 'NY' },
      { id: 4, name: 'Mel Blanc',	rating: 800, state: 'CT' },
      { id: 5, name: 'June Foray',	rating: 500, state: 'WA' },
      { id: 6, name: 'Stan Freberg',	rating: 400, state: 'CA' },
      { id: 7, name: 'Hal Smith',	rating: 250, state: 'WY' },
      { id: 8, name: 'Mack David',	rating: 350, state: 'NV' },
      { id: 9, name: 'Jerry Livingston',rating: 450, state: 'NC' }
    ],
    bigGridConf: {
      a: {field: 'a', title: 'A', order: 1},
      b: {field: 'b', title: 'B', order: 2}
    },
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
      var newConf = {}
      function randomInt(min,max) {
        return Math.floor(Math.random() * Math.floor(max - min) + min);
      }
      for (let c = 0; c < cols; c++) {
        var field = 'index'
        if (c > 0) field = Math.random().toString(36).substring(2,randomInt(6,15))
        newConf[field] = {title: field[0].toUpperCase() + field.substring(1), field}
        for (let r = 0; r < rows; r++) {
          var val = r.toString()
          if (c > 0) val = Math.random().toString(36).substring(2,randomInt(4,18))
          if (!newData[r]) newData[r] = {}
          newData[r][field] = val
        }
      }
      this.bigGridConf = newConf
      this.bigGridData = newData
    }
  },

  created: function() {
    this.makeBigData()
  },
    
  mounted: function() {
    let options = {
      enableCellNavigation: true,
      enableColumnReorder: false
    }
    let columns = [
      {id: "title", name: "Title", field: "title"},
      {id: "duration", name: "Duration", field: "duration"},
      {id: "%", name: "% Complete", field: "percentComplete"},
      {id: "start", name: "Start", field: "start"},
      {id: "finish", name: "Finish", field: "finish"},
      {id: "effort-driven", name: "Effort Driven", field: "effortDriven"}
    ];
    let data = []

    for (var i = 0; i < 100; i++) {
      data[i] = {
        title: "Task " + i,
        duration: "5 days",
        percentComplete: Math.round(Math.random() * 100),
        start: "01/01/2009",
        finish: "01/05/2009",
        effortDriven: (i % 5 == 0)
      };
    }
console.log("Cont:", this.$refs.slick, columns, data)
    let slick = new Grid(this.$refs.slick, data, columns, options)
    slick.init()
  },
  components: {
    'wylib-mlb': WylibMlb,
  }
}

new Vue(Object.assign({el: '#app', template: Template}, Config))
