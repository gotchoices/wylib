//Preview a document, served from http
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Why does chrome have blank header?
//- Make width, height dynamic with window size?
//- Convert to single state object?
//- How reload when document has been updated?
//- 
//- Later:
//- Can convert viewer into a separate browser window (is this helpful?)
//- 
<template>
<!--
    <iframe :src="source" :width="width" :height="height" :type="type"></iframe>
-->
    <object :data="source" style="width: 100%; height=auto;" :type="type"></object>
</template>

<script>

export default {
  name: 'wylib-doc',
  props: {
    source:	{type: String, default: 'http://lux1:3000/tmp.pdf'},
    type:	{type: String, default: 'application/pdf'},
    width:	{default: '100%'},
    height:	{default: '100%'},
  },
  data() { return {
    xyz:	{},
  }},
//  mounted: function() {
//  }
}
</script>
<style lang="less">
//  iframe {
//    border: 4px solid blue;
//  }
</style>
