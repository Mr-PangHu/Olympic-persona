<template>
    <div class="tineng__wrapper">
        <div class="tineng__wsy">
            <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px">
              <!-- <div class="tineng__wsy-title">体能</div> -->
              <!-- <el-switch
                v-model="switchValue"
                active-text="ECharts图"
                inactive-text="表格"
                @change="handleSwitchChange"
              >
              </el-switch> -->
            </div>
            <div>
              <el-form :inline="true" ref="tinengForm" :model="tinengForm" label-width="70px">
                  <!-- <el-form-item label="体能指标">
                      <el-select
                          v-model="tinengForm.tinengSelectValues"
                          placeholder="请选择体能指标"
                          multiple
                          clearable
                          collapse-tags
                          filterable
                          @change="handleTinengSelectChange"
                          style="width: 290px"
                      >
                        <el-option
                          v-for="item in tinengOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item> -->
                  <el-form-item label="测试时间">
                    <el-date-picker
                      v-model="tinengForm.dateRange"
                      type="daterange"
                      :picker-options="pickerOptions"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="handleDateRangeChange"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="handleReset">重置</el-button>
                  </el-form-item>
              </el-form>
            </div>
            <div class="tineng__wsy-wrapper">
              <div class="tineng__wsy-wrapper-first">
                <div class="tineng__wsy-wrapper-echarts" id="tineng_show1"></div>
                <div class="tineng__wsy-wrapper-echarts" id="tineng_show2"></div>
                <div class="tineng__wsy-wrapper-echarts" id="tineng_show3"></div>
              </div>
              <div class="tineng__wsy-wrapper-second">
                <div class="tineng__wsy-wrapper-echarts" id="tineng_show4"></div>
                <div class="tineng__wsy-wrapper-echarts" id="tineng_show5"></div>
                <div class="tineng__wsy-wrapper-echarts" id="tineng_show6"></div>
              </div>
            </div>
            <div class="tineng__wsy-table">
              <el-table
                :data="tableData"
                style="width: 100%"
                :header-cell-style="{'text-align': 'center'}"
                border
              >
                <el-table-column prop="test_date" label="测试日期" align="center" width="160"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center" width="160"></el-table-column>
                <el-table-column prop="sprint_run_30m" label="30m冲刺跑/s" align="center" width="160"></el-table-column>
                <el-table-column prop="cgy30min20str_tresult" label="测功仪30分钟20桨频/s" align="center" width="200"></el-table-column>
                <el-table-column prop="cgy2000m_result" label="测功仪2000m/s" align="center" width="180"></el-table-column>
                <el-table-column prop="pull_up" label="引体向上/个" align="center" width="180"></el-table-column>
                <el-table-column prop="standing_jump_both_legs" label="立定跳远/cm" align="center" width="170"></el-table-column>
                <el-table-column prop="deep_squat_1rm" label="深蹲/kg" align="center" width="170"></el-table-column>
                <el-table-column prop="bench_press_1rm" label="卧推/kg" align="center" width="180"></el-table-column>
              </el-table>
              <!-- <el-table
                :data="tableData"
                border
                style="width: 100%"
                :cell-style="setCellStyle"
              >
                <el-table-column prop="date" label="日期" align="center"></el-table-column>
                <el-table-column
                  v-for="item in tinengForm.tinengSelectValues"
                  :prop="item"
                  :label="formatLabel(item)"
                  :key="item"
                  align="center"
                >
                </el-table-column>
              </el-table> -->
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import myAxios from '@/utils/request'
import { formatDate } from '@/utils/formatDate'
import { formatSeconds, formatMMToSeconds, formatMS } from '@/utils/formatTime'
import { secondToMinute } from '@/utils/secondToMinute'
export default {
  data () {
    return {
      id: 0,
      // switchValue: true,
      tableData: [],
      pickerOptions: null,
      selectDate: [],
      selectItemValues: {},
      tinengData: {},
      tinengDataShow: {},
      // series: [],
      tinengForm: {
        // tinengSelectValues: [],
        dateRange: ''
      }
      // tinengOptions: [{
      //   value: 'sprint_run_30m',
      //   label: '基础体能-30m冲刺跑'
      // }, {
      //   value: 'bench_press_1rm',
      //   label: '基础体能-卧推1RM'
      // }, {
      //   value: 'deep_squat_1rm',
      //   label: '基础体能-深蹲1RM'
      // }, {
      //   value: 'standing_jump_both_legs',
      //   label: '基础体能-立定跳远(双腿)'
      // }, {
      //   value: 'pull_up',
      //   label: '基础体能-引体向上'
      // }, {
      //   value: 'dynamometer_2000m',
      //   label: '专项体能-测功仪2000m'
      // }, {
      //   value: 'dynamometer_30min',
      //   label: '专项体能-测功仪30min-20SR'
      // }]
    }
  },
  mounted () {
    this.getPlayerId()
  },

  methods: {
    setTable () {
      this.tableData = []
      for (var i = 0; i < this.tinengDataShow.test_date.length; i++) {
        var dictionary = {}
        dictionary['test_date'] = this.tinengDataShow.test_date[i]
        dictionary['name'] = this.tinengDataShow.name[i]
        dictionary['sprint_run_30m'] = this.tinengDataShow.sprint_run_30m[i]
        dictionary['cgy30min20str_tresult'] = this.tinengDataShow.cgy30min20str_tresult[i]
        dictionary['cgy2000m_result'] = this.tinengDataShow.cgy2000m_result[i]
        dictionary['pull_up'] = this.tinengDataShow.pull_up[i]
        dictionary['standing_jump_both_legs'] = this.tinengDataShow.standing_jump_both_legs[i]
        dictionary['deep_squat_1rm'] = this.tinengDataShow.deep_squat_1rm[i]
        dictionary['bench_press_1rm'] = this.tinengDataShow.bench_press_1rm[i]
        this.tableData.push(dictionary)
      }
    },
    handleReset () {
      this.selectDate = this.tinengData.test_date.map(item => formatDate(item))
      this.tinengForm.dateRange = []
      this.tinengForm.tinengSelectValues = []
      const dateLength = this.tinengData.test_date.length
      if (dateLength > 6) {
        for (var key in this.tinengData) {
          this.tinengDataShow[key] = this.tinengData[key].slice(dateLength - 6, dateLength)
        }
      } else {
        for (var key1 in this.tinengData) {
          this.tinengDataShow[key1] = this.tinengData[key1]
        }
      }
      this.setTiNengChart1()
      this.setTiNengChart2()
      this.setTiNengChart3()
      this.setTiNengChart4()
      this.setTiNengChart5()
      this.setTiNengChart6()
      this.setTable()
    },
    handleDateRangeChange () {
      var startDate = this.tinengForm.dateRange[0]
      var endDate = this.tinengForm.dateRange[1]
      // console.log(startDate, endDate)
      // this.tinengDataShow.filter((item) => {
      //   var currentDate = item.date
      //   return currentDate >= startDate && currentDate <= endDate
      // })
      // console.log(this.tinengDataShow)
      // this.setTiNengChart1()
      // this.setTiNengChart2()
      // this.setTiNengChart3()
      // this.setTiNengChart4()
      // this.setTiNengChart5()
      // this.setTiNengChart6()
      // this.setTable()
      var timeArray = this.tinengData.test_date
      var selectedTimes = timeArray.filter((time) => {
        var currentDate = new Date(time)
        return currentDate >= startDate && currentDate <= endDate
      })
      var sortedTimes = selectedTimes.sort((a, b) => new Date(a) - new Date(b))
      console.log('s', sortedTimes)
      console.log('t', this.tinengData.test_date)
      var indexes = []
      sortedTimes.forEach(item => {
        // console.log(item)
        if (this.tinengData.test_date.includes(item)) {
          indexes.push(this.tinengData.test_date.indexOf(item))
        }
      })
      // console.log(indexes)
      var tmpDataShow = {}
      for (var key in this.tinengData) {
        tmpDataShow[key] = []
        indexes.forEach(item => {
          tmpDataShow[key].push(this.tinengData[key][item])
        })
        // for (var item in indexes) {
        //   console.log(item)
        //   console.log(this.tinengData[key][item])
        //   tmpDataShow[key].push(this.tinengData[key][item])
        //   // console.log(this.tinengData[key] instanceof Array)
        //   // console.log(index)
        // }
      }
      this.tinengDataShow = tmpDataShow
      // console.log(this.tinengDataShow)
      this.setTiNengChart1()
      this.setTiNengChart2()
      this.setTiNengChart3()
      this.setTiNengChart4()
      this.setTiNengChart5()
      this.setTiNengChart6()
      this.setTable()
      // console.log(sortedTimes)
      // const copy = this.selectItemValues
      // for (var key in this.selectItemValues) {
      //   this.selectItemValues[key] = sortedTimes.map((selectedTime) => {
      //     var index = timeArray.indexOf(selectedTime)
      //     return copy[key][index]
      //   })
      // }
      // const tmp = []
      // for (var key1 in this.selectItemValues) {
      //   tmp.push({
      //     name: this.tinengOptions.filter(item => item.value === key1)[0].label,
      //     data: this.selectItemValues[key1],
      //     type: 'line',
      //     // stack: 'Total',
      //     markPoint: {
      //       data: [
      //         { type: 'max', name: 'Max' },
      //         { type: 'min', name: 'Min' }
      //       ]
      //     },
      //     showBackground: true
      //   })
      // }
      // this.series = tmp
      // this.selectDate = sortedTimes.map(item => formatDate(item))
      // if (this.switchValue) this.setTiNengChart1()
      // else this.setTable()
    },
    getPlayerId () {
      const auth = window.sessionStorage.getItem('auth')
      if (auth === '2') {
        const id = this.$route.params.id
        myAxios.get('/list/getAthleteId', {
          params: {
            id
          }
        }).then(res => {
          const athleteId = res.data[0].athlete_id
          this.id = athleteId
        }).then(res => {
          this.getTinengData()
        }).catch(err => {
          console.log('获取数据失败' + err)
        })
      } else {
        this.id = window.sessionStorage.getItem('id')
        this.getTinengData()
      }
    },
    getTinengData () {
      const getBasicTinengData = myAxios.get('/tineng/getBasicTinengData', {
        params: {
          id: this.id
        }
      })
      const getProTinengData = myAxios.get('/tineng/getProTinengData', {
        params: {
          id: this.id
        }
      })
      Promise.all([getBasicTinengData, getProTinengData]).then(res => {
        const basicData = res[0].data
        const proData = res[1].data.map(item => (
          {
            cgy2000m_result: item.cgy2000m_result,
            cgy30min20str_tresult: item.cgy30min20str_tresult
          }
        ))
        let tmp = {}
        for (var key1 in basicData[0]) {
          tmp[key1] = []
        }
        for (var key2 in proData[0]) {
          tmp[key2] = []
        }
        basicData.forEach(item => {
          for (var key in item) {
            var d = item[key]
            if (key === 'sprint_run_30m') {
              d = formatSeconds(d)
            }
            tmp[key].push(d)
          }
        })
        console.log('tmp1:', tmp)
        proData.forEach(item => {
          for (var key in item) {
            console.log(key)
            var d = item[key]
            if (key === 'cgy2000m_result') {
              d = formatMS(d)
              console.log(d)
            }
            if (key === 'cgy30min20str_tresult') {
              d = formatMMToSeconds(d)
              console.log(d)
            }
            tmp[key].push(d)
          }
        })
        this.tinengData = tmp
        console.log(this.tinengData)
        const dateLength = this.tinengData.test_date.length
        console.log(dateLength)
        if (dateLength > 6) {
          for (var key in this.tinengData) {
            this.tinengDataShow[key] = this.tinengData[key].slice(dateLength - 6, dateLength)
          }
        } else {
          for (var item in this.tinengData) {
            this.tinengDataShow[item] = this.tinengData[item]
          }
        }
        // this.tinengDataShow = this.tinengData
        // console.log(this.tinengData)
        // console.log(this.tinengDataShow)
        this.selectDate = this.tinengData.test_date.map(item => formatDate(item))
        console.log('a', this.selectDate)
        this.setTiNengChart1()
        this.setTiNengChart2()
        this.setTiNengChart3()
        this.setTiNengChart4()
        this.setTiNengChart5()
        this.setTiNengChart6()
        this.setTable()
        const timeArray = this.tinengData.test_date
        console.log('b', timeArray)
        const minDate = new Date(Math.min(...timeArray.map(time => new Date(time))) - 8 * 60 * 60 * 1000)
        const maxDate = new Date(Math.max(...timeArray.map(time => new Date(time))) + 16 * 60 * 60 * 1000)
        // console.log(minDate, maxDate)
        this.pickerOptions = {
          disabledDate: time => {
            const currentDate = new Date(time)
            console.log(currentDate)
            return currentDate < minDate || currentDate > maxDate
          }
        }
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    setTiNengChart1 () {
      var chartDom = document.getElementById('tineng_show1')
      var myChart = echarts.init(chartDom)
      var option
      const l = this.tinengDataShow.test_date.length
      const rotate = l > 6 ? 0 : 20
      const interval = l > 6 ? 3 : 0
      option = {
        color: ['#003D5B', '#EDAE49'],
        title: {
          text: '力量',
          left: 'center',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var result = params[0].name + '<br>'
            params.forEach(function (item) {
              let v = Number(item.value)
              if (item.seriesName === '基础体能-30m冲刺跑') v = v + 's'
              if (item.seriesName === '基础体能-卧推1RM' || item.seriesName === '基础体能-深蹲1RM') v = v + 'kg'
              if (item.seriesName === '基础体能-引体向上') v = v + '个'
              if (item.seriesName === '基础体能-立定跳远(双腿)') v = v + 'cm'
              if (item.seriesName === '专项体能-测功仪2000m' || item.seriesName === '专项体能-测功仪30min-20SR') v = secondToMinute(v)
              result += '<div style="display:flex;flex-direction:row;justify-content:space-between"><span><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' + item.color + '"></span>' + item.seriesName + '&nbsp;&nbsp;</span>' + '<span style="font-weight:700">' + v + '</span></div>'
            })
            return result
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.tinengDataShow.test_date,
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            show: true,
            interval: interval,
            rotate: rotate,
            textStyle: {
              margin: 15,
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        series: [{
          name: '基础体能-卧推1RM',
          type: 'line',
          data: this.tinengDataShow.bench_press_1rm
        },
        {
          name: '基础体能-深蹲1RM',
          type: 'line',
          data: this.tinengDataShow.deep_squat_1rm
        }]
      }

      option && myChart.setOption(option)
    },
    setTiNengChart2 () {
      var chartDom = document.getElementById('tineng_show2')
      var myChart = echarts.init(chartDom)
      var option
      const l = this.tinengDataShow.test_date.length
      const rotate = l > 6 ? 0 : 20
      const interval = l > 6 ? 3 : 0
      option = {
        color: ['#003D5B'],
        title: {
          text: '30m冲刺跑',
          left: 'center',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var result = params[0].name + '<br>'

            params.forEach(function (item) {
              let v = Number(item.value)
              if (item.seriesName === '基础体能-30m冲刺跑') v = v + 's'
              if (item.seriesName === '基础体能-卧推1RM' || item.seriesName === '基础体能-深蹲1RM') v = v + 'kg'
              if (item.seriesName === '基础体能-引体向上') v = v + '个'
              if (item.seriesName === '基础体能-立定跳远(双腿)') v = v + 'cm'
              if (item.seriesName === '专项体能-测功仪2000m' || item.seriesName === '专项体能-测功仪30min-20SR') v = secondToMinute(v)
              result += '<div style="display:flex;flex-direction:row;justify-content:space-between"><span><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' + item.color + '"></span>' + item.seriesName + '&nbsp;&nbsp;</span>' + '<span style="font-weight:700">' + v + '</span></div>'
            })

            return result
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.tinengDataShow.test_date,
          // name: '日期',
          // nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            show: true,
            interval: interval,
            rotate: rotate,
            textStyle: {
              margin: 15,
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          min: Math.floor(Math.min(...this.tinengDataShow.sprint_run_30m) - 0.2),
          max: Math.floor(Math.max(...this.tinengDataShow.sprint_run_30m) + 1),
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        series: [{
          name: '基础体能-30m冲刺跑',
          type: 'line',
          data: this.tinengDataShow.sprint_run_30m
        }]
      }

      option && myChart.setOption(option)
    },
    setTiNengChart3 () {
      var chartDom = document.getElementById('tineng_show3')
      var myChart = echarts.init(chartDom)
      var option
      const l = this.tinengDataShow.test_date.length
      const rotate = l > 6 ? 0 : 20
      const interval = l > 6 ? 3 : 0
      option = {
        color: ['#003D5B'],
        title: {
          text: '引体向上',
          left: 'center',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var result = params[0].name + '<br>'

            params.forEach(function (item) {
              let v = Number(item.value)
              if (item.seriesName === '基础体能-30m冲刺跑') v = v + 's'
              if (item.seriesName === '基础体能-卧推1RM' || item.seriesName === '基础体能-深蹲1RM') v = v + 'kg'
              if (item.seriesName === '基础体能-引体向上') v = v + '个'
              if (item.seriesName === '基础体能-立定跳远(双腿)') v = v + 'cm'
              if (item.seriesName === '专项体能-测功仪2000m' || item.seriesName === '专项体能-测功仪30min-20SR') v = secondToMinute(v)
              result += '<div style="display:flex;flex-direction:row;justify-content:space-between"><span><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' + item.color + '"></span>' + item.seriesName + '&nbsp;&nbsp;</span>' + '<span style="font-weight:700">' + v + '</span></div>'
            })

            return result
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.tinengDataShow.test_date,
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            show: true,
            interval: interval,
            rotate: rotate,
            textStyle: {
              margin: 15,
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        series: [{
          name: '基础体能-引体向上',
          type: 'line',
          data: this.tinengDataShow.pull_up,
          markLine: {
            symbol: ['none', 'none'],
            itemStyle: {
              normal: {
                lineStyle: {
                  type: 'solid',
                  color: '#D1495B'
                },
                label: {
                  show: true,
                  position: 'middle'
                }
              }
            },
            data: [{
              yAxis: '5'
            }]
          }
        }]
      }

      option && myChart.setOption(option)
    },
    setTiNengChart4 () {
      var chartDom = document.getElementById('tineng_show4')
      var myChart = echarts.init(chartDom)
      var option
      const l = this.tinengDataShow.test_date.length
      const rotate = l > 6 ? 0 : 20
      const interval = l > 6 ? 3 : 0

      option = {
        color: ['#003D5B'],
        title: {
          text: '立定跳远',
          left: 'center',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var result = params[0].name + '<br>'

            params.forEach(function (item) {
              let v = Number(item.value)
              if (item.seriesName === '基础体能-30m冲刺跑') v = v + 's'
              if (item.seriesName === '基础体能-卧推1RM' || item.seriesName === '基础体能-深蹲1RM') v = v + 'kg'
              if (item.seriesName === '基础体能-引体向上') v = v + '个'
              if (item.seriesName === '基础体能-立定跳远(双腿)') v = v + 'cm'
              if (item.seriesName === '专项体能-测功仪2000m' || item.seriesName === '专项体能-测功仪30min-20SR') v = secondToMinute(v)
              result += '<div style="display:flex;flex-direction:row;justify-content:space-between"><span><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' + item.color + '"></span>' + item.seriesName + '&nbsp;&nbsp;</span>' + '<span style="font-weight:700">' + v + '</span></div>'
            })

            return result
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.tinengDataShow.test_date,
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            show: true,
            interval: interval,
            rotate: rotate,
            textStyle: {
              margin: 15,
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          min: Math.floor(Math.min(...this.tinengDataShow.standing_jump_both_legs) - 10),
          max: Math.floor(Math.max(...this.tinengDataShow.standing_jump_both_legs) + 10),
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        series: [{
          name: '基础体能-立定跳远(双腿)',
          type: 'line',
          data: this.tinengDataShow.standing_jump_both_legs
        }]
      }

      option && myChart.setOption(option)
    },
    setTiNengChart5 () {
      var chartDom = document.getElementById('tineng_show5')
      var myChart = echarts.init(chartDom)
      var option
      const l = this.tinengDataShow.test_date.length
      const rotate = l > 6 ? 0 : 20
      const interval = l > 6 ? 3 : 0

      option = {
        color: ['#003D5B'],
        title: {
          text: '测功仪30分钟20桨频',
          left: 'center',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var result = params[0].name + '<br>'

            params.forEach(function (item) {
              let v = Number(item.value)
              if (item.seriesName === '基础体能-30m冲刺跑') v = v + 's'
              if (item.seriesName === '基础体能-卧推1RM' || item.seriesName === '基础体能-深蹲1RM') v = v + 'kg'
              if (item.seriesName === '基础体能-引体向上') v = v + '个'
              if (item.seriesName === '基础体能-立定跳远(双腿)') v = v + 'cm'
              if (item.seriesName === '专项体能-测功仪2000m' || item.seriesName === '专项体能-测功仪30min-20SR') v = secondToMinute(v)
              result += '<div style="display:flex;flex-direction:row;justify-content:space-between"><span><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' + item.color + '"></span>' + item.seriesName + '&nbsp;&nbsp;</span>' + '<span style="font-weight:700">' + v + '</span></div>'
            })

            return result
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.tinengDataShow.test_date,
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            show: true,
            interval: interval,
            rotate: rotate,
            textStyle: {
              margin: 15,
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          min: Math.floor(Math.min(...this.tinengDataShow.cgy30min20str_tresult) - 10),
          max: Math.floor(Math.max(...this.tinengDataShow.cgy30min20str_tresult) + 10),
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        series: [{
          name: '专项体能-测功仪30min-20SR',
          type: 'line',
          data: this.tinengDataShow.cgy30min20str_tresult
        }]
      }

      option && myChart.setOption(option)
    },
    setTiNengChart6 () {
      var chartDom = document.getElementById('tineng_show6')
      var myChart = echarts.init(chartDom)
      var option
      const l = this.tinengDataShow.test_date.length
      const rotate = l > 6 ? 0 : 20
      const interval = l > 6 ? 3 : 0

      option = {
        color: ['#003D5B'],
        title: {
          text: '测功仪2000m',
          left: 'center',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var result = params[0].name + '<br>'

            params.forEach(function (item) {
              let v = Number(item.value)
              if (item.seriesName === '基础体能-30m冲刺跑') v = v + 's'
              if (item.seriesName === '基础体能-卧推1RM' || item.seriesName === '基础体能-深蹲1RM') v = v + 'kg'
              if (item.seriesName === '基础体能-引体向上') v = v + '个'
              if (item.seriesName === '基础体能-立定跳远(双腿)') v = v + 'cm'
              if (item.seriesName === '专项体能-测功仪2000m' || item.seriesName === '专项体能-测功仪30min-20SR') v = secondToMinute(v)
              result += '<div style="display:flex;flex-direction:row;justify-content:space-between"><span><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' + item.color + '"></span>' + item.seriesName + '&nbsp;&nbsp;</span>' + '<span style="font-weight:700">' + v + '</span></div>'
            })

            return result
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.tinengDataShow.test_date,
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            show: true,
            interval: interval,
            rotate: rotate,
            textStyle: {
              margin: 15,
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          min: Math.floor(Math.min(...this.tinengDataShow.cgy2000m_result) - 10),
          max: Math.floor(Math.max(...this.tinengDataShow.cgy2000m_result) + 10),
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        series: [{
          name: '专项体能-测功仪2000m',
          type: 'line',
          data: this.tinengDataShow.cgy2000m_result
        }]
      }

      option && myChart.setOption(option)
    }
  }
}
</script>

<style lang='less' scoped>
.tineng {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px 10px 70px 10px;
    width: 100%;
  }
  &__wsy {
    display: flex;
    flex-direction: column;
    width: 100%;
    &-title {
        font-size: 20px;
        font-weight: 700;
        margin-right: 50px;
    }
    &-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        margin-bottom: 50px;
        &-first {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-evenly;
          margin-bottom: 30px;
        }
        &-second {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-evenly;
        }
        &-echarts {
          flex: 1;
          width: 30vw;
          height: 40vh;
          margin-top: 10px;
        }
    }
    &-table {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  }
}

/deep/ .el-table {
  color: black;
}

/deep/ .el-table__header th {
  //
  color: black;
  font-size: 14px;
}
</style>
