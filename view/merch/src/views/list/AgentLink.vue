<template>
  <a-card :body-style="{minHeight: '80vh'}" :bordered="false">
    <h3 class="title">聊天链接</h3>
    <p>当顾客点击聊天链接打开页面时，即能与你的企业进行对话</p>
    <a-button type="primary" @click="getLink">生成链接</a-button>
    <a-button v-show="text" class="copy-code-button" :data-clipboard-text="text" type="text" @click="copyLink">一键复制链接</a-button>
    <p class="link" v-show="text">
      {{ text }}<br>
    </p>
  </a-card>
</template>

<script>
import { getChatLink } from '../../network/Interface/customer'
import Clipboard from 'clipboard'
// import Cookies from 'js-cookie'
export default {
  name: 'AgentLink',
  data () {
      return {
          text: ''
      }
  },
  methods: {
    getLink () {
    // var data = Cookies.get('result')
    // var data = sessionStorage.getItem('resInfo')
    const result = JSON.parse(sessionStorage.getItem('resInfo'))
    // console.log(result.merch.id)
      getChatLink(result.merch.id).then((res) => {
        console.log(res.result.chat_link)
        this.text = res.result.chat_link
      })
    },
    // 复制链接
    copyLink () {
      const clipboard = new Clipboard('.copy-code-button') // 这里可以理解为选择器，选择上面的复制按钮
      clipboard.on('success', e => {
          this.$message.success('复制成功')
          // 释放内存
          clipboard.destroy()
      })
      clipboard.on('error', e => {
          // 不支持复制
          this.$message.error('手机权限不支持复制功能')
          // 释放内存
          clipboard.destroy()
      })
    }
  }
}
</script>

<style>
.title{
  font-size: 20px;
  font-weight: bold;
  color: rgba(0,0,0,.85);
}
.link{
    padding: 15px;
    font-size: 18px;
    background: #e9e9e996;
    margin-top: 20px;
    border-radius: 10px;
    border: 1px solid #ccc;
}
.copy-code-button{
  margin-left: 15px;
}
</style>
