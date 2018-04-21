// webpack.config.js
// Build bundles for the pages in the test folder
var path = require('path');
                
module.exports = {
  mode: 'development',
  entry: {
    logic: './test/logic.js',
    doc:  './test/doc.js',
    mlb:  './test/mlb.js',
    win:  './test/win.js',
    calc: './test/calc.js',
    wysegi: './test/wysegi.js'
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name]-bundle.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
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
  },
  devServer: {
       port: 3300,
       host: '0.0.0.0',	disableHostCheck: true,	//To browse from different host on lan
       hot: true, hotOnly: true,
       contentBase: 'test',			//Serve files out of test dir
   }
}
