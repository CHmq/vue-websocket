import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  state: {
    userName: '',
    userAvatar: '',
    userUrl: sessionStorage.getItem('userUrl')
  },
  mutations: {
    updateName (state, newName) {
      state.userName = newName
    },
    updateAvatar (state, newAvatar) {
      state.userAvatar = newAvatar
    },
    changeUrl (state, newUrl) {
      state.userUrl = newUrl
    }
  },
  actions: {
    changeInfoName (context, newdata) {
      context.commit('updateName', newdata)
    },
    changeInfoAvatar (context, newdata) {
      context.commit('updateAvatar', newdata)
    },
    changeUrl (context, newdata) {
      context.commit('changeUrl', newdata)
    }
  },
  getters
})
