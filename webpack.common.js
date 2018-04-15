const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

const cssDist = 'assets/css/';

const ExtractCSS = new ExtractTextPlugin(cssDist + '[name].css');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
     rules: [
       {
         test: /\.css$/,
         use: ExtractCSS.extract({fallback: 'style-loader', use: 'css-loader'}),
       },
     ]
   },
   plugins: [
     ExtractCSS
   ]
};
