export default {
  state: {
    watchList: [
      {
        userId: 11,
        nickname: 'zyx'
      },
      {
        userId: 12,
        nickname: 'hyp'
      }
    ]
  },
  mutations: {
    getWatchList (state, currentWatchList) {
      state.watchList = currentWatchList
    },
    addWatched (state, watched) {
      state.push(watched)
    },
    removeWatched (state, watched) {
      for (var i = 0; i < state.watchList.length; i++) {
        if (state.watchList[i] === watched) {
          state.watchList.splice(i, 1)
          i--
        }
      }
    }
  }
}
