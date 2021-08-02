<template>
  <a-modal
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item v-if="model && model.fatherTitle !== ''" label="父级类名">
          <a-input v-decorator="['pid', { initialValue: model.fatherTitle }]" disabled />
        </a-form-item>
        <a-form-item label="tab标题：">
          <a-input v-if="model && model.addclasstitle === 'addclasstitle'" v-decorator="['title', {rules: [{required: true, min: 2, message: '标题不能为空！'}]}]"/>
          <a-input v-else v-decorator="['title', {rules: [{required: true, min: 2, message: '标题不能为空！'}]}]"/>
        </a-form-item>
        <a-form-item label="聊天菜单显示">
          <a-radio-group
            v-decorator="['status', { initialValue: tabStatus }]">
            <a-radio value="1">
              显示
            </a-radio>
            <a-radio value="0">
              不显示
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <!-- <a-form-item label="链接：">
          <a-input addon-before="Http://" v-decorator="['ceiling_link', { initialValue: ceilingLink }]"/>
        </a-form-item> -->
        <a-form-item label="排序：">
          <a-input-number
            :min="0"
            :max="100"
            v-decorator="['sort', { initialValue: tabSort }]"/>
          (0-99数字越小越靠前)
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['title', 'sort']

export default {
  props: {
    title: {
      type: String,
      default: () => ''
    },
    visible: {
      type: Boolean,
      required: true
    },
    model: {
      type: Object,
      default: () => null
    },
    loading: {
      type: Boolean,
      default: () => false
    }
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
      tabSort: 0,
      tabStatus: '1'
    }
  },
  methods: {
  },
  created () {
    fields.forEach(v => this.form.getFieldDecorator(v))
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
      console.log(this.model)
      if (this.model !== null) {
        this.tabSort = this.model.addclasstitle !== 'addclasstitle' ? this.model.sort : 0
        console.log(this.model.status)
        this.tabStatus = this.model.status === 0 ? '0' : '1'
        console.log(this.tabStatus)
      } else {
        this.tabSort = 0
        this.tabStatus = '1'
      }
    })
  }
}
</script>
