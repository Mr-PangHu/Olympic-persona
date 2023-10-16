<template>
    <div class="shangbing__wrapper">
        <div class="shangbing__FMS">
            <div class="shangbing__FMS-title">FMS测试</div>
            <div class="shangbing__FMS-point">综合得分：15</div>
            <div class="shangbing__FMS-wrapper">
                <div class="shangbing__FMS-wrapper-echarts" id="FMS_show"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted () {
    this.setFMSChart()
  },
  methods: {
    setFMSChart () {
      var chartDom = document.getElementById('FMS_show')
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
          data: ['深蹲得分', '跨栏步左侧', '跨栏步右侧', '跨栏步得分', '线性弓步左侧', '线性弓步右侧', '线性弓步得分', '肩部灵活性左侧', '肩部灵活性右侧', '肩部灵活性得分', '主动直腿抬高左侧', '主动直腿抬高右侧', '主动直腿抬高得分', '躯干稳定俯卧撑得分', '旋转稳定性左侧', '旋转稳定性右侧', '旋转稳定性得分'],
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '得分',
            data: [2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 1, 1, 3, 2, 2, 2],
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
.shangbing {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
  &__FMS {
    display: flex;
    flex-direction: column;
    width: 100%;
    &-title {
        font-size: 20px;
        font-weight: 700;
    }
    &-point {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 700;
    }
    &-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        &-echarts {
            width: 1000px;
            height: 400px;
        }
    }
  }
}
</style>
