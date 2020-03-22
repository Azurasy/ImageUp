import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: "",
    reload: false
  },
  mutations: {
    setTheme(state, val) {
      state.theme = val;
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
