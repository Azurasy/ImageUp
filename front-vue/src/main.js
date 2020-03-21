import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import config from "../app.config";

Vue.config.productionTip = false;

config.install = function() {
  Object.defineProperty(Vue.prototype, "$appconfig", {
    get() {
      return config;
    }
  });
};

Vue.use(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
