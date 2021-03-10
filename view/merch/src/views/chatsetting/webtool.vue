<template>
  <div>
    <div class="title">基础分配</div>
    <div>
      <span>当有顾客发起对话后, 将会按照所选择的基础分配规则进行分配</span>
    </div>
    <div>
      <span>基础分配规则</span>
    </div>
    <div v-if="is_ok"></div>
  </div>
</template>
<script>
import { getMerchToken } from '../../network/websocket'

export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      current_token: '',
      is_ok: false
    }
  },
  methods: {},
  created () {
      getMerchToken().then((res) => {
        this.is_ok = true
        this.current_token = res.result.token
      })
  }
}
</script>

<style scoped>
    ::v-deep ant-pro-grid-content .title {
        font-size: 20px;
        font-weight: bold;
    }
</style>
