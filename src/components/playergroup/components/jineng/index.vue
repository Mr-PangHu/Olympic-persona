<template>
    <div class="jineng__wrapper">
        <div class="jineng__wsy">
            <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px">
              <!-- <div class="jineng__wsy-title">机能监控</div>
              <el-switch
                v-model="switchValue"
                active-text="ECharts图"
                inactive-text="表格"
                @change="handleSwitchChange"
              >
              </el-switch> -->
            </div>
            <div>
              <el-form :inline="true" ref="jinengForm" :model="jinengForm" label-width="70px">
                  <el-form-item label="机能指标">
                      <el-select
                          v-model="jinengForm.jinengSelectValue"
                          placeholder="请选择机能指标"
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
            <div class="jineng__wsy-wrapper">
                <div class="jineng__wsy-wrapper-echarts" id="jineng_show1"></div>
            </div>
            <div class="jineng__wsy-table">
              <el-table
                :data="tableData"
                border
                style="width: 100%"
              >
                <el-table-column
                  v-for="column in this.columns"
                  :label= NAMEINDEX[column]
                  :prop="column"
                  :key="column"
                  align="center"
                  border
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
// :label="formatLabel(column)"
// import { secondToMinute } from '@/utils/secondToMinute'
// :cell-style="setCellStyle"s
export default {
  data () {
    return {
      NAMEINDEX: {
        name: '姓名',
        date: '日期',
        weight: '体重',
        fat_ratio: '体脂率',
        body_fat_mass: '体脂肪量',
        free_fat_mass: '去脂体重',
        wbc: '白细胞',
        rbc: '红细胞',
        hb: '血红蛋白',
        hct: '红细胞比积',
        mcv: '平均红细胞容积',
        vo2max: '最大摄氧量',
        vo2max_rel: '相对最大摄氧量',
        t: '睾酮',
        c: '皮质醇',
        fe: '铁',
        bun: '血尿素',
        ck: '肌酸激酶',
        iga: '免疫球蛋白A',
        igm: '免疫球蛋白M',
        igg: '免疫球蛋白G'
      },
      id: 0,
      tableData: [],
      pickerOptions: null,
      selectDate: [],
      columns: [],
      // selectItemValues: {},
      jinengDataTotal: {},
      jinengDataShow: {},
      jinengDataAerobic: {},
      jinengDataBlood: {},
      jinengDataBody: {},
      jinengDataTest: {},
      // series: [],
      jinengForm: {
        jinengSelectValue: ['body'],
        dateRange: ''
      },
      jinengOptions: [{
        value: 'body',
        label: '身体成分'
      }, {
        value: 'aerobic',
        label: '有氧能力'
      }, {
        value: 'blood',
        label: '血常规'
      }, {
        value: 'test',
        label: '阶段测试'
      }]
    }
  },
  mounted () {
    this.getPlayerId()
  },
  watch: {
    jinengDataShow: {
      handler (newValue, oldValue) {
        this.setJiNengChart1()
        this.setTable()
      },
      deep: true
    }
  },
  methods: {
    // formatLabel (column) {
    //   // const label = this.jinengOptions.filter(i => i.value === item)[0].label
    //   // let danwei = ''
    //   // if (label === '身体成分-体脂肪量' || label === '身体成分-去脂体重' || label === '身体成分-体重') danwei = 'kg'
    //   // if (label === '身体成分-体脂率') danwei = '%'
    //   // if (label === '有氧能力-最大摄氧量') danwei = 'l/min'
    //   // if (label === '有氧能力-相对最大摄氧量') danwei = 'ml/min/kg'
    //   // if (label === '血常规-白细胞' || label === '血常规-红细胞') danwei = '个/L'
    //   // if (label === '血常规-血红蛋白') danwei = 'g/dL'
    //   // if (label === '血常规-平均红细胞容积') danwei = 'fl'
    //   // if (label === '阶段测试-睾酮') danwei = 'ng/dL'
    //   // if (label === '阶段测试-皮质醇') danwei = 'ug/dL'
    //   // if (label === '阶段测试-铁蛋白') danwei = 'ng/ml'
    //   // if (label === '阶段测试-血尿素') danwei = 'mmol/L'
    //   // if (label === '阶段测试-肌酸激酶') danwei = 'U/L'
    //   // if (label === '阶段测试-免疫球蛋白A' || label === '阶段测试-免疫球蛋白M' || label === '阶段测试-免疫球蛋白G') danwei = 'g/L'
    //   // return label + '（' + danwei + '）'
    // },
    // setCellStyle ({rowIndex, columnIndex, row, column}) {
    //   const tmpMax = {}
    //   const tmpMin = {}
    //   for (var k in this.selectItemValues) {
    //     tmpMax[k] = Math.max(...this.selectItemValues[k])
    //     tmpMin[k] = Math.min(...this.selectItemValues[k])
    //   }
    //   for (var k1 in this.selectItemValues) {
    //     if (row[k1] === tmpMax[k1] && column.property === k1) return 'font-weight: 700;'
    //     else if (row[k1] === tmpMin[k1] && column.property === k1) return 'font-weight: 700; color: red'
    //   }
    // },
    setTable () {
      this.tableData = []
      const keys = Object.keys(this.jinengDataShow)
      this.columns = keys
      const values = Object.values(this.jinengDataShow)
      console.log(keys, values)
      const numRows = values[0].length
      console.log(numRows)
      const result = []
      for (let i = 0; i < numRows; i++) {
        const rowData = {}

        // 遍历键
        for (let j = 0; j < keys.length; j++) {
          rowData[keys[j]] = values[j][i]
        }

        // 将行数据添加到结果数组中
        result.push(rowData)
      }
      console.log(result)
      this.tableData = result
      // const rowData = {}
    },
    handleReset () {
      // this.series = []
      this.jinengForm.dateRange = []
      this.jinengForm.jinengSelectValue = []
      this.jinengDataShow = this.jinengDataBody
      this.selectDate = this.jinengDataShow.date.map(item => formatDate(item))
      // this.selectDate = this.jinengDataShow.date
      // this.series.push({
      //   name: '体重',
      //   type: 'line',
      //   data: this.jinengDataShow.weight
      // },
      // {
      //   name: '体脂率',
      //   type: 'line',
      //   data: this.jinengDataShow.fat_ratio
      // },
      // {
      //   name: '体脂肪量',
      //   type: 'line',
      //   data: this.jinengDataShow.body_fat_mass
      // },
      // {
      //   name: '去脂体重',
      //   type: 'line',
      //   data: this.jinengDataShow.free_fat_mass
      // })
      // this.setJiNengChart1()
    },
    handleDateRangeChange () {
      var startDate = this.jinengForm.dateRange[0]
      var endDate = this.jinengForm.dateRange[1]

      var timeArray = this.jinengDataShow.date
      console.log(timeArray)

      var selectedTimes = timeArray.filter((time) => {
        var currentDate = new Date(time)
        return currentDate >= startDate && currentDate <= endDate
      })
      var sortedTimes = selectedTimes.sort((a, b) => new Date(a) - new Date(b))
      console.log(sortedTimes)
      var indexes = []
      sortedTimes.forEach(item => {
        console.log(item)
        if (this.jinengDataShow.date.includes(item)) {
          indexes.push(this.jinengDataShow.date.indexOf(item))
        }
      })
      console.log(indexes)
      var tmpDataShow = {}
      for (var key in this.jinengDataShow) {
        tmpDataShow[key] = []
        indexes.forEach(item => {
          // console.log(this.jinengDataShow[key][item])
          tmpDataShow[key].push(this.jinengDataShow[key][item])
        })
      }
      this.jinengDataShow = tmpDataShow
      // console.log(this.jinengDataShow)
      // this.setJiNengChart1()
    },
    handleJinengSelectChange () {
      this.series = []
      if (this.jinengForm.jinengSelectValue === 'body') {
        this.jinengDataShow = this.jinengDataBody
        this.selectDate = this.jinengDataShow.date
        // this.series.push({
        //   name: '体重',
        //   type: 'line',
        //   data: this.jinengDataShow.weight
        // },
        // {
        //   name: '体脂率',
        //   type: 'line',
        //   data: this.jinengDataShow.fat_ratio
        // },
        // {
        //   name: '体脂肪量',
        //   type: 'line',
        //   data: this.jinengDataShow.body_fat_mass
        // },
        // {
        //   name: '去脂体重',
        //   type: 'line',
        //   data: this.jinengDataShow.free_fat_mass
        // })
        // this.setJiNengChart1()
      }
      if (this.jinengForm.jinengSelectValue === 'aerobic') {
        this.jinengDataShow = this.jinengDataAerobic
        this.selectDate = this.jinengDataShow.date
        // this.series.push({
        //   name: '最大摄氧量',
        //   type: 'line',
        //   data: this.jinengDataShow.vo2max
        // },
        // {
        //   name: '相对最大摄氧量',
        //   type: 'line',
        //   data: this.jinengDataShow.vo2max
        // })
        // this.setJiNengChart1()
      }
      if (this.jinengForm.jinengSelectValue === 'test') {
        this.jinengDataShow = this.jinengDataTest
        this.selectDate = this.jinengDataShow.date
        // this.series.push({
        //   name: '睾酮',
        //   type: 'line',
        //   data: this.jinengDataShow.t
        // },
        // {
        //   name: '皮质醇',
        //   type: 'line',
        //   data: this.jinengDataShow.c
        // },
        // {
        //   name: '铁蛋白',
        //   type: 'line',
        //   data: this.jinengDataShow.fe
        // },
        // {
        //   name: '血尿素',
        //   type: 'line',
        //   data: this.jinengDataShow.bun
        // },
        // {
        //   name: '肌酸激酶',
        //   type: 'line',
        //   data: this.jinengDataShow.ck
        // },
        // {
        //   name: '免疫球蛋白A',
        //   type: 'line',
        //   data: this.jinengDataShow.iga
        // },
        // {
        //   name: '免疫球蛋白M',
        //   type: 'line',
        //   data: this.jinengDataShow.igm
        // },
        // {
        //   name: '免疫球蛋白G',
        //   type: 'line',
        //   data: this.jinengDataShow.igg
        // })
        // this.setJiNengChart1()
        // this.setTable()
      }
      if (this.jinengForm.jinengSelectValue === 'blood') {
        this.jinengDataShow = this.jinengDataBlood
        this.selectDate = this.jinengDataShow.date
        // this.series.push({
        //   name: '白细胞',
        //   type: 'line',
        //   data: this.jinengDataShow.wbc
        // },
        // {
        //   name: '红细胞',
        //   type: 'line',
        //   data: this.jinengDataShow.rbc
        // },
        // {
        //   name: '血红蛋白',
        //   type: 'line',
        //   data: this.jinengDataShow.hb
        // },
        // {
        //   name: '红细胞比积',
        //   type: 'line',
        //   data: this.jinengDataShow.hct
        // },
        // {
        //   name: '平均红细胞容积',
        //   type: 'line',
        //   data: this.jinengDataShow.mcv
        // })
        // this.setJiNengChart1()
      }
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
      const getTestData = myAxios.get('/jineng/getTestData', {
        params: {
          id: this.id
        }
      })
      Promise.all([getBloodData, getAerobicData, getBodyData, getTestData]).then(res => {
        const bloodData = res[0].data
        const aerobicData = res[1].data
        // const aerobicData = res[1].data.map(item => (
        //   {
        //     dynamometer_2000m: item.dynamometer_2000m,
        //     dynamometer_30min: item.dynamometer_30min
        //   }
        // ))
        const bodyData = res[2].data
        const testData = res[3].data
        let tmp = {}
        let tmpBlood = {}
        let tmpAerobic = {}
        let tmpBody = {}
        let tmpTest = {}
        for (var key1 in bloodData[0]) {
          tmp[key1] = []
          tmpBlood[key1] = []
        }
        for (var key2 in aerobicData[0]) {
          tmp[key2] = []
          tmpAerobic[key2] = []
        }
        for (var key3 in bodyData[0]) {
          tmp[key3] = []
          tmpBody[key3] = []
        }
        for (var key4 in testData[0]) {
          tmp[key4] = []
          tmpTest[key4] = []
        }
        bloodData.forEach(item => {
          for (var key in item) {
            var d = item[key]
            tmp[key].push(d)
            tmpBlood[key].push(d)
          }
        })
        aerobicData.forEach(item => {
          for (var key in item) {
            var d = item[key]
            tmp[key].push(d)
            tmpAerobic[key].push(d)
          }
        })
        bodyData.forEach(item => {
          for (var key in item) {
            var d = item[key]
            tmp[key].push(d)
            tmpBody[key].push(d)
          }
        })
        testData.forEach(item => {
          for (var key in item) {
            var d = item[key]
            tmp[key].push(d)
            tmpTest[key].push(d)
          }
        })
        this.jinengDataTotal = tmp
        this.jinengDataBody = tmpBody
        this.jinengDataBlood = tmpBlood
        this.jinengDataAerobic = tmpAerobic
        this.jinengDataTest = tmpTest
        this.jinengDataShow = this.jinengDataBody
        this.selectDate = this.jinengDataShow.date.map(item => formatDate(item))
        // this.series.push({
        //   name: '体重',
        //   type: 'line',
        //   data: this.jinengDataShow.weight
        // },
        // {
        //   name: '体脂率',
        //   type: 'line',
        //   data: this.jinengDataShow.fat_ratio
        // },
        // {
        //   name: '体脂肪量',
        //   type: 'line',
        //   data: this.jinengDataShow.body_fat_mass
        // },
        // {
        //   name: '去脂体重',
        //   type: 'line',
        //   data: this.jinengDataShow.free_fat_mass
        // })
        // this.setJiNengChart1()
        const timeArray = this.jinengDataTotal.date
        const minDate = new Date(Math.min(...timeArray.map(time => new Date(time))) - 8 * 60 * 60 * 1000)
        const maxDate = new Date(Math.max(...timeArray.map(time => new Date(time))) + 16 * 60 * 60 * 1000)

        this.pickerOptions = {
          disabledDate: time => {
            const currentDate = new Date(time)
            return currentDate < minDate || currentDate > maxDate
          }
        }
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    setJiNengChart1 () {
      var chartDom = document.getElementById('jineng_show1')
      var myChart = echarts.init(chartDom)
      myChart.clear()
      var option

      option = {
        color: ['#EDAE49', '#D1495B', '#00798C', '#30638E'],
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var result = params[0].name + '<br>'

            params.forEach(function (item) {
              let v = Number(item.value)
              if (item.seriesName === '体脂肪量' || item.seriesName === '去脂体重' || item.seriesName === '体重') v = v + 'kg'
              if (item.seriesName === '体脂率') v = v + '%'
              if (item.seriesName === '最大摄氧量') v = v + 'l/min'
              if (item.seriesName === '相对最大摄氧量') v = v + 'ml/min/kg'
              if (item.seriesName === '白细胞' || item.seriesName === '红细胞') v = v + '个/L'
              if (item.seriesName === '血红蛋白') v = v + 'g/dL'
              if (item.seriesName === '平均红细胞容积') v = v + 'fl'
              if (item.seriesName === '睾酮') v = v + 'ng/dL'
              if (item.seriesName === '皮质醇') v = v + 'ug/dL'
              if (item.seriesName === '铁蛋白') v = v + 'ng/ml'
              if (item.seriesName === '血尿素') v = v + 'mmol/L'
              if (item.seriesName === '肌酸激酶') v = v + 'U/L'
              if (item.seriesName === '免疫球蛋白A' || item.seriesName === '免疫球蛋白M' || item.seriesName === '免疫球蛋白G') v = v + 'g/L' // if (item.seriesName === '专项体能-测功仪2000m' || item.seriesName === '专项体能-测功仪30min-20SR') v = secondToMinute(v)
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
          data: this.jinengDataShow.date,
          // name: '日期',
          axisLabel: {
            textStyle: {
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
          name: '体重',
          type: 'line',
          data: this.jinengDataShow.weight
        },
        {
          name: '体脂率',
          type: 'line',
          data: this.jinengDataShow.fat_ratio
        },
        {
          name: '体脂肪量',
          type: 'line',
          data: this.jinengDataShow.body_fat_mass
        },
        {
          name: '去脂体重',
          type: 'line',
          data: this.jinengDataShow.free_fat_mass
        },
        {
          name: '最大摄氧量',
          type: 'line',
          data: this.jinengDataShow.vo2max
        },
        {
          name: '相对最大摄氧量',
          type: 'line',
          data: this.jinengDataShow.vo2max
        },
        {
          name: '睾酮',
          type: 'line',
          data: this.jinengDataShow.t
        },
        {
          name: '皮质醇',
          type: 'line',
          data: this.jinengDataShow.c
        },
        {
          name: '铁蛋白',
          type: 'line',
          data: this.jinengDataShow.fe
        },
        {
          name: '血尿素',
          type: 'line',
          data: this.jinengDataShow.bun
        },
        {
          name: '肌酸激酶',
          type: 'line',
          data: this.jinengDataShow.ck
        },
        {
          name: '免疫球蛋白A',
          type: 'line',
          data: this.jinengDataShow.iga
        },
        {
          name: '免疫球蛋白M',
          type: 'line',
          data: this.jinengDataShow.igm
        },
        {
          name: '免疫球蛋白G',
          type: 'line',
          data: this.jinengDataShow.igg
        },
        {
          name: '白细胞',
          type: 'line',
          data: this.jinengDataShow.wbc
        },
        {
          name: '红细胞',
          type: 'line',
          data: this.jinengDataShow.rbc
        },
        {
          name: '血红蛋白',
          type: 'line',
          data: this.jinengDataShow.hb
        },
        {
          name: '红细胞比积',
          type: 'line',
          data: this.jinengDataShow.hct
        },
        {
          name: '平均红细胞容积',
          type: 'line',
          data: this.jinengDataShow.mcv
        }]
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
    padding: 0px 10px 70px 10px;
    width: 100%;
  }
  &__wsy {
    display: flex;
    flex-direction: column;
    width: 100%;
    &-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        margin-bottom: 20px;
        &-echarts {
            width: 1500px;
            height: 400px;
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
/deep/ .el-table {
  color: black;
}

/deep/ .el-table__header th {
  //
  color: black;
  font-size: 14px;
}

/deep/ .el-form-item__label {
  color: black;
}
</style>
