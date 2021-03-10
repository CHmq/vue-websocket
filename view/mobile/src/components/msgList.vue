<template>
  <van-list>
    <div
    :class="this.$attrs.msgList === 'msgList' ? 'msgList_h' : 'm_msgList_h'"
    class="msgList"
    id="talk">
    <van-button
      v-show="Ishidden"
      size="small"
      type="primary"
      :disabled="Isdisabled"
      :loading="IsLoading"
      color="#fd523e"
      loading-text="加载中..."
      @click="getMore"
      block
      :text="Ishidden ? '查看上一次对话消息' : '已经是最近的对话信息了'"
    ></van-button>
      <van-cell v-for="(item, index) in messageList" :key="index">
        <!-- <div v-if="item.message">
          {{ item.message }}
        </div>
        <div v-else> -->
          <div :style="item.send_type === 'agent' ? 'textAlign : left' : 'textAlign : right'">
            {{ item.create_time !=='' ? item.create_time.split(' ')[1] : '' }}
          </div>
          <span
            v-if="item.send_type === 'agent'"
            :class="item.send_type === 'agent'? 'textLeft' : 'textRight'"
          >
            <van-icon size="28px" name="phone-circle" />
          </span>
          <span v-else :class="item.send_type === 'agent'? 'textLeft' : 'textRight'"
          >
            <van-icon size="28px" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
          </span>
          <p
            v-if="item.send_type && !item.send_welcome"
            :class="item.send_type === 'agent'? 'textLeft' : 'textRight noagent'"
          >
            <span v-if="item.msg_type === 'text'">{{ item.msg }}</span>
            <img
            v-else-if="item.msg_type === 'image'"
            :src="item.msg.indexOf('http') !== -1 ? item.msg : `http://kefu.xuandev.com${item.msg}` "
            width="100px"
            @click="onchangImgs(item.msg.indexOf('http') !== -1 ? item.msg : `http://kefu.xuandev.com${item.msg}`)">
            <a :href="`http://kefu.xuandev.com${item.msg}`" v-else class="fileType">
              <van-icon name="send-gift-o" />
            </a>
          </p>
          <p
            v-if="item.send_type && item.send_welcome"
            :style="item.send_type === 'agent'? 'textLeft' : 'textRight'"
          >
            <span v-html="item.content"></span>
          </p>
        <!-- </div> -->
        <!-- <p v-if="!item.send_type" style="textAlign : center">{{ item.message }}</p> -->
      </van-cell>
    </div>
  </van-list>
</template>

<script>
import { ImagePreview } from 'vant'

export default {
  props: {
    messageList: {
      type: Array,
      default: () => []
    },
    Isdisabled: {
      type: Boolean,
      default: () => true
    },
    Ishidden: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      // msgList: 'msgList',
      IsLoading: false, // 加载状态
      // Ishidden: false, // 加载历史消息按钮
      // Isdisabled: true, // 是否加载历史消息
      page: 1 // 消息分页
    }
  },
  methods: {
    // 获取上一页消息
    getMore() {
      this.IsLoading = true
      this.page += 1
      this.$parent.ChatRecord(this.mchid, this.clientid, this.page)
      setTimeout(() => {
        this.IsLoading = false
      }, 1000);
    },
    onchangImgs(imgUrl) {
      console.log(imgUrl)
      ImagePreview({ images: [imgUrl], closeable: true })
    }
  }
}
</script>

<style scoped lang="scss">
.textLeft{
  float : left;
}
.textRight{
  float : right;
}
.fileType{
  color: #ffffff;
  font-size: 50px;
}
.msgList{
  overflow: scroll;
  p{
    max-width: 75%;
    display: inline-block;
    margin: 0.8em 10px;
    word-wrap:break-word;
    background: #ffffff;
    padding: 5px 8px;
    border-radius: 5px;
  }
  .noagent{
    background-color: #fd523e;
    color: #fff;
  }
}
.van-cell::after{
  border-bottom: none;
}
::v-deep .msgList_h{
  height: 55vh;
  p{
    background: #ccc;
  }
}
.m_msgList_h{
  height: calc(100vh - 44px);
  padding-bottom: 160px;
  // margin-top: 110px;
  // padding-top: 58px;
  box-sizing: border-box;
  ::v-deep .van-cell{
    background-color: transparent;
  }
  ::v-deep .van-button--block{
    display: block;
  }
  ::v-deep .van-button--primary{
    background-color: #e6e6e6!important;
    color: #777777!important;
    border: none;
  }
}

</style>
