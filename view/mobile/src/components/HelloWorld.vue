<template>
  <div class="msg">
    <div class="pc">
      <div class="msgheader">
        <h3>{{full_name}}</h3>
      </div>
      <div>
        <Queue
        :queueNum="queueNum"
        :queueTips="queueTips"
        :queueTicket="queueTicket"
        type="pc"
        v-if="show === true"/>
        <div class="msgLeft" v-else>
          <msgList
          ref="msgList"
          :messageList="messageList"
          :msgList="'msgList'"
          :Ishidden="Ishidden"
          :Isdisabled="Isdisabled"/>
          <div class="msgfooter">
            <van-field
            class="field"
            type="textarea"
            :autosize="{ maxHeight: 70, minHeight: 15 }"
            v-model="sendMessage"
            :disabled="IsSendBtn"
            center placeholder="请输入您要咨询的问题"
            v-on:keydown.enter.prevent
            @keyup.enter.native="keyDown"
            @focus="focusInput"
            @input="inputValue">
            </van-field>
            <div>
              <van-button
                :disabled="IsSendBtn"
                style="float: right;"
                size="small"
                type="primary"
                color="#fd523e"
                v-preventReClick="2000"
                @click="sendTxt('text')">
                发送
              </van-button>
              <van-button
                style="float: right; margin-right:15px"
                size="small"
                type="primary"
                color="#fd523e"
                @click="opendialog">
                发起评价
              </van-button>
              <van-uploader :after-read="afterRead" style="float:right">
                <van-button
                :disabled="IsSendBtn"
                style="margin-right:15px"
                size="small"
                color="#fd523e"
                type="primary">
                  发送图片
                </van-button>
              </van-uploader>
            </div>
          </div>
        </div>
        <div class="msgavatar">
          <van-image
            width="200"
            height="200"
            fit="fill"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
      </div>
    </div>
    <div class="mobile">
      <van-overlay :show="show">
        <Queue :queueNum="queueNum" :queueTips="queueTips" :queueTicket="queueTicket"/>
      </van-overlay>
      <div class="header">
        <h3>{{full_name}}</h3>
      </div>
      <div>
        <msgList
        :messageList="messageList"
        ref="msgList2"
        :msgList="'m_msgList'"
        :Ishidden="Ishidden"
        :Isdisabled="Isdisabled"/>
      </div>
      <div class="msgSend">
        <div style="padding: 0 10px;background-color: #e6e6e6;">
        <div class="msg-tab">
        <div class="tab-item" @click="opendialog">
          评价
        </div>
        <div class="tab-item">
          退换货
        </div>
        <div class="tab-item">
          售后查询
        </div>
        <div class="tab-item">
          物流查询
        </div>
        <div class="tab-item">
          我要催单
        </div>
      </div>
      </div>
        <div class="msgSendInput">
          <van-field
          style="width:82%"
          class="field"
          type="textarea"
          :autosize="{ maxHeight: 70, minHeight: 15 }"
          v-model="sendMessage"
          center placeholder="请输入您要咨询的问题"
          v-on:keydown.enter.prevent
          @keyup.enter.native="keyDown"
          @focus="focusInput"
          @input="inputValue">
          </van-field>
          <van-button
            v-show="sendBtn"
            :disabled="IsSendBtn"
            size="small"
            type="primary"
            color="#f51f10"
            style="margin-left: 10px;"
            @click="sendTxt('text')">
            发送
          </van-button>
          <van-button
            :disabled="IsSendBtn"
            v-show="!sendBtn"
            :icon="btnShow === false ? 'plus' : 'cross' "
            size="small"
            type="primary"
            class="chooseBtn"
            color="#f51f10"
            @click="IsShow"/>
        </div>
        <van-row v-show="btnShow" class="chooseRow">
          <van-col span="6" class="choose">
            <van-uploader :after-read="afterRead">
              <van-icon name="photo" size="30px"/><br>
                <span>相册</span>
            </van-uploader>
          </van-col>
          <van-col span="6" class="choose">
            <van-uploader :after-read="afterRead" capture="camera">
              <van-icon name="photograph" size="30px"/><br>
                <span>拍摄</span>
            </van-uploader>
          </van-col>
          <van-col span="6" class="choose">
            <van-icon name="shopping-cart" size="30px"/>
            <span>订单</span>
          </van-col>
          <van-col span="6" class="choose" @click="opendialog">
            <van-icon name="comment" size="30px"/>
            <span>评价</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-popup v-model="dialogShow" closeable round class="popup">
      <span class="popupTitle">请为这次对话评价</span>
      <p>⭐：差评<br>⭐⭐：一般<br>⭐⭐⭐：好评</p>
      <van-rate
        v-model="rateValue"
        :count="3"
        @change="onChange"
        size="30"
        gutter="60"
        class="rate"/>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Fingerprint2 from 'fingerprintjs2'
