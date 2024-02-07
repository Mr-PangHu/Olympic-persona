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
      let config = {
        xAxis: {
          type: 'category',
          data: ['维生素B1', '维生素B2', '烟酸', '维生素C', '维生素E', '维生素A', '泛酸', '生物酸']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              this.$store.state.foodtrack.mainIngredient.nutrientValues.vitaminB1,
              {
                value: this.$store.state.foodtrack.mainIngredient.nutrientValues.vitaminB2,
                itemStyle: {
                  color: '#a90000'
                }
              },
              {
                value: this.$store.state.foodtrack.mainIngredient.nutrientValues.niacin,
                itemStyle: {
                  color: '#43766C'
                }
              },
              {
                value: this.$store.state.foodtrack.mainIngredient.nutrientValues.vitaminC,
                itemStyle: {
                  color: '#6962AD'
                }
              },
              {
                value: this.$store.state.foodtrack.mainIngredient.nutrientValues.vitaminE,
                itemStyle: {
                  color: '#96E9C6'
                }
              },
              {
                value: this.$store.state.foodtrack.mainIngredient.nutrientValues.retinol,
                itemStyle: {
                  color: '#B19470'
                }
              },
              {
                value: this.$store.state.foodtrack.mainIngredient.nutrientValues.pantothenicAcid,
                itemStyle: {
                  color: '#F8FAE5'
                }
              },
              {
                value: this.$store.state.foodtrack.mainIngredient.nutrientValues.biotin,
                itemStyle: {
                  color: '#76453B'
                }
              }
            ],
            type: 'bar'
          }
        ]
      };
      // 设置参数
      Minirals.setOption(config)
    }
  },
  mounted () {
    this.getRenderer()
  }
}
</script>
