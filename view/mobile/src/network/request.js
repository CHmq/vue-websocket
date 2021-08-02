// 封装axios请求实例
import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    baseURL: 'http://kefu.xuandev.com//index.php/',
    timeout: 5000,
    withCredentials: true
  })
  // axios拦截器
  // 请求拦截器的使用
  instance.interceptors.request.use((item) => {
    // 保存原来请求的路由格式
    // const configUrl = item.url
    // 微擎重新设置请求URL开始
    // 处理微擎请求URL格式
    // console.log('配置axios请求的url', config.url)
    // 处理微擎统一的请求接口前缀
    // let httpUrl = window.location.href
    // console.log('url', httpUrl)
    // const stringIndex = httpUrl.indexOf('?')
    // httpUrl = httpUrl.substring(0, stringIndex)
    // // 本地微擎测试
    // // httpUrl = 'http://kefu.xuandev.com//index.php'
    // // 请求接口参数
    // const urlString = item.url
    // const urlArr = urlString.split('/')
    // console.log(urlArr)
    // const objUrl = item
    // if (httpUrl.indexOf('web') !== -1) {
    //   httpUrl = httpUrl.replace('web', 'app')
    // }
    // const qzurl = `${httpUrl}?i=1&c=entry&do=api&do=api&m=pinxuan_kefu&`
    // objUrl.url = `${qzurl}mo=${urlArr[0]}&opt=${urlArr[1]}&act=${urlArr[2]}`
    // console.log('配置axios请求的url', item.url, objUrl.url, configUrl)
    // 微擎重新设置请求URL开始
    if (item.method === 'get') {
      // 判断get请求
      const obj = item
      obj.params = config.params || {}
      obj.params.t = Date.parse(new Date()) / 1000 // 添加时间戳
    }
    return item
  }, (err) => console.log(err))
  return instance(config)
}

export function test(config) {
  return config
}
