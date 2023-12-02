<template>
  <div>
    <el-card class="box-card">
        <div class="worldhighlevel__wrapper">
            <div class="worldhighlevel__model">
                <div class="worldhighlevel__model-title">世界高水平成绩</div>
                <div class="worldhighlevel__model-filter">
                    <el-select
                        v-model="selectYear"
                        clearable
                        collapse-tags
                        filterable
                        placeholder="请选择比赛年份"
                        class="worldhighlevel__model-filter-selector"
                        @change="handleSelectYearChange"
                    >
                        <el-option
                        v-for="item in yearOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select
                        v-model="selectComp"
                        clearable
                        collapse-tags
                        placeholder="请选择比赛"
                        class="worldhighlevel__model-filter-selector"
                        @change="handleSelectCompChange"
                    >
                        <el-option
                        v-for="item in compOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select
                        v-model="selectEvent"
                        clearable
                        collapse-tags
                        filterable
                        placeholder="请选择项目"
                        class="worldhighlevel__model-filter-selector"
                        @change="handleSelectEventChange"
                    >
                        <el-option
                        v-for="item in eventOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-form :inline="true" ref="fenduanForm" :model="fenduanForm" label-width="120px">
                        <el-form-item label="500m分段成绩">
                            <el-time-picker
                                v-model="fenduanForm.d500mValue"
                                value-format="HH:mm:ss"
                                :default-value="defaultValue"
                                placeholder="请输入500m分段成绩"
                            >
                            </el-time-picker>
                        </el-form-item>
                        <el-form-item label="1000m分段成绩">
                            <el-time-picker
                                v-model="fenduanForm.d1000mValue"
                                value-format="HH:mm:ss"
                                :default-value="defaultValue"
                                placeholder="请输入1000m分段成绩"
                            >
                            </el-time-picker>
                        </el-form-item>
                        <el-form-item label="1500m分段成绩">
                            <el-time-picker
                                v-model="fenduanForm.d1500mValue"
                                value-format="HH:mm:ss"
                                :default-value="defaultValue"
                                placeholder="请输入1500m分段成绩"
                            >
                            </el-time-picker>
                        </el-form-item>
                        <el-form-item label="2000m分段成绩">
                            <el-time-picker
                                v-model="fenduanForm.d2000mValue"
                                value-format="HH:mm:ss"
                                :default-value="defaultValue"
                                placeholder="请输入2000m分段成绩"
                            >
                            </el-time-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleCompare">对比</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="worldhighlevel__model-wrapper">
                    <div class="worldhighlevel__model-wrapper-echarts" id="worldhighlevel_show"></div>
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
      }
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
  },
  methods: {
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
    handleCompare () {
      if (!this.fenduanForm.d500mValue || !this.fenduanForm.d1000mValue || !this.fenduanForm.d1500mValue || !this.fenduanForm.d2000mValue) return
      const d500mTime = formatTime(this.fenduanForm.d500mValue)
      const d1000mTime = formatTime(this.fenduanForm.d1000mValue)
      const d1500mTime = formatTime(this.fenduanForm.d1500mValue)
      const d2000mTime = formatTime(this.fenduanForm.d2000mValue)
      if (this.series.length > this.cNumber) {
        this.series.pop()
        this.country.pop()
      }
      this.series.push({
        name: 'Me',
        type: 'line',
        data: [d500mTime, d1000mTime, d1500mTime, d2000mTime]
      })
      this.country.push('Me')
      this.setWorldHighLevelChart()
    },
    getYear () {
      axios.get('http://127.0.0.1/cm/getYear').then(res => {
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
      axios.get('http://127.0.0.1/cm/getCompByYear', {
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
    getEventById () {
      axios.get('http://127.0.0.1/cm/getEventById', {
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
      axios.get('http://127.0.0.1/cm/getResultsByEvent', {
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
          this.setWorldHighLevelChart()
        }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    setWorldHighLevelChart () {
      var chartDom = document.getElementById('worldhighlevel_show')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: this.selectComp + this.selectEventName
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var result = params[0].name + '<br>'

            params.forEach(function (item) {
              result += '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' + item.color + '"></span>' + item.seriesName + ': ' + '<span style="align-self:flex-end;font-weight:700">' + item.value + 's<br>' + '</span>'
            })

            return result
          }
        },
        legend: {
          data: this.country,
          top: '5%'
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: true,
          top: '5%',
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
          name: '分段',
          type: 'category',
          boundaryGap: false,
          data: ['d500m', 'd1000m', 'd1500m', 'd2000m']
        },
        yAxis: {
          name: '成绩/s',
          type: 'value'
        },
        series: this.series
      }

      option && myChart.setOption(option)
    }
  }
}
</script>

<style lang='less' scoped>

.box-card {
  margin: 0 auto;
  width: 100%;
  padding: 10px;
  .main {
    margin-left: 100px;
  }
}

.worldhighlevel {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
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
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        &-echarts {
            width: 1000px;
            height: 1000px;
        }
    }
  }
}
</style>
