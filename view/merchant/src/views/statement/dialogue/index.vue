<template>
  <div class="datagl datagl2">
    <div class="datagl-title" v-show="dataNewList.length !== 0">对话页统计</div>
    <div class="datagl-item">
      <div class="time" v-show="dataNewList.length !== 0">
        <span>时间：</span>
        <a-range-picker
          :disabled-date="disabledDate"
          format="YYYY-MM-DD"
          :default-value="[moment(), moment()]"
          @change="dateChange"/>
        <a-button type="primary" @click="filtrateData">筛选</a-button>
      </div>
      <div class="item-contentlist">
        <div id="mountNode" style="width:100%" v-show="false"></div>
      </div>
      <a-table
        :columns="columns"
        :data-source="datashuju"
        bordered
        :scroll="{ x: 248, y: 350 }"
        :pagination="false"
        @change="handleChange">
      </a-table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import * as G2 from '@antv/g2'
import { getChatUrlList } from '../../../network/Interface/chart'
 var data = []
  console.log(data)
export default {
  name: 'StatementDialogue',
  data () {
    return {
		text: '',
		dataNewList: [],
		datashuju: [],
		columns: [],
		startdate: '',
		enddate: '',
		chart: {},
		chartxg: true

    }
  },
  methods: {
    getCurrentStyle (current, today) {
      console.log(current)
      const style = {}
      if (current.date() === 1) {
        style.border = '1px solid #1890ff'
        style.borderRadius = '50%'
      }
      return style
    },
    moment,
	getDataList (startdate, enddate) {
            const that = this
            getChatUrlList(startdate, enddate).then((res) => {
                if (res.success) {
                    console.log('数据列表图表', res)
                    var list = res.result
                    var newchatSum = []
                    // 处理图表格式数据
                    for (const newkey in list) {
                        if (newkey === 'chatSum' || newkey === 'dialogue' || newkey === 'endChat' || newkey === 'visitor' || newkey === 'commMiddle' || newkey === 'page_view' || newkey === 'poor_rating' || newkey === 'praise' || newkey === 'valid_dialog') {
                            for (const key in res.result[newkey]) {
                            for (const mon in res.result[newkey][key]) {
                                    for (const days in res.result[newkey][key][mon]) {
                                        if (res.result[newkey][key][mon][days] instanceof Object) {
                                            var typename = newkey === 'chatSum' ? '消息数' : newkey === 'dialogue' ? '对话数' : newkey === 'endChat' ? '结束的对话数' : newkey === 'visitor' ? '访问数' : newkey === 'commMiddle' ? '中评次数' : newkey === 'page_view' ? '浏览量' : newkey === 'poor_rating' ? '差评次数' : newkey === 'praise' ? '好评次数' : newkey === 'valid_dialog' ? '有效对话次数' : ''
                                            newchatSum.push({ country: typename, year: key + '-' + mon + '-' + days, value: res.result[newkey][key][mon][days].day })
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
						var mon = myDate.getMonth() > 10 ? myDate.getMonth() : '0' + myDate.getMonth()
						var day = myDate.getDate() > 10 ? myDate.getDate() : '0' + myDate.getDate()
						var dayTime = year + '-' + mon + '-' + day
						newchatSum.push({ country: '消息数', year: dayTime, value: 0 }, { country: '对话数', year: dayTime, value: 0 }, { country: '结束的对话数', year: dayTime, value: 0 }, { country: '访问数', year: dayTime, value: 0 }, { country: '中评次数', year: dayTime, value: 0 }, { country: '浏览量', year: dayTime, value: 0 }, { country: '差评次数', year: dayTime, value: 0 }, { country: '好评次数', year: dayTime, value: 0 })
						data = newchatSum
                    }
                    that.dataNewList = newchatSum
                    if (this.chartxg) {
						that.tubiaoys()
					} else {
						this.chart.changeData(data)
					}
					this.datashuju = res.result.chat_url_list.data
					// this.datashuju = []
					// 转换百分比
					this.datashuju.forEach(item => {
						for (const key in item) {
							if (key === 'result_rate' || key === 'evaluate_rate') {
								item[key] = (+item[key] * 100).toFixed(2) + '%'
							}
						}
					})
					// 处理列表格式
					var listdata = []
					// this.datashuju.forEach(element => {
						for (const key in this.datashuju[0]) {
							if (key === 'chat_sum' || key === 'dialog_sum' || key === 'client_sum' || key === 'commMiddle' || key === 'page_view' || key === 'poor_rating' || key === 'praise' || key === 'valid_evaluate' || key === 'chat_url' || key === 'result' || key === 'evaluate_rate' || key === 'result_rate') {
								var newkey = key === 'chat_sum' ? '消息数' : key === 'dialog_sum' ? '对话总数' : key === 'client_sum' ? '访客总数' : key === 'commMiddle' ? '中评次数' : key === 'page_view' ? '浏览量' : key === 'poor_rating' ? '差评次数' : key === 'praise' ? '好评次数' : key === 'valid_evaluate' ? '有效评价' : key === 'chat_url' ? '来源' : key === 'result' ? '有效对话数' : key === 'evaluate_rate' ? '有效评价率' : key === 'result_rate' ? '有效的对话率' : ''
								if (key === 'chat_url') {
									listdata.unshift({ title: newkey, key: key, dataIndex: key, fixed: 'left', width: 248 })
								} else {
									listdata.push({ title: newkey, key: key, dataIndex: key, sorter: true })
								}
							}
						}
					// })
					if (this.datashuju.length === 0) {
						listdata = [{ title: '来源', key: 'chat_url', dataIndex: 'chat_url', fixed: 'left', width: 248 }, { title: '消息数', key: 'chat_sum', dataIndex: 'chat_sum', sorter: true }, { title: '对话总数', key: 'dialog_sum', dataIndex: 'dialog_sum', sorter: true }, { title: '访客总数', key: 'client_sum', dataIndex: 'client_sum', sorter: true }, { title: '中评次数', key: 'commMiddle', dataIndex: 'commMiddle', sorter: true }, { title: '浏览量', key: 'page_view', dataIndex: 'page_view', sorter: true }, { title: '有效评价率', key: 'evaluate_rate', dataIndex: 'evaluate_rate', sorter: true }, { title: '差评次数', key: 'poor_rating', dataIndex: 'poor_rating', sorter: true }, { title: '好评次数', key: 'praise', dataIndex: 'praise', sorter: true }, { title: '有效评价', key: 'valid_evaluate', dataIndex: 'valid_evaluate', sorter: true }, { title: '有效对话数', key: 'result', dataIndex: 'result', sorter: true }, { title: '有效的对话率', key: 'result_rate', dataIndex: 'result_rate', sorter: true }]
					}
					this.columns = listdata
					setTimeout(() => {
						console.log('9999999', that.columns)
					}, 5000)
                } else {
                    that.$message.error(res.error.message)
                }
            })
        },
		tubiaoys () {
			this.chart = new G2.Chart({
				container: 'mountNode',
				forceFit: true,
				height: 300,
				width: document.querySelector('.item-contentlist').offsetWidth,
				padding: [40, 45, 70, 45] // 上右下左
				})
				console.log('图标图标', this.chart, document.querySelector('#mountNode'), document.querySelector('.item-contentlist').offsetWidth)
				this.chart.source(data, {
					year: {
						type: 'linear',
						tickInterval: 50
					}
				})
				// this.chart.axis('year', {
				// 	label: {
				// 		textStyle: {
				// 		fill: '#aaaaaa'
				// 	}
				// 	},
				// 	grid: {
				// 		align: 'center',
				// 		type: 'line',
				// 		lineStyle: {
				// 			stroke: '#d9d9d9', // 网格线的颜色
				// 			lineDash: [ 2, 2 ] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
				// 		},
				// 		hideFirstLine: true,
				// 		hideLastLine: true
				// 	}
				// })
			this.chart.scale('year', {
				range: [0, 1]
			})
			// this.chart.axis('value', {
			// 	label: {
			// 		textStyle: {
			// 			fill: '#aaaaaa'
			// 		},
			// 		formatter: function formatter (text) {
			// 			return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
			// 		}
			// 	},
			// 	grid: {
			// 		align: 'center',
			// 		type: 'line',
			// 		lineStyle: {
			// 			stroke: '#d9d9d9', // 网格线的颜色
			// 			lineDash: [ 2, 2 ] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
			// 		},
			// 		hideFirstLine: true,
			// 		hideLastLine: true
			// 	}
			// })
			this.chart.tooltip({
				crosshairs: {
					type: 'line'
				}
			})
			this.chart.area().position('year*value').color('country')
			this.chart.area().position('year*value').color('country').size(2)
			this.chart.render()
			this.chartxg = false
		},
		handleChange (pagination, filters, sorter) {
			console.log('Various parameters', pagination, filters, sorter)
			if (sorter.order === 'ascend') {
				this.datashuju.sort((a, b) => { return a[sorter.field] - b[sorter.field] })
			} else if (sorter.order === 'descend') {
				this.datashuju.reverse()
			}
		},
		disabledDate (current) {
            // Can not select days before today and today
            return current && current > moment().endOf('day') || current < moment().subtract(3, 'months')
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
		this.startdate = year2 + '-' + mon2 + '-' + day2
        this.enddate = year2 + '-' + mon2 + '-' + day2
		this.getDataList()
		// this.tubiaoys()
	}
}
</script>

<style scoped lang="less">
.datagl {
  background-color: #fff;
  padding: 20px;
  .datagl-title {
    display: flex;
    justify-content: space-between;
    padding: 0 0 12px 0;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #eef0f6;
  }
  .datagl-item {
    margin-top: 20px;
    .item-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
    }
  }
}
.datagl2 {
  margin-top: 20px;
  .item-contentlist {
    display: flex;
    align-content: center;
    padding: 18px 0;
    line-height: 16px;
    .list-item {
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
      & > img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
      .item-text {
        font-size: 14px;
        padding: 8px 0 0 0;
      }
      &:hover .item-text {
        color: #1880ff;
      }
    }
  }
}
</style>
