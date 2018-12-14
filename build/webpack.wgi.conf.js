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
  performance: {
    maxAssetSize: 2000000,
    maxEntrypointSize: 1000000
  },
  devtool: 'source-map',
  resolve: Common.resolve,
  plugins: Common.plugins,
  module: Common.module
}