import md5 from 'js-md5'
import sha1 from 'sha1'
import {
  returnCode,
  sendMsg,
  InitList,
  getChatRecord,
  sendRate,
  sendFile,
  fileJurisdiction
} from '../network/websocket'

import msgList from './msgList.vue'
import Queue from './queue.vue'

// let lockReconnect = false
// let timer = null

// const clientId = '7e62d2f0deebe610383183c39ce40b40'

export default {
  name: 'HelloWorld',
  components: {
    msgList,
    Queue
  },
  computed: {
    ...mapState({
      print: (state) => state.Fingerprint
    })
  },
  data() {
    return {
      sourceUrl: '', // 默认来源链接
      dialogShow: false, // 评分弹框
      rateValue: 0, // 评分分数
      type: '', // 排队类型
      file_type: '',
      full_name: '', // 客服名称
      mchid: '', // 获取商户id
      agentId: '', // 代理商客服id
      clientid: '', // 获取用户唯一识别号
      sendMessage: '', // 发送消息
      msgType: 'text', // 发送消息类别
      messageList: [], // 消息列表
      messageNewsList: [], // 聊天总列表
      IsLoading: false, // 加载状态
      Ishidden: false, // 加载历史消息按钮
      Isdisabled: true, // 是否加载历史消息
      IsSendBtn: false, // 发送按钮禁点
      page: 1, // 消息分页
      url: {},
      btnShow: false,
      sendBtn: false,
      dialog_id: '',
      show: false, // 遮罩层
      queueTips: '', // 排队提示
      queueNum: 0, // 排队人数
      queueTicket: '', // 引导文案
      isTitimeout: false, // 是否加入心跳
      timeoutObj: null, // 心跳属性
      serverTimeoutObj: null, // 心跳属性
      timeoutResObj: null // 无响应属性
      // serverTimeoutOpen: true // 心跳开关
    }
  },
  methods: {
    Init(print, urlCode, code) {
      this.IsSendBtn = false
      if (document.referrer) {
        console.log(document.referrer)
        const url = document.referrer.split('?')
        const source = url[0].split('/')
        this.sourceUrl = `${source[0]}//${source[2]}`
      } else {
        this.sourceUrl = ''
      }
      InitList(this.url, this.sourceUrl, print, urlCode, code).then((res) => {
        console.log(res)
        const { data } = res
        this.clientid = data.result.client_id
        if (!data.error) {
          console.log(data)
          this.mchid = data.result.mchinfo.id
          this.agentId = data.result.agent_info.id
          this.full_name = data.result.agent_info.name
          document.title = this.full_name
          this.type = 'init'
          this.ChatRecord(this.mchid, this.clientid, this.page)
          this.isTitimeout = false
          this.initWebSocket()
          return
        }
        if (data.error.code === 405) {
          this.type = 'queue'
          this.mchid = data.result.mchid
          this.isTitimeout = true
          this.initWebSocket()
          return
        }
        if (data.error.code === 401) {
          this.$toast.fail(data.error.message)
        }
        console.log(data.error)
      })
    },
    inputValue() {
      if (this.sendMessage !== '') {
        this.sendBtn = true
      } else {
        this.sendBtn = false
      }
    },
    keyDown(e) {
      if (e.ctrlKey && e.keyCode === 13) {
        // 用户点击了ctrl+enter触发
        this.sendMessage += '\n'
      } else {
        // if (e !== undefined) {
        // 用户点击了enter触发
        // 执行一些逻辑方法
        this.sendTxt('text')
        if (e !== undefined) {
          e.preventDefault()
        // 阻止浏览器默认的敲击回车换行的方法
        }
      }
    },
    // 发送信息
    sendTxt(type, file) {
      // console.log(file)
      const text = this.sendMessage.replace(/\s+|[\r\n]/g, '')
      if (this.sendMessage === '' && type === 'text') {
        this.$toast('请输入您要咨询的问题')
      } else if (text.length === 0 && type === 'text') {
        this.$toast('不能发送空白的信息')
      } else {
        const obj = { }
        obj.type = 'message'
        obj.identity = 'client'
        obj.agent_id = this.agentId
        obj.clientid = this.clientid
        obj.mchid = this.mchid
        if (type === 'text') {
          obj.msg_type = this.msgType
          obj.content = this.sendMessage
          sendMsg(this.mchid, this.clientid, this.sendMessage, type).then((res) => {
            console.log(res)
            this.sendMessage = ''
            this.sendBtn = false
            if (res.data.error) {
              this.$toast.fail(res.data.error.message)
            } else {
              // this.dialog_id = res.data.result.dialog_id
              obj.dialog_id = res.data.result.dialog_id
              if (this.messageList.length !== 0) {
                this.messageList.push(res.data.result)
              }
              this.websocketsend(obj)
            }
          })
        } else {
          obj.msg_type = type
          obj.dialog_id = this.dialog_id
          obj.content = `http://kefu.xuandev.com${file.msg}`
          // console.log(file)
          this.messageList.push(file)
          this.websocketsend(obj)
        }
      }
    },
    // 上传图片
    afterRead(info) {
      console.log(info)
      fileJurisdiction(this.mchid).then((res) => {
        const { data: { result } } = res
        const fileName = info.file.name.split('.')
        if (fileName.length > 1) {
          result.map((item) => {
            if (item.allow_suffix.indexOf(fileName[1]) !== -1) {
              this.type = item.filetype
            }
            return ''
          })
          const FileData = new FormData()
          FileData.append('file', info.file)
          FileData.append('clientid', this.clientid)
          FileData.append('mchid', this.mchid)
          FileData.append('file_type', this.type)
          console.log(FileData.getAll('file'))
          sendFile(FileData).then((resData) => {
            console.log(resData)
            if (resData.data.error) {
              this.$toast(resData.data.error.message)
              return
            }
            console.log(res)
            const { data } = resData
            const url = 'http://kefu.xuandev.com'
            const fileUrl = `${url}${res.data.result.content}`
            this.dialog_id = data.result.dialog_id
            console.log(fileUrl)
            console.log(this.type)
            this.sendTxt(this.type, data.result)
          })
        } else {
          this.$toast('暂不支持该上传的类型')
        }
      })
    },
    // 获取最近聊天记录
    ChatRecord(mchid, clientid, page) {
      getChatRecord(mchid || this.mchid, clientid || this.clientid).then((resList) => {
        const { data: { result } } = resList
        // this.messageNewsList = result.reverse()
        this.messageNewsList = result
        console.log(this.messageNewsList)
        console.log(page)
        this.ChatsList(page)
      })
    },
    ChatsList(page) {
      console.log(page)
      let list = []
      console.log(this.messageNewsList)
      if (this.messageNewsList.length - page > 0) {
        this.Ishidden = true
        this.Isdisabled = false
        console.log(0 + page)
        list = this.messageNewsList[page - 1].son
      } else {
        this.Ishidden = false
        this.Isdisabled = true
        list = this.messageNewsList[this.messageNewsList.length - 1].son
      }
      // console.log(this.messageNewsList)
      // console.log(this.messageNewsList[0])
      // const list = this.messageNewsList[0 + page].son
      console.log(list)
      if (list.conversation.length !== 0) {
        if (this.messageList.length !== 0) {
          console.log(list.conversation.length)
          this.messageList.unshift(...list.conversation)
          // if (list.conversation.length === 0) {
          this.messageList.unshift({
            ...list.merch_auth_welcome[0],
            send_type: 'agent',
            send_welcome: 'welcome'
          })
          // }
          // this.messageList = this.messageList.reverse()
          console.log(this.messageList)
        } else {
          console.log(list)
          console.log(this.messageList)
          this.messageList.push(...list.conversation)
          // console.log(list.merch_auth_welcome)
          this.messageList.unshift({
            ...list.merch_auth_welcome[0],
            send_type: 'agent',
            send_welcome: 'welcome'
          })
        }
      } else {
        this.messageList.unshift({
          ...list.merch_auth_welcome[0],
          send_type: 'agent',
          send_welcome: 'welcome'
        })
      }
    },
    // 评分
    onChange(value) {
      console.log(value)
      sendRate(this.clientid, this.mchid, this.agentId, value).then((res) => {
        console.log(res)
        this.dialogShow = !this.dialogShow
        const obj = {}
        obj.type = 'hint'
        obj.clientid = this.clientid
        obj.evaluate = value
        obj.agent_id = this.agentId
        obj.identity = 'client'
        obj.mchid = this.mchid
        this.websocketsend(obj)
      })
    },
    opendialog() {
      this.dialogShow = !this.dialogShow
      console.log(this.dialogShow)
    },
    IsShow() {
      this.btnShow = !this.btnShow
      const container = this.$el.querySelector('#talk')
      container.scrollTop = container.scrollHeight
    },
    focusInput() {
      this.btnShow = false
    },
    // 初始化weosocket
    initWebSocket() {
      const wsuri = 'ws://120.77.136.31:9501'
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    // 连接建立之后执行send方法发送数据
    websocketonopen() {
      console.log('建立连接')
      if (this.isTitimeout) {
        this.start()
      }
      const actions = { }
      actions.identity = 'client'
      actions.clientid = this.clientid
      // console.log(this.type)
      // console.log(this)
      // actions.mchid = this.mchid
      if (this.type === 'init') {
        actions.mchid = this.mchid
        // actions.mchid = this.url.mchid
        actions.type = this.type
        actions.agent_id = this.agentId
        this.websocketsend(actions)
        return
      }
      actions.mchid = this.mchid
      actions.type = this.type
      this.websocketsend(actions)
    },
    // 连接建立失败重连
    websocketonerror() {
      this.initWebSocket()
    },
    // 数据接收
    websocketonmessage(e) {
      this.start()
      // this.noNewsAgent()
      const redata = JSON.parse(e.data)
      // console.log(redata.type)
      if (redata.type === 'allot_agent') {
        console.log('allot_agent')
        // this.noNewsAgent()
        // this.Init()
        // this.mchid = redata.data.mchid
        this.agentId = redata.data.id
        this.full_name = redata.data.name
        // document.title = this.full_name
        this.ChatRecord(this.mchid, this.clientid)
        this.show = false
      }
      if (redata.type === 'auth') {
        // this.noNewsAgent()
      }
      if (redata.type === 'queue') {
        console.log('queue')
        // this.serverTimeoutOpen = false
        clearTimeout(this.timeoutObj)
        this.show = true
        this.queueNum = redata.data.queue
        this.queueTips = redata.data.intro
        this.queueTicket = redata.data.ticket_intro
        this.full_name = '排队等待中....'
        console.log(this.queueNum)
        // if (this.messageList.length === 0) {
        //   this.messageList.push({ message: redata.message })
        // }
      }
      if (redata.type === 'end_chat') {
        console.log('end_chat')
        // this.serverTimeoutOpen = false
        clearTimeout(this.timeoutObj)
        this.dialogShow = !this.dialogShow
      }
      if (redata.type === 'end_dialog') {
        this.isTitimeout = false
      }
      if (redata.data.send_type) {
        this.messageList.push(redata.data)
        console.log(this.messageList)
      }
    },
    // 数据发送
    websocketsend(Data) {
      console.log(Data)
      // this.noNewsClient()
      this.websock.send(JSON.stringify(Data))
    },
    // 关闭
    websocketclose(e) {
      console.log('断开连接', e)
      this.IsSendBtn = true
      this.$toast('你已断开链接，请刷新页面')
      // this.reconnect()
      // this.initWebSocket()
    },
    // 心跳反应
    start() {
      console.log('开始测试心跳')
      if (this.timeoutObj) clearTimeout(this.timeoutObj)
      if (this.serverTimeoutObj) clearTimeout(this.serverTimeoutObj)
      this.timeoutObj = setTimeout(() => {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息，
        console.log('发送消息，测试后台是否运行中...')
        // 任意发一个消息过去，后台接收，在init()中的onmessage收到消息，说明后台没有挂掉，有心跳
        const obj = {}
        obj.type = 'ping'
        obj.clientid = this.clientid
        obj.agent_id = this.agentId
        obj.identity = 'client'
        obj.mchid = this.mchid
        console.log(obj)
        // if (this.serverTimeoutOpen) {
        this.websocketsend(obj)
        // }
        this.serverTimeoutObj = setTimeout(() => {
          console.log('后台挂掉，没有心跳了....')
          // this.websocketclose()
        }, 30000)
      }, 15000)
    }
  },
  created() {
    const params = {}
    if (window.location.search !== '') {
      const arrs = window.location.search.slice(1).split('&')
      console.log(arrs)
      arrs.forEach((val) => {
        const arr = val.split('=')
        const content = arr[1]
        params[arr[0]] = content
        // console.log(arr, arr[1]);
      })
    }
    console.log(params)
    // console.log(this.url, window.location.search)
    this.url = params
    const obj = {
      source_url: window.location.href,
      agentid: this.url.agentid,
      groupid: this.url.groupid,
      mchid: this.url.mchid
    }
    this.url = obj
    // console.log(this.url)
    returnCode().then((res) => {
      const { data: { result } } = res
      Fingerprint2.get((components) => {
        const values = components.map((component, index) => {
          if (index === 0) { // 把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
            return component.value.replace(/\bNetType\/\w+\b/, '')
          }
          return component.value
        })
        // 生成最终id murmur
        const murmur = Fingerprint2.x64hash128(values.join(''), 31)
        console.log(`浏览器指纹码：${murmur}`)
        // this.$store.commit('setPrint', murmur)
        const urlCode = md5(sha1(murmur + result.code))
        console.log(urlCode)
        this.Init(murmur, urlCode, result.random_code)
      })
    })
  },
  mounted() {
    // this.$nextTick(() => {
    //   console.log(this.full_name)
    //   document.title = this.full_name
    // })
    // this.$socket.emit('MESSAGE', { subscribe: true }) // 在页面加载时发起订阅，“STREAM_STATUS”是你跟后端约定好的主题名
  },
  watch: {
    messageList(newdata, old) {
      console.log(newdata, old)
      const that = this
      that.$nextTick(() => {
        console.log(that.$refs.msgList)
        const container = that.$refs.msgList.$el.querySelector('#talk')
        const container2 = that.$refs.msgList2.$el.querySelector('#talk')
        if (container.scrollHeight !== 0) {
          container.scrollTop = container.scrollHeight
        } else {
          container2.scrollTop = container2.scrollHeight
        }
        console.log(container, container.scrollHeight, container2.scrollHeight)
      })
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.msg{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .pc{
    width: 60vw;
    background: #fff;
    border-radius: 15px;
    border: 1px solid #ccc;
    overflow: hidden;
    .msgheader{
      width: 100%;
      background:#fd523e;
      h3{
        color: #fff;
        padding: 10px 0;
        margin: 0;
      }
    }
    .msgLeft{
      width: 65%;
      float: left;
      padding-top: 10px;
      // position: relative;
      // .lineUp{
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   z-index: 99;
      //   width: 100%;
      //   height: 100%;
      //   background: #000000b3;
      //   h3{
      //     color: #fff;
      //   }
      // }
    }
    .msgavatar{
      width: 35%;
      float: right;
      text-align: left;
    }
  }
}
.mobile{
  // border-radius: 15px;
  padding: 44px 0 20px;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #e6e6e6;
  box-sizing: border-box;
  .header{
    position: fixed;
    top: 0px;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 10;
    h3{
      padding: 10px 0;
      margin: 0;
      color: #0a0a0a;
      font-weight: 500;
    }
  }
  .msgfooter{

  }
}
.msgSend{
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  background-color: #f6f6f6;
}
.msgSendInput{
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 10px;
  ::v-deep .van-cell{
    padding: 0;
    border-radius: 5px;
  }
}
.msgSend ::v-deep .van-field__control{
  height: 33px!important;
}
.chooseBtn{
  margin-left: 10px;
  border-radius: 15px;
}
.chooseRow{
  background: #f6f6f6;
  border-top: 1px solid #ccc;
}
.choose{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}
.choose span{
  font-size: 12px;
  margin-top: 7px;
}
h3 {
  margin: 40px 0 0;
}
.Isshow{
  display: block;
}
.Ishidden{
  display: none;
}
.van-overlay{
  background: #fff;
  z-index: 11;
}
// .wrapper {
//   display: flex;
//   // align-items: center;
//   justify-content: center;
//   height: 100%;
// }
// .block {
//   width: 100%;
//   height: 120px;
//   // background-color: #fff;
// }
.popup{
  padding: 30px;
}
.popupTitle{
  font-size: 20px;
  font-weight: bolder;
  line-height: 30px;
}
.rate {
  margin: 20px auto;
}
// 下面tab栏
.msg-tab{
  // padding: 0 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
  // position: fixed;
  // left: 0;
  // bottom: 58px;
  width: 100%;
  height: 30px;
  // z-index: 10;
  padding-bottom: 0;
  flex-wrap: nowrap;
  overflow: auto;
  background-color: #e6e6e6;
  padding-bottom: 8px;
  .tab-item{
    margin-right: 12px;
    padding: 5px 10px;
    background-color: #fff;
    color: #6c6c6c;
    border-radius: 15px;
    flex:0 0 auto;
    text-align: center;
  }
}
@media screen and (min-width: 767px) {
  .mobile{
    display: none;
  }
  .msg{
    background: #eee;
  }
}
@media screen and (max-width: 767px) {
  .msg {
    background: #fff;
  }
  .pc{
    display: none;
  }
}
</style>
