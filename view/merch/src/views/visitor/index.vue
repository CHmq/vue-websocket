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
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <a-table
        ref="table"
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :pagination="{
          pageSize: 10
        }">
        <span slot="visit_Inf" slot-scope="clientIfo" class="table-btn-box">
          <template id="payTypes">
            <ul class="list">
              <li>客户身份：{{ clientIfo.client_identify.substr(0, 15) + '...' }}</li>
              <li>IP地址：{{ clientIfo.ip }} <span v-if="clientIfo.os">( {{ clientIfo.os }} )</span></li>
              <li>登陆地点：{{ clientIfo.district }}</li>
            </ul>
          </template>
        </span>
        <span slot="visit_sum"> </span>
        <span slot="source_url"> </span>
        <span slot="chat_urls" slot-scope="clientUrl" class="table-btn-box">
          <template id="payUrls">
            <ul v-for="(item, index) in clientUrl.chat_urls" :key="index" class="list">
              <li><a :href="item.chat_url" target="_banlk">直接访问</a></li>
            </ul>
          </template>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleSub(record)">邀请</a>
        </span>
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable, Ellipsis } from '@/components'
// import { getRoleList, getServiceList } from '@/api/manage'
import { getRoleList } from '@/api/manage'
import { getVisitInfo } from '../../network/websocket'

import Cookies from 'js-cookie'

const columns = [
  {
    title: '访客信息',
    scopedSlots: { customRender: 'visit_Inf' },
    width: 400,
    key: 'clientIfo'
  },
  {
    title: '访问次数',
    dataIndex: 'visit_sum',
    width: 150,
    key: 'visit_sum'
  },
  {
    title: '来源',
    dataIndex: 'source_url',
    width: 450,
    key: 'source_url'
  },
  {
    title: '正在访问',
    scopedSlots: { customRender: 'chat_urls' },
    width: 300,
    key: 'clientUrl'
  },
  {
    title: '操作',
    width: 200,
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    STable,
    Ellipsis
  },
  data () {
    this.columns = columns
    return {
      UserId: JSON.parse(Cookies.get('result')).merch.id,
      page: 1,
      // pagination: {
         // 每页中显示15条数据
        // showSizeChanger: true
        // pageSizeOptions: ['10', '20', '50', '100'] // 每页中显示的数据
      // },
      advanced: false,
      // 查询参数
      queryParam: {},
      agentGroup: { 'line': '', 'config_group_id': '' },
      // 加载数据方法 必须为 Promise 对象
      // loadData: parameter => {
      //   const requestParameters = Object.assign({}, parameter, this.queryParam)
      //   console.log('loadData request parameters:', requestParameters)
      //   return getServiceList(requestParameters)
      //     .then(res => {
      //       return res.result
      //     })
      // },
      data: []
    }
  },
  methods: {
    // 获取客服列表
    getList () {
      getVisitInfo(this.UserId, this.page).then((res) => {
        if (res.error) {
          this.$message.error(res.error.message)
        } else {
          console.log(res.result.data)
          this.data = res.result.data
        }
      })
    },
    // 删除客服
    handleSub (record) {
      console.log('删除', record.id)
    }
  },
  created () {
    getRoleList({ t: new Date() })
    this.getList()
  }
}
</script>
<style scoped>
.table-btn-box .list{
  padding-inline-start: 0;
}
</style>
