<template>
  <a-modal
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <ModalSlot>
      <div slot="title" v-if="type === 'text'">确认结束聊天</div>
      <div slot="list" v-if="type === 'list'">
        推送列表
        <div v-for="(item, index) in push_list" :key="index">
          <div class="merch-group-name">{{ item.group_name }}</div>
          <div class="merch-group" v-for="(subitem, subindex) in item.agents" :key="subindex">
            <div class="merch-box">
              <div class="merch-content">
                <img class="merch-avatar" :src="item.avatar ? item.avatar : 'http://endofyear-activities.oss-cn-hangzhou.aliyuncs.com/avatar.jpg'"/>
                <span class="merch-name">{{ subitem.name }}</span>
              </div>
              <button class="merch-btn" @click="toPushUser(subitem)">转接</button>
            </div>
          </div>
        </div>
      </div>
      <div slot="title" v-if="type === 'push'">是否同意转接</div>
      <div slot="title" v-if="type === 'pushback'">{{ isconsent === 0 ? '对方拒绝了你的转接请求' : '对方接受了你的转接请求，请刷新当前页面' }}</div>
      <div slot="title" v-if="type === 'agreeback'">您已同意转接，请刷新当前页面</div>
      <!-- <div slot="title" v-if="type === 'input'">
        添加快捷回复
        <div>
          类型：<a-radio :checked="true">普通答案</a-radio>
          <div>
            <span>*</span>标题：<input v-model="titlevalue"/>
          </div>
          <div>
            内容：<textarea v-model="contentvalue"></textarea>
          </div>
        </div>
      </div> -->
    </ModalSlot>
  </a-modal>
</template>
<script>
import ModalSlot from './slot'
import { getPushList, pushClient } from '../../../network/websocket'

export default {
  components: {
    ModalSlot
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    type: {
      type: String,
      default: () => ''
    },
    mchid: {
      type: Number,
      default: () => 1
    },
    clientid: {
      type: Number,
      default: () => 0
    },
    agentId: {
      type: Number,
      default: () => 0
    },
    agentName: {
      type: String,
      default: () => ''
    },
    isconsent: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {
      push_list: [],
      currentInfo: {},
      pushdata_id: '',
      show_is_agree: false
    }
  },
  methods: {
    // 推送消息给用户
    toPushUser (item) {
      console.log('item=============', item)
      const that = this
      item.mchid = this.mchid
      item.clientid = this.clientid
      this.currentInfo = item
      pushClient(item).then((res) => {
        this.pushdata_id = res.result.id
        that.initWebSocket()
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
      console.log('currentInfo', this.currentInfo)
      actions.agent_id = this.currentInfo.id
      actions.id = this.pushdata_id
      actions.type = 'push'
      actions.clientid = this.clientid
      actions.reason = '需要你的协助'
      actions.mchid = this.mchid
      actions.push_name = this.agentName
      actions.push_id = this.agentId
      // console.log(actions)
      this.websocketsend(actions)
    },
    // 连接建立失败重连
    websocketonerror () {
      this.initWebSocket()
    },
    // 数据接收
    websocketonmessage (e) {
      const redata = JSON.parse(e.data)
      console.log('redata', redata)
      console.log('redata.type', redata.type)
    },
    // 数据发送
    websocketsend (actions) {
      console.log(actions)
      const Data = JSON.stringify(actions)
      this.websock.send(Data)
    },
    // 关闭链接
    websocketclose (e) {
      console.log('断开连接', e)
      // this.reconnect()
    }
  },
  created () {
    if (this.type === 'list') {
      getPushList(this.mchid).then((res) => {
        this.push_list = res.result.group
        console.log('push_list', res.result.group)
      })
    }
  }
}
</script>

<style scoped>
  .merch-group-name {
    font-weight: bold;
  }
  .merch-box {
    display: flex;
    justify-content: space-between;
  }
  .merch-content {}
  .merch-avatar {
    width: 20px;
    height: 20px;
  }
  .merch-name {}
  .merch-btn {}
</style>
