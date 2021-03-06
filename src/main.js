import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import './assets/css/global.css'

import axios from 'axios'

axios.defaults.baseURL = '/api'

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// router.beforeEach((to, from, next) =>{
//   if (window.sessionStorage.data) {
//     console.log(window.sessionStorage);
//       next();
//   }
//   else {
//     if (to.path === '/login') {
//       next();
//     } 
//     else {
//       next({ path: '/login' });
//     }
//   }
// })