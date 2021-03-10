<template>
  <div class="wrapper" :class="type === 'pc' ? 'pcwrapper' : 'mwrapper'">
    <div class="queueHeader" v-show="type !== 'pc'">
      <p>排队等待中....</p>
    </div>
    <div class="queueTips">
      <p>{{ queueTips }}</p>
    </div>
    <div class="queueNum">
      <p>
        当前排队人数
      </p>
      <h3>{{ queueNum }}</h3>
    </div>
    <div class="queueFooter">
      <p>{{ queueTicket }}</p>
      <van-button
      class="messageBtn"
      type="danger">
        给我们留言
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    queueTips: {
      type: String,
      default: () => ''
    },
    queueNum: {
      type: Number,
      default: () => 0
    },
    queueTicket: {
      type: String,
      default: () => ''
    },
    // show: {
    //   type: Boolean,
    //   default: () => false
    // },
    type: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style scoped lang="scss">
.pcwrapper{
  position: relative;
  z-index: 99;
  width: 65%;
  height: 65vh;
  float: left;
}
.mwrapper{
  height: 100%;
}
.wrapper {
  .queueHeader{
    width: 100%;
    height: 7%;
    background: #f51f10;
    color: #fff;
    font-weight: bolder;
    padding: 10px 0;
    p{
      padding: 0;
    }
  }
  .queueTips{
    height: 20%;
    p{
      text-align: center;
      padding: 0px 15px;
    }
  }
  .queueNum{
    padding: 40px;
    height: 30%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    h3{
      font-size: 50px;
      margin-top: 20px;
      color: #ee0a24;
      text-shadow: 0px 41px 40px #ee0a24;
      animation:example 2s infinite linear
    }
  }
  .queueFooter{
    height: 33%;
    .messageBtn{
      width: 90%;
      position: absolute;
      bottom: 15px;
      left: 22px;
    }
  }
}
@keyframes example {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
</style>
