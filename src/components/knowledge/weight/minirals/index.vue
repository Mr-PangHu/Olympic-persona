<template>
  <div class="Mini">
    <div id="Minirals" style="width: 1000px; height: 600px;"></div>
  </div>
</template>
<script>

export default {
  name: 'Mini',
  methods: {
    getRenderer () {
      // 基于准备好的dom，初始化echarts实例
      let Minirals = this.$echarts.init(document.getElementById('Minirals'))
      // 配置参数
      // const dates = ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06']
      let config = {
        title: {
          // text: "近一周各种关键营养素的摄入情况",
          // textStyle: {
          //   fontSize: "16px" // 设置标题文本大小
          // }
        },
        dataset: {
          source: [
            ['score', 'amount', 'product'],
            [89.3, 58212, '纤维素'],
            [57.1, 78254, '胡萝卜素'],
            [74.4, 41032, '视黄醇'],
            [50.1, 12755, '维生素B1'],
            [89.7, 20145, '维生素B2'],
            [68.1, 79146, '尼克酸'],
            [19.6, 91852, '维生素C'],
            [10.6, 101852, '维生素E'],
            [32.7, 20112, '钾']
          ]
        },
        grid: { containLabel: true },
        xAxis: { name: 'amount' },
        yAxis: { type: 'category' },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 10,
          max: 100,
          text: ['High Score', 'Low Score'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#65B581', '#FFCE34', '#FD665F']
          }
        },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            }
          }
        ]
      }
      // 设置参数
      Minirals.setOption(config)
    }
  },
  mounted () {
    this.getRenderer()
  }
}
</script>
