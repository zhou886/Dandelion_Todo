export default {
  state: {
    todoList: []
  },
  mutations: {
    addUndoneEntity (state, todoEntity) {
      state.todoList.push(todoEntity)
    },
    removeUndoneEntity (state, todoEntity) {
      for (var i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i] === todoEntity) {
          state.todoList.splice(i, 1)
          i--
        }
      }
    }
  }
}
