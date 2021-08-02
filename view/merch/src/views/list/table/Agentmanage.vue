<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="7" :sm="24">
              <a-form-item label="是否在线">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">离线</a-select-option>
                  <a-select-option value="1">在线</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item label="客服权限">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">test1</a-select-option>
                  <a-select-option value="1">test2</a-select-option>
                  <a-select-option value="2">test3</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="!advanced && 10 || 24" :sm="24">
              <span :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" >查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <a-button
                  type="primary"
                  style="margin-left: 8px"
                  icon="plus"
                  @click="handleAdd">
                  新增分组
                </a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table :columns="columns" :data-source="data" rowKey="id">
        <span slot="agent_sum" slot-scope="text">{{ text }}</span>
        <span slot="name"> Name</span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleDelete(record)">删除</a>
        </span>
      </a-table>

      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        @cancel="handleCancel"
        :model="mdl"
        @ok="handleOk"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getRoleList } from '@/api/manage'
// import Cookies from 'js-cookie'

import CreateForm from './modules/CreateFromtest'
import { addGroup, getAgentGroupList } from '../../network/Interface/customer'

const columns = [
  {
    title: '规则编号',
    dataIndex: 'id',
    key: 'id',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '分组名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'Agentmanage',
  components: {
    STable,
    Ellipsis,
    CreateForm
  },
  data () {
    this.columns = columns
    return {
      // create model
      data: [],
      columns,
      mdl: null,
      visible: false,
      confirmLoading: false,
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: [parameter => {
        // const requestParameters = Object.assign({}, parameter, this.queryParam)
        // console.log('loadData request parameters:', requestParameters)
        return getAgentGroupList()
          .then(res => {
            console.log(res)
            return res.result
          })
        // return getServiceList(requestParameters)
        // .then(res => {
        //   console.log(res)
        //   return res.result
        // })
      }],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values, callback) => {
        if (!errors) {
          console.log('values', values)
          addGroup(values).then((res) => {
            console.log(res)
            this.$message.error('创建成功')
          })
          this.confirmLoading = false
        } else {
          this.$message.error('创建失败')
          this.confirmLoading = false
          callback()
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    handleDelete () {
      console.log('修改')
    }
  },
  created () {
    getRoleList({ t: new Date() })
    const testUrl = this.$route.query
    if (!testUrl.account || testUrl.account === '1648036524@qq.com') { this.$message.error('你的url有问题') }
    getAgentGroupList().then((res) => {
      console.log(res.result)
      this.data = res.result
    })
  }
}
</script>
