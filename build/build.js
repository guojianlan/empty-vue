// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
var path = require('path')
var config = require('../config')
env.NODE_ENV = 'production'
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config[config.moduleName]['build'].assetsRoot, config[config.moduleName]['build'].assetsSubDirectory)
var assetsStaticPath = path.join(config[config.moduleName]['build'].assetsRoot, config[config.moduleName]['build'].assetsSubStaticDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', path.join(__dirname,'../src/modules/'+config.moduleName+'Module/static/*'), assetsStaticPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
