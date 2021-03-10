<template>
  <div v-if="is_ok" class="wrap">
    <div class="item-box">
      <div class="title-box">
        <span class="item-title">企业欢迎消息</span>
        <div v-if="is_can_edit_1===false" @click="toCancelDisable(1)" class="item-edit">编辑</div>
        <div v-if="is_can_edit_1===true" class="item-edit">
          <span @click="toCancel(1)" class="item-cancel">取消</span>
          <span @click="toSave(1)">保存</span>
        </div>
      </div>
      <div class="item-tip-box">
        <img class="item-tip-image" src="http://px-kefu.oss-cn-hangzhou.aliyuncs.com/tip.png"/><span>{{ merch_welcome_msg.describe }}</span>
      </div>
      <div class="item-switch-box">
        <span>功能启用：</span><a-switch checkedChildren="开" unCheckedChildren="关" :defaultChecked="merch_welcome_msg.values.status=='1'" @change="onChange(1)"/>
      </div>
      <div class="content-box">
        <div class="item-content-box">
          <textarea :value="merch_welcome_msg.values.content" @change="toChangeInput(1)" ref="merch_welcome_msg_content" :disabled="is_can_edit_1===false"/>
          <!-- <quill-editor
          v-model="this.merch_welcome_msg.values.content"
          ref="myQuillEditor"
          :options="editorOption"
          aria-disabled="true"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          @change="onEditorChange($event)">
        </quill-editor> -->
        </div>
      </div>
    </div>
    <div class="item-box">
      <div class="title-box">
        <span class="item-title">客服无应答时消息</span>
        <div v-if="is_can_edit_2===false" @click="toCancelDisable(2)" class="item-edit">编辑</div>
        <div v-if="is_can_edit_2===true" class="item-edit">
          <span @click="toCancel(2)" class="item-cancel">取消</span>
          <span @click="toSave(2)">保存</span>
        </div>
      </div>
      <div class="item-tip-box">
        <img class="item-tip-image" src="http://px-kefu.oss-cn-hangzhou.aliyuncs.com/tip.png"/><span>{{ agent.describe }}</span>
      </div>
      <div class="item-switch-box">
        <span>功能启用：</span><a-switch checkedChildren="开" unCheckedChildren="关" :defaultChecked="agent.values.status=='1'" @change="onChange(2)"/>
      </div>
      <div class="content-box">
        <div class="item-content-box content-input-box">
          <span class="item-content-title">发送时间：</span>
          <div class="item-input-box">
            <!-- client_queue_setting.values.queueing_settings.queue_limit -->
            <span>客服超过</span><input class="item-input" @change="toChangeInput(3)" :value="agent.values.countdown" ref="agent_countdown" :disabled="is_can_edit_2===false"/><span>秒后无响应自动发送</span>
          </div>
        </div>
        <div class="item-content-box">
          <textarea :value="agent.values.content" @change="toChangeInput(2)" ref="agent_content" :disabled="is_can_edit_2===false"/>
        </div>
      </div>
    </div>
    <div class="item-box">
      <div class="title-box">
        <span class="item-title">顾客无响应时消息</span>
        <div v-if="is_can_edit_3===false" @click="toCancelDisable(3)" class="item-edit">编辑</div>
        <div v-if="is_can_edit_3===true" class="item-edit">
          <span @click="toCancel(3)" class="item-cancel">取消</span>
          <span @click="toSave(3)">保存</span>
        </div>
      </div>
      <div class="item-tip-box">
        <img class="item-tip-image" src="http://px-kefu.oss-cn-hangzhou.aliyuncs.com/tip.png"/><span>{{ client.describe }}</span>
      </div>
      <div class="item-switch-box">
        <span>功能启用：</span><a-switch checkedChildren="开" unCheckedChildren="关" :defaultChecked="client.values.status=='1'" @change="onChange(3)"/>
      </div>
      <div class="content-box">
        <div class="item-content-box content-input-box">
          <span class="item-content-title">发送时间：</span>
          <div class="item-input-box">
            <!-- client_queue_setting.values.queueing_settings.queue_limit -->
            <span>顾客超过</span><input class="item-input" @change="toChangeInput(4)" :value="client.values.countdown" ref="client_countdown" :disabled="is_can_edit_3===false"/><span>秒后无响应自动发送</span>
          </div>
        </div>
        <div class="item-content-box">
          <textarea :value="client.values.content" @change="toChangeInput(5)" ref="client_content" :disabled="is_can_edit_3===false"/>
        </div>
      </div>
    </div>
    <div class="item-box">
      <div class="title-box">
        <span class="item-title">自动回复消息</span>
      </div>
      <div class="item-tip-box">
        <img class="item-tip-image" src="http://px-kefu.oss-cn-hangzhou.aliyuncs.com/tip.png"/><span>{{ merch_auto_reply.describe }}</span>
      </div>
      <div class="item-switch-box">
        <span>功能启用：</span><a-switch checkedChildren="开" unCheckedChildren="关" :defaultChecked="merch_auto_reply.values=='1'" @change="onChange(4)"/>
      </div>
    </div>
    <div class="item-box">
      <div class="title-box">
        <span class="item-title">对话结束</span>
        <div v-if="is_can_edit_5===false" @click="toCancelDisable(5)" class="item-edit">编辑</div>
        <div v-if="is_can_edit_5===true" class="item-edit">
          <span @click="toCancel(5)" class="item-cancel">取消</span>
          <span @click="toSave(5)">保存</span>
        </div>
      </div>
      <div class="item-tip-box">
        <img class="item-tip-image" src="http://px-kefu.oss-cn-hangzhou.aliyuncs.com/tip.png"/><span>{{ dialog_end.describe }}</span>
      </div>
      <div class="item-switch-box">
        <span>功能启用：</span><a-switch checkedChildren="开" unCheckedChildren="关" :defaultChecked="dialog_end.values.status=='1'" @change="onChange(5)"/>
      </div>
      <div class="content-box">
        <div class="item-content-box content-input-box"><span class="item-content-title">客服手动结束时：</span></div>
        <div class="item-content-box">
          <textarea :value="dialog_end.values.agent_ending_message" @change="toChangeInput(6)" ref="agent_ending_message_content" :disabled="is_can_edit_5===false"/>
        </div>
      </div>
      <div class="content-box">
        <div class="item-content-box content-input-box"><span class="item-content-title">系统自动关闭时：</span></div>
        <div class="item-content-box">
          <textarea :value="dialog_end.values.auto_ending_message" @change="toChangeInput(7)" ref="auto_ending_message_content" :disabled="is_can_edit_5===false"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMerchSettingList, saveMerchWelcomeMsg, saveNoResponse, merchAuthMsg, saveDialogEnd } from '../../network/websocket'
