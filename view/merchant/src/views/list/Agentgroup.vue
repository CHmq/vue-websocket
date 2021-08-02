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
            </a-col> -->
            <a-col :md="!advanced && 10 || 24" :sm="24">
              <span :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <!-- <a-button type="primary" >查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button> -->
                <a-button
                  type="primary"
                  style="margin-left: 8px"
                  icon="plus"
                  @click="handleAdd">
                  新增商户
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
          <a @click="resetPwd(record)">重置密码</a>
          <!-- <a @click="handleDelete(record)">删除</a> -->
          <!-- <a @click="handleDelete(record)">暂未添加</a> -->
        </span>
      </a-table>

      <create-form
        ref="createModal"
        :title="title"
        :visible="visible"
        :loading="confirmLoading"
        @cancel="handleCancel"
        :treeData="treeData"
        :groupList="groupList"
        :model="mdl"
        :cascaderData="cascaderData"
        @ok="handleOk"
        @getAvatar="getAvatar"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getRoleList } from '@/api/manage'
// import Cookies from 'js-cookie'

import CreateForm from './modules/CreateFromtest'
import { merchList, addMerch, editGroup, getDistrict, getGroupList, uploadAvatar } from '../../network/Interface'

const columns = [
  {
    title: '规则编号',
    dataIndex: 'id',
    key: 'id',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '商户全称',
    dataIndex: 'full_name',
    key: 'full_name'
  },
  {
    title: '商户名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '商户邮箱',
    dataIndex: 'email',
    key: 'email'
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
      avatarValue: {}, // 头像文件
      // pid: 0, // 地区类级
      treeData: [], // 地区类级
      cascaderData: true, // 下拉选框默认值
      groupList: [], // 分组列表
      // 查询参数
      queryParam: {},
      agentGroup: { 'page': 1 },
      pagination: {
        total: 0,
        pageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        onChange: (current) => {
          this.agentGroup.page = current
          this.getGroup(this.agentGroup)
        }
      }
    }
  },
  methods: {
    // 递归处理treeData
    fun (arr) {
      const arrTab = arr.map((item) => {
          item.value = item.id
          item.label = item.name
          if (item.child && item.child.length > 0) {
            // console.log(item)
            item.children = item.child
            this.fun(item.children)
          }
          return item
        })
      return arrTab
    },
    getAvatar (arr) {
      console.log(arr)
      this.avatarValue = arr
      console.log(this.avatarValue)
    },
    handleAdd () {
      this.mdl = null
      this.visible = true
      this.cascaderData = true
      this.title = '新建商户'
      this.$refs.createModal.form.resetFields()
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values, callback) => {
        if (!errors) {
          values.avatar = ''
          values.create_max = 10
          values.ceiling_client = 10
          values.weight_value = 50
          values.district_id = values.districtId[values.districtId.length - 1]
          const formData = new FormData()
          formData.append('file', this.avatarValue)
          console.log(values)
          if (JSON.stringify(this.avatarValue) !== '{}') {
            console.log(1)
            uploadAvatar(formData).then((res) => {
              if (res.error) {
                return this.$message.error(res.error.message)
              }
              values.avatar = res.result.avatar
            })
          }
          setTimeout(() => {
            console.log('values', values)
            if (!values.id) {
              console.log(values.id)
              addMerch(values).then((res) => {
                console.log(res)
                if (res.error) {
                  this.$message.error(res.error.message)
                } else {
                  this.$message.success(res.success.message)
                  this.visible = false
                  this.$refs.createModal.form.resetFields()
                }
                this.getList()
              })
            } else {
              console.log(values.id)
              if (!values.avatar) {
                values.avatar = this.mdl.avatar
              }
              editGroup(values).then((res) => {
                console.log(res)
                if (res.error) {
                  this.$message.error(res.error.message)
                } else {
                  this.$message.success(res.success.message)
                  this.$refs.createModal.form.resetFields()
                }
                this.getList()
                this.visible = false
              })
            }
          }, 500)
          // })
        } else {
          this.$message.error('创建失败')
          this.visible = true
          this.confirmLoading = false
          callback()
        }
        this.confirmLoading = false
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
      this.cascaderData = false
    },
    handleDelete (record) {
      console.log('删除')
      // console.log(record)
      // this.delagentId(record.id)
      // delAgentGroup(record).then((res) => {
      //   console.log(res)
      //   if (res.error) {
      //     this.$message.error(res.error.message)
      //   } else {
      //     this.$message.success(res.success.message)
      //   }
      //   this.getGroup()
      // })
    },
    resetPwd () {
      this.$message.success('重置后密码: 123456789')
    },
    getList () {
      // console.log('123')
      merchList().then((res) => {
        if (res.error) {
          this.$message.error(res.error.message)
        } else {
          console.log(res.result)
          this.data = res.result.data
          this.pagination.total = res.result.total ? res.result.total : res.result.length
          this.pagination.pageSize = res.result.per_page
        }
      })
    },
    getRegion () {
      getDistrict().then((res) => {
        if (res.error) {
          this.$message.error(res.error.message)
        } else {
          console.log(res.result)
          this.treeData = this.fun(res.result)
          console.log(this.treeData)
        }
      })
    },
    // 获取客服分组信息
    merchGroup () {
      getGroupList().then((res) => {
        console.log(res)
        this.groupList = res.result
      })
    }
  },
  created () {
    getRoleList({ t: new Date() })
    this.getList()
    this.getRegion()
    this.merchGroup()
  }
}
</script>
