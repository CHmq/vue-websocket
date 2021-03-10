<template>
  <div class="wrap">
    <div class="title">基础分配</div>
    <div>
      <span>当有顾客发起对话后, 将会按照所选择的基础分配规则进行分配</span>
    </div>
    <div>
      <span>基础分配规则</span>
    </div>
    <div v-if="is_ok">
      <a-radio-group @change="toChoose" :defaultValue="current_value">
        <div v-for="(item, index) in dispacth_list" :key="index">
          <a-radio :value="item.field">
            <span>{{ item.name }}</span>
            <div>{{ item.describe }}</div>
          </a-radio>
        </div>
      </a-radio-group>
    </div>
  </div>
</template>

<script>
import { getMerchSettingList, settingAllotRule } from '../../network/websocket'
import Cookies from 'js-cookie'

export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      current_value: 'sort',
      dispacth_list: [],
      is_ok: 0,
      agentId: '',
      current_token: ''
    }
  },
  methods: {
    toChoose (e) {
      this.current_value = e.target.value
      const postData = {
          agent_id: this.agentId,
          token: this.current_token,
          rule: e.target.value
      }
      console.log('form e==================', this.current_value)
      settingAllotRule(postData).then((res) => {
          console.log('res========', res)
      })
    }
  },
  created () {
      const that = this
    var data = Cookies.get('result')
    console.log(JSON.parse(data), this)
      const result = JSON.parse(data)
      this.mchid = result.merch.id
      this.agentId = result.id
      this.current_token = result.token
      const postData = {
          agent_id: result.id,
          token: result.token
      }
      getMerchSettingList(postData).then((res) => {
        that.dispacth_list = res.result.dialog_allots.base_allot.son.allot_rule.values
        const len = that.dispacth_list.length
        for (let i = 0; i < len; i++) {
            if (that.dispacth_list[i].selected === 1) {
                that.is_ok = 1
                that.current_value = that.dispacth_list[i].field
                console.log('current_value==', that.current_value)
                break
            }
        }
      })
  }
}
</script>

<style scoped>
  .wrap {
    background-color: #fff;
    padding: 20px;
    color: #222;
  }
    ::v-deep ant-pro-grid-content .title {
        font-size: 20px;
        font-weight: bold;
    }
</style>
