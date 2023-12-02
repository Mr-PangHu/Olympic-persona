<template>
    <div class="xuanba__wrapper">
        <div class="xuanba__model">
            <div class="xuanba__model-title">选拔模型</div>
            <div class="xuanba__model-filter">
              <el-select
                v-model="selectValue"
                multiple
                clearable
                collapse-tags
                filterable
                placeholder="请选择指标"
                class="xuanba__model-filter-selector"
                @change="handleSelectChange"
              >
                <el-option
                  v-for="item in xuanbaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select
                v-model="templateSelect"
                clearable
                placeholder="请选择模板"
                @change="handleTemplateChange">
                <el-option
                  v-for="item in templateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="xuanba__model-wrapper">
                <div class="xuanba__model-wrapper-echarts" id="xuanba_show"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
const EINDEX = ['vo2max_rel', 'p4', 'deep_squat_1rm', 'dead_lift_1rm', 'bench_press_1rm', 'bench_pull_1rm', 'fat_ratio', 'incline_brace', 'dynamometer_2000m', 'dynamometer_5000m', 'dynamometer_6000m', 'dynamometer_30min']
// const ETEMPLATE = ['省市', '国家队', '世锦赛', '奥运金牌']
const NameMap = {
  vo2max_rel: '最大摄氧量',
  p4: 'P4功率',
  deep_squat_1rm: '1RM深蹲',
  dead_lift_1rm: '1RM硬拉',
  bench_press_1rm: '1RM卧推',
  bench_pull_1rm: '1RM卧拉',
  fat_ratio: '体成分',
  incline_brace: '斜板支撑',
  dynamometer_2000m: '陆上赛艇2000米',
  dynamometer_5000m: '陆上赛艇5000米',
  dynamometer_6000m: '陆上赛艇6000米',
  dynamometer_30min: '陆上赛艇30分/20'
}
const Province = {
  [NameMap['vo2max_rel']]: 44,
  [NameMap['p4']]: 290,
  [NameMap['deep_squat_1rm']]: 70,
  [NameMap['dead_lift_1rm']]: 80,
  [NameMap['bench_press_1rm']]: 50,
  [NameMap['bench_pull_1rm']]: 50,
  [NameMap['fat_ratio']]: 18,
  [NameMap['incline_brace']]: 150,
  [NameMap['dynamometer_2000m']]: 435,
  [NameMap['dynamometer_5000m']]: 1135,
  [NameMap['dynamometer_6000m']]: -1,
  [NameMap['dynamometer_30min']]: '7650/117'
}
const Country = {
  [NameMap['vo2max_rel']]: 46,
  [NameMap['p4']]: 320,
  [NameMap['deep_squat_1rm']]: 80,
  [NameMap['dead_lift_1rm']]: 90,
  [NameMap['bench_press_1rm']]: 60,
  [NameMap['bench_pull_1rm']]: 60,
  [NameMap['fat_ratio']]: 17,
  [NameMap['incline_brace']]: 160,
  [NameMap['dynamometer_2000m']]: 425,
  [NameMap['dynamometer_5000m']]: 1122,
  [NameMap['dynamometer_6000m']]: -1,
  [NameMap['dynamometer_30min']]: '7725/116'
}
const WorldChampionShip = {
  [NameMap['vo2max_rel']]: 50,
  [NameMap['p4']]: 350,
  [NameMap['deep_squat_1rm']]: 90,
  [NameMap['dead_lift_1rm']]: 100,
  [NameMap['bench_press_1rm']]: 70,
  [NameMap['bench_pull_1rm']]: 70,
  [NameMap['fat_ratio']]: 16,
  [NameMap['incline_brace']]: 170,
  [NameMap['dynamometer_2000m']]: 417,
  [NameMap['dynamometer_5000m']]: 1108,
  [NameMap['dynamometer_6000m']]: -1,
  [NameMap['dynamometer_30min']]: '7800/115'
}
const TemplateMap = {
  '省市': Province,
  '国家队': Country,
  '世锦赛': WorldChampionShip
}
export default {
  data () {
    return {
      id: null,
      playerData: {},
      testData: [40, 280, 60, 60, 40, 40, 19, 160, 450, 1250, 0, '7550/120'],
      xuanbaOptions: [{
        value: 'vo2max_rel',
        label: '最大摄氧量'
      }, {
        value: 'p4',
        label: 'P4功率'
      }, {
        value: 'deep_squat_1rm',
        label: '1RM深蹲'
      }, {
        value: 'dead_lift_1rm',
        label: '1RM硬拉'
      }, {
        value: 'bench_press_1rm',
        label: '1RM卧推'
      }, {
        value: 'bench_pull_1rm',
        label: '1RM卧拉'
      }, {
        value: 'fat_ratio',
        label: '体成分'
      }, {
        value: 'incline_brace',
        label: '斜板支撑'
      }, {
        value: 'dynamometer_2000m',
        label: '陆上赛艇2000米'
      }, {
        value: 'dynamometer_5000m',
        label: '陆上赛艇5000米'
      }, {
        value: 'dynamometer_6000m',
        label: '陆上赛艇6000米'
      }, {
        value: 'dynamometer_30min',
        label: '陆上赛艇30分/20'
      }],
      templateOptions: [{
        value: '省市',
        label: '省市'
      }, {
        value: '国家队',
        label: '国家队'
      }, {
        value: '世锦赛',
        label: '世锦赛'
      }],
      selectValue: [],
      templateSelect: '',
      xuanbaindicator: []
    }
  },
  mounted () {
    this.id = window.sessionStorage.getItem('id')
    this.getPlayerData()
  },
  // watch: {
  //   quan (newValue, oldValue) {
  //     this.quan = newValue
  //     this.setxuanbaChart()
  //   }
  // },
  methods: {
    getPlayerData () {
      axios.get('http://127.0.0.1/xuanba/getPlayerData', {
        params: {
          id: this.id
        }
      }).then(res => {
        const t = res.data
        let tmp = {}
        for (var key in t[0]) {
          tmp[key] = []
        }
        t.forEach(item => {
          for (var key in item) {
            tmp[key].push(item[key])
          }
        })
        this.playerData = tmp
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    // 成绩转化为分数，0表示数值越低分数越高，1相反
    convert (v, t, flag = 0) {
      if (flag === 0) {
        return (1 + (v - t) / t).toFixed(2) * 100
      }
      return (1 - (v - t) / t).toFixed(2) * 100
    },
    handleSelectChange (value) {
      this.xuanbaindicator = this.selectValue.map(item => {
        return {
          name: NameMap[item],
          max: 120
        }
      })
      this.setxuanbaChart()
    },
    handleTemplateChange () {
      this.setxuanbaChart()
    },
    setxuanbaChart () {
      var chartDom = document.getElementById('xuanba_show')
      var myChart = echarts.init(chartDom)
      var option
      const mostRecentData = EINDEX.map(item => {
        const t = this.playerData[item]
        return t[t.length - 1]
      })
      const template = TemplateMap[this.templateSelect]
      const mostRecentTempData = this.selectValue.map(item => {
        const index = EINDEX.indexOf(item)
        if (template[NameMap[item]] === -1) return 0
        if (item === 'fat_ratio' || item === 'dynamometer_2000m' || item === 'dynamometer_5000m' || item === 'dynamometer_6000m') {
          return this.convert(mostRecentData[index], template[NameMap[item]], 1)
        }
        // if (item === 'dynamometer_30min') {
        //   const Etmp = template[item].split('/').map(t => parseInt(t))
        //   const tmp = this.testData[index].split('/').map(t => parseInt(t))
        //   return (this.convert(tmp[0], Etmp[0], 0) + this.convert(tmp[1], Etmp[1], 1)) / 2
        // }
        return this.convert(mostRecentData[index], template[NameMap[item]], 0)
      })

      const data = [
        {
          value: mostRecentTempData,
          name: '最近一次',
          areaStyle: {
            color: 'rgba(255, 228, 52, 0.6)'
          }
        },
        {
          value: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          name: '选拔标准'
        }
      ]
      // const lineStyle = {
      //   width: 1,
      //   opacity: 0.5
      // }
      option = {
        // backgroundColor: '#161627',
        color: ['#67F9D8', '#FFE434'],
        title: {
          text: 'xuanba Model',
          left: 'center',
          top: 10,
          textStyle: {
            color: '#666'
          }
        },
        legend: {
          bottom: 5,
          data: ['最近一次', '选拔标准'],
          itemGap: 20,
          textStyle: {
            color: '#666',
            fontSize: 14
          }
        },
        radar: {
          indicator: this.xuanbaindicator,
          shape: 'circle',
          splitNumber: 5,
          axisName: {
            // color: 'rgb(238, 197, 102)'
            color: '#428BD4'
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(238, 197, 102, 0.1)',
                'rgba(238, 197, 102, 0.2)',
                'rgba(238, 197, 102, 0.4)',
                'rgba(238, 197, 102, 0.6)',
                'rgba(238, 197, 102, 0.8)',
                'rgba(238, 197, 102, 1)'
              ].reverse()
            }
          },
          splitArea: {
            areaStyle: {
              color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(211, 253, 250, 0.8)'
            }
          }
        },
        series: [
          {
            name: 'xuanba Model',
            type: 'radar',
            emphasis: {
              lineStyle: {
                width: 4
              }
            },
            // lineStyle: lineStyle,
            data: data
            // symbol: 'none',
            // itemStyle: {
            //   color: '#F9713C'
            // },
            // areaStyle: {
            //   opacity: 0.1
            // }
          }
        ]
      }

      option && myChart.setOption(option)
    }
  }
}
</script>

<style lang='less' scoped>
.xuanba {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
  &__model {
    display: flex;
    flex-direction: column;
    width: 100%;
    &-title {
        font-size: 20px;
        font-weight: 700;
    }
    &-filter {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    &-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        &-echarts {
            width: 1000px;
            height: 800px;
        }
    }
  }
}
</style>
