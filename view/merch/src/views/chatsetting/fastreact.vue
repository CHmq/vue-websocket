<template>
  <a-card v-if="is_ok" :body-style="{minHeight: '80vh'}" :bordered="false">
    <a-tabs>
      <a-tab-pane key="1" tab="企业回复">
        <div class="title-box">
          <span class="item-title">企业回复</span>
        </div>
        <div class="item-tip-box">
          <img class="item-tip-image" src="http://px-kefu.oss-cn-hangzhou.aliyuncs.com/tip.png"/><span>预先设置一些常见问题的回复用语，帮助客服人员提高服务效率</span>
        </div>
        <div class="btn-box">
          <a-button @click="toAddCate">添加分组</a-button>
          <a-button>导入数据</a-button>
          <a-button>导出数据</a-button>
          <a-button>清空数据</a-button>
          <a-button>引用规则</a-button>
        </div>
        <div class="content-box">
          <div v-for="(item, index) in cate_list" :key="index" class="cate-box">
            <h4 v-if="item.is_confirm">{{ item.name }}</h4>
            <a-input style="width:50%" v-else v-model="item.name" @change="toGetInputValue(index,item.name)"/>
            <!--  @mouseover="toShowOperate(index)" @mouseout="toHiddenOperate(index)"  -->
            <div class="cate-title-box">
              <!-- <div>{{item.name}}</div> -->
              <div v-if="item.is_confirm" class="item-cate-titile-operate">
                <a-button @click="toAddReact(index, item.id)">添加回复</a-button>
                <a-button @click="toEditCate(index, item.id)">编辑</a-button>
                <a-button @click="toDeleteCate(item.id)">删除</a-button>
              </div>
              <div v-else class="item-cate-titile-operate">
                <a-button @click="toConfirmCate(index, item.name, item.id)">确定</a-button>
                <a-button @click="toCancelCate(index)">取消</a-button>
              </div>
            </div>
            <div class="subitem-box" v-for="(subitem, subindex) in cate_list[index].son" :key="subindex">
              <a-tooltip placement="topRight" :title="subitem.content" arrow-point-at-center>
                {{ subitem.name }}
              </a-tooltip>
              <div class="subitem-operate-box">
                <a-button @click="toEditReact(item.id, subitem.id, subitem.name, subitem.content, index, subindex)">编辑</a-button>
                <a-button @click="toDeleteReact(index, subindex, subitem.id)">删除</a-button>
              </div>
            </div>
            <div>
              <a-modal
                title="添加快捷回复"
                :visible="current_idx === index ? modalListVisible : false"
                @ok="saveFastReact"
                @cancel="handleCancel"
              >
                <!-- <div>
                  类型：<a-radio :checked="true">普通答案</a-radio>
                  <div>
                    <span>*</span>标题：<input v-model="reacttitlevalue"/>
                  </div>
                  <div>
                    内容：<textarea v-model="reactcontentvalue"></textarea>
                  </div>
                </div> -->
                <a-form :form="form" v-bind="formLayout" ref="currentForm">
                  <a-form-item label="类型">
                    <a-radio-group name="radioGroup" :default-value="1">
                      <a-radio :value="1">
                        普通答案
                      </a-radio>
                    </a-radio-group>
                  </a-form-item>
                  <a-form-item label="标题">
                    <a-input placeholder="请输入企业回复标题" v-decorator="['reacttitlevalue', {rules: [{required: true, max: 20, message: '标题不能为空且不超过20个字符！'}], initialValue: reacttitlevalue}]" />
                  </a-form-item>
                  <a-form-item label="内容">
                    <a-textarea placeholder="请输入企业回复内容" v-decorator="['reactcontentvalue', { initialValue: reactcontentvalue }]" :rows="4" />
                  </a-form-item>
                </a-form>
              </a-modal>
            </div>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="个人回复">
        <div class="title-box">
          <span class="item-title">个人回复</span>
        </div>
        <div class="item-tip-box">
          <img class="item-tip-image" src="http://px-kefu.oss-cn-hangzhou.aliyuncs.com/tip.png"/><span>预先设置一些常见问题的回复用语，帮助客服人员提高服务效率</span>
        </div>
        <div class="btn-box">
          <a-button @click="toAgentAddCate">添加分组</a-button>
          <a-button>导入数据</a-button>
          <a-button>导出数据</a-button>
          <a-button>清空数据</a-button>
          <a-button>引用规则</a-button>
        </div>
        <div class="content-box">
          <div v-for="(item, index) in agent_cate_list" :key="index" class="cate-box">
            <h4 v-if="item.is_agent_confirm">{{ item.name }}</h4>
            <a-input style="width:50%" v-else v-model="item.name" @change="toAgentGetInputValue(index, item.name)"/>            <!--  @mouseover="toShowOperate(index)" @mouseout="toHiddenOperate(index)"  -->
            <div class="cate-title-box">
              <!-- <div>{{item.name}}</div> -->
              <div v-if="item.is_agent_confirm" class="item-cate-titile-operate">
                <a-button @click="toAgentAddReact(index, item.id)">添加回复</a-button>
                <a-button @click="toAgentEditCate(index, item.id)">编辑</a-button>
                <a-button @click="toAgentDeleteCate(item.id)">删除</a-button>
              </div>
              <div v-else class="item-cate-titile-operate">
                <a-button @click="toAgentConfirmCate(index, item.name, item.id)">确定</a-button>
                <a-button @click="toAgentCancelCate(index)">取消</a-button>
              </div>
            </div>
            <div class="subitem-box" v-for="(subitem, subindex) in agent_cate_list[index].son" :key="subindex">
              <a-tooltip placement="topRight" :title="subitem.content" arrow-point-at-center>
                {{ subitem.name }}
              </a-tooltip>
              <div class="subitem-operate-box">
                <a-button @click="toAgentEditReact(item.id, subitem.id, subitem.name, subitem.content, index, subindex)">编辑</a-button>
                <a-button @click="toAgentDeleteReact(index, subindex, subitem.id)">删除</a-button>
              </div>
            </div>
            <div>
              <a-modal
                title="添加快捷回复"
                :visible="current_idx === index ? agent_modalListVisible : false"
                @ok="agentSaveFastReact"
                @cancel="agentHandleCancel"
              >
                <!-- <div>
                  类型：<a-radio :checked="true">普通答案</a-radio>
                  <div>
                    <span>*</span>标题：<input v-model="agent_reacttitlevalue"/>
                  </div>
                  <div>
                    内容：<textarea v-model="agent_reactcontentvalue"></textarea>
                  </div>
                </div> -->
                <a-form :form="form" v-bind="formLayout" ref="agentForm">
                  <a-form-item label="类型">
                    <a-radio-group name="radioGroup" :default-value="1">
                      <a-radio :value="1">
                        普通答案
                      </a-radio>
                    </a-radio-group>
                  </a-form-item>
                  <a-form-item label="标题">
                    <a-input placeholder="请输入个人回复标题" v-decorator="['agentReactTitle', {rules: [{required: true, max: 20, message: '标题不能为空且不超过20个字符！'}], initialValue: agent_reacttitlevalue}]" />
                  </a-form-item>
                  <a-form-item label="内容">
                    <a-textarea placeholder="请输入个人回复内容" v-decorator="['agentReactContent', { initialValue: agent_reactcontentvalue }]" :rows="4" />
                  </a-form-item>
                </a-form>
              </a-modal>
              <!-- <Fastreact-modal
                ref="createModal"
                :title="'添加快捷回复'"
                :visible="agent_modalListVisible"
                @cancel="agentHandleCancel"
                @ok="agentSaveFastReact"
              /> -->
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import {
  getMerchSettingList,
  saveMerchReplyGroup,
  saveMerchReply,
  saveMerchReplyGroupPut,
  saveMerchReplyGroupDel,
  saveMerchReplyEdit,
  delMerchReply,
  saveAgentReplyGroup,
  saveAgentReplyGroupPut,
  saveAgentReplyGroupDel,
  saveAgentReply,
  saveAgentReplyEdit,
  delAgentReply
  } from '../../network/Interface/setting'
