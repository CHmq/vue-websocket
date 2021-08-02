// 统计图表
import { request } from '../request'
import Qs from 'qs'
// 商户统计
export function getDataOverviewList (startDate, endDate) {
    var params = startDate !== undefined && endDate !== undefined ? { start_date: startDate, end_date: endDate } : {}
    console.log(params)
    return request({
        url: '/merch/report/getDataOverviewList',
        method: 'get',
        params: params
    })
}
// 客服统计数据
export function getKfDataOverview (mchid) {
    return request({
        url: '/api/agent/getDataOverview',
        method: 'post',
        data: Qs.stringify({
            mchid
        })
    })
}
// 来源页统计
export function getSourceUrlList (startDate, endDate) {
    var params = startDate !== undefined && endDate !== undefined ? { start_date: startDate, end_date: endDate } : {}
    console.log(params)
    return request({
        url: '/merch/report/getSourceUrlList',
        method: 'get',
        params: params
    })
}
// 对话页统计
export function getChatUrlList (startDate, endDate) {
    var params = startDate !== undefined && endDate !== undefined ? { start_date: startDate, end_date: endDate } : {}
    console.log(params)
    return request({
        url: '/merch/report/getChatUrlList',
        method: 'get',
        params: params
    })
}
// 着陆页统计
export function getLandingPageList (startDate, endDate) {
    var params = startDate !== undefined && endDate !== undefined ? { start_date: startDate, end_date: endDate } : {}
    console.log(params)
    return request({
        url: '/merch/report/getLandingPageList',
        method: 'get',
        params: params
    })
}
