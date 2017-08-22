var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var env = config[config.moduleName]['build'].env
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config[config.moduleName]['build'].productionSourceMap, extract: true })
  },
  devtool: config[config.moduleName]['build'].productionSourceMap ? '#source-map' : false,
  output: {
    path: config[config.moduleName]['build'].assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config[config.moduleName]['build'].productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin(config[config.moduleName]['build'].definePlugin),
    new CopyWebpackPlugin([
      { 
        from: path.join(__dirname,'../src/modules/'+config.moduleName+'Module/resource/'),
        to: path.join(config[config.moduleName]['build'].assetsRoot,config[config.moduleName]['build'].assetsSubDirectory,'resource'),
        transform:function(content, path){
          return JSON.stringify(JSON.parse(content), null, 0).replace(/\/~images~\//g,config[config.moduleName]['build']['definePlugin']['IMAGEROOT'].replace(/\"/g,""));
        }
      }
    ]),
    new CopyWebpackPlugin([
      { 
        from: path.join(__dirname,'../src/modules/'+config.moduleName+'Module/images/'),
        to: path.join(config[config.moduleName]['build'].assetsRoot,config[config.moduleName]['build'].assetsSubDirectory,'images'),
      }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config[config.moduleName]['build'].index,
      template: baseWebpackConfig.htmlPath['index'],
      inject: true,
	    otherJs:config[config.moduleName]['build'].otherJs,
      otherCss:config[config.moduleName]['build'].otherCss,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})

if (config[config.moduleName]['build'].productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config[config.moduleName]['build'].productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
