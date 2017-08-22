import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import 'utils/cropper.js';
import VueRouter from 'vue-router'
import router from './router/index.js'
import store from './vuex/store'
import VuexRouterSync from 'vuex-router-sync'
import httpPromise from './httpPlug/index.js'
import i18n from './i18n/index.js'
import handleDom from 'wind-dom/src/index'
import Clickoutside from 'utils/clickoutside'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import storage from '../../utils/storage.js'
import vUtil from './vendor/util.js'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
	preLoad: 1.3,
	attempt: 1
})
window.handleDom = Vue.prototype.handleDom = handleDom;
window.storage = Vue.prototype.storage = storage
require('./vendor/jquery-query.js')
Vue.use(i18n);
VuexRouterSync.sync(store, router);
Vue.use(httpPromise, router);
Vue.use(VueAwesomeSwiper)
Vue.directive('Clickoutside', Clickoutside);
Vue.prototype.rawhtml = function rawhtml(val) {
	return val.replace(/(^\r\n$)|(\n)/g, '<br/>').replace(/([\s\t])/g, '&nbsp;')
}
window.vUtil = vUtil;
new Vue({
	store,
	router,
	el: '#app',
	template: '<App/>',
	components: {
		App
	},
	data() {
		return {
			imageRoot: IMAGEROOT, //获取图片路径
		}
	},
	created() {
		console.log('第一次进来')
		var lang = window.location.pathname.split('/')[1] || 'zh'
		this.setI18n('zh');
	}
})