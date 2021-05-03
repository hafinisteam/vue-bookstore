import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { user: {} },
  mutations: {
    loginSuccess(state, payload) {
      state.user = payload;
    },
    registerSuccess(state, payload) {
      state.user = payload;
    },
  },
  getters: {
    firstName: (state) => {
      return state.user.firstName;
    },
  },
  actions: {},
  modules: {},
});
