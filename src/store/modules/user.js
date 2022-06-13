export default {
  namespaced: true,
  state: {
    userRole: localStorage.getItem('cq.role') || 'player',
    userId: localStorage.getItem('cq.uid') || ''
  },
  getters: {
    role: state => state.userRole,
    userUid: state => state.userId
  },
  mutations: {
    SET_USER_ROLE(state, value) {
      state.userRole = value;
      localStorage.setItem('cq.role', value);
    },
    SET_USER_UID(state, value) {
      state.userId = value;
      localStorage.setItem('cq.uid', value);
    }
  },
  actions: {
    setUserRole({ commit }, role) {
      commit('SET_USER_ROLE', role);
    },
    setUserUid({ commit }, uid) {
      commit('SET_USER_UID', uid);
    }
  }
};
