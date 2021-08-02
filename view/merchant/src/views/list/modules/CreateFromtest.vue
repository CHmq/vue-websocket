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
        <a-form-item label="商户名称">
          <a-input v-decorator="['name', {rules: [{required: true, min: 2, message: '商户名称长度不能小于 2！'}]}]" />
        </a-form-item>
        <a-form-item v-if="!model" label="商户密码">
          <a-input v-decorator="['pwd', {rules: [{required: true, min: 6, message: '客服密码不能为空且不得少于六个字符！'}], initialValue: pwd}]" />
        </a-form-item>
        <a-form-item label="商户全称">
          <a-input v-decorator="['fullname', {rules: [{required: true, min: 2, message: '商户名称长度不能小于 2！'}], initialValue: fullName}]" />
        </a-form-item>
        <a-form-item label="客服分组">
          <a-select v-decorator="['group_id', {rules: [{ required: true, message: '请选择一个分组名称！' }], initialValue: group}]">
            <a-select-option v-for="(data, index) in groupList" :key="index" :value="data.id">
              {{ data.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-decorator="['email', {rules: [{required: true, min: 2, message: '邮箱名称长度不能为空！'}]}]" :disabled="model && model.email ? true : false"/>
        </a-form-item>
        <a-form-item label="地区">
          <a-cascader
            v-if="cascaderData"
            v-decorator="['districtId', { rules: [{ required: true, message: '请选择一个分类' }] }]"
            :options="treeData"
          />
          <div v-else>
            <a-cascader
              v-decorator="['districtId', { rules: [{ required: true, message: '请选择一个分类' }], initialValue: district }]"
              :options="treeData"
              @change="onChange">
              <a-button shape="circle" size="small" style="border:none">
                <a href="#">
                  <a-input v-model="menuText" class="menuTab" />
                  <a-icon type="edit" />
                </a>
              </a-button>
            </a-cascader>
          </div>
        </a-form-item>
        <a-form-item label="当前头像" v-show="previewImage">
          <img style="width: 30%" :src="previewImage" />
        </a-form-item>
        <a-form-item :label="previewImage ? '替换头像' : '设置头像'">
          <a-upload
            style="width: 50%"
            :beforeUpload="beforeUpload"
            list-type="picture-card"
            :file-list="fileList"
            accept=".png,.jpg,.jpeg,.gif"
            @change="handleChange"
          >
            <div v-if="fileList.length < 1">
              <a-button icon="upload">选择图片</a-button>
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'name', 'fullname', 'email', 'districtId']

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
    // 地区数据
    treeData: {
      type: Array,
      default: () => []
    },
    // 表单数据
    model: {
      type: Object,
      default: () => null
    },
    // 地区判断
    cascaderData: {
      type: Boolean,
      default: () => true
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
      previewVisible: false,
      previewImage: '',
      fileList: [],
      fullName: '',
      menuText: '',
      group: 1,
      district: [],
      pwd: '123456789'
      // createMax: 10,
      // weightValue: 50
    }
  },
  methods: {
    beforeUpload (file) {
      const type = file.name.split('.')[1]
      if (type !== 'png' && type !== 'jpg' && type !== 'jpeg' && type !== 'gif') {
        this.$message.error('暂不接受上传的文件类型')
        return
      }
      if (JSON.stringify(file) !== '{}') {
        console.log(1)
      }
      this.$emit('getAvatar', file)
      console.log(file)
      return false
    },
    handleChange ({ fileList }) {
      console.log(fileList)
      this.fileList = fileList
      if (this.fileList.length === 0) {
        this.$emit('getAvatar', {})
      }
    },
    onChange (value, selectedOptions) {
      this.menuText = selectedOptions.map(o => o.label).join('/')
      console.log(this.menuText)
    }
  },
  created () {
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      console.log(this.model)
      this.model && this.form.setFieldsValue(pick(this.model, fields))
      if (this.model) {
      this.fullName = this.model.full_name
      this.menuText = this.model.district_names
      this.group = this.model.group_id
      this.district = [this.model.district_id]
      this.previewImage = this.model.avatar ? `${this.$store.state.userUrl}/${this.model.avatar}` : `${this.$store.state.userUrl}/admin/avatar2.jpg`
      } else {
      this.fullName = ''
      this.group = 1
      this.fileList = []
      this.previewImage = ''
      this.district = []
      }
    })
  }
}
</script>
<style scoped>
  ::v-deep .ant-upload-list-item-actions a {
    display: none;
  }
</style>
