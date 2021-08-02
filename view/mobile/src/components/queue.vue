<template>
  <div class="wrapper" :class="type === 'pc' ? 'pcwrapper' : 'mwrapper'">
    <div class="queueHeader" v-show="type !== 'pc'" style="position: relative;">
      <p>排队等待中....</p>
      <div
        class="closebtns2"
        style="background-color: #fff;width: 25px;color: #red;height: 25px;
        position: absolute;bottom: calc(50% - 12px);right: 10px;border-radius: 50%;
        text-align: center;font-size: 18px;line-height: 25px;color:black;
        box-shadow: 0 0 6px rgba(0,0,0,.1);cursor:pointer;"
        v-show="showClosebtn"
        @click="heardClosebtn">x</div>
    </div>
    <div v-if="messageTips === ''">
      <div class="queueTips">
        <p>{{ queueTips }}</p>
      </div>
      <div class="queueNum">
        <p>
          当前排队人数
        </p>
        <h3>{{ queueNum }}</h3>
      </div>
    </div>
    <div v-else class="messageTips">
      <div class="messqgeCell">
        <h3>
          <span>{{ messageTips }}</span>
        </h3>
        <van-cell-group>
          <van-field
            type="textarea"
            placeholder="请输入留言"
            :autosize="{minHeight: 280} "
          />
        </van-cell-group>
      </div>
    </div>
    <div class="queueFooter">
      <p>{{ queueTicket }}</p>
      <van-button
        class="messageBtn"
        type="danger">
        {{ messageTips === '' ? '给我们留言' : '提交' }}
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
    },
    messageTips: {
      type: String,
      default: () => ''
    },
    showClosebtn: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    heardClosebtn() {
      this.$parent.heardClosebtn()
    }
  }
}
</script>

<style scoped lang="scss">
.messageTips{
  display: flex;
  align-items: center;
  justify-content: center;
  .messqgeCell{
    width: 88%;
    ::v-deep .van-cell{
      height: 280px;
      border: 1px solid #cccccc45;
    }
  }
}
.pcwrapper{
  position: relative;
  z-index: 99;
  width: 65%;
  height: 78vh;
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
    padding: 2.778vw 0;
    p{
      padding: 0;
      margin: 1.389vw 0 0;
    }
  }
  .queueTips{
    height: 20%;
    h3{
      margin: 8vw ;
    }
    p{
      text-align: center;
      padding: 0vw 4.167vw;
    }
  }
  .queueNum{
    padding: 1vw 13px;
    height: 30%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    h3{
      font-size: 70px;
      margin-top: 20px;
      color: #ee0a24;
      text-shadow: 0px 2px 20px #ee0a24;
      animation:example 2s infinite linear
    }
  }
  .queueFooter{
    position: relative;
    p{
      margin: 33px 7vh
    }
    .messageBtn{
      width: 90%;
      position: absolute;
      margin-top: 3vw;
      left: calc(50% - 45%);
    }
  }
}
@keyframes example {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(2.778vw);
    transform: translateY(2.778vw);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
@media screen and (min-width: 767px) {
  .wrapper {
    .messageTips{
      padding-top: 3vw;
    }
    .queueTips{
      p{
        padding: 2vw 4.167vw;
      }
    }
    // .queueFooter{
    //   .messageBtn{
    //   top: 5vw;
    //   }
    // }
    .queueNum{
      padding: 1vh 13px;
    }
  }
}
@media screen and (max-width: 767px) {
  .wrapper {
    .messageTips{
      padding-top: 13vw;
    }
    .queueTips{
      p{
        padding: 6vw 4.167vw;
      }
    }
    // .queueFooter{
    //   .messageBtn{
    //     top: 22vw;
    //   }
    // }
    .queueNum{
      padding: 2vh 13px;
    }
  }
}
@media screen and (max-width: 300px) {
  .wrapper {
    .messageTips{
      padding-top: 2vw;
      ::v-deep .van-cell{
        height: 150px;
      }
    }
    .queueNum{
      padding: 0;
    }
    .queueTips{
      p{
        padding: 0vw 4.167vw;
      }
    }
    .queueFooter{
      p{
        padding: 0 20px;
        margin: 10px 7vh;
      }
      .van-button--normal{
        height: 32px;
      }
      // .messageBtn{
      //   top: 20vw;
      // }
    }
  }
}
</style>
