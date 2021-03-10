<template>
  <div>
    <a-button @click="getLink">生成链接</a-button>
    <p class="link" v-show="text">{{ text }}</p>
  </div>
</template>

<script>
import { getChatLink } from '../../network/websocket'
import Cookies from 'js-cookie'
export default {
  name: 'AgentLink',
  data () {
      return {
          text: ''
      }
  },
  methods: {
    getLink () {
    var data = Cookies.get('result')
    const result = JSON.parse(data)
    // console.log(result.merch.id)
      getChatLink(result.merch.id).then((res) => {
        console.log(res.result.chat_link)
        this.text = res.result.chat_link
      })
    }
  }
}
</script>

<style>
.link{
    padding: 10px;
    font-size: 20px;
    background: #ddd;
    margin-top: 10px;
    border-radius: 15px;
}
</style>
