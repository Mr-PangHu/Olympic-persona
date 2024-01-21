<template>
  <div class="compare__wrapper">
    <div class="compare__topper">
        <div class="compare__topper-img"></div>
        <div class="compare__topper-overlay"></div>
        <div class="compare__topper-title">
          <h1>多人对比</h1>
        </div>
    </div>
    <el-card class="box-card">
      <div class="compareChoose__model">
      <div class="compareChoose__model-filter">
        <el-form :inline="true" ref="compareForm">
          <el-form-item>
            <el-select
              v-model="playerNames"
              placeholder="请选择对比运动员"
              size="small"
              @change="handleSelectPlayerNames"
              filterable
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in playerNamesOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="testDate"
              placeholder="请选择测试日期"
              size="small"
              @change="handleSelectTestDate"
              filterable
            >
              <el-option
                v-for="item in testDateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div><el-button id="return" type="primary" @click="returnView">返回运动员总览</el-button></div>
      </div>
      <div>
        <!-- <h2 align="center">测试成绩</h2> -->
        <el-table
          :data="mostRecentData"
          :header-cell-style="{'text-align': 'center'}"
        >
          <el-table-column prop="test_date" label="测试日期" align="center" width="100"></el-table-column>
          <el-table-column prop="athlete_name" label="姓名" align="center" width="80"></el-table-column>
          <el-table-column prop="test_rank" label="测试排名" align="center"></el-table-column>
          <el-table-column prop="cgy500m_result" label="测功仪500m成绩" align="center" width="105"></el-table-column>
          <el-table-column prop="cgy500m_pace" label="测功仪500m配速" align="center" width="105"></el-table-column>
          <el-table-column prop="cgy2000m_result" label="测功仪2000m成绩" align="center" width="115"></el-table-column>
          <el-table-column prop="cgy2000m_pace" label="测功仪2000m配速" align="center" width="115"></el-table-column>
          <el-table-column prop="cgy5000m_result" label="测功仪5000m成绩" align="center" width="115"></el-table-column>
          <el-table-column prop="cgy5000m_pace" label="测功仪5000m配速" align="center" width="115"></el-table-column>
          <el-table-column prop="cgy30min20str_result" label="测功仪30分钟20桨频成绩" align="center" width="115"></el-table-column>
          <el-table-column prop="cgy30min20str_pace" label="测功仪30分钟20桨频配速" align="center" width="115"></el-table-column>
          <el-table-column prop="cgy10str_result" label="测功仪10桨频成绩" align="center" width="110"></el-table-column>
          <el-table-column prop="cgy10str_pace" label="测功仪10桨频配速" align="center" width="110"></el-table-column>
          <el-table-column prop="squat_result" label="深蹲" align="center" width="60"></el-table-column>
          <el-table-column prop="press_result" label="卧推" align="center" width="60"></el-table-column>
          <el-table-column prop="pull_result" label="卧拉" align="center" width="60"></el-table-column>
        </el-table>
        <div class="compare__title">
          <div style="width: 280px; text-align: center">个人信息</div>
          <div style="width: 500px; text-align: center">个人指标</div>
          <div style="width: 500px; text-align: center">指标差距</div>
        </div>
        <div class="compare__main">
          <div class="compare__main-echarts" v-for="(item, index) in mostRecentData" :key="item">
            <div class="compare__main-echarts-info">
              <div class="compare__main-echarts-info-left">
                <el-avatar :size="130" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
              </div>
              <div class="compare__main-echarts-info-right">
                <div style="font-size: 20px">{{item.athlete_name}}</div>
                <div style="margin: 20px 0; color: rgba(144,144,144,0.8)">{{personInfo[index].sports_level || '一级运动员'}}</div>
                <div style="color: rgba(144,144,144,0.8)">{{getAge(personInfo[index].birthday)}}岁</div>
              </div>
            </div>
            <div :id="'compare_show' + index" style="width:500px;height:250px"></div>
            <div :id="'compare_avg_show' + index" style="width:500px;height:250px"></div>
          </div>
          <!-- <div class="compare-wrapper-echarts" id="compare_show1" style="width:800px;height:400px"></div>
          <div class="compare-wrapper-echarts" id="compare_show2" style="width:800px;height:400px"></div> -->
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import myAxios from '@/utils/request'
import * as echarts from 'echarts'
import { getAge } from '@/utils/getAge'
import { formatDate } from '@/utils/formatDate'
// import { formatBySpilt } from '@/utils/formatDate'
const NAMEMAP = {
  cgy500m_score: '测功仪500m',
  cgy2000m_score: '测功仪2000m',
  cgy5000m_score: '测功仪5000m',
  cgy30min20str_score: '测功仪30分钟/20桨频',
  cgy10str_score: '测功仪10桨',
  strength_score: '力量'
}
export default {
  data () {
    return {
      ids: [],
      data: [],
      tableData: [],
      test_dates: [],
      mostRecentData: [],
      avgData: {},
      personInfo: [],
      playerNames: [],
      playerNamesOptions: [],
      testDate: '',
      testDateOptions: []
    }
  },
  created () {
    this.ids = this.$route.params.ids
  },
  mounted () {
    // this.getTestDataByIds()
    this.getTableData()
    this.getPersonInfo()
    this.getAllTableData()
    // this.setCompareChart1()
  },
  methods: {
    setHeader () {
      return 'width: 20px'
    },
    handleSelectPlayerNames () {
      this.ids = this.playerNames
      this.getTableData()
      this.getPersonInfo()
    },
    handleSelectTestDate () {
      // this.ids = this.playerNames
      this.getTableData()
      this.getPersonInfo()
    },
    getAge (d) {
      return getAge(formatDate(d))
    },
    getPersonInfo () {
      const requests = this.ids.map(async (id) => {
        const res = await myAxios.get('/list/getPersonInfoByAthleteId', {
          params: {
            id
          }
        })
        return res.data[0]
      })
      Promise.all(requests)
        .then((results) => {
          this.personInfo = results
        }).then(() => {
          this.mostRecentData.forEach((chartData, index) => {
            this.setCompareChart(index, chartData)
            this.setCompareAvgChart(index, chartData)
          })
        })
        .catch((error) => {
          console.log('报错:' + error)
        })
    },
    returnView () {
      this.$router.push('/label')
    },
    getTableData () {
      this.tableData = []
      const ids = this.ids
      myAxios.get('/compare/getTableData', {
        params: {
          ids
        }
      }).then(res => {
        this.tableData = res.data
        console.log(res.data)
        let mostRecentDate
        let tmp = Infinity
        this.tableData.forEach(item => {
          if (new Date() - new Date(item.test_date) < tmp) {
            tmp = new Date() - new Date(item.test_date)
            mostRecentDate = item.test_date
          }
          item.test_date = item.test_date.split('T')[0]
        })
        if (this.testDate.length === 0) this.testDate = mostRecentDate.split('T')[0]
        this.mostRecentData = this.tableData.filter(item => item.test_date === this.testDate)
        this.playerNames = Array.from(new Set(this.tableData.map(item => item.athlete_id)))
        let sumRes = {
          cgy500m_score: 0,
          cgy2000m_score: 0,
          cgy5000m_score: 0,
          cgy30min20str_score: 0,
          cgy10str_score: 0,
          strength_score: 0
        }
        this.mostRecentData.forEach(item => {
          sumRes['cgy500m_score'] += Number(item.cgy500m_score)
          sumRes['cgy2000m_score'] += Number(item.cgy2000m_score)
          sumRes['cgy5000m_score'] += Number(item.cgy5000m_score)
          sumRes['cgy30min20str_score'] += Number(item.cgy30min20str_score)
          sumRes['cgy10str_score'] += Number(item.cgy10str_score)
          sumRes['strength_score'] += Number(item.strength_score)
        })
        Object.keys(sumRes).forEach(key => {
          this.avgData[key] = parseFloat((sumRes[key] / this.mostRecentData.length).toFixed(1))
        })
      })
    },
    getAllTableData () {
      myAxios.get('/compare/getAllTableData').then(res => {
        const allTableData = res.data
        allTableData.forEach(item => {
          item.test_date = item.test_date.split('T')[0]
          this.test_dates.push(item.test_date)
        })
        const names = Array.from(new Set(allTableData.map(item => item.athlete_name)))
        const athleteIds = Array.from(new Set(allTableData.map(item => item.athlete_id)))
        this.playerNamesOptions = names.map((item, index) => {
          return {
            label: item,
            value: athleteIds[index]
          }
        })
        this.testDateOptions = Array.from(new Set(this.test_dates)).map(item => {
          return {
            label: item,
            value: item
          }
        })
      })
    },
    setCompareChart (index, chartData) {
      var chartDom = document.getElementById('compare_show' + index)
      var myChart = echarts.init(chartDom)
      myChart.clear()
      var option
      var tmpData = []
      for (let key in chartData) {
        if (key === 'cgy500m_score' || key === 'cgy2000m_score' || key === 'cgy5000m_score' || key === 'cgy30min20str_score' || key === 'cgy10str_score' || key === 'strength_score') {
          tmpData.push({
            name: NAMEMAP[key],
            value: Number(chartData[key])
          })
        }
      }
      option = {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            radius: [20, 60],
            data: tmpData,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      option && myChart.setOption(option)
    },
    setCompareAvgChart (index, chartData) {
      var chartDom = document.getElementById('compare_avg_show' + index)
      var myChart = echarts.init(chartDom)
      myChart.clear()
      var option
      const labelRight = {
        position: 'right'
      }
      var tmpData = []
      var dataName = []
      for (let key in chartData) {
        if (key === 'cgy500m_score' || key === 'cgy2000m_score' || key === 'cgy5000m_score' || key === 'cgy30min20str_score' || key === 'cgy10str_score' || key === 'strength_score') {
          dataName.push(NAMEMAP[key])
          let dif = Number((Number(chartData[key]) - this.avgData[key]).toFixed(1))
          if (dif < 0) {
            tmpData.push({
              value: dif,
              label: labelRight
            })
          } else {
            tmpData.push(dif)
          }
        }
      }
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: 80,
          bottom: 30
        },
        xAxis: {
          type: 'value',
          position: 'top',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'category',
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          data: dataName
        },
        series: [
          {
            name: '和平均相比',
            type: 'bar',
            stack: 'Total',
            label: {
              // show: true,
              formatter: '{b}'
            },
            itemStyle: {
              color: function (params) {
                return params.value >= 0 ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]) : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#f00000' },
                  { offset: 0.5, color: '#c01200' },
                  { offset: 1, color: '#c01200' }
                ])
              }
            },
            data: tmpData
          }
        ]
      }
      option && myChart.setOption(option)
    }
    // setCompareChart2 () {
    //   var chartDom = document.getElementById('compare_show2')
    //   var myChart = echarts.init(chartDom)
    //   myChart.clear()
    //   var option
    //   option = {
    //     title: {
    //       text: '测试成绩对比'
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'shadow'
    //       }
    //     },
    //     toolbox: {
    //       feature: {
    //         dataView: { show: true, readOnly: false },
    //         magicType: { show: true, type: ['line', 'bar'] },
    //         restore: { show: true },
    //         saveAsImage: { show: true }
    //       }
    //     },
    //     legend: {
    //       data: ['深蹲', '卧推', '卧拉']
    //     },
    //     grid: {
    //       left: '3%',
    //       right: '4%',
    //       bottom: '3%',
    //       containLabel: true
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: this.test_date,
    //       name: '日期'
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     series: [
    //       {
    //         name: '深蹲',
    //         type: 'line',
    //         stack: 'Total'
    //       },
    //       {
    //         name: '卧推',
    //         type: 'line',
    //         stack: 'Total'
    //       },
    //       {
    //         name: '卧拉',
    //         type: 'line',
    //         stack: 'Total'
    //       }]
    //   }

    //   option && myChart.setOption(option)
    // }
  }
}
</script>

<style lang='less' scoped>
.compare {
  &__wrapper {
    width: 100%;
  }
  &__topper {
    height: 600px;
    width: 100%;
    position: relative;
    &-img {
      height: 100%;
      background-image: url('../../assets/images/888.jpg');
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
      background: transparent linear-gradient(180deg,rgba(0,57,124,.1),rgba(0,44,94,.3) 22%,rgba(0,37,79,.5) 50%,#001d3e) 0 0 no-repeat padding-box;
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
        font-family: "Effra",Arial,sans-serif;
        font-style: italic;
        font-size: 50px;
        color: white;
        line-height: 75px;
      }
    }
  }
  &__title {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 20px 0;
    font-size: 24px;
    font-weight: 700;
  }
  &__main {
    &-echarts {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      height: 250px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
      margin: 5px 0;
      border-radius: 10px;
      &-info {
        width: 260px;
        height: 145px;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 20px;
        padding: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
        &-left {
          margin: 10px 20px;
        }
        &-right {
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
  }
}
.box-card {
  margin: 0 auto;
  width: 95%;
}
.compareChoose {
  &__model {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  &-filter {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
.compare-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 100%;
}
</style>
