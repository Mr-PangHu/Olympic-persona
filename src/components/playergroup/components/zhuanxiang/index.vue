<template>
    <div class="zhuanxiang__wrapper">
        <div class="zhuanxiang__water">
            <div class="zhuanxiang__water-title">水上专项</div>
            <div class="zhuanxiang__water-wrapper">
                <div class="zhuanxiang__water-wrapper-echarts" id="water_show1"></div>
                <div class="zhuanxiang__water-wrapper-echarts" id="water_show2"></div>
                <div class="zhuanxiang__water-wrapper-echarts" id="water_show3"></div>
                <div class="zhuanxiang__water-wrapper-echarts" id="water_show4"></div>
            </div>
        </div>
        <div class="zhuanxiang__fuhe">
            <div class="zhuanxiang__fuhe-title">专项训练负荷强度</div>
            <div class="zhuanxiang__fuhe-wrapper">
                <div class="zhuanxiang__fuhe-wrapper-echarts" id="fuhe_show1"></div>
                <div class="zhuanxiang__fuhe-wrapper-echarts" id="fuhe_show2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted () {
    this.setWaterChart1()
    this.setWaterChart2()
    this.setWaterChart3()
    this.setWaterChart4()
    this.setFuHeChart1()
    this.setFuHeChart2()
  },
  methods: {
    setWaterChart1 () {
      var chartDom = document.getElementById('water_show1')
      var myChart = echarts.init(chartDom)
      var option

      option = {
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
          data: ['2022/11/3', '2022/12/8', '2023/1/6', '2023/2/8', '2023/3/9', '2023/4/6'],
          name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          min: 30,
          name: '桨频（桨/min）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 10, 0]
          }
        },
        series: [
          {
            data: [35, 37, 36, 34, 38, 39],
            name: '桨频（桨/min）',
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
    setWaterChart2 () {
      var chartDom = document.getElementById('water_show2')
      var myChart = echarts.init(chartDom)
      var option

      option = {
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
          data: ['2022/11/3', '2022/12/8', '2023/1/6', '2023/2/8', '2023/3/9', '2023/4/6'],
          name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          min: 45,
          name: '拉桨最大力量（N）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 10, 0]
          }
        },
        series: [
          {
            data: [50, 51, 53, 50, 55, 52],
            name: '拉桨最大力量（N）',
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
    setWaterChart3 () {
      var chartDom = document.getElementById('water_show3')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '拉桨功率',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['2022/11/3', '2022/12/8', '2023/1/6', '2023/2/8', '2023/3/9', '2023/4/6'],
          name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 1000]
          },
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          min: 350,
          max: 550,
          name: '拉桨功率（W）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 20, 0]
          }
        },
        series: [
          {
            data: [360, 400, 450, 420, 500, 480],
            type: 'line',
            smooth: true
          }
        ]
      }

      option && myChart.setOption(option)
    },
    setWaterChart4 () {
      var chartDom = document.getElementById('water_show4')
      var myChart = echarts.init(chartDom)
      var option

      option = {
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
          data: ['2022/11/3', '2022/12/8', '2023/1/6', '2023/2/8', '2023/3/9', '2023/4/6'],
          name: '训练日期',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          min: 270,
          max: 450,
          name: '每桨做功（N）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 15, 0]
          }
        },
        series: [
          {
            data: [300, 350, 420, 440, 410, 400],
            name: '每桨做功（N）',
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
    setFuHeChart1 () {
      var chartDom = document.getElementById('fuhe_show1')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '乳酸浓度',
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
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['即刻乳酸', '1min乳酸', '3min乳酸', '5min乳酸', '7min乳酸', '10min乳酸']
        },
        yAxis: {
          type: 'value',
          name: '乳酸（mmol/L）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 20, 0]
          }
        },
        series: [
          {
            name: '乳酸浓度',
            type: 'line',
            data: [1.47, 2.8, 4.5, 6.5, 7.8, 9.4, 9.8],
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
    },
    setFuHeChart2 () {
      var chartDom = document.getElementById('fuhe_show2')
      var myChart = echarts.init(chartDom)
      var option

      option = {
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
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['即刻心率', '1min心率', '3min心率']
        },
        yAxis: {
          type: 'value',
          min: 140,
          name: '心率（bpm）',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 20, 0]
          }
        },
        series: [
          {
            name: '心率',
            type: 'line',
            data: [148, 160, 180],
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
    }
  }
}
</script>

<style lang='less' scoped>
.zhuanxiang {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
  &__water {
    display: flex;
    flex-direction: column;
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
  &__fuhe {
    display: flex;
    flex-direction: column;
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
}
</style>
