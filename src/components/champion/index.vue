<template>
  <div class="champion__wrapper">
    <div class="champion__topper">
      <div class="champion__topper-img"></div>
      <div class="champion__topper-overlay"></div>
      <div class="champion__topper-title">
        <h1>画像模型</h1>
      </div>
    </div>
    <el-card class="box-card">
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="选拔模型" name="xuanba">
                <XuanBaModel />
            </el-tab-pane>
            <el-tab-pane label="冠军模型" name="champion">
                <ChampionModel />
            </el-tab-pane>
        </el-tabs> -->
        <div class="persona_model">
          <!-- <div class="persona_model-title">画像模型</div> -->
          <div class="xuanba__model-filter1">
          <div class="xuanba__model-filter">
            <el-select
              v-model="selectXuanbaValue"
              multiple
              clearable
              collapse-tags
              filterable
              placeholder="请选择指标"
              class="xuanba__model-filter-selector"
              @change="handleXuanbaSelectChange"
            >
              <el-option
                v-for="item in options"
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
          <div>
            <el-button id="return" type="primary" @click="returnView">返回运动员总览</el-button>
          </div>
          </div>
          <div class="persona_model-wrapper">
            <div class="xuanba__wrapper">
              <div class="xuanba__model">
                  <div class="xuanba__model-wrapper">
                      <div class="xuanba__model-wrapper-echarts" id="xuanba_show"></div>
                  </div>
              </div>
            </div>
            <div class="champion__wrapper">
                <div class="champion__model">
                    <!-- <div class="champion__model-filter">
                      <el-select
                        v-model="selectChampionValue"
                        multiple
                        clearable
                        collapse-tags
                        filterable
                        placeholder="请选择冠军模型指标"
                        class="champion__model-filter-selector"
                        @change="handleChampionSelectChange"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div> -->
                    <div class="champion__model-wrapper">
                        <div class="champion__model-wrapper-echarts" id="champion_show"></div>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import myAxios from '@/utils/request'
