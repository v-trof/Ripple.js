const path = require("path")
const SRC_PATH = path.resolve(__dirname, './src')
const DIST_PATH = path.resolve(__dirname, './dist')
const webpack = require('webpack')

module.exports = {
  entry: path.resolve(SRC_PATH + '/api.js'),
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
        }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ],
  devtool: 'source-map',
}
