// 客服列表
import { request } from '../request'
// import request from '../../utils/request'
import Qs from 'qs'

// 获取客服分组
export function getAgentGroupList (values) {
    return request({
        url: 'merch/agent/getAgentGroupList',
        method: 'get',
        params: {
            // line: values.line,
            // config_group_id: values.config_group_id,
            page: values ? values.page : ''
        }
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
        data: values
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
// 撤回删除客服
export function recoverAgent (agentId) {
    return request({
        url: 'merch/agent/recoverAgent',
        method: 'post',
        data: Qs.stringify({
            agent_id: agentId
        })
    })
}

// 获取分组信息
// export function getGroupList (values) {
//     return request({
//         url: 'merch/agent/getAgentGroupList',
//         method: 'get',
//         params: {
//             line: values.line,
//             config_group_id: values.config_group_id
//         }
//     })
// }
// 获取客服列表
export function getAgentList (values) {
    return request({
        url: 'merch/agent/getAgentList',
        method: 'get',
        params: {
            line: values.line,
            group_id: values.group_id,
            page: values.page
        }
    })
}
// 重置密码resetPassword
export function resetPassword (values) {
    return request({
        url: 'merch/agent/resetPassword',
        method: 'post',
        data: values
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
