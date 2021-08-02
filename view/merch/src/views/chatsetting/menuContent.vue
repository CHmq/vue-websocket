<template>
  <div class="wrap">
    <h3 class="title">设置聊天界面菜单内容</h3>
    <img class="item-tip-image" src="http://px-kefu.oss-cn-hangzhou.aliyuncs.com/tip.png"/>
    <span>预先设置一些常见问题的回复用语，帮助客服人员提高服务效率</span>
    <div class="box">
      <a-button
        type="primary"
        style="margin-left: 8px"
        icon="plus"
        @click="handleAdd">
        新增菜单文章
      </a-button>
      <a-table :columns="columns" :pagination="pagination" :data-source="data" rowKey="id">
        <span slot="title"></span>
        <span slot="tab_class_name">
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical" />
          <a @click="handleDel(record)">删除</a>
        </span>
      </a-table>
      <create-form
        ref="createModal"
        :title="title"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        :treeData="treeData"
        :cascaderData="cascaderData"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </div>
  </div>
</template>

<script>
import { getMerchSettingList, saveTab, saveTabPut, delTab } from '../../network/Interface/setting'
import CreateForm from './menuConModal'

const columns = [
  {
    title: '菜单标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '菜单分类',
    dataIndex: 'tab_class_name',
    key: 'tab_class_name'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    CreateForm
  },
  data () {
    this.columns = columns
    return {
      data: [],
      treeData: [], // 下拉选框值
      cascaderData: true, // 下拉选框默认值
      mdl: null,
      title: '',
      visible: false,
      confirmLoading: false,
      pagination: {
        total: 0,
        pageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        onChange: (current) => {
          this.agentGroup.page = current
          // this.getGroup(this.agentGroup)
        }
      }
    }
  },
  methods: {
    // 递归处理treeData
    fun (arr) {
      const arrTab = arr.map((item) => {
          item.value = item.id
          item.label = item.title
          if (item.children && item.children.length > 0) {
            this.fun(item.children)
          }
          return item
        })
      return arrTab
    },
    // 获取tab分类
    getSettingInfo () {
      getMerchSettingList().then((res) => {
        // this.treeData = res.result.tab
        this.treeData = this.fun(res.result.tab.tab_class)
        this.data = res.result.tab.tab
      })
    },
    // 添加tab
    addTab (obj) {
      saveTab(obj).then((res) => {
        if (res.error) {
          return this.$message.error(res.error.message)
        }
        this.$message.success(res.success.message)
        this.getSettingInfo()
        this.visible = false
      })
    },
    editTab (obj) {
      saveTabPut(obj).then((res) => {
        if (res.error) {
          return this.$message.error(res.error.message)
        }
        this.$message.success(res.success.message)
        this.getSettingInfo()
        this.visible = false
      })
    },
    deleceTab (obj) {
      delTab(obj).then((res) => {
        if (res.error) {
          this.$message.error(res.error.message)
        }
        this.$message.success(res.success.message)
        this.getSettingInfo()
      })
    },
    handleAdd () {
      this.mdl = null
      this.visible = true
      this.title = '新建菜单内容'
      this.cascaderData = true
      this.$refs.createModal.form.resetFields()
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values, callback) => {
        if (!errors) {
          values.class_id = values.tabMenu[values.tabMenu.length - 1]
          if (!values.id) {
            this.addTab(values)
          } else {
            this.editTab(values)
          }
        } else {
          this.$message.error('创建失败')
          callback()
        }
        this.confirmLoading = false
        // form.resetFields()
      })
    },
    handleCancel () {
      this.visible = false
    },
    handleEdit (record) {
      console.log('修改')
      this.title = '修改分组'
      this.mdl = record
      this.visible = true
      this.cascaderData = false
    },
    handleDel (record) {
      console.log('删除')
      this.deleceTab({ id: record.id })
    }
  },
  created () {
    this.getSettingInfo()
  }
}
</script>

<style lang="less" scoped>
  .wrap {
    /* background-color: #fff; */
    padding: 20px;
    color: #222;
    .title{
      font-size: 20px;
      font-weight: bold;
      color: rgba(0,0,0,.85);
    }
  }
  .item-tip-image {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .box{
    margin-top: 25px;
  }
  .ant-tree-title {
  width: 100%;
}
</style>
