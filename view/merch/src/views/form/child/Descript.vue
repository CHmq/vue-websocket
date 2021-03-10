<template>
  <a-descriptions
    :column="1"
    :size="'small'"
    :bordered="true"
  >
    <a-descriptions-item label="浏览器信息" >
      <p class="text">{{ clientInf.browser }}</p>
    </a-descriptions-item>
    <a-descriptions-item label="系统信息">
      <p class="text">{{ clientInf.os }}</p>
    </a-descriptions-item>
    <!-- <a-descriptions-item label="来源平台">
      <p class="text">{{ clientInf.platform }}</p>
    </a-descriptions-item> -->
    <a-descriptions-item label="IP地址">
      <p class="text">{{ clientInf.ip }}</p>
    </a-descriptions-item>
    <a-descriptions-item label="来源链接">
      <p class="text">{{ clientInf.source_url }}</p>
    </a-descriptions-item>
    <a-descriptions-item label="地址">
      <p class="text">{{ clientInf.district }}</p>
    </a-descriptions-item>
  </a-descriptions>
</template>

<script>
export default {
  components: {
  },
  props: {
    clientInf: {
        type: Object,
        default: () => {}
    }
  },
  data () {
    return {
      size: 'small'
    }
  },
  methods: {},
  created () {}
}
</script>

<style scoped>
::v-deep .ant-descriptions-item-label{
  word-break: keep-all;
}
::v-deep .text{
  width: 100%;
  word-break: break-all;
  overflow: hidden;
}
</style>
