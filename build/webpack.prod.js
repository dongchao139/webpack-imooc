const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].bundle.js",
  }
};

module.exports = merge(commonConfig, prodConfig);