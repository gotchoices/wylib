//Browse/modify wyseman registered users
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
import Vue from 'vue'
<template>
  <div style="width: 100%; height: 100%; resize: both; overflow: auto; padding: 0 4px 4px 0;">
  </div>
</template>

<script>
export default {
  components: {},
  data() { return {
    state:	{windows: [{posted: true, client: {dbView: 'wm.ent_v', loaded: true}}]},
  }},
  methods: {
    lang: function(win,idx) { return {
      title:	win.client.dbView + ':' + idx, 
      help:	'Preview listing of view: ' + win.client.dbView
    }},
//    addWin(row, pkey, keyVals) {
//console.log("Add Window", row, pkey, keyVals)
//      let i, view = keyVals.slice(0,2).join('.')
//      for (i = 0; this.state.windows[i]; i++) {}
//      if (i <= 0) view = 'wm.table_pub'
//      let newWin = {posted: true, client: {dbView: view, loaded: true}}
//      this.state.windows.splice(i, 0, newWin)
//console.log(" windows:", this.state.windows)
//      this.$forceUpdate()
//    },
//    close(idx) {
//      this.state.windows[idx] = null
//      this.$forceUpdate()
//    },
  },
}
</script>
