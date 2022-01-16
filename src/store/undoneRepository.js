export default {
  state: {
    todoList: []
  },
  mutations: {
    emptyTodoList (state) {
      state.todoList = []
    },
    addUndoneEntity (state, todoEntity) {
      state.todoList.push(todoEntity)
    },
    removeUndoneEntity (state, todoEntity) {
      for (var i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i].todoId === todoEntity.todoId) {
          state.todoList.splice(i, 1)
          i--
        }
      }
    }
  }
}
