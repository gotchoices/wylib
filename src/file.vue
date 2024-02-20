//Menu for importing/exporting a file to a data editing widget
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Capture the emit(done) to update the file data
//X- Can import file
//X- Can export file
//X- How to get passed the file mime format for export function
//X- Get mime type from calling widget, can pass up to mdew/dbe to set format?
//X-   (similar to a zip lookup also populating city, state)
//- 
<template>
  <div class="wylib wylib-file">
    <button @click="exportFile">
      {{wm.t.fileExport}}
    </button>
    <div class="label" :title="wm.h.fileImport">
      {{wm.t.fileImport}}:<input type="file" @input="importFile"/>
    </div>
  </div>
</template>

<script>
const Com = require('./common.js')
const FileSaver = require('file-saver')

export default {
  name: 'wylib-file',
  props: {
//    state:	{type: Object, default: () => ({})},
    data:	null,
    env:	{type: Object, default: Com.envTpt},
    handle:	null
  },
//  data() { return {
//    stateTpt:	{grid: {columns: []}},
//  }},
//  inject: ['top'],

  computed: {
    wm() {return this.env.wm},
    pr() {return this.env.pr},
  },

  methods: {
    importFile(ev) {
//console.log("File import: ", ev, this.handle)
      for (let i = 0, f; f = ev?.target?.files[i]; i++) {
        let reader = new FileReader()
        reader.onload = () => {
          let fileData = new Uint8Array(reader.result)
            , extra = {mime: f.type}				//;console.log("Mime:", f.type)
          if (this.handle) this.handle(fileData, extra)
          this.$emit('done', fileData, extra)
        }
        reader.readAsArrayBuffer(f)
      }
//    setTimeout(()=>{target.value = null}, 1500)
    },

    exportFile() {				//console.log("File export")
      let blob = new Blob([this.data], {type: "text/plain;charset=utf-8"})
        , fileName = 'download.dat'
      FileSaver.saveAs(blob, fileName)		//File saved as a browser download
    },
  },

//  mounted: function() {
//console.log('File mounted:', this.state)
//  },

}
</script>

//<style lang='less'>
//  .wylib-file {
//    border: 1px solid blue;
//    height: 100%;
//  }
//</style>
