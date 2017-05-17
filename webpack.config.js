const path = require("path")
const SRC_PATH = path.resolve(__dirname, './src')
const DIST_PATH = path.resolve(__dirname, './dist')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: path.resolve(SRC_PATH + '/webpackExport.js'),
  output: {
    library: 'ripple',
    path: DIST_PATH,
    filename: 'ripple.js'
  },
  module: {
    rules: [
        {
          test: /\.js$/,
          include: [SRC_PATH],
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            plugins: ['transform-object-assign'],
            presets: ['es2015']
          },
        }, {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: {
                minimize: true,
                importLoaders: 1
              }
            }, 'postcss-loader'],
          })
        }
    ]
  },
  plugins: [
    new ExtractTextPlugin('ripple.css'),
    new webpack.optimize.UglifyJsPlugin()
  ],
  // devtool: 'source-map',
}
