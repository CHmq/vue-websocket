// 客服设置
import { request } from '../request'
import Qs from 'qs'

// 获取商户设置列表(客服分配)
export function getMerchSettingList (values) {
    return request({
        url: 'merch/setting/getMerchSettingList',
        method: 'get',
        params: {}
    })
}
// 添加tab一级分类
export function saveTabClass (values) {
    return request({
        url: 'merch/setting/saveTabClass',
        method: 'post',
        data: values
    })
}
// 修改tab一级分类
export function saveTabClassPut (values) {
    return request({
        url: 'merch/setting/saveTabClass',
        method: 'put',
        data: values
    })
}
// 删除tab一级分类
export function delTabCLass (values) {
    return request({
        url: 'merch/setting/delTabCLass',
        method: 'delete',
        data: values
    })
}
// 添加tab子类
export function saveTab (values) {
    return request({
        url: 'merch/setting/saveTab',
        method: 'post',
        data: values
    })
}
// 修改tab子类
export function saveTabPut (values) {
    return request({
        url: 'merch/setting/saveTab',
        method: 'put',
        data: values
    })
}
// 删除tab子类
export function delTab (values) {
    return request({
        url: 'merch/setting/delTab',
        method: 'delete',
        data: values
    })
}

// 获取商户设置列表(客服分配修改)
export function settingAllotRule (values) {
    return request({
        url: 'merch/setting/settingAllotRule',
        method: 'put',
        data: values
    })
}
// 获取商户设置列表(客户排队修改)
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
// 获取商户token
export function getMerchToken () {
    return request({
        url: 'api/agent/getMerchToken',
        method: 'get',
        params: {}
    })
}
// 获取客服信息 agentInfo
export function agentInfo () {
    return request({
        url: 'api/agent/agentInfo',
        method: 'get',
        params: {}
    })
}
// 上传头像
export function uploadAvatar (FileData) {
    return request({
        url: 'upload/upload/uploadAvatar',
        method: 'post',
        data: FileData
    })
}
// 修改个人信息
export function updateInfo (values) {
    return request({
        url: 'api/agent/updateInfo',
        method: 'put',
        data: values
    })
}
