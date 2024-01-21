<template>
    <div class="jineng__wrapper">
        <div class="jineng__wsy">
            <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 30px">
              <div class="jineng__wsy-title">机能监控</div>
              <el-switch
                v-model="switchValue"
                active-text="ECharts图"
                inactive-text="表格"
                @change="handleSwitchChange"
              >
              </el-switch>
            </div>
            <div>
              <el-form :inline="true" ref="jinengForm" :model="jinengForm" label-width="70px">
                  <el-form-item label="机能指标">
                      <el-select
                          v-model="jinengForm.jinengSelectValues"
                          placeholder="请选择机能指标"
                          multiple
                          clearable
                          collapse-tags
                          filterable
                          @change="handleJinengSelectChange"
                          style="width: 290px"
                      >
                        <el-option
                          v-for="item in jinengOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="测试时间">
                    <el-date-picker
                      v-model="jinengForm.dateRange"
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
            <div class="jineng__wsy-wrapper" v-show="switchValue">
                <div class="jineng__wsy-wrapper-echarts" id="jineng_show1"></div>
            </div>
            <div class="jineng__wsy-table" v-show="!switchValue">
              <el-table
                :data="tableData"
                border
                style="width: 100%"
                :cell-style="setCellStyle"
              >
                <el-table-column v-if="jinengForm.jinengSelectValues.length" prop="date" label="日期" align="center"></el-table-column>
                <el-table-column
                  v-for="item in jinengForm.jinengSelectValues"
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
import myAxios from '@/utils/request'
import { formatDate } from '@/utils/formatDate'
// import { secondToMinute } from '@/utils/secondToMinute'
export default {
  data () {
    return {
      id: 0,
      switchValue: true,
      tableData: [],
      pickerOptions: null,
      selectDate: [],
      selectItemValues: {},
      jinengData: {},
      series: [],
      jinengForm: {
        jinengSelectValues: [],
        dateRange: ''
      },
      jinengOptions: [{
        value: 'body_fat_mass',
        label: '身体成分-体脂肪量'
      }, {
        value: 'fat_ratio',
        label: '身体成分-体脂率'
      }, {
        value: 'free_fat_mass',
        label: '身体成分-去脂体重'
      }, {
        value: 'weight',
        label: '身体成分-体重'
      }, {
        value: 'vo2max',
        label: '有氧能力-最大摄氧量'
      }, {
        value: 'vo2max_rel',
        label: '有氧能力-相对最大摄氧量'
      }, {
        value: 'wbc',
        label: '血常规-白细胞'
      }, {
        value: 'hb',
        label: '血常规-血红蛋白'
      }, {
        value: 'hct',
        label: '血常规-红细胞比积'
      }, {
        value: 'rbc',
        label: '血常规-红细胞'
      }, {
        value: 'mcv',
        label: '血常规-平均红细胞容积'
      }, {
        value: 't',
        label: '阶段测试-睾酮'
      }, {
        value: 'c',
        label: '阶段测试-皮质醇'
      }, {
        value: 'fe',
        label: '阶段测试-铁蛋白'
      }, {
        value: 'bun',
        label: '阶段测试-血尿素'
      }, {
        value: 'ck',
        label: '阶段测试-肌酸激酶'
      }, {
        value: 'iga',
        label: '阶段测试-免疫球蛋白A'
      }, {
        value: 'igm',
        label: '阶段测试-免疫球蛋白M'
      }, {
        value: 'igg',
        label: '阶段测试-免疫球蛋白G'
      }]
    }
  },
  mounted () {
    this.getPlayerId()
  },
  methods: {
    formatLabel (item) {
      const label = this.jinengOptions.filter(i => i.value === item)[0].label
      let danwei = ''
      if (label === '身体成分-体脂肪量' || label === '身体成分-去脂体重' || label === '身体成分-体重') danwei = 'kg'
      if (label === '身体成分-体脂率') danwei = '%'
      if (label === '有氧能力-最大摄氧量') danwei = 'l/min'
      if (label === '有氧能力-相对最大摄氧量') danwei = 'ml/min/kg'
      if (label === '血常规-白细胞' || label === '血常规-红细胞') danwei = '个/L'
      if (label === '血常规-血红蛋白') danwei = 'g/dL'
      if (label === '血常规-平均红细胞容积') danwei = 'fl'
      if (label === '阶段测试-睾酮') danwei = 'ng/dL'
      if (label === '阶段测试-皮质醇') danwei = 'ug/dL'
      if (label === '阶段测试-铁蛋白') danwei = 'ng/ml'
      if (label === '阶段测试-血尿素') danwei = 'mmol/L'
      if (label === '阶段测试-肌酸激酶') danwei = 'U/L'
      if (label === '阶段测试-免疫球蛋白A' || label === '阶段测试-免疫球蛋白M' || label === '阶段测试-免疫球蛋白G') danwei = 'g/L'
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
      if (v) this.setJiNengChart1()
      else this.setTable()
    },
    setTable () {
      if (!this.jinengForm.jinengSelectValues.length) {
        this.tableData = []
        return
      }
      this.tableData = this.selectDate.map((item, index) => {
        var tmp = {}
        tmp['date'] = item
        for (var key in this.selectItemValues) {
          let d = this.selectItemValues[key][index]
          // if (key === 'dynamometer_2000m' || key === 'dynamometer_30min') {
          //   d = secondToMinute(d)
          // }
          tmp[key] = d
        }
        return tmp
      })
    },
    handleReset () {
      this.selectDate = this.jinengData.date.map(item => formatDate(item))
      this.jinengForm.dateRange = []
      this.jinengForm.jinengSelectValues = []
      this.series = []
      if (this.switchValue) this.setJiNengChart1()
      else this.setTable()
    },
    handleDateRangeChange () {
      var startDate = this.jinengForm.dateRange[0]
      var endDate = this.jinengForm.dateRange[1]

      var timeArray = this.jinengData.date

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
          name: this.jinengOptions.filter(item => item.value === key1)[0].label,
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
      if (this.switchValue) this.setJiNengChart1()
      else this.setTable()
    },
    handleJinengSelectChange () {
      this.series = []
      let tmp = {}
      this.jinengForm.jinengSelectValues.forEach(item => {
        tmp[item] = this.jinengData[item]
      })
      this.selectItemValues = tmp
      for (var key in this.selectItemValues) {
        this.series.push({
          name: this.jinengOptions.filter(item => item.value === key)[0].label,
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
      if (this.switchValue) this.setJiNengChart1()
      else this.setTable()
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
          this.getJinengData()
        }).catch(err => {
          console.log('获取数据失败' + err)
        })
      } else {
        this.id = window.sessionStorage.getItem('id')
        this.getJinengData()
      }
    },
    getJinengData () {
      const getBloodData = myAxios.get('/jineng/getBloodData', {
        params: {
          id: this.id
        }
      })
      const getAerobicData = myAxios.get('/jineng/getAerobicData', {
        params: {
          id: this.id
        }
      })
      const getBodyData = myAxios.get('/jineng/getBodyData', {
        params: {
          id: this.id
        }
      })
      Promise.all([getBloodData, getAerobicData, getBodyData]).then(res => {
        const bloodData = res[0].data
        const aerobicData = res[1].data
        // const aerobicData = res[1].data.map(item => (
        //   {
        //     dynamometer_2000m: item.dynamometer_2000m,
        //     dynamometer_30min: item.dynamometer_30min
        //   }
        // ))
        const bodyData = res[2].data
        let tmp = {}
        for (var key1 in bloodData[0]) {
          tmp[key1] = []
        }
        for (var key2 in aerobicData[0]) {
          tmp[key2] = []
        }
        for (var key3 in bodyData[0]) {
          tmp[key3] = []
        }
        bloodData.forEach(item => {
          for (var key in item) {
            var d = item[key]
            tmp[key].push(d)
          }
        })
        aerobicData.forEach(item => {
          for (var key in item) {
            var d = item[key]
            tmp[key].push(d)
          }
        })
        bodyData.forEach(item => {
          for (var key in item) {
            var d = item[key]
            tmp[key].push(d)
          }
        })
        this.jinengData = tmp
        this.selectDate = this.jinengData.date.map(item => formatDate(item))
      }).then(
        () => {
          const timeArray = this.jinengData.date
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
    setJiNengChart1 () {
      var chartDom = document.getElementById('jineng_show1')
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
              if (item.seriesName === '身体成分-体脂肪量' || item.seriesName === '身体成分-去脂体重' || item.seriesName === '身体成分-体重') v = v + 'kg'
              if (item.seriesName === '身体成分-体脂率') v = v + '%'
              if (item.seriesName === '有氧能力-最大摄氧量') v = v + 'l/min'
              if (item.seriesName === '有氧能力-相对最大摄氧量') v = v + 'ml/min/kg'
              if (item.seriesName === '血常规-白细胞' || item.seriesName === '血常规-红细胞') v = v + '个/L'
              if (item.seriesName === '血常规-血红蛋白') v = v + 'g/dL'
              if (item.seriesName === '血常规-平均红细胞容积') v = v + 'fl'
              if (item.seriesName === '阶段测试-睾酮') v = v + 'ng/dL'
              if (item.seriesName === '阶段测试-皮质醇') v = v + 'ug/dL'
              if (item.seriesName === '阶段测试-铁蛋白') v = v + 'ng/ml'
              if (item.seriesName === '阶段测试-血尿素') v = v + 'mmol/L'
              if (item.seriesName === '阶段测试-肌酸激酶') v = v + 'U/L'
              if (item.seriesName === '阶段测试-免疫球蛋白A' || item.seriesName === '阶段测试-免疫球蛋白M' || item.seriesName === '阶段测试-免疫球蛋白G') v = v + 'g/L' // if (item.seriesName === '专项体能-测功仪2000m' || item.seriesName === '专项体能-测功仪30min-20SR') v = secondToMinute(v)
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
.jineng {
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
