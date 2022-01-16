export default {
  state: {
    userInfo: {
      id: null,
      nickname: null,
      role: null,
      password: null
    },
    todoCount: null,
    Avatar: null
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
    setPassword (state, _password) {
      state.userInfo.password = _password
    },
    changeNickname (state, _nickname) {
      state.userInfo.nickname = _nickname
    },
    setTodoCount (state, _todoCount) {
      state.todoCount = _todoCount
    },
    setAvatar (state, _Avatar) {
      state.Avatar = _Avatar
    },
    addTodoCount (state) {
      state.todoCount++
    }
  }
}
