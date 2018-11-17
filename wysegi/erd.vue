//Display an interactive Entity Relation Diagram
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Read actual tables from database
//X- Graph displays tables
//- Graph displays FK links
//- Algorithm for spreading/optimizing layout
//- 

<template>
  <div style="width: 100%; height: 100%; resize: both; overflow: auto; padding: 0 4px 4px 0;">
    <wylib-svgraph :state="state" ref="svg"/>
  </div>
</template>

<script>
import WylibSVGraph from '../src/svgraph.vue'
import Wyseman from '../src/wyseman.js'

export default {
  components: {'wylib-svgraph': WylibSVGraph},
  data() { return {
    state:	{width: 1200, height: 800, nodes: {}},
    tabGap:	40,
    fontSize:	16,
    debits:	9,
    credits:	3,
  }},
  methods: {
    table(name, columns) {		//Generate SVG code for a table
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
        , ends = [{x:width/2, y:0}, {x:width, y:height*0.25}, {x:width, y:height*0.5}, {x:width, y:height*0.75}, {x:width/2, y:height}, {x:0, y:height*0.75}, {x:0, y:height*0.5}, {x:0, y:height*0.25}]
//        , ends = [{x:0, y:this.fontSize * 1.5}, {x:width, y:this.fontSize * 1.5}]
//console.log("Ends:", ends)
      return {code, ends, width, height}
    },
  },
  beforeMount: function() {
    let spec = {
      view: 'wm.table_meta',
      fields: ['obj', 'columns', 'fkeys'],
      where: [['tab_kind', '=', 'r'], ['system', '=', 'false'], ['sch', '!=', 'wm']]
    }
    
    Wyseman.request('erd'+this._uid, 'select', spec, (data,err) => {
      let x = 10, y = 10, maxHeight = 1;
      if (data) data.forEach(dat => {
//console.log("Dat:", dat)
        let { code, ends, width, height } = this.table(dat.obj, dat.columns.map(el=>el.col))
//          , links = dat.fkeys ? dat.fkeys.map(m => m.table) : []	//Produces multiple links
          , links = []
          , radius = height / 4
        if (dat.fkeys) dat.fkeys.forEach(fkey=>{
          if (!links.includes(fkey.table) && fkey.table != dat.obj) links.push(fkey.table)
        })
        this.$set(this.state.nodes,dat.obj,{tag:dat.obj, x, y, width, height, code, ends, links, radius})	//So it will react to changes of state

        if (height > maxHeight) maxHeight = height
        x += (width + this.tabGap)
        if (x > (this.state.width - width)) {x = 10; y += (maxHeight + this.tabGap); maxHeight = 1}
      })
//console.log("Height:", this.state.height, y + maxHeight)
      if (this.state.height < (y + maxHeight)) this.state.height = y + maxHeight
    })
  },
}

</script>
