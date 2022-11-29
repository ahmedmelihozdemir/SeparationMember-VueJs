import { createStore } from "vuex";

export default createStore({
  state: {
    countGroup: 0,
    members: [],
    groups: [],
    categories: [],
  },
  getters: {
    getCountGroup: (state) => {
      return state.countGroup;
    },
    getMembers: (state) => {
      return state.members;
    },
    getGroups: (state) => {
      return state.groups;
    },
  },
  mutations: {
    incrementGroup(state) {
      state.countGroup++;
    },
  },
  actions: {
    incrementGroup({ commit }) {
      commit("incrementGroup");
    },
  },
  modules: {},
});
