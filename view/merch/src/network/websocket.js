// 中间层分发
import { request } from './request'
import Qs from 'qs'

// 获取token
// export function getToken (account, password) {
//     return request({
//         url: 'login/login/agent',
//         method: 'post',
//         data: JSON.stringify({
//             account,
//             password
//         })
//     })
// }
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

// 新建客服分组
export function addGroup (values) {
    return request({
        url: 'merch/agent/addagentgroup',
        method: 'post',
        data: Qs.stringify({
            name: values.name,
            is_receive: values.is_receive
        })
    })
}
// 修改客服分组
export function editGroup (values) {
    return request({
        url: 'merch/agent/addagentgroup',
        method: 'put',
        data: Qs.stringify({
            id: values.id,
            name: values.name,
            is_receive: values.is_receive
        })
    })
}
// 删除客服分组
export function delAgentGroup (values) {
    return request({
        url: 'merch/agent/delAgentGroup',
        method: 'delete',
        data: Qs.stringify({
            id: values.id
        })
    })
}

// 新建客服
export function addAgent (values) {
    return request({
        url: 'merch/agent/addagent',
        method: 'post',
        data: Qs.stringify({
            name: values.name,
            email: values.email,
            group_id: values.group_id,
            config_group_id: values.group_id,
            ceiling_client: values.ceiling_client,
            weight_value: values.weight_value
        })
    })
}

// 修改客服
export function editAgent (values) {
    console.log(values)
    return request({
        url: 'merch/agent/addagent',
        method: 'put',
        data: Qs.stringify({
            id: values.id,
            name: values.name,
            group_id: values.group_id,
            ceiling_client: values.ceiling_client,
            weight_value: values.weight_value
        })
    })
}

// 删除客服
export function delagent (agentId) {
    return request({
        url: 'merch/agent/delagent',
        method: 'delete',
        data: Qs.stringify({
            agent_id: agentId
        })
    })
}

