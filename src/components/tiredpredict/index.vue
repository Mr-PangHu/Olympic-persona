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
          <div style="text-align: right; margin-bottom: 1%;">
            今天日期
            <el-date-picker v-model="todaydate" type="date" disabled clearable="false" placeholder="今天日期">
            </el-date-picker>

            <el-select v-model="selectEvent" clearable collapse-tags filterable placeholder="请选择项目"
              class="worldhighlevel__model-filter-selector" @change="handleSelectEventChange">
              <el-option v-for="item in eventOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="tiredpredict__model-wrapper">
            <div class="chart-data" v-for="item in echartsDataList" :key="item.id">
              <div class="chart-item" :id="item.title">

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
import { formatTime } from '@/utils/formatTime'
export default {
  data () {
    return {
      todaydate: new Date(),
      tableData: [],
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
      echartsDataList: []
      // echartsDataList: [
      //   {
      //     id: 21,
      //     name: '',
      //     title: 'echart1',
      //     echarts: {
      //       data1: [10, 11, 13, 11, 12, 12, 9, 12, 12, 9],
      //       data2: [1, -2, 2, 5, 3, 2, 0, 3, 2, 0]
      //     }
      //   },
      //   {
      //     id: 22,
      //     name: '',
      //     title: 'echart2',
      //     echarts: {
      //       data1: [10, 11, 13, 11, 12, 12, 9, 12, 12, 9],
      //       data2: [1, -2, 2, 5, 3, 2, 0, 3, 2, 0]
      //     }
      //   }
      // ]
    }
  },
  created () {
    this.defaultValue = new Date()
    this.defaultValue.setHours(0)
    this.defaultValue.setMinutes(1)
    this.defaultValue.setSeconds(0)
  },
  mounted () {
    this.getYear()
    this.getEchartsData()
    console.log('3333')
    console.log(this.echartsDataList.length)
    console.log(this.echartsDataList)
    console.log('3333')
    let i = 0
    this.$nextTick(() => {
      this.echartsDataList.forEach(item => {
        console.log(i)
        i = i + 1
        // item
        console.log(item)
        this.initEcharts(item)
      })
    })
    // this.getTwoPairData()
    // this.$nextTick(() => {
    //   this.echartsDataList.forEach(item => {
    //     console.log(item)
    //     this.initEcharts(item)
    //   })
    // })
  },
  methods: {
    initEcharts (item) {
      console.log('8888****----')
      console.log(item)
      const data1 = item.echarts.data1
      const data2 = item.echarts.data2
      console.log(data1)
      const chartDom = document.getElementById(item.title)
      const myChart = echarts.init(chartDom)
      const option = {
        // title: {
        //   text: 'Temperature Change in the Coming Week'
        // },
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        series: [
          {
            name: 'Highest',
            type: 'line',
            data: data1,
            tiredLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: 'Lowest',
            type: 'line',
            data: data2,
            tiredLine: {
              data: [
                { type: 'average', name: 'Avg' },
                [
                  {
                    symbol: 'none',
                    x: '90%',
                    yAxis: 'max'
                  },
                  {
                    symbol: 'circle',
                    label: {
                      position: 'start',
                      formatter: 'Max'
                    },
                    type: 'max',
                    name: '最高点'
                  }
                ]
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
    handleSelectCompChange () {
      this.getEventById()
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
      console.log('****')
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
    getCompByYear () {
      axios.get('http://localhost/cm/getCompByYear', {
        params: {
          year: this.selectYear
        }
      }).then(res => {
        const compArr = res.data
        this.compOptions = compArr.map(item => (
          {
            value: item.comp_name,
            label: item.comp_name
          }
        ))
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    async getEchartsData () {
      axios.get('http://localhost/fatigue_predict/getSimilarityData').then(res => {
        // console.log(res)
        var titles = ['dynamometer_2000m', 'dynamometer_30min', 'vo2max', 'vo2max_rel', 'p4', 'dynamometer_5000m',
          'dynamometer_6000m', 'bench_pull_1rm', 'dead_lift_1rm', 'bench_press_1rm', 'deep_squat_1rm', 'ck', 'hb',
          't', 'bnu', 'wbc', 'hct', 'c', 'rbc', 'fe']
        var count = 0
        for (const item of res.data.data1[0]) {
          var temp = {
            id: count + 1,
            name: titles[count],
            title: titles[count],
            echarts: {
              data1: item,
              data2: item // res.data.data2[0][count]
            }
          }
          count++
          this.echartsDataList.push(temp)
        }
        console.log('-------------------')
        console.log(this.echartsDataList)
        // this.echartsDataList.forEach(item => {
        //   console.log(item)
        //   // this.initEcharts(item)
        // })
        console.log('-------------------')
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    getEventById () {
      axios.get('http://localhost/cm/getEventById', {
        params: {
          comp: this.selectComp
        }
      }).then(res => {
        const eventArr = res.data
        this.eventOptions = eventArr.map(item => (
          {
            value: item.id,
            label: item.event_type
          }
        ))
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    getResultsByEvent (id, event) {
      axios.get('http://localhost/cm/getResultsByEventPre', {
        params: {
          id,
          event
        }
      }).then(res => {
        const tmp = res.data
        this.country = tmp.map(item => {
          return item.country
        })
        this.d500m = tmp.map(item => {
          return item.d500m ? Number(formatTime(item.d500m).toFixed(2)) : 0
        })
        this.d1000m = tmp.map(item => {
          return item.d1000m ? Number(formatTime(item.d1000m).toFixed(2)) : 0
        })
        this.d1500m = tmp.map(item => {
          return item.d1500m ? Number(formatTime(item.d1500m).toFixed(2)) : 0
        })
        this.d2000m = tmp.map(item => {
          return item.d2000m ? Number(formatTime(item.d2000m).toFixed(2)) : 0
        })
      }).then(
        () => {
          this.series = this.country.map((item, index) => {
            const tmp = {
              name: item,
              type: 'line',
              data: [this.d500m[index], this.d1000m[index], this.d1500m[index], this.d2000m[index]]
            }
            return tmp
          })
          this.cNumber = this.country.length
          console.log(this.series)
          this.settiredpredictChart('tiredpredict_show1')
          this.settiredpredictChart('tiredpredict_show2')
          this.settiredpredictChart('tiredpredict_show3')
          this.settiredpredictChart('tiredpredict_show4')
          this.settiredpredictChart('tiredpredict_show5')
          this.settiredpredictChart('tiredpredict_show6')
          this.settiredpredictChart('tiredpredict_show7')
          this.settiredpredictChart('tiredpredict_show8')
          this.settiredpredictChart('tiredpredict_show9')
          this.settiredpredictChart('tiredpredict_show10')
        }).catch(err => {
        console.log('获取数据失败' + err)
      })
    }
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
    height: 600px;
    width: 100%;
    position: relative;

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
      bottom: 60px;
      left: 0;
      right: 0;

      h1 {
        width: 80%;
        margin: 0 auto;
        font-family: "Effra", Arial, sans-serif;
        font-style: italic;
        font-size: 50px;
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
        border: 1px solid red;
        display: flex;
        flex-wrap: wrap;

        .chart-item {
          width: 19.5%;
          height: 200px;
          border: 1px solid red;
        }
      }

      /*
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        &-echarts {
            width: 90%
        }
        */
    }
  }
}
</style>
