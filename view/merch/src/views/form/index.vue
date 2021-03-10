<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-row>
      <a-col :xs="8" :lg="5" :xl="5" :xxl="5">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="当前对话">
            <div v-for="(item, index) in clientList" :key="index">
              <div
                class="clientInfoList"
                @click="openClient(item.info.id, item.info.client_identify, item.info.dialog_id)"
              >
                <a-col :xs="17" :md="19">
                  <a-card-meta :title="item.other.district" :description="item.newest_message.msg">
                    <a-avatar
                      size="small"
                      slot="avatar"
                      :src="item.Img ? this.Img : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'"
                    />
                    <a-badge slot="avatar" :count="item.info.unread" class="clientBadge" />
                  </a-card-meta>
                </a-col>
                <a-col :xs="7" :md="5">
                  <span>{{ item.newest_message !=='' ? item.newest_message.send_time.split(' ')[1] : '' }}</span>
                  <br>
                  <span>{{ item.is_line !== 0 ? '在线' : '离线' }}</span>
                  <!-- <a-button type="danger" shape="circle" icon="close" size="small" @click="chatClose"/> -->
                </a-col>
              </div>
            </div>
          </a-tab-pane>
          <!-- <a-tab-pane key="2" tab="排队列表">
            <p>Content of Tab Pane 2</p>
          </a-tab-pane> -->
        </a-tabs>
      </a-col>
      <a-col :xs="16" :lg="19" :xl="12" :xxl="14">
        <a-card :title="clientTile" style="margin:0 auto;width:92%" class="newsList">
          <a-button v-if="clientTile!==''" slot="extra" @click="pushModal">推送</a-button>
          <create-modal
            ref="createModal"
            :visible="modalListVisible"
            :loading="confirmLoading"
            @cancel="handleCancel"
            @ok="pushClientOk"
            :type="'list'"
            :mchid="mchid"
            :clientid="clientid ? clientid : 0"
            :agentName="agentName"
            :agentId="agentId ? agentId : 0"
          />
          <create-modal
            ref="createModal"
            :visible="show_is_agree"
            :loading="confirmLoading"
            @cancel="pushRejecCancel"
            @ok="pushAgreeOk"
            :type="'push'"
            :mchid="mchid"
            :clientid="clientid ? clientid : 0"
            :agentName="agentName"
            :agentId="agentId ? agentId : 0"
          />
          <create-modal
            ref="createModal"
            :visible="is_push_back"
            :loading="confirmLoading"
            @cancel="isReadMsg"
            @ok="isReadMsg"
            :type="'pushback'"
            :isconsent="push_back_is_consent"
          />
          <create-modal
            ref="createModal"
            :visible="show_is_agree_back"
            :loading="confirmLoading"
            @cancel="isAgreeback"
            @ok="isAgreeback"
            :type="'agreeback'"
          />
          <div class="msgList" ref="msgList">
            <a-list bordered :data-source="clientNews" class="clientList">
              <a-button
                v-show="Ishidden"
                slot="header"
                type="link"
                :loading="IsLoading"
                :disabled="Isdisabled"
                @click="getMore">
                {{ Ishidden ? '查看上一次对话消息' : '已经是最近的对话信息了' }}
              </a-button>
              <a-list-item slot="renderItem" slot-scope="item">
                <div v-if="item.action" style="text-align : center">
                  {{ item.create_time }}<br>
                  {{ item.action }}
                </div>
                <div v-if="!item.action" >
                  <div :style="item.send_type === 'agent'? 'textAlign : right' : 'textAlign : left'">
                    {{ item.create_time }}
                  </div>
                  <span v-if="item.send_type === 'agent'">
                    <a-avatar
                      style="backgroundColor:#87d068"
                      :style="item.send_type === 'agent'? 'float : right' : 'float : left'"
                      :size="24"
                      icon="user"
                    />
                  </span>
                  <span v-if="item.send_type !== 'agent'">
                    <a-avatar
                      :style="item.send_type !== 'agent'? 'float : left' : 'float : right'"
                      :size="24"
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                  </span>
                  <p :style="item.send_type === 'agent'? 'float : right' : 'float : left'">
                    <span v-if="item.msg_type === 'text'">{{ item.msg }}</span>
                    <img
                      v-else-if="item.msg_type === 'image'"
                      :src="item.msg.indexOf('http') !== -1 ? item.msg : `http://kefu.xuandev.com${item.msg}` "
                      width="100px"
                      @click="changImg(item.msg.indexOf('http') !== -1 ? item.msg : `http://kefu.xuandev.com${item.msg}`)">
                    <a :href="`http://kefu.xuandev.com${item.msg}`" v-else class="fileType">
                      <a-icon type="file-zip" />
                    </a>
                  </p>
                </div>
              </a-list-item>
            </a-list>
          </div>
        </a-card>
        <a-col :span="22" :offset="1">
          <a-textarea
            placeholder="Controlled autosize"
            :auto-size="{ minRows: 5, maxRows: 5 }"
            v-model="sendMsg"
            :disabled="IsSendDisabled"
            v-on:keydown.enter.prevent
            @keyup.enter.native="keyDown"/>
        </a-col>
        <a-col :span="22" :offset="1">
          <a-button type="primary" @click="onSubmit('text')" :disabled="IsSendDisabled">
            发送
          </a-button>
          <!-- </a-tooltip> -->
          <a-button @click="chatClose" :disabled="IsSendDisabled">
            关闭聊天
          </a-button>
          <SendImg :mchid="mchid" :clientid="clientid" @onSubmit="onSubmit" :IsDisabled="IsSendDisabled"/>
          <create-modal
            ref="createModal"
            :visible="modalVisible"
            :loading="confirmLoading"
            @cancel="handleCancel"
            @ok="endChatOk"
            :type="'text'"
          />
        </a-col>
      </a-col>
      <a-col :xs="0" :lg="0" :xl="7" :xxl="5">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="客户">
            <a-avatar
              :size="64"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <span class="descriptName">{{ clientTile }}</span>
            <a-collapse v-model="activeKey">
              <a-collapse-panel key="1" header="访问">
                <CreateDescript class="CreateDescript" :clientInf="clientInf"/>
              </a-collapse-panel>
              <a-collapse-panel key="2" header="名片">
                <CreateFormModel :clientCard="clientCard"/>
              </a-collapse-panel>
              <a-collapse-panel key="3" header="历史">
                <p>历史</p>
              </a-collapse-panel>
              <a-collapse-panel key="4" header="工单">
                <p>工单</p>
              </a-collapse-panel>
            </a-collapse>
          </a-tab-pane>
          <a-tab-pane key="2" tab="快捷" @click="handleClick">
            <!-- <p>123</p> -->
            <NewsTree :mchid="this.mchid" :IsDisabled="IsSendDisabled" @itemclick="cpnclick"/>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelImg">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </a-card>
