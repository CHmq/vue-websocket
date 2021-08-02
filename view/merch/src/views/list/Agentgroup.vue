<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <!-- <a-col :md="7" :sm="24">
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
            </a-col> -->
            <a-col :md="!advanced && 10 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <!-- <a-button type="primary" >查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button> -->
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
      <a-table :columns="columns" :pagination="pagination" :data-source="data" rowKey="id">
        <span slot="agent_sum"></span>
        <span slot="name"> </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)" style="color:#f5222d">删除</a>
        </span>
      </a-table>

      <create-form
        ref="createModal"
        :title="title"
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
import { addGroup, editGroup, delAgentGroup, getAgentGroupList } from '../../network/Interface/customer'

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
  name: 'Agentgroup',
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
      title: '',
      visible: false,
      confirmLoading: false,
      advanced: false,
      // 查询参数
      queryParam: {},
      agentGroup: { 'page': 1 },
      // 加载数据方法 必须为 Promise 对象
      // loadData: [parameter => {
      //   return getAgentGroupList()
      //     .then(res => {
      //       console.log(res)
      //       return res.result
      //     })
      // }],
      // selectedRowKeys: [],
      // selectedRows: [],
      pagination: {
        total: 0,
        pageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        onChange: (current) => {
          this.agentGroup.page = current
          console.log(this.agentGroup)
          this.getGroup(this.agentGroup)
        }
      }
    }
  },
  methods: {
    handleAdd () {
      this.mdl = null
      this.visible = true
      this.title = '新建分组'
      this.$refs.createModal.form.resetFields()
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values, callback) => {
        if (!errors) {
          console.log('values', values)
          if (!values.id) {
            console.log(values.id)
            addGroup(values).then((res) => {
              console.log(res)
              if (res.error) {
                this.$message.error(res.error.message)
              } else {
                this.$message.success(res.success.message)
              }
              this.getGroup()
            })
          } else {
            console.log(values.id)
            editGroup(values).then((res) => {
              console.log(res)
              if (res.error) {
                this.$message.error(res.error.message)
              } else {
                this.$message.success(res.success.message)
              }
              this.getGroup()
            })
          }
          this.confirmLoading = false
          this.visible = false
        } else {
          this.$message.error('创建失败')
          this.confirmLoading = false
          callback()
        }
        // form.resetFields()
      })
    },
    handleCancel () {
      this.visible = false
      // this.mdl = null
      // console.log(this.$refs.createModal)
    },
    handleEdit (record) {
      console.log(record)
      console.log('修改')
      this.title = '修改分组'
      this.mdl = record
      this.visible = true
    },
    handleDelete (record) {
      console.log('删除')
      console.log(record)
      // this.delagentId(record.id)
      delAgentGroup(record).then((res) => {
        console.log(res)
        if (res.error) {
          this.$message.error(res.error.message)
        } else {
          this.$message.success(res.success.message)
        }
        this.getGroup()
      })
    },
    getGroup (obj) {
      getAgentGroupList(obj).then((res) => {
        if (res.error) {
          this.$message.error(res.error.message)
        } else {
          console.log(res.result)
          this.data = res.result.data
          this.pagination.total = res.result.total ? res.result.total : res.result.length
          this.pagination.pageSize = res.result.per_page
        }
      })
    }
  },
  created () {
    getRoleList({ t: new Date() })
    // const testUrl = this.$route.query
    // if (!testUrl.account || testUrl.account === '1648036524@qq.com') { this.$message.error('你的url有问题') }
    // getToken(testUrl.account ? testUrl.account : '1648036524@qq.com', '123456789').then((res) => {
    //   console.log(res)
    //   const { result } = res
    //   Cookies.set('UserToken', result.token)
    //   Cookies.set('UserId', result.id)
    // })
    this.getGroup(this.agentGroup)
  }
}
</script>
