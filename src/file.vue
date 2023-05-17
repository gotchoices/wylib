//Menu for importing/exporting a file to a data editing widget
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Pass in a prop containing the file data
//- Capture the emit(done) to update the file data
//- Can import file
//- Can export file
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
    env:	{type: Object, default: Com.envTpt},
    handle:	null
  },
//  data() { return {
//    stateTpt:	{grid: {columns: []}},
//  }},
//  inject: ['top'],

  computed: {
//    id() {return 'file_' + this._uid + '_'},
    wm() {return this.env.wm},
    pr() {return this.env.pr},
  },

  methods: {
    importFile(ev) {
console.log("File import: ", ev)
      Com.fileReader(ev.target, 1500, (fileData) => {
console.log("File data:", typeof fileData, fileData)
        this.$emit('done', fileData)
      })
    },

    exportFile() {
console.log("File export: ", data)
      let blob = new Blob([data], {type: "text/plain;charset=utf-8"})
        , fileName = 'download.dat'
      FileSaver.saveAs(blob, fileName)		//File saved as a browser download
    },
  },

//  mounted: function() {
//console.log('File mounted:', this.id, 'st:', this.state)
//  },

}
</script>

//<style lang='less'>
//  .wylib-file {
//    border: 1px solid blue;
//    height: 100%;
//  }
//</style>