// import Cookies from 'js-cookie'
// import FastreactModal from './fastreactModal'
export default {
  components: {
    // FastreactModal
  },
  props: {
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      form: this.$form.createForm(this),
      is_ok: false,
      cate_list: [],
      current_idx: 0,
      modalListVisible: false,
      reactcontentvalue: '',
      reacttitlevalue: '',
      current_id: 0,
      current_fastreact_id: 0,
      current_subidx: 0,
      agent_cate_list: [],
      agent_current_idx: 0,
      agent_modalListVisible: false,
      agent_reactcontentvalue: '',
      agent_reacttitlevalue: '',
      agent_current_id: 0,
      agent_current_fastreact_id: 0,
      agent_current_subidx: 0,
      merchReplyGroup: 0, // 企业回复分组id
      agentReplyGroup: 0 // 个人回复分组id
      // merch_title: '请输入回复标题',
      // agent_title: '请输入回复标题',
      // merch_placeholder: '请输入回复内容',
      // agent_placeholder: '请输入回复内容'
    }
  },
  methods: {
    handleCancel () {
      this.modalListVisible = false
    },
    // 保存快捷回复
    saveFastReact () {
      const form = this.$refs.currentForm[0].form
      if (this.current_fastreact_id !== 0) {
        // this.modalListVisible = false
        form.validateFields((errors, values, callback) => {
          console.log(values)
          if (!errors) {
            const postData = {
              id: this.current_fastreact_id,
              name: values.reacttitlevalue,
              group_id: this.current_id,
              content_type: 1,
              content: values.reactcontentvalue,
              rich_content: '222'
            }
            saveMerchReplyEdit(postData).then(res => {
              if (res.error) {
                return this.$message.error(res.error.message)
              }
              console.log(res)
              this.cate_list[this.current_idx].son[this.current_subidx].name = values.reacttitlevalue
              this.cate_list[this.current_idx].son[this.current_subidx].content = values.reactcontentvalue
              this.current_id = 0
              this.current_idx = 0
              this.current_fastreact_id = 0
              this.reacttitlevalue = ''
              this.reactcontentvalue = ''
              this.$message.success(res.success.message)
              this.modalListVisible = false
            })
          } else {
          this.$message.error('创建失败')
          this.modalListVisible = true
          callback()
          }
        })
      } else {
        form.validateFields((errors, values, callback) => {
          if (!errors) {
            const postData = {
              id: this.current_fastreact_id,
              name: values.reacttitlevalue,
              group_id: this.current_id,
              content_type: 1,
              content: values.reactcontentvalue,
              rich_content: '222'
            }
            saveMerchReply(postData).then(res => {
              if (res.error) {
                return this.$message.error(res.error.message)
              }
              console.log(res)
              this.current_id = 0
              this.current_idx = 0
              this.current_fastreact_id = 0
              this.reacttitlevalue = ''
              this.reactcontentvalue = ''
              this.$message.success(res.success.message)
              this.modalListVisible = false
              this.cate_list[this.current_idx].son.push({
                name: values.reacttitlevalue,
                content: values.reactcontentvalue
              })
            })
          } else {
            this.$message.error('创建失败')
            this.modalListVisible = true
            callback()
          }
        })
      }
    },
    // 添加自动回复
    toAddReact (idx, groupId) {
      this.modalListVisible = true
      this.current_idx = idx
      this.reacttitlevalue = ''
      this.reactcontentvalue = ''
      this.$nextTick(() => {
        this.$refs.currentForm[0].form.resetFields()
      })
      console.log(this.merchReplyGroup)
      this.current_id = groupId || this.merchReplyGroup
    },
    // 编辑分类
    toEditCate (idx, groupId) {
      this.cate_list[idx].is_confirm = false
      this.cate_list[idx].operate_type = 'edit'
    },
    // 删除分类
    toDeleteCate (id) {
      const postData = {
        id: id
      }
      saveMerchReplyGroupDel(postData).then(res => {
        const that = this
        // var data = Cookies.get('result')
        // var data = sessionStorage.getItem('result')
        // console.log(JSON.parse(data), this)
        // const result = JSON.parse(data)
        const result = JSON.parse(sessionStorage.getItem('resInfo'))
        this.mchid = result.merch.id
        this.agentId = result.agent_id
        this.current_token = result.token
        const postData = {}
        getMerchSettingList(postData).then((res) => {
          // 遍历列表
          res.result.swift_msg.merchReplyGroup.forEach(item => {
            item.is_confirm = true
            item.operate_type = ''
          })
          that.cate_list = res.result.swift_msg.merchReplyGroup
          console.log('that.cate_list========', that.cate_list)
          that.is_ok = true
        })
      })
    },
    // 编辑自动回复
    toEditReact (groupId, id, name, content, idx, subidx) {
      this.modalListVisible = true
      this.reacttitlevalue = name
      this.reactcontentvalue = content
      this.current_id = groupId
      this.current_fastreact_id = id
      this.current_idx = idx
      this.current_subidx = subidx
    },
    // 删除自动回复
    toDeleteReact (idx, subindex, id) {
      const postData = {
        id: id
      }
      delMerchReply(postData).then(res => {
        this.cate_list[idx].son.splice(subindex, 1)
        // this.cate_list = this.cate_list
      })
    },
    toShowOperate (idx) {
      this.cate_list[idx].is_showoperate = true
      console.log('aaaa')
    },
    toHiddenOperate (idx) {
      this.cate_list[idx].is_showoperate = false
      console.log('bbb')
    },
    toAddCate () {
      this.cate_list.push({
        name: '',
        is_confirm: false,
        // is_showoperate: false,
        son: []
      })
      const arr = this.cate_list
      this.cate_list = arr.reverse()
    },
    // 更改输入框内容
    toGetInputValue (idx, name) {
      this.cate_list[idx].name = name
      console.log('itemcate_name111', this.cate_list[idx].name)
    },
    toCancelCate (idx) {
      if (this.cate_list[idx].operate_type === 'edit') {
        this.cate_list[idx].is_confirm = true
      } else {
        this.cate_list.shift()
        this.cate_list[idx].is_confirm = true
      }
    },
    toConfirmCate (idx, name, id) {
      console.log('this.cate_list[idx].operate_type', this.cate_list[idx].operate_type)
      if (this.cate_list[idx].operate_type === 'edit') {
        const postData = {
          name: name,
          id: id
        }
        saveMerchReplyGroupPut(postData).then((res) => {
          this.cate_list[idx].is_confirm = true
          this.cate_list[idx].name = name
        })
      } else {
        console.log('itemcate_name_idx', idx)
        console.log('itemcate_name', name)
        const postData = {
          name: name
        }
        saveMerchReplyGroup(postData).then((res) => {
          this.cate_list[idx].name = name
          this.cate_list[idx].is_confirm = true
          this.merchReplyGroup = res.result.id
          // this.current_idx = idx + 1
        })
      }
    },
    // --------------------------------个人回复------------------------------
    agentHandleCancel () {
      this.agent_modalListVisible = false
    },
    // 保存快捷回复
    agentSaveFastReact () {
      const form = this.$refs.agentForm[0].form
      if (this.agent_current_fastreact_id !== 0) {
        form.validateFields((errors, values, callback) => {
          if (!errors) {
            const postData = {
              id: this.agent_current_fastreact_id,
              name: values.agentReactTitle,
              group_id: this.agent_current_id,
              content_type: 1,
              content: values.agentReactContent,
              rich_content: '222'
            }
            saveAgentReplyEdit(postData).then(res => {
              if (res.error) {
                return this.$message.error(res.error.message)
              }
              this.agent_cate_list[this.agent_current_idx].son[this.agent_current_subidx].name = values.agentReactTitle
              this.agent_cate_list[this.agent_current_idx].son[this.agent_current_subidx].content = values.agentReactContent
              this.agent_current_id = 0
              this.agent_current_idx = 0
              this.agent_current_fastreact_id = 0
              this.agent_reacttitlevalue = ''
              this.agent_reactcontentvalue = ''
              this.agent_modalListVisible = false
            })
          } else {
            this.$message.error('创建失败')
            this.agent_modalListVisible = true
            callback()
          }
        })
      } else {
        form.validateFields((errors, values, callback) => {
          if (!errors) {
            this.agent_cate_list[this.agent_current_idx].son.push({
              name: values.agentReactTitle,
              content: values.agentReactContent
            })
            const postData = {
              name: values.agentReactTitle,
              group_id: this.agent_current_id,
              content_type: 1,
              content: values.agentReactContent,
              rich_content: '222'
            }
            saveAgentReply(postData).then(res => {
              if (res.error) {
                return this.$message.error(res.error.message)
              }
              this.agent_current_id = 0
              this.agent_current_idx = 0
              this.agent_current_fastreact_id = 0
              this.agent_reacttitlevalue = ''
              this.agent_reactcontentvalue = ''
              this.agent_modalListVisible = false
            })
          } else {
            this.$message.error('创建失败')
            this.agent_modalListVisible = true
            callback()
          }
        })
      }
    },
    // 添加自动回复
    toAgentAddReact (idx, groupId) {
      console.log(idx)
      this.agent_modalListVisible = true
      this.$nextTick(() => {
        this.$refs.agentForm[0].form.resetFields()
      })
      this.agent_current_idx = idx
      this.agent_reacttitlevalue = ''
      this.agent_reactcontentvalue = ''
      this.agent_current_id = groupId || this.agentReplyGroup
    },
    // 编辑分类
    toAgentEditCate (idx, groupId) {
      this.agent_cate_list[idx].is_agent_confirm = false
      this.agent_cate_list[idx].agent_operate_type = 'edit'
    },
    // 删除分类
    toAgentDeleteCate (id) {
      const postData = {
        id: id
      }
      saveAgentReplyGroupDel(postData).then(res => {
        // this.agent_cate_list[idx].splice(idx, 1)
        const that = this
        // var data = Cookies.get('result')
        // var data = sessionStorage.getItem('result')
        // console.log(JSON.parse(data), this)
        // const result = JSON.parse(data)
        const result = JSON.parse(sessionStorage.getItem('resInfo'))
        this.mchid = result.merch.id
        this.agentId = result.agent_id
        this.current_token = result.token
        const postData = {}
        getMerchSettingList(postData).then((res) => {
          // 个人回复
          res.result.swift_msg.agentReplyGroup.forEach(item => {
            item.is_agent_confirm = true
            item.agent_operate_type = ''
          })
          that.agent_cate_list = res.result.swift_msg.agentReplyGroup
          that.is_ok = true
          console.log('that.agent_cate_list========', that.agent_cate_list)
        })
      })
    },
    // 编辑自动回复
    toAgentEditReact (groupId, id, name, content, idx, subidx) {
      this.agent_modalListVisible = true
      this.agent_reacttitlevalue = name
      this.agent_reactcontentvalue = content
      this.agent_current_id = groupId
      this.agent_current_fastreact_id = id
      this.agent_current_idx = idx
      this.agent_current_subidx = subidx
    },
    // 删除自动回复
    toAgentDeleteReact (idx, subindex, id) {
      const postData = {
        id: id
      }
      delAgentReply(postData).then(res => {
        this.agent_cate_list[idx].son.splice(subindex, 1)
      })
    },
    toAgentShowOperate (idx) {
      this.agent_cate_list[idx].is_showoperate = true
      console.log('aaaa')
    },
    toAgentHiddenOperate (idx) {
      this.agent_cate_list[idx].is_showoperate = false
      console.log('bbb')
    },
    toAgentAddCate () {
      this.agent_cate_list.push({
        name: '',
        is_agent_confirm: false,
        // is_showoperate: false,
        son: []
      })
      const arr = this.agent_cate_list
      this.agent_cate_list = arr.reverse()
    },
    // 更改输入框内容
    toAgentGetInputValue (idx, name) {
      this.agent_cate_list[idx].name = name
      console.log('itemcate_name111', this.agent_cate_list[idx].name)
    },
    toAgentCancelCate (idx) {
      if (this.agent_cate_list[idx].agent_operate_type === 'edit') {
        this.agent_cate_list[idx].is_agent_confirm = true
      } else {
        this.agent_cate_list.shift()
        this.agent_cate_list[idx].is_agent_confirm = true
      }
    },
    toAgentConfirmCate (idx, name, id) {
      console.log('this.agent_cate_list[idx].agent_operate_type', this.agent_cate_list[idx].agent_operate_type)
      if (this.agent_cate_list[idx].agent_operate_type === 'edit') {
        const postData = {
          name: name,
          id: id
        }
        saveAgentReplyGroupPut(postData).then((res) => {
          this.agent_cate_list[idx].is_agent_confirm = true
          this.agent_cate_list[idx].name = name
        })
      } else {
        console.log('itemcate_name_idx', idx)
        console.log('itemcate_name', name)
        const postData = {
          name: name
        }
        saveAgentReplyGroup(postData).then((res) => {
          this.agent_cate_list[idx].name = name
          this.agent_cate_list[idx].is_agent_confirm = true
          this.agentReplyGroup = res.result.id
          // this.agent_current_idx = idx + 1
        })
      }
    }
  },
  created () {
      const that = this
      // var data = Cookies.get('result')
      // var data = sessionStorage.getItem('result')
      // console.log(JSON.parse(data), this)
      // const result = JSON.parse(data)
      const result = JSON.parse(sessionStorage.getItem('resInfo'))
      this.mchid = result.merch.id
      this.agentId = result.agent_id
      this.current_token = result.token
      const postData = {}
      getMerchSettingList(postData).then((res) => {
        // that.agentReplyGroup = res.result.swift_msg.agentReplyGroup
        // that.merchReplyGroup = res.result.swift_msg.merchReplyGroup
        // 遍历列表
        res.result.swift_msg.merchReplyGroup.forEach(item => {
          item.is_confirm = true
          item.operate_type = ''
        })
        that.cate_list = res.result.swift_msg.merchReplyGroup
        console.log('that.cate_list========', that.cate_list)
        // 个人回复
        res.result.swift_msg.agentReplyGroup.forEach(item => {
          item.is_agent_confirm = true
          item.agent_operate_type = ''
        })
        that.agent_cate_list = res.result.swift_msg.agentReplyGroup
        that.is_ok = true
        console.log('that.agent_cate_list========', that.agent_cate_list)
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
    color: rgba(0,0,0,.85);
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 20px;
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
  .btn-box {
    margin: 20px 0;
  }
  ::v-deep.ant-btn {
    margin: 0 3px;
  }
  /* .content-box {
    padding: 15px 20px;
  } */
  .cate-box{
    position: relative;
    border: 1px solid #ccc;
    border-radius: 13px;
    margin: 10px 0;
    padding: 15px;
  }
  .cate-title-box {
    /* display: flex;
    align-items: center; */
    position: absolute;
    right: 15px;
    top: 0;
    padding: 10px 0;
  }
  .item-cate-titile-operate {
    float: right;
    /* position: absolute; */
    /* width: 235px; */
    /* right: 0; */
    /* top: -30px; */
    /* transform: translateY(-50%); */
  }
  .item-content-box {
    vertical-align: top;
    margin: 8px 0;
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
  .subitem-box {
    margin-left: 10px;
    display: flex;
    align-items: center;
    padding: 20px 0 10px;
    justify-content: space-between;
  }
</style>
