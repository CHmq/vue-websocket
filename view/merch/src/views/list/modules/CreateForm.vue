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
          <a-input v-decorator="['name', {rules: [{required: true, min: 1, message: '名称不能为空！'}]}]" />
        </a-form-item>
        <a-form-item label="客服邮箱">
          <a-input v-decorator="['email', {rules: [{required: true, min: 3, message: '请输入符合的邮箱规则！'}]}]" :disabled="model && model.email ? true : false"/>
        </a-form-item>
        <a-form-item label="客服分组">
          <a-select
            v-decorator="['group_id', { initialValue: groupValue }]"
          >
            <a-select-option :value="1">
              售前
            </a-select-option>
            <a-select-option :value="2">
              售后
            </a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item label="客服分组">
          <a-select v-decorator="['config_group_id', { initialValue: groupValue }]">
            <a-select-option value="1">
              售前
            </a-select-option>
            <a-select-option value="2">
              售后
            </a-select-option>
          </a-select>
        </a-form-item> -->
        <a-form-item label="最大接待人数">
          <a-input-number
            :min="1"
            :max="100"
            @change="onChange"
            v-decorator="['ceiling_client', { initialValue: value }]"/>
        </a-form-item>
        <a-form-item label="权重值">
          <a-input-number
            :min="1"
            :max="95"
            @change="onChange"
            v-decorator="['weight_value', { initialValue: value }]"
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
      value: 20,
      groupValue: 1
    }
  },
  methods: {
    onChange (value) {
      console.log('changed', value)
    },
    setVaule () {
      this.form.resetFields()
    }
    // getMealCategory () {
    //   this.mealCategory = this.form.getFieldValue('group_id')
    //   console.log(`调用getMealCategory()--${this.group_id}`)
    //   // 将获取的学校类别传递给学校组件
    //   this.$refs.activityMealSchoolTable.addGradeAndSchool(this.group_id)
    // }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))
    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>
