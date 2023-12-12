<template>
    <div class="tineng__wrapper">
        <div class="tineng__wsy">
            <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 30px">
              <div class="tineng__wsy-title">体能</div>
              <el-switch
                v-model="switchValue"
                active-text="ECharts图"
                inactive-text="表格"
                @change="handleSwitchChange"
              >
              </el-switch>
            </div>
            <div>
              <el-form :inline="true" ref="tinengForm" :model="tinengForm" label-width="70px">
                  <el-form-item label="体能指标">
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
                  </el-form-item>
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
            <div class="tineng__wsy-wrapper" v-show="switchValue">
                <div class="tineng__wsy-wrapper-echarts" id="tineng_show1"></div>
            </div>
            <div class="tineng__wsy-table" v-show="!switchValue">
              <el-table
                :data="tableData"
                border
                style="width: 100%"
                :cell-style="setCellStyle"
              >
                <el-table-column v-if="tinengForm.tinengSelectValues.length" prop="date" label="日期" align="center"></el-table-column>
                <el-table-column
                  v-for="item in tinengForm.tinengSelectValues"
                  :prop="item"
                  :label="formatLabel(item)"
                  :key="item"
                  align="center"
                >
                </el-table-column>
              </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
import { formatDate } from '@/utils/formatDate'
import { formatSeconds, formatMMToSeconds } from '@/utils/formatTime'
import { secondToMinute } from '@/utils/secondToMinute'
export default {
  data () {
    return {
      id: 0,
      switchValue: true,
      tableData: [],
      pickerOptions: null,
      selectDate: [],
      selectItemValues: {},
      tinengData: {},
      series: [],
      tinengForm: {
        tinengSelectValues: [],
        dateRange: ''
      },
      tinengOptions: [{
        value: 'sprint_run_30m',
        label: '基础体能-30m冲刺跑'
      }, {
        value: 'bench_press_1rm',
        label: '基础体能-卧推1RM'
      }, {
        value: 'deep_squat_1rm',
        label: '基础体能-深蹲1RM'
      }, {
        value: 'standing_jump_both_legs',
        label: '基础体能-立定跳远(双腿)'
      }, {
        value: 'pull_up',
        label: '基础体能-引体向上'
      }, {
        value: 'dynamometer_2000m',
        label: '专项体能-测功仪2000m'
      }, {
        value: 'dynamometer_30min',
        label: '专项体能-测功仪30min-20SR'
      }]
    }
  },
  mounted () {
    this.getPlayerId()
  },
  methods: {
    formatLabel (item) {
      const label = this.tinengOptions.filter(i => i.value === item)[0].label
      let danwei = ''
      if (label === '基础体能-30m冲刺跑') danwei = 's'
      if (label === '基础体能-卧推1RM' || label === '基础体能-深蹲1RM') danwei = 'kg'
      if (label === '基础体能-引体向上') danwei = '个'
      if (label === '基础体能-立定跳远(双腿)') danwei = 'cm'
      if (label === '专项体能-测功仪2000m' || label === '专项体能-测功仪30min-20SR') danwei = "mm'ss.00"
      return label + '（' + danwei + '）'
    },
    setCellStyle ({rowIndex, columnIndex, row, column}) {
      const tmpMax = {}
      const tmpMin = {}
      for (var k in this.selectItemValues) {
        tmpMax[k] = Math.max(...this.selectItemValues[k])
        tmpMin[k] = Math.min(...this.selectItemValues[k])
      }
      for (var k1 in this.selectItemValues) {
        if (row[k1] === tmpMax[k1] && column.property === k1) return 'font-weight: 700;'
        else if (row[k1] === tmpMin[k1] && column.property === k1) return 'font-weight: 700; color: red'
      }
    },
    handleSwitchChange (v) {
      if (v) this.setTiNengChart1()
      else this.setTable()
    },
    setTable () {
      if (!this.tinengForm.tinengSelectValues.length) {
        this.tableData = []
        return
      }
      this.tableData = this.selectDate.map((item, index) => {
        var tmp = {}
        tmp['date'] = item
        for (var key in this.selectItemValues) {
          let d = this.selectItemValues[key][index]
          if (key === 'dynamometer_2000m' || key === 'dynamometer_30min') {
            d = secondToMinute(d)
          }
          tmp[key] = d
        }
        return tmp
      })
    },
    handleReset () {
      this.selectDate = this.tinengData.date.map(item => formatDate(item))
      this.tinengForm.dateRange = []
      this.tinengForm.tinengSelectValues = []
      this.series = []
      if (this.switchValue) this.setTiNengChart1()
      else this.setTable()
    },
    handleDateRangeChange () {
      var startDate = this.tinengForm.dateRange[0]
      var endDate = this.tinengForm.dateRange[1]

      var timeArray = this.tinengData.date

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
          name: this.tinengOptions.filter(item => item.value === key1)[0].label,
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
      if (this.switchValue) this.setTiNengChart1()
      else this.setTable()
    },
    handleTinengSelectChange () {
      this.series = []
      let tmp = {}
      this.tinengForm.tinengSelectValues.forEach(item => {
        tmp[item] = this.tinengData[item]
      })
      this.selectItemValues = tmp
      for (var key in this.selectItemValues) {
        this.series.push({
          name: this.tinengOptions.filter(item => item.value === key)[0].label,
          data: this.selectItemValues[key],
          type: 'line',
          // stack: `Total${i}`,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
          showBackground: true
        })
      }
      if (this.switchValue) this.setTiNengChart1()
      else this.setTable()
    },
    getPlayerId () {
      const auth = window.sessionStorage.getItem('auth')
      if (auth === '2') {
        const id = this.$route.params.id
        axios.get('http://127.0.0.1/list/getAthleteId', {
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
      const getBasicTinengData = axios.get('http://127.0.0.1/tineng/getBasicTinengData', {
        params: {
          id: this.id
        }
      })
      const getProTinengData = axios.get('http://127.0.0.1/tineng/getProTinengData', {
        params: {
          id: this.id
        }
      })
      Promise.all([getBasicTinengData, getProTinengData]).then(res => {
        const basicData = res[0].data
        const proData = res[1].data.map(item => (
          {
            dynamometer_2000m: item.dynamometer_2000m,
            dynamometer_30min: item.dynamometer_30min
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
        proData.forEach(item => {
          for (var key in item) {
            var d = item[key]
            if (key === 'dynamometer_2000m' || key === 'dynamometer_30min') {
              d = formatMMToSeconds(d)
            }
            tmp[key].push(d)
          }
        })
        this.tinengData = tmp
        this.selectDate = this.tinengData.date.map(item => formatDate(item))
      }).then(
        () => {
          const timeArray = this.tinengData.date
          const minDate = new Date(Math.min(...timeArray.map(time => new Date(time))))
          const maxDate = new Date(Math.max(...timeArray.map(time => new Date(time))))

          this.pickerOptions = {
            disabledDate: time => {
              const currentDate = new Date(time)
              return currentDate < minDate || currentDate > maxDate
            }
          }
        }
      ).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    setTiNengChart1 () {
      var chartDom = document.getElementById('tineng_show1')
      var myChart = echarts.init(chartDom)
      myChart.clear()
      var option

      option = {
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
          data: this.selectDate,
          name: '日期'
        },
        yAxis: {
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
.tineng {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
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
        &-echarts {
            width: 1500px;
            height: 800px;
        }
    }
    &-table {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 95%;
      margin-left: 20px;
    }
  }
}

</style>
