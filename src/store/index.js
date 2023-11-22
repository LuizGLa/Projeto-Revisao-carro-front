// src/store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    },
  },
  actions: {
    login({ commit }, token) {
      commit("setToken", token);
      sessionStorage.setItem("token", token);
    },
    logout({ commit }) {
      commit("clearToken");
      sessionStorage.removeItem("token");
    },
  },
  getters: {
    isAuthenticated: (state) => state.token !== null,
  },
});
