export default {
  state: {
    watchList: []
  },
  mutations: {
    getWatchList (state, currentWatchList) {
      state.watchList = currentWatchList
    },
    addWatched (state, watched) {
      let flag = false
      for (var i = 0; i < state.watchList.length; i++) {
        if (state.watchList[i] === watched) {
          flag = true
          break
        }
      }
      if (flag === false) { state.watchList.push(watched) }
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
