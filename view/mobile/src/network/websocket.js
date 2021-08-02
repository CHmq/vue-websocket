// 中间层分发
import { request } from './request'

// 聊天窗口获取
export function returnCode() {
  return request({
    url: 'api/client/returnCode',
    method: 'get',
    params: {
    }
  })
}

// 初始化聊天
export function InitList(url, sourceUrl, fingerprint, encrypt, code) {
  return request({
    url: 'api/client/init',
    method: 'get',
    params: {
      // mchid: url.mchid,
      mchid: url.mchid,
      source_url: sourceUrl,
      landing_page: url.source_url,
      chat_url: url.source_url,
      agentid: url.agentid,
      groupid: url.groupid,
      browser_fingerprint: fingerprint,
      encrypt_data: encrypt,
      random_code: code
    }
  })
}
// 聊天记录
export function getChatRecord(mchid, clientid, page) {
  return request({
    url: 'api/client/getChatRecord',
    method: 'get',
    params: {
      clientid,
      mchid,
      page
    }
  })
}
// 发送信息
export function sendMsg(mchid, clientid, content, type) {
  return request({
    url: 'api/client/sendmsg',
    method: 'post',
    data: {
      clientid,
      mchid,
      type,
      content
    }
  })
}
// 发送商品
export function getGoods(id) {
  return request({
    url: 'api/client/goods',
    method: 'get',
    params: { id }
  })
}
// 发送商品
export function sendGoods(id) {
  return request({
    url: 'api/client/goods',
    method: 'post',
    data: { id }
  })
}
// 发送文件
export function sendFile(FileData) {
  return request({
    url: 'api/client/sendFile',
    method: 'post',
    data: FileData
  })
}
// 获取文件类型
export function fileJurisdiction(mchid) {
  return request({
    url: 'base/upload/fileJurisdiction',
    method: 'post',
    data: { mchid }
  })
}
// 评分发送
export function sendRate(clientid, mchid, agentid, value) {
  return request({
    url: 'api/client/dialogEvaluate',
    method: 'post',
    data: {
      clientid,
      mchid,
      agentid,
      evaluate: value
    }
  })
}
// 获取商户token
export function getMerchToken() {
  return request({
    url: 'api/agent/getMerchToken',
    method: 'get',
    params: {}
  })
}
// 获取tab分类
export function getTabDataList(mchid, clientid, tabClassId) {
  return request({
    url: 'api/client/getTabDataList',
    method: 'get',
    params: {
      clientid,
      mchid,
      tab_class_id: tabClassId
    }
  })
}
// 获取tab
export function getTabData(mchid, clientid, tabId) {
  return request({
    url: 'api/client/getTabData',
    method: 'get',
    params: {
      clientid,
      mchid,
      tab_id: tabId
    }
  })
}
