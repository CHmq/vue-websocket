// 封装axios请求实例
import axios from 'axios'
import Cookies from 'js-cookie'
import router from '../router'

import notification from 'ant-design-vue/es/notification'

let showMsg = true

export function request (config) {
    // 创建axios实例
    const instance = axios.create({
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
            // 'Content-Type': 'multipart/form-data'
        },
        baseURL: 'http://kefu.xuandev.com//index.php',
        timeout: 5000,
        withCredentials: true
    })
    // axios拦截器
    // 请求拦截器的使用
	instance.interceptors.request.use(config => {
        // 从Cookies中获取token
        const UserToken = Cookies.get('UserToken')
        const UserId = Cookies.get('UserId')
        // 在每一个接口的请求头上增加一个token
        if (config.url === 'login/login/agent') {
        } else {
            config.headers = {
                'token': UserToken,
                'agentid': UserId,
                'Content-Type': 'multipart/form-data'
            }
        }
        return config
	}, err => {
		console.log(err)
	})
	// 响应拦截器的使用  用于获取响应数据
	instance.interceptors.response.use(res => {
        if (res.data.error) {
            // if (res.data.error.code === 401 && (res.data.error.message === 'token错误' || res.data.error.message === 'token已过期，请重新登录')) {
            if (res.data.error.code === 410) {
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
                Cookies.remove('UserToken')
                Cookies.remove('UserId')
                localStorage.removeItem('Access-Token')
                router.push({ path: '/user/login' })
                // window.location = '/user/login'
            }
        }
		return res.data
	}, err => {
		console.log(`err:${err}`)
	})
    return instance(config)
}
