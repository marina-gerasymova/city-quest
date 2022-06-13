import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'; 
import user from './modules/user';
import quest from './modules/quest';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    quest
  },
  plugins: [
    persistedState({
      storage: {
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, value) => {
          localStorage.setItem(key, value);
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        }
      },
      paths: [
        'quest.quest',
        'quest.taskIds',
        'user.userId'
      ]
    })
  ]
})
