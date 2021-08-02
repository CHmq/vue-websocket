// 中间层分发
import { request } from './request'
import Qs from 'qs'

// 登入
export function Login (parameter) {
  return request({
    url: 'login/login/agent',
    method: 'post',
    data: parameter
  })
}
// 登出
export function Logout (logoutparameter) {
  return request({
    url: 'api/agent/logout',
    method: 'post',
    data: Qs.stringify({
      mchid: logoutparameter
    })
  })
}
