import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { BASE_URL } from "@/assets/urls/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    loginSuccess(state, payload) {
      state.user = payload;
    },
    registerSuccess(state, payload) {
      state.user = payload;
    },
    getToken(state, payload) {
      state.token = payload;
    },
    auth_success(state, token, user) {
      state.token = token;
      state.user = user;
    },
    logout(state) {
      state.token = "";
      state.user = "";
    },
  },
  getters: {
    firstName: (state) => {
      return state.user.firstName;
    },
    userProfile: (state) => {
      return state.user;
    },
    userToken: (state) => {
      return state.token;
    },
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${BASE_URL}auth/login`,
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.data.token;
            const user = resp.data.data.user;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            commit("loginSuccess", user);
            resolve(resp);
          })
          .catch((err) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${BASE_URL}auth/register`,
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.data.token;
            const user = resp.data.data.user;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            commit("registerSuccess", user);
            resolve(resp);
          })
          .catch((err) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
  modules: {},
});
