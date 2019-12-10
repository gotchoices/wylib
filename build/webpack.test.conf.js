// webpack.config.js
// Build bundles for the pages in the test folder
var path = require('path')
const Common = require('./common')
                
module.exports = {
  mode: 'development',
  entry: {
    logic: './test/logic.js',
    doc:  './test/doc.js',
    mlb:  './test/mlb.js',
    win:  './test/win.js',
    calc: './test/calc.js',
    icon: './test/icon.js'
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name]-bundle.js'
  },
  resolve: Common.resolve,
  plugins: Common.plugins,
  module: Common.module,
  devServer: {
       port: 3300,
       host: '0.0.0.0',	disableHostCheck: true,	//To browse from different host on lan
       hot: true, hotOnly: true,
       watchContentBase: true,
       contentBase: 'test',			//Serve files out of test dir
   }
}
