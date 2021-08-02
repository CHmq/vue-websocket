<template>
  <page-header-wrapper>
    <div class="datagl">
      <div class="datagl-title">数据概览
        <div class="sxdate">
          <a-range-picker
            :disabled-date="disabledDate"
            format="YYYY-MM-DD"
            :default-value="[moment(), moment()]"
            @change="dateChange"/>
          <a-button type="primary" @click="filtrateData">筛选</a-button>
        </div>
      </div>
      <div class="datagl-item">
        <div class="item-title">
          访问
        </div>
        <div class="item-content">
          <div class="item-btn">
            <a-icon type="android" :style="{ fontSize: '64px' }"/>
            <div class="btn-right">
              <p class="labe">访客数</p>
              <p class="datanum">{{ visitors }}</p>
            </div>
          </div>
          <div class="item-btn">
            <a-icon type="android" :style="{ fontSize: '64px' }"/>
            <div class="btn-right">
              <p class="labe">访问次数</p>
              <p class="datanum">{{ visitorsNum }}</p>
            </div>
          </div>
          <div class="item-btn">
            <a-icon type="android" :style="{ fontSize: '64px' }"/>
            <div class="btn-right">
              <p class="labe">浏览量</p>
              <p class="datanum">{{ pageview }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="datagl-item">
        <div class="item-title">
          对话
        </div>
        <div class="item-content">
          <div class="item-btn">
            <a-icon type="android" :style="{ fontSize: '64px' }"/>
            <div class="btn-right">
              <p class="labe">消息数</p>
              <p class="datanum">{{ chatSum }}</p>
            </div>
          </div>
          <div class="item-btn">
            <a-icon type="android" :style="{ fontSize: '64px' }"/>
            <div class="btn-right">
              <p class="labe">对话次数</p>
              <p class="datanum">{{ dialog_sum }}</p>
            </div>
          </div>
          <div class="item-btn">
            <a-icon type="android" :style="{ fontSize: '64px' }"/>
            <div class="btn-right">
              <p class="labe">有效对话数率</p>
              <p class="datanum">{{ (+valid_rate * 100).toFixed(2) + '%' }}</p>
            </div>
          </div>
          <div class="item-btn">
            <a-icon type="android" :style="{ fontSize: '64px' }"/>
            <div class="btn-right">
              <p class="labe">有效对话次数</p>
              <p class="datanum">{{ valid_dialog }}</p>
            </div>
          </div>
          <div class="item-btn">
            <a-icon type="android" :style="{ fontSize: '64px' }"/>
            <div class="btn-right">
              <p class="labe">对话率</p>
              <p class="datanum">{{ (+dialog_rate * 100).toFixed(2) + '%' }}</p>
            </div>
          </div>
          <div class="item-btn">
            <a-icon type="android" :style="{ fontSize: '64px' }"/>
            <div class="btn-right">
              <p class="labe">有效评价率</p>
              <p class="datanum">{{ (+evaluate_rate * 100).toFixed(2) + '%' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="datagl datagl2">
      <div class="datagl-title">数据详情</div>
      <div class="datagl-item">
        <div class="item-title">
          网站
        </div>
        <div class="item-contentlist">
          <div class="list-item" @click="topage">
            <img src="https://www.easyicon.net/api/resizeApi.php?id=1288411&size=128" alt="">
            <div class="item-text">
              来源统计
            </div>
          </div>
          <div class="list-item" @click="toLand">
            <img src="https://www.easyicon.net/api/resizeApi.php?id=1288411&size=128" alt="">
            <div class="item-text">
              着陆页统计
            </div>
          </div>
          <div class="list-item" @click="toDialogue">
            <img src="https://www.easyicon.net/api/resizeApi.php?id=1288411&size=128" alt="">
            <div class="item-text">
              对话页统计
            </div>
          </div>
        </div>
      </div>
    </div>
    <route-view></route-view>
  </page-header-wrapper>
</template>

<script>
import { RouteView } from '@/layouts'
import { getDataOverviewList } from '../../network/Interface/chart'
import moment from 'moment'
export default {
    // name: 'statement',
    components: {
    RouteView
  },
    data () {
        return {
            text: '',
            visitors: 0,
            visitorsNum: 0,
            pageview: 0,
            chatSum: 0,
            valid_dialog: 0,
            dialog_rate: 0,
            evaluate_rate: 0,
            valid_rate: 0,
            dialog_sum: 0,
            startdate: '',
            enddate: ''
        }
    },
    methods: {
        topage () {
            this.$router.push({ path: '/statement/source' })
        },
        toLand () {
            this.$router.push({ path: '/statement/land' })
        },
        toDialogue () {
            this.$router.push({ path: '/statement/dialogue' })
        },
        getDataList (startdate, enddate) {
            // const that = this
            getDataOverviewList(startdate, enddate).then((res) => {
                if (res.success) {
                    var list = res.result
                    console.log('数据列表图表', res, list)
                    // 访客数
                    // this.visitors = list.visitor.constructor === Object ? list.visitor.sum : 0
                    // 访问次数
                    // this.visitorsNum = list.dialogue.constructor === Object ? list.dialogue.sum : 0
                    // 浏览量
                    // this.pageview = list.page_view.constructor === Object ? list.page_view.sum : 0
                    // 消息次数
                    // this.chatSum = list.chatSum.constructor === Object ? list.chatSum.sum : 0
                    // 有效对话次数
                    // this.valid_dialog = list.valid_dialog.constructor === Object ? list.valid_dialog.sum : 0
                    // 对话率
                    // this.dialog_rate = list.dialog_rate
                    // 有效评价率
                    // this.evaluate_rate = list.evaluate_rate
                    // 有效对话率
                    // this.valid_rate = list.valid_rate
                    // 访客数
                    this.visitors = list.visitor
                    // 访问次数
                    this.visitorsNum = list.visitor_sum
                    // 对话次数
                    this.dialog_sum = list.dialog_sum
                    // 浏览量
                    this.pageview = list.page_view
                    // 消息次数
                    this.chatSum = list.chat_sum
                    // 有效对话次数
                    this.valid_dialog = list.valid_dialog
                    // 对话率
                    this.dialog_rate = list.dialog_rate
                    // 有效评价率
                    this.evaluate_rate = list.evaluate_rate
                    // 有效对话率
                    this.valid_rate = list.valid_rate
                    console.log('this.valid_dialogthis.valid_dialog', this.valid_dialog)
                    // var newchatSum = []
                    // // 处理图表格式数据
                    // for (const newkey in list) {
                    //     if (newkey === 'chatSum' || newkey === 'dialogue' || newkey === 'endChat' || newkey === 'visitor') {
                    //         for (const key in res.result[newkey]) {
                    //         for (const mon in res.result[newkey][key]) {
                    //                 for (const days in res.result[newkey][key][mon]) {
                    //                     if (res.result[newkey][key][mon][days] instanceof Object) {
                    //                         var typename = newkey === 'chatSum' ? '消息数' : newkey === 'dialogue' ? '对话数' : newkey === 'endChat' ? '结束的对话数' : newkey === 'visitor' ? '访问数' : ''
                    //                         newchatSum.push({ type: typename, date: key + '-' + mon + '-' + days, value: res.result[newkey][key][mon][days].day })
                    //                     }
                    //             }
                    //         }
                    //     }
                    //     }
                    // }
                    // console.log(newchatSum)
                    // data = newchatSum
                    // that.dataNewList = newchatSum
                    // that.tubiaoys()
                } else {
                    // that.$message.error(res.error.message)
                }
            })
        },
        disabledDate (current) {
            // Can not select days before today and today
            return current && current > moment().endOf('day') || current < moment().subtract(3, 'months')
        },
        moment,
        getCurrentData () {
            return new Date().toLocaleDateString()
        },
        dateChange (dateObj, dateString) {
            console.log(dateObj, dateString)
            this.startdate = dateString[0]
            this.enddate = dateString[1]
        },
        filtrateData () {
            console.log('filtrateData')
            this.getDataList(this.startdate, this.enddate)
        }
    },
    mounted () {
        var myDate2 = new Date()
		var year2 = myDate2.getFullYear()
		var mon2 = myDate2.getMonth() > 10 ? myDate2.getMonth() + 1 : '0' + (myDate2.getMonth() + 1)
		var day2 = myDate2.getDate() > 10 ? myDate2.getDate() : '0' + myDate2.getDate()
    console.log(year2, mon2, day2)
		this.startdate = year2 + '-' + mon2 + '-' + day2
        this.enddate = year2 + '-' + mon2 + '-' + day2
        this.getDataList()
    }

}
</script>

<style scoped lang="less">
.datagl{
    background-color: #fff;
    padding: 20px;
    .datagl-title{
        display: flex;
        justify-content: space-between;
        padding: 0 0 12px 0;
        font-size: 18px;
        font-weight: 500;
        border-bottom: 1px solid #eef0f6;
    }
    .datagl-item{
        margin-top: 20px;
        .item-title{
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
        }
        .item-content{
            display: flex;
            align-content: center;
            .item-btn{
                display: flex;
                align-content: center;
                width: 12.5%;
                box-sizing: border-box;
                .a-icon{
                    width: 64px;
                    height: 64px;
                }
                .btn-right{
                    .labe{
                        font-size: 14px;
                        color: rgba(4, 15, 66, 0.6);
                    }
                    .datanum{
                        font-size: 18px;
                        color: rgba(4, 15, 66, 0.9);
                        font-weight: 500;
                    }
                }
            }
        }
    }
}
.datagl2{
    margin-top: 20px;
    .item-contentlist{
        display: flex;
        align-content: center;
        padding: 18px 0;
        line-height: 16px;
        .list-item{
            width: 210px;
            height: 120px;
            text-align: center;
            box-shadow: 0px 0px 8px 0px rgba(29, 39, 84, 0.1);
            margin-right: 24px;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &>img{
                width: 48px;
                height: 48px;
                border-radius: 50%;
            }
            .item-text{
                font-size: 14px;
                padding: 8px 0 0 0;
            }
            &:hover .item-text{
                color: #1880ff;
            }
        }
    }
}
</style>
