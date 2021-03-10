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
    url: 'upload/upload/fileJurisdiction',
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
