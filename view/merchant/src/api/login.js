// import request from '@/network/request'
// import Qs from 'qs'

// const userApi = {
//   Login: '/auth/login',
//   Logout: '/auth/logout',
//   ForgePassword: '/auth/forge-password',
//   Register: '/auth/register',
//   twoStepCode: '/auth/2step-code',
//   SendSms: '/account/sms',
//   SendSmsErr: '/account/sms_err',
//   // get my info
//   UserInfo: '/user/info',
//   UserMenu: '/user/nav'
// }

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
// export function login (parameter) {
//   console.log(parameter)
//   return request({
//     url: 'http://kefu.xuandev.com/index.php/login/login/admin',
//     method: 'post',
//     data: parameter
//   })
// }

// export function getSmsCaptcha (parameter) {
//   return request({
//     url: userApi.SendSms,
//     method: 'post',
//     data: parameter
//   })
// }

// export function getInfo () {
//   return request({
//     url: userApi.UserInfo,
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

// export function getCurrentUserNav () {
//   return request({
//     url: userApi.UserMenu,
//     method: 'get'
//   })
// }

// export function logout (parameter) {
//   console.log(parameter)
//   return request({
//     url: 'http://kefu.xuandev.com/index.php/api/agent/logout',
//     method: 'post',
//     data: { mchid: parameter.mchid },
//     headers: {
//       'token': parameter.UserToken,
//       'agentid': parameter.UserId
//     }
//   })
// }

// /**
//  * get user 2step code open?
//  * @param parameter {*}
//  */
// export function get2step (parameter) {
//   return request({
//     url: userApi.twoStepCode,
//     method: 'post',
//     data: parameter
//   })
// }
