<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <!-- <a-form layout="vertical" ref="createForm" :model="setInfo">
          <a-form-item label="昵称" >
            <a-input v-model="setInfo.name"/>
          </a-form-item>
          <a-form-item label="登录密码" :required="false" >
            <a-input placeholder="登录密码"/>
          </a-form-item>
          <a-form-item label="Password" has-feedback>
            <a-input
              v-decorator="['password',{
                rules: [{ required: true, message: 'Please input your password!' },
                        { validator: validateToNextPassword }]}]"
              type="password"
            />
          </a-form-item>
          <a-form-item label="Confirm Password" has-feedback>
            <a-input
              v-decorator="['confirm',{
                rules: [{ required: true, message: 'Please confirm your password!' },
                        { validator: compareToFirstPassword }
                ]}]"
              type="password"
              @blur="handleConfirmBlur"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="submitBtn">提交</a-button>
            <a-button style="margin-left: 8px">保存</a-button>
          </a-form-item>
        </a-form> -->
        <a-form
          :form="form"
          layout="vertical"
          @submit="handleSubmit">
          <a-form-item label="昵称" has-feedback>
            <a-input v-decorator="['name', { initialValue: setInfo.name }]"/>
          </a-form-item>
          <a-form-item label="新密码" has-feedback>
            <a-input
              v-decorator="['password',{
                rules: [{ validator: validateToNextPassword }]}]"
              type="password"
            />
          </a-form-item>
          <a-form-item label="确认密码" has-feedback>
            <a-input
              v-decorator="['confirm',{
                rules: [{ required: getField, message: '请再次输入您的新密码！' },
                        { validator: compareToFirstPassword }]}]"
              type="password"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">提交</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img ? `${this.$store.state.userUrl}${option.img}` : 'http://kefu.xuandev.com/agent/avatar2.jpg'"/>
        </div>
      </a-col>

    </a-row>

    <avatar-modal ref="modal" @ok="setavatar"/>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AvatarModal from './AvatarModal'
import { agentInfo, updateInfo } from '../../../network/Interface/setting'

export default {
  components: {
    AvatarModal
  },
  data () {
    return {
      // cropper
      setInfo: {}, // 个人信息
      // preview: {},
      userAvatar: '', // 头像
      getField: false, // 再次输入密码判断
      option: {
        img: '',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
      // formInfo: {}
      // confirmDirty: false,
    }
  },
  methods: {
    ...mapActions(['changeInfoName', 'changeInfoAvatar']),
    // 头像链接
    setavatar (url) {
      this.userAvatar = url
      this.option.img = `${this.$store.state.userUrl}${url}`
      this.postInfo()
    },
    // 提交个人信息表单
    postInfo () {
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const form = {}
          form.name = values.name
          form.avatar = this.userAvatar
          form.password = values.password
          this.editInfo(form)
        }
      })
    },
    // 获取个人信息
    getInfo () {
      agentInfo().then((res) => {
        this.option.img = res.result.avatar
        const imgUrl = res.result.avatar !== '' ? res.result.avatar : '/agent/avatar2.jpg'
        this.setInfo = res.result
        this.userAvatar = res.result.avatar
        sessionStorage.setItem('userName', res.result.name)
        sessionStorage.setItem('userAvatar', imgUrl)
        this.changeInfoName(res.result.name)
        this.changeInfoAvatar(imgUrl)
      })
    },
    // 更新个人信息接口
    editInfo (values) {
      updateInfo(values).then((res) => {
        console.log(res)
        if (res.error) {
          return this.$message.error(res.error.message)
        }
        this.$message.success(res.success.message)
        this.getInfo()
      })
    },
    // 更新个人信息
    handleSubmit (e) {
      this.postInfo()
    },
    // 密码验证
    validateToNextPassword (rule, value, callback) {
      // const form = this.form
      if (value) {
        this.getField = true
      } else {
        this.getField = false
      }
      callback()
    },
    // 再次输入密码验证
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        const title = '您输入的两个密码不一致！'
        callback(title)
      } else {
        callback()
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
