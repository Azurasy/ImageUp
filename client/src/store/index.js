import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";
import axios from "axios";

Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vuex.Store({
  state: {
    theme: "light",
    reload: false,
    status: "",
    token: Vue.$cookies.get("token") || "",
    user: {}
  },
  mutations: {
    setTheme(state, val) {
      state.theme = val;
      Vue.$cookies.set("theme", val);
    },
    setReload(state, val) {
      state.reload = val;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, data) {
      state.status = "success";
      state.token = data.token;
      state.user = data.user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    set_user(state, user) {
      state.user = user;
    },
    set_token(state, token) {
      state.token = token;
    }
  },
  actions: {
    setTheme(context, val) {
      context.commit("setTheme", val);
    },
    setReload(context, val) {
      context.commit("setReload", val);
    },
    login({ commit, dispatch }, body) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios
          .post(`/api/user/auth/login`, body, {
            headers: { "Content-Type": "application/json" }
          })
          .then(res => {
            if (res.data.error) {
              reject(res.data.error);
              return;
            }

            const token = res.data.token;
            const expires = res.data.expires;

            Vue.$cookies.set("token", token, expires);
            axios.defaults.headers.common["x-access-token"] = token;
            commit("set_token", token);

            dispatch("fetchUserData").then(() => resolve());
          })
          .catch(err => {
            commit("auth_error");
            Vue.$cookies.remove("token");
            reject(err);
          });
      });
    },
    signup({ commit, dispatch }, body) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios
          .post(`/api/user/auth/signup`, body, {
            headers: { "Content-Type": "application/json" }
          })
          .then(() => {
            dispatch("login", body).then(() => resolve());
          })
          .catch(err => {
            commit("auth_error");
            Vue.$cookies.remove("token");
            reject(err);
          });
      });
    },
    fetchUserData(context) {
      return new Promise((resolve, reject) => {
        if (context.getters.isLoggedIn) {
          axios
            .get("/api/user/tokendata")
            .then(res => {
              context.commit("set_user", res.data);
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        }
      }).catch(err => {
        console.log(err);
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        Vue.$cookies.remove("token");
        delete axios.defaults.headers.common["x-access-token"];
        resolve();
      }).catch(err => {
        console.log(err);
      });
    }
  },
  getters: {
    theme: state => state.theme,
    reload: state => state.reload,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user
  },
  modules: {}
});
