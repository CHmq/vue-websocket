import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Fingerprint: ''
  },
  mutations: {
    setPrint(state, all) { // 设置参数
      state.Fingerprint = all
    }
  },
  actions: {
  },
  modules: {
  }
})
