<template>
  <a-card :body-style="{minHeight: '80vh'}" :bordered="false">
    <div class="title">插件代码</div>
    <div class="tips">
      <span>将此代码嵌入到你网站页面body标签之前即可启用服务</span>
    </div>
    <div v-if="is_ok">
      <p class="getHtml" id="getHtml">
        &lt;script type='text/javascript'&gt;{{ script }}&lt;/script&gt;
      </p>
    </div>
  </a-card>
</template>
<script>
import { getMerchToken } from '../../network/Interface/setting'

export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      current_token: '',
      is_ok: false,
      script: ''
    }
  },
  methods: {},
  created () {
      getMerchToken().then((res) => {
        this.is_ok = true
        this.current_token = res.result.token
        const url = this.$store.state.userUrl
        // 微擎
        // const url = `${window.location.protocol}//${window.location.host}/addons/pinxuan_kefu/public`
        const httpUrl = window.location.href
        console.log('url', httpUrl)
        const stringIndex = httpUrl.indexOf('?')
        const httpUrlnew = httpUrl.substring(0, stringIndex)
        this.script = `
          (function (a, b, c, d, e, j, s) {
          a[d] = a[d] || function () {
            (a[d].a = a[d].a || []).push(arguments)
          }
          j = b.createElement(c)
          s = b.getElementsByTagName(c)[0]
          j.async = true
          j.charset = 'UTF-8'
          j.src = '${url}/agent/js/webtool.js'
          s.parentNode.insertBefore(j, s)
          })(window, document, 'script', '_PINXUAN')
          _PINXUAN('mchid', '${this.current_token}', 'Url', '${httpUrlnew}')
        `
      })
  }
}
</script>

<style scoped>
    .title {
        font-size: 20px;
        font-weight: bold;
        color: rgba(0,0,0,.85);
    }
    .tips{
      padding: 8px 0;
    }
    .getHtml{
      border: 1px solid #ccc;
      border-radius: 12px;
      padding: 20px 10px;
      background: #e9e9e996;
      margin: 10px 0;
      white-space: pre-wrap;
    }
</style>
