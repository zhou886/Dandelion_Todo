export default {
  state: {
    todoList: [
      // 举个数据格式的例子
      {
        title: '移动互联大作业',
        description: '完成一个多端互联的应用',
        deadline: '2022-1-16-23-00',
        todoId: 1
      },
      {
        title: 'aaaa',
        description: '完成一个多端互联的应用',
        deadline: '2022-1-16-23-00',
        todoId: 1
      },
      {
        title: 'bbb',
        description: '完成一个多端互联的应用',
        deadline: '2022-1-16-23-00',
        todoId: 1
      }
    ]
  },
  mutations: {
    addTodoEntity (state, todoEntity) {
      state.todoList.push(todoEntity)
    },
    removeTodoEntity (state, todoEntity) {
      for (var i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i] === todoEntity) {
          state.todoList.splice(i, 1)
          i--
        }
      }
    }
  }
}
