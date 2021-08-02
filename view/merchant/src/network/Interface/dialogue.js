// 对话平台
import { request } from '../request'
import Qs from 'qs'

// 发送消息
export function sendMsg (mchid, clientid, content, type) {
    return request({
        url: 'api/agent/sendMsg',
        method: 'post',
        data: Qs.stringify({
            mchid,
            clientid,
            content,
            type
        })
    })
}
// 发送文件,图片
export function sendFile (FileData) {
    return request({
        url: 'api/agent/sendFile',
        method: 'post',
        data: FileData
    })
}
// 获取文件类型
export function fileJurisdiction (mchid) {
    return request({
      url: 'upload/upload/fileJurisdiction',
      method: 'post',
      data: Qs.stringify({ mchid })
    })
  }
// 获取聊天列表
export function getClientList (mchid) {
    return request({
        url: 'api/agent/getClientList',
        method: 'get',
        params: {
            mchid
        }
    })
}

// 修改客户名片
export function editClientInfo (values) {
    return request({
        url: 'api/agent/editClientInfo',
        method: 'put',
        data: Qs.stringify({
            client_id: values.id,
            client_name: values.client_name,
            sex: values.sex,
            wechat: values.wechat,
            email: values.email,
            mobile: values.mobile,
            qq: values.qq,
            city: values.city
        })
    })
}

// 清空未读消息
export function clearMessage (mchid, clientid) {
    return request({
        url: 'api/agent/clearMessageUnread',
        method: 'get',
        params: {
            mchid,
            clientid
        }
    })
}
// 获取聊天记录
export function getChats (mchid, clientid) {
    return request({
        url: 'api/agent/getchats',
        method: 'get',
        params: {
            mchid,
            clientid
        }
    })
}
// 快捷回复列表
export function getSwiftMsgList (mchid) {
    return request({
        url: '/api/agent/getSwiftMsgList',
        method: 'get',
        params: {
            mchid
        }
    })
}
// 获取推送列表
export function getPushList (mchid) {
    return request({
        url: 'api/agent/pushlist',
        method: 'get',
        params: {
            mchid
        }
    })
}
// 代理商基本功能，发送消息
export function sendMessage (values) {
    return request({
        url: 'api/agent/sendMsg',
        method: 'post',
        params: {
            clientid: values.clientid,
            content: '这是推送给你的用户',
            type: 'text',
            mchid: values.mchid
        }
    })
}
// 推送客户
export function pushClient (values) {
    return request({
        url: 'api/agent/pushclient',
        method: 'post',
        params: {
            client_id: values.clientid,
            agent_id: values.id,
            reason: '需要你的协助',
            mchid: values.mchid
        }
    })
}
// 是否同意转接
export function pushAgree (values) {
    return request({
        url: 'api/agent/pushclient',
        method: 'put',
        params: {
            client_id: values.client_id,
            agent_id: values.agent_id,
            objection: values.objection,
            mchid: values.mchid,
            id: values.id,
            is_consent: values.is_consent
        }
    })
}
// 结束聊天
export function endChat (mchid, clientid, isResult) {
    return request({
        url: 'api/agent/endChat',
        method: 'post',
        data: Qs.stringify({
            mchid,
            clientid,
            is_result: isResult
        })
    })
}
