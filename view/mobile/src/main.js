import Vue from 'vue'
import Vant from 'vant'
import Fingerprint2 from 'fingerprintjs2'
import preventReClick from './assets/js/preventReClick'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  Fingerprint2,
  preventReClick,
  render: (h) => h(App)
}).$mount('#app')