import { formatMMToSeconds } from '@/utils/formatTime'
const EINDEX = ['vo2max_rel', 'p4', 'deep_squat_1rm', 'dead_lift_1rm', 'bench_press_1rm', 'bench_pull_1rm', 'fat_ratio', 'incline_brace', 'dynamometer_2000m', 'dynamometer_5000m', 'dynamometer_6000m', 'dynamometer_30min']
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
const MAN_PROVINCE = {
  [NameMap['vo2max_rel']]: 60,
  [NameMap['p4']]: 390,
  [NameMap['deep_squat_1rm']]: 130,
  [NameMap['dead_lift_1rm']]: 140,
  [NameMap['bench_press_1rm']]: 95,
  [NameMap['bench_pull_1rm']]: 95,
  [NameMap['fat_ratio']]: 12,
  [NameMap['incline_brace']]: 150,
  [NameMap['dynamometer_2000m']]: 362,
  [NameMap['dynamometer_5000m']]: 950,
  [NameMap['dynamometer_6000m']]: -1,
  // [NameMap['dynamometer_30min']]: '7650/117'
  [NameMap['dynamometer_30min']]: 101
}
const WOMAN_PROVINCE = {
  [NameMap['vo2max_rel']]: 48,
  [NameMap['p4']]: 290,
  [NameMap['deep_squat_1rm']]: 100,
  [NameMap['dead_lift_1rm']]: 110,
  [NameMap['bench_press_1rm']]: 70,
  [NameMap['bench_pull_1rm']]: 70,
  [NameMap['fat_ratio']]: 20,
  [NameMap['incline_brace']]: 150,
  [NameMap['dynamometer_2000m']]: 412,
  [NameMap['dynamometer_5000m']]: 1076,
  [NameMap['dynamometer_6000m']]: -1,
  // [NameMap['dynamometer_30min']]: '7650/117'
  [NameMap['dynamometer_30min']]: 113
}
const MAN_COUNTRY = {
  [NameMap['vo2max_rel']]: 64,
  [NameMap['p4']]: 410,
  [NameMap['deep_squat_1rm']]: 140,
  [NameMap['dead_lift_1rm']]: 155,
  [NameMap['bench_press_1rm']]: 105,
  [NameMap['bench_pull_1rm']]: 105,
  [NameMap['fat_ratio']]: 11,
  [NameMap['incline_brace']]: 160,
  [NameMap['dynamometer_2000m']]: 350,
  [NameMap['dynamometer_5000m']]: 932,
  [NameMap['dynamometer_6000m']]: -1,
  // [NameMap['dynamometer_30min']]: '7725/116'
  [NameMap['dynamometer_30min']]: 100
}
const WOMAN_COUNTRY = {
  [NameMap['vo2max_rel']]: 52,
  [NameMap['p4']]: 320,
  [NameMap['deep_squat_1rm']]: 110,
  [NameMap['dead_lift_1rm']]: 120,
  [NameMap['bench_press_1rm']]: 80,
  [NameMap['bench_pull_1rm']]: 80,
  [NameMap['fat_ratio']]: 19,
  [NameMap['incline_brace']]: 160,
  [NameMap['dynamometer_2000m']]: 406,
  [NameMap['dynamometer_5000m']]: 1059,
  [NameMap['dynamometer_6000m']]: -1,
  // [NameMap['dynamometer_30min']]: '7725/116'
  [NameMap['dynamometer_30min']]: 112
}
const MAN_WORLDCHAMPIONSHIP = {
  [NameMap['vo2max_rel']]: 68,
  [NameMap['p4']]: 440,
  [NameMap['deep_squat_1rm']]: 155,
  [NameMap['dead_lift_1rm']]: 170,
  [NameMap['bench_press_1rm']]: 115,
  [NameMap['bench_pull_1rm']]: 115,
  [NameMap['fat_ratio']]: 10,
  [NameMap['incline_brace']]: 170,
  [NameMap['dynamometer_2000m']]: 341,
  [NameMap['dynamometer_5000m']]: 918,
  [NameMap['dynamometer_6000m']]: -1,
  // [NameMap['dynamometer_30min']]: '7800/115'
  [NameMap['dynamometer_30min']]: 99
}
const WOMAN_WORLDCHAMPIONSHIP = {
  [NameMap['vo2max_rel']]: 56,
  [NameMap['p4']]: 350,
  [NameMap['deep_squat_1rm']]: 120,
  [NameMap['dead_lift_1rm']]: 130,
  [NameMap['bench_press_1rm']]: 90,
  [NameMap['bench_pull_1rm']]: 90,
  [NameMap['fat_ratio']]: 18,
  [NameMap['incline_brace']]: 170,
  [NameMap['dynamometer_2000m']]: 392,
  [NameMap['dynamometer_5000m']]: 1041,
  [NameMap['dynamometer_6000m']]: -1,
  // [NameMap['dynamometer_30min']]: '7800/115'
  [NameMap['dynamometer_30min']]: 111
}
const MAN_OLYMPICGOLDEN = {
  [NameMap['vo2max_rel']]: 70,
  [NameMap['p4']]: 470,
  [NameMap['deep_squat_1rm']]: 170,
  [NameMap['dead_lift_1rm']]: 185,
  [NameMap['bench_press_1rm']]: 125,
  [NameMap['bench_pull_1rm']]: 125,
  [NameMap['fat_ratio']]: 9,
  [NameMap['incline_brace']]: 180,
  [NameMap['dynamometer_2000m']]: 335,
  [NameMap['dynamometer_5000m']]: 894,
  [NameMap['dynamometer_6000m']]: 1083,
  [NameMap['dynamometer_30min']]: -1
}
const WOMAN_OLYMPICGOLDEN = {
  [NameMap['vo2max_rel']]: 60,
  [NameMap['p4']]: 370,
  [NameMap['deep_squat_1rm']]: 130,
  [NameMap['dead_lift_1rm']]: 140,
  [NameMap['bench_press_1rm']]: 100,
  [NameMap['bench_pull_1rm']]: 100,
  [NameMap['fat_ratio']]: 17,
  [NameMap['incline_brace']]: 180,
  [NameMap['dynamometer_2000m']]: 382,
  [NameMap['dynamometer_5000m']]: 1018,
  [NameMap['dynamometer_6000m']]: 1217,
  [NameMap['dynamometer_30min']]: -1
}
export default {
  data () {
    return {
      id: null,
      isMan: true,
      playerData: {},
      // testData: [40, 280, 60, 60, 40, 40, 19, 160, 450, 1250, 0, '7550/120'],
      options: [{
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
      selectXuanbaValue: ['vo2max_rel', 'deep_squat_1rm', 'bench_press_1rm', 'bench_pull_1rm', 'dynamometer_2000m'],
      templateSelect: '省市',
      xuanbaindicator: [],
      Province: {},
      Country: {},
      WorldChampionShip: {},
      OlympicGolden: {},
      XuanbaTemplateMap: {},
      OlympicTemplateMap: {}
      // selectChampionValue: [],
      // championindicator: []
    }
  },
  mounted () {
    this.getPlayerId()
  },
  // watch: {
  //   quan (newValue, oldValue) {
  //     this.quan = newValue
  //     this.setxuanbaChart()
  //   }
  // },
  methods: {
    getPlayerId () {
      const auth = window.sessionStorage.getItem('auth')
      if (auth === '2') {
        const id = this.$route.params.id
        myAxios.get('/list/getAthleteId', {
          params: {
            id
          }
        }).then(res => {
          const athleteId = res.data[0].athlete_id
          this.id = athleteId
        }).then(res => {
          this.getPlayerGender()
        }).then(res => {
          this.getPlayerData()
        }).catch(err => {
          console.log('获取数据失败' + err)
        })
      } else {
        this.id = window.sessionStorage.getItem('id')
        this.getPlayerData()
      }
    },
    getPlayerGender () {
      myAxios.get('/list/getPersonInfoByAthleteId', {
        params: {
          id: this.id
        }
      }).then(res => {
        const gender = res.data[0].gender
        this.isMan = gender === 'M'
        console.log(this.isMan)
        this.Province = this.isMan ? MAN_PROVINCE : WOMAN_PROVINCE
        this.Country = this.isMan ? MAN_COUNTRY : WOMAN_COUNTRY
        this.WorldChampionShip = this.isMan ? MAN_WORLDCHAMPIONSHIP : WOMAN_WORLDCHAMPIONSHIP
        this.OlympicGolden = this.isMan ? MAN_OLYMPICGOLDEN : WOMAN_OLYMPICGOLDEN
        console.log(this.Province)
        this.XuanbaTemplateMap = {
          '省市': this.Province,
          '国家队': this.Country,
          '世锦赛': this.WorldChampionShip
        }
        this.OlympicTemplateMap = {
          '奥运金牌': this.OlympicGolden
        }
        console.log(this.XuanbaTemplateMap)
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    returnView () {
      this.$router.push('/label')
    },
    getPlayerData () {
      myAxios.get('/xuanba/getPlayerData', {
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
      }).then(() => {
        this.renderIndicator()
        this.setxuanbaChart()
        this.setChampionChart()
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    // 成绩转化为分数，0表示数值越低分数越高，1相反
    convert (v, t, flag = 0) {
      if (flag === 0) {
        return Number(parseInt((1 + (v - t) / t).toFixed(2) * 100))
      }
      return Number(parseInt((1 - (v - t) / t).toFixed(2) * 100))
    },
    renderIndicator () {
      this.xuanbaindicator = this.selectXuanbaValue.map(item => {
        return {
          name: NameMap[item],
          max: 120
        }
      })
    },
    handleXuanbaSelectChange (value) {
      this.renderIndicator()
      this.setxuanbaChart()
      this.setChampionChart()
    },
    handleTemplateChange () {
      this.setxuanbaChart()
      this.setChampionChart()
    },
    setxuanbaChart () {
      var chartDom = document.getElementById('xuanba_show')
      var myChart = echarts.init(chartDom)
      var option
      const mostRecentData = EINDEX.map(item => {
        const t = this.playerData[item]
        let newArr = t
        if (item === 'dynamometer_2000m' || item === 'dynamometer_5000m' || item === 'dynamometer_6000m' || item === 'dynamometer_30min') {
          newArr = t.map(ti => formatMMToSeconds(ti))
        } else if (item === 'fat_ratio' || item === 'incline_brace') {
          newArr = t.map(ti => Number(ti.slice(0, -1)))
        }
        return newArr[newArr.length - 1]
      })
      const avgData = EINDEX.map(item => {
        const t = this.playerData[item]
        let newArr = t
        if (item === 'fat_ratio' || item === 'dynamometer_2000m' || item === 'dynamometer_5000m' || item === 'dynamometer_6000m' || item === 'dynamometer_30min') {
          if (item === 'fat_ratio') newArr = t.map(ti => Number(ti.slice(0, -1)))
          else newArr = t.map(ti => formatMMToSeconds(ti))
        }
        if (item === 'incline_brace') newArr = t.map(ti => Number(ti.slice(0, -1)))
        const tSum = newArr.reduce((total, cur) => total + cur, 0)
        return Number((tSum / newArr.length).toFixed(2))
      })
      const bestData = EINDEX.map(item => {
        const t = this.playerData[item]
        let newArr = t
        if (item === 'fat_ratio' || item === 'dynamometer_2000m' || item === 'dynamometer_5000m' || item === 'dynamometer_6000m' || item === 'dynamometer_30min') {
          if (item === 'fat_ratio') newArr = t.map(ti => Number(ti.slice(0, -1)))
          else newArr = t.map(ti => formatMMToSeconds(ti))
          return Math.min(...newArr)
        }
        if (item === 'incline_brace') newArr = t.map(ti => Number(ti.slice(0, -1)))
        return Math.max(...newArr)
      })
      const template = this.XuanbaTemplateMap[this.templateSelect]
      const mostRecentTempData = this.selectXuanbaValue.map(item => {
        const index = EINDEX.indexOf(item)
        if (template[NameMap[item]] === -1) return 0
        if (item === 'fat_ratio' || item === 'dynamometer_2000m' || item === 'dynamometer_5000m' || item === 'dynamometer_6000m' || item === 'dynamometer_30min') {
          return this.convert(mostRecentData[index], template[NameMap[item]], 1)
        }
        return this.convert(mostRecentData[index], template[NameMap[item]], 0)
      })
      const avgTempData = this.selectXuanbaValue.map(item => {
        const index = EINDEX.indexOf(item)
        if (template[NameMap[item]] === -1) return 0
        if (item === 'fat_ratio' || item === 'dynamometer_2000m' || item === 'dynamometer_5000m' || item === 'dynamometer_6000m' || item === 'dynamometer_30min') {
          return this.convert(avgData[index], template[NameMap[item]], 1)
        }
        return this.convert(avgData[index], template[NameMap[item]], 0)
      })
      const bestTempData = this.selectXuanbaValue.map(item => {
        const index = EINDEX.indexOf(item)
        if (template[NameMap[item]] === -1) return 0
        if (item === 'fat_ratio' || item === 'dynamometer_2000m' || item === 'dynamometer_5000m' || item === 'dynamometer_6000m' || item === 'dynamometer_30min') {
          return this.convert(bestData[index], template[NameMap[item]], 1)
        }
        return this.convert(bestData[index], template[NameMap[item]], 0)
      })

      const data = [
        {
          value: mostRecentTempData,
          name: '最近',
          lineStyle: {
            normal: {
              width: 3,
              type: 'dashed'
            }
          }
          // areaStyle: {
          //   color: 'rgba(255, 228, 52, 0.6)'
          // }
        },
        {
          value: avgTempData,
          name: '平均值',
          lineStyle: {
            normal: {
              width: 3,
              type: 'dashed'
            }
          }
          // areaStyle: {
          //   color: 'rgba(51, 204, 0, 0.6)'
          // }
        },
        {
          value: bestTempData,
          name: '最佳',
          lineStyle: {
            normal: {
              width: 3,
              type: 'dashed'
            }
          }
          // areaStyle: {
          //   color: 'rgba(204, 153, 255, 0.6)'
          // }
        },
        {
          value: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          name: '选拔标准'
        }
      ]
      option = {
        color: ['#EDAE49', '#D1495B', '#b4bd9b', '#00798C'],
        title: {
          text: '选拔模型',
          left: 'center',
          top: 10,
          textStyle: {
            color: '#666'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: 5,
          data: ['最近', '平均值', '最佳', '选拔标准'],
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
            color: '#000',
            fontSize: 14,
            fontWeight: 700
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(144, 144, 144, 0.5)',
                'rgba(238, 197, 102, 0.2)',
                'rgba(238, 197, 102, 0.4)',
                'rgba(238, 197, 102, 0.6)',
                'rgba(238, 197, 102, 0.8)',
                'rgba(238, 197, 102, 1)'
              ].reverse()
            }
          },
          // splitArea: {
          //   areaStyle: {
          //     color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
          //     shadowColor: 'rgba(0, 0, 0, 0.2)',
          //     shadowBlur: 10
          //   }
          // },
          axisLine: {
            lineStyle: {
              // color: 'rgba(211, 253, 250, 0.8)'
              color: 'rgba(144, 144, 144, 0.5)'
            }
          }
        },
        series: [
          {
            name: '选拔模型',
            type: 'radar',
            emphasis: {
              lineStyle: {
                width: 4
              }
            },
            data: data
          }
        ]
      }

      option && myChart.setOption(option)
    },
    // handleChampionSelectChange (value) {
    //   this.championindicator = this.selectXuanbaValue.map(item => {
    //     return {
    //       name: NameMap[item],
    //       max: 120
    //     }
    //   })
    //   this.setChampionChart()
    // },
    setChampionChart () {
      var chartDom = document.getElementById('champion_show')
      var myChart = echarts.init(chartDom)
      var option
      const mostRecentData = EINDEX.map(item => {
        const t = this.playerData[item]
        let newArr = t
        if (item === 'dynamometer_2000m' || item === 'dynamometer_5000m' || item === 'dynamometer_6000m' || item === 'dynamometer_30min') {
          newArr = t.map(ti => formatMMToSeconds(ti))
        } else if (item === 'fat_ratio' || item === 'incline_brace') {
          newArr = t.map(ti => Number(ti.slice(0, -1)))
        }
        return newArr[newArr.length - 1]
      })
      const avgData = EINDEX.map(item => {
        const t = this.playerData[item]
        let newArr = t
        if (item === 'fat_ratio' || item === 'dynamometer_2000m' || item === 'dynamometer_5000m' || item === 'dynamometer_6000m' || item === 'dynamometer_30min') {
          if (item === 'fat_ratio') newArr = t.map(ti => Number(ti.slice(0, -1)))
          else newArr = t.map(ti => formatMMToSeconds(ti))
        }
        if (item === 'incline_brace') newArr = t.map(ti => Number(ti.slice(0, -1)))
        const tSum = newArr.reduce((total, cur) => total + cur, 0)
        return Number((tSum / newArr.length).toFixed(2))
      })
      const bestData = EINDEX.map(item => {
        const t = this.playerData[item]
        let newArr = t
        if (item === 'fat_ratio' || item === 'dynamometer_2000m' || item === 'dynamometer_5000m' || item === 'dynamometer_6000m' || item === 'dynamometer_30min') {
          if (item === 'fat_ratio') newArr = t.map(ti => Number(ti.slice(0, -1)))
          else newArr = t.map(ti => formatMMToSeconds(ti))
          return Math.min(...newArr)
        }
        if (item === 'incline_brace') newArr = t.map(ti => Number(ti.slice(0, -1)))
        return Math.max(...newArr)
      })
      const template = this.OlympicTemplateMap['奥运金牌']
      const mostRecentTempData = this.selectXuanbaValue.map(item => {
        const index = EINDEX.indexOf(item)
        if (template[NameMap[item]] === -1) return 0
        if (item === 'fat_ratio' || item === 'dynamometer_2000m' || item === 'dynamometer_5000m' || item === 'dynamometer_6000m' || item === 'dynamometer_30min') {
          return this.convert(mostRecentData[index], template[NameMap[item]], 1)
        }
        return this.convert(mostRecentData[index], template[NameMap[item]], 0)
      })
      const avgTempData = this.selectXuanbaValue.map(item => {
        const index = EINDEX.indexOf(item)
        if (template[NameMap[item]] === -1) return 0
        if (item === 'fat_ratio' || item === 'dynamometer_2000m' || item === 'dynamometer_5000m' || item === 'dynamometer_6000m' || item === 'dynamometer_30min') {
          return this.convert(avgData[index], template[NameMap[item]], 1)
        }
        return this.convert(avgData[index], template[NameMap[item]], 0)
      })
      const bestTempData = this.selectXuanbaValue.map(item => {
        const index = EINDEX.indexOf(item)
        if (template[NameMap[item]] === -1) return 0
        if (item === 'fat_ratio' || item === 'dynamometer_2000m' || item === 'dynamometer_5000m' || item === 'dynamometer_6000m' || item === 'dynamometer_30min') {
          return this.convert(bestData[index], template[NameMap[item]], 1)
        }
        return this.convert(bestData[index], template[NameMap[item]], 0)
      })

      const data = [
        {
          value: mostRecentTempData,
          name: '最近',
          lineStyle: {
            normal: {
              width: 3,
              type: 'dashed'
            }
          }
          // areaStyle: {
          //   color: 'rgba(255, 228, 52, 0.6)'
          // }
        },
        {
          value: avgTempData,
          name: '平均值',
          lineStyle: {
            normal: {
              width: 3,
              type: 'dashed'
            }
          }
          // areaStyle: {
          //   color: 'rgba(51, 204, 0, 0.6)'
          // }
        },
        {
          value: bestTempData,
          name: '最佳',
          lineStyle: {
            normal: {
              width: 3,
              type: 'dashed'
            }
          }
          // areaStyle: {
          //   color: 'rgba(204, 153, 255, 0.6)'
          // }
        },
        {
          value: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          name: '奥运金牌运动员'
        }
      ]
      option = {
        color: ['#EDAE49', '#D1495B', '#b4bd9b', '#00798C'],
        title: {
          text: '冠军模型',
          left: 'center',
          top: 10,
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: 5,
          data: ['最近', '平均值', '最佳', '奥运金牌运动员'],
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
            color: '#000',
            fontSize: 14,
            fontWeight: 700
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(144, 144, 144, 0.5)',
                'rgba(238, 197, 102, 0.2)',
                'rgba(238, 197, 102, 0.4)',
                'rgba(238, 197, 102, 0.6)',
                'rgba(238, 197, 102, 0.8)',
                'rgba(238, 197, 102, 1)'
              ].reverse()
            }
          },
          // splitArea: {
          //   areaStyle: {
          //     color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
          //     shadowColor: 'rgba(0, 0, 0, 0.2)',
          //     shadowBlur: 10
          //   }
          // },
          axisLine: {
            lineStyle: {
              // color: 'rgba(211, 253, 250, 0.8)'
              color: 'rgba(144, 144, 144, 0.5)'
            }
          }
        },
        series: [
          {
            name: '冠军模型',
            type: 'radar',
            emphasis: {
              lineStyle: {
                width: 4
              }
            },
            data: data
          }
        ]
      }

      option && myChart.setOption(option)
    }
  }
}
</script>

<style lang='less' scoped>
.champion {
  &__wrapper {
    width: 100%;
  }
  &__topper {
    height: 80px;
    width: 100%;
    position: fixed;
    z-index: 2;
    &-img {
      height: 100%;
      background-image: url('../../assets/images/666.jpg');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    &-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent linear-gradient(180deg,rgba(0,57,124,.1),rgba(0,44,94,.3) 22%,rgba(0,37,79,.5) 50%,#001d3e) 0 0 no-repeat padding-box;
    }
    &-title {
      width: 100%;
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      h1 {
        width: 80%;
        margin: 0 auto;
        // font-family: "Effra",Arial,sans-serif;
        // font-style: italic;
        font-size: 40px;
        color: white;
        line-height: 75px;
      }
    }
  }
}
.box-card {
  margin: 0 auto;
  width: 95%;
  position: relative;
  top: 85px;
}
.persona_model {
  display: flex;
  flex-direction: column;
  &-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  &-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}

.xuanba {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    // padding: 20px;
    flex: 1;
  }
  &__model {
    display: flex;
    flex-direction: column;
    width: 100%;
    &-filter1 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
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
        padding: 10px;
        &-echarts {
            width: 700px;
            height: 600px;
        }
    }
  }
}

.champion {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    // padding: 20px;
    flex: 1;
  }
  &__model {
    display: flex;
    flex-direction: column;
    width: 100%;
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
        padding: 10px;
        &-echarts {
            width: 700px;
            height: 600px;
        }
    }
  }
}

/deep/ .el-button {
  background-color: rgba(0,37,79,.8);
  border-color: rgba(0,37,79,.8);
  font-size: 15px;
  color: white;
}
</style>
