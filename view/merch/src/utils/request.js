import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  // baseURL: process.env.VUE_APP_API_BASE_URL,
  // 微擎版本打包
  baseURL: 'http://kefu.xuandev.com//index.php',
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  // 不在使用
  // // 微擎请求URL修改开始
  // // 处理微擎统一的请求接口前缀
  // var httpUrl = window.location.href
  // console.log('url', httpUrl)
  // var stringIndex = httpUrl.indexOf('?')
  // httpUrl = httpUrl.substring(0, stringIndex)
  // // 请求接口参数
  // var urlString = config.url
  // var urlArr = urlString.split('/')
  // console.log(urlArr)
  // config.url = `${httpUrl}?c=site&a=entry&do=api&m=pinxuan_kefu&mo=${urlArr[0]}&opt=${urlArr[1]}&act=${urlArr[2]}`
  // console.log('配置axios请求的url', config.url)
  // // 微擎请求URL修改结束
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Access-Token'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
