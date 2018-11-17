//import Application	from './app.vue'
//import DataView		from './dbp.vue'
//import DataEdit		from './dbe.vue'
//import MultiView	from './mlb.vue'
//import MultiEdit	from './mdew.vue'
//import Window		from './win.vue'
//import Wyseman		from './wyseman.js'
//
//module.exports = {
//  Application,
//  DataView,
//  DataEdit,
//  MultiView,
//  MultiEdit,
//  Window,
//  Wyseman
//}

module.exports = {
  Application:	require('./app.vue').default,
  Common:	require('./common.js'),
  DataView:	require('./dbp.vue').default,
  DataEdit:	require('./dbe.vue').default,
  MultiView:	require('./mlb.vue').default,
  MultiEdit:	require('./mdew.vue').default,
  SvGraph:	require('./svgraph.vue').default,
  Window:	require('./win.vue').default,
  Wyseman:	require('./wyseman.js')
}
