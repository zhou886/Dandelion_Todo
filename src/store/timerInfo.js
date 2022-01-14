export default {
  state: {
    value: '',
    totalTime: 0,
    currentTime: 0,
    progressStatus: null
  },
  mutations: {
    setValue (state, _value) {
      state.value = _value
    },
    setTotalTime (state, _totalTime) {
      state.totalTime = _totalTime
    },
    setCurrentTime (state, _currentTime) {
      state.currentTime = _currentTime
    },
    setProgressStatus (state, _progressStatus) {
      state.progressStatus = _progressStatus
    }
  }
}
