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
  return instance(config)
}

export function test(config) {
  return config
}
