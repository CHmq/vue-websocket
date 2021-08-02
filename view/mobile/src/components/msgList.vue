<template>
  <van-list>
    <div
      :class="['msgList', this.$attrs.msgList === 'msgList' ? 'msgList_h' : 'm_msgList_h']"
      id="talk">
      <van-button
        v-show="isHidden && !getMoreBtn"
        size="small"
        type="primary"
        :disabled="isDisabled"
        :loading="IsLoading"
        color="#fd523e"
        loading-text="加载中..."
        @click="getMoreMsg"
        block
      >查看上一次对话消息</van-button>
      <van-button
        v-show="getMoreBtn"
        size="small"
        type="primary"
        :disabled="isDisabled"
        :loading="IsLoading"
        color="#fd523e"
        loading-text="加载中..."
        @click="getMore"
        block
      >加载更多消息</van-button>
      <van-button
        v-show="!isHidden && !getMoreBtn"
        size="small"
        type="primary"
        :disabled="true"
        color="#fd523e"
      >已经是最近的对话信息了</van-button>
      <van-cell v-for="(item, index) in messageList" :key="index">
        <!-- <div v-if="item.message">
          {{ item.message }}
        </div>
        <div v-else> -->
        <div v-if="item.name" style="textAlign : center">
          <div v-if="item.type === 'commodity'">
            <span class="commodityTime">{{ item.time }}</span>
            <div class="commodity">
              <div class="commodDetails">
                <div class="detailsLeft">
                  <img :src="item.thumb">
                </div>
                <div class="detailsRight">
                  <p>{{ item.title }}</p>
                  <br>
                  <span>￥ {{ item.price }}</span>
                </div>
              </div>
              <div class="commodBtn">
                <van-button round size="small" color="#f51f10" @click="sendLink(item.id)">发送链接</van-button>
              </div>
            </div>
          </div>
          <span v-else>客服 {{ item.name }} 为您服务</span>
        </div>
        <div v-else>
          <div
            :style="item.send_type === 'agent' || item.send_type === 'json' ?
              'textAlign : left' : 'textAlign : right'">
            <span v-if="item.send_type === 'agent'">{{ item.agent_name }} --</span>
            {{ item.create_time ? item.create_time.split(' ')[1] : item.time }}
          </div>
          <!-- 客服头像显示 -->
          <span
            v-if="item.send_type === 'json'"
            class="textLeft"
          >
            <van-icon
              size="28px"
              :name="fullAvatar.indexOf('http') === -1 ? `${imgUrl}${fullAvatar}` : fullAvatar" />
          </span>
          <span
            v-else-if="item.send_type === 'agent'"
            :class="item.send_type === 'agent'? 'textLeft' : 'textRight'"
          >
            <van-icon
              size="28px"
              :name="fullAvatar.indexOf('http') === -1 ? `${imgUrl}${fullAvatar}` : fullAvatar" />
          </span>
          <!-- 客户头像显示 -->
          <span v-else :class="item.send_type === 'agent'? 'textLeft' : 'textRight'">
            <van-icon size="28px" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
          </span>
          <!-- 内容显示 -->
          <p v-if="item.send_type && item.send_type === 'json'" class="textLeft">
            <!-- {{ typeof(JSON.parse(item.content)) }} -->
            <span v-if="JSON.parse(item.content).constructor === Array" class="tabList">
              <h5 class="tabTitle">为你找到下列内容</h5>
              <ul class="listUl">
                <li v-for="(data, indexContent) in JSON.parse(item.content)" :key="indexContent">
                  {{ data.title }}
                </li>
              </ul>
            </span>
            <span v-else>
              {{ JSON.parse(item.content) }}
            </span>
          </p>
          <p
            v-if="item.send_type !== 'json' && !item.send_welcome && !item.send_menuTab && !item.send_commodity"
            :class="item.send_type === 'agent'? 'textLeft' : 'textRight noagent'"
          >
            <!-- 已读/未读显示 -->
            <span
              v-if="item.send_type !== 'agent' && item.msg_type && item.is_read !== 2"
              :class="['readMsg',item.is_read === 1 ? 'readcolor' : 'unreadcolor']">
              {{ item.is_read === 1 ? '已读' : '未读' }}
            </span>
            <!-- 系统消息 -->
            <span v-if="!item.msg_type">{{ item.content }}</span>
            <!-- 发送消息 -->
            <span v-else-if="item.msg_type === 'text'">{{ item.msg }}</span>
            <!-- 发送图片 -->
            <img
              v-else-if="item.msg_type === 'image'"
              :src="item.msg.indexOf('http') !== -1 ? item.msg : `${imgUrl}${item.msg}` "
              width="100px"
              @click="onchangImgs(item.msg.indexOf('http') !== -1 ? item.msg
                : `${imgUrl}${item.msg}`)">
            <!-- 发送文件 -->
            <a :href="`${imgUrl}${item.msg}`" v-else class="fileType">
              <van-icon name="send-gift-o" />
            </a>
          </p>
          <!-- 商品 -->
          <p
            class="sendCommodity"
            v-if="item.send_type && item.send_commodity"
            :class="item.send_type === 'agent'? 'textLeft' : 'textRight'"
          >
            <span class="commodityImg">
              <img :src="item.thumb">
            </span>
            <span class="commodityTitle">
              <span>{{ item.title }}</span>
              <!-- <span>{{ item.desc }}</span> -->
              <b>￥{{ item.price }}</b>
            </span>
          </p>
          <!-- 客服欢迎语句 -->
          <p
            v-if="item.send_type && item.send_welcome"
            :class="item.send_type === 'agent'? 'textLeft' : 'textRight'"
          >
            <span v-html="item.content"></span>
          </p>
          <!-- 菜单显示 -->
          <p
            v-if="item.send_type && item.send_menuTab"
            :class="['tabList',item.send_type === 'agent'? 'textLeft' : 'textRight']"
          >
            <span v-if="item.tabContent">
              <h5 v-if="item.title" class="tabTitle">{{ item.title }}</h5>
              <ul :class="item.title ? 'listUl' : 'listNone'">
                <li v-for="( itemMenu, indexMenu ) in item.menuTab" :key="indexMenu">
                  <a @click="getTab(itemMenu.id)">
                    {{ itemMenu.title }}
                  </a>
                </li>
              </ul>
            </span>
            <span v-else>
              <!-- <h5 class="tabTitle">{{ item.menuTab.title }}</h5> -->
              {{ item.menuTab.content }}
            </span>
          </p>
        </div>
        <!-- </div> -->
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
    isDisabled: {
      type: Boolean,
      default: () => true
    },
    isHidden: {
      type: Boolean,
      default: () => false
    },
    getMoreBtn: {
      type: Boolean,
      default: () => false
    },
    fullAvatar: {
      type: String,
      default: () => ''
    },
    tabShow: {
      type: Boolean,
      default: () => true
    },
    imgUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      // msgList: 'msgList',
      IsLoading: false, // 加载状态
      // Ishidden: false, // 加载历史消息按钮
      // Isdisabled: true, // 是否加载历史消息
      page: 1, // 消息分页,
      hostSatus: true // 设置是否是查看历史消息
    }
  },
  methods: {
    // 获取上一页消息
    getMoreMsg() {
      this.IsLoading = true
      this.page += 1
      this.$parent.ChatRecord(this.mchid, this.clientid, this.page, this.hostSatus)
      setTimeout(() => {
        this.IsLoading = false
      }, 1000)
    },
    // 循环添加消息
    getMore() {
      console.log('1')
      this.IsLoading = true
      this.$parent.getMsg()
      setTimeout(() => {
        this.IsLoading = false
      }, 1000)
    },
    onchangImgs(imgUrl) {
      console.log(imgUrl)
      ImagePreview({ images: [imgUrl], closeable: true })
    },
    getTab(id) {
      if (id) {
        this.$parent.getTabMenu(id)
      }
    },
    sendLink(id){
      // console.log('sendLink')
      this.$parent.sendCommodity('1')
    }
  },
  watch: {
    tabShow() {
      console.log('tab高度', document.querySelector('.msg-tab').clientHeight)
      console.log('聊天列表高度', document.querySelector('.m_msgList_h').clientHeight)
      if (document.querySelector('.msg-tab').clientHeight === 0) {
        // console.log('没有tab，重新给聊天列表设置高度')
        const msgHeight = document.querySelector('.m_msgList_h')
        const msgSend = document.querySelector('.msgSend')
        // const IPhonexHeight = document.querySelector('.iphoneX')
        // console.log('输入框的dom', msgSend)
        // console.log('输入框的高', msgSend.clientHeight)
        // console.log('输入框的高', msgSend.offsetHeight)
        // setTimeout(() => {
        //   console.log('输入框的dom', msgSend)
        //   console.log('输入框的dom', msgSend)
        //   console.log('输入框的高', msgSend.clientHeight)
        //   console.log('输入框的高', msgSend.offsetHeight)
        // }, 3500)
        const divheight = msgHeight.clientHeight
        const msgSendheight = `${msgSend.clientHeight}px`
        console.log(msgSendheight)
        // msgHeight.style.height = `${((divheight + 49) / 360) * 100}vw`
        msgHeight.style.height = `calc(100% - ${msgSendheight})`
        // console.log('msgHeight.clientHeight', `calc(100vh - 44px + ${msgSendheight})`)
        // console.log('msgHeight.clientHeight', msgHeight.clientHeight, `${((divheight + 49) / 360) * 100}vw`)
      }
    }
  },
  mounted() {
    const msgHeight = document.querySelector('.m_msgList_h')
    const msgSend = document.querySelector('.msgSend')
    msgHeight.style.height = `calc(100% - ${msgSend.clientHeight}px)`
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
.sendCommodity{
  float: right;
  .commodityImg{
    display: block;
    flex: 1;
    img{
      width: 100%;
      height: auto;
    }
  }
  .commodityTitle{
    display: block;
    flex: 2;
    padding: 0 0 0 9px;
    span{
      overflow:hidden; 
      text-overflow:ellipsis;
      display:-webkit-box; 
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
      margin-bottom: 10px;
    } 
  }
  // .commodityPrice{
  //   font-size: 16px;
  //   font-weight: bolder;
  // }
}
.msgList{
  // overflow: auto;
  overflow-y: scroll;
  padding-top: 8px;
  // overflow-y: scroll;
  ::v-deep .van-button--primary{
    background-color: #fff!important;
    color: #777777!important;
    border: none;
  }
  p{
    max-width: 72%;
    display: inline-block;
    margin: 0.8em 10px;
    word-wrap:break-word;
    background: #ffffff;
    padding: 5px 8px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    position: relative;
    .readMsg{
      width: auto;
      font-size: 12px;
      position: absolute;
      bottom: 0;
      bottom: -5px;
      left: -30px;
      color: #000;
    }
    span{
      word-wrap: break-word;
      display: inline-block;
      width: 100%;
    }
  }
  .noagent{
    background-color: #fd523e;
    color: #fff;
  }
  
  .tabList .listUl li:last-child{
    border-bottom: none;
  }
  .listNone{
    width: 66vw;
    li{
      padding: 5px 10px;
      width: 87%;
      // color: #00abee;
    }
  }
  .listUl{
    width: 64vw;
    // border: 1px solid #ccc;
    // border-radius: 10px;
    padding: 4px;
    li{
      // border-bottom: 1px solid #ccc;
      padding: 5px 10px;
      width: 87%;
      color: #00abee;
    }
  }
  .tabTitle{
    margin: 0;
    padding: 10px 5px;
    font-size: 18px;
  }
  .commodityTime{
    padding: 5px 13px;
    border-radius: 20px;
    background: #ccc;
    color: #fff;
  }
  .commodity{
    text-align: left;
    background: #fff;
    margin-top: 10px;
    border-radius: 5px;
    padding: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    .commodDetails{
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px dashed #7d7c7c73;
      .detailsLeft{
        height: 85px;
        overflow: hidden;
        flex: 1;
        background: #f6f6f6;
        img{
          width: 100%;
          height: 100%;
          margin: 0 auto;
        }
      }
      .detailsRight{
        flex: 2;
        p{
          max-width: 100%;
          margin: 0;
          border-radius: 0px;
          padding: 0 8px;
        }
        span{
          color: #000;
          font-size: 16px;
          font-weight: bolder;
          padding: 5px 8px;
        }
      }
    }
    .commodBtn{
      text-align: center;
      padding: 10px 0;
      .van-button--small{
        padding: 0 20px;
      }
    }
  }
}
.van-cell::after{
  border-bottom: none;
}
::v-deep .msgList_h{
  height: 55vh;
  .commodityTime{
    background: #fff;
    color: #000;
    // text-align: center;
  }
  .commodity{
    background: #eee;
    margin-top: 6px;
  }
  p{
    background: #eee;
  }
  &.msgList{
    overflow: scroll;
    overflow-x: hidden;
  }
}
.m_msgList_h{
  // height: calc(100% - 123px);
  // padding-bottom: 160px;
  // margin-top: 110px;
  // padding-top: 58px;
  box-sizing: border-box;
  // background: #2bff00;
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
  .listUl{
    li{
      border-bottom: 1px solid #ccc;
      }
  }
  .readcolor{
    color: #999999;
  }
  .unreadcolor{
    color: #ffac23;
  }
}
::v-deep .van-image-preview{
  .van-image-preview__close-icon{
    z-index: 1001;
  }
}

</style>
