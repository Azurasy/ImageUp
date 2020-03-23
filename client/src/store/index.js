import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";

Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vuex.Store({
  state: {
    theme: "light",
    reload: false
  },
  mutations: {
    setTheme(state, val) {
      state.theme = val;
      Vue.$cookies.set("theme", val);
    },
    setReload(state, val) {
      state.reload = val;
      console.log(`Reload: ${val}`);
    }
  },
  actions: {
    setTheme(context, val) {
      context.commit("setTheme", val);
    },
    setReload(context, val) {
      context.commit("setReload", val);
    }
  },
  getters: {
    theme: state => {
      return state.theme;
    },
    reload: state => {
      return state.reload;
    }
  },
  modules: {}
});
