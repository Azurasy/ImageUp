import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: "light"
  },
  mutations: {
    setTheme(state, name) {
      state.theme = name;
    }
  },
  actions: {
    setTheme(context, name) {
      context.commit("setTheme", name);
    }
  },
  getters: {
    theme: state => {
      return state.theme;
    }
  },
  modules: {}
});
