/**
 * Created by guojian on 16/12/14.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as actions from './actions'
import * as getters from './getters'
import Common from './modules/common.js'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
Vue.config.debug = debug;

const store = new Vuex.Store({
  getters,
  actions,
  modules: {
    Common
  },
  strict: false,
  plugins: debug ? [createLogger()] : []
});

export default store