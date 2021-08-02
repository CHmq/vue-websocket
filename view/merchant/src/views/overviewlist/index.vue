<template>
  <a-row>
    <h2 style="font-weight: bold;font-size: 18px;color: #555555;">今日客服数据总览</h2>
    <a-row style="margin-bottom:50px;">
      <a-col class="tab-box" :xs="12" :lg="6">
        <div class="databox">
          <div class="line-bottom">
            <p style="text-align: center;color: #555555;">接待上限&nbsp;&nbsp;&nbsp;</p>
          </div>
          <div class="line-top">
            <!-- <p class="data_title">正在咨询人数</p> -->
            <p class="data_content">{{ kefudata.ceiling_client }}</p>
          </div>
        </div>
      </a-col>
      <a-col :xs="12" :lg="6">
        <div class="databox">
          <div class="line-bottom">
            <p style="text-align: center;color: #555555;">已接待的客户人数&nbsp;&nbsp;&nbsp;</p>
          </div>
          <div class="line-top">
            <!-- <p class="data_title">正在咨询人数</p> -->
            <p class="data_content">{{ kefudata.end_client_sum }}</p>
          </div>
        </div>
      </a-col>
      <a-col :xs="12" :lg="6">
        <div class="databox">
          <div class="line-bottom">
            <p style="text-align: center;color: #555555;">正在接待的客户人数&nbsp;&nbsp;&nbsp;</p>
          </div>
          <div class="line-top">
            <!-- <p class="data_title">正在咨询人数</p> -->
            <p class="data_content">{{ kefudata.client_ids }}</p>
          </div>
        </div>
      </a-col>
      <a-col :xs="12" :lg="6">
        <div class="databox">
          <div class="line-bottom">
            <p style="text-align: center;color: #555555;">在线时长&nbsp;&nbsp;&nbsp;</p>
          </div>
          <div class="line-top">
            <!-- <p class="data_title">正在咨询人数</p> -->
            <p class="data_content">{{ kefudata.login_time }}</p>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row v-show="false">
      <a-col :span="24">
        <h2 style="font-weight: bold;font-size: 18px;color: #555555;" v-show="dataNewList.length !== 0">客服服务数据趋势</h2>
        <div id="mountNodes" style="width:100%"></div>
      </a-col>
    </a-row>
  </a-row>
