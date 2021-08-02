<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <a-card :body-style="{padding: '10px'}" :bordered="false">
    <a-row>
      <a-col :xs="8" :lg="4" :xl="5" :xxl="4">
        <a-tabs>
          <a-tab-pane key="1" tab="当前对话" class="clientList">
            <div v-for="(item, index) in clientList" :key="index" @click="clientBg(index, item)">
              <div
                class="clientInfoList"
                :class="changeColor === item.info.id ? 'clientBgColor' : ''"
                @click="openClient(item.info.id, item.info.client_identify, item.info.dialog_id)"
              >
                <a-col :xs="16" :md="18">
                  <a-card-meta :title="item.other.district" :description="item.newest_message.msg ? String(item.newest_message.msg).length > 10 ? String(item.newest_message.msg).substr(0, 10) + '...' : item.newest_message.msg : ''">
                    <a-avatar
                      size="small"
                      slot="avatar"
                      :src="item.Img ? this.Img : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'"
                    />
                    <a-badge slot="avatar" :count="item.info.unread" class="clientBadge" />
                  </a-card-meta>
                </a-col>
                <a-col :xs="8" :md="6" class="userLine">
                  <span>{{ item.newest_message.send_time ? item.newest_message.send_time.split(' ')[1] : '' }}</span>
                  <br v-show="item.newest_message">
                  <span>{{ item.info.is_line === 1 ? '在线' : '离线' }}</span>
                </a-col>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :xs="16" :lg="20" :xl="!IsSendDisabled ? 13 : 19" :xxl="!IsSendDisabled ? 15 : 20">
        <a-card :title="clientTile" :class="!IsSendDisabled ? 'newsList' : 'newsListDisabled'">
          <a-button v-if="clientTile!==''" slot="extra" @click="pushModal">推送</a-button>
          <create-modal
            ref="createModal"
            :visible="modalListVisible"
            :loading="confirmLoading"
            @pushInfo="pushInfoChild"
            @cancel="handleCancel"
            @ok="pushClientOk"
            :type="'list'"
            :mchid="mchid"
            :clientid="clientid ? clientid : 0"
            :agentName="agentName"
            :agentId="agentId ? agentId : 0"
          />
          <div class="msgList" ref="msgList">
            <a-list bordered :data-source="clientNews" class="clientNews">
              <a-button
                v-show="oldNewBtn && !getMoreBtn"
                slot="header"
                type="link"
                :loading="IsLoading"
                :disabled="Isdisabled"
                @click="getMoreMsg">
                查看上一次对话消息
              </a-button>
              <a-button
                v-show="getMoreBtn"
                slot="header"
                type="link"
                :loading="IsLoading"
                @click="getMore">
                加载更多消息
              </a-button>
              <a-button
                v-show="!oldNewBtn && !getMoreBtn && NewBtn"
                slot="header"
                type="link"
                disabled>
                已经是最近的对话信息了
              </a-button>
              <a-list-item slot="renderItem" slot-scope="item">
                <div v-if="item.action" style="text-align : center">
                  {{ item.create_time }}<br>
                  {{ item.action }}
                </div>
                <div v-else >
                  <div :style="item.send_type === 'agent'? 'textAlign : right' : 'textAlign : left'">
                    {{ item.create_time }}
                  </div>
                  <span v-if="item.send_type === 'agent'">
                    <a-avatar
                      style="backgroundColor:#1890ffd4"
                      :style="item.send_type === 'agent'? 'float : right' : 'float : left'"
                      :size="24"
                      :src="NewsListIcon"
                    />
                  </span>
                  <span v-else>
                    <a-avatar
                      :style="item.send_type !== 'agent'? 'float : left' : 'float : right'"
                      :size="24"
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                  </span>
                  <p :style="item.send_type === 'agent'? 'float : right' : 'float : left'">
                    <span v-if="item.msg_type === 'text'" class="msgText">{{ item.msg }}</span>
                    <img
                      v-else-if="item.msg_type === 'image'"
                      :src="item.msg.indexOf('http') !== -1 ? item.msg : `${imgUrl}${item.msg}` "
                      width="100px"
                      @click="changImg(item.msg.indexOf('http') !== -1 ? item.msg : `${imgUrl}${item.msg}`)">
                    <a :href="`${imgUrl}${item.msg}`" v-else class="fileType">
                      <a-icon type="file-zip" />
                    </a>
                  </p>
                </div>
              </a-list-item>
            </a-list>
          </div>
        </a-card>
        <a-col :span="24" v-show="!IsSendDisabled">
          <div class="sendIamge" :class="IsSendDisabled ? 'dissendIamgebg' : 'sendIamgebg'">
            <SendImg :mchid="mchid" :clientid="clientid" @onSubmit="onSubmit" :isDisabled="IsSendDisabled"/>
          </div>
          <a-textarea
            placeholder="发送内容,或“Enter”发送内容"
            :auto-size="{ minRows: 5, maxRows: 5 }"
            v-model="sendMsg"
            class="sendMsg"
            :disabled="IsSendDisabled"
            @keydown.enter.prevent
            @focus="getTextarea"
            @keyup.enter.native="keyDown"/>
          <div class="sendBtn">
            <a-button type="primary" @click="onSubmit('text')" :disabled="IsSendDisabled">
              发送
            </a-button>
            <!-- </a-tooltip> -->
            <a-button @click="chatClose" :disabled="IsSendDisabled">
              关闭聊天
            </a-button>
          </div>
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
      <a-col v-if="clientTile !== ''" :xs="0" :lg="0" :xl="6" :xxl="5" >
        <a-tabs default-active-key="1" class="tabCard">
          <a-tab-pane key="1" tab="客户" class="tabClass">
            <a-avatar
              style="margin-left: 10px;"
              :size="48"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <span class="descriptName">{{ clientTile }}</span>
            <CreateDescript class="createDescript" :clientInf="clientInf"/>
          </a-tab-pane>
          <a-tab-pane key="2" tab="名片" class="tabClass" @click="handleClick">
            <a-avatar
              style="margin-left: 10px;"
              :size="48"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <span class="descriptName">{{ clientTile }}</span>
            <CreateFormModel class="createDescript" :clientCard="clientCard"/>
          </a-tab-pane>
          <a-tab-pane key="3" tab="快捷" class="tabClass" @click="handleClick">
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
import {
  sendMsg,
  getClientList,
  getChats,
  endChat,
  clearMessage,
  pushAgree
} from '../../network/Interface/dialogue'
// import Cookies from 'js-cookie'
import CreateModal from './child/modal'
import CreateDescript from './child/Descript'
import SendImg from './child/sendImg'
import NewsTree from './child/newsTree'
import CreateFormModel from './child/FormModel'
// import TreeListVue from '../other/TreeList.vue'

