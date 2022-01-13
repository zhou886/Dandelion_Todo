import Vue from 'vue'
import Vuex from 'vuex'
import asideCollapse from './asideCollapse'
import doneRepository from './doneRepository'
import undoneRepository from './undoneRepository'
import userInfo from './userInfo'
import watchList from './watchList'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    asideCollapse, doneRepository, undoneRepository, userInfo, watchList
  }
})
