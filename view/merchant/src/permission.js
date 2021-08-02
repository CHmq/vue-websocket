import router from './router'
import store from './store'
// import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
import { adLogin } from '@/network/Interface'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const loginRoutePath = '/user/login'
const defaultRoutePath = '/websocket'

const inline = false
// 微擎
// const inline = true

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))
  /* has token */
  // if (inline) {
  //   adLogin().then((res) => {
  //     // this.goodsList = res.data;
  //     console.log(res)
  //     storage.set(ACCESS_TOKEN, res.result.token, 7 * 24 * 60 * 60 * 1000)
  //     store.commit('SET_TOKEN', res.result.token)
  //     sessionStorage.setItem('UserToken', res.result.token)
  //     sessionStorage.setItem('UserId', res.result.id)
  //     // sessionStorage.setItem('result', JSON.stringify(res.result))
  //     console.log(res)
  //   })
  // }
  console.log(sessionStorage.getItem('UserToken'))
  if (sessionStorage.getItem('UserToken')) {
    console.log('jinqul')
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      // check login user.roles is null
      // console.log('111111111111111111111111111111111111111111111111', store.getters.roles)
      // console.log(store.getters.roles.length)
      if (store.getters.roles.length === 0) {
        // request login userInfo
        store
          .dispatch('GetInfo')
          .then(res => {
            const roles = res.result.role
            // console.log(roles)
            // generate dynamic router
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              router.addRoutes(store.getters.addRouters)
              // 请求带有 redirect 重定向时，登录自动重定向到该地址
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('Logout').then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (inline) {
      console.log(inline)
      // if (to.path === '/user/login') {
        // 在免登录白名单，直接进入
        console.log(inline)
        adLogin().then((res) => {
        // this.goodsList = res.data;
        console.log(res)
        // storage.set(ACCESS_TOKEN, res.result.token, 7 * 24 * 60 * 60 * 1000)
        store.commit('SET_TOKEN', res.result.token)
        sessionStorage.setItem('UserToken', res.result.token)
        sessionStorage.setItem('UserId', res.result.id)
        // sessionStorage.setItem('result', JSON.stringify(res.result))
        console.log(res)
        next()
        })
      // } else {
      //   next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      //   NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      // }
    } else {
      if (whiteList.includes(to.name)) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next({ path: loginRoutePath, query: { redirect: to.fullPath } })
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
