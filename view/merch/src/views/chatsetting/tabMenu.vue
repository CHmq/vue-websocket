<template>
  <a-card :body-style="{minHeight: '80vh'}" :bordered="false">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="设置菜单分类">
        <menusetting/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="添加菜单内容">
        <menuContent/>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import menusetting from './menusetting'
import menuContent from './menuContent'
export default {
  components: {
    menusetting,
    menuContent
  }
}
</script>

<style>

</style>
