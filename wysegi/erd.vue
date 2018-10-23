//Display an interactive Entity Relation Diagram
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Read actual tables from database
//- Graph displays tables
//- Graph displays FK links
//- Algorithm for spreading/optimizing layout
//- 

<template>
  <div style="width: 100%; height: 100%; resize: both; overflow: auto; padding: 0 4px 4px 0;">
    <button @click="sort">Sort</button>
    <wylib-svg :state="state"/>
  </div>
</template>

<script>
import WylibSVG from '../src/svg.vue'
import Wyseman from '../src/wyseman.js'

export default {
  components: {'wylib-svg': WylibSVG},
  data() { return {
    state:	{width: 1200, height: 800, nodes: []},
    tabGap:	40,
    fontSize:	16,
    debits:	9,
    credits:	3,
  }},
  methods: {
    sort() {
      this.state.height = 2400
console.log("Sorting")
    },
    bubbles() {
console.log("Circle sizing")
      this.debits += 1; if (this.debits > 10) this.debits = 2;
      this.credits -= 1; if (this.credits < 2) this.credits = 10;
      Array.from(this.$el.getElementsByClassName("debits")).forEach(el => {
        el.style.r = this.debits
      })
      Array.from(this.$el.getElementsByClassName("credits")).forEach(el => {
        el.style.r = this.credits
      })
    },
    table(name, columns) {		//Generate SVG code or a table
      let text = `<text x="2" y="${this.fontSize}" style="font:normal ${this.fontSize}px sans-serif;">${name}`
      let max = name.length
      columns.forEach((col,idx) => {
        text += `<tspan x="6" y="${this.fontSize * (idx+2) + 4}">${col}</tspan>`
        if (col.length > max) max = col.length
      })
      text += '</text>'
      let width = max * this.fontSize * 3/4
        , height = (columns.length + 1) * this.fontSize + 10
        , code = `
        <g stroke="black" stroke-width="1">
          <rect rx="4" ry="4" width="${width}" height="${height}" fill="#e0e0e0"/>
          <path d="M0,${this.fontSize+4} L${width},${this.fontSize+4}" stroke="black"/>
          ${text}
        </g>`
        , ends = [{x:width/2, y:0}, {x:width, y:height/2}, {x:width/2, y:height}, {x:0, y:height/2}]
//        , ends = [{x:0, y:this.fontSize * 1.5}, {x:width, y:this.fontSize * 1.5}]
//console.log("Ends:", ends)
      return {code, ends, width, height}
    },
  },
// Test with two fake tables:
//  beforeMount: function() {
//    let { code, ends } = this.table('Fred Table', ['Column 1', 'Column 2', 'Column 3'])
//      , obj = {tag:'fred', x: 10, y: 30, code, ends}
//    this.state.nodes.push(obj)
//
//    ;({ code, ends } = this.table('Joe Table', ['Column A', 'Column B', 'Column C', 'Column D', 'Column E']));
//    obj = {tag:'joe', x: 250, y: 100, code, ends, links:['fred']}
//    this.state.nodes.push(obj);
//  },
  beforeMount: function() {
    let spec = {
      view: 'wm.table_meta',
      fields: ['obj', 'columns'],
      where: {tab_kind: 'r', system: 'false'}
    }
    
    Wyseman.request('erd'+this._uid, 'select', spec, (data,err) => {
      let x = 10, y = 10, maxHeight = 1;
      data.forEach(dat => {
console.log("Dat:", dat)
        let { code, ends, width, height } = this.table(dat.obj, ['Column 1', 'Column 2', 'Column 3'])
          , obj = {tag:dat.obj, x, y, code, ends}
        this.state.nodes.push(obj)

        if (height > maxHeight) maxHeight = height
        x += (width + this.tabGap)
        if (x > (this.state.width - width)) {x = 10; y += (maxHeight + this.tabGap)}
      })
console.log("Height:", this.state.height, y + maxHeight)
      if (this.state.height < (y + maxHeight)) this.state.height = y + maxHeight
    })
  },
}

</script>
