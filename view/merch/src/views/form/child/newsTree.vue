<template>
  <a-tree
    :auto-expand-parent="autoExpandParent"
    :tree-data="swiftMsgList"
    :defaultExpandAll="true"
    @select="clickON"
  >
    <span slot="title0010"></span>
  </a-tree>
</template>
<script>
import { getSwiftMsgList } from '../../../network/Interface/dialogue'

export default {
  props: {
    mchid: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {
      // expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: false,
      defaultExpandAll: true,
      // checkedKeys: ['0-0-0'],
      // selectedKeys: [],
      // treeData: treeData,
      swiftMsgList: [{
        title: '企业回复',
        key: '0',
        // disabled: true,
        children: []
      }, {
        title: '个人回复',
        key: '1',
        // disabled: true,
        children: []
      }] // 列表内容
    }
  },
  // watch: {
  //   checkedKeys (val) {
  //     console.log('onCheck', val)
  //   }
  // },
  methods: {
    clickON (key, e) {
      const item = e.node.dataRef.content
      if (item) {
        this.$emit('itemclick', item)
      }
    },
    getMsgList () {
      getSwiftMsgList(this.mchid).then((res) => {
        console.log(res.result)
        const merchReplyGroup = res.result.merchReplyGroup
        const agentReplyGroup = res.result.agentReplyGroup
        this.swiftMsg(merchReplyGroup, 0)
        this.swiftMsg(agentReplyGroup, 1)
      })
    },
    swiftMsg (name, num) {
      for (let i = 0; i < name.length; i++) {
        const dict = { title: '', key: '', children: [] }
        dict.title = name[i].name
        dict.key = name[i].id
        for (let j = 0; j < name[i].son.length; j++) {
          const dictSon = { title: '', key: '', content: '' }
          dictSon.title = name[i].son[j].name
          dictSon.key = name[i].son[j].id
          dictSon.content = name[i].son[j].content
          dict.children.push(dictSon)
        }
        // dictSon.children = name[i].son.content
        this.swiftMsgList[num].children.push(dict)
      }
    }
  },
  created () {
    this.getMsgList()
  }
}
</script>

<style>

</style>
