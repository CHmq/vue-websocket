<template>
  <a-descriptions
    :column="1"
    :size="'small'"
    :bordered="true"
  >
    <a-descriptions-item label="浏览器信息" >
      <span class="text">{{ clientInf.browser }}</span>
    </a-descriptions-item>
    <a-descriptions-item label="系统信息">
      <span class="text">{{ clientInf.device }}</span>
    </a-descriptions-item>
    <a-descriptions-item label="IP地址">
      <span class="text">{{ clientInf.ip }}</span>
    </a-descriptions-item>
    <a-descriptions-item label="来源链接">
      <span class="text">{{ clientInf.source_url }}</span>
    </a-descriptions-item>
    <a-descriptions-item label="所在地区">
      <span class="text">{{ clientInf.district }}</span>
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
