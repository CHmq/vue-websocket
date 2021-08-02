// 中间层分发
import { request } from './request'
// import Qs from 'qs'

export function adLogin (values) {
  return request({
      url: 'we7/admin/login',
      method: 'get',
      data: values
  })
}
// 登入
export function Login (values) {
    return request({
        url: 'login/login/admin',
        method: 'post',
        data: values
    })
}
// 获取地区id
export function getDistrict () {
  return request({
      url: 'base/district/getDistrict',
      method: 'get',
      params: {}
  })
}
// 获取商户列表
export function merchList () {
  return request({
      url: 'admin/merch/index',
      method: 'get',
      params: {}
  })
}
// 获取商户分组
export function getGroupList () {
  return request({
      url: 'admin/merch/getGroupList',
      method: 'get',
      params: {}
  })
}
// 头像上传
export function uploadAvatar (FileData) {
  return request({
      url: 'base/upload/uploadAvatar',
      method: 'post',
      data: FileData
  })
}
// 添加商户
export function addMerch (values) {
  return request({
      url: 'admin/merch/addMerch',
      method: 'post',
      data: values
  })
}
// 修改商户
export function editGroup (values) {
  return request({
      url: 'admin/merch/addMerch',
      method: 'put',
      data: values
  })
}
// 登出
export function Logout (logoutparameter) {
  return request({
    url: 'admin/admin/logout',
    method: 'post',
    data: {}
  })
}
