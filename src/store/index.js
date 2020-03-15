import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: ""
  },
  mutations: {
    setTheme(state, val) {
      state.theme = val;
    }
  },
  actions: {
    setTheme(context, val) {
      context.commit("setTheme", val);
    }
  },
  getters: {
    theme: state => {
      return state.theme;
    }
  },
  modules: {}
});
