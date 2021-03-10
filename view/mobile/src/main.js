import Vue from 'vue'
// import VueSocketIO from 'vue-socket.io'
import Vant from 'vant'
import Fingerprint2 from 'fingerprintjs2'
// import Vconsole from 'vconsole'
import preventReClick from './assets/js/preventReClick'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vant)
// const vConsole = new Vconsole()
// Vue.use(vConsole)
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://127.0.0.1:9508',
//   vuex: {
//     store,
//     actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_'
//   }
// }))

Vue.config.productionTip = false
// new Vconsole()

new Vue({
  router,
  store,
  Fingerprint2,
  preventReClick,
  render: (h) => h(App)
}).$mount('#app')