import Cookies from 'js-cookie'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    // quillEditor
  },
  props: {
  },
  data () {
    return {
      is_can_edit_1: false,
      is_can_edit_2: false,
      is_can_edit_3: false,
      is_can_edit_5: false,
      is_ok: false,
      merch_welcome_msg: {},
      agent: {},
      client: {},
      merch_auto_reply: {},
      dialog_end: {},
      merch_welcome_msg_content: '',
      agent_content: '',
      agent_countdown: '',
      client_content: '',
      client_countdown: '',
      agent_ending_message_content: '',
      auto_ending_message_content: '',
      editorOption: {
        // some quill options
      }
    }
  },
  methods: {
    toChangeInput (val) {
      if (val === 1) {
        this.merch_welcome_msg_content = this.$refs.merch_welcome_msg_content.value
        this.merch_welcome_msg.values.content = this.$refs.merch_welcome_msg_content.value
      } else if (val === 2) {
        this.agent_content = this.$refs.agent_content.value
        this.agent.values.content = this.$refs.agent_content.value
      } else if (val === 3) {
        this.agent_countdown = this.$refs.agent_countdown.value
        this.agent.values.countdown = this.$refs.agent_countdown.value
      } else if (val === 4) {
        this.client.countdown = this.$refs.client_countdown.value
        this.client.values.countdown = this.$refs.client_countdown.value
      } else if (val === 5) {
        this.client_content = this.$refs.client_content.value
        this.client.values.content = this.$refs.client_content.value
      } else if (val === 6) {
        console.log('agent_ending_message_content', this.$refs.agent_ending_message_content.value)
        this.agent_ending_message_content = this.$refs.agent_ending_message_content.value
        this.dialog_end.values.agent_ending_message = this.$refs.agent_ending_message_content.value
        console.log('agent_ending_message_content', this.dialog_end.values.agent_ending_message)
      } else if (val === 7) {
        console.log('auto_ending_message_content', this.$refs.auto_ending_message_content.value)
        this.auto_ending_message_content = this.$refs.auto_ending_message_content.value
        this.dialog_end.values.auto_ending_message = this.$refs.auto_ending_message_content.value
        console.log('auto_ending_message_content', this.dialog_end.values.auto_ending_message)
      }
    },
    toCancelDisable (val) {
      if (val === 1) {
        this.is_can_edit_1 = !this.is_can_edit_1
      } else if (val === 2) {
        this.is_can_edit_2 = !this.is_can_edit_2
      } else if (val === 3) {
        this.is_can_edit_3 = !this.is_can_edit_3
      } else if (val === 5) {
        this.is_can_edit_5 = !this.is_can_edit_5
      }
    },
    onChange (val) {
      const that = this
      const postData = {}
      getMerchSettingList(postData).then((res) => {
        that.merch_welcome_msg = res.result.auth_msg.merch_welcome_msg
        that.agent = res.result.auth_msg.agent
        that.client = res.result.auth_msg.client
        that.merch_auto_reply = res.result.auth_msg.merch_auto_reply
        that.dialog_end = res.result.auth_msg.dialog_end
        that.is_ok = true
        if (val === 1) {
          if (that.merch_welcome_msg.values.status) {
            that.merch_welcome_msg.values.status = 0
            that.toSave(val)
          } else {
            that.merch_welcome_msg.values.status = 1
            that.toSave(val)
          }
        } else if (val === 2) {
          if (that.agent.values.status) {
            that.agent.values.status = 0
            that.toSave(val)
          } else {
            that.agent.values.status = 1
            that.toSave(val)
          }
        } else if (val === 3) {
          if (that.client.values.status) {
            that.client.values.status = 0
            that.toSave(val)
          } else {
            that.client.values.status = 1
            that.toSave(val)
          }
        } else if (val === 4) {
          if (that.merch_auto_reply.values) {
            that.merch_auto_reply.values = 0
            that.toSave(val)
          } else {
            that.merch_auto_reply.values = 1
            that.toSave(val)
          }
        } else if (val === 5) {
          if (that.dialog_end.values.status) {
            that.dialog_end.values.status = 0
            that.toSave(val)
          } else {
            that.dialog_end.values.status = 1
            that.toSave(val)
          }
        }
      })
    },
    toCancel (val) {
      if (val === 1) {
        this.is_can_edit_1 = false
      } else if (val === 2) {
        this.is_can_edit_2 = false
      } else if (val === 3) {
        this.is_can_edit_3 = false
      } else if (val === 5) {
        this.is_can_edit_5 = false
      }
      const that = this
      const postData = {}
      getMerchSettingList(postData).then((res) => {
        that.merch_welcome_msg = res.result.auth_msg.merch_welcome_msg
        that.agent = res.result.auth_msg.agent
        that.client = res.result.auth_msg.client
        that.merch_auto_reply = res.result.auth_msg.merch_auto_reply
        that.dialog_end = res.result.auth_msg.dialog_end
        that.is_ok = true
      })
    },
    toSave (val) {
      if (val === 1) {
        const postData = {
          status: this.merch_welcome_msg.values.status,
          content: this.merch_welcome_msg.values.content
        }
        console.log('postDatapostDatapostData=', postData)
        saveMerchWelcomeMsg(postData).then(res => {
          this.is_can_edit_1 = false
        })
      } else if (val === 2) {
        const postData = {
          status: this.agent.values.status,
          content: this.agent.values.content,
          countdown: this.agent.values.countdown,
          identity: 'agent'
        }
        console.log('postDatapostDatapostData=', postData)
        saveNoResponse(postData).then(res => {
          this.is_can_edit_2 = false
        })
      } else if (val === 3) {
        console.log('this.client.values.status', this.client.values.status)
        const postData = {
          status: this.client.values.status,
          content: this.client.values.content,
          countdown: this.client.values.countdown,
          identity: 'client'
        }
        console.log('postDatapostDatapostData=', postData)
        saveNoResponse(postData).then(res => {
          this.is_can_edit_3 = false
        })
      } else if (val === 4) {
        console.log('this.merch_auto_reply.values', this.merch_auto_reply.values)
        const postData = {
          merch_auto_reply: this.merch_auto_reply.values
        }
        console.log('postDatapostDatapostData=', postData)
        merchAuthMsg(postData).then(res => {})
      } else if (val === 5) {
        console.log('that.dialog_end.values.status', this.dialog_end.values.status)
        const postData = {
          status: this.dialog_end.values.status,
          agent_ending_message: this.dialog_end.values.agent_ending_message,
          auto_ending_message: this.dialog_end.values.auto_ending_message
        }
        console.log('postDatapostDatapostData=', postData)
        saveDialogEnd(postData).then(res => {
          this.is_can_edit_5 = false
        })
      }
    }
    // onEditorBlur (quill) {
    //   if (this.is_can_edit === false) {
    //     quill.enable(false)
    //   } else {
    //     quill.enable(true)
    //   }
    // },
    // onEditorFocus (quill) {
    //   if (this.is_can_edit === false) {
    //     quill.enable(false)
    //   } else {
    //     quill.enable(true)
    //   }
    // },
    // onEditorReady (quill) {
    //   if (this.is_can_edit === false) {
    //     quill.enable(false)
    //   } else {
    //     quill.enable(true)
    //   }
    // },
    // onEditorChange ({ quill, html, text }) {
    //   console.log('editor change!', quill, html, text)
    //   this.$emit('change', html)
    //   if (this.is_can_edit === false) {
    //     quill.enable(false)
    //   } else {
    //     quill.enable(true)
    //   }
    // }
  },
  // watch: {
  //   value (val) {
  //     this.content = val
  //   }
  // },
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
        that.merch_welcome_msg = res.result.auth_msg.merch_welcome_msg
        that.agent = res.result.auth_msg.agent
        that.client = res.result.auth_msg.client
        that.merch_auto_reply = res.result.auth_msg.merch_auto_reply
        that.dialog_end = res.result.auth_msg.dialog_end
        that.is_ok = true
        console.log('that.merch_welcome_msg========', that.merch_welcome_msg)
        console.log('that.agent========', that.agent)
        console.log('that.client========', that.client)
        console.log('that.merch_auto_reply========', that.merch_auto_reply)
        console.log('that.dialog_end========', that.dialog_end)
      })
  }
}
</script>

<style scoped>
  .wrap {
    /* background-color: #fff; */
    padding: 20px;
    color: #222;
  }
  .item-box {
    margin-bottom: 15px;
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
  .item-content-box>textarea {
    vertical-align: top;
    padding: 10px;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
  }
  /* .item-content-title {
    vertical-align: top;
  } */
  .content-input-box {
    display: flex;
    align-items: center;
  }
  .item-input {
    margin: 0 5px;
    width: 60px;
    padding: 5px 10px;
  }
</style>
