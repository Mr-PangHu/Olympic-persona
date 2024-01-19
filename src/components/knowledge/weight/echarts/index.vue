<template>
  <div class="home">
    <div id="EChart" style="width: 800px; height: 400px;"></div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Home',
  methods: {
    getRenderer () {
      // 基于准备好的dom，初始化echarts实例
      let EChart = this.$echarts.init(document.getElementById('EChart'))
      // 配置参数
      const dates = ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06']
      let config = {
        title: {
          text: '近一周各种关键营养素的摄入情况',
          textStyle: {
            fontSize: '16px' // 设置标题文本大小
          }
        },
        tooltip: {},
        xAxis: {
          type: 'time',
          axisLabel: {
            formatter: function (value) {
              return moment(value).format('MM-DD') // 格式化日期为所需格式
            }
          },
          data: dates.slice(0, dates.length - 1).map(date => moment(date).toDate()),
          boundaryGap: false // 取消轴线两端的留白
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'line',
            data: [5, 10, 20, 36, 10, 10, 20]
          }
        ],
        grid: {
          top: 50,
          x: 45,
          x2: 60,
          y: 80
        }
      }
      // 设置参数
      EChart.setOption(config)
    }
  },
  mounted () {
    this.getRenderer()
  }
}
</script>
