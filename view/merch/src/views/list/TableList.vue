<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="客服分组">
                <!-- <a-input v-model="queryParam.group_id" placeholder=""/> -->
                <a-select v-model="queryParam.group_id">
                  <a-select-option v-for="(item, index) in groupList" :key="index" :value="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="在线状态">
                <a-select v-model="queryParam.line" placeholder="请选择" default-value="0">
                  <a-select-option value="0">离线</a-select-option>
                  <a-select-option value="1">在线</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="quere">查询</a-button>
                <a-button style="margin-left: 8px" @click="clean">重置</a-button>
                <a-button style="margin-left: 8px" type="primary" icon="plus" @click="handleAdd">新建</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <a-table :columns="columns" :pagination="pagination" :data-source="data" rowKey="id">
        <span slot="level"></span>
        <span slot="agent_sum"></span>
        <span slot="name"></span>
        <span slot="email"></span>
        <span slot="is_line" slot-scope="is_line">
          {{ is_line === 0 ? '离线' : '在线' }}
        </span>
        <span slot="group_name"></span>
        <span slot="action" slot-scope="text, record">
          <div v-if="text.status === 1 || text.level === 2">
            <a @click="handleEdit(record)">修改</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)" style="color:#f5222d">删除</a>
            <a-divider type="vertical" />
            <a @click="resetPwd(record)" style="color:#faad14">重置密码</a>
          </div>
          <div v-else>
            <a @click="handleRecall(record)">撤回删除</a>
          </div>
        </span>
      </a-table>

      <create-form
        ref="createModal"
        :title="title"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        :groupList="groupList"
        @cancel="handleCancel"
        @ok="handleOk"
      />
      <!-- <step-by-step-modal ref="modal" @ok="handleOk"/> -->
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'
import { getAgentList, addAgent, editAgent, delagent, getAgentGroupList, resetPassword, recoverAgent } from '../../network/Interface/customer'

// import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
// import Cookies from 'js-cookie'

const columns = [
  {
    title: '客服角色',
    dataIndex: 'remark',
    key: 'remark',
    scopedSlots: { customRender: 'remark' }
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
    title: '在线状态',
    dataIndex: 'is_line',
    key: 'is_line',
    scopedSlots: { customRender: 'is_line' }
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

// const statusMap = {
//   0: {
//     status: 'default',
//     text: '关闭'
//   },
//   1: {
//     status: 'processing',
//     text: '运行中'
//   },
//   2: {
//     status: 'success',
//     text: '已上线'
//   },
//   3: {
//     status: 'error',
//     text: '异常'
//   }
// }

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm
    // StepByStepModal
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
      agentGroup: { 'line': '', 'group_id': '', 'page': 1 },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        return getServiceList(requestParameters)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
      data: [],
      groupList: [], // 分组信息
      pagination: {
        total: 0,
        pageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        onChange: (current) => {
          this.agentGroup.page = current
          this.getList(this.agentGroup)
        }
      }
      // pagination: {
      //   current: 1,
      //   // pageSize: 20,
      //   // defaultCurrent: 1, // 默认当前页数
      //   // defaultPageSize: 10, // 默认当前页显示数据的大小
      //   // showSizeChanger: true,
      //   total: '',
      //   // showQuickJumper: true,
      //   showTotal: total => `共 ${total} 条`// 显示总数
        // onShowSizeChange: (current, pageSize) => {
        //   this.pagination.current = current
        //   this.pagination.pageSize = pageSize
        //   this.searchList.pageNum = current
        //   this.searchList.pageSize = pageSize
        //   var params = JSON.parse(JSON.stringify(this.searchList))
        //   params.pageNum = 1
        //   params.pageSize = pageSize
        //   // this.getList()  //显示列表的接口名称
        // },
        // 改变每页数量时更新显示
        // onChange: (current, size) => {
        //   this.pagination.current = current
        //   this.pagination.pageSize = size
        //   this.searchList.pageNum = current
        //   this.searchList.pageSize = size
        //   var params = JSON.parse(JSON.stringify(this.searchList))
        //   params.pageNum = current
        //   params.pageSize = size
        //   //   this.paramsCheck(params)
        //   //   this.regUserList(params)
        //   // this.getList()
        // } // 点击页码事件
      // }
    }
  },
  // filters: {
  //   statusFilter (type) {
  //     return statusMap[type].text
  //   },
  //   statusTypeFilter (type) {
  //     return statusMap[type].status
  //   }
  // },
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
      this.mdl = {}
      console.log(this.mdl)
      this.visible = true
      this.title = '新建客服'
      this.$refs.createModal.form.resetFields()
    },
    // 创建客服
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values, callback) => {
        console.log(values)
        if (!errors) {
          if (!values.id) {
            addAgent(values).then((res) => {
              console.log(res)
              if (res.error) {
                this.$message.error(res.error.message)
              } else {
                this.$message.success(res.success.message)
              }
              this.getList(this.agentGroup)
            })
          } else {
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
              this.getList(this.agentGroup)
            })
          }
          this.visible = false
          this.confirmLoading = false
          // this.$refs.createModal.setVaule()
          this.$refs.createModal.form.resetFields()
        } else {
          this.$message.error('创建失败')
          this.confirmLoading = false
          callback()
        }
      })
    },
    // 查询客服
    quere () {
      this.agentGroup = this.queryParam
      this.getList(this.agentGroup)
    },
    clean () {
      this.queryParam = {}
      this.agentGroup = { 'line': '', 'group_id': '' }
      this.getList(this.agentGroup)
    },
    // 取消客服弹框
    handleCancel () {
      console.log('取消')
      this.visible = false
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
    // 撤回删除
    handleRecall (record) {
      console.log('撤回删除', record.id)
      this.RecallId(record.id)
    },
    // 重置密码
    resetPwd (record) {
      console.log(record)
      resetPassword({ agent_id: record.id }).then((res) => {
        if (res.error) {
          return this.$message.error(res.error.message)
        }
        this.$message.success(res.success.message + ',重置后密码:' + res.result.new_password)
      })
    },
    // 获取客服列表
    getList (obj) {
      console.log(obj)
      getAgentList(obj).then((res) => {
        if (res.error) {
          return this.$message.error(res.error.message)
        }
        // console.log(res.result.list.data)
        this.pagination.total = res.result.list.total ? res.result.list.total : 0
        this.pagination.pageSize = res.result.list.per_page
        this.data = res.result.list.data
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
        this.getList(this.agentGroup)
      })
    },
    // 撤回删除客服
    RecallId (id) {
      recoverAgent(id).then((res) => {
        console.log(res)
        if (res.error) {
          this.$message.error(res.error.message)
        } else {
          this.$message.success(res.success.message)
        }
        this.getList(this.agentGroup)
      })
    },
    // 获取客服分组信息
    getGroupList () {
      getAgentGroupList().then((res) => {
        console.log(res)
        this.groupList = res.result.data
      })
    }
  },
  created () {
    getRoleList({ t: new Date() })
    this.getList(this.agentGroup)
    this.getGroupList()
  }
}
</script>