// const user = {
//   account: '964607466@qq.com',
//   password: '123456789'
// }
let lockReconnect = false
let timer = null
const myDate = new Date()
const h = myDate.getHours() >= 10 ? myDate.getHours() : `0${myDate.getHours()}`
const m = myDate.getMinutes() >= 10 ? myDate.getMinutes() : `0${myDate.getMinutes()}`
const s = myDate.getSeconds() >= 10 ? myDate.getSeconds() : `0${myDate.getSeconds()}`

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
      Ishidden: false, // 选中聊天
      NewBtn: false, // 到底聊天记录
      oldNewBtn: false, // 加载上一段聊天
      getMoreBtn: false, // 加载更多消息按钮
      getMorepage: 0, // 默认加载更多消息页码
      Isdisabled: true, // 是否加载历史消息
      page: 1, // 默认最近一段聊天记录
      clientNewsList: [], // 聊天总列表
      hostSatus: false, // 判断聊天列表位置
      is_result: 1, // 对话是否有效
      arrlist: [], // 缓存聊天信息分组
      NewsListIcon: this.$store.state.userAvatar.indexOf('http') === -1 ? `${this.$store.state.userUrl}${this.$store.state.userAvatar}` : 'http://kefu.xuandev.com/agent/avatar2.jpg', // 聊天列表头像
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
      previewImage: '',
      changeColor: 0,
      imgUrl: '' // 图片域名
    }
  },
  computed: {
    clientNewsListLength () {
      return this.clientNews.length
    }
  },
  watch: {
    clientNewsListLength (newdata, old) {
      const that = this
      if (that.hostSatus === false) {
        that.$nextTick(() => {
          const container = that.$refs.msgList
          container.scrollTop = container.scrollHeight
        })
      }
    }
  },
  methods: {
    // 列表选择聊天对象
    clientBg (index, item) {
      this.changeColor = item.info.id
      clearMessage(this.mchid, this.clientid).then((res) => {
        if (res.success.message === '清除成功') {
          item.info.unread = 0
          this.readedMsg()
        }
      })
    },
    // 获取聊天窗口
    openClient (id, clientName, dialogid) {
      if (this.changeColor !== id) {
        this.NewBtn = true
        this.IsSendDisabled = false
        this.page = 1
        this.dialog_id = dialogid
        this.clientTile = clientName.substr(0, 15) + '...'
        this.clientInf = this.clientList.find(item => item.info.id === id).other
        this.clientCard = this.clientList.find(item => item.info.id === id).info
        if (this.clientid !== id) {
          this.clientNews = []
          this.clientid = id
        }
        this.Chats(this.mchid, this.clientid)
      }
    },
    // 获取文本框焦点
    getTextarea () {
      this.readedMsg()
    },
    // 显示已读信息
    readedMsg () {
      const obj = {}
      obj.type = 'msg_read'
      obj.identity = 'agent'
      obj.agent_id = this.agentId
      obj.mchid = this.mchid
      obj.clientid = this.clientid
      this.websocketsend(obj)
    },
    // 调用newsTree组件方法
    handleClick () {
      this.$refs.child.getMsgList()
    },
    // 快捷回复
    cpnclick (item) {
      console.log('快捷回复', item)
      if (!this.IsSendDisabled) {
        this.sendMsg = `${this.sendMsg}  ${item}`
        return
      }
      this.$message.error('未选择对话客户')
    },
    // 文本域回车快捷键
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
    // 监听推送websocket
    pushInfoChild (actions) {
      console.log('推送', actions)
      this.websocketsend(actions)
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
        if (this.msgType === 'text') {
          sendMsg(this.mchid, this.clientid, this.sendMsg, this.msgType).then((res) => {
            if (res.error) {
              this.$message.error('发送信息有误')
            }
            const { result } = res
            // console.log(typeof (result))
            this.clientNews.push(result)
          })
        } else {
          this.clientNews.push(file)
        }
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
          obj.content = `${this.$store.state.userUrl}${file.msg}`
        }
        this.websocketsend(obj)
        this.sendMsg = ''
      }
    },
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
          if (res.error) {
            return this.$message.error(res.error.message)
          }
          const actions = { }
          actions.agent_id = this.agentId
          actions.clientid = this.clientid
          actions.mchid = this.mchid
          actions.type = 'end_chat'
          actions.identity = 'agent'
          this.websocketsend(actions)
          this.ClientList(this.mchid)
          this.clientNews = []
          this.IsSendDisabled = true
          this.Ishidden = false
          this.oldNewBtn = false
          this.getMoreBtn = false
          this.NewBtn = false
          this.clientTile = ''
          this.clientInf = {}
          this.clientCard = {}
          this.dialog_id = ''
        })
        this.changeColor = 0
      }, 1000)
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
      this.modalListVisible = true
      this.$refs.createModal.pushList()
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
    getMoreMsg () {
      this.IsLoading = true
      this.hostSatus = true
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
        this.clientNewsList = result.reverse()
        this.ChatsList()
      })
    },
    // 消息列表
    ChatsList () {
      const list = this.clientNewsList[this.clientNewsList.length - this.page].son.reverse()
      console.log('消息', list, list.length)
      this.arrlist = list.length > 0 ? this.group(list, 15) : []
      this.getMorepage = this.arrlist.length - 1
      console.log(this.arrlist)
      // console.log(TreeListVue)
      // 当前对话有记录
      if (this.arrlist.length > 1) {
        this.getMoreBtn = true
      } else {
        this.getMoreBtn = false
      }
      // 判断顶部更多按钮显示
      if (this.clientNewsList.length - this.page >= 1) {
        this.oldNewBtn = true
        this.Ishidden = true
        this.Isdisabled = false
      } else {
        this.oldNewBtn = false
        this.Ishidden = false
        this.Isdisabled = true
      }
      // 新对话
      if (this.clientNews !== [] && this.arrlist.length > 0) {
        this.clientNews.unshift(...this.arrlist[this.arrlist.length - 1])
      } else {
        this.clientNews.push(...this.arrlist)
      }
    },
    // 拆分聊天信息数组
    group (array, subGroupLength) {
      let index = 0
      const newArray = []
      while (index < array.length) {
          newArray.push(array.slice(index, index += subGroupLength))
      }
      return newArray
    },
    // 循环添加消息
    getMore () {
      this.IsLoading = true
      this.getMorepage -= 1
      setTimeout(() => {
        this.IsLoading = false
        this.hostSatus = true
        this.clientNews.unshift(...this.arrlist[this.getMorepage])
      }, 1000)
      if (this.getMorepage === 0 && this.clientNewsList.length === this.page) {
        this.getMoreBtn = false
        this.oldNewBtn = false
        this.NewBtn = true
      }
    },
    // 获取对话列表
    ClientList (mchid) {
      // if (this.clientList.length > 0) {
      // }
      getClientList(mchid).then(res => {
        if (res.result.length === 0) {
          this.clientList = []
          this.clientNews = []
          this.clientTile = ''
        } else {
          // 获取未读消息的客户
          const unreadList = []
          var j = 0
          for (const i in res.result) {
            if (res.result[i].info.unread > 0) {
              unreadList[j++] = res.result[i]
            }
          }
          if (unreadList.length === 0) {
            this.clientList = res.result
          } else {
            // 对未读消息排序
            const newMsglist = unreadList.sort((a, b) => {
              return b.newest_message.send_time < a.newest_message.send_time ? -1 : 1
            })
            const List = res.result.filter(item => item.info.unread === 0)
            this.clientList = [...newMsglist, ...List]
            // const itemRead = this.clientList.find(item => item.info.id === this.clientid)
            // if (itemRead) {
            //   itemRead.info.unread = 0
            // }
          }
        }
      })
    },
    // 初始化weosocket
    initWebSocket () {
      console.log('initWebSocket')
      // 独立
      const wsuri = 'ws://120.77.136.31:9501'
      // 微擎
      // const wsuri = `ws://${window.location.host}:9508`
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
      // const that = this
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
      console.log('数据接收', redata)
      // 发送聊天
      if (redata.type === 'message') {
        const arr = this.clientList.find(item => item.info.id === redata.data.send_id)
        this.clientList.splice(this.clientList.findIndex(item => item.info.id === redata.data.send_id), 1)
        this.clientList.find(item => item.info.id === redata.data.send_id)
        // 插入最新消息
        if (arr.newest_message === '') {
          arr.newest_message = redata.data
          arr.newest_message.send_time = redata.data.create_time
        } else {
          arr.newest_message.msg = redata.data.msg
          arr.newest_message.send_time = redata.data.create_time
        }
        // 当前未读提示取消
        if (arr.info.id !== this.changeColor) {
          arr.info.unread++
        } else {
          arr.info.unread = 0
        }
        this.clientList.unshift(arr)
      }
      // 结束对话
      if (redata.type === 'client_end_dialog') {
        this.clientList.find(item => item.info.id === redata.data.client_id).info.is_line = 0
        this.clientNews = []
        this.IsSendDisabled = true
        this.Ishidden = false
        this.oldNewBtn = false
        this.getMoreBtn = false
        this.NewBtn = false
        this.clientTile = ''
        this.clientInf = {}
        this.clientCard = {}
        this.changeColor = 0
      }
      // 发送聊天
      if (redata.data.send_type) {
        if (!this.IsSendDisabled) {
          if (this.clientNews.length !== 0 && redata.data.send_id === this.changeColor) {
            const obj = this.clientNews.find(item => item.send_id === redata.data.send_id)
            if (obj) {
              this.clientNews.push(redata.data)
            } else {
            this.clientNews.push(redata.data)
            }
          }
        }
      }
      // 客户评价
      if (redata.type === 'log') {
        this.clientNews.push(redata.data)
      }
      // 弹框喽
      if (redata.type === 'push') {
        this.show_is_agree = true
        this.push_data = redata
      }
      // 客户进来
      if (redata.type === 'client') {
        const result = JSON.parse(sessionStorage.getItem('resInfo'))
        this.mchid = result.merch.id
        this.agentId = parseInt(result.agent_id)
        this.agentName = result.name
        this.ClientList(this.mchid)
      }
      // 弹框消失
      if (redata.type === 'pushback') {
        this.modalListVisible = false
        const result = JSON.parse(sessionStorage.getItem('resInfo'))
        // const result = JSON.parse(data)
        this.mchid = result.merch.id
        this.agentId = parseInt(result.agent_id)
        this.agentName = result.name
        this.IsSendDisabled = true
        this.oldNewBtn = false
        this.getMoreBtn = false
        this.NewBtn = false
        this.clientTile = ''
        this.clientNews = []
        this.ClientList(this.mchid)
      }
    },
    // 数据发送
    websocketsend (actions) {
      console.log('发送', actions)
      if (actions.type === 'message') {
      this.clientList.find(item => item.info.id === actions.clientid).newest_message.msg = actions.content
      this.clientList.find(item => item.info.id === actions.clientid).newest_message.send_time = ` ${h}:${m}:${s}`
      // console.log(obj)
      }
      const Data = JSON.stringify(actions)
      this.websock.send(Data)
      this.hostSatus = false
    },
    // 关闭链接
    websocketclose (e) {
      this.$message.error('你已断开连接')
      console.log('断开连接', e)
      // this.reconnect()
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
      }, 2000)
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
    const result = JSON.parse(sessionStorage.getItem('resInfo'))
    this.mchid = result.merch.id
    this.agentId = parseInt(result.agent_id)
    this.agentName = this.$store.state.userName
    this.imgUrl = this.$store.state.userUrl
    this.initWebSocket()
    this.ClientList(this.mchid)
  }
}
</script>

