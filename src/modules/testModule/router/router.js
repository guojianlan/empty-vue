/**
 * Created by chenxiaojun on 16/10/12.
 */

let initRouters = [
  //首页
  {
    path: '/index',
    component: function (resolve) {
      require(['../views/index.vue'], resolve)
    },
    name: 'index'
  },
];
var langs = ['zh', 'en'];

function registerRoute(initRouters) {
  let routersArr = [];
  langs.forEach((lang) => {
    initRouters.forEach((item) => {
      var cotyItem = Object.assign({}, item);
      // cotyItem.path = `/${lang}` + cotyItem.path;
      cotyItem.name = `${lang}` + cotyItem.name;
      routersArr.push(cotyItem);
    })
  })
  return routersArr;
}
var defaultPath = '/zh'
let routers = registerRoute(initRouters);
console.log(routers);
export default routers