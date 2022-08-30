const path = require('path')
var webpack = require("webpack")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: path.resolve(__dirname, '../src/server.js'),
 output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath:'/'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()

  ]
}
