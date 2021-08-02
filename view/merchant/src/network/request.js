// 封装axios请求实例
import axios from 'axios'
// import Cookies from 'js-cookie'
import router from '../router'
// import { adLogin } from './Interface'
// import storage from 'store'
// import { ACCESS_TOKEN } from '@/store/mutation-types'

import notification from 'ant-design-vue/es/notification'

let showMsg = true
// const inline = true
const inline = false

export function request (config) {
    // 创建axios实例
    const instance = axios.create({
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
            // 'Content-Type': 'multipart/form-data'
        },
        baseURL: 'http://kefu.xuandev.com/index.php',
        timeout: 5000,
        withCredentials: true
    })
    // axios拦截器
    // 请求拦截器的使用
	instance.interceptors.request.use(config => {
        // 保存原来请求的路由格式
        var configUrl = config.url
        // 微擎重新设置请求URL开始
        // 处理微擎请求URL格式
        // console.log('配置axios请求的url', config.url)
        // 处理微擎统一的请求接口前缀
        //  var httpUrl = window.location.href
        //  console.log('url', httpUrl)
        //  var stringIndex = httpUrl.indexOf('?')
        //  httpUrl = httpUrl.substring(0, stringIndex)
         // 本地微擎测试
        //  httpUrl = 'http://kefu.xuandev.com//index.php'
         // 请求接口参数
        //  var urlString = config.url
        //  var urlArr = urlString.split('/')
        //  console.log(urlArr)
        //  if (httpUrl.indexOf('web') !== -1) {
        //     httpUrl = httpUrl.replace('web', 'app')
        // }
        //  config.url = `${httpUrl}?i=1&c=entry&do=api&m=pinxuan_kefu&mo=${urlArr[0]}&opt=${urlArr[1]}&act=${urlArr[2]}`
        // console.log('配置axios请求的url', config.url, configUrl)
        // 微擎重新设置请求URL开始
        const UserToken = sessionStorage.getItem('UserToken')
        const UserId = sessionStorage.getItem('UserId')
        console.log(config)
        // 在每一个接口的请求头上增加一个token
        if (configUrl === 'login/login/admin' || configUrl === 'we7/admin/login') {
        } else {
            config.headers = {
                'token': UserToken,
                'adminid': UserId
                // 'Content-Type': 'multipart/form-data'
            }
        }
        return config
	}, err => {
		console.log(err)
	})
	// 响应拦截器的使用  用于获取响应数据
	instance.interceptors.response.use(res => {
        console.log(res, 'my')
        if (res.data.error) {
            if (res.data.error.code === 410) {
                if (inline) {
                    console.log(1)
                    // location.reload()
                    sessionStorage.clear()
                    console.log('清除了')
                    location.reload()
                    setTimeout(() => {
                        console.log('sessionStorage')
                        router.push({ path: '/' })
                    }, 200)
                    // adLogin().then((res) => {
                    //     // this.goodsList = res.data;
                    //     console.log(res)
                    //     // storage.set(ACCESS_TOKEN, res.result.token, 7 * 24 * 60 * 60 * 1000)
                    //     // this.$store.commit('SET_TOKEN', res.result.token)
                    //     sessionStorage.setItem('UserToken', res.result.token)
                    //     sessionStorage.setItem('UserId', res.result.id)
                    //     // sessionStorage.setItem('result', JSON.stringify(res.result))
                    //     console.log(res)
                    // })
                } else {
                    if (showMsg) {
                        notification.error({
                            message: res.data.error.message,
                            description: '请重新登陆'
                        })
                        showMsg = false
                        setTimeout(() => {
                            showMsg = true
                        }, 3000)
                    }
                    sessionStorage.clear()
                    console.log('清除了')
                    location.reload()
                    setTimeout(() => {
                        router.push({ path: '/user/login' })
                    }, 200)
                    console.log(router)
                    // window.location = '/user/login'
                }
            }
        }
		return res.data
	}, err => {
		console.log(`err:${err}`)
	})
    return instance(config)
}
