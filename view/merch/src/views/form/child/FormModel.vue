<template>
  <a-form-model
    ref="ruleForm"
    :rules="rules"
    :model="clientCard"
    :label-col="labelCol"
    :wrapper-col="wrapperCol">
    <a-form-model-item label="ID" style="display:none">
      <a-input v-model="clientCard.id"/>
    </a-form-model-item>
    <a-form-model-item label="昵称" prop="client_name">
      <a-input v-model="clientCard.client_name" @blur="submit">
        <a-tooltip slot="suffix">
          <a-icon type="edit" class="clientCard"/>
        </a-tooltip>
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="电话">
      <a-input v-model="clientCard.mobile" @blur="submit">
        <a-tooltip slot="suffix">
          <a-icon type="edit" class="clientCard"/>
        </a-tooltip>
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="邮箱" prop="email">
      <a-input v-model="clientCard.email" @blur="submit">
        <a-tooltip slot="suffix">
          <a-icon type="edit" class="clientCard"/>
        </a-tooltip>
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="性别">
      <a-radio-group v-model="clientCard.sex" @change="submit">
        <a-radio :value="1">
          男
        </a-radio>
        <a-radio :value="2">
          女
        </a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="QQ">
      <a-input v-model="clientCard.qq" @blur="submit">
        <a-tooltip slot="suffix">
          <a-icon type="edit" class="clientCard"/>
        </a-tooltip>
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="wechat">
      <a-input v-model="clientCard.wechat" @blur="submit">
        <a-tooltip slot="suffix">
          <a-icon type="edit" class="clientCard"/>
        </a-tooltip>
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="地址">
      <a-input v-model="clientCard.city" @blur="submit">
        <a-tooltip slot="suffix">
          <a-icon type="edit" class="clientCard"/>
        </a-tooltip>
      </a-input>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { editClientInfo } from '../../../network/Interface/dialogue'

export default {
  props: {
    clientCard: {
			type: Object,
			default: () => {}
    }
  },
  data () {
    let checkNamePending
    let checkEmailPending
    const checkName = (rule, value, callback) => {
      clearTimeout(checkNamePending)
      checkNamePending = setTimeout(() => {
        const reg = new RegExp('^.{2,}$')
        if (value !== '' && !reg.test(value)) {
          callback(new Error('昵称不能少于两个字符'))
        } else {
          callback()
        }
      }, 500)
    }
    const checkEmail = (rule, value, callback) => {
      clearTimeout(checkEmailPending)
      // console.log(value)
      checkEmailPending = setTimeout(() => {
        const reg = new RegExp('^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\\.)+[A-Za-z]{2,6}$')
        if (value !== null && value !== '' && !reg.test(value)) {
          callback(new Error('邮箱格式不正确'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
      rules: {
        client_name: [
          { validator: checkName, trigger: 'change' }
        ],
        email: [
          { validator: checkEmail, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
		submit () {
			this.onSubmit()
		},
    onSubmit () {
      const form = this.$refs.ruleForm.model
			this.$refs.ruleForm.validate(valid => {
        if (valid) {
          editClientInfo(form).then(res => {
            this.$message.success(res.success.message)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
.clientCard{
  display: none;
}
.ant-input-affix-wrapper:hover .clientCard{
  display: block;
  color: #1880ff7a
}
</style>
