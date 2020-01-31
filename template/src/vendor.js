import _ from 'loadsh'
import axios from 'axios'
import Element from 'element-ui'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import Routes from './router/router'
import App from './App.vue'
import store from './store/store'

Vue.use(VueRouter)
Vue.prototype.$axios = axios

// const router = new VueRouter({
//     routes: Routes
//   })
//   /* eslint no-new: 0 */
//   new Vue({
//     router: router,
//     store,
//     el: '#app',
//     render: h => h(App)
//   })