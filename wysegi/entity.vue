//Browse/modify wyseman registered users
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
import Vue from 'vue'
<template>
  <div style="width: 100%; height: 100%; resize: both; overflow: auto; padding: 0 4px 4px 0;">
    <div class="subwindows">
      <wylib-win v-for="win,idx in state.windows" topLevel=true :key="idx" :state="win" @close="close(idx)">
        <wylib-dbp :state="win.client"/>
      </wylib-win>
    </div>
  </div>
</template>

<script>
import WylibWin from '../src/win.vue'
import WylibDbp from '../src/dbp.vue'

export default {
  components: {'wylib-win': WylibWin, 'wylib-dbp': WylibDbp},
  props: {
    state:	{type: Object, default: ()=>({})}
  },
}
</script>
