// webpack.config.js

const path = require('path');
const nodeExternals = require('webpack-node-externals')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const Common = require('./common')
                
const webpackConfig = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'wylib-bundle.js',
    libraryTarget: 'umd',
  },
  externals: [nodeExternals(), {vue: 'Vue'}],
  devtool: 'source-map',
  resolve: Common.resolve,
  plugins: Common.plugins,
  module: Common.module
}

if (process.env.ANALYZE)
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerHost: '0.0.0.0',	//export ANALYZE=true and then
    analyzerPort: 8881		//browse here to see webpack contents
  }))
  
module.exports = webpackConfig