</template>

<script>
import { sendMsg, getClientList, getChats, endChat, clearMessage, pushAgree } from '../../network/websocket'
import Cookies from 'js-cookie'
import CreateModal from './child/modal'
import CreateDescript from './child/Descript'
import SendImg from './child/sendImg'
import NewsTree from './child/newsTree'
import CreateFormModel from './child/FormModel'

// const user = {
//   account: '964607466@qq.com',
//   password: '123456789'
// }
let lockReconnect = false
let timer = null

export default {
  name: 'Websocket',
  components: {
    CreateModal,
    CreateDescript,
    SendImg,
    NewsTree,
    CreateFormModel
  },
  data () {
    return {
      clientInf: {}, // 访客信息
      show: true, // 徽标数显示
      clientList: [], // 当前对话列表
      mchid: 0, // 获取商户id
      agentId: '', // 客服id
      agentName: '', // 客服名称
      clientid: 0, // 获取客户端id
      clientTile: '', // 客户名称
      clientNews: [], // 当前聊天列表
      IsSendDisabled: true, // 发送按钮禁用
      sendMsg: '', // 发送信息
      visible: false, // 发送信息提示
      msgType: 'text', // 发送类型
      data: '', // 消息列表
      IsLoading: false, // 加载状态
      Ishidden: false, // 加载历史消息按钮
      Isdisabled: true, // 是否加载历史消息
      page: 1, // 默认最近一段聊天记录
      clientNewsList: [], // 聊天总列表
      is_result: 1, // 对话是否有效
      modalVisible: false,
      modalListVisible: false,
      btnLoading: false,
      confirmLoading: false,
      text: '',
      show_is_agree: false,
      push_data: {},
      reject_push: '',
      is_push_back: false,
      push_back_is_consent: 0,
      show_is_agree_back: false,
      activeKey: ['1'],
      clientCard: {},
      previewVisible: false,
      previewImage: ''
    }
  },
  watch: {
    // activeKey (key) {
    //   console.log(key)
    // },
    clientNews (newdata, old) {
      console.log(newdata, old)
      const that = this
      that.$nextTick(() => {
        console.log(that.$refs.msgList)
        const container = that.$refs.msgList
        container.scrollTop = container.scrollHeight
        console.log(container, container.scrollHeight)
      })
    }
  },
  computed: {
  },
  methods: {
    // 获取聊天窗口
    openClient (id, clientName, dialogid) {
      this.IsSendDisabled = false
      // console.log(`'openClient_id :'${id}`)
      // console.log(this.$refs.countShow)
      this.page = 1
      this.dialog_id = dialogid
      this.clientid = id
      this.clientTile = clientName.substr(0, 20) + '...'
      this.clientInf = this.clientList.find(item => item.info.id === id).other
      this.clientCard = this.clientList.find(item => item.info.id === id).info
      // console.log(this.clientCard)
      this.clientNews = []
      this.Chats(this.mchid, this.clientid)
      clearMessage(this.mchid, this.clientid).then((res) => {
        // console.log(res)
        if (res.success.message === '清除成功') {
          this.clientList.find(item => item.info.id === id).info.unread = 0
        }
      })
    },
    // 调用newsTree组件方法
    handleClick () {
      this.$refs.child.getMsgList()
    },
    // 快捷回复
    cpnclick (item) {
      console.log(item)
      if (!this.IsSendDisabled) {
        this.sendMsg = item
        return
      }
      this.$message.error('未选择对话客户')
    },
    keyDown (e) {
      if (e.ctrlKey && e.keyCode === 13) {
        // 用户点击了ctrl+enter触发
        this.sendMsg += '\n'
      } else {
        // if (e !== undefined) {
        // 用户点击了enter触发
        // 执行一些逻辑方法
        this.onSubmit('text')
        if (e !== undefined) {
          e.preventDefault()
        // 阻止浏览器默认的敲击回车换行的方法
        }
      }
    },
    // 发送消息
    onSubmit (type, file) {
      const text = this.sendMsg.replace(/\s+|[\r\n]/g, '')
      if ((this.sendMsg === '' && type === 'text') || (text.length === 0 && type === 'text')) {
        // this.visible = true
        this.$message.error('发送的内容为空，请重新输入')
      } else {
        // this.visible = false
        this.msgType = type
        console.log(this.msgType)
        if (this.msgType === 'text') {
          sendMsg(this.mchid, this.clientid, this.sendMsg, this.msgType).then((res) => {
            if (res.error) {
              this.$message.error('发送信息有误')
            }
            console.log(res)
            const { result } = res
            console.log(result)
            // if (this.clientNews.length !== 0) {
              this.clientNews.push(result)
              console.log(this.clientNews)
            // }
          })
        }
        if (this.msgType === 'image') {
          this.clientNews.push(file)
        }
        // getChats(this.mchid, this.clientid).then((resList) => {
        //   const { result } = resList
        //   console.log(result)
        //   if (this.clientNews.length !== 0) {
        //     this.clientNews.push(result[0].son[0])
        //     console.log(this.clientNews)
        //   }
        // })
        const obj = { }
        obj.type = 'message'
        obj.identity = 'agent'
        obj.agent_id = this.agentId
        obj.clientid = this.clientid
        obj.mchid = this.mchid
        obj.dialog_id = this.dialog_id
        if (type === 'text') {
          obj.msg_type = this.msgType
          obj.content = this.sendMsg
        } else {
          obj.msg_type = type
          obj.content = `http://kefu.xuandev.com${file.msg}`
        }
        this.websocketsend(obj)
        this.sendMsg = ''
      }
    },
    // sendLoadFile () {
    //   sendFile(this.clientid, this.mchid, this.file, this.type).then((res) => {
    //     console.log(res)
    //     // this.$message.success('上传成功！')
    //   })
    // },
    // 关闭聊天窗口
    chatClose () {
      this.modalVisible = true
    },
    // 弹框确认关闭聊天
    endChatOk () {
      this.btnLoading = true
      this.confirmLoading = true
      setTimeout(() => {
        this.modalVisible = false
        this.btnLoading = false
        this.confirmLoading = false
        endChat(this.mchid, this.clientid, this.is_result).then((res) => {
          console.log(res.success.code)
          const actions = { }
          actions.agent_id = this.agentId
          actions.clientid = this.clientid
          actions.mchid = this.mchid
          actions.type = 'end_chat'
          actions.identity = 'agent'
          this.websocketsend(actions)
          this.clientNews = []
          this.IsSendDisabled = true
          this.Ishidden = false
          this.clientTile = ''
          this.ClientList(this.mchid)
          this.dialog_id = ''
        })
      }, 3000)
    },
    // 收到另一个客服的消息
    isReadMsg () {
      this.is_push_back = false
    },
    isAgreeback () {
      this.show_is_agree_back = false
    },
    // 推送窗口
    pushModal () {
      console.log('clientid==', this.clientid)
      this.modalListVisible = true
    },
    // 弹框同意转接
    pushAgreeOk () {
      const that = this
      this.reject_push = false
      this.show_is_agree = false
      const pushData = { }
      pushData.agent_id = this.push_data.push_id
      pushData.id = this.push_data.id
      pushData.client_id = this.push_data.clientid
      pushData.objection = ''
      pushData.mchid = this.mchid
      pushData.is_consent = 1
      this.show_is_agree_back = true
      pushAgree(pushData).then((res) => {
        console.log(res)
        that.websocketonopen()
      })
    },

    // 弹框拒绝转接
    pushRejecCancel () {
      const that = this
      this.show_is_agree = false
      this.reject_push = true
      const pushData = { }
      pushData.agent_id = this.push_data.push_id
      pushData.id = this.push_data.id
      pushData.client_id = this.push_data.clientid
      pushData.objection = '我现在有事，不能转接消息'
      pushData.mchid = this.mchid
      pushData.is_consent = 0
      pushAgree(pushData).then((res) => {
        console.log(res)
        that.websocketonopen()
      })
    },

    // 弹框推送客户
    pushClientOk () {
    },
    // 弹框取消
    handleCancel () {
      this.modalVisible = false
      this.modalListVisible = false
    },
    // 加载上一页
    getMore () {
      this.IsLoading = true
      this.page += 1
      // this.Chats(this.mchid, this.clientid)
      this.ChatsList()
      setTimeout(() => {
        this.IsLoading = false
      }, 1000)
    },
    // 获取历史消息
    Chats (mchid, clientid) {
      getChats(mchid, clientid).then(res => {
        const { result } = res
        console.log(result)
        this.clientNewsList = result.reverse()
        console.log(result)
        console.log(this.clientNewsList)
        this.ChatsList()
      })
    },
    // 消息列表
    ChatsList () {
      // console.log(111111111111111111111111111)
      if (this.clientNewsList.length - this.page >= 1) {
        this.Ishidden = true
        this.Isdisabled = false
      } else {
        this.Ishidden = false
        this.Isdisabled = true
      }
      const list = this.clientNewsList[this.clientNewsList.length - this.page].son.reverse()
      console.log(list)
      // console.log(this.page)
      // console.log(this.clientNewsList[result.length - this.page].son.reverse())
      if (this.clientNews !== []) {
        console.log(list)
        this.clientNews.unshift(...list)
        console.log(this.clientNews)
      } else {
        console.log(list)
        this.clientNews.push(...list)
      }
    },
    // 获取对话列表
    ClientList (mchid, id) {
      getClientList(mchid).then(res => {
        console.log(res)
        if (res.result.length === 0) {
          this.clientList = []
          this.clientNews = []
          this.clientTile = ''
        } else {
          // this.clientList = res.result
          console.log(this.clientList)
          // 获取未读消息的客户
          const unreadList = []
          var j = 0
          for (const i in res.result) {
            if (res.result[i].info.unread > 0) {
              unreadList[j++] = res.result[i]
            }
          }
          console.log(unreadList)
          if (unreadList.length === 0) {
            this.clientList = res.result
          } else {
            // 对未读消息排序
            const newMsglist = unreadList.sort((a, b) => {
              return b.newest_message.send_time < a.newest_message.send_time ? -1 : 1
            })
            console.log(newMsglist)
            const List = res.result.filter(item => item.info.unread === 0)
            console.log(List)
            console.log(newMsglist, ...List)
            this.clientList = [...newMsglist, ...List]
            console.log(this.clientList)
          }
        }
      })
    },
    // 初始化weosocket
    initWebSocket () {
      console.log('initWebSocket')
      const wsuri = 'ws://120.77.136.31:9501'
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    // 连接建立之后执行send方法发送数据
    websocketonopen () {
      console.log('建立连接')
      const actions = { }
      if (this.push_data.type === 'push') {
        actions.agent_id = this.agentId
        actions.id = this.push_data.id
        actions.clientid = this.push_data.clientid
        actions.type = 'push'
        actions.objection = this.reject_push === true ? '我现在有事，不能转接消息' : ''
        actions.mchid = this.mchid
        actions.is_consent = this.reject_push === true ? 0 : 1
        actions.push_id = this.push_data.push_id
        this.websocketsend(actions)
        this.reject_push = ''
        return
      }
      actions.agent_id = this.agentId
      actions.agent_name = this.agentName
      actions.mchid = this.mchid
      actions.type = 'init'
      actions.identity = 'agent'
      // console.log(actions)
      this.websocketsend(actions)
      // setInterval(this.Webtimer('1'), 100)
    },
    // 连接建立失败重连
    websocketonerror () {
      this.initWebSocket()
    },
    // 数据接收
    websocketonmessage (e) {
      const redata = JSON.parse(e.data)
      console.log(redata)
      // if (redata.type === 'client_end_dialog') {
      //   this.ClientList(this.mchid, redata)
      // }
      if (redata.type === 'message' || redata.type === 'client_end_dialog') {
        this.ClientList(this.mchid, redata)
      }
      if (redata.data.send_type) {
        if (this.clientNews.length !== 0) {
          this.clientNews.push(redata.data)
        }
      }
      // 弹框喽
      if (redata.type === 'push') {
        this.show_is_agree = true
        this.push_data = redata
        console.log('push_data========', this.push_data)
      }
      if (redata.type === 'client') {
        const data = Cookies.get('result')
        console.log(JSON.parse(data), this)
        const result = JSON.parse(data)
        console.log(Cookies.get('UserId'))
        Cookies.set('UserToken', result.token)
        Cookies.set('UserId', result.id)
        this.mchid = result.merch.id
        this.agentId = result.id
        this.agentName = result.name
        console.log(this.mchid, this.agentId)
        this.ClientList(this.mchid)
      }
      // 弹框消失
      if (redata.type === 'pushback') {
        this.modalListVisible = false
        // this.is_push_back = true
        // this.push_back_is_consent = redata.is_consent
        const data = Cookies.get('result')
        // console.log(JSON.parse(data), this)
        const result = JSON.parse(data)
        // console.log(Cookies.get('UserId'))
        Cookies.set('UserToken', result.token)
        Cookies.set('UserId', result.id)
        // localStorage.setItem('UserToken ', JSON.stringify(token))
        // localStorage.setItem('UserId ', JSON.stringify(id))
        // const mchid = res.result.merch.id
        this.mchid = result.merch.id
        this.agentId = result.id
        this.agentName = result.name
        // console.log(this.mchid, this.agentId)
        this.ClientList(this.mchid)
      }
    },
    // 数据发送
    websocketsend (actions) {
      console.log(actions)
      const Data = JSON.stringify(actions)
      this.websock.send(Data)
    },
    // 关闭链接
    websocketclose (e) {
      this.$message.error('你已断开连接')
      console.log('断开连接', e)
      this.reconnect()
    },
    // 防抖函数
    reconnect () {
      if (lockReconnect) {
        return
      }
      lockReconnect = true
      // 没连接上会一直重连，设置延迟避免请求过多
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        this.initWebSocket()
        console.log('防抖重连')
        lockReconnect = false
      }, 6000000)
    },
    // 查看发送图片
    handleCancelImg () {
      this.previewVisible = false
    },
    changImg (imgUrl) {
      this.previewVisible = true
      this.previewImage = imgUrl
    }
  },
  created () {
    var data = Cookies.get('result')
    const result = JSON.parse(data)
    Cookies.set('UserToken', result.token)
    Cookies.set('UserId', result.id)
    this.mchid = result.merch.id
    this.agentId = result.id
    this.agentName = result.name
    console.log(this.mchid, this.agentId)
    this.initWebSocket()
    this.ClientList(this.mchid)
  }
}
</script>

<style scoped>
.clientInfoList{
  overflow: hidden;
  margin: 30px 0;
}
.newsList ::v-deep .ant-card-body{
  padding: 0;
}
.clientList{
  overflow: hidden;
  margin: 0;
  border: none;
}
::v-deep .ant-list-split .ant-list-header{
  border-bottom: none;
  text-align: center;
}
.msgList{
  height: 56vh;
  overflow: scroll;
  /* padding-bottom: 100px; */
}
.msgList .ant-list-item{
  overflow: hidden;
}
.msgList p{
  max-width: 85%;
  display: inline-block;
  margin: 2px 10px;
  word-wrap:break-word;
  background: #dfeaea;
  padding: 5px 8px;
  border-radius: 5px;
}
::v-deep .ant-card-meta-avatar{
  padding-top: 7px;
  padding-right: 5px;
}
.ant-avatar{
  width: 50px;
  height: 50px;
}
.clientBadge{
  top: -18px;
  right: 16px;
}
.clientList .ant-list-item{
  display: block;
  border-bottom: none;
}
.clientList .fileType{
    font-size: 50px;
  }
.CreateDescript{
  margin-top: 15px;
}
.descriptName{
  font-size: 16px;
  font-weight: bolder;
}
</style>