<style scoped>
body{
  font-size: 14px;
}
.clientList{
  overflow-y: scroll;
  height: 75vh;
  overflow: auto;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
	width: 6px;
	height: 6px;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #0185ff0f;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
	border-radius: 40px;
	background-color: #0185ff38;
}
.clientInfoList{
  overflow: hidden;
  padding: 20px 5px 20px 0;
  border-bottom: 1px solid #cccccc42;
}
.clientList div:nth-last-child(2) .clientInfoList{
  border-bottom: none;
}
.clientBgColor{
  background: #e6f5ff;
  border-right: 3px solid #1880ff;
}
.userLine{
  font-size: 12px;
  text-align: center;
}
.userLine span{
  margin: 0 0 5px;
  display: inline-block;
}
.clientInfoList ::v-deep .ant-card-meta-title{
  font-size: 14px;
}
.clientInfoList ::v-deep .ant-card-meta-description{
  font-size: 14px;
  font-weight: bolder;
  color: #000;
}
.newsList{
  border-top-left-radius: 13px!important;
  border-top-right-radius: 13px!important;
  border-bottom-left-radius: 0!important;
  border-bottom-right-radius: 0!important;
  /* margin: 0 10px; */
}
.newsList ::v-deep .ant-card-body{
  padding: 0;
}
.newsList ::v-deep .ant-card-meta-avatar{
  padding-top: 0px;
  padding-right: 5px;
}
.newsListDisabled{
  border-radius: 13px;
}
.newsListDisabled .msgList{
height: 73vh;
}
.ant-avatar{
  width: 38px;
  height: 38px;
  background: #1181ff40;
}
.clientBadge{
  top: -8px;
  left: 32px;
  position: absolute;
}
.clientNews{
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
  overflow-y: scroll;
  overflow: auto;
  /* padding-bottom: 100px; */
}
.msgList .ant-list-item{
  overflow: hidden;
}
.msgList ::v-deep .ant-list-empty-text{
  padding: 15vh 16px;
}
.msgList ::v-deep .ant-empty-image{
  height: 100px;
}
.msgList ::v-deep .ant-empty-image svg{
  width: 100px;
  height: 100px;
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
.msgList .msgText{
  word-break: break-all;
  white-space: normal;
}
.dissendIamgebg{
  background: #f5f5f5;
  /* margin: 0 10px; */
}
.sendIamge{
  /* height: 32px; */
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  /* margin: 0 10px; */
}
.sendIamgebg{
  background: #ffffff;
}
.sendMsg{
  border-top: none;
  /* margin: 0 10px; */
  width: -webkit-fill-available;
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;
}
.sendBtn{
  position: absolute;
  right: 20px;
  bottom: 15px;
}
.sendBtn button{
  margin-right: 10px;
}
.tabCard{
  width: 100%;
}
.tabCard ::v-deep .ant-tabs-nav-container{
  padding-left: 10px;
}
.tabCard ::v-deep .ant-tabs-tab{
  width: 28%;
  text-align: center;
  /* border-top-left-radius: 13px!important;
  border-top-right-radius: 13px!important; */
}

.tabClass{
  padding: 5px 5px 0 10px;
}
.clientNews .ant-list-item{
  display: block;
  border-bottom: none;
}
.clientNews .fileType{
    font-size: 50px;
  }
.createDescript{
  margin-top: 15px;
}
.createDescript ::v-deep .ant-descriptions-view{
  border: none;
}
.createDescript ::v-deep .ant-descriptions-view tr{
  border: none;
  margin-bottom: 10px;
}
.createDescript ::v-deep .ant-descriptions-item-content{
  padding: 15px 16px;
}
.createDescript ::v-deep .ant-descriptions-view th{
  background: none;
  border: none;
  font-size: 12px;
}
.descriptName{
  font-size: 16px;
  font-weight: 500;
  margin-left: 15px;
  color: #000000d9;
}
.createDescript ::v-deep input{
  border: none;
}
</style>
