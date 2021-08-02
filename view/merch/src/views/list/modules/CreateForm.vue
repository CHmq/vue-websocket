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
        <a-form-item v-if="model && model.id > 0" label="客服ID">
          <a-input v-decorator="['id', { initialValue: model.id }]" disabled />
        </a-form-item>
        <a-form-item label="客服名称">
          <a-input v-decorator="['name', {rules: [{required: true, min: 2, message: '名称不能为空且不得少于两个字符！'}], initialValue: name}]" />
        </a-form-item>
        <a-form-item v-if="model && !model.id" label="客服密码">
          <a-input v-decorator="['pwd', {rules: [{required: true, min: 6, message: '客服密码不能为空且不得少于六个字符！'}], initialValue: pwd}]" />
        </a-form-item>
        <a-form-item label="客服邮箱">
          <a-input v-decorator="['email', {rules: [{required: true, min: 3, message: '请输入符合的邮箱规则！'}]}]" :disabled="model && model.email ? true : false"/>
        </a-form-item>
        <a-form-item label="客服分组">
          <a-select v-decorator="['group_id', {rules: [{ required: true, message: '请选择一个分组名称！' }], initialValue: group}]">
            <a-select-option v-for="(data, index) in groupList" :key="index" :value="data.id">
              {{ data.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="最大接待人数">
          <a-input-number
            :min="1"
            :max="100"
            v-decorator="['ceiling_client', { initialValue: ceilingValue }]"/>
        </a-form-item>
        <a-form-item label="权重值">
          <a-input-number
            :min="1"
            :max="95"
            v-decorator="['weight_value', { initialValue: weightValue }]"
          /><br>
          <span style="font-size:13px">
            当基础分配规则时,将以代理商的权重值来分配客户,权重值越高将优先分配,基础分配规则为其他时则无效
          </span>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'name', 'email']

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
    },
    groupList: {
      type: Array,
      default: () => []
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
      ceilingValue: 20, // 接待人数
      weightValue: 20, // 权重值
      group: 1, // 分组
      name: '',
      pwd: '123456789' // 默认密码
    }
  },
  methods: {
    // onChange (value) {
    //   // console.log('changed', value)
    // },
    // setVaule () {
    //   this.form.resetFields()
    // }
  },

  created () {
    // console.log('custom modal created')
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))
    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
      console.log(this.model)
      this.group = this.model.group_id
      // this.pwd = this.model ? this.model.pwd : '123456789'
      this.name = this.model.name ? this.model.name : ''
      this.ceilingValue = this.model.ceiling_client ? this.model.ceiling_client : 20
      this.weightValue = this.model.weight_value ? this.model.weight_value : 20
    })
  }
}
</script>
