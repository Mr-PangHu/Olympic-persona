<template>
  <div class="home">
    <div id="EChart" style="width: 800px; height: 400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    getRenderer () {
      // 基于准备好的dom，初始化echarts实例
      let EChart = this.$echarts.init(document.getElementById('EChart'))
      // 配置参数
      let config = {
        name: '基本营养',
        xAxis: {
          type: 'category',
          data: ['DHA', '饱和脂肪', '反式脂肪', '单不饱和脂肪', '多不饱和脂肪']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              this.$store.state.foodtrack.mainIngredient.ingredient.dha,
              {
                value: this.$store.state.foodtrack.mainIngredient.ingredient.saturatedFat,
                itemStyle: {
                  color: '#a90000'
                }
              },
              {
                value: this.$store.state.foodtrack.mainIngredient.ingredient.transFat,
                itemStyle: {
                  color: '#43766C'
                }
              },
              {
                value: this.$store.state.foodtrack.mainIngredient.ingredient.monounsaturatedFat,
                itemStyle: {
                  color: '#6962AD'
                }
              },
              {
                value: this.$store.state.foodtrack.mainIngredient.ingredient.polyunsaturatedFat,
                itemStyle: {
                  color: '#96E9C6'
                }
              }
            ],
            type: 'bar'
          }
        ]
      };
      // 设置参数
      EChart.setOption(config)
    }
  },
  mounted () {
    this.getRenderer()
  }
}
</script>
