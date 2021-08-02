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
        <a-form-item v-if="model && model.id > 0" label="ID">
          <a-input v-decorator="['id', { initialValue: model.id }]" disabled/>
        </a-form-item>
        <a-form-item v-bind="formLayout" label="菜单分类">
          <a-cascader
            v-if="cascaderData"
            v-decorator="['tabMenu', { rules: [{ required: true, message: '请选择一个分类' }] }]"
            :options="treeData"
          />
          <div v-else>
            <a-cascader
              v-decorator="['tabMenu', { rules: [{ required: true, message: '请选择一个分类' }], initialValue: menuArr }]"
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
        <a-form-item label="标题：">
          <a-input v-decorator="['title', {rules: [{required: true, min: 2, message: '标题不能为空！'}]}]"/>
        </a-form-item>
        <a-form-item label="聊天菜单显示">
          <a-radio-group
            v-decorator="['status', { initialValue: tabStatus }]">
            <a-radio value="0">
              不显示
            </a-radio>
            <a-radio value="1">
              显示
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="排序：">
          <a-input-number
            :min="0"
            :max="100"
            v-decorator="['sort', { initialValue: tabSort }]"/>
          (0-99数字越小越靠前)
        </a-form-item>
        <a-form-item label="内容：">
          <a-input type="textarea" v-decorator="['content']"/>
        </a-form-item>
        <!-- <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            提交
          </a-button>
        </a-form-item> -->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['title', 'sort', 'content', 'tabMenu']

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
    },
    treeData: {
      type: Array,
      default: () => []
    },
    cascaderData: {
      type: Boolean,
      default: () => true
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
      tabStatus: '1',
      menuArr: [],
      menuText: ''
    }
  },
  methods: {
    onChange (value, selectedOptions) {
      this.menuText = selectedOptions.map(o => o.label).join('/')
      console.log(this.menuText)
    }
  },
  created () {
    fields.forEach(v => this.form.getFieldDecorator(v))
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
      if (this.model !== null) {
        this.tabSort = this.model.addclasstitle !== 'addclasstitle' ? this.model.sort : 0
        this.tabStatus = this.model.status === 0 ? '0' : '1'
        this.menuText = this.model.tab_class_name
        this.menuArr = [this.model.class_id]
      } else {
        this.tabSort = 0
        this.tabStatus = '1'
        this.menuArr = []
      }
    })
  }
}
</script>
<style lang="less" scoped>
  .menuTab {
    width: 88%;
    margin-right: 7px;
  }
</style>
