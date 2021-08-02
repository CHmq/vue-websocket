<template>
  <div>
    <div v-for="(item, index) in clientList" :key="index">
      <div
      class="clientList"
      @click="openClient(item.info.id, item.info.client_name, item.info.dialog_id)"
      >
        <a-col :xs="17" :md="20">
          <a-card-meta :title="item.info.client_name" :description="!item.newest_message ? item.newest_message : ''">
            <a-avatar
            slot="avatar"
            :src="item.Img ? this.Img : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'"
            />
            <a-badge slot="avatar" :count="item.info.unread" class="clientBadge" />
          </a-card-meta>
        </a-col>
        <a-col :xs="7" :md="4">
          <a-button type="danger" shape="circle" icon="close" size="small" @click="chatClose"/>
        </a-col>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clientList: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>

</style>