</template>
<script>
import { getDataOverviewList, getKfDataOverview } from '../../network/Interface/chart'
// import Cookies from 'js-cookie'
import * as G2 from '@antv/g2'
console.log(G2)
var data = []
export default {
    data () {
        return {
            dataNewList: [],
            kefudata: ''
        }
    },
    created () {
    },
    methods: {
        getDataList () {
            console.log(this)
            const that = this
            getDataOverviewList().then((res) => {
                if (res.success) {
                    console.log('数据列表图表', res)
                    var list = res.result
                    var newchatSum = []
                    // 处理图表格式数据
                    for (const newkey in list) {
                        if (newkey === 'chatSum' || newkey === 'dialogue' || newkey === 'endChat' || newkey === 'visitor') {
                            for (const key in res.result[newkey]) {
                            for (const mon in res.result[newkey][key]) {
                                    for (const days in res.result[newkey][key][mon]) {
                                        if (res.result[newkey][key][mon][days] instanceof Object) {
                                            var typename = newkey === 'chatSum' ? '消息数' : newkey === 'dialogue' ? '对话数' : newkey === 'endChat' ? '结束的对话数' : newkey === 'visitor' ? '访问数' : ''
                                            newchatSum.push({ type: typename, date: key + '-' + mon + '-' + days, value: res.result[newkey][key][mon][days].day })
                                        }
                                }
                            }
                        }
                        }
                    }
                    console.log(newchatSum)
                    if (newchatSum.length !== 0) {
                      data = newchatSum
                    } else {
						var myDate = new Date()
						var year = myDate.getFullYear()
						var mon = myDate.getMonth() > 10 ? myDate.getMonth() + 1 : '0' + (myDate.getMonth() + 1)
						var day = myDate.getDate() > 10 ? myDate.getDate() : '0' + myDate.getDate()
						var dayTime = year + '-' + mon + '-' + day
						newchatSum.push({ type: '消息数', date: dayTime, value: 0 }, { type: '对话数', date: dayTime, value: 0 }, { type: '结束的对话数', date: dayTime, value: 0 }, { type: '访问数', date: dayTime, value: 0 })
						data = newchatSum
                    }
                    that.dataNewList = newchatSum
                    that.tubiaoys()
                } else {
                    // that.$message.error(res.error.message)
                }
            })
        },
        keData () {
            const that = this
            // const merchid = JSON.parse(Cookies.get('result')).merch.id
            const merchid = JSON.parse(sessionStorage.getItem('result')).merch.id
            console.log('merchidmerchid', merchid)
            getKfDataOverview(merchid).then((res) => {
                if (res.success) {
                    console.log('客服', res)
                    that.kefudata = res.result
                } else {
                    // that.$message.error(res.error.message)
                }
            })
        },
        tubiaoys () {
            var chart = new G2.Chart({
                container: 'mountNodes',
                forceFit: true,
                height: 300,
                width: document.querySelector('#mountNodes').offsetWidth,
                padding: [40, 45, 70, 45] // 上右下左
            })
            chart.source(data)
            chart.axis('date', {
                label: {
                    textStyle: {
                        fill: '#aaaaaa'
                    }
                },
                grid: {
                    align: 'center',
                    type: 'line',
                    lineStyle: {
                        stroke: '#d9d9d9', // 网格线的颜色
                        lineDash: [ 2, 2 ] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
                    },
                    hideFirstLine: true,
                    hideLastLine: true
                }
            })
            chart.scale('date', {
                range: [0, 1]
            })
            chart.axis('value', {
                label: {
                    textStyle: {
                        fill: '#aaaaaa'
                    },
                    formatter: function formatter (text) {
                        return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                    }
                },
                grid: {
                    align: 'center',
                    type: 'line',
                    lineStyle: {
                        stroke: '#d9d9d9', // 网格线的颜色
                        lineDash: [ 2, 2 ] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
                    },
                    hideFirstLine: true,
                    hideLastLine: true
                }
                // line: {
                //     lineWidth: 2, // 设置线的宽度
                //     stroke: 'red', // 设置线的颜色
                //     lineDash: [ 3, 3 ] // 设置虚线样式
                // }
            })
            chart.axis('type', {
                grid: {
                    align: 'center'
                },
                tickLine: null,
                label: {
                Offset: 10,
                    textStyle: {
                        textAlign: 'center' // 设置坐标轴 label 的文本对齐方向
                    }
                }
            })
            chart.legend('type', {
                // itemWidth: 50 // 设置图例项的宽度，使其在垂直方向上能够排列整齐
            })
            chart.line().position('date*value').color('type')
            var shijiWidth = document.querySelector('#mountNodes').offsetWidth
            chart.render()
            chart.showTooltip({
                x: shijiWidth - 20,
                y: 100
            })
        }
    },
    mounted () {
        this.getDataList()
        this.keData()
    }

}
</script>

<style scoped>
.custom-tooltip {
        width: 100% !important;
        height: 10% !important;
        position: absolute;
        top: 0px;
        left: 0px
    }

    .custom-tooltip-item {
        width: 150px;
        height: 50px;
        position: relative;
        float: left;
        margin-left: 20px;
        border-left-style: solid;
        border-left-width: 5px
    }

    .custom-tooltip-item:first-child {
        margin-left: 0
    }

    .custom-tooltip-item-name {
        width: 80%;
        height: 20px;
        position: absolute;
        top: 0px;
        left: 10px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px
    }

    .custom-tooltip-item-value {
        width: 80%;
        height: 30px;
        position: absolute;
        bottom: 0px;
        left: 10px;
        color: #262626;
        font-size: 22px;
        /*font-weight: bold*/
    }
    .databox{
        border: 1px solid #ddd;
        width: 100%;
        height: 180px;
        margin-right: 20px;
        border-radius: 8px;
        margin-top: 10px;
    }
    .line-top{
        width: 100%;
        height: 120px;
        padding: 32px 0 24px 0;
    }
    .data_title{
        text-align: center;
    }
    .data_content{
        font-size: 24px;
        color: #3399ff;
        margin-top: 12px;
        text-align: center;
    }
    .line-bottom{
        width: 100%;
        height: 58px;
        background: #ccc;
        line-height: 58px;
    }
</style>
