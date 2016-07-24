'use strict';

const _ = require('lodash');
const config = require('./config.json');
const cssnext = require('postcss-cssnext');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const productionConfig = require('./default.config');

_.mergeWith(productionConfig, {
  devtool: false,
  output: {
    path: './public/assets',
    publicPath: '/assets/',
    filename: '[name]-[chunkhash].bundle.js',
    chunkFilename: '[id]-[chunkhash].bundle.js',
  },
  postcss() {
    return [cssnext()];
  },
}, (obj1, obj2) =>
  _.isArray(obj2) ? obj2.concat(obj1) : undefined
);

productionConfig.module.loaders.push(
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      notExtractLoader: 'style',
      loader: `css${config.cssModules}!postcss`,
    }),
  },
  {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract({
      notExtractLoader: 'style',
      loader: `css${config.cssModules}!postcss!less`,
    }),
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      notExtractLoader: 'style',
      loader: `css${config.cssModules}!postcss!sass`,
    }),
  }
);

productionConfig.plugins.push(
  // new webpack.optimize.CommonsChunkPlugin('common', 'common-[chunkhash].bundle.js'), // Code splitting
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': "'production'",
    __DEV__: false,
  }),
  new ExtractTextPlugin('[name]-[contenthash].css'),
  new ManifestPlugin({
    fileName: 'webpack-asset-manifest.json',
  }),
  new ChunkManifestPlugin({
    filename: 'webpack-common-manifest.json',
    manfiestVariable: 'webpackBundleManifest',
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    output: {
      comments: false,
    },
    sourceMap: false,
  }),
  new CompressionPlugin()
);

module.exports = productionConfig;
