export default {
  state: {
    userInfo: {
      id: 114514,
      nickname: 'hhm',
      role: '普通角色'
    }
  },
  mutations: {
    getUserInfo (state, currentUserInfo) {
      state.userInfo = currentUserInfo
    },
    changeNickname (state, newNickname) {
      state.userInfo.nickname = newNickname
    }
  }
}
