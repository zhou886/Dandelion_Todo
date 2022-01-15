export default {
  state: {
    userInfo: {
      id: null,
      nickname: null,
      role: null
    },
    todoCount: null
  },
  mutations: {
    setId (state, _id) {
      state.userInfo.id = _id
    },
    setNickname (state, _nickname) {
      state.userInfo.nickname = _nickname
    },
    setRole (state, _role) {
      state.userInfo.role = _role
    },
    changeNickname (state, _nickname) {
      state.userInfo.nickname = _nickname
    },
    setTodoCount (state, _todoCount) {
      state.todoCount = _todoCount
    },
    addTodoCount (state) {
      state.todoCount++
    }
  }
}
