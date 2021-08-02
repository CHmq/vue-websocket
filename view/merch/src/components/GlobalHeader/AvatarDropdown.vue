<template>
  <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar
        size="small"
        :src="this.$store.state.userAvatar.indexOf('avatar2') === -1 ?
          `${this.$store.state.userUrl}${this.$store.state.userAvatar}` : 'http://kefu.xuandev.com/agent/avatar2.jpg'"
        class="antd-pro-global-header-index-avatar" />
      <span>{{ this.$store.state.userName }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <a-icon type="user" />
          个人中心
        </a-menu-item>
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <a-icon type="setting" />
          个人设置
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'
import { Logout } from '../../network/websocket'
import { mapActions } from 'vuex'
// import Cookies from 'js-cookie'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // name: this.$store.state.userName
      // avatar: this.$store.state.userAvatar
    }
  },
  methods: {
    ...mapActions(['changeInfoName', 'changeInfoAvatar', 'SET_ROLES']),
    handleToCenter () {
      this.$router.push({ path: '/account/center' })
    },
    handleToSettings () {
      this.$router.push({ path: '/account/settings' })
    },
    handleLogout (e) {
      // var that = this
      Modal.confirm({
        title: this.$t('退出登陆'),
        content: this.$t('确定是否退出'),
        onOk: () => {
          const mchid = JSON.parse(sessionStorage.getItem('resInfo')).merch.id
          Logout(mchid).then((res) => {
            console.log('退出登陆', res)
            if (res.error) {
              return this.$message.error(res.error.message)
            }
            sessionStorage.clear()
            // sessionStorage.removeItem('UserToken')
            // sessionStorage.removeItem('UserId')
            // sessionStorage.removeItem('userName')
            // sessionStorage.removeItem('userAvatar')
            // sessionStorage.removeItem('userPower')
            // sessionStorage.removeItem('resInfo')
            // sessionStorage.removeItem('result')
            this.$store.commit('SET_ROLES', [])
            // Cookies.remove('UserToken')
            // Cookies.remove('UserId')
            localStorage.removeItem('Access-Token')
            // localStorage.removeItem()
            location.reload()
            setTimeout(() => {
              this.$router.push({ name: 'login' })
            }, 200)
          })
          // return this.$store.dispatch('Logout').then(() => {
            // this.$router.push({ name: 'login' })
          // })
        },
        onCancel () {
        }
      })
    }
  },
  created () {
    this.changeInfoName(sessionStorage.getItem('userName'))
    // this.changeInfoAvatar(sessionStorage.getItem('userAvatar'))
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
