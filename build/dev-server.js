require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config[config.moduleName]['dev'].env.NODE_ENV)
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var https = require('https')
var os = require('os')
var opn = require('opn')
var fs = require('fs');
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var app = express()
var privateKey = fs.readFileSync(path.join(__dirname, 'private.pem'), 'utf8')
var certificate = fs.readFileSync(path.join(__dirname, 'file.crt'), 'utf8')
var credentials = {
  key: privateKey,
  cert: certificate
}
//上传
var multer = require('multer')
var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});
var upload = multer({
  storage: storage
});
app.post('/profile', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send({
    location: req.file.path
  });
})

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config[config.moduleName]['dev'].port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config[config.moduleName]['dev'].proxyTable


var compiler = webpack(webpackConfig)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)
app.use('/uploads', express.static('./uploads'))
// serve pure static assets
var staticPath = path.posix.join(config[config.moduleName]['dev'].assetsPublicPath, config[config.moduleName]['dev'].assetsSubDirectory)
// app.use(staticPath, express.static('./static'))
app.use('/~images~', express.static(path.join(__dirname, '../src/modules/' + config.moduleName + 'Module/images')))
app.use('/resource', express.static(path.join(__dirname, '../src/modules/' + config.moduleName + 'Module/resource')))
app.use('/static', express.static(path.join(__dirname, '../src/modules/' + config.moduleName + 'Module/static')))
var getIPAdress = function () {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return '127.0.0.1'
};
module.exports = https.createServer(credentials, app).listen(port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  var uri = `https://${getIPAdress()}:${port}`
  console.log('Listening at ' + uri + '\n')

  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
});
// module.exports = app.listen(port, (err) => {
//   if (err) return
//   opn(`http://${getIPAdress()}:${port}`)
//   console.log(getIPAdress());
// })