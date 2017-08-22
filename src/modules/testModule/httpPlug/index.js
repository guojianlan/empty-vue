import axios from 'axios';
import Vue from 'vue'
import qs from 'qs'
const install = function (Vue, router) {
	//需要对返回操作
	var httpPromise = axios.create();
	// httpPromise.defaults.timeout = 2500;
	httpPromise.interceptors.request.use(function (config) {
		if (!config.params) {
			config.params = {};
		}

		config.params['lang'] = Vue.prototype.$getLocale();
		config.params[SESSION_KEY] = (SESSION_VALUE == '' ? Cookies.get(SESSION_KEY) : SESSION_VALUE);
		config.params[TOKEN_KEY] = (TOKEN_VALUE == '' ? Cookies.get(TOKEN_KEY) : TOKEN_VALUE);
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		config.data = qs.stringify(config.data)
		return config
	}, function (error) {
		return Promise.reject(error);
	})
	httpPromise.interceptors.response.use(function (response) {
		// if (response && response.data.data) {
		// 	if ('head' in response.data.data) {
		// 		let head = response.data.data.head
		// 		console.dir(head)
		// 		vUtil.setHeader(head)
		// 	}
		// }
		if (response.data.code != 0 && response.data.code === +response.data.code) {
			console.log(40121);
			switch (response.data.code + '') {
				case '40121':
					console.log(Vue.prototype.$getLocale() + 'login');
					console.log(router);
					router.replace({
						name: Vue.prototype.$getLocale() + 'login'
					})
					break;
				default:
					router.replace({
						name: Vue.prototype.$getLocale() + 'login'
					})
					break;
			}
			return false;
		} else {
			return response.data
		}

	}, function (error) {
		return Promise.reject(error);
	})
	//不需要对返回操作
	var httpPromiseNoJump = axios.create();
	// httpPromise.defaults.timeout = 2500;
	httpPromiseNoJump.interceptors.request.use(function (config) {
		if (!config.params) {
			config.params = {};
		}
		config.params['lang'] = Vue.prototype.$getLocale();
		config.params[SESSION_KEY] = (SESSION_VALUE == '' ? Cookies.get(SESSION_KEY) : SESSION_VALUE);
		config.params[TOKEN_KEY] = (TOKEN_VALUE == '' ? Cookies.get(TOKEN_KEY) : TOKEN_VALUE);
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		config.data = qs.stringify(config.data)
		return config
	}, function (error) {
		return Promise.reject(error);
	})
	httpPromiseNoJump.interceptors.response.use(function (response) {
		return response.data
	}, function (error) {
		return Promise.reject(error);
	})
	Vue.prototype.$promiseNoJump = httpPromiseNoJump
	Vue.prototype.$promise = httpPromise
}
module.exports = {
	install
}