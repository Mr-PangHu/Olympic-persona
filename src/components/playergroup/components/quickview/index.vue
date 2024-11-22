<template>
    <div class="main__wrapper">
      <div>
        <el-form :inline="true" ref="dateForm">
          <el-form-item>
            <!-- <el-select
              v-model="chooseDate1"
              placeholder="测试日期(左侧)"
              size="small"
              @change="handleSelectTestDate1"
              filterable
            >
              <el-option
                v-for="item in chooseDateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="chooseDate2"
              placeholder="测试日期(右侧)"
              size="small"
              @change="handleSelectTestDate2"
              filterable
            >
              <el-option
                v-for="item in chooseDateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="main__top" >
        <el-descriptions :column="6" :colon="false">
          <el-descriptions-item>
            <template slot="label">
              <div class="main__top-description-label">
                <div class="main__top-description-label-first">姓名</div>
                <div>Name</div>
              </div>
            </template>
            ：{{personInfo.name}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <div class="main__top-description-label">
                <div class="main__top-description-label-first">性别</div>
                <div>Gender</div>
              </div>
            </template>
            ：{{personInfo.gender}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <div class="main__top-description-label">
                <div class="main__top-description-label-first">年龄</div>
                <div>Age</div>
              </div>
            </template>
            ：{{new Date().getFullYear() - personInfo.birthday.split('-')[0]}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <div class="main__top-description-label">
                <div class="main__top-description-label-first">身高</div>
                <div>Height</div>
              </div>
            </template>
            ：{{personInfo.height}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <div class="main__top-description-label">
                <div class="main__top-description-label-first">体重</div>
                <div>Weight</div>
              </div>
            </template>
            ：{{personInfo.weight}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <div class="main__top-description-label">
                <div class="main__top-description-label-first">出生日期</div>
                <div>Date of Birth</div>
              </div>
            </template>
            ：{{personInfo.birthday}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <div class="main__top-description-label">
                <div class="main__top-description-label-first">运动等级</div>
                <div>Sport Level</div>
              </div>
            </template>
            ：{{personInfo.sports_level}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <div class="main__top-description-label">
                <div class="main__top-description-label-first">组别</div>
                <div>Group</div>
              </div>
            </template>
            ：
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <div class="main__top-description-label">
                <div class="main__top-description-label-first">训练年限</div>
                <div>Pro Training Years</div>
              </div>
            </template>
            ：{{personInfo.professional_training_years}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <div class="main__top-description-label">
                <div class="main__top-description-label-first">总排名</div>
                <div>Rank</div>
              </div>
            </template>
            ：
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <div class="main__top-description-label">
                <div class="main__top-description-label-first">总分</div>
                <div>Total Score</div>
              </div>
            </template>
            ：{{latestTestDataInfo.cgy10str_score + latestTestDataInfo.cgy2000m_score + latestTestDataInfo.cgy30min20str_score + latestTestDataInfo.cgy500m_score + latestTestDataInfo.cgy5000m_score + latestTestDataInfo.strength_score}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <div class="main__top-description-label">
                <div class="main__top-description-label-first">测试日期</div>
                <div>Test Date</div>
              </div>
            </template>
            ：
          </el-descriptions-item>
        </el-descriptions>
        <!-- <el-button id="return" type="primary" @click="returnView">返回总览</el-button> -->
      </div>
      <div class="main__middle">
        <div class="main__middle-left">
          <el-table
            :data="latestCGYTableData"
            style="width: 100%"
            key="latestCGYTableData"
            :cell-style="setCellStyle"
          >
            <el-table-column label="测试情况" width="160" align="center">
              <el-table-column prop="cgy_item" label="测功仪指标" width="160" align="center"></el-table-column>
            </el-table-column>
            <el-table-column width="120" align="center">
              <template #header>最近一次</template>
              <el-table-column prop="score" label="得分" width="80" align="center"></el-table-column>
              <el-table-column prop="result" label="实测值" width="80" align="center"></el-table-column>
              <el-table-column prop="pace" label="配速" width="80" align="center"></el-table-column>
              <el-table-column prop="standard" label="标准" width="110" align="center"></el-table-column>
            </el-table-column>
          </el-table>
          <el-table
            :data="latestStrengthTableData"
            style="width: 100%"
            key="latestStrengthTableData"
            border
            :cell-style="setCellStyle"
          >
            <el-table-column prop="strength_item" label="力量指标" width="160" align="center"></el-table-column>
            <el-table-column prop="Tscore" label="总分" width="80" align="center"></el-table-column>
            <el-table-column prop="score" label="得分" width="80" align="center"></el-table-column>
            <el-table-column prop="result" label="实测值" width="80" align="center"></el-table-column>
            <el-table-column prop="standard" label="标准" width="110" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="main__middle-middle">
          <div class="main__middle-middle-echarts" id="chart_show"></div>
        </div>
        <div class="main__middle-right">
          <el-table
            :data="bestCGYTableData"
            style="width: 100%"
            key="bestCGYTableData"
            :cell-style="setCellStyle"
          >
            <el-table-column label="测试情况" width="160" align="center">
              <el-table-column prop="cgy_item" label="测功仪指标" width="160" align="center"></el-table-column>
            </el-table-column>
            <el-table-column width="120" align="center">
              <template #header>最好一次</template>
              <el-table-column prop="score" label="得分" width="80" align="center"></el-table-column>
              <el-table-column prop="result" label="实测值" width="80" align="center"></el-table-column>
              <el-table-column prop="pace" label="配速" width="80" align="center"></el-table-column>
              <el-table-column prop="diff" label="差值" width="110" align="center"></el-table-column>
            </el-table-column>
          </el-table>
          <el-table
            :data="bestStrengthTableData"
            style="width: 100%"
            key="bestStrengthTableData"
            border
            :cell-style="setCellStyle"
          >
            <el-table-column prop="strength_item" label="力量指标" width="160" align="center"></el-table-column>
            <el-table-column prop="Tscore" label="总分" width="80" align="center"></el-table-column>
            <el-table-column prop="score" label="得分" width="80" align="center"></el-table-column>
            <el-table-column prop="result" label="实测值" width="80" align="center"></el-table-column>
            <el-table-column prop="diff" label="差值" width="110" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import myAxios from '@/utils/request'
export default {
  data () {
    return {
      personInfo: [],
      latestTestDataInfo: [],
      latestCGYTableData: [],
      latestStrengthTableData: [],
      bestCGYTableData: [],
      bestStrengthTableData: [],
      bestTestDataInfo: [],
      testDate: '',
      lastTestDate: '',
      athleteId: '',
      test_dates: [],
    }
  },
  mounted () {
    this.getData()
  },
  watch: {
    latestTestDataInfo: {
      handler (newValue, oldValue) {
        this.formatLatestCGYTableData()
        this.formatLatestStrengthTableData()
      },
      deep: true
    },
    bestTestDataInfo: {
      handler (newValue, oldValue) {
        this.formatBestCGYTableData()
        this.formatBestStrengthTableData()
      },
      deep: true
    }
  },
  methods: {
    formatLatestCGYTableData () {
      this.latestCGYTableData = []
      this.latestCGYTableData.push({
        cgy_item: '测功仪2000m',
        score: this.latestTestDataInfo['cgy2000m_score'],
        result: this.latestTestDataInfo['cgy2000m_result'],
        pace: this.latestTestDataInfo['cgy2000m_pace'],
        standard: this.personInfo.gender === 'M' ? '05:50.0' : '06:46.0'
      })
      this.latestCGYTableData.push({
        cgy_item: '测功仪5000m',
        score: this.latestTestDataInfo['cgy5000m_score'],
        result: this.latestTestDataInfo['cgy5000m_result'],
        pace: this.latestTestDataInfo['cgy5000m_pace'],
        standard: this.personInfo.gender === 'M' ? '17:50.0' : '17:39.0'
      })
      this.latestCGYTableData.push({
        cgy_item: '测功仪30分钟/20桨频',
        score: this.latestTestDataInfo['cgy30min20str_score'],
        result: this.latestTestDataInfo['cgy30min20str_tresult'],
        pace: this.latestTestDataInfo['cgy30min20str_pace'],
        standard: this.personInfo.gender === 'M' ? '9000/01:40.0' : '8000/01:52.0'
      })
      this.latestCGYTableData.push({
        cgy_item: '测功仪500m',
        score: this.latestTestDataInfo['cgy500m_score'],
        result: this.latestTestDataInfo['cgy500m_result'],
        pace: this.latestTestDataInfo['cgy500m_pace'],
        standard: this.personInfo.gender === 'M' ? '01:14.0' : '01:26.0'
      })
      this.latestCGYTableData.push({
        cgy_item: '测功仪100m',
        score: this.latestTestDataInfo['cgy10str_score'],
        result: this.latestTestDataInfo['cgy10str_result'],
        pace: this.latestTestDataInfo['cgy10str_pace'],
        standard: this.personInfo.gender === 'M' ? '01:17.0' : '01:18.0'
      })
    },
    formatLatestStrengthTableData () {
      this.latestStrengthTableData = []
      this.latestStrengthTableData.push({
        strength_item: '深蹲(kg)',
        Tscore: this.latestTestDataInfo['strength_score'],
        score: this.latestTestDataInfo['squat_score'],
        result: this.latestTestDataInfo['deep_squat_1rm'],
        standard: this.personInfo.gender === 'M' ? '140' : '110'
      })
      this.latestStrengthTableData.push({
        strength_item: '卧拉(kg)',
        Tscore: this.latestTestDataInfo['strength_score'],
        score: this.latestTestDataInfo['pull_score'],
        result: this.latestTestDataInfo['bench_pull_1rm'],
        standard: this.personInfo.gender === 'M' ? '105' : '80'
      })
      this.latestStrengthTableData.push({
        strength_item: '卧推(kg)',
        Tscore: this.latestTestDataInfo['strength_score'],
        score: this.latestTestDataInfo['press_score'],
        result: this.latestTestDataInfo['bench_press_1rm'],
        standard: this.personInfo.gender === 'M' ? '105' : '80'
      })
    },
    formatBestCGYTableData () {
      this.bestCGYTableData = []
      this.bestCGYTableData.push({
        cgy_item: '测功仪2000m',
        score: this.bestTestDataInfo['cgy2000m_score'],
        result: this.bestTestDataInfo['cgy2000m_result'],
        pace: this.bestTestDataInfo['cgy2000m_pace'],
        diff: -parseFloat(this.timeStringToSeconds(this.bestTestDataInfo.cgy2000m_result) - this.timeStringToSeconds(this.latestTestDataInfo.cgy2000m_result)).toFixed(2) + 's'
      })
      this.bestCGYTableData.push({
        cgy_item: '测功仪5000m',
        score: this.bestTestDataInfo['cgy5000m_score'],
        result: this.bestTestDataInfo['cgy5000m_result'],
        pace: this.bestTestDataInfo['cgy5000m_pace'],
        diff: -parseFloat(this.timeStringToSeconds(this.bestTestDataInfo.cgy5000m_result) - this.timeStringToSeconds(this.latestTestDataInfo.cgy5000m_result)).toFixed(2) + 's'
      })
      this.bestCGYTableData.push({
        cgy_item: '测功仪30分钟/20桨频',
        score: this.bestTestDataInfo['cgy30min20str_score'],
        result: this.bestTestDataInfo['cgy30min20str_tresult'],
        pace: this.bestTestDataInfo['cgy30min20str_pace'],
        // diff: this.bestTestDataInfo.cgy30min20str_result - this.latestTestDataInfo.cgy30min20str_result
        diff: -parseFloat(this.timeStringToSeconds(this.bestTestDataInfo.cgy30min20str_tresult) - this.timeStringToSeconds(this.latestTestDataInfo.cgy30min20str_tresult)).toFixed(2) + 's'
      })
      this.bestCGYTableData.push({
        cgy_item: '测功仪500m',
        score: this.bestTestDataInfo['cgy500m_score'],
        result: this.bestTestDataInfo['cgy500m_result'],
        pace: this.bestTestDataInfo['cgy500m_pace'],
        diff: -parseFloat(this.timeStringToSeconds(this.bestTestDataInfo.cgy500m_result) - this.timeStringToSeconds(this.latestTestDataInfo.cgy500m_result)).toFixed(2) + 's'
      })
      this.bestCGYTableData.push({
        cgy_item: '测功仪100m',
        score: this.bestTestDataInfo['cgy10str_score'],
        result: this.bestTestDataInfo['cgy10str_result'],
        pace: this.bestTestDataInfo['cgy10str_pace'],
        diff: -parseFloat(this.timeStringToSeconds(this.bestTestDataInfo.cgy10str_result) - this.timeStringToSeconds(this.latestTestDataInfo.cgy10str_result)).toFixed(2) + 's'
      })
    },
    formatBestStrengthTableData () {
      this.bestStrengthTableData = []
      this.bestStrengthTableData.push({
        strength_item: '深蹲(kg)',
        Tscore: this.bestTestDataInfo['strength_score'],
        score: this.bestTestDataInfo['squat_score'],
        result: this.bestTestDataInfo['deep_squat_1rm'],
        diff: this.bestTestDataInfo.deep_squat_1rm - this.latestTestDataInfo.deep_squat_1rm
      })
      this.bestStrengthTableData.push({
        strength_item: '卧拉(kg)',
        Tscore: this.bestTestDataInfo['strength_score'],
        score: this.bestTestDataInfo['pull_score'],
        result: this.bestTestDataInfo['bench_pull_1rm'],
        diff: this.bestTestDataInfo.bench_pull_1rm - this.latestTestDataInfo.bench_pull_1rm
      })
      this.bestStrengthTableData.push({
        strength_item: '卧推(kg)',
        Tscore: this.bestTestDataInfo['strength_score'],
        score: this.bestTestDataInfo['press_score'],
        result: this.bestTestDataInfo['bench_press_1rm'],
        diff: this.bestTestDataInfo.bench_press_1rm - this.latestTestDataInfo.bench_press_1rm
      })
    },
    getData () {
      myAxios.get('/list/getPersonInfo', {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        const d = res.data[0]
        this.personInfo = d
        this.athleteId = d.athlete_id
        this.personInfo.birthday = this.personInfo.birthday.split('T')[0]
        this.personInfo.weight = this.personInfo.weight || '-'
        this.getBestTestInfo(d.athlete_id)
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    getBestTestInfo(athleteId) {
      const getBasicData = myAxios.get('/tineng/getBasicTinengData', {
        params: {
          id: athleteId
        }
      })
      const getProData = myAxios.get('/tineng/getProTinengData', {
        params: {
          id: athleteId
        }
      })
      Promise.all([getBasicData, getProData]).then(res => {
        const basic = res[0].data.map(item => ({
          bench_press_1rm: item.bench_press_1rm,
          press_score: item.press_score,
          deep_squat_1rm: item.deep_squat_1rm,
          squat_score: item.squat_score,
          bench_pull_1rm: item.bench_pull_1rm,
          pull_score: item.pull_score,
          strength_score: item.strength_score
        }))
        const pro = res[1].data
        const length = Math.max(basic.length, pro.length)
        const finalResultList = []
        const keys = [
          'bench_press_1rm',
          'press_score',
          'deep_squat_1rm',
          'squat_score',
          'bench_pull_1rm',
          'pull_score',
          'strength_score',
          'cgy500m_result',
          'cgy500m_score',
          'cgy500m_pace',
          'cgy2000m_score',
          'cgy2000m_pace',
          'cgy2000m_result',
          'cgy5000m_score',
          'cgy5000m_result',
          'cgy5000m_pace',
          'cgy30min20str_score',
          'cgy30min20str_result',
          'cgy30min20str_pace',
          'cgy10str_score',
          'cgy10str_pace',
          'cgy10str_result',
          'cgy30min20str_tresult'
        ];
        for (let i = 0; i < length; i++) {
          const combinedMap = {}
          let scoreKey = 'totalScore'
          var score = 0
          keys.forEach(key => {
            combinedMap[key] = null
          })
          const basicItem = i < basic.length ? basic[i] : {}
          const proItem = i < pro.length ? pro[i] : {}
          const basicKeys = Object.keys(basicItem)
          // console.log(basicKeys)
          const proKeys = Object.keys(proItem)
          // console.log(proKeys)
          basicKeys.forEach(key => {
            combinedMap[key] = basicItem[key]
            if (key === 'strength_score') {
              score += basicItem[key] === null ? 0 : parseInt(basicItem[key])
            }
          })
          proKeys.forEach(key => {
            combinedMap[key] = proItem[key]
            if (key === 'cgy500m_score' || key === 'cgy2000m_score' || key === 'cgy5000m_score' || key === 'cgy30min20str_score' || key === 'cgy10str_score') {
              score += proItem[key] === null ? 0 : parseInt(proItem[key])
            }
          })
          combinedMap[scoreKey] = score
          finalResultList.push(combinedMap)
        }
        // console.log('finalResultList1')
        // console.log(finalResultList)
        this.latestTestDataInfo = finalResultList[0]
        this.latestTestDataInfo.cgy30min20str_tresult = this.removeBeforeFirstColon(this.latestTestDataInfo.cgy30min20str_tresult)
        this.latestTestDataInfo.cgy10str_result = this.removeBeforeFirstColon(this.latestTestDataInfo.cgy10str_result)
        this.latestTestDataInfo.cgy2000m_result = this.removeBeforeFirstColon(this.latestTestDataInfo.cgy2000m_result)
        this.latestTestDataInfo.cgy5000m_result = this.removeBeforeFirstColon(this.latestTestDataInfo.cgy5000m_result)
        this.latestTestDataInfo.cgy500m_result = this.removeBeforeFirstColon(this.latestTestDataInfo.cgy500m_result)
        this.formatLatestCGYTableData()
        this.formatLatestStrengthTableData()
        this.setChart()
        finalResultList.sort((a, b) => {
          return b.totalScore - a.totalScore;
        })
        // console.log('finalResultList2')
        // console.log(finalResultList)
        this.bestTestDataInfo = finalResultList[0]
        this.bestTestDataInfo.cgy30min20str_tresult = this.removeBeforeFirstColon(this.bestTestDataInfo.cgy30min20str_tresult)
        this.bestTestDataInfo.cgy10str_result = this.removeBeforeFirstColon(this.bestTestDataInfo.cgy10str_result)
        this.bestTestDataInfo.cgy2000m_result = this.removeBeforeFirstColon(this.bestTestDataInfo.cgy2000m_result)
        this.bestTestDataInfo.cgy5000m_result = this.removeBeforeFirstColon(this.bestTestDataInfo.cgy5000m_result)
        this.bestTestDataInfo.cgy500m_result = this.removeBeforeFirstColon(this.bestTestDataInfo.cgy500m_result)
        // console.log('最好一次')
        // console.log(this.bestTestDataInfo)
        this.formatBestCGYTableData()
        this.formatBestStrengthTableData()
        this.setChart()
      })
    },
    removeBeforeFirstColon(str) {
      let parts = str.split(':')
      if (parts.length - 1 === 1) {
        return str
      }
      let index = str.indexOf(':')
      let newStr = str.substring(index + 1)
      return newStr
    },
    setRowStyle ({row, rowIndex}) {
      return {
        background: 'rgba(144, 147, 153, 0.2)'
      }
    },
    setCellStyle ({rowIndex, columnIndex, row, column}) {
      if ((row['score'] >= 80 && column.property === 'score') || (row['TScore'] >= 80 && column.property === 'TScore')) return 'background-color: rgba(153, 204, 0, 0.3);'
      else if ((row['score'] < 80 && column.property === 'score') || (row['TScore'] < 80 && column.property === 'TScore')) return 'background-color: rgba(255,0,0,0.5);'
    },
    timeStringToSeconds (timeString) {
      const timeArr = timeString.split(':')
      const [minutes, seconds] = timeArr.length > 1 ? timeArr.map(Number) : [0, 0]
      const totalSeconds = minutes * 60 + seconds
      return totalSeconds
    },
    returnView () {
      this.$router.push('/label')
    },
    setChart () {
      var chartDom = document.getElementById('chart_show')
      var myChart = echarts.init(chartDom)
      var option

      const data = [
        {
          value: [this.latestTestDataInfo.cgy2000m_score, this.latestTestDataInfo.strength_score, this.latestTestDataInfo.cgy10str_score, this.latestTestDataInfo.cgy30min20str_score, this.latestTestDataInfo.cgy500m_score, this.latestTestDataInfo.cgy5000m_score],
          name: '最近一次',
          areaStyle: {
            color: 'rgba(253, 174, 73, 0.8)'
          },
          lineStyle: {
            normal: {
              width: 3,
              type: 'dashed'
            }
          }
        },
        {
          value: [this.bestTestDataInfo.cgy2000m_score, this.bestTestDataInfo.strength_score, this.bestTestDataInfo.cgy10str_score, this.bestTestDataInfo.cgy30min20str_score, this.bestTestDataInfo.cgy500m_score, this.bestTestDataInfo.cgy5000m_score],
          name: '最好一次',
          // areaStyle: {
          //   color: 'rgba(209, 73, 91, 0.8)'
          // },
          lineStyle: {
            normal: {
              width: 3,
              type: 'dashed'
            }
          }
        },
        {
          value: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          name: '标准'
        }
      ]
      option = {
        color: ['#EDAE49', '#D1495B', '#00798C'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 5,
          data: ['最近一次', '最好一次', '标准'],
          itemGap: 20,
          textStyle: {
            color: '#000',
            fontSize: 14
          }
        },
        radar: {
          indicator: [{
            name: 'Erg 2k',
            max: 140
          }, {
            name: '基础力量',
            max: 140
          }, {
            name: 'Erg 100m',
            max: 140
          }, {
            name: 'Erg 30@20',
            max: 140
          }, {
            name: 'Erg 500m',
            max: 140
          }, {
            name: 'Erg 5k',
            max: 140
          }],
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
.main {
  &__wrapper {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    padding: 0 10px 0 10px;
    height: 95vh;
    box-sizing: border-box;
  }
  &__top {
    margin-bottom: 30px;
    &-description {
      color: black;
      &-label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        width: 130px;
        font-weight: 700;
        &-first {
          align-self: flex-end;;
        }
      }
    }
  }
  &__middle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-middle {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 10px;
      &-echarts {
        width: 450px;
        height: 500px;
      }
    }
  }
  &__bottom {
    display: flex;
    flex-direction: column;
    /deep/ .el-table {
      flex: 0 0 auto;
      width: auto;
    }
    &-top {
      display: flex;
      flex-direction: row;
    }
    &-bottom {
      display: flex;
      flex-direction: row;
    }
  }
}
/deep/ .el-table__header th {
  //
  color: black;
}
/deep/ .el-descriptions-item__content {
  align-items: center;
}
/deep/ .testDate {
  font-size: 12px;
}

/deep/ .el-tabs__content {
  color: black;
}

/deep/ .el-table {
  color: black;
}

/deep/ .el-descriptions__body {
  color: black;
}
</style>
