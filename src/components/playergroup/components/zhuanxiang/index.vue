<template>
    <div class="zhuanxiang__wrapper">
        <div class="zhuanxiang__water">
            <div class="zhuanxiang__water-title">水上专项</div>
            <div class="zhuanxiang__water-date">
              <el-form :inline="true" ref="zhuanxiangForm" :model="zhuanxiangForm" label-width="70px">
                  <el-form-item label="">
                    <el-date-picker
                      v-model="zhuanxiangForm.dateRange"
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
                    <el-button type="info" size="small" @click="handleReset">重置</el-button>
                  </el-form-item>
              </el-form>
            </div>
            <div class="zhuanxiang__water-wrapper">
                <div class="zhuanxiang__water-wrapper-echarts" id="water_show1"></div>
                <div class="zhuanxiang__water-wrapper-echarts" id="water_show2"></div>
                <div class="zhuanxiang__water-wrapper-echarts" id="water_show3"></div>
                <div class="zhuanxiang__water-wrapper-echarts" id="water_show4"></div>
            </div>
        </div>
        <div class="zhuanxiang__fuhe">
            <div class="zhuanxiang__fuhe-title">专项训练负荷强度 (测试日期: {{this.dataShow['date']}})</div>
            <div class="zhuanxiang__fuhe-date">
              <el-form :inline="true" label-width="70px">
                <el-form-item label="">
                  <el-select
                    v-model="groundDate"
                    placeholder="示例: 2023-10-25"
                    size="small"
                    @change="handleSelectGroundDate"
                    filterable
                    :disabled="groundDateDisabled"
                  >
                    <el-option
                      v-for="item in groundDateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="info" size="small" @click="groundReset">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="zhuanxiang__fuhe-wrapper">
                <div class="zhuanxiang__fuhe-wrapper-echarts" id="fuhe_show1"></div>
                <div class="zhuanxiang__fuhe-wrapper-echarts" id="fuhe_show2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import myAxios from '@/utils/request'
