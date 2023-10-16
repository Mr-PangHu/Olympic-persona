<template>
    <div class="tineng__wrapper">
        <div class="tineng__wsy">
            <div class="tineng__wsy-title">体能指标</div>
            <div class="tineng__wsy-wrapper">
                <div class="tineng__wsy-wrapper-echarts" id="tineng_show1"></div>
                <div class="tineng__wsy-wrapper-echarts" id="tineng_show2"></div>
                <div class="tineng__wsy-wrapper-echarts" id="tineng_show3"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted () {
    this.setTiNengChart1()
    this.setTiNengChart2()
    this.setTiNengChart3()
  },
  methods: {
    setTiNengChart1 () {
      var chartDom = document.getElementById('tineng_show1')
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
          data: ['卧推1RM', '卧推3RM', '深蹲1RM', '深蹲3RM', '硬拉1RM', '硬拉3RM'],
          name: 'kg',
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
            name: '值',
            data: [100, 87.5, 140, 120, 160, 130],
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
    setTiNengChart2 () {
      var chartDom = document.getElementById('tineng_show2')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        xAxis: {
          type: 'category',
          data: ['三级跳远(单腿)', '三级跳远(双腿)', '立定跳远(单腿)', '立定跳远(双腿)', '垂直纵跳'],
          name: 'cm',
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
            data: [300, 450, 200, 270, 75],
            type: 'line',
            smooth: true
          }
        ]
      }

      option && myChart.setOption(option)
    },
    setTiNengChart3 () {
      var chartDom = document.getElementById('tineng_show3')
      var myChart = echarts.init(chartDom)
      var option

      option = {
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
          data: ['测功仪500m', '测功仪2000m', '测功仪5000m', '测功仪30min-20SR'],
          name: 'mm:ss.00',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [10, 0, 0, 1000]
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
            data: [90, 390, 1030, 100],
            type: 'line',
            smooth: true,
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
.tineng {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
  &__wsy {
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
        #tineng_show3 {
            width: 1300px;
        }
        &-echarts {
            width: 500px;
            height: 400px;
        }
    }
  }
}
</style>
