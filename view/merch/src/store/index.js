import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import system from './system'

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
    permission,
    system
  },
  state: {
      userName: '',
      userAvatar: sessionStorage.getItem('userAvatar'),
      userUrl: 'http://kefu.xuandev.com/'
      // 微擎
      // userUrl: `${window.location.protocol}//${window.location.host}/app`
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
          console.log(context, newdata)
      },
      changeUrl (context, newdata) {
          context.commit('changeUrl', newdata)
      }
  },
  getters
})
