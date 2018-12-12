// webpack.config.js
const path = require('path');
const Common = require('./common')
                
module.exports = {
  entry: './wysegi/wysegi.js',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'wysegi-bundle.js',
//    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  resolve: Common.resolve,
  plugins: Common.plugins,
  module: Common.module
}
