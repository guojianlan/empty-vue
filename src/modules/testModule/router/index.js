/**
 * Created by chenxiaojun on 16/10/12.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    routes
});

export default router