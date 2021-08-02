<template>
  <div class="msg">
    <div class="pc">
      <div class="msgheader">
        <h3>{{ full_name }}</h3>
        <img
          src="../assets/16kq.png"
          alt=""
          class="voice"
          @click="getvoicesatus"
          v-if="voicesatus">
        <img
          src="../assets/16gb.png"
          alt=""
          class="voice"
          @click="getvoicesatus"
          v-else>
        <div
          class="closebtn"
          style="background-color: #fff;width: 25px;color: #red;height: 25px;
          position: absolute;bottom: calc(50% - 12px);right: 10px;border-radius: 50%;
          text-align: center;font-size: 20px;line-height: 25px;display:none;
          box-shadow: 0 0 6px rgba(0,0,0,.1);cursor:pointer;"
          @click="heardClosebtn">x</div>
      </div>
      <div>
        <Queue
          :queueNum="queueNum"
          :queueTips="queueTips"
          :queueTicket="queueTicket"
          :showClosebtn="showClosebtn"
          :messageTips="messageTips"
          type="pc"
          v-if="show === true"/>
        <div class="msgLeft" v-else>
          <msgList
            ref="msgList"
            :messageList="messageList"
            :fullAvatar="full_avatar"
            :readMsg="readMsg"
            :msgList="'msgList'"
            :isHidden="Ishidden"
            :tabShow="tabShow"
            :getMoreBtn="getMoreBtn"
            :imgUrl="imgUrl"
            :isDisabled="Isdisabled"/>
          <div class="msgfooter">
            <div class="overflowwidtg" >
              <div class="msg-tab" v-show="tabShow" id="scrollDiv">
                <div
                  class="tab-item"
                  v-for="(item, index) in menuTab"
                  :key="index"
                  @click="getTab(item)">
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="footerIcon">
              <van-button
                class="footerButton"
                :disabled="IsSendBtn"
                size="small"
                type="primary">
                <van-uploader :after-read="afterRead">
                  <van-icon name="photo" size="20" color="#666"/>
                </van-uploader>
              </van-button>
              <van-button
                class="footerButton"
                :disabled="IsSendBtn"
                size="small"
                type="primary">
                <van-uploader :after-read="afterRead">
                  <van-icon name="send-gift" size="20" color="#666"/>
                </van-uploader>
              </van-button>
              <van-button
                size="small"
                class="footerButton"
                type="primary"
                @click="opendialog">
                <van-icon name="good-job" size="20" color="#666"/>
              </van-button>
            </div>
            <van-field
              class="field"
              :autosize="{ maxHeight: 170, minHeight: 100 }"
              v-model="sendMessage"
              :disabled="IsSendBtn"
              center
              placeholder="请输入您要咨询的问题"
              @:keydown.enter.prevent
              @keyup.enter.native="keyDown"
              @input="inputValue">
            </van-field>
            <div class="send">
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
            </div>
          </div>
        </div>
        <div class="msgavatar">
          <van-image
            height="200"
            fit="fill"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
      </div>
    </div>
    <div class="mobile">
      <van-overlay :show="show">
        <Queue
          :queueNum="queueNum"
          :queueTips="queueTips"
          :queueTicket="queueTicket"
          :messageTips="messageTips"
          :showClosebtn="showClosebtn"/>
      </van-overlay>
      <div class="header">
        <h3>{{ full_name }}</h3>
        <img
          src="../assets/16kq.png"
          alt=""
          class="voice"
          @click="getvoicesatus"
          v-if="voicesatus">
        <img
          src="../assets/16gb.png"
          alt=""
          class="voice"
          @click="getvoicesatus"
          v-else>
        <div
          class="closebtn"
          style="background-color: #fff;width: 25px;color: #red;height: 25px;
          position: absolute;bottom: calc(50% - 12px);right: 10px;border-radius: 50%;
          text-align: center;font-size: 20px;line-height: 25px;display:none;
          box-shadow: 0 0 6px rgba(0,0,0,.1);cursor:pointer;"
          @click="heardClosebtn">x</div>
      </div>
      <div :class="['msgList2', iphoneXClass]">
        <msgList
          :messageList="messageList"
          :fullAvatar="full_avatar"
          ref="msgList2"
          :readMsg="readMsg"
          :msgList="'m_msgList'"
          :isHidden="Ishidden"
          :getMoreBtn="getMoreBtn"
          :imgUrl="imgUrl"
          :isDisabled="Isdisabled"/>
        <div id="msgSend" class="msgSend" ref="botFooter">
          <div style="overflow: auto;background-color: #e6e6e6;width: 100vw;" class="overflowwidtg">
            <div class="msg-tab" v-show="tabShow">
              <div
                class="tab-item"
                v-for="(item, index) in menuTab"
                :key="index"
                @click="getTab(item)">
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="msgSendInput">
            <van-field
              ref="field"
              style="flex:1"
              class="field"
              type="textarea"
              :disabled="IsSendBtn"
              :autosize="{ maxHeight: 70, minHeight: 15 }"
              v-model="sendMessage"
              center
              placeholder="请输入您要咨询的问题"
              @:keydown.enter.prevent
              @keyup.enter.native="keyDown"
              @focus="focusInput"
              @blur="blurInput"
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
          <div class="iphoneX" v-show="iphoneBottom"/>
        </div>
      </div>
      <!-- <div id="msgSend" :class="['msgSend', iphoneXClass]" ref="botFooter">
        <div style="overflow: auto;background-color: #e6e6e6;width: 100vw;" class="overflowwidtg">
          <div class="msg-tab" v-show="tabShow">
            <div
              class="tab-item"
              v-for="(item, index) in menuTab"
              :key="index"
              @click="getTab(item)">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="msgSendInput">
          <van-field
            ref="field"
            style="flex:1"
            class="field"
            type="textarea"
            :disabled="IsSendBtn"
            :autosize="{ maxHeight: 70, minHeight: 15 }"
            v-model="sendMessage"
            center
            placeholder="请输入您要咨询的问题"
            @:keydown.enter.prevent
            @keyup.enter.native="keyDown"
            @focus="focusInput"
            @blur="blurInput"
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
        <div class="iphoneX" v-show="iphoneBottom"/>
      </div> -->
      <div id="audiots" style="height: 0;">
        <audio
          id="audioPlay"
          src="../assets/14039.mp3"
          style="height: 0;"
          hidden="true"
          preload="auto">
          <!-- <source src="../assets/14039.wav" type="audio/mpeg"> -->
        </audio>
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
import Cookie from 'js-cookie'
import md5 from 'js-md5'
import sha1 from 'sha1'
// import { Dialog } from 'vant'
import {
  returnCode,
  sendMsg,
  getGoods,
  sendGoods,
  InitList,
  getChatRecord,
  sendRate,
  sendFile,
  fileJurisdiction,
  getTabDataList,
  getTabData
} from '../network/websocket'

