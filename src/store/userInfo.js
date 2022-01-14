export default {
  state: {
    userInfo: {
      id: 114514,
      nickname: 'hhm',
      role: '普通角色'
    },
    token: ''
  },
  mutations: {
    getUserInfo (state, currentUserInfo) {
      state.userInfo = currentUserInfo
    },
    changeNickname (state, newNickname) {
      state.userInfo.nickname = newNickname
    },
    setToken (state, _token) {
      state.token = _token
    }
  }
}
