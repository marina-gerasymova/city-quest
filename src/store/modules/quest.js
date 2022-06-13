export default {
  namespaced: true,
  state: {
    quest: null,
    taskIds: []
  },
  getters: {
    activeQuest: state => state.quest,
    tasksList: state => state.taskIds
  },
  mutations: {
    SET_ACTIVE_QUEST(state, value) {
      state.quest = value;
    },
    SET_TASKS_IDS(state, value) {
      state.taskIds = value;
    }
  },
  actions: {
    setActiveQuest({ commit }, quest) {
      console.log(quest)
      commit('SET_ACTIVE_QUEST', quest);
      const questTasks = quest.tasks;
      const taskIds = questTasks ? Object.keys(questTasks) : [];

      const sortedTaskIds = taskIds.sort((a, b) => {
        return questTasks[a] - questTasks[b];
      })

      commit('SET_TASKS_IDS', sortedTaskIds);
    },
    getNextTaskId({ getters }, taskId) {
      const tasksList = getters.tasksList;
      const currentTaskIndex = tasksList.indexOf(taskId);
      if (currentTaskIndex === tasksList.length - 1) {
        return {
          done: true,
          progress: 1
        }
      } else {
        return {
          done: false,
          progress: ((currentTaskIndex + 1) / tasksList.length).toFixed(2),
          nextId: tasksList[currentTaskIndex + 1] 
        }
      }
    }
  }
};