import msgList from './msgList.vue'
import Queue from './queue.vue'

// let lockReconnect = false
// let timer = null

// const clientId = '7e62d2f0deebe610383183c39ce40b40'
// window.addEventListener('touches',this.touch)
export default {
  name: 'HelloWorld',
  components: {
    msgList,
    Queue
  },
  computed: {
    ...mapState({
      print: (state) => state.Fingerprint
    }),
    watchMessageListLength() {
      return this.messageList.length
    }
  },
  data() {
    return {
      sourceUrl: '', // 默认来源链接
      dialogShow: false, // 评分弹框
      rateValue: 0, // 评分分数
      type: '', // 排队类型
      file_type: '',
      full_name: '', // 客服名称
      full_avatar: 'http://kefu.xuandev.com/agent/kefu.png', // 客服头像
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
      messageTips: '', // 留言提示
      queueTips: '', // 排队提示
      queueNum: 0, // 排队人数
      queueTicket: '', // 引导文案
      isTitimeout: false, // 是否加入心跳
      timeoutObj: null, // 心跳属性
      serverTimeoutObj: null, // 心跳属性
      timeoutResObj: null, // 无响应属性
      readMsg: 0, // 未读消息
      voicesatus: false,
      showClosebtn: false,
      msgpage: 1,
      hostSatus: false,
      menuTab: [],
      tabShow: true,
      getMoreBtn: false, // 默认加载更多按钮
      arrlist: [], // 缓存聊天列表数据
      getMorepage: 0, // 默认加载更多消息页码
      Reception: {}, // 接待语
      imgurl: '', // 图片路径
      iphoneXClass: 'iphoneSend', // iphoneX加安全边距
      iphoneBottom: true,
      winHeight: '',
      goods: {}, // 商品信息
      EventUtil: {
          addHandler: function (element, type, handler) {
              if (element.addEventListener)
                  element.addEventListener(type, handler, false)
              else if (element.attachEvent)
                  element.attachEvent('on' + type, handler)
              else
                  element['on' + type] = handler
          },
          removeHandler: function (element, type, handler) {
              if(element.removeEventListener)
                  element.removeEventListener(type, handler, false)
              else if(element.detachEvent)
                  element.detachEvent('on' + type, handler)
              else
                  element['on' + type] = handler
          }
      }
      // serverTimeoutOpen: true // 心跳开关
    }
  },
  methods: {
    // 获取tab分类
    getTabList(tabClassId) {
      const myDate = new Date()
      const h = myDate.getHours() >= 10 ? myDate.getHours() : `0${myDate.getHours()}`
      const m = myDate.getMinutes() >= 10 ? myDate.getMinutes() : `0${myDate.getMinutes()}`
      const s = myDate.getSeconds() >= 10 ? myDate.getSeconds() : `0${myDate.getSeconds()}`
      getTabDataList(this.mchid, this.clientid, tabClassId).then((res) => {
        if (!res.data.result.display) {
          this.tabShow = false
          return
        }
        this.menuTab = res.data.result.tab_class
        if (res.data.result.tab.length !== 0 && res.data.result.tab_class.length === 0) {
          this.messageList.push({
            agent_name: this.full_name,
            create_time: ` ${h}:${m}:${s}`,
            send_type: 'agent',
            send_menuTab: true,
            tabContent: true,
            title: '为你找到下列内容',
            menuTab: res.data.result.tab
          })
          this.getTabList(0)
          return
        }
        if (res.data.result.tab_class.length === 0) {
          this.messageList.push({
            agent_name: this.full_name,
            create_time: ` ${h}:${m}:${s}`,
            send_type: 'agent',
            send_menuTab: true,
            tabContent: true,
            menuTab: [{ title: '暂时未添加内容' }]
          })
          this.getTabList(0)
        }
      })
    },
    // 获取tab菜单
    getTabMenu(tabId) {
      const myDate = new Date()
      const h = myDate.getHours() >= 10 ? myDate.getHours() : `0${myDate.getHours()}`
      const m = myDate.getMinutes() >= 10 ? myDate.getMinutes() : `0${myDate.getMinutes()}`
      const s = myDate.getSeconds() >= 10 ? myDate.getSeconds() : `0${myDate.getSeconds()}`
      getTabData(this.mchid, this.clientid, tabId).then((res) => {
        this.messageList.push({
          agent_name: this.full_name,
          create_time: ` ${h}:${m}:${s}`,
          send_type: 'agent',
          send_menuTab: true,
          tabContent: false,
          menuTab: res.data.result
        })
        this.getTabList(0)
        //   return
        // }
        // this.menuTab = res.data.result.tab_class
      })
    },
    Init(print, urlCode, code) {
      this.IsSendBtn = false
      if (document.referrer) {
        const url = document.referrer.split('?')
        const source = url[0].split('/')
        this.sourceUrl = `${source[0]}//${source[2]}`
      } else {
        this.sourceUrl = ''
      }
      InitList(this.url, this.sourceUrl, print, urlCode, code).then((res) => {
        const { data } = res
        this.clientid = data.result.client_id
        if (!data.error) {
          this.mchid = data.result.mchinfo.id
          this.agentId = data.result.agent_info.id
          this.full_name = data.result.agent_info.name
          this.full_avatar = data.result.agent_info.avatar !== '' ? data.result.agent_info.avatar : 'http://kefu.xuandev.com/agent/kefu.png'
          document.title = this.full_name
          this.type = 'init'
          this.ChatRecord(this.mchid, this.clientid, this.page)
          // this.isTitimeout = true
          this.initWebSocket()
          this.getTabList(0)
          // 插入商品信息
          // this.messageList.unshift({
          //   // ...list.merch_auth_welcome[0],
          //   name: 'commodity',
          //   type: 'commodity'
          // })
          return
        }
        if (data.error.code === 405) {
          this.type = 'queue'
          this.mchid = data.result.mchid
          this.isTitimeout = false
          this.initWebSocket()
          return
        }
        if (data.error.code === 401) {
          this.$toast.fail(data.error.message)
        }
      })
    },
    inputValue() {
      if (this.sendMessage !== '') {
        this.sendBtn = true
      } else {
        this.sendBtn = false
      }
    },
    // 点击菜单
    getTab(item) {
      this.hostSatus = false
      this.getTabList(item.id)
      // 获取当前时间
      const myDate = new Date()
      const h = myDate.getHours() >= 10 ? myDate.getHours() : `0${myDate.getHours()}`
      const m = myDate.getMinutes() >= 10 ? myDate.getMinutes() : `0${myDate.getMinutes()}`
      const s = myDate.getSeconds() >= 10 ? myDate.getSeconds() : `0${myDate.getSeconds()}`
      this.messageList.push({
        send_type: 'client',
        msg_type: 'text',
        is_read: 2,
        msg: item.name,
        time: `${h}:${m}:${s}`
      })
      const obj = { }
      obj.type = 'tab_log'
      obj.identity = 'client'
      obj.agent_id = this.agentId
      obj.clientid = this.clientid
      obj.mchid = this.mchid
      this.websocketsend(obj)
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
        // 发送信息
        if (type === 'text') {
          obj.msg_type = this.msgType
          obj.content = this.sendMessage
          const msg = this.sendMessage
          this.sendMessage = ''
          sendMsg(this.mchid, this.clientid, msg, type).then((res) => {
            // this.sendMessage = ''
            this.sendBtn = false
            this.hostSatus = false
            if (res.data.error) {
              this.$toast.fail(res.data.error.message)
            } else {
              obj.dialog_id = res.data.result.dialog_id
              this.messageList.push(res.data.result)
              this.websocketsend(obj)
            }
          })
        } else {
          // 发送图片或文件
          this.hostSatus = false
          obj.msg_type = type
          obj.dialog_id = this.dialog_id
          obj.content = `${this.imgUrl}${file.msg}`
          this.messageList.push(file)
          this.websocketsend(obj)
        }
      }
    },
    // 上传图片
    afterRead(info) {
      fileJurisdiction(this.mchid).then((res) => {
        const { data: { result } } = res
        const fileName = info.file.name.split('.')
        if (fileName.length > 1) {
          result.map((item) => {
            if (item.allow_suffix.indexOf(fileName[1]) !== -1) {
              this.file_type = item.filetype
            }
            return ''
          })
          const FileData = new FormData()
          FileData.append('file', info.file)
          FileData.append('clientid', this.clientid)
          FileData.append('mchid', this.mchid)
          FileData.append('file_type', this.file_type)
          sendFile(FileData).then((resData) => {
            if (resData.data.error) {
              this.$toast(resData.data.error.message)
              return
            }
            const { data } = resData
            this.dialog_id = data.result.dialog_id
            this.sendTxt(this.file_type, data.result)
          })
        } else {
          this.$toast('暂不支持该上传的类型')
        }
      })
    },
    // 获取商品
    getCommodity(id) {
      getGoods(id).then((res) => {
        if (res.data.error) {
          return this.$toast.fail(res.data.error.message)
        }
        this.goods = res.data.success.message
        const myDate = new Date()
        const h = myDate.getHours() >= 10 ? myDate.getHours() : `0${myDate.getHours()}`
        const m = myDate.getMinutes() >= 10 ? myDate.getMinutes() : `0${myDate.getMinutes()}`
        this.goods.time = `${h}:${m}`
      })
    },
    // 发送商品
    sendCommodity(id) {
      sendGoods(id).then((res) => {
        if (res.data.error) {
          return this.$toast.fail(res.data.error.message)
        }
        const myDate = new Date()
        const h = myDate.getHours() >= 10 ? myDate.getHours() : `0${myDate.getHours()}`
        const m = myDate.getMinutes() >= 10 ? myDate.getMinutes() : `0${myDate.getMinutes()}`
        const s = myDate.getSeconds() >= 10 ? myDate.getSeconds() : `0${myDate.getSeconds()}`
        const commodity = {}
        commodity.send_commodity = 'commodity'
        commodity.send_type = 'client'
        commodity.time = `${h}:${m}:${s}`
        const obj = Object.assign(commodity,res.data.success.message)
        this.messageList.push(obj)
      })
    },
    // 获取最近聊天记录
    ChatRecord(mchid, clientid, page, hostSatus) {
      getChatRecord(mchid || this.mchid, clientid || this.clientid).then((resList) => {
        const { data: { result } } = resList
        this.msgpage = page
        this.messageNewsList = result
        // console.log(this.msgpage)
        // console.log(result)
        this.ChatsList(page)
        this.hostSatus = hostSatus
      })
    },
    // 改变未读信息
    changeRead() {
      this.messageList = this.messageList.map((item) => {
        const arr1 = item
        if (item.is_read === 0) {
          arr1.is_read = 1
        }
        return arr1
      })
    },
    ChatsList(page) {
      let list = []
      if (this.messageNewsList.length - page > 0) {
        this.Ishidden = true
        this.Isdisabled = false
        list = this.messageNewsList[page - 1].son
      } else {
        this.Ishidden = false
        this.Isdisabled = true
        list = this.messageNewsList[this.messageNewsList.length - 1].son
      }
      this.arrlist = this.group(list.conversation, 15)
      this.getMorepage = this.arrlist.length - 1
      console.log(this.arrlist)
      if (this.arrlist.length > 1) {
        this.getMoreBtn = true
        this.Isdisabled = false
      }
      // 老对话刷新
      if (list.conversation.length !== 0) {
        // 当前对话有消息
        if (this.messageList.length !== 0) {
          this.messageList.unshift(...this.arrlist[this.arrlist.length - 1])
          if (list.merch_auth_welcome.length > 0) {
            this.messageList.unshift({
              ...list.merch_auth_welcome[0],
              send_type: 'agent',
              send_welcome: 'welcome'
            })
          }
        } else {
          if (list.merch_auth_welcome.length > 0) {
            list.conversation.unshift({
              ...list.merch_auth_welcome[0],
              send_type: 'agent',
              send_welcome: 'welcome'
            })
            if (this.voicesatus) {
              this.playts()
            }
          }
          this.messageList.push(...this.arrlist[this.arrlist.length - 1])
        }
      } else {
        // 新对话插入欢迎语
        if (list.merch_auth_welcome.length > 0) {
          this.messageList.unshift({
            ...this.goods,
            name: 'commodity',
            type: 'commodity'
          }, {
            ...list.merch_auth_welcome[0],
            send_type: 'agent',
            send_welcome: 'welcome'
          })
          if (this.Reception.name) {
            this.messageList.unshift(this.Reception)
          }
          if (this.voicesatus && this.msgpage === 1) {
            this.playts()
          }
        }
        console.log(this.messageList)
      }
    },
    // 拆分聊天信息数组
    group(array, subGroupLength) {
      let index = 0
      const newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength))
      }
      return newArray
    },
    // 获取聊天列表上一页
    getMsg() {
      this.hostSatus = true
      this.getMorepage -= 1
      this.messageList.unshift(...this.arrlist[this.getMorepage])
      if (this.getMorepage === 0) {
        this.getMoreBtn = false
      }
    },
    // 评分
    onChange(value) {
      sendRate(this.clientid, this.mchid, this.agentId, value).then(() => {
        this.dialogShow = !this.dialogShow
        this.$toast('感谢您对这次服务的评价')
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
    },
    IsShow() {
      this.btnShow = !this.btnShow
    },

    // 获取焦点输入框位置
    handleFocus() {
      const msgHeight = document.querySelector('.msgList2')
      const msgSend = document.querySelector('.msgSend')
      const msgSendInput = document.querySelector('.msgSendInput')
      // 判断Safari浏览器
      // const issafariBrowser = navigator.userAgent.indexOf('Safari')
      // if (issafariBrowser > -1) {
        // this.$toast(this.scrollTop)
        // console.log(issafariBrowser)
        // this.$refs.botFooter.style.bottom = this.scrollTop + 'px'
      //   this.$refs.botFooter.style.bottom = (this.scrollTop - msgSend.clientHeight) + 'px'
      // } else {
        // this.$refs.botFooter.style.bottom = this.scrollTop  + 'px'
        // this.$refs.botFooter.style.position = 'absolute'
      // }
      // 聊天列表高度随页面减少
      msgHeight.style.height = this.scrollTop - msgSendInput.clientHeight + 'px'
      // this.$nextTick(() => {
      //   const container2 = this.$refs.msgList2.$el.querySelector('#talk')
      //   container2.scrollTop = msgHeight.scrollHeight
      // })
        // this.$toast(`获取${msgSendInput.clientHeight}`)
        window.scrollTo(0, 0)
    },
    // 失去焦点输入框位置
    reset() {
      // this.$toast(`window:${window.innerHeight}`)
      // this.$refs.botFooter.style.position = 'fixed'
      this.iphoneXClass = 'iphoneSend'
      this.$refs.botFooter.style.bottom = 0
      const msgHeight = document.querySelector('.msgList2')
      const msgSend = document.querySelector('.msgSend')
      // document.body.style.height = window.innerHeight + 'px'
      msgHeight.style.height = window.innerHeight - 44 + 'px'
      // this.$toast(`hhhhhh:${msgHeight.clientHeight}`)
      // this.scrollAdd()
    },
    // 禁止滚动
    scrollStop() {
      // console.log('scrollStop')
      // document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', this.PASSIVE, {
        passive: false
      }, false)
    },
    // 添加滚动
    scrollAdd() {
      // console.log('scrollAdd')
      // document.body.style.overflow = 'auto'
      document.removeEventListener('touchmove', this.PASSIVE, {
        passive: false
      }, false)
    },
    // 获取焦点
   focusInput() {
      setTimeout(()=>{
        this.$toast(`焦点${window.innerHeight}`)
        // this.$toast(document.documentElement.scrollTop)
      },2000)
      this.iphoneXClass = ''
    // 监听屏幕移动
      // this.listenTouchDirection(document, true, this.up, this.right, this.down, this.left)
      this.btnShow = false
      this.iphoneBottom = false
      const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // IOS终端
      if (isIOS) {
        setTimeout(() => {
        // IphoneX 多出了下面的填充
        // if ((screen.height === 812 && screen.width === 375) || (screen.height === 896 && screen.width === 414)) {
        //   this.scrollTop = document.scrollingElement.scrollTop - 34
        // } else {
        this.scrollTop = document.scrollingElement.scrollTop
        // this.scrollTop = 304
        // }
        this.handleFocus()
        }, 200)
      }
    },
    // 输入框失去焦点
    blurInput() {
      // this.$toast('失去焦点')
      this.$toast(`失去${window.innerHeight}`)
      // window.innerHeight = this.winHeight
      this.iphoneBottom = true
      this.scrollAdd()
      this.$refs.field.blur()
      const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // IOS终端
      if (isIOS) {
        setTimeout(() => {
          // var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
          this.reset(), 100})
      }
    },
    // 禁止上下滚动
    PASSIVE(e) {
      console.log(e)
      e.preventDefault()
      // e.stopPropagation()
    },
    // 初始化weosocket
    initWebSocket() {
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
    websocketonopen() {
      console.log('建立连接')
      if (this.isTitimeout) {
        this.start()
      }
      const actions = { }
      actions.identity = 'client'
      actions.clientid = this.clientid
      if (this.type === 'init') {
        actions.mchid = this.mchid
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
      const redata = JSON.parse(e.data)
      if (redata.type !== 'leave_msg') {
        this.start()
      }
      // 进入聊天
      if (redata.type === 'allot_agent') {
        // document.title = redata.data.agent_info.name
        this.agentId = redata.data.agent_info.id
        this.full_name = redata.data.agent_info.name
        this.full_avatar = redata.data.agent_info.avatar === '' ? 'http://kefu.xuandev.com/agent/kefu.png' : redata.data.agent_info.avatar
        this.getTabList(0)
        this.ChatRecord(this.mchid, this.clientid, this.page)
        this.Reception = redata.data.agent_info
        this.show = false
      }
      // if (redata.type === 'auth') {
      //   // this.noNewsAgent()
      // }
      // 排队人数过多
      if (redata.type === 'leave_msg') {
        this.show = true
        this.full_name = '排队等待中....'
        // this.queueTips = redata.message
        this.messageTips = redata.message
      }
      // 排队等待
      if (redata.type === 'queue') {
        console.log('queue')
        clearTimeout(this.timeoutObj)
        this.messageTips = ''
        this.show = true
        this.queueNum = redata.data.in_queue
        this.queueTips = redata.data.intro
        this.queueTicket = redata.data.ticket_intro
        this.full_name = '排队等待中....'
      }
      // 结束聊天
      if (redata.type === 'end_dialog') {
        this.isTitimeout = false
        clearTimeout(this.timeoutObj)
        this.dialogShow = !this.dialogShow
        this.tabShow = false
        this.$toast('您的对话已结束，请为这次服务进行评价，如需唤回客服请刷新页面或退出页面重新进入')
      }
      // 接受聊天数据
      if (redata.data.send_type) {
        this.hostSatus = false
        this.messageList.push(redata.data)
        if (this.voicesatus) {
          this.playts()
        }
      }
      // 已读信息
      if (redata.type === 'read') {
        this.changeRead()
        // this.readMsg = 1
      }
      if (redata.type === 'message') {
        const obj = {}
        obj.type = 'send_agent'
        obj.clientid = this.clientid
        obj.agent_id = this.agentId
        obj.identity = 'client'
        obj.mchid = this.mchid
        this.websocketsend(obj)
        // this.readMsg = 1
      }
      // 断开聊天
      if (redata.type === 'relink') {
        this.$toast(redata.message)
        this.IsSendBtn = false
        this.tabShow = false
      }
    },
    // 数据发送
    websocketsend(Data) {
      console.log('数据发送', Data)
      // this.noNewsClient()
      this.websock.send(JSON.stringify(Data))
    },
    // 关闭
    websocketclose(e) {
      console.log('断开连接', e)
      this.IsSendBtn = true
      // this.$toast('你已断开链接，请刷新页面')
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
        // 任意发一个消息过去，后台接收，在init()中的onmessage收到消息，说明后台没有挂掉，有心跳
        const obj = {}
        obj.type = 'ping'
        obj.clientid = this.clientid
        obj.agent_id = this.agentId
        obj.identity = 'client'
        obj.mchid = this.mchid
        this.websocketsend(obj)
      }, 0)
    },
    playts() {
      const tsbut = document.getElementById('audioPlay')
      // tsbut.load()
      tsbut.play()
    },
    getvoicesatus() {
      this.voicesatus = !this.voicesatus
      const tsbut = document.getElementById('audioPlay')
      // 要加.load()手机苹果端才能触发出声音
      tsbut.load()
    },
    heardClosebtn() {
      const data = true
      window.parent.postMessage(data, '*')
    },
    // 指纹并存入cookie
    fingerprint(components, result) {
      const values = components.map((component, index) => {
        if (index === 0) {
          // 把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
          return component.value.replace(/\bNetType\/\w+\b/, '')
        }
        return component.value
      })
      // 生成最终id murmur
      // console.log(values)
      const murmur = Fingerprint2.x64hash128(values.join(''), 31)
      // this.setCookie('finger', murmur)
      // 获取时间戳
      const timestamp = Date.parse(new Date())
      const fingerCode = `${murmur}${timestamp}`
      // console.log(fingerCode)
      Cookie.set('finger', fingerCode)
      localStorage.setItem('finger', fingerCode)
      const urlCode = md5(sha1(fingerCode + result.code))
      // console.log(`浏览器指纹码：${murmur}`)
      // console.log(`code:${result.code}`)
      // console.log(`urlCode:${result.code}`)
      // console.log(`random_code:${result.random_code}`)
      this.Init(fingerCode, urlCode, result.random_code)
    },
     listenTouchDirection(target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
        this.EventUtil.addHandler(target, 'touchstart', handleTouchEvent)
        // this.EventUtil.addHandler(target, 'touchend', handleTouchEvent)
        this.EventUtil.addHandler(target, 'touchmove', handleTouchEvent)
        var startX
        var startY
        var that = this
        function handleTouchEvent(event) {
            switch (event.type){
                case 'touchstart':
                    startX = event.touches[0].pageX
                    startY = event.touches[0].pageY
                    break
                case 'touchmove':
                    var spanX = event.changedTouches[0].pageX - startX
                    var spanY = event.changedTouches[0].pageY - startY
                    if(Math.abs(spanX) > Math.abs(spanY)){
                        if(spanX > 0){
                            if(rightCallback)
                                rightCallback(event)
                        } else if(spanX < -0){
                            if(leftCallback)
                                leftCallback(event)
                        }
                    } else {
                        if(spanY > 0){
                            if(downCallback)
                                downCallback(event)
                        } else if (spanY < -0) {
                            if(upCallback)
                                upCallback(event)
                        }
                    }
                    break
                    // case 'touchmove':
                    // //阻止默认行为
                    // if(isPreventDefault)
                    //     event.preventDefault()
                    // break
            }
        }
    },
    up(event){
      // console.log('action:up')
      this.scrollStop()
      //  this.EventUtil.removeHandler(Document, 'touchmove', this.PASSIVE)
    },
    down(event){
      // console.log('action:down')
      this.scrollStop()
      // this.EventUtil.addHandler(Document, 'touchmove', this.PASSIVE)
    },
    right(event){
      // console.log('action:right')
      this.scrollAdd()
      // this.EventUtil.removeHandler(Document, 'touchstart', this.PASSIVE)
    },
    left(event){
      // console.log('action:left')
      this.scrollAdd()
      // this.EventUtil.addHandler(Document, 'touchstart', this.PASSIVE)
    }
    // 判断pc 或 mobice
    // checkClass() {
    //   const system = {}
    //   const p = navigator.platform
    //   system.win = p.indexOf('Win') === 0
    //   system.mac = p.indexOf('Mac') === 0
    //   system.x11 = (p === 'X11') || (p.indexOf('Linux') === 0)
    //   // 如果是电脑跳转到
    //   if (system.win || system.mac || system.xll) {
    //     this.className = 'pc'
    //   } else {
    //     // 如果是手机跳转到
    //     this.className = 'mobile'
    //   }
    // }
  },
  created() {
    this.winHeight = window.innerHeight
    this.$toast(`...${window.innerHeight}`)
    // this.$toast(this.winHeight)
    // this.checkClass()
    // 来源地址截取
    const params = {}
    if (window.location.search !== '') {
      const arrs = window.location.search.slice(1).split('&')
      arrs.forEach((val) => {
        const arr = val.split('=')
        const content = arr[1]
        params[arr[0]] = content
      })
    }
    // console.log(params)
    if (params.id) {
      this.getCommodity(params.id)
    }
    this.url = params
    const obj = {
      source_url: window.location.href,
      agentid: this.url.agentid,
      groupid: this.url.groupid,
      mchid: this.url.mchid
    }
    this.imgUrl = 'http://kefu.xuandev.com'
    // 微擎
    // this.imgUrl = `${window.location.protocol}//${window.location.host}/app`
    this.url = obj
    returnCode().then((res) => {
      const { data: { result } } = res
      const Codecookie = Cookie.get('finger')
      const Codelocal = localStorage.getItem('finger')
      // console.log(Codecookie)
      if (!Codecookie && !Codelocal) {
        if (window.requestIdleCallback) {
          // setTimeout(() => {
          requestIdleCallback(() => {
            Fingerprint2.get((components) => {
              this.fingerprint(components, result)
            })
          }, { timeout: 1000 })
          // }, 500)
          console.log('requestIdleCallback')
        } else {
          setTimeout(() => {
            Fingerprint2.get((components) => {
              this.fingerprint(components, result)
            })
          }, 500)
        }
      } else {
        const fingerCode = Codecookie || Codelocal
        Cookie.set('finger', fingerCode)
        localStorage.setItem('finger', fingerCode)
        const urlCode = md5(sha1(fingerCode + result.code))
        this.Init(fingerCode, urlCode, result.random_code)
      }
    })
    // 初始化
    // this.Init(murmur, urlCode, result.random_code)
    // 菜单滑轮滚动
    this.$nextTick(() => {
      const scrollDiv = document.getElementById('scrollDiv')
      function handlerTest(event) {
        const detail = event.wheelDelta || event.detail
        const moveForwardStep = -1
        const moveBackStep = 1
        let step = 0
        if (detail > 0) {
          step = moveForwardStep * 100
        } else {
          step = moveBackStep * 100
        }
        scrollDiv.scrollLeft += step
      }
      scrollDiv.addEventListener('DOMMouseScroll', handlerTest, false)
      scrollDiv.addEventListener('mousewheel', handlerTest, false)
    })
    // 聊天列表长度
    setTimeout(() => {
      this.$nextTick(() => {
        const container = this.$refs.msgList.$el.querySelector('#talk')
        const container2 = this.$refs.msgList2.$el.querySelector('#talk')
        if (container.scrollHeight !== 0) {
          console.log('pc触发了变化')
          container.scrollTop = container.scrollHeight
        } else {
          console.log('触发了变化')
          container2.scrollTop = container2.scrollHeight
        }
      })
    }, 300)
  },
  watch: {
    // 监听消息列表数组的长度
    watchMessageListLength() {
      const that = this
      if (this.hostSatus === false) {
        that.$nextTick(() => {
          const container = that.$refs.msgList.$el.querySelector('#talk')
          const container2 = that.$refs.msgList2.$el.querySelector('#talk')
          if (container.scrollHeight !== 0) {
            console.log('pc触发了变化')
            container.scrollTop = container.scrollHeight
          } else {
            console.log('触发了变化')
            container2.scrollTop = container2.scrollHeight
          }
        })
      }
    }
  },
  mounted() {
//     var that = this
//      this.$refs.field.$el.addEventListener('touchstart',function(){
//         that.$refs.field.focus()                                      //此时触发，同时弹出字母键盘 ps：若想要弹出数字键盘给input的type加上tel，如<input type='tel'/>
//     })
//     document.body.addEventListener('focusin', () => {
//     //软键盘弹出的事件处理
//     this.$toast('软键盘弹出的事件处理')
    
// })
// document.body.addEventListener('focusout', () => {
//       //软键盘收起的事件处理
//       this.$toast('软键盘收起的事件处理')
//       // this.$refs.field.blur()
    
// })
    // this.reset()
    this.listenTouchDirection(document, true, this.up, this.right, this.down, this.left)
    // document.body.addEventListener('touchmove', (e) => {
    //   e.preventDefault()
    //   this.$toast('123')
    //   }, false)
    // console.log(document.querySelector('.msg-tab'))
    // document.querySelector('.msg-tab').addEventListener('touchstart', (e) => {
    //   e.preventDefault()
    //   console.log('触摸')
    //   document.querySelector('.msg-tab').addEventListener('touchmove', () => {
    //     console.log('滑动滑动')
    //   })
    // }, false)
    // document.body.style.overflow = 'hidden'
    document.querySelector('.msgList2').addEventListener('touchstart', this.blurInput, false)
    // document.querySelector('.msgList2').addEventListener('touchstart', () => {
    //   console.log(document.querySelector('.m_msgList_h'))
    //   document.querySelector('.m_msgList_h').style.overflow = 'scroll'
    // }, false)
    if (window.attachEvent) {
      window.attachEvent('onmessage', (event) => {
        // console.log(event)
        if (event.data === 'iframe-closebtn') {
          // console.log(event)
          const closebtn = document.querySelectorAll('.closebtn')
          // console.log(closebtn)
          closebtn[0].style.display = 'block'
          closebtn[1].style.display = 'block'
          // 浏览器插件去掉聊天页面下方导航栏
          // this.tabShow = false
          // 显示手机端排队页面右上角关闭按钮
          this.showClosebtn = true
          // 打开浏览器消息提示声音
          // this.voicesatus = !this.voicesatus
          // const tsbut = document.getElementById('audioPlay')
          // 要加.load()手机苹果端才能触发出声音
          // tsbut.load()
        }
      })
    } else {
      window.addEventListener('message', (event) => {
        // console.log(event)
        if (event.data === 'iframe-closebtn') {
          // console.log(event)
          const closebtn = document.querySelectorAll('.closebtn')
          // console.log(closebtn)
          closebtn[0].style.display = 'block'
          closebtn[1].style.display = 'block'
          // 浏览器插件去掉聊天页面下方导航栏
          // this.tabShow = false
          // 显示手机端排队页面右上角关闭按钮
          this.showClosebtn = true
          // 打开浏览器消息提示声音
          // this.voicesatus = !this.voicesatus
          // const tsbut = document.getElementById('audioPlay')
          // 要加.load()手机苹果端才能触发出声音
          // tsbut.load()
        }
      })
    }
  }
  // props: {
  //   msg: String
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// body{
//   padding-bottom: constant(safe-area-inset-bottom);
//   padding-bottom: env(safe-area-inset-bottom);
// }
.msg{
  // height: 100vh;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // padding-bottom: constant(safe-area-inset-bottom); 
  // padding-bottom: env(safe-area-inset-bottom);
  .pc{
    width: 60vw;
    background: #fff;
    border-radius: 15px;
    border: 1px solid #ccc;
    overflow: hidden;
    .msgheader{
      width: 100%;
      background:#fd523e;
      position: relative;
      h3{
        color: #fff;
        padding: 10px 0;
        margin: 0;
      }
      .voice{
        position: absolute;
        right: 100px;
        bottom: calc(50% - 16px / 2);
      }
    }
    .msgLeft{
      width: 65%;
      float: left;
      // padding-top: 10px;
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
      .msgfooter{
        .footerIcon{
          border-top: 1px solid #ccc;
          float: left;
          background: #fff;
          width: 100%;
          text-align: left;
          ::v-deep .footerButton{
            background-color: #fff!important;
            color: #fff!important;
            border: none;
          }
          .footerButton:hover{
            background: #ddd !important;
            ::v-deep .van-uploader__input{
              top: -25%;
              left: -40%;
              width: 36px;
              height: 32px;
            }
          }
        }
      }
      .send{
        position: relative;
        button{
          position: absolute;
          bottom: 10px;
          right: 15px;
        }
      }
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
  // padding: 44px 0 20px;
  padding: 44px 0 0px;
  position: relative;
  width: 100%;
  height: 100vh;
  // background-color: #e6e6e6;
  background-color: #f317ce;
  box-sizing: border-box;
  .header{
    min-height: 45px;
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
    .voice{
      position: absolute;
      right: 50px;
      bottom: calc(50% - 16px / 2);
    }
  }
  .msgList2{
    position: relative;
    height: calc(100vh - 44px);
    overflow: hidden;
    .van-list{
      height: 100%;
    }
    .msgSend{
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      z-index: 99;
      // background-color: #f6f6f6;
      background-color: #4a10e9;
      // padding-bottom: constant(safe-area-inset-bottom);
      // padding-bottom: env(safe-area-inset-bottom);
    }
  }
  .msgfooter{
  }
}

.iphoneSend{
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
// 浏览器插件聊天页面隐藏导航栏下方滚动条chrome 和Safari
.msgSend .overflowwidtg{
  &::-webkit-scrollbar{
    display: none;
    width: 0 !important
  }
}
// 浏览器插件聊天页面隐藏导航栏下方滚动条兼容IE 10+
.msgSend .overflowwidtg{
  // -ms-overflow-style: none;
}
// 浏览器插件聊天页面隐藏导航栏下方滚动条兼容Firefox
.msgSend .overflowwidtg{
  overflow: -moz-scrollbars-none;
}
.msgSendInput{
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 5px 10px;
  ::v-deep .van-cell{
    padding: 0;
    border-radius: 5px;
  }
  .chooseBtn{
    margin-left: 10px;
    border-radius: 15px;
  }
}
.msgSend ::v-deep .van-field__control{
  height: 33px!important;
  padding: 1.111vw 10px;
  // &::-webkit-input-placeholder{
  //   line-height: 33px;
  //   text-indent: 10px;
  // }
  // &:-moz-placeholder{
  //   line-height: 33px;
  //   text-indent: 10px;
  // }
  // &::-moz-placeholder{
  //   line-height: 33px;
  //   text-indent: 10px;
  // }
  // &:-ms-input-placeholder{
  //   line-height: 33px;
  //   text-indent: 10px;
  // }
}
.chooseRow{
  // background: #f6f6f6;
  background-color: #117de2;
  border-top: 1px solid #ccc;
  padding: 20px 10px;
  .choose{
    display: flex;
    flex-direction: column;
    align-items: center;
    // padding: 15px;
    span{
    font-size: 12px;
    margin-top: 7px;
    }
  }
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
  .popupTitle{
    font-size: 20px;
    font-weight: bolder;
    line-height: 30px;
  }
  .rate {
    margin: 20px auto;
  }
}
// 下面tab栏
.msg-tab{
  // padding: 0 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  // position: fixed;
  // left: 0;
  // bottom: 58px;
  width: 100%;
  height: 46px;
  // z-index: 10;
  // padding-bottom: 0;
  flex-wrap: nowrap;
  // overflow: auto;
  background-color: #e6e6e6;
  // padding-bottom: 10px;
  // padding-top: 10px;
  overflow: scroll;
  .tab-item{
    margin-right: 2.333vw;
    padding: 5px 15px;
    background-color: #fff;
    color: #6c6c6c;
    border-radius: 4.167vw;
    flex:0 0 auto;
    text-align: center;
    &:last-child{
      margin-right: 0px;
    }
  }
}
::-webkit-scrollbar {
  display: none
}
@media screen and (min-width: 768px) {
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
    // background: rgb(66, 228, 2);
  }
  .pc{
    display: none;
  }
}
/*iphoneX*/
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
  .iphoneX{
    padding-bottom: 34px !important;
    background: #f6f6f6;
  }
}
/*iphoneX Max*/
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3){
  .iphoneX{
    padding-bottom: 34px !important;
    background: #f6f6f6;
    // height: 34px;
    // background: #db0909;
  }
  // .iphoneXFocus{
  //   padding-bottom: 0 !important;
  //   display: none;
  // }
}
// @media screen and (max-width: 300px) {
//   .msg-tab {
//     display: none;
//   }
// }
</style>
