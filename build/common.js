const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
  resolve: {
    alias: {
      vue: '@vue/runtime-dom'
    },
//    mainFields: ['main', 'module'],	prefer CJS over ESM
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-classes',],
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {	//inform vue about x-r custom element in strdoc.vue
            isCustomElement: tag => tag.startsWith('x-')
          }
        }
      },
      {
        test: /\.(less|css)$/,
        use: [ 'style-loader', 'css-loader', 'less-loader' ],
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
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
