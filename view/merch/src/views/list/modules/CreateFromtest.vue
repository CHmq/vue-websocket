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
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-if="model && model.id > 0" label="分组ID">
          <a-input v-decorator="['id', { initialValue: model.id }]" disabled/>
        </a-form-item>
        <a-form-item label="分组名称">
          <a-input v-decorator="['name', {rules: [{required: true, min: 2, message: '分组名称长度不能小于 2！'}]}]" />
        </a-form-item>
        <a-form-item label="默认接待客户">
          <a-radio-group
            v-decorator="['is_receive', { initialValue: value }]">
            <a-radio value="0">
              否
            </a-radio>
            <a-radio value="1">
              是
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'name']

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
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
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
      value: '0'
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      console.log(this.model)
      this.model && this.form.setFieldsValue(pick(this.model, fields))
      this.value = this.model.is_receive.toString()
    })
  }
}
</script>
