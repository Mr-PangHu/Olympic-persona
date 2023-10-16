<template>
  <!-- 页面主体区域 -->
  <!-- <span></span>主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容主体内容 -->
  <div>
    <div class="container-fluid">
      <!-- <el-row class="curve-pie" :gutter="10">
        <el-col :sm="16" :xs="16">
          <div class="gragh_pannel" id="curve_show"></div>
        </el-col>
        <el-col :sm="8" :xs="8">
          <div class="gragh_pannel" id="pie_show"></div>
        </el-col>
      </el-row> -->
      <el-row class="curve-pie" :gutter="10">
        <el-col :sm="8" :xs="8">
          <div class="gragh_pannel" id="height_show"></div>
        </el-col>
        <el-col :sm="8" :xs="8">
          <div class="gragh_pannel" id="pie_show"></div>
        </el-col>
        <el-col :sm="8" :xs="8">
          <div class="gragh_pannel" id="pie_show"></div>
        </el-col>
      </el-row>
    </div>

    <div class="container-fluid">
      <el-row class="curve-pie" :gutter="10">
        <el-col :sm="8" :xs="8">
          <div class="gragh_pannel" id="gender_show"></div>
        </el-col>
        <el-col :sm="8" :xs="8">
          <div class="gragh_pannel" id="map_show"></div>
        </el-col>
        <el-col :sm="8" :xs="8">
          <div class="gragh_pannel" id="pie_show"></div>
        </el-col>
      </el-row>
    </div>

    <!-- <div class="container-fluid">
      <div class="column_pannel" id="column_show"></div>
    </div>
    <div class="container-fluid">
      <el-row class="curve-pie" :gutter="10">
        <el-col :sm="12" :xs="12">
          <div class="map_pannel" id="map_show"></div>
        </el-col>
        <el-col :sm="12" :xs="12">
          <div class="map_pannel" id="leida_show"></div>
        </el-col>
      </el-row>
    </div>
    <div class="container-fluid">
      <div class="pannel_test" id="test_show"></div>
    </div>
    <div class="container-fluid">
      <el-row class="curve-pie" :gutter="10">
        <el-col :sm="12" :xs="12">
          <div class="pannel_test1" id="test1_show"></div>
        </el-col>
        <el-col :sm="12" :xs="12">
          <div class="pannel_test1" id="test2_show"></div>
        </el-col>
      </el-row>
    </div> -->
  </div>
</template>