import * as echarts from 'echarts'
import { formatDate } from '@/utils/formatDate'
export default {
  data () {
    return {
      training_dates: [],
      stroke_rates: [],
      max_forces: [],
      rowing_powers: [],
      work_per_strokes: [],
      legs_max_speeds: [],
      average_boat_speeds: [],
      dataGround: [],
      pickerOptions: null,
      zhuanxiangForm: {
        zhuanxiangSelectValues: [],
        dateRange: ''
      },
      groundDateOptions: [],
      dataShow: [],
      groundDate: null
    }
  },
  mounted () {
    this.getPlayerId()
    // this.setWaterChart1()
    // this.setWaterChart2()
    // this.setWaterChart3()
    // this.setWaterChart4()
    // this.setFuHeChart1()
    // this.setFuHeChart2()
  },
  methods: {
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
          // console.log(this.id)
          // this.getZhuanxiangData()
        }).then(res => {
          // console.log(this.id)
          this.getZhuanxiangData()
        }).catch(err => {
          console.log('获取数据失败111' + err)
        })
      } else {
        this.id = window.sessionStorage.getItem('id')
        this.getZhuanxiangData()
      }
    },
    handleSelectGroundDate (groundDate) {
      console.log(groundDate)
      const tmp = this.dataGround.filter(item => {
        return formatDate(item['date']) === groundDate
      })
      this.dataShow = tmp[0]
      this.dataShow['date'] = formatDate(this.dataShow['date'])
      this.setFuHeChart1()
      this.setFuHeChart2()
      // console.log('dsd', this.dataShow)
    },
    groundReset () {
      this.groundDate = ''
      this.dataShow = this.dataGround[0]
      this.setFuHeChart1()
      this.setFuHeChart2()
    },
    handleDateRangeChange () {
      var startDate = this.zhuanxiangForm.dateRange[0]
      var endDate = this.zhuanxiangForm.dateRange[1]

      var timeArray = this.zhuanxiangData.date

      var selectedTimes = timeArray.filter((time) => {
        var currentDate = new Date(time)
        return currentDate >= startDate && currentDate <= endDate
      })

      var sortedTimes = selectedTimes.sort((a, b) => new Date(a) - new Date(b))
      const copy = this.selectItemValues
      for (var key in this.selectItemValues) {
        this.selectItemValues[key] = sortedTimes.map((selectedTime) => {
          var index = timeArray.indexOf(selectedTime)
          return copy[key][index]
        })
      }
      const tmp = []
      for (var key1 in this.selectItemValues) {
        tmp.push({
          name: this.zhuanxiangOptions.filter(item => item.value === key1)[0].label,
          data: this.selectItemValues[key1],
          type: 'line',
          // stack: 'Total',
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
          showBackground: true
        })
      }
      this.series = tmp
      this.selectDate = sortedTimes.map(item => formatDate(item))
      if (this.switchValue) this.setzhuanxiangChart1()
      else this.setTable()
    },
    handleReset () {
      this.selectDate = this.zhuanxiangData.date.map(item => formatDate(item))
      this.zhuanxiangForm.dateRange = []
      this.zhuanxiangForm.zhuanxiangSelectValues = []
      this.series = []
      if (this.switchValue) this.setzhuanxiangChart1()
      else this.setTable()
    },
    getZhuanxiangData () {
      // myAxios.get('/zhuanxiang/getAthleteData', {
      //   params: {
      //     id: this.id
      //   }
      // }).then(res => {
      //   console.log(res.data)
      // }).catch(err => {
      //   console.log('获取数据失败55' + err)
      // })
      // console.log(this.id)
      const getAthleteData = myAxios.get('/zhuanxiang/getAthleteData', {
        params: {
          id: this.id
        }
      })
      const getSummaryData = myAxios.get('/zhuanxiang/getSummaryData', {
        params: {
          id: this.id
        }
      })
      const getMetricsData = myAxios.get('/zhuanxiang/getMetricsData', {
        params: {
          id: this.id
        }
      })
      const getGroundData = myAxios.get('/zhuanxiang/getGroundData', {
        params: {
          id: this.id
        }
      })
      Promise.all([getAthleteData, getSummaryData, getMetricsData, getGroundData]).then(res => {
        const AthleteData = res[0].data
        const SummaryData = res[1].data
        const MetricsData = res[2].data
        // const GroundData = res[3].data
        this.dataGround = res[3].data
        // console.log('jjj', this.dataGround)
        // console.log(GroundData)
        // console.log('sssss', GroundData)
        // console.log(AthleteData)
        // console.log(SummaryData)
        // console.log(MetricsData)
        // console.log('dd', GroundData)
        const idList = []
        const trainingidList = []
        AthleteData.forEach(item => {
          const id = item.id
          const trainingid = item.training_id
          idList.push(id)
          trainingidList.push(trainingid)
        })
        for (let i = 0; i < trainingidList.length; i++) {
          SummaryData.forEach(item => {
            // const date = formatDate(item.training_date)
            // this.training_dates.push(date)
            // // console.log(this.training_dates)
            if (item.id === trainingidList[i]) {
              this.training_dates.push(formatDate(item.training_date))
            }
          })
        }
        for (let j = 0; j < idList.length; j++) {
          MetricsData.forEach(item => {
            // const date = formatDate(item.training_date)
            // this.training_dates.push(date)
            // // console.log(this.training_dates)
            if (item.athlete_training_id === idList[j]) {
              this.stroke_rates.push(item.stroke_rate)
              this.max_forces.push(item.max_force)
              this.rowing_powers.push(item.rowing_power)
              this.work_per_strokes.push(item.work_per_stroke)
              this.legs_max_speeds.push(item.legs_max_speed)
              this.average_boat_speeds.push(item.average_boat_speed)
              j++
            }
          })
        }
        // console.log(GroundData[0])
        const temp = this.dataGround.map(item => {
          return {
            label: formatDate(item.date),
            value: formatDate(item.date)
          }
        })
        // console.log(temp)
        // 排序数据数组，以确保第一条数据是时间最新的
        this.dataGround.sort((a, b) => {
          return b.date.localeCompare(a.date)
        })
        this.dataShow = this.dataGround[0]
        console.log('xx', this.dataShow)
        this.dataShow['date'] = formatDate(this.dataShow['date'])
        // console.log(this.dataShow['three_minute_heart_rate'])
        // console.log(this.dataShow)
        this.groundDateOptions.push.apply(this.groundDateOptions, temp)// 使用push.apply()方法将temp数组的元素添加到trainDateOptions数组中
        // this.lactate.push(GroundData[0].immediate_lactate)
        // this.lactate.push(GroundData[0].one_minute_lactate)
        // this.lactate.push(GroundData[0].three_minute_lactate)
        // this.lactate.push(GroundData[0].five_minute_lactate)
        // this.lactate.push(GroundData[0].seven_minute_lactate)
        // this.lactate.push(GroundData[0].ten_minute_lactate)
        // // console.log('sssss', this.lactate)
        // this.heart_rate.push(GroundData[0].immediate_heart_rate)
        // this.heart_rate.push(GroundData[0].one_minute_heart_rate)
        // this.heart_rate.push(GroundData[0].three_minute_heart_rate)
        // console.log(this.training_dates)
        // console.log(this.stroke_rates)
      }).then(res => {
        this.setWaterChart1()
      }).then(res => {
        this.setFuHeChart2()
      }).then(res => {
        this.setWaterChart3()
      }).then(res => {
        this.setWaterChart4()
      }).then(res => {
        this.setFuHeChart1()
        this.setWaterChart2()
      })
    },
    setWaterChart1 () {
      var chartDom = document.getElementById('water_show1')
      var myChart = echarts.init(chartDom)
      var option
      option = {
        title: {
          text: '桨频',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
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
          data: this.training_dates,
          name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: Math.floor(Math.max(...this.stroke_rates)) + 5,
          name: '桨频（桨/min）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 10, 0]
          }
        },
        series: [
          {
            data: this.stroke_rates,
            name: '桨频（桨/min）',
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            }
          }
        ]
      }

      option && myChart.setOption(option)
      // 监听 magicType 切换事件
      myChart.on('magicTypeChanged', function (params) {
        // 判断切换后的类型是否为折线图
        if (params.currentType === 'line') {
          // 获取 x 轴配置
          var xAxisOption = myChart.getOption().xAxis[0]
          // 设置 boundaryGap 为 true
          xAxisOption.boundaryGap = true
          // 更新图表配置
          myChart.setOption({
            xAxis: [xAxisOption]
          })
        }
      })
    },
    setWaterChart2 () {
      var chartDom = document.getElementById('water_show2')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '拉桨最大力量',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
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
          data: this.training_dates,
          name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: Math.floor(Math.max(...this.max_forces)) + 20,
          name: '拉桨最大力量（N）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 15, 0]
          }
        },
        series: [
          {
            data: this.max_forces,
            name: '拉桨最大力量（N）',
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            }
          }
        ]
      }

      option && myChart.setOption(option)
      // 监听 magicType 切换事件
      myChart.on('magicTypeChanged', function (params) {
        // 判断切换后的类型是否为折线图
        if (params.currentType === 'line') {
          // 获取 x 轴配置
          var xAxisOption = myChart.getOption().xAxis[0]
          // 设置 boundaryGap 为 true
          xAxisOption.boundaryGap = true
          // 更新图表配置
          myChart.setOption({
            xAxis: [xAxisOption]
          })
        }
      })
    },
    setWaterChart3 () {
      var chartDom = document.getElementById('water_show3')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '拉桨功率',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
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
          data: this.training_dates,
          name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          min: Math.floor(Math.min(...this.rowing_powers)) - 10,
          max: Math.floor(Math.max(...this.rowing_powers)) + 10,
          name: '拉桨功率（W）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 15, 0]
          }
        },
        series: [
          {
            data: this.rowing_powers,
            name: '拉桨功率（W）',
            type: 'line',
            smooth: true,
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            }
          }
        ]
      }

      option && myChart.setOption(option)
      // 监听 magicType 切换事件
      myChart.on('magicTypeChanged', function (params) {
        // 判断切换后的类型是否为折线图
        if (params.currentType === 'line') {
          // 获取 x 轴配置
          var xAxisOption = myChart.getOption().xAxis[0]
          // 设置 boundaryGap 为 true
          xAxisOption.boundaryGap = true
          // 更新图表配置
          myChart.setOption({
            xAxis: [xAxisOption]
          })
        }
      })
    },
    setWaterChart4 () {
      var chartDom = document.getElementById('water_show4')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '每桨做功',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
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
          data: this.training_dates,
          name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: Math.floor(Math.max(...this.work_per_strokes)) + 30,
          name: '每桨做功（N）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 15, 0]
          }
        },
        series: [
          {
            data: this.work_per_strokes,
            name: '每桨做功（N）',
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            }
          }
        ]
      }

      option && myChart.setOption(option)
      // 监听 magicType 切换事件
      myChart.on('magicTypeChanged', function (params) {
        // 判断切换后的类型是否为折线图
        if (params.currentType === 'line') {
          // 获取 x 轴配置
          var xAxisOption = myChart.getOption().xAxis[0]
          // 设置 boundaryGap 为 true
          xAxisOption.boundaryGap = true
          // 更新图表配置
          myChart.setOption({
            xAxis: [xAxisOption]
          })
        }
      })
    },
    setFuHeChart1 () {
      var chartDom = document.getElementById('fuhe_show1')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '乳酸浓度',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          left: '5%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: ['即刻乳酸', '1min乳酸', '3min乳酸', '5min乳酸', '7min乳酸', '10min乳酸'],
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          name: '乳酸（mmol/L）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 20, 0]
          }
        },
        series: [
          {
            name: '乳酸浓度',
            type: 'line',
            data: [this.dataShow['immediate_lactate'], this.dataShow['one_minute_lactate'], this.dataShow['three_minute_lactate'], this.dataShow['five_minute_lactate'], this.dataShow['seven_minute_lactate'], this.dataShow['ten_minute_lactate']],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          }
        ]
      }

      option && myChart.setOption(option)
      // 监听 magicType 切换事件
      myChart.on('magicTypeChanged', function (params) {
        // 判断切换后的类型是否为折线图
        if (params.currentType === 'line') {
          // 获取 x 轴配置
          var xAxisOption = myChart.getOption().xAxis[0]
          // 设置 boundaryGap 为 true
          xAxisOption.boundaryGap = true
          // 更新图表配置
          myChart.setOption({
            xAxis: [xAxisOption]
          })
        }
      })
    },
    setFuHeChart2 () {
      var chartDom = document.getElementById('fuhe_show2')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '心率',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
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
          boundaryGap: true,
          data: ['即刻心率', '1min心率', '3min心率']
        },
        yAxis: {
          type: 'value',
          min: Math.min(this.dataShow['immediate_heart_rate'], this.dataShow['one_minute_heart_rate'], this.dataShow['three_minute_heart_rate']) - 5,
          max: Math.max(this.dataShow['immediate_heart_rate'], this.dataShow['one_minute_heart_rate'], this.dataShow['three_minute_heart_rate']) + 5,
          name: '心率（bpm）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 20, 0]
          }
        },
        series: [
          {
            name: '心率',
            type: 'line',
            data: [this.dataShow['immediate_heart_rate'], this.dataShow['one_minute_heart_rate'], this.dataShow['three_minute_heart_rate']],
            // data: [140, 190, 289],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          }
        ]
      }

      option && myChart.setOption(option)
      // 监听 magicType 切换事件
      myChart.on('magicTypeChanged', function (params) {
        // 判断切换后的类型是否为折线图
        if (params.currentType === 'line') {
          // 获取 x 轴配置
          var xAxisOption = myChart.getOption().xAxis[0]
          // 设置 boundaryGap 为 true
          xAxisOption.boundaryGap = true
          // 更新图表配置
          myChart.setOption({
            xAxis: [xAxisOption]
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.el-form-item__label {
  font-size: 20px;
  font-weight: bold;
}
.zhuanxiang {
&__wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 100%;
}
&__water {
  display: flex;
  flex-direction: column;
  width: 100%;
  &-title {
      font-size: 20px;
      font-weight: 700;
  }
  &-date {
    display: flex;
    margin-top: 10px;  // 调整上边距
  }
  &-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;
      &-echarts {
          width: 500px;
          height: 400px;
          margin-top: 15px;
      }
  }
}
&__fuhe {
  display: flex;
  flex-direction: column;
  width: 100%;
  &-title {
      font-size: 20px;
      font-weight: 700;
      margin-top: 20px;
  }
  &-date {
    display: flex;
    margin-top: 10px;  // 调整上边距
  }
  &-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;
      &-echarts {
          margin-top: 20px;
          width: 600px;
          height: 500px;
      }
  }
}
}
</style>
