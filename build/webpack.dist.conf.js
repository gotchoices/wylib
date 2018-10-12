// webpack.config.js
const path = require('path');
const nodeExternals = require('webpack-node-externals')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
                
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'wylib.js',
    libraryTarget: 'umd',
//    library: 'wylib',
  },
  externals: [nodeExternals()],
//  externals: [
//    'vue',
//    'slickgrid-es6', 'jquery',
//    'interactjs',
//    'mathjs',
//    'element-resize-detector',
//    'flatpickr', 'vue-flatpickr'
//  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  devtool: 'source-map',
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'vue-loader' }
      },
      {
        test: /\.(less|css)$/,
        use: [ 'style-loader', 'css-loader', 'less-loader' ],
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: [ 'file-loader' ],
      },
      {
        test: /.*\.svg$/i,
        use: [ 'file-loader?name=[path][name].[ext]&context=./lib' ],
      }
    ]
  }
}
