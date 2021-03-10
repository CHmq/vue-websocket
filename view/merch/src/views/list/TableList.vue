<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="用户名">
                <a-input v-model="queryParam.id" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="在线状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">离线</a-select-option>
                  <a-select-option value="1">在线</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <a-button style="margin-left: 8px" type="primary" icon="plus" @click="handleAdd">新建</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <a-table :columns="columns" :data-source="data" rowKey="id">
        <span slot="agent_sum"></span>
        <span slot="name"> </span>
        <span slot="email"> </span>
        <span slot="group_name"> </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical" />
          <a @click="handleSub(record)">删除</a>
        </span>
      </a-table>

      <create-form
        ref="createModal"
        :title="title"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
      <step-by-step-modal ref="modal" @ok="handleOk"/>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'
import { getAgentList, addAgent, editAgent, delagent } from '../../network/websocket'

import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
// import Cookies from 'js-cookie'

const columns = [
  {
    title: '规则编号',
    dataIndex: 'id',
    key: 'id',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '客服分类',
    dataIndex: 'group_name',
    key: 'group_name'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal
  },
  data () {
    this.columns = columns
    return {
      // create model
      visible: false,
      title: '',
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      agentGroup: { 'line': '', 'config_group_id': '' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getServiceList(requestParameters)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
      data: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handleAdd () {
      this.mdl = null
      console.log(this.mdl)
      this.visible = true
      this.title = '新建客服'
    },
    // 创建客服
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (!values.id) {
            console.log(values.id)
            addAgent(values).then((res) => {
              console.log(res)
              if (res.error) {
                this.$message.error(res.error.message)
              } else {
                this.$message.success(res.success.message)
              }
              this.getList()
            })
          } else {
            console.log(values)
            console.log(this.mdl)
            if (Object.entries(values).toString() === Object.entries(this.mdl).toString()) {
              console.log('相同')
            }
            editAgent(values).then((res) => {
              console.log(res)
              if (res.error) {
                this.$message.error(res.error.message)
              } else {
                this.$message.success(res.success.message)
              }
              this.getList()
              this.mdl = null
            })
          }
          this.visible = false
          this.confirmLoading = false
        } else {
          this.$message.error('创建失败')
          this.confirmLoading = false
        }
      })
    },
    // 取消客服弹框
    handleCancel () {
      this.visible = false
      // this.mdl = {}
      // this.$refs.createModal.setVaule()
    },
    // 修改客服
    handleEdit (record) {
      console.log('修改')
      console.log(record)
      this.mdl = record
      this.visible = true
      this.title = '修改客服'
    },
    // 删除客服
    handleSub (record) {
      console.log('删除', record.id)
      this.delagentId(record.id)
    },
    // 获取客服列表
    getList () {
      getAgentList(this.agentGroup).then((res) => {
        if (res.error) {
          this.$message.error(res.error.message)
        } else {
          console.log(res.result.list.data)
          this.data = res.result.list.data
        }
      })
    },
    // 删除客服
    delagentId (id) {
      delagent(id).then((res) => {
        console.log(res)
        if (res.error) {
          this.$message.error(res.error.message)
        } else {
          this.$message.success(res.success.message)
        }
        this.getList()
      })
    }
  },
  created () {
    getRoleList({ t: new Date() })
    this.getList()
  }
}
</script>