<script>
// import axios from 'axios'
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
export default {
  data () {
    return {
      info: []
    }
  },
  name: 'my-homepage',
  mounted () {
    this.setHeightChart()
    this.setGenderChart()
    this.setMapChart()
    // this.all()
    // // 面积图
    // this.setCurveChartFn()
    // // 饼状图
    // this.picChartFn()
    // // 柱状图
    // this.columnChartFn()
    // // 地图
    // this.mapChartFn()
    // // 雷达图
    // this.leidaChartFn()
    // // 测试数据库连接
    // this.testChartFn()
    // // 仪表盘
    // this.test1ChartFn()
    // this.test2ChartFn()
  },
  methods: {
    setHeightChart () {
      const heightChart = echarts.init(document.getElementById('height_show'))
      const seriesLabel = {
        show: true
      }
      const heightOption = {
        title: {
          text: '运动员身高分布图',
          top: 10,
          left: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['最高值', '最低值', '平均值'],
          left: 180,
          top: 10
        },
        grid: {
          left: 90
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'value',
          name: 'CM',
          axisLabel: {
            formatter: '{value}'
          },
          min: 170,
          max: 200,
          interval: 5
        },
        yAxis: {
          type: 'category',
          inverse: true,
          data: ['MALE', 'FEMALE'],
          axisLabel: {
            margin: 20
          }
        },
        series: [
          {
            name: '最高值',
            type: 'bar',
            data: [195.0, 181.8],
            label: seriesLabel,
            markPoint: {
              symbolSize: 1,
              symbolOffset: [0, '50%'],
              label: {
                formatter: '{a|{a}\n}{b|{b} }{c|{c}}',
                backgroundColor: 'rgb(242,242,242)',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                padding: [4, 10],
                lineHeight: 26,
                position: 'right',
                distance: 20,
                rich: {
                  a: {
                    align: 'center',
                    color: '#fff',
                    fontSize: 18,
                    textShadowBlur: 2,
                    textShadowColor: '#000',
                    textShadowOffsetX: 0,
                    textShadowOffsetY: 1,
                    textBorderColor: '#333',
                    textBorderWidth: 2
                  },
                  b: {
                    color: '#333'
                  },
                  c: {
                    color: '#ff8811',
                    textBorderColor: '#000',
                    textBorderWidth: 1,
                    fontSize: 22
                  }
                }
              }
            }
          },
          {
            name: '最低值',
            type: 'bar',
            label: seriesLabel,
            data: [187.4, 174.6]
          },
          {
            name: '平均值',
            type: 'bar',
            label: seriesLabel,
            data: [191.2, 178.2]
          }
        ]
      }
      heightChart.setOption(heightOption)
    },

    setGenderChart () {
      const genderChart = echarts.init(document.getElementById('gender_show'))
      const genderOption = {
        title: {
          text: '运动员性别分布图',
          left: 'center',
          top: 10
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} 人 ({d}%)'
        },
        legend: {
          left: 'center',
          top: 50
        },
        series: [
          {
            name: '运动员性别分布图',
            type: 'pie',
            radius: '50%',
            selectedMode: 'single',
            top: 50,
            data: [
              { value: 48, name: '男子公开级' },
              { value: 35, name: '男子轻量级' },
              { value: 23, name: '女子公开级' },
              { value: 25, name: '女子轻量级' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      genderChart.setOption(genderOption)
    },

    setMapChart () {
      const MapChart = echarts.init(document.getElementById('map_show'))
      const data = [
        { name: '舟山', value: 100 },
        { name: '青岛', value: 150 },
        { name: '上海', value: 200 },
        { name: '连云港', value: 100 },
        { name: '杭州', value: 100 },
        { name: '武汉', value: 150 }
      ]
      const geoCoordMap = {
        舟山: [122.207216, 29.985295],
        青岛: [120.33, 36.07],
        上海: [121.48, 31.22],
        连云港: [119.16, 34.59],
        杭州: [120.19, 30.26],
        武汉: [114.31, 30.52]
      }
      const convertData = function (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      }
      const mapOption = {
        title: {
          text: '全国赛艇训练基地分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return params.data.name + ' 规模：' + params.data.value[2] + '人'
          }
        },
        bmap: {
          center: [121.48, 31.22],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: 'water',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'land',
                elementType: 'all',
                stylers: {
                  color: '#f3f3f3'
                }
              },
              {
                featureType: 'railway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'highway',
                elementType: 'all',
                stylers: {
                  color: '#fdfdfd'
                }
              },
              {
                featureType: 'highway',
                elementType: 'labels',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'poi',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'green',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'subway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'manmade',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'local',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'labels',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'boundary',
                elementType: 'all',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'building',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'label',
                elementType: 'labels.text.fill',
                stylers: {
                  color: '#999999'
                }
              }
            ]
          }
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data),
            symbolSize: function (val) {
              return val[2] / 10
            },
            encode: {
              value: 2
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: convertData(
              data
                .sort(function (a, b) {
                  return b.value - a.value
                })
                .slice(0, 6)
            ),
            symbolSize: function (val) {
              return val[2] / 10
            },
            encode: {
              value: 2
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: '#333'
            },
            emphasis: {
              scale: true
            },
            zlevel: 1
          }
        ]
      }
      MapChart.setOption(mapOption)
    }
    // all () {
    //   axios.get('http://127.0.0.1/list/all').then(res => {
    //     // console.log(res.data);
    //     this.info = res.data
    //   }).catch(err => {
    //     console.log('获取数据失败' + err)
    //   })
    // },
    // // 设置面积图
    // setCurveChartFn () {
    //   // 基于准备好的dom，初始化echarts实例
    //   const curveChart = echarts.init(document.getElementById('curve_show'))

    //   // 数据源(模拟后台返回的数据)
    //   const aListAll = [
    //     { count: 3, date: '2019-04-13' },
    //     { count: 5, date: '2019-04-14' },
    //     { count: 7, date: '2019-04-15' },
    //     { count: 8, date: '2019-04-16' },
    //     { count: 6, date: '2019-04-17' },
    //     { count: 7, date: '2019-04-18' },
    //     { count: 8, date: '2019-04-19' },
    //     { count: 6, date: '2019-04-20' },
    //     { count: 7, date: '2019-04-21' },
    //     { count: 9, date: '2019-04-22' },
    //     { count: 9, date: '2019-04-23' },
    //     { count: 10, date: '2019-04-24' },
    //     { count: 10, date: '2019-04-25' },
    //     { count: 11, date: '2019-04-26' },
    //     { count: 12, date: '2019-04-27' },
    //     { count: 10, date: '2019-04-28' },
    //     { count: 13, date: '2019-04-29' },
    //     { count: 14, date: '2019-04-30' },
    //     { count: 20, date: '2019-05-01' },
    //     { count: 18, date: '2019-05-02' },
    //     { count: 16, date: '2019-05-03' },
    //     { count: 11, date: '2019-05-04' },
    //     { count: 8, date: '2019-05-05' },
    //     { count: 8, date: '2019-05-06' },
    //     { count: 7, date: '2019-05-07' },
    //     { count: 6, date: '2019-05-08' },
    //     { count: 5, date: '2019-05-09' },
    //     { count: 4, date: '2019-05-10' },
    //     { count: 4, date: '2019-05-11' },
    //     { count: 3, date: '2019-05-12' }
    //   ]

    //   // 但是图标要求直接给数字的值, 所以要把对象的值取出来形成2个只有值的数组
    //   const aCount = []
    //   const aDate = []

    //   for (let i = 0; i < aListAll.length; i++) {
    //     aCount.push(aListAll[i].count)
    //     aDate.push(aListAll[i].date)
    //   }

    //   // 面积图的echarts配置项(参考文档复制)
    //   const chartopt = {
    //     title: {
    //       text: 'XXX体脂率变化图', // 标题
    //       left: 'center', // 位置居中
    //       top: '10' // 标题距离容器顶部px
    //     },
    //     tooltip: { // 提示框组件
    //       trigger: 'axis' // 坐标轴触发(鼠标放在坐标轴就能出提示框)
    //     },
    //     legend: { // 图例组件(每种颜色的意思)
    //       data: ['体脂率'], // 图例文字解释(要和series里name对应)
    //       top: '40' // 距离容器顶部px
    //     },
    //     toolbox: { // 工具栏
    //       show: true, // 要显示
    //       padding: 5,
    //       feature: { // 各工具配置项
    //         mark: { show: true }, // 辅助线开关
    //         dataView: { show: true, readOnly: false }, // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
    //         magicType: { show: true, type: ['line', 'bar'] }, // 动态类型切换
    //         restore: { show: true }, // 配置项还原
    //         saveAsImage: { show: true } // 点击保存下载图片
    //       }
    //     },
    //     xAxis: [ // 水平轴显示
    //       {
    //         name: '日',
    //         type: 'category',
    //         boundaryGap: false, // 坐标轴两边留白策略 (不留白)
    //         data: aDate // 水平轴上的数字数据 (时间)
    //       }
    //     ],
    //     yAxis: [ // 垂直轴显示
    //       {
    //         name: '体脂率（%）',
    //         type: 'value' // 以series里的data值做划分段
    //       }
    //     ],
    //     series: [ // 系列(控制图表类型和数据)
    //       {
    //         name: '体脂率',
    //         type: 'line', // 折线图
    //         smooth: true, // 是否平滑视觉引导线，默认不平滑，可以设置成 true 平滑显示
    //         areaStyle: { type: 'default' }, // 区域填充样式。设置后显示成区域面积图。
    //         itemStyle: { color: '#f80', lineStyle: { color: '#f80' } }, // 折线拐点标志的样式。
    //         data: aCount // 真正数据源(用下标和x轴数组对应)
    //       }
    //     ],
    //     grid: { // 直角坐标系内绘图网格
    //       show: true,
    //       x: 50, // grid 组件离容器偏移量, 左侧
    //       x2: 50, // 右侧
    //       y: 80, // 上
    //       height: 220 // 高度
    //     }
    //   }

    //   curveChart.setOption(chartopt)
    // },
    // // 设置饼状图
    // picChartFn () {
    //   const oPie = echarts.init(document.getElementById('pie_show'))
    //   const oPieopt = {
    //     title: {
    //       top: 10,
    //       text: '竞技成绩影响因素',
    //       x: 'center'
    //     },
    //     tooltip: {
    //       trigger: 'item', // 在图形上才会触发提示
    //       formatter: '{a} <br/>{b} : {c} ({d}%)' // 提示的文字显示的格式
    //       // a: 系列名
    //       // b: 数据名
    //       // c: 数值
    //       // d: 百分比 (只有饼状图生效)
    //     },
    //     color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565'], // 系列颜色
    //     legend: { // 图例组件
    //       x: 'center',
    //       top: 65,
    //       data: ['身高', '腿围', '体脂率', '桨频'] // 每个部分对应的数据名(要和series里name对应)
    //     },
    //     toolbox: { // 工具箱
    //       show: true,
    //       x: 'center',
    //       top: 35,
    //       feature: {
    //         mark: { show: true },
    //         dataView: { show: true, readOnly: false },
    //         magicType: {
    //           show: true,
    //           type: ['pie', 'funnel'],
    //           option: {
    //             funnel: {
    //               x: '25%',
    //               width: '50%',
    //               funnelAlign: 'left',
    //               max: 1548
    //             }
    //           }
    //         },
    //         restore: { show: true },
    //         saveAsImage: { show: true }
    //       }
    //     },
    //     series: [
    //       {
    //         name: '访问来源',
    //         type: 'pie',
    //         radius: ['45%', '60%'],
    //         center: ['50%', '65%'],
    //         data: [
    //           { value: 300, name: '身高' },
    //           { value: 100, name: '腿围' },
    //           { value: 260, name: '体脂率' },
    //           { value: 180, name: '桨频' }
    //         ]
    //       }
    //     ]
    //   }
    //   oPie.setOption(oPieopt)
    // },
    // // 设置底部柱状图
    // columnChartFn () {
    //   const oColumn = echarts.init(document.getElementById('column_show'))
    //   const oColumnopt = {
    //     title: {
    //       text: 'XXX训练情况总览',
    //       left: 'center',
    //       top: '10'
    //     },
    //     tooltip: {
    //       trigger: 'axis'
    //     },
    //     legend: {
    //       data: ['深蹲', '卧推', '垂直纵跳', '测功仪2000M'],
    //       top: '40'
    //     },
    //     toolbox: {
    //       show: true,
    //       feature: {
    //         mark: { show: true },
    //         dataView: { show: true, readOnly: false },
    //         magicType: { show: true, type: ['line', 'bar'] },
    //         restore: { show: true },
    //         saveAsImage: { show: true }
    //       }
    //     },
    //     xAxis: [
    //       {
    //         type: 'category',
    //         data: ['1月', '2月', '3月', '4月', '5月']
    //       }
    //     ],
    //     yAxis: [
    //       {
    //         name: '训练量',
    //         type: 'value'
    //       }
    //     ],
    //     series: [
    //       {
    //         name: '深蹲',
    //         type: 'bar',
    //         barWidth: 20,
    //         areaStyle: { type: 'default' },
    //         itemStyle: {
    //           color: '#fd956a'
    //         },
    //         data: [800, 708, 920, 1090, 1200]
    //       },
    //       {
    //         name: '卧推',
    //         type: 'bar',
    //         barWidth: 20,
    //         areaStyle: { type: 'default' },
    //         itemStyle: {
    //           color: '#2bb6db'
    //         },
    //         data: [400, 468, 520, 690, 800]
    //       },
    //       {
    //         name: '垂直纵跳',
    //         type: 'bar',
    //         barWidth: 20,
    //         areaStyle: { type: 'default' },
    //         itemStyle: {
    //           color: '#13cfd5'
    //         },
    //         data: [500, 668, 520, 790, 900]
    //       },
    //       {
    //         name: '测功仪2000M',
    //         type: 'bar',
    //         barWidth: 20,
    //         areaStyle: { type: 'default' },
    //         itemStyle: {
    //           color: '#00ce68'
    //         },
    //         data: [600, 508, 720, 890, 1000]
    //       }
    //     ],
    //     grid: {
    //       show: true,
    //       x: 50,
    //       x2: 30,
    //       y: 80,
    //       height: 260
    //     },
    //     dataZoom: [ // 给x轴设置滚动条
    //       {
    //         start: 0, // 默认为0
    //         end: 100 - 1000 / 31, // 默认为100
    //         type: 'slider',
    //         show: true,
    //         xAxisIndex: [0],
    //         handleSize: 0, // 滑动条的 左右2个滑动条的大小
    //         height: 8, // 组件高度
    //         left: 45, // 左边的距离
    //         right: 50, // 右边的距离
    //         bottom: 26, // 右边的距离
    //         handleColor: '#ddd', // h滑动图标的颜色
    //         handleStyle: {
    //           borderColor: '#cacaca',
    //           borderWidth: '1',
    //           shadowBlur: 2,
    //           background: '#ddd',
    //           shadowColor: '#ddd'
    //         }
    //       }
    //     ]
    //   }
    //   oColumn.setOption(oColumnopt)
    // },
    // mapChartFn () {
    //   var oMap = echarts.init(document.getElementById('map_show'))
    //   var option

    //   option = {
    //     title: {
    //       text: 'XXX运动员各项数据',
    //       left: 'center',
    //       top: '10'
    //     },
    //     legend: {
    //       top: 'bottom'
    //     },
    //     toolbox: {
    //       show: true,
    //       feature: {
    //         mark: { show: true },
    //         dataView: { show: true, readOnly: false },
    //         restore: { show: true },
    //         saveAsImage: { show: true }
    //       }
    //     },
    //     series: [
    //       {
    //         name: 'XXX运动员各项数据',
    //         type: 'pie',
    //         radius: [50, 250],
    //         center: ['50%', '50%'],
    //         roseType: 'area',
    //         itemStyle: {
    //           borderRadius: 6
    //         },
    //         data: [
    //           { value: 40, name: '力量' },
    //           { value: 38, name: '耐力' },
    //           { value: 32, name: '爆发力' },
    //           { value: 30, name: '速度' },
    //           { value: 28, name: '平衡' },
    //           { value: 18, name: '水感' }
    //         ]
    //       }
    //     ]
    //   }

    //   oMap.setOption(option)
    // },
    // leidaChartFn () {
    //   var oLeida = echarts.init(document.getElementById('leida_show'))
    //   var option

    //   option = {
    //     title: {
    //       text: 'XXX运动员雷达图',
    //       left: 'center',
    //       top: '10'
    //     },
    //     legend: {
    //       data: ['运动员数据', '冠军模型数据'],
    //       x: 'center',
    //       top: 'bottom'
    //     },
    //     radar: {
    //       // shape: 'circle',
    //       indicator: [
    //         { name: '力量', max: 6500 },
    //         { name: '耐力', max: 16000 },
    //         { name: '爆发力', max: 30000 },
    //         { name: '速度', max: 38000 },
    //         { name: '平衡', max: 52000 },
    //         { name: '水感', max: 25000 }
    //       ]
    //     },
    //     series: [
    //       {
    //         name: '运动员 vs 冠军',
    //         type: 'radar',
    //         center: ['50%', '70%'],
    //         data: [
    //           {
    //             value: [4200, 3000, 20000, 35000, 50000, 18000],
    //             name: '运动员数据'
    //           },
    //           {
    //             value: [5000, 14000, 28000, 26000, 42000, 21000],
    //             name: '冠军模型数据'
    //           }
    //         ]
    //       }
    //     ],
    //     grid: { // 直角坐标系内绘图网格
    //       // show: true,
    //       x: 50, // grid 组件离容器偏移量, 左侧
    //       x2: 50, // 右侧
    //       y: 80, // 上
    //       height: 650 // 高度
    //     }
    //   }

    //   option && oLeida.setOption(option)
    // },
    // testChartFn () {
    //   const testChart = echarts.init(document.getElementById('test_show'))
    //   const xdata = []
    //   const ydata = []
    //   axios.get('http://127.0.0.1/list/all').then(res => {
    //     this.info = res.data
    //     // console.log(this.info[0])
    //     for (let i = 0; i < this.info.length; i++) {
    //       xdata.push(this.info[i].name)
    //       ydata.push(this.info[i].height)
    //     }
    //     var option = {
    //       title: {
    //         text: '运动员身高统计柱状图',
    //         left: 'center',
    //         top: '20'
    //       },
    //       tooltip: {
    //         trigger: 'axis',
    //         axisPointer: {
    //           type: 'shadow'
    //         }
    //       },
    //       grid: {
    //         left: '3%',
    //         right: '4%',
    //         bottom: '3%',
    //         containLabel: true
    //       },
    //       xAxis: {
    //         type: 'category',
    //         data: xdata,
    //         axisTick: {
    //           alignWithLabel: true
    //         }
    //       },
    //       yAxis: {
    //         type: 'value'
    //       },
    //       series: [
    //         {
    //           data: ydata,
    //           type: 'bar',
    //           barWidth: '60%'
    //         }
    //       ]
    //     }
    //     testChart.setOption(option)
    //   }).catch(err => {
    //     console.log('获取数据失败' + err)
    //   })
    // },
    // test1ChartFn () {
    //   var ROOT_PATH = 'https://echarts.apache.org/examples'
    //   const test1Chart = echarts.init(document.getElementById('test1_show'))
    //   axios.get('http://127.0.0.1/list/all').then(res => {
    //     this.info = res.data
    //     // console.log(this.info[0])
    //     var male = 0
    //     for (let i = 0; i < this.info.length; i++) {
    //       if (this.info[i].gender === '男') {
    //         male++
    //       }
    //     }
    //     var malev = Math.floor(male / (this.info.length) * 100)
    //     var femalev = 100 - malev
    //     var option
    //     var _panelImageURL = ROOT_PATH + '/data/asset/img/custom-gauge-panel.png'
    //     var _animationDuration = 1000
    //     var _animationDurationUpdate = 1000
    //     var _animationEasingUpdate = 'quarticInOut'
    //     var _valOnRadianMax = 100
    //     var _outerRadius = 200
    //     var _innerRadius = 170
    //     var _pointerInnerRadius = 40
    //     var _insidePanelRadius = 140
    //     // var _currentDataIndex = 0
    //     function renderItem (params, api) {
    //       var valOnRadian = api.value(1)
    //       var coords = api.coord([api.value(0), valOnRadian])
    //       var polarEndRadian = coords[3]
    //       var imageStyle = {
    //         image: _panelImageURL,
    //         x: params.coordSys.cx - _outerRadius,
    //         y: params.coordSys.cy - _outerRadius,
    //         width: _outerRadius * 2,
    //         height: _outerRadius * 2
    //       }
    //       return {
    //         type: 'group',
    //         children: [
    //           {
    //             type: 'image',
    //             style: imageStyle,
    //             clipPath: {
    //               type: 'sector',
    //               shape: {
    //                 cx: params.coordSys.cx,
    //                 cy: params.coordSys.cy,
    //                 r: _outerRadius,
    //                 r0: _innerRadius,
    //                 startAngle: 0,
    //                 endAngle: -polarEndRadian,
    //                 transition: 'endAngle',
    //                 enterFrom: { endAngle: 0 }
    //               }
    //             }
    //           },
    //           {
    //             type: 'image',
    //             style: imageStyle,
    //             clipPath: {
    //               type: 'polygon',
    //               shape: {
    //                 points: makePionterPoints(params, polarEndRadian)
    //               },
    //               extra: {
    //                 polarEndRadian: polarEndRadian,
    //                 transition: 'polarEndRadian',
    //                 enterFrom: { polarEndRadian: 0 }
    //               },
    //               during: function (apiDuring) {
    //                 apiDuring.setShape(
    //                   'points',
    //                   makePionterPoints(params, apiDuring.getExtra('polarEndRadian'))
    //                 )
    //               }
    //             }
    //           },
    //           {
    //             type: 'circle',
    //             shape: {
    //               cx: params.coordSys.cx,
    //               cy: params.coordSys.cy,
    //               r: _insidePanelRadius
    //             },
    //             style: {
    //               fill: '#fff',
    //               shadowBlur: 25,
    //               shadowOffsetX: 0,
    //               shadowOffsetY: 0,
    //               shadowColor: 'rgba(76,107,167,0.4)'
    //             }
    //           },
    //           {
    //             type: 'text',
    //             extra: {
    //               valOnRadian: valOnRadian,
    //               transition: 'valOnRadian',
    //               enterFrom: { valOnRadian: 0 }
    //             },
    //             style: {
    //               text: makeText(valOnRadian),
    //               fontSize: 50,
    //               fontWeight: 700,
    //               x: params.coordSys.cx,
    //               y: params.coordSys.cy,
    //               fill: 'rgb(0,50,190)',
    //               align: 'center',
    //               verticalAlign: 'middle',
    //               enterFrom: { opacity: 0 }
    //             },
    //             during: function (apiDuring) {
    //               apiDuring.setStyle(
    //                 'text',
    //                 makeText(apiDuring.getExtra('valOnRadian'))
    //               )
    //             }
    //           }
    //         ]
    //       }
    //     }
    //     function convertToPolarPoint (renderItemParams, radius, radian) {
    //       return [
    //         Math.cos(radian) * radius + renderItemParams.coordSys.cx,
    //         -Math.sin(radian) * radius + renderItemParams.coordSys.cy
    //       ]
    //     }
    //     function makePionterPoints (renderItemParams, polarEndRadian) {
    //       return [
    //         convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
    //         convertToPolarPoint(
    //           renderItemParams,
    //           _outerRadius,
    //           polarEndRadian + Math.PI * 0.03
    //         ),
    //         convertToPolarPoint(renderItemParams, _pointerInnerRadius, polarEndRadian)
    //       ]
    //     }
    //     function makeText (valOnRadian) {
    //     // Validate additive animation calc.
    //       if (valOnRadian < -10) {
    //         alert('illegal during val: ' + valOnRadian)
    //       }
    //       if (valOnRadian === malev) {
    //         return '男 ' + ((valOnRadian / _valOnRadianMax) * 100).toFixed(0) + '%'
    //       } else {
    //         return '女 ' + ((valOnRadian / _valOnRadianMax) * 100).toFixed(0) + '%'
    //       }
    //     }
    //     option = {
    //       animationEasing: _animationEasingUpdate,
    //       animationDuration: _animationDuration,
    //       animationDurationUpdate: _animationDurationUpdate,
    //       animationEasingUpdate: _animationEasingUpdate,
    //       dataset: {
    //         source: [[1, malev]]
    //       },
    //       title: {
    //         text: '运动员性别比例',
    //         left: 'center',
    //         top: '20'
    //       },
    //       tooltip: {},
    //       angleAxis: {
    //         type: 'value',
    //         startAngle: 0,
    //         show: false,
    //         min: 0,
    //         max: _valOnRadianMax
    //       },
    //       radiusAxis: {
    //         type: 'value',
    //         show: false
    //       },
    //       polar: {},
    //       series: [
    //         {
    //           type: 'custom',
    //           coordinateSystem: 'polar',
    //           renderItem: renderItem
    //         }
    //       ]
    //     }
    //     var nextSource = [[1, femalev]]
    //     setInterval(function () {
    //       if (nextSource[0][1] === malev) {
    //         nextSource = [[1, femalev]]
    //       } else {
    //         nextSource = [[1, malev]]
    //       }
    //       test1Chart.setOption({
    //         dataset: {
    //           source: nextSource
    //         }
    //       })
    //     }, 3000)

    //     option && test1Chart.setOption(option)
    //   }).catch(err => {
    //     console.log('获取数据失败' + err)
    //   })
    // },
    // test2ChartFn () {
    //   var test2Chart = echarts.init(document.getElementById('test2_show'))
    //   var QL = 0
    //   axios.get('http://127.0.0.1/list/all').then(res => {
    //     this.info = res.data
    //     // console.log(this.info[0])
    //     for (let i = 0; i < this.info.length; i++) {
    //       if (this.info[i].level === '轻量级') {
    //         QL++
    //       }
    //     }
    //     var pdata = []
    //     pdata.push({ value: QL * 50, name: '轻量级' })
    //     pdata.push({ value: (this.info.length - QL) * 50, name: '公开级' })
    //     var option

    //     option = {
    //       backgroundColor: '#2c343c',
    //       title: {
    //         text: '运动员级别比例',
    //         left: 'center',
    //         top: 20,
    //         textStyle: {
    //           color: '#ccc'
    //         }
    //       },
    //       tooltip: {
    //         trigger: 'item'
    //       },
    //       visualMap: {
    //         show: false,
    //         min: 80,
    //         max: 600,
    //         inRange: {
    //           colorLightness: [0, 1]
    //         }
    //       },
    //       series: [
    //         {
    //           name: '级别',
    //           type: 'pie',
    //           radius: '55%',
    //           center: ['50%', '50%'],
    //           data: pdata.sort((a, b) => a.value - b.value),
    //           roseType: 'radius',
    //           label: {
    //             color: 'rgba(255, 255, 255, 0.3)'
    //           },
    //           labelLine: {
    //             lineStyle: {
    //               color: 'rgba(255, 255, 255, 0.3)'
    //             },
    //             smooth: 0.2,
    //             length: 10,
    //             length2: 20
    //           },
    //           itemStyle: {
    //             color: '#c23531',
    //             shadowBlur: 200,
    //             shadowColor: 'rgba(0, 0, 0, 0.5)'
    //           },
    //           animationType: 'scale',
    //           animationEasing: 'elasticOut',
    //           animationDelay: function (idx) {
    //             return Math.random() * 200
    //           }
    //         }
    //       ]
    //     }

    //     option && test2Chart.setOption(option)
    //   }).catch(err => {
    //     console.log('获取数据失败' + err)
    //   })
    // }
  }
}
</script>

<style lang='less' scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
    .name {
    padding-left: 15px;
    color: white;
    font-size: 24px;
    font-weight: 900;
    line-height: 60px;
  }
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  background-color: #23262e;
  user-select: none;
//   img {
//     width: 35px;
//     height: 35px;
//     border-radius: 50%;
//     background-color: #fff;
//     margin-right: 15px;
//     object-fit: cover;
//   }
  span {
    color: white;
    font-size: 12px;
  }
}
.container-fluid {
    padding: 10px;
}
// 侧边栏菜单的样式
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}

.gragh_pannel {
  height: 350px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
  // margin-bottom: 20px;
}

.column_pannel {
  margin-bottom: 20px;
  height: 400px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
}

.map_pannel {
  height: 700px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
  margin-bottom: 20px;
}

.pannel_test {
  margin-bottom: 20px;
  height: 400px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
}

.pannel_test1 {
  margin-bottom: 20px;
  height: 700px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
}
</style>
