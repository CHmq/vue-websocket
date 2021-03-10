<template>
  <div v-if="is_ok" class="wrap">
    <div class="title-box">
      <span class="item-title">顾客排队</span>
      <div v-if="is_can_edit===false" @click="toCancelDisable" class="item-edit">编辑</div>
      <div v-if="is_can_edit===true" class="item-edit">
        <span @click="toCancel" class="item-cancel">取消</span>
        <span @click="toSave">保存</span>
      </div>
    </div>
    <div class="item-tip-box">
      <img class="item-tip-image" src="http://px-kefu.oss-cn-hangzhou.aliyuncs.com/tip.png"/><span>{{ client_queue.describe }}</span>
    </div>
    <div class="item-switch-box">
      <span>功能启用：</span><a-switch checkedChildren="开" unCheckedChildren="关" :defaultChecked="client_queue_setting.values.queueing_settings.status?true:false" @change="onChange"/>
    </div>
    <div class="content-box">
      <div class="item-content-box content-input-box">
        <span class="item-content-title">排队上线：</span>
        <div class="item-input-box">
          <!-- client_queue_setting.values.queueing_settings.queue_limit -->
          <span>当排队人数超过</span><input class="item-input" @change="toChangeInput(1)" :value="client_queue_setting.values.queueing_settings.queue_limit" ref="inputvalue_queue_limit" :disabled="is_can_edit===false"/><span>人时，后续新进入对话自动转到留言</span>
          <div class="item-input-tip">* 共有{{ agent_data.agent_sum }}个客服人员，最大接待上限{{ agent_data.ceiling_client }}</div>
        </div>
      </div>
      <div class="item-content-box">
        <span class="item-content-title">提示文案：</span><textarea class="item-textarea-box" :value="client_queue_setting.values.queueing_settings.intro" @change="toChangeInput(2)" ref="inputvalue_intro" :disabled="is_can_edit===false"/>
      </div>
      <div class="item-content-box">
        <span class="item-content-title">引导留言文案：</span><input class="item-content-input-box" :value="client_queue_setting.values.queueing_settings.ticket_intro" @change="toChangeInput(3)" ref="inputvalue_ticket_intro" :disabled="is_can_edit===false"/>
      </div>
      <div class="item-style-content-box">
        <span class="item-content-title">示例预览：</span>
        <div class="style-box">
          <div class="item-style-title">排队等待中</div>
          <div class="item-style-content">{{ client_queue_setting.values.queueing_settings.intro }}</div>
          <div class="item-num-box">
            <div class="item-num-title">当前等待人数</div>
            <div class="item-num">3</div>
          </div>
          <div class="item-tip-style-box">{{ client_queue_setting.values.queueing_settings.ticket_intro }}</div>
          <div class="item-style-btn">给我们留言</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMerchSettingList, settingQueueingSetting } from '../../network/websocket'