// 获取分组信息
export function getGroupList (values) {
    return request({
        url: 'merch/agent/getAgentGroupList',
        method: 'get',
        params: {
            line: values.line,
            config_group_id: values.config_group_id
        }
    })
}
// 获取客服列表
export function getAgentList (values) {
    return request({
        url: 'merch/agent/getAgentList',
        method: 'get',
        params: {
            line: values.line,
            config_group_id: values.config_group_id
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
// 生成聊天链接
export function getChatLink (mchid) {
    return request({
        url: 'api/agent/getChatLink',
        method: 'get',
        params: {
            mchid
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
// 获取商户设置列表(客服分配)
export function getMerchSettingList (values) {
    return request({
        url: 'merch/setting/getMerchSettingList',
        method: 'get',
        params: {}
    })
}
// 获取商户设置列表(客服分配修改)
export function settingAllotRule (values) {
    return request({
        url: 'merch/setting/settingAllotRule',
        method: 'put',
        data: Qs.stringify({
            rule: values.rule
        })
    })
}
// 获取商户设置列表(客户排队修改)            agent_id: values.agent_id,token: values.token,
export function settingQueueingSetting (values) {
    return request({
        url: 'merch/setting/settingQueueingSetting',
        method: 'put',
        data: Qs.stringify({
            intro: values.intro,
            status: values.status,
            ticket_intro: values.ticket_intro,
            queue_limit: values.queue_limit
        })
    })
}
// 设置企业欢迎消息
export function saveMerchWelcomeMsg (values) {
    return request({
        url: 'merch/setting/saveMerchWelcomeMsg',
        method: 'put',
        data: Qs.stringify({
            content: values.content,
            status: values.status
        })
    })
}
// 设置商户自动回复消息
export function merchAuthMsg (values) {
    return request({
        url: 'merch/setting/merchAuthMsg',
        method: 'put',
        data: Qs.stringify({
            merch_auto_reply: values.merch_auto_reply
        })
    })
}
// 设置客服/客户无应答自动回复
export function saveNoResponse (values) {
    return request({
        url: 'merch/setting/saveNoResponse',
        method: 'put',
        data: Qs.stringify({
            content: values.content,
            countdown: values.countdown,
            identity: values.identity,
            status: values.status
        })
    })
}
// 设置保存对话结束
export function saveDialogEnd (values) {
    return request({
        url: 'merch/setting/saveDialogEnd',
        method: 'put',
        data: Qs.stringify({
            agent_ending_message: values.agent_ending_message,
            auto_ending_message: values.auto_ending_message,
            status: values.status
        })
    })
}
// 添加企业自动回复分组
export function saveMerchReplyGroup (values) {
    return request({
        url: 'merch/setting/saveMerchReplyGroup',
        method: 'post',
        data: Qs.stringify({
            name: values.name
        })
    })
}
// 修改企业自动回复分组
export function saveMerchReplyGroupPut (values) {
    return request({
        url: 'merch/setting/saveMerchReplyGroup',
        method: 'put',
        data: Qs.stringify({
            name: values.name,
            id: values.id
        })
    })
}
// 删除企业自动回复分组
export function saveMerchReplyGroupDel (values) {
    return request({
        url: 'merch/setting/delMerchReplyGroup',
        method: 'delete',
        data: Qs.stringify({
            id: values.id
        })
    })
}
// 添加企业回复
export function saveMerchReply (values) {
    return request({
        url: 'merch/setting/saveMerchReply',
        method: 'post',
        data: Qs.stringify({
            name: values.name,
            group_id: values.group_id,
            content_type: values.content_type,
            content: values.content,
            rich_content: values.rich_content
        })
    })
}
// 修改企业回复
export function saveMerchReplyEdit (values) {
    return request({
        url: 'merch/setting/saveMerchReply',
        method: 'put',
        data: Qs.stringify({
            id: values.id,
            name: values.name,
            group_id: values.group_id,
            content_type: values.content_type,
            content: values.content,
            rich_content: values.rich_content
        })
    })
}
// 删除企业回复
export function delMerchReply (values) {
    return request({
        url: 'merch/setting/delMerchReply',
        method: 'delete',
        data: Qs.stringify({
            id: values.id
        })
    })
}
// 添加个人自动回复分组
export function saveAgentReplyGroup (values) {
    return request({
        url: 'merch/setting/saveAgentReplyGroup',
        method: 'post',
        data: Qs.stringify({
            name: values.name
        })
    })
}
// 修改个人自动回复分组
export function saveAgentReplyGroupPut (values) {
    return request({
        url: 'merch/setting/saveAgentReplyGroup',
        method: 'put',
        data: Qs.stringify({
            name: values.name,
            id: values.id
        })
    })
}
// 删除个人自动回复分组
export function saveAgentReplyGroupDel (values) {
    return request({
        url: 'merch/setting/delAgentReplyGroup',
        method: 'delete',
        data: Qs.stringify({
            id: values.id
        })
    })
}
// 添加个人回复
export function saveAgentReply (values) {
    return request({
        url: 'merch/setting/saveAgentReply',
        method: 'post',
        data: Qs.stringify({
            name: values.name,
            group_id: values.group_id,
            content_type: values.content_type,
            content: values.content,
            rich_content: values.rich_content,
            shortcut_keys: '5,15'
        })
    })
}
// 修改个人回复
export function saveAgentReplyEdit (values) {
    return request({
        url: 'merch/setting/saveAgentReply',
        method: 'put',
        data: Qs.stringify({
            id: values.id,
            name: values.name,
            group_id: values.group_id,
            content_type: values.content_type,
            content: values.content,
            rich_content: values.rich_content
        })
    })
}
// 删除个人回复
export function delAgentReply (values) {
    return request({
        url: 'merch/setting/delAgentReply',
        method: 'delete',
        data: Qs.stringify({
            id: values.id
        })
    })
}
// 访客信息
export function getVisitInfo (mchid, page) {
    return request({
        url: 'api/agent/getVisitInfo',
        method: 'get',
        params: {
            mchid,
            page
        }
    })
}
// 获取商户token
export function getMerchToken () {
    return request({
        url: 'api/agent/getMerchToken',
        method: 'get',
        params: {}
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
