// 封装axios请求实例
import axios from 'axios'
// import Cookies from 'js-cookie'
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
        // const token = storage.get(ACCESS_TOKEN)
        // 如果 token 存在
        // 让每个请求携带自定义 token 请根据实际情况自行修改
        // if (token) {
        //     config.headers['Access-Token'] = token
        // }
        // return config
        const UserToken = sessionStorage.getItem('UserToken')
        const UserId = sessionStorage.getItem('UserId')
        // console.log('121111111111')
        // 从Cookies中获取token
        // const UserToken = Cookies.get('UserToken')
        // const UserId = Cookies.get('UserId')
        // 在每一个接口的请求头上增加一个token
        // 保存原来请求的路由格式
        var configUrl = config.url
        // 微擎重新设置请求URL开始
        // 处理微擎请求URL格式
        // console.log('配置axios请求的url', config.url)
        // 处理微擎统一的请求接口前缀
        // var httpUrl = window.location.href
        // console.log('url', httpUrl)
        // var stringIndex = httpUrl.indexOf('?')
        // httpUrl = httpUrl.substring(0, stringIndex)
        // 本地微擎测试
        // httpUrl = 'http://kefu.xuandev.com//index.php'
        // 请求接口参数
        // var urlString = config.url
        // var urlArr = urlString.split('/')
        // console.log(urlArr)
        // if (httpUrl.indexOf('web') !== -1) {
        //   httpUrl = httpUrl.replace('web', 'app')
        // }
        // config.url = `${httpUrl}?i=1&c=entry&do=api&m=pinxuan_kefu&mo=${urlArr[0]}&opt=${urlArr[1]}&act=${urlArr[2]}`
        // console.log('配置axios请求的url', config.url, configUrl)
        // 微擎重新设置请求URL开始
        if (configUrl === 'login/login/agent') {
        } else {
            config.headers = {
                'token': UserToken,
                'agentid': UserId
                // 'Content-Type': 'multipart/form-data'
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
                axios.get('http://kefu.xuandev.com//index.php/we7/admin/login', {
                    params: {}
                }).then((res) => {
                    // this.goodsList = res.data;
                    sessionStorage.setItem('UserToken', res.result.token)
                    sessionStorage.setItem('UserId', res.result.id)
                    sessionStorage.setItem('result', JSON.stringify(res.result))
                    console.log(res)
                }).catch((error) => {
                    console.log(error)
                })
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
                localStorage.removeItem('Access-Token')
                sessionStorage.clear()
                location.reload()
                setTimeout(() => {
                    router.push({ path: '/user/login' })
                }, 200)
                console.log(router)
            }
        }
		return res.data
	}, err => {
		console.log(`err:${err}`)
	})
    return instance(config)
}