import Cookies from 'js-cookie'
export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      is_on: false,
      is_can_edit: false,
      agentId: '',
      current_token: '',
      mchid: '',
      agent_data: {},
      client_queue: {},
      client_queue_setting: {},
      is_ok: false,
      inputvalue_queue_limit: '',
      inputvalue_intro: '',
      inputvalue_ticket_intro: ''
    }
  },
  methods: {
    toChangeInput (val) {
      if (val === 1) {
        console.log('inputvalue', this.$refs.inputvalue_queue_limit.value)
        this.inputvalue_queue_limit = this.$refs.inputvalue_queue_limit.value
        this.client_queue_setting.values.queueing_settings.queue_limit = this.$refs.inputvalue_queue_limit.value
        console.log('client_queue_setting.values.queueing_settings.queue_limit', this.client_queue_setting.values.queueing_settings.queue_limit)
      } else if (val === 2) {
        console.log('inputvalue', this.$refs.inputvalue_intro.value)
        this.inputvalue_intro = this.$refs.inputvalue_intro.value
        this.client_queue_setting.values.queueing_settings.intro = this.$refs.inputvalue_intro.value
        console.log('client_queue_setting.values.queueing_settings.inputvalue_intro', this.client_queue_setting.values.queueing_settings.intro)
      } else if (val === 3) {
        console.log('inputvalue', this.$refs.inputvalue_ticket_intro.value)
        this.inputvalue_ticket_intro = this.$refs.inputvalue_ticket_intro.value
        this.client_queue_setting.values.queueing_settings.ticket_intro = this.$refs.inputvalue_ticket_intro.value
        console.log('client_queue_setting.values.queueing_settings.inputvalue_ticket_intro', this.client_queue_setting.values.queueing_settings.ticket_intro)
      }
    },
    toCancelDisable () {
      this.is_can_edit = !this.is_can_edit
    },
    onChange () {
      this.is_on = !this.is_on
      console.log('this.client_queue_setting.values.queueing_settings.status', this.client_queue_setting.values.queueing_settings.status)
      const that = this
      const postData = {
          agent_id: this.agentId,
          token: this.current_token
      }
      getMerchSettingList(postData).then((res) => {
        that.client_queue = res.result.queueing.client_queue
        that.client_queue_setting = res.result.queueing.client_queue_setting
        that.agent_data = res.result.agent
        that.is_ok = true
        if (that.client_queue_setting.values.queueing_settings.status) {
          that.client_queue_setting.values.queueing_settings.status = 0
          that.toSave()
        } else {
          that.client_queue_setting.values.queueing_settings.status = 1
          that.toSave()
        }
      })
    },
    toCancel () {
      this.is_can_edit = false
      const that = this
       const postData = {
          agent_id: this.agentId,
          token: this.current_token
      }
      getMerchSettingList(postData).then((res) => {
        that.client_queue = res.result.queueing.client_queue
        that.client_queue_setting = res.result.queueing.client_queue_setting
        that.agent_data = res.result.agent
        that.is_ok = true
      })
    },
    toSave () {
      const postData = {
          agent_id: this.agentId,
          token: this.current_token,
          mchid: this.mchid,
          intro: this.client_queue_setting.values.queueing_settings.intro,
          status: this.client_queue_setting.values.queueing_settings.status,
          ticket_intro: this.client_queue_setting.values.queueing_settings.ticket_intro,
          queue_limit: this.client_queue_setting.values.queueing_settings.queue_limit
      }
      console.log('postDatapostDatapostData=', postData)
      settingQueueingSetting(postData).then(res => {
        console.log('res========', res)
        this.is_can_edit = false
      })
    }
  },
  created () {
      const that = this
      var data = Cookies.get('result')
      console.log(JSON.parse(data), this)
      const result = JSON.parse(data)
      this.mchid = result.merch.id
      this.agentId = result.id
      this.current_token = result.token
      const postData = {
          agent_id: result.id,
          token: result.token
      }
      getMerchSettingList(postData).then((res) => {
        that.client_queue = res.result.queueing.client_queue
        that.client_queue_setting = res.result.queueing.client_queue_setting
        that.agent_data = res.result.agent
        that.is_ok = true
        console.log('that.client_queue========', that.client_queue)
        console.log('that.client_queue_setting========', that.client_queue_setting)
        console.log('that.agent_data========', that.agent_data)
      })
  }
}
</script>

<style scoped>
  .wrap {
    background-color: #fff;
    padding: 20px;
    color: #222;
  }
  .title-box {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 18px;
  }
  .item-edit {
    font-weight: 500;
    color: #1880ff;
    font-size: 16px;
  }
  .item-cancel {
    margin-right: 10px;
  }
  .item-tip-box {
    margin: 8px 0;
    display: flex;
    align-items: center;
    color: #666;
  }
  .item-tip-image {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .item-switch-box {
    margin: 8px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d6d6d6;
    padding-bottom: 8px;
  }
  .content-box {
    padding: 15px 20px;
  }
  .item-content-box {
    vertical-align: top;
    margin: 8px 0;
  }
  .item-content-title {
    vertical-align: top;
    width: 15%;
    display: inline-block;
  }
  /* .item-content-title {
    vertical-align: top;
  } */
  .content-input-box {
    display: flex;
    /* align-items: center; */
  }
  .item-input {
    margin: 0 5px;
    width: 60px;
    padding: 5px 10px;
  }
  .style-box {
    width: 330px;
    box-shadow: 0 4px 12px rgba(52, 63, 75, 0.15);
    text-align: center;
    border-radius: 0 0 5px 5px;
  }
  .item-style-content-box {
    display: flex;
  }
  .item-style-title {
    padding: 30px;
    color: #fff;
    background-color: #1880ff;
    border-radius: 5px 5px 0 0;
    text-align: left;
  }
  .item-style-content {
    padding: 20px 30px 50px;
    text-align: left;
    border-bottom: 1px solid #e6e6e6;
  }
  .item-num-box {
    color: #1880ff;
    padding: 30px 0;
    border-bottom: 1px solid #e6e6e6;;
  }
  .item-num-title {}
  .item-num {
    font-size: 70px;
  }
  .item-tip-style-box {
    /* text-align: center; */
    padding: 30px 0 10px;
  }
  .item-style-btn {
    background-color: #1880ff;
    color: #fff;
    padding: 10px;
    width: 80%;
    margin: 10px auto;
    border-radius: 5px;
  }
  .item-textarea-box {
    width: 60%;
    height: 130px;
    box-sizing: border-box;
    padding: 10px;
  }
  .item-content-input-box {
    width: 60%;
    height: 40px;
    box-sizing: border-box;
    padding: 10px;
  }
</style>
