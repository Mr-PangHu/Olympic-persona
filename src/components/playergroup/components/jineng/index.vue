<template>
    <div class="jineng__wrapper">
        <div class="jineng__blood">
            <div class="jineng__blood-title">血液机能指标</div>
            <div class="jineng__blood-wrapper">
                <div class="jineng__blood-wrapper-echarts" id="blood_show1"></div>
                <div class="jineng__blood-wrapper-echarts" id="blood_show2"></div>
            </div>
        </div>
        <div class="jineng__body">
            <div class="jineng__body-title">身体成分</div>
            <div class="jineng__body-wrapper">
                <div class="jineng__body-wrapper-echarts" id="body_show"></div>
            </div>
        </div>
        <div class="jineng__youyang">
            <div class="jineng__youyang-title">有氧能力</div>
            <div class="jineng__youyang-wrapper">
                <div class="jineng__youyang-wrapper-echarts" id="youyang_show1"></div>
                <div class="jineng__youyang-wrapper-echarts" id="youyang_show2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted () {
    this.setBloodChart1()
    this.setBloodChart2()
    this.setBodyChart()
    this.setYouYangChart1()
    this.setYouYangChart2()
  },
  methods: {
    setBloodChart1 () {
      var chartDom = document.getElementById('blood_show1')
      var myChart = echarts.init(chartDom)
      var option

      option = {
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
          data: ['WBC(白细胞）', 'NEUT(中性细胞值)', 'LYMPH(淋巴细胞值)', 'EO(嗜酸性粒细胞)', 'BA(嗜碱性粒细胞)'],
          name: '×10^9/L',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 500]
          },
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '值',
            data: [5, 4.4, 2.1, 0.5, 0.6],
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
    },
    setBloodChart2 () {
      var chartDom = document.getElementById('blood_show2')
      var myChart = echarts.init(chartDom)
      var option

      option = {
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
          data: ['K+(钾)', 'Tca(总钙)', 'AHDL(高密度脂蛋白)', 'ALDL(低密度脂蛋白)', 'CHOL(胆固醇)', '空腹血糖', '餐后两小时血糖'],
          name: 'mmol/L',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 500]
          },
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '含量',
            data: [4.4, 2.4, 2.11, 2.5, 2.3, 5, 5.5],
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
    },
    setBodyChart () {
      var chartDom = document.getElementById('body_show')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          selectedMode: false
        },
        series: [
          {
            // name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            // adjust the start angle
            startAngle: 180,
            label: {
              show: true,
              formatter (param) {
                // correct the percentage
                return param.name + ' (' + param.percent * 2 + '%)'
              }
            },
            data: [
              { value: 70, name: '体重Weight' },
              { value: 7, name: '体脂肪量Body Fat Mass' },
              { value: 63, name: '去脂体重Free Fat Mass' },
              {
                // make an record to fill the bottom 50%
                value: 70 + 7 + 63,
                itemStyle: {
                  // stop the chart from rendering this piece
                  color: 'none',
                  decal: {
                    symbol: 'none'
                  }
                },
                label: {
                  show: false
                }
              }
            ]
          }
        ]
      }

      option && myChart.setOption(option)
    },
    setYouYangChart1 () {
      var chartDom = document.getElementById('youyang_show1')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        xAxis: {
          type: 'category',
          data: ['即刻血乳酸', '恢复1min血乳酸', '恢复3min血乳酸', '恢复10min血乳酸', '恢复15min血乳酸'],
          name: 'mmol/L',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [6, 4.4, 3.2, 1.3, 0.5],
            type: 'line',
            smooth: true
          }
        ]
      }

      option && myChart.setOption(option)
    },
    setYouYangChart2 () {
      var chartDom = document.getElementById('youyang_show2')
      var myChart = echarts.init(chartDom)
      var option

      option = {
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
          data: ['最大摄氧量', '最大二氧化碳排出量', '通气无氧阈VT1', '通气无氧阈VT2'],
          name: 'l/min',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '阈值',
            data: [3, 2, 2, 2.2],
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
  }
  &__blood {
    display: flex;
    flex-direction: column;
    width: 100%;
    &-title {
        font-size: 20px;
        font-weight: 700;
    }
    &-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        &-echarts {
            width: 600px;
            height: 400px;
        }
    }
  }
  &__body {
    display: flex;
    flex-direction: column;
    width: 100%;
    &-title {
        font-size: 20px;
        font-weight: 700;
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
        }
    }
  }
  &__youyang {
    display: flex;
    flex-direction: column;
    width: 100%;
    &-title {
        font-size: 20px;
        font-weight: 700;
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
        }
    }
  }
}
</style>
