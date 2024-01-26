<template>
    <div class="zhuanxiang__wrapper">
        <div class="zhuanxiang__water">
            <div class="zhuanxiang__water-title">水上专项</div>
            <div class="zhuanxiang__water-date">
              <!-- <el-form :inline="true" ref="zhuanxiangForm" :model="zhuanxiangForm" label-width="70px"> -->
              <el-form :inline="true" label-width="70px">
                  <el-form-item label="">
                    <el-date-picker
                      v-model="dateRange"
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
                <div class="zhuanxiang__water-wrapper-first">
                  <div class="zhuanxiang__water-wrapper-echarts" id="water_show1"></div>
                  <div class="zhuanxiang__water-wrapper-echarts" id="water_show2"></div>
                  <div class="zhuanxiang__water-wrapper-echarts" id="water_show3"></div>
                </div>
                <div class="zhuanxiang__water-wrapper-second">
                  <div class="zhuanxiang__water-wrapper-echarts" id="water_show4"></div>
                  <div class="zhuanxiang__water-wrapper-echarts" id="water_show5"></div>
                  <div class="zhuanxiang__water-wrapper-echarts" id="water_show6"></div>
                </div>
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
      dataWater: [], // 水上数据
      dataWaterShow: [],
      training_date: [],
      dateRange: [],
      pickerOptions: {
        disabledDate: this.disabledDate // 将 disabledDate 方法赋值给 pickerOptions
      },
      dataGround: [], // 陆上数据
      groundDateOptions: [],
      dataShow: [],
      groundDate: null
    }
  },
  mounted () {
    this.getPlayerId()
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
        }).then(res => {
          this.getZhuanxiangData()
        }).catch(err => {
          console.log('获取数据失败' + err)
        })
      } else {
        this.id = window.sessionStorage.getItem('id')
        this.getZhuanxiangData()
      }
    },
    handleSelectGroundDate (groundDate) {
      const tmp = this.dataGround.filter(item => {
        return formatDate(item['date']) === groundDate
      })
      this.dataShow = tmp[0]
      this.dataShow['date'] = formatDate(this.dataShow['date'])
      this.setFuHeChart1()
      this.setFuHeChart2()
    },
    groundReset () {
      this.groundDate = ''
      this.dataShow = this.dataGround[0]
      this.setFuHeChart1()
      this.setFuHeChart2()
    },
    disabledDate (date) {
      const startDate = this.dataWater[0]['training_date']
      const endDate = this.dataWater[this.dataWater.length - 1]['training_date']

      return formatDate(date) < startDate || formatDate(date) > endDate
    },
    handleDateRangeChange () {
      var startDate = formatDate(this.dateRange[0]) // 获取选择的起始日期
      var endDate = formatDate(this.dateRange[1]) // 获取选择的结束日期
      // 在这里根据选择的日期范围筛选数据
      var filteredData = this.dataWater.filter((item) => {
        var currentDate = item.training_date
        return currentDate >= startDate && currentDate <= endDate
      })
      this.dataWaterShow = [...filteredData]
      this.setWaterChart1()
      this.setWaterChart2()
      this.setWaterChart3()
      this.setWaterChart4()
      this.setWaterChart5()
      this.setWaterChart6()
      // 使用筛选后的数据进行进一步处理或更新相关变量
    },
    handleReset () {
      this.dateRange = []
      this.dataWaterShow = this.dataWater.slice(this.dataWater.length - 5, this.dataWater.length)
      this.setWaterChart1()
      this.setWaterChart2()
      this.setWaterChart3()
      this.setWaterChart4()
      this.setWaterChart5()
      this.setWaterChart6()
    },
    getZhuanxiangData () {
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
        this.dataGround = res[3].data
        const idList = []
        const trainingidList = []
        this.training_date = []
        AthleteData.forEach(item => {
          const id = item.id
          const trainingid = item.training_id
          idList.push(id)
          trainingidList.push(trainingid)
        })
        for (let i = 0; i < trainingidList.length; i++) {
          SummaryData.forEach(item => {
            if (item.id === trainingidList[i]) {
              this.training_date.push(formatDate(item.training_date))
            }
          })
        }
        for (let j = 0; j < idList.length; j++) {
          MetricsData.forEach(item => {
            if (item.athlete_training_id === idList[j]) {
              this.dataWater.push({
                training_date: this.training_date[j], // 添加 training_date
                stroke_rate: item.stroke_rate,
                max_force: item.max_force,
                rowing_power: item.rowing_power,
                work_per_stroke: item.work_per_stroke,
                legs_max_speed: item.legs_max_speed,
                average_boat_speed: item.average_boat_speed
              })
              j++
            }
          })
        }
        this.dataWater.sort((a, b) => { // 升序->调换ab降序
          return a.training_date.localeCompare(b.training_date)
        })
        this.dataWaterShow = this.dataWater.slice(this.dataWater.length - 5, this.dataWater.length)
        const temp = this.dataGround.map(item => {
          return {
            label: formatDate(item.date),
            value: formatDate(item.date)
          }
        })
        // 排序数据数组，以确保第一条数据是时间最新的
        this.dataGround.sort((a, b) => {
          return b.date.localeCompare(a.date)
        })
        this.dataShow = this.dataGround[0]
        this.dataShow['date'] = formatDate(this.dataShow['date'])
        this.groundDateOptions.push.apply(this.groundDateOptions, temp)// 使用push.apply()方法将temp数组的元素添加到trainDateOptions数组中
      }).then(res => {
        this.setWaterChart1()
        this.setFuHeChart2()
        this.setWaterChart3()
        this.setWaterChart4()
        this.setWaterChart5()
        this.setWaterChart6()
        this.setFuHeChart1()
        this.setWaterChart2()
      })
    },
    setWaterChart1 () {
      var chartDom = document.getElementById('water_show1')
      var myChart = echarts.init(chartDom)
      var option
      option = {
        color: ['#003D5B'],
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
          data: this.dataWaterShow.map(item => item.training_date),
          // name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20,
            textStyle: {
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: Math.floor(Math.max(...this.dataWaterShow.map(item => item.stroke_rate))) + 5,
          // name: '桨频（桨/min）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 10, 0]
          },
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        series: [
          {
            data: this.dataWaterShow.map(item => Math.floor(item.stroke_rate * 1000) / 1000),
            name: '桨频（桨/min）',
            type: 'bar',
            showBackground: true
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
        color: ['#003D5B'],
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
          data: this.dataWaterShow.map(item => item.training_date),
          // name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20,
            textStyle: {
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: Math.floor(Math.max(...this.dataWaterShow.map(item => item.max_force))) + 20,
          // name: '拉桨最大力量（N）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 15, 0]
          },
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        series: [
          {
            data: this.dataWaterShow.map(item => Math.floor(item.max_force * 1000) / 1000),
            name: '拉桨最大力量（N）',
            type: 'bar',
            showBackground: true
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
        color: ['#003D5B'],
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
          data: this.dataWaterShow.map(item => item.training_date),
          // name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20,
            textStyle: {
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          min: Math.floor(Math.min(...this.dataWaterShow.map(item => item.rowing_power))) - 10,
          max: Math.floor(Math.max(...this.dataWaterShow.map(item => item.rowing_power))) + 10,
          // name: '拉桨功率（W）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 15, 0]
          },
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        series: [
          {
            data: this.dataWaterShow.map(item => Math.floor(item.rowing_power * 1000) / 1000),
            name: '拉桨功率（W）',
            type: 'line',
            smooth: true,
            showBackground: true
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
        color: ['#003D5B'],
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
          data: this.dataWaterShow.map(item => item.training_date),
          // name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20,
            textStyle: {
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: Math.floor(Math.max(...this.dataWaterShow.map(item => item.work_per_stroke))) + 30,
          // name: '每桨做功（N）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 15, 0]
          },
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        series: [
          {
            data: this.dataWaterShow.map(item => Math.floor(item.work_per_stroke * 1000) / 1000),
            name: '每桨做功（N）',
            type: 'bar',
            showBackground: true
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
    setWaterChart5 () {
      var chartDom = document.getElementById('water_show5')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        color: ['#003D5B'],
        title: {
          text: '蹬腿最大速度',
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
          data: this.dataWaterShow.map(item => item.training_date),
          // name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20,
            textStyle: {
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: Math.floor(Math.max(...this.dataWaterShow.map(item => item.legs_max_speed))) + 1,
          // name: '蹬腿最大速度（m/s）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 15, 0]
          },
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        series: [
          {
            data: this.dataWaterShow.map(item => Math.floor(item.legs_max_speed * 1000) / 1000),
            name: '蹬腿最大速度 m/s',
            type: 'line',
            smooth: true,
            showBackground: true
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
    setWaterChart6 () {
      var chartDom = document.getElementById('water_show6')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        color: ['#003D5B'],
        title: {
          text: '船速',
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
          data: this.dataWaterShow.map(item => item.training_date),
          // name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20,
            textStyle: {
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          min: Math.floor(Math.min(...this.dataWaterShow.map(item => item.average_boat_speed))),
          max: Math.floor(Math.max(...this.dataWaterShow.map(item => item.average_boat_speed))) + 1,
          // name: '船速（m/s）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 15, 0]
          },
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        series: [
          {
            data: this.dataWaterShow.map(item => Math.floor(item.average_boat_speed * 1000) / 1000),
            name: '船速 m/s',
            type: 'line',
            smooth: true,
            showBackground: true
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
        color: ['#003D5B'],
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
            rotate: 20,
            textStyle: {
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          // name: '乳酸（mmol/L）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 20, 0]
          },
          axisLabel: {
            textStyle: {
              color: '#000'
            }
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
        color: ['#003D5B'],
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
          data: ['即刻心率', '1min心率', '3min心率'],
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          min: Math.min(this.dataShow['immediate_heart_rate'], this.dataShow['one_minute_heart_rate'], this.dataShow['three_minute_heart_rate']) - 5,
          max: Math.max(this.dataShow['immediate_heart_rate'], this.dataShow['one_minute_heart_rate'], this.dataShow['three_minute_heart_rate']) + 5,
          // name: '心率（bpm）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 20, 0]
          },
          axisLabel: {
            textStyle: {
              color: '#000'
            }
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
.invisible-date {
  display: none;
}
.el-form-item__label {
  font-size: 20px;
  font-weight: bold;
}
.zhuanxiang {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 10px 40px 10px;
    width: 100%;
  }
  &__water {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 30px;
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
        flex-direction: column;
        width: 100%;
        justify-content: center;
        &-first {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-evenly;
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
            height: 50vh;
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
            width: 700px;
            height: 500px;
        }
    }
  }
}
</style>
