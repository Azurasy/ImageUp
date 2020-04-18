import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueCookies from 'vue-cookies';

Vue.config.productionTip = false;

Vue.use(VueCookies);

Vue.prototype.$http = axios;
const token = Vue.$cookies.get('token');

if (token) {
  Vue.prototype.$http.defaults.headers.common['x-access-token'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
