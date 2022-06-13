export default {
  namespaced: true,
  state: {
    quest: null
  },
  getters: {
    activeQuest: state => state.quest
  },
  mutations: {
    SET_ACTIVE_QUEST(state, value) {
      state.quest = value;
    }
  },
  actions: {
    setActiveQuest({ commit }, quest) {
      commit('SET_ACTIVE_QUEST', quest);
    }
  }
};
