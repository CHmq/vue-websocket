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
      <div slot="list" v-if="type === 'list'" style="min-height:350px">
        推送列表
        <div v-if="push_list.length === 0">
          <h3>当前暂无其他客服在线</h3>
        </div>
        <a-collapse
          class="pushList"
          :bordered="false"
          accordion
          v-for="(item, index) in push_list"
          :key="index">
          <a-collapse-panel key="1" :header="item.group_name">
            <a-list
              class="demo-loadmore-list"
              :loading="loading"
              item-layout="horizontal"
              :data-source="item.agents"
            >
              <a-list-item slot="renderItem" slot-scope="subitem">
                <a slot="actions">
                  <a-button
                    :size="'small'"
                    :disabled="subitem.ceiling_client === subitem.ceiling_sum ? true : false"
                    @click="toPushUser(subitem)">
                    转接
                  </a-button>
                </a>
                <a-list-item-meta>
                  <b slot="title">
                    <span class="merch-name">{{ subitem.name }}</span>
                    <span>({{ subitem.ceiling_sum }} / {{ subitem.ceiling_client }})</span>
                  </b>
                  <a-avatar
                    slot="avatar"
                    :src="subitem.avatar ? `${imgUrl}${subitem.avatar}` :
                      'http://endofyear-activities.oss-cn-hangzhou.aliyuncs.com/avatar.jpg'"
                  />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </ModalSlot>
  </a-modal>
</template>
<script>
import ModalSlot from './slot'
import { getPushList, pushClient } from '../../../network/Interface/dialogue'

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
      show_is_agree: false,
      imgUrl: ''
    }
  },
  methods: {
    // 推送消息给用户
    toPushUser (item) {
      console.log('item=============', item)
      // const that = this
      item.mchid = this.mchid
      item.clientid = this.clientid
      this.currentInfo = item
      pushClient(item).then((res) => {
        console.log(res)
        if (res.error) {
          return this.$message.error(res.error.message)
        }
        this.$message.success(res.success.message)
        this.pushdata_id = res.result.id
        item.ceiling_sum++
        this.$emit('cancel')
        // this.push_list
        this.sendPhsh()
      })
    },
    // 发送推送消息
    sendPhsh () {
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
      this.$emit('pushInfo', actions)
    },
    pushList () {
       getPushList(this.mchid).then((res) => {
          console.log(res)
          if (res.error) {
            return this.$message.error(res.error.message)
          }
          // 转换成数组
          res.result.map((item) => {
            if (item.agents instanceof Object) {
              item.agents = Object.keys(item.agents).map(i => item.agents[i])
            }
          })
          this.push_list = res.result.filter(item => item.agents.length !== 0)
          this.imgUrl = this.$store.state.userUrl
        })
     }
  },
  created () {
    if (this.type === 'list') {
      this.pushList()
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
  .pushList{
    margin-top: 20px;
  }
</style>
