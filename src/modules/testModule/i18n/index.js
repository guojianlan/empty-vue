import Vutil from '../vendor/util.js'
import axios from 'axios'
const install = function (_Vue) {
  var i18nVue = new _Vue({
    data: {
      i18n: {},
      locale: ''
    }
  });
  let cache = {};
  //设置i18n
  _Vue.prototype.setI18n = function (locale, cb) {
    if (i18nVue.locale == locale) {
      if (cb) {
        cb();
      }
      return;
    }
    if (cache && cache[locale]) {
      i18nVue.$set(i18nVue, 'locale', locale)
      i18nVue.$set(i18nVue, 'i18n', cache[locale])
      if (cb) {
        cb();
      }
      return;
    }
    //远程获取
    i18nVue.$set(i18nVue, 'locale', locale)
    axios.get(`${RESOURCE}/${locale}.json?t=${resourceVersion}`).then(res => {
      cache[locale] = Vutil.flatten(res.data);
      i18nVue.$set(i18nVue, 'i18n', cache[locale])
      console.log(cache[locale]);
      if (cb) {
        cb();
      }

    }).catch(error => {
      console.log(error);
    })
  }
  //模板解释
  _Vue.prototype.$getLocale = function () {
    return i18nVue.locale;
    //return ''
  }
  _Vue.prototype.$t = function (str, replace) {
    if (i18nVue.i18n && i18nVue.i18n.hasOwnProperty(str)) {
      //是否需要替换
      if (!!replace) {
        return i18nVue.i18n[str].replace(/\{\w+\}/g, function (placeholder) {
          let key = placeholder.replace('{', '').replace('}', '');
          if (replace.hasOwnProperty(key)) {
            return replace[key];
          }
          return placeholder
        })
      }
      return i18nVue.i18n[str]
    }
    return '';
  }
}
module.exports = {
  install
}