var path = require('path')
var config = require('../config')
var utils = require('./utils')
var glob = require('glob');
var projectRoot = path.resolve(__dirname, '../')
var moduleName = process.argv[2];

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config[config.moduleName]['dev'].cssSourceMap)
var cssSourceMapProd = (env === 'production' && config[config.moduleName]['build'].productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd
var enrtys = getEntry(path.join(__dirname, '../src/modules/' + config.moduleName + 'Module/*.js'))
var htmlPath = getEntry(path.join(__dirname, '../src/modules/' + config.moduleName + 'Module/*.html'))
module.exports = {
  htmlPath: htmlPath,
  entry: enrtys,
  output: {
    path: config[moduleName]['build'].assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config[config.moduleName]['build'].assetsPublicPath : config[config.moduleName]['dev'].assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'api$': path.resolve(__dirname, '../src/modules/' + config.moduleName + 'Module' + '/api/index.js'),
      'src': path.resolve(__dirname, '../src'),
      'commomcomponents': path.resolve(__dirname, '../src/commomcomponent'),
      'modules': path.resolve(__dirname, '../src/modules'),
      'module': path.resolve(__dirname, '../src/modules/' + config.moduleName + 'Module'),
      'vendor': path.resolve(__dirname, '../src/vendor'),
      'packages': path.resolve(__dirname, '../src/packages'),
      'utils': path.resolve(__dirname, '../src/utils')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [{
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: useCssSourceMap
    }),
    postcss: [
      require('autoprefixer')()
    ]
  }
}

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    //pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    entries[basename] = entry;
  });
  return entries;
}
