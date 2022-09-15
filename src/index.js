//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------

module.exports = {
  Application:	require('./app.vue').default,
  Common:	require('./common.js'),
  DataView:	require('./dbp.vue').default,
  DataEdit:	require('./dbe.vue').default,
  Dialog:	require('./dialog.vue').default,
  MultiView:	require('./mlb.vue').default,
  MultiEdit:	require('./mdew.vue').default,
  Launcher:	require('./launch.vue').default,
  SvGraph1:	require('./svgraph1.vue').default,
  SvGraph:	require('./svgraph.vue').default,
  StructDoc:	require('./strdoc.vue').default,
  Window:	require('./win.vue').default,
  Popup:	require('./pop.vue').default,
  Report:	require('./report.vue').default,
  Wyseman:	require('./wyseman.js')
}
