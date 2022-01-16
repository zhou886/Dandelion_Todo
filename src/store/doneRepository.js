export default {
  state: {
    doneList: []
  },
  mutations: {
    emptyDoneList (state) {
      state.doneList = []
    },
    addDoneEntity (state, doneEntity) {
      state.doneList.push(doneEntity)
    },
    removeDoneEntity (state, doneEntity) {
      for (var i = 0; i < state.doneList.length; i++) {
        if (state.doneList[i].todoId === doneEntity.todoId) {
          state.doneList.splice(i, 1)
          i--
        }
      }
    }
  }
}
