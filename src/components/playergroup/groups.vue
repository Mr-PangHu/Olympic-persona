<template>
  <div>
    <h2 align="center">测试成绩</h2>
    <el-table
    :data="tableData"
    style="width: 100%" align="center">
    <el-table-column
      prop="test_date"
      label="测试日期"
      width="100">
    </el-table-column>
    <el-table-column
      prop="athlete_name"
      label="姓名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="test_rank"
      label="测试排名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="cgy500m_result"
      label="测功仪500m成绩"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy500m_pace"
      label="测功仪500m配速"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy2000m_result"
      label="测功仪2000m成绩"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy2000m_pace"
      label="测功仪2000m配速"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy5000m_result"
      label="测功仪5000m成绩"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy5000m_pace"
      label="测功仪5000m配速"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy30min20str_result"
      label="测功仪30分钟20桨频成绩"
      width="190">
    </el-table-column>
    <el-table-column
      prop="cgy30min20str_pace"
      label="测功仪30分钟20桨频配速"
      width="190">
    </el-table-column>
    <el-table-column
      prop="cgy10str_result"
      label="测功仪10桨频成绩"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy10str_pace"
      label="测功仪10桨频配速"
      width="140">
    </el-table-column>
    <el-table-column
      prop="squat_result"
      label="深蹲"
      width="60">
    </el-table-column>
    <el-table-column
      prop="press_result"
      label="卧推"
      width="60">
    </el-table-column>
    <el-table-column
      prop="pull_result"
      label="卧拉"
      width="60">
    </el-table-column>
    </el-table>
    <div class="compare-wrapper">
      <div class="compare-wrapper-echarts" id="compare_show1" style="width:800px;height:400px"></div>
      <div class="compare-wrapper-echarts" id="compare_show2" style="width:800px;height:400px"></div>
    </div>
  </div>
</template>

<script>
import myAxios from '@/utils/request'
import * as echarts from 'echarts'
// import { formatBySpilt } from '@/utils/formatDate'
export default {
  data () {
    return {
      ids: [],
      data: [],
      tableData: [],
      test_dates: [],
      athlete_names: [],
      test_ranks: [],
      cgy500m_results: [],
      cgy2000m_results: [],
      cgy5000m_results: [],
      cgy30min20str_results: [],
      cgy10str_results: [],
      squat_results: [],
      press_results: [],
      pull_results: []
    }
  },
  created () {
    this.ids = this.$route.params.ids
    console.log(this.ids)
  },
  mounted () {
    // this.getTestDataByIds()
    this.getTableData()
    this.setCompareChart1()
  },
  methods: {
    // getTestDataByIds () {
    //   this.data = []
    //   const ids = this.ids
    //   myAxios.get('/compare/getTestDataById', {
    //     params: {
    //       ids
    //     }
    //   }).then(res => {
    //     this.data = res.data
    //     console.log(this.data)
    //   })
    // },
    getTableData () {
      this.tableData = []
      const ids = this.ids
      myAxios.get('/compare/getTableData', {
        params: {
          ids
        }
      }).then(res => {
        this.tableData = res.data
        this.tableData.forEach(item => {
          item.test_date = item.test_date.split('T')[0]
          this.test_dates.push(item.test_date)
        })
        console.log(this.tableData)
      })
    },
    setCompareChart1 () {
      var chartDom = document.getElementById('compare_show1')
      var myChart = echarts.init(chartDom)
      myChart.clear()
      var option
      option = {
        title: {
          text: '测试成绩对比'
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
        legend: {
          data: ['测功仪500m', '测功仪2000m', '测功仪5000m', '测功仪30分钟20桨频', '测功仪10桨频']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.test_date,
          name: '日期'
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '测功仪500m',
            type: 'line',
            stack: 'Total'
          },
          {
            name: '测功仪2000m',
            type: 'line',
            stack: 'Total'
          },
          {
            name: '测功仪5000m',
            type: 'line',
            stack: 'Total'
          },
          {
            name: '测功仪30分钟20桨频',
            type: 'line',
            stack: 'Total'
          },
          {
            name: '测功仪10桨频',
            type: 'line',
            stack: 'Total'
          }]
      }

      option && myChart.setOption(option)
    },
    setCompareChart2 () {
      var chartDom = document.getElementById('compare_show2')
      var myChart = echarts.init(chartDom)
      myChart.clear()
      var option
      option = {
        title: {
          text: '测试成绩对比'
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
        legend: {
          data: ['深蹲', '卧推', '卧拉']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.test_date,
          name: '日期'
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '深蹲',
            type: 'line',
            stack: 'Total'
          },
          {
            name: '卧推',
            type: 'line',
            stack: 'Total'
          },
          {
            name: '卧拉',
            type: 'line',
            stack: 'Total'
          }]
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
  .main img{
    width: 100%;
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
