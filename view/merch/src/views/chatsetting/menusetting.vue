<template>
  <div class="wrap">
    <h3 class="title">设置聊天界面菜单</h3>
    <img class="item-tip-image" src="http://px-kefu.oss-cn-hangzhou.aliyuncs.com/tip.png"/>
    <span>预先设置一些常见问题的回复用语，帮助客服人员提高服务效率</span>
    <!-- <div class="btn-box">
      <a-button @click="toAddCate">添加分组</a-button>
    </div> -->
    <div class="content-box">
      <a-button class="btn-box" @click="toAddCate">添加tab菜单</a-button>
      <a-tree
        :auto-expand-parent="autoExpandParent"
        :tree-data="treeData"
      >
        <template slot="custom" slot-scope="item">
          <span>{{ item.title }}</span>
          <a-button
            type="primary"
            class="but_type"
            size="small"
            style="right:160px;"
            @click="()=> append(item)"
          >新增</a-button>
          <a-button
            type="primary"
            class="but_type"
            size="small"
            style="right:100px;"
            @click="()=> edit(item)"
          >编辑</a-button>
          <a-button
            type="primary"
            size="small"
            class="but_type"
            @click="()=> remove(item)"
          >删除</a-button>
        </template>
      </a-tree>
    </div>
    <modal
      ref="createModal"
      :title="modalTitle"
      :visible="visible"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </div>
</template>

<script>
import modal from './fastreactModal'
import { getMerchSettingList, saveTabClass, saveTabClassPut, delTabCLass } from '../../network/Interface/setting'

export default {
  components: {
    modal
  },
  data () {
    return {
      modalTitle: '',
      treeData: [],
      mdl: null,
      visible: false,
      classify: false,
      autoExpandParent: true
    }
  },
  methods: {
    // 递归处理treeData
    fun (arr) {
      const arrTab = arr.map((item) => {
        item.scopedSlots = { title: 'custom' }
        if (item.children && item.children.length > 0) {
          // console.log(item.child)
          // item.children = item.children
          this.fun(item.children)
        }
        return item
      })
      return arrTab
    },
    // 获取tab分类
    getSettingInfo () {
      getMerchSettingList().then((res) => {
        // this.fun(res.result.tab)
        const tab = this.fun(res.result.tab.tab_class)
        console.log(tab)
        if (this.treeData.length !== 0) {
          this.treeData = []
        }
        this.treeData.push(...tab)
      })
    },
    // 添加tab分类
    addTabClass (obj) {
      saveTabClass(obj).then((res) => {
        if (res.error) {
          return this.$message.error(res.error.message)
        }
        this.$message.success(res.success.message)
        this.getSettingInfo()
        this.classify = false
      })
    },
    // 修改tab分类
    editTabClass (obj) {
      saveTabClassPut(obj).then((res) => {
        if (res.error) {
          return this.$message.error(res.error.message)
        }
        this.$message.success(res.success.message)
        this.getSettingInfo()
        this.classify = false
      })
    },
    // 删除tab分类
    delTabClass (obj, data) {
      delTabCLass(obj).then((res) => {
        if (res.error) {
          return this.$message.error(res.error.message)
        }
        this.$message.success(res.success.message)
        this.getSettingInfo()
        // 先请求后端接口，删除成功后执行
        this.searchOption(data, this.treeData, 'delect')
      })
    },
    // 添加弹框
    toAddCate () {
      this.visible = true
      this.classify = false
      this.mdl = null
      this.modalTitle = '添加菜单名称'
      this.$refs.createModal.form.resetFields()
    },
    // 弹框确定
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          if (this.classify) {
            values.id = this.mdl.id
            values.pid = this.mdl.pid
            this.editTabClass(values)
          } else {
            values.pid = this.mdl ? this.mdl.id : 0
            this.addTabClass(values)
          }
          this.visible = false
          this.$refs.createModal.form.resetFields()
        }
      })
    },
    // 弹框取消
    handleCancel () {
      this.visible = false
      // this.mdl = null
    },
    // 递归查找
    searchOption (option, arr, type) {
      for (let s = 0; s < arr.length; s++) {
        if (arr[s].id === option.id) {
          if (type === 'delect') {
            arr.splice(s, 1)
          }
          break
        } else if (arr[s].children && arr[s].children.length > 0) { // 递归条件
          this.searchOption(option, arr[s].children)
        } else {
          continue
        }
      }
    },
    append (data) {
      this.classify = false
      this.visible = true
      this.modalTitle = '新增子级分类'
      data.addclasstitle = 'addclasstitle'
      data.fatherTitle = data.title
      data.title = ''
      this.mdl = data
    },
    remove (data) {
      const values = {}
      values.id = data.id
      this.delTabClass(values, data)
    },
    // 先请求后端接口，编辑成功后执行
    edit (data) {
      this.classify = true
      this.visible = true
      this.modalTitle = '修改当前分类名称'
      data.fatherTitle = ''
      // data.pid = ''
      data.addclasstitle = ''
      this.mdl = data
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
  }
  .item-tip-image {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .btn-box{
    margin: 15px 10px;
  }
  .ant-tree-title {
  width: 100%;
}
.title {
  font-size: 20px;
  font-weight: bold;
  color: rgba(0,0,0,.85);
}
::v-deep .ant-tree {
  line-height: 3;
  li {
    margin: 8px 0;
    position: relative;
    border: 1px solid #ccc;
    padding: 18px 0 7px;
    border-radius: 10px;
    li{
      margin: 0;
      border: none;
      padding: 0 0 7px;
      border-radius: 0px;
    }
  }
}
.but_type {
  float: right;
  position: absolute;
  right: 40px;
}
</style>
