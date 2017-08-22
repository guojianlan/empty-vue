// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var moduleName = process.argv[2]
var prod = process.env.NODE_ENV
module.exports = {
  moduleName: moduleName,
  test: {
    build: {
      env: require('./prod.env'),
      index: path.resolve(__dirname, '../dist/static/' + moduleName + '/index.html'),
      assetsRoot: path.resolve(__dirname, '../dist/'),
      assetsSubDirectory: 'static/' + moduleName,
      assetsSubStaticDirectory: 'static/' + moduleName,
      assetsPublicPath: '/',
      productionSourceMap: false,
      // Gzip off by default as many popular static hosts such as
      // Surge or Netlify already gzip all static assets for you.
      // Before setting to `true`, make sure to:
      // npm install --save-dev compression-webpack-plugin
      productionGzip: false,
      otherJs:[],
      otherCss: [],
      productionGzipExtensions: ['js', 'css'],
      definePlugin: {
        'process.env': require('./prod.env'),
        'resourceVersion': JSON.stringify(+new Date()),
        'RESOURCE': JSON.stringify('/static/' + moduleName + '/resource/i18n'),
        'IMAGEROOT': JSON.stringify('xxx')
      }
    },
    dev: {
      env: require('./dev.env'),
      port: 8884,
      assetsSubDirectory: 'static/cv',
      assetsPublicPath: '/',
      proxyTable: {},
      otherJs: [],
      otherCss: [],
      // CSS Sourcemaps off by default because relative paths are "buggy"
      // with this option, according to the CSS-Loader README
      // (https://github.com/webpack/css-loader#sourcemaps)
      // In our experience, they generally work as expected,
      // just be aware of this issue when enabling this option.
      cssSourceMap: false,
      definePlugin: {
        'process.env': require('./dev.env'),
        'resourceVersion': JSON.stringify(+new Date()),
        'RESOURCE': JSON.stringify('/resource/i18n'),
        'IMAGEROOT': JSON.stringify('/~images~/')
      }
    }
  }
}
