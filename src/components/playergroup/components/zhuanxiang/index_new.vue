<template>
    <div class="zhuanxiang__wrapper">
        <div class="zhuanxiang__water">
            <div class="zhuanxiang__water-title">水上专项</div>
            <div class="zhuanxiang__water-wrapper">
                <div class="zhuanxiang__water-wrapper-echarts" id="water_show1"></div>
                <!-- <div class="zhuanxiang__water-wrapper-echarts" id="water_show2"></div>
                <div class="zhuanxiang__water-wrapper-echarts" id="water_show3"></div>
                <div class="zhuanxiang__water-wrapper-echarts" id="water_show4"></div> -->
            </div>
        </div>
        <!-- <div class="zhuanxiang__fuhe">
            <div class="zhuanxiang__fuhe-title">专项训练负荷强度</div>
            <div class="zhuanxiang__fuhe-wrapper">
                <div class="zhuanxiang__fuhe-wrapper-echarts" id="fuhe_show1"></div>
                <div class="zhuanxiang__fuhe-wrapper-echarts" id="fuhe_show2"></div>
            </div>
        </div> -->
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

      const yearCount = 7
      const categoryCount = 30
      const xAxisData = []
      const customData = []
      const legendData = []
      const dataList = []
      legendData.push('trend')
      const encodeY = []
      for (var i = 0; i < yearCount; i++) {
        legendData.push(2010 + i + '')
        dataList.push([])
        encodeY.push(1 + i)
      }
      for (i = 0; i < categoryCount; i++) {
        var val = Math.random() * 1000
        xAxisData.push('category' + i)
        var customVal = [i]
        customData.push(customVal)
        for (var j = 0; j < dataList.length; j++) {
          var value =
          j === 0
            ? echarts.number.round(val, 2)
            : echarts.number.round(
              Math.max(0, dataList[j - 1][i] + (Math.random() - 0.5) * 200),
              2
            )
          dataList[j].push(value)
          customVal.push(value)
        }
      }
      option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: legendData
        },
        dataZoom: [
          {
            type: 'slider',
            start: 50,
            end: 70
          },
          {
            type: 'inside',
            start: 50,
            end: 70
          }
        ],
        xAxis: {
          data: xAxisData
        },
        yAxis: {},
        series: [
          {
            type: 'custom',
            name: 'trend',
            renderItem: function (params, api) {
              var xValue = api.value(0)
              var currentSeriesIndices = api.currentSeriesIndices()
              var barLayout = api.barLayout({
                barGap: '30%',
                barCategoryGap: '20%',
                count: currentSeriesIndices.length - 1
              })
              var points = []
              for (var i = 0; i < currentSeriesIndices.length; i++) {
                var seriesIndex = currentSeriesIndices[i]
                if (seriesIndex !== params.seriesIndex) {
                  var point = api.coord([xValue, api.value(seriesIndex)])
                  point[0] += barLayout[i - 1].offsetCenter
                  point[1] -= 20
                  points.push(point)
                }
              }
              var style = api.style({
                stroke: api.visual('color'),
                fill: 'none'
              })
              return {
                type: 'polyline',
                shape: {
                  points: points
                },
                style: style
              }
            },
            itemStyle: {
              borderWidth: 2
            },
            encode: {
              x: 0,
              y: encodeY
            },
            data: customData,
            z: 100
          },
          ...dataList.map(function (data, index) {
            return {
              type: 'bar',
              animation: false,
              name: legendData[index + 1],
              itemStyle: {
                opacity: 0.5
              },
              data: data
            }
          })
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
    width: 100%;
  }
  &__water {
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
            width: 2000px;
            height: 800px;
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
            height: 500px;
        }
    }
  }
}
</style>
