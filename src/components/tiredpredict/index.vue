<template>
  <div class="tired__wrapper">
    <div class="tired__topper">
      <div class="tired__topper-img"></div>
      <div class="tired__topper-overlay"></div>
      <div class="tired__topper-title">
        <h1>疲劳预测</h1>
      </div>
    </div>
    <el-card class="box-card">
      <div class="tiredpredict__wrapper">
        <div class="tiredpredict__model">
          <div class="tiredpredict__model">
            <div class="msg">
              {{ messages }}
            </div>
          </div>
          <div style="text-align: right; margin-bottom: 1%;">
            今天日期
            <el-date-picker v-model="todaydate" type="date" disabled clearable="false" placeholder="今天日期">
            </el-date-picker>

            <!-- <el-select v-model="selectEvent" clearable collapse-tags filterable placeholder="请选择项目"
              class="worldhighlevel__model-filter-selector" @change="handleSelectEventChange">
              <el-option v-for="item in eventOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
          </div>
          <div class="tiredpredict__model-wrapper">
            <div class="chart-data">
              <div class="chart-item" v-for="item in echartsDataList" :key="item.id" :id="item.title">

              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'
export default {
  data () {
    return {
      todaydate: new Date(),
      tableData: [],
      allData: null,
      pageSize: 5,
      currentPage: 1,
      selectYear: '',
      yearOptions: [],
      selectComp: '',
      compOptions: [],
      selectEvent: '',
      eventOptions: [],
      selectEventName: '',
      country: [],
      cNumber: 0,
      d500m: [],
      d1000m: [],
      d1500m: [],
      d2000m: [],
      series: [],
      defaultValue: null,
      fenduanForm: {
        d500mValue: '',
        d1000mValue: '',
        d1500mValue: '',
        d2000mValue: ''
      },
      echartsDataList: [],
      messages: ''
    }
  },
  created () {
    this.defaultValue = new Date()
    this.defaultValue.setHours(0)
    this.defaultValue.setMinutes(1)
    this.defaultValue.setSeconds(0)
    const data = this.$route.params
    this.allData = data.info
  },
  async mounted () {
    this.getYear()
    await this.getEchartsData()
    this.$nextTick(() => {
      this.echartsDataList.forEach(item => {
        this.initEcharts(item)
      })
    })
  },
  methods: {
    initEcharts (item) {
      const data1 = item.echarts.data1
      const data2 = item.echarts.data2
      const chartDom = document.getElementById(item.title)
      const myChart = echarts.init(chartDom)
      const option = {
        title: {
          text: item.title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {},
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
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: item.times
        },
        yAxis: {
          type: 'value',
          min: (Math.min.apply(null, [Math.min.apply(null, data1), Math.min.apply(null, data2)]) * 0.95).toFixed(2),
          max: (Math.max.apply(null, [Math.max.apply(null, data1), Math.max.apply(null, data2)]) * 1.05).toFixed(2),
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '现在',
            type: 'line',
            data: data1,
            tiredLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: '历史',
            type: 'line',
            data: data2,
            tiredLine: {
              data: [
                { type: 'average', name: 'Avg' }
              ]
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    handleSelectYearChange () {
      this.getCompByYear()
    },
    handleSelectEventChange (id) {
      const event = this.eventOptions.filter(item => item.value === id)[0].label
      this.selectEventName = event
      this.getResultsByEvent(id, event)
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    getYear () {
      axios.get('http://localhost/cm/getYear').then(res => {
        const yearArr = res.data
        this.yearOptions = yearArr.map(item => (
          {
            value: item,
            label: item
          }
        ))
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    getEchartsData () {
    /*
      var titles = ['dynamometer_2000m', 'dynamometer_30min', 'vo2max', 'vo2max_rel', 'p4', 'dynamometer_5000m',
        'dynamometer_6000m', 'bench_pull_1rm', 'dead_lift_1rm', 'bench_press_1rm', 'deep_squat_1rm', 'ck', 'hb',
        't', 'bnu', 'wbc', 'hct', 'c', 'rbc', 'fe']
    */
      var titles = ['测功仪2KM', '测功仪30min-SR', '最大摄氧量', '相对最大摄氧量', 'P4功率', '测功仪5KM',
        '测功仪6KM', '握拉1RM', '硬拉1RM', '卧推1RM', '深蹲1RM', '肌酸激酶', '血红蛋白',
        '睾酮', '血尿素', '白细胞', '血细胞比容', '皮质醇', '红细胞', '铁蛋白']
      var count = 0
      for (const item of this.allData.data.input) {
        var temp = {
          id: count + 1,
          name: titles[count],
          title: titles[count],
          echarts: {
            data1: item,
            data2: this.allData.data.simData[count]
          },
          times: this.allData.data.times
        }
        count++
        this.echartsDataList.push(temp)
      }
      this.messages = this.allData.data.message
    }
    // async getEchartsData () {
    //   await axios.get('http://localhost/fatigue_predict/getSimilarityData').then(res => {
    //     // console.log(res)
    //     var titles = ['dynamometer_2000m', 'dynamometer_30min', 'vo2max', 'vo2max_rel', 'p4', 'dynamometer_5000m',
    //       'dynamometer_6000m', 'bench_pull_1rm', 'dead_lift_1rm', 'bench_press_1rm', 'deep_squat_1rm', 'ck', 'hb',
    //       't', 'bnu', 'wbc', 'hct', 'c', 'rbc', 'fe']
    //     var count = 0
    //     for (const item of res.data.data1[0]) {
    //       var temp = {
    //         id: count + 1,
    //         name: titles[count],
    //         title: titles[count],
    //         echarts: {
    //           data1: item,
    //           data2: res.data.data2[0][count]
    //         },
    //         times: res.data.times
    //       }
    //       count++
    //       this.echartsDataList.push(temp)
    //     }
    //     console.log(res)
    //     this.messages = res.data.msg
    //     console.log(this.messages)
    //   }).catch(err => {
    //     console.log('获取数据失败' + err)
    //   })
    // }
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin: 0 auto;
  width: 95%;
}

.tired {
  &__wrapper {
    width: 100%;
  }

  &__topper {
    height: 80px;
    width: 100%;
    position: fixed;
    z-index: 2;

    &-img {
      height: 100%;
      background-image: url('../../assets/images/777.jpg');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    &-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent linear-gradient(180deg, rgba(0, 57, 124, .1), rgba(0, 44, 94, .3) 22%, rgba(0, 37, 79, .5) 50%, #001d3e) 0 0 no-repeat padding-box;
    }

    &-title {
      width: 100%;
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      h1 {
        width: 80%;
        margin: 0 auto;
        // font-family: "Effra",Arial,sans-serif;
        // font-style: italic;
        font-size: 40px;
        color: white;
        line-height: 75px;
      }
    }
  }
}

.tiredpredict {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    // padding: 2%;
  }

  &__model {
    display: flex;
    flex-direction: column;
    width: 100%;

    &-title {
      font-size: 20px;
      font-weight: 700;
    }

    &-filter {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    &-wrapper {
      .chart-data {
        // border: 1px solid red;
        display: flex;
        // flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        .chart-item {
          width: 33%;
          height: 400px;
          // border: 1px solid red;
        }
      }    }
    .msg{
        align-content: center;
        display: block;
        font-size: x-large;
        color: red;
        text-align: center;
        margin-top: 100px;
        margin-bottom: 30px;
      }
  }
}
</style>
