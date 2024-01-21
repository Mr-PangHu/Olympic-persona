<template>
  <div class="index__wrapper">
    <el-card class="box-card">
      <div class="main__wrapper">
        <div>
          <el-form :inline="true" ref="dateForm">
            <el-form-item>
              <el-select
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
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="main__top" >
          <el-descriptions class="margin-top" title="运动员信息(排名为左侧测试排名)" :column="5" border>
            <el-descriptions-item>
              <template slot="label">
                姓名<br>Name
              </template>
              {{personInfo.name}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div>年龄<br>Age</div>
              </template>
              {{new Date().getFullYear() - personInfo.birthday.split('-')[0]}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div>级别<br>Class</div>
              </template>
              LW
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div>身高<br>Height</div>
              </template>
              {{personInfo.height}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div>出生日期<br>Date of Birth</div>
              </template>
              {{personInfo.birthday}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div>总排名<br>Rank</div>
              </template>
              {{lastTestDataPersonInfo.test_rank}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div>总分<br>Total Score</div>
              </template>
              {{lastTestDataPersonInfo.cgy10str_score + lastTestDataPersonInfo.cgy2000m_score + lastTestDataPersonInfo.cgy30min20str_score + lastTestDataPersonInfo.cgy500m_score + lastTestDataPersonInfo.cgy5000m_score + lastTestDataPersonInfo.strength_score}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div>组别<br>Group</div>
              </template>
              LWx
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div>体重<br>Weight</div>
              </template>
              {{personInfo.weight.toFixed(2)}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div>测试日期<br>Test Date</div>
              </template>
              {{lastTestDataPersonInfo.test_date}}
            </el-descriptions-item>
          </el-descriptions>
          <!-- <el-button id="return" type="primary" @click="returnView">返回总览</el-button> -->
        </div>
        <div class="main__middle">
          <div class="main__middle-left">
            <el-table
              :data="Erg2k"
              border
              style="width: 100%"
              :cell-style="setCellStyle"
            >
              <el-table-column prop="item" width="160">
                <template #header>
                  <div>{{lastTestDate}}</div>
                  <div>指标</div>
                </template>
              </el-table-column>
              <el-table-column prop="score" width="100">
                <template slot="header">
                  <div>得分</div>
                  <div>Score</div>
                </template>
              </el-table-column>
              <el-table-column label="成绩（mm:ss.0）" align="center">
                <el-table-column prop="result" width="100">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="pace" width="100">
                  <template slot="header" >
                    <div>配速</div>
                    <div>Pace</div>
                  </template>
                </el-table-column>
                <el-table-column prop="standard" width="110">
                  <template slot="header">
                    <div>标准</div>
                    <div>Standard</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              :data="Erg5k"
              border
              style="width: 100%"
              :cell-style="setCellStyle"
            >
              <el-table-column prop="item" width="160">
                <template #header>
                  <div>{{lastTestDate}}</div>
                  <div>指标</div>
                </template>
              </el-table-column>
              <el-table-column prop="score" width="100">
                <template slot="header">
                  <div>得分</div>
                  <div>Score</div>
                </template>
              </el-table-column>
              <el-table-column label="成绩（mm:ss.0）" align="center">
                <el-table-column prop="result" width="100">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="pace" width="100">
                  <template slot="header">
                    <div>配速</div>
                    <div>Pace</div>
                  </template>
                </el-table-column>
                <el-table-column prop="standard" width="110">
                  <template slot="header">
                    <div>标准</div>
                    <div>Standard</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              :data="Erg30"
              border
              style="width: 100%"
              :cell-style="setCellStyle"
            >
              <el-table-column prop="item" width="160">
                <template #header>
                  <div>{{lastTestDate}}</div>
                  <div>指标</div>
                </template>
              </el-table-column>
              <el-table-column prop="score" width="100">
                <template slot="header">
                  <div>得分</div>
                  <div>Score</div>
                </template>
              </el-table-column>
              <el-table-column label="距离（m）" align="center">
                <el-table-column prop="result" width="100">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="pace" width="100">
                  <template slot="header">
                    <div>配速</div>
                    <div>Pace</div>
                  </template>
                </el-table-column>
                <el-table-column prop="standard" width="110">
                  <template slot="header">
                    <div>标准</div>
                    <div>Standard</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              :data="Erg500m"
              border
              style="width: 100%"
              :cell-style="setCellStyle"
            >
              <el-table-column prop="item" width="160">
                <template #header>
                  <div>{{lastTestDate}}</div>
                  <div>指标</div>
                </template>
              </el-table-column>
              <el-table-column prop="score" width="100">
                <template slot="header">
                  <div>得分</div>
                  <div>Score</div>
                </template>
              </el-table-column>
              <el-table-column label="功率（W）" align="center">
                <el-table-column prop="result" width="100">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="pace" width="100">
                  <template slot="header">
                    <div>配速</div>
                    <div>Pace</div>
                  </template>
                </el-table-column>
                <el-table-column prop="standard" width="110">
                  <template slot="header">
                    <div>标准</div>
                    <div>Standard</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              :data="Erg10str"
              border
              style="width: 100%"
              :cell-style="setCellStyle"
            >
              <el-table-column prop="item" width="160">
                <template #header>
                  <div>{{lastTestDate}}</div>
                  <div>指标</div>
                </template>
              </el-table-column>
              <el-table-column prop="score" width="100">
                <template slot="header">
                  <div>得分</div>
                  <div>Score</div>
                </template>
              </el-table-column>
              <el-table-column label="功率（W）" align="center">
                <el-table-column prop="result" width="100">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="pace" width="100">
                  <template slot="header">
                    <div>配速</div>
                    <div>Pace</div>
                  </template>
                </el-table-column>
                <el-table-column prop="standard" width="110">
                  <template slot="header">
                    <div>标准</div>
                    <div>Standard</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <div class="main__middle-middle">
            <div class="main__middle-middle-echarts" id="chart_show"></div>
          </div>
          <div class="main__middle-right">
            <el-table
              :data="Erg2kTest"
              border
              style="width: 100%"
              :row-style="setRowStyle"
            >
              <el-table-column prop="score" width="100">
                <template #header>
                  <div class="testDate">{{testDate}}</div>
                  <div>得分</div>
                  <div>Score</div>
                </template>
              </el-table-column>
              <el-table-column label="成绩（mm:ss.0）" align="center">
                <el-table-column prop="result" width="80">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="pace" width="80">
                  <template slot="header">
                    <div>配速</div>
                    <div>Pace</div>
                  </template>
                </el-table-column>
                <el-table-column prop="diff" width="80">
                  <template slot="header">
                    <div>差值</div>
                    <div>Diff</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              :data="Erg5kTest"
              border
              style="width: 100%"
              :row-style="setRowStyle"
            >
              <el-table-column prop="score" width="100">
                <template #header>
                  <div class="testDate">{{testDate}}</div>
                  <div>得分</div>
                  <div>Score</div>
                </template>
              </el-table-column>
              <el-table-column label="成绩（mm:ss.0）" align="center">
                <el-table-column prop="result" width="80">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="pace" width="80">
                  <template slot="header">
                    <div>配速</div>
                    <div>Pace</div>
                  </template>
                </el-table-column>
                <el-table-column prop="diff" width="80">
                  <template slot="header">
                    <div>差值</div>
                    <div>Diff</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              :data="Erg30Test"
              border
              style="width: 100%"
              :row-style="setRowStyle"
            >
              <el-table-column prop="score" width="100">
                <template #header>
                  <div class="testDate">{{testDate}}</div>
                  <div>得分</div>
                  <div>Score</div>
                </template>
              </el-table-column>
              <el-table-column label="距离（m）" align="center">
                <el-table-column prop="result" width="80">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="pace" width="80">
                  <template slot="header">
                    <div>配速</div>
                    <div>Pace</div>
                  </template>
                </el-table-column>
                <el-table-column prop="diff" width="80">
                  <template slot="header">
                    <div>差值</div>
                    <div>Diff</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              :data="Erg500mTest"
              border
              style="width: 100%"
              :row-style="setRowStyle"
            >
              <el-table-column prop="score" width="100">
                <template #header>
                  <div class="testDate">{{testDate}}</div>
                  <div>得分</div>
                  <div>Score</div>
                </template>
              </el-table-column>
              <el-table-column label="功率（W）" align="center">
                <el-table-column prop="result" width="80">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="pace" width="80">
                  <template slot="header">
                    <div>配速</div>
                    <div>Pace</div>
                  </template>
                </el-table-column>
                <el-table-column prop="diff" width="80">
                  <template slot="header">
                    <div>差值</div>
                    <div>Diff</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              :data="Erg10strTest"
              border
              style="width: 100%"
              :row-style="setRowStyle"
            >
              <el-table-column prop="score" width="100">
                <template #header>
                  <div class="testDate">{{testDate}}</div>
                  <div>得分</div>
                  <div>Score</div>
                </template>
              </el-table-column>
              <el-table-column label="功率（W）" align="center">
                <el-table-column prop="result" width="80">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="pace" width="80">
                  <template slot="header">
                    <div>配速</div>
                    <div>Pace</div>
                  </template>
                </el-table-column>
                <el-table-column prop="diff" width="80">
                  <template slot="header">
                    <div>差值</div>
                    <div>Diff</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="main__bottom">
          <div class="main__bottom-top">
            <el-table
              :data="strengthBackSquat"
              border
              :cell-style="setCellStyle"
            >
              <el-table-column prop="item" width="160">
                <template #header>
                  <div>{{lastTestDate}}</div>
                  <div>指标</div>
                </template>
              </el-table-column>
              <el-table-column prop="tScore" width="100">
                <template slot="header">
                  <div>得分</div>
                  <div>Score</div>
                </template>
              </el-table-column>
              <el-table-column label="深蹲（kg）" align="center">
                <el-table-column prop="result" width="100">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="standard" width="100">
                  <template slot="header">
                    <div>标准</div>
                    <div>Standard</div>
                  </template>
                </el-table-column>
                <el-table-column prop="score" width="110">
                  <template slot="header">
                    <div>评分</div>
                    <div>score</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              :data="benchPull"
              border
              :cell-style="setCellStyle"
            >
              <el-table-column label="卧拉（kg）" align="center">
                <el-table-column prop="result" width="100">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="standard" width="130">
                  <template slot="header">
                    <div>冠军值</div>
                    <div>Gold Standard</div>
                  </template>
                </el-table-column>
                <el-table-column prop="score" width="110">
                  <template slot="header">
                    <div>评分</div>
                    <div>score</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              :data="benchPress"
              border
              :cell-style="setCellStyle"
            >
              <el-table-column label="卧推（kg）" align="center">
                <el-table-column prop="result" width="100">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="standard" width="130">
                  <template slot="header">
                    <div>冠军值</div>
                    <div>Gold Standard</div>
                  </template>
                </el-table-column>
                <el-table-column prop="score" width="110">
                  <template slot="header">
                    <div>评分</div>
                    <div>score</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <div class="main__bottom-bottom">
            <el-table
              :data="strengthBackSquatTest"
              border
              :row-style="setRowStyle"
            >
              <el-table-column prop="item" width="160">
                <template #header>
                  <div>{{testDate}}</div>
                  <div>指标</div>
                </template>
              </el-table-column>
              <el-table-column prop="tScore" width="100">
                <template slot="header">
                  <div>得分</div>
                  <div>Score</div>
                </template>
              </el-table-column>
              <el-table-column label="深蹲（kg）" align="center">
                <el-table-column prop="result" width="100">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="diff" width="100">
                  <template slot="header">
                    <div>差值</div>
                    <div>Diff</div>
                  </template>
                </el-table-column>
                <el-table-column prop="score" width="110">
                  <template slot="header">
                    <div>评分</div>
                    <div>score</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              :data="benchPullTest"
              border
              :row-style="setRowStyle"
            >
              <el-table-column label="卧拉（kg）" align="center">
                <el-table-column prop="result" width="100">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="diff" width="130">
                  <template slot="header">
                    <div>差值</div>
                    <div>Diff</div>
                  </template>
                </el-table-column>
                <el-table-column prop="score" width="110">
                  <template slot="header">
                    <div>评分</div>
                    <div>score</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              :data="benchPressTest"
              border
              :row-style="setRowStyle"
            >
              <el-table-column label="卧推（kg）" align="center">
                <el-table-column prop="result" width="100">
                  <template slot="header">
                    <div>实测值</div>
                    <div>Result</div>
                  </template>
                </el-table-column>
                <el-table-column prop="diff" width="130">
                  <template slot="header">
                    <div>差值</div>
                    <div>Diff</div>
                  </template>
                </el-table-column>
                <el-table-column prop="score" width="110">
                  <template slot="header">
                    <div>评分</div>
                    <div>score</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import myAxios from '@/utils/request'
// import { formatDate } from '@/utils/formatDate'
// import 'echarts/extension/bmap/bmap'
export default {
  data () {
    return {
      Erg2k: [{
        item: '测功仪2000m',
        standard: '06:57.0',
        score: [],
        result: [],
        pace: []
      }],
      Erg5k: [{
        item: '测功仪5000m',
        standard: '18:15.0',
        score: [],
        result: [],
        pace: []
      }],
      Erg30: [{
        item: '测功仪30分钟/20桨频',
        standard: 'U20国际标准',
        score: [],
        result: [],
        pace: []
      }],
      Erg500m: [{
        item: '测功仪500m',
        standard: '360',
        score: [],
        result: [],
        pace: []
      }],
      Erg10str: [{
        item: '测功仪10桨',
        standard: '530',
        score: [],
        result: [],
        pace: []
      }],
      strengthBackSquat: [{
        item: '力量',
        tScore: [],
        result: [],
        standard: '100',
        score: []
      }],
      benchPull: [{
        result: [],
        standard: '70',
        score: []
      }],
      benchPress: [{
        result: [],
        standard: '70',
        score: []
      }],
      Erg2kTest: [{
        score: [],
        result: [],
        pace: [],
        diff: []
      }],
      Erg5kTest: [{
        score: [],
        result: [],
        pace: [],
        diff: []
      }],
      Erg30Test: [{
        score: [],
        result: [],
        pace: [],
        diff: []
      }],
      Erg500mTest: [{
        score: [],
        result: [],
        pace: [],
        diff: []
      }],
      Erg10strTest: [{
        score: [],
        result: [],
        pace: [],
        diff: []
      }],
      strengthBackSquatTest: [{
        item: '力量',
        tScore: [],
        result: [],
        diff: [],
        score: []
      }],
      benchPullTest: [{
        result: [],
        diff: [],
        score: []
      }],
      benchPressTest: [{
        result: [],
        diff: [],
        score: []
      }],
      personInfo: [],
      lastTestDataPersonInfo: [],
      TestDataPersonInfo: [],
      testDate: '',
      lastTestDate: '',
      athleteId: '',
      test_dates: [],
      chooseDate1: [],
      chooseDate2: [],
      chooseDateOptions: [],
      allData: []
    }
  },
  mounted () {
    this.getData()
  },
  // watch: {
  //   testDate: {
  //     handler (newValue, oldValue) {
  //       this.$forceUpdate()
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    getData () {
      myAxios.get('/list/getPersonInfo', {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        const d = res.data[0]
        // console.log(this.athleteId)
        this.personInfo = d
        this.athleteId = d.athlete_id
        this.getDate(d.athlete_id)
        this.personInfo.birthday = this.personInfo.birthday.split('T')[0]
        // console.log(this.personInfo)
        myAxios.get('/quickview/getTestPersonInfo', {
          params: {
            id: d.athlete_id
          }
        }).then(res => {
          this.allData = res.data
          this.lastTestDataPersonInfo = res.data[0]
          this.TestDataPersonInfo = res.data[1]
          this.lastTestDataPersonInfo.test_date = this.lastTestDataPersonInfo.test_date.split('T')[0]
          // this.setDivContent()
          this.TestDataPersonInfo.test_date = this.TestDataPersonInfo.test_date.split('T')[0]
          // 最近一次的数据
          this.getLastTestDataPersonInfo()
          // 倒数第二次的数据
          this.getTestDataPersonInfo()
          this.setChart()
        })
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    getDate (id) {
      console.log(id)
      myAxios.get('/quickview/getTestPersonInfo', {
        params: {
          id: id
        }
      }).then(res => {
        res.data.forEach(item => {
          item.test_date = item.test_date.split('T')[0]
          this.test_dates.push(item.test_date)
        })
        this.chooseDateOptions = Array.from(new Set(this.test_dates)).map(item => {
          return {
            label: item,
            value: item
          }
        })
      })
    },
    handleSelectTestDate1 () {
      this.getChooseData1()
    },
    handleSelectTestDate2 () {
      this.getChooseData2()
    },
    getChooseData1 () {
      this.lastTestDataPersonInfo = []
      myAxios.get('/quickview/getTestInfoByDate', {
        params: {
          id: this.athleteId,
          test_date: this.chooseDate1
        }
      }).then(res => {
        this.lastTestDataPersonInfo = res.data[0]
        this.getLastTestDataPersonInfo()
        this.setChart()
      })
    },
    getChooseData2 () {
      this.TestDataPersonInfo = []
      myAxios.get('/quickview/getTestInfoByDate', {
        params: {
          id: this.athleteId,
          test_date: this.chooseDate2
        }
      }).then(res => {
        this.TestDataPersonInfo = res.data[0]
        this.getTestDataPersonInfo()
        this.setChart()
      })
    },
    getLastTestDataPersonInfo () {
      this.Erg2k[0].score = this.lastTestDataPersonInfo.cgy2000m_score
      this.Erg2k[0].result = this.lastTestDataPersonInfo.cgy2000m_result
      this.Erg2k[0].pace = this.lastTestDataPersonInfo.cgy2000m_pace

      this.Erg5k[0].score = this.lastTestDataPersonInfo.cgy5000m_score
      this.Erg5k[0].result = this.lastTestDataPersonInfo.cgy5000m_result
      this.Erg5k[0].pace = this.lastTestDataPersonInfo.cgy5000m_pace

      this.Erg30[0].score = this.lastTestDataPersonInfo.cgy30min20str_score
      this.Erg30[0].result = this.lastTestDataPersonInfo.cgy30min20str_result
      this.Erg30[0].pace = this.lastTestDataPersonInfo.cgy30min20str_pace

      this.Erg500m[0].score = this.lastTestDataPersonInfo.cgy500m_score
      this.Erg500m[0].result = this.lastTestDataPersonInfo.cgy500m_result
      this.Erg500m[0].pace = this.lastTestDataPersonInfo.cgy500m_pace

      this.Erg10str[0].score = this.lastTestDataPersonInfo.cgy10str_score
      this.Erg10str[0].result = this.lastTestDataPersonInfo.cgy10str_result
      this.Erg10str[0].pace = this.lastTestDataPersonInfo.cgy10str_pace

      this.strengthBackSquat[0].tScore = this.lastTestDataPersonInfo.strength_score
      this.strengthBackSquat[0].score = this.lastTestDataPersonInfo.squat_score
      this.strengthBackSquat[0].result = this.lastTestDataPersonInfo.squat_result

      this.benchPull[0].score = this.lastTestDataPersonInfo.pull_score
      this.benchPull[0].result = this.lastTestDataPersonInfo.pull_result

      this.benchPress[0].score = this.lastTestDataPersonInfo.press_score
      this.benchPress[0].result = this.lastTestDataPersonInfo.press_result
      this.lastTestDate = this.lastTestDataPersonInfo.test_date
    },
    getTestDataPersonInfo () {
      this.Erg2kTest[0].score = this.TestDataPersonInfo.cgy2000m_score
      this.Erg2kTest[0].result = this.TestDataPersonInfo.cgy2000m_result
      this.Erg2kTest[0].pace = this.TestDataPersonInfo.cgy2000m_pace
      this.Erg2kTest[0].diff = -(this.timeStringToSeconds(this.TestDataPersonInfo.cgy2000m_result) - this.timeStringToSeconds(this.lastTestDataPersonInfo.cgy2000m_result)) + 's'

      this.Erg5kTest[0].score = this.TestDataPersonInfo.cgy5000m_score
      this.Erg5kTest[0].result = this.TestDataPersonInfo.cgy5000m_result
      this.Erg5kTest[0].pace = this.TestDataPersonInfo.cgy5000m_pace
      this.Erg5kTest[0].diff = -(this.timeStringToSeconds(this.TestDataPersonInfo.cgy5000m_result) - this.timeStringToSeconds(this.lastTestDataPersonInfo.cgy5000m_result)) + 's'

      this.Erg30Test[0].score = this.TestDataPersonInfo.cgy30min20str_score
      this.Erg30Test[0].result = this.TestDataPersonInfo.cgy30min20str_result
      this.Erg30Test[0].pace = this.TestDataPersonInfo.cgy30min20str_pace
      this.Erg30Test[0].diff = -(this.timeStringToSeconds(this.TestDataPersonInfo.cgy30min20str_result) - this.timeStringToSeconds(this.lastTestDataPersonInfo.cgy30min20str_result)) + 's'

      this.Erg500mTest[0].score = this.TestDataPersonInfo.cgy500m_score
      this.Erg500mTest[0].result = this.TestDataPersonInfo.cgy500m_result
      this.Erg500mTest[0].pace = this.TestDataPersonInfo.cgy500m_pace
      this.Erg500mTest[0].diff = this.TestDataPersonInfo.cgy500m_result - this.lastTestDataPersonInfo.cgy500m_result

      this.Erg10strTest[0].score = this.TestDataPersonInfo.cgy10str_score
      this.Erg10strTest[0].result = this.TestDataPersonInfo.cgy10str_result
      this.Erg10strTest[0].pace = this.TestDataPersonInfo.cgy10str_pace
      this.Erg10strTest[0].diff = this.TestDataPersonInfo.cgy10str_result - this.lastTestDataPersonInfo.cgy10str_result

      this.strengthBackSquatTest[0].tScore = this.TestDataPersonInfo.strength_score
      this.strengthBackSquatTest[0].score = this.TestDataPersonInfo.squat_score
      this.strengthBackSquatTest[0].result = this.TestDataPersonInfo.squat_result
      this.strengthBackSquatTest[0].diff = this.TestDataPersonInfo.squat_result - this.lastTestDataPersonInfo.squat_result

      this.benchPullTest[0].score = this.TestDataPersonInfo.pull_score
      this.benchPullTest[0].result = this.TestDataPersonInfo.pull_result
      this.benchPullTest[0].diff = this.TestDataPersonInfo.pull_result - this.lastTestDataPersonInfo.pull_result

      this.benchPressTest[0].score = this.TestDataPersonInfo.press_score
      this.benchPressTest[0].result = this.TestDataPersonInfo.press_result
      this.benchPressTest[0].diff = this.TestDataPersonInfo.press_result - this.lastTestDataPersonInfo.press_result
      this.testDate = this.TestDataPersonInfo.test_date
    },
    setRowStyle ({row, rowIndex}) {
      return {
        background: 'rgba(144, 147, 153, 0.2)'
      }
    },
    setCellStyle ({rowIndex, columnIndex, row, column}) {
      if ((row['score'] >= 80 && column.property === 'score') || (row['tScore'] >= 80 && column.property === 'tScore')) return 'background-color: rgba(255, 0, 0, 0.8);'
      else if ((row['score'] < 80 && column.property === 'score') || (row['tScore'] < 80 && column.property === 'tScore')) return 'background-color: rgba(0, 255, 0, 0.8);'
    },
    // setDivContent () {
    //   var divs = document.getElementsByName('.test')
    //   console.log(this.lastTestDataPersonInfo.test_date)
    //   divs.innerText = this.lastTestDataPersonInfo.test_date
    // },
    timeStringToSeconds (timeString) {
      const [minutes, seconds] = timeString.split(':').map(Number)
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
          value: [this.lastTestDataPersonInfo.cgy2000m_score, this.lastTestDataPersonInfo.cgy5000m_score, this.lastTestDataPersonInfo.cgy30min20str_score, this.lastTestDataPersonInfo.cgy500m_score, this.lastTestDataPersonInfo.cgy10str_score, this.lastTestDataPersonInfo.strength_score],
          name: this.lastTestDataPersonInfo.test_date,
          areaStyle: {
            color: 'rgba(51, 204, 0, 0.8)'
          }
        },
        {
          value: [this.TestDataPersonInfo.cgy2000m_score, this.TestDataPersonInfo.cgy5000m_score, this.TestDataPersonInfo.cgy30min20str_score, this.TestDataPersonInfo.cgy500m_score, this.TestDataPersonInfo.cgy10str_score, this.TestDataPersonInfo.strength_score],
          name: this.TestDataPersonInfo.test_date
        },
        {
          value: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          name: '标准'
        }
      ]
      option = {
        color: ['#67F9D8', '#333333', '#FFE434'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 5,
          data: [this.lastTestDataPersonInfo.test_date, this.TestDataPersonInfo.test_date, '标准'],
          itemGap: 20,
          textStyle: {
            color: '#666',
            fontSize: 14
          }
        },
        radar: {
          indicator: [{
            name: '测功仪2000m',
            max: 120
          }, {
            name: '测功仪5000m',
            max: 120
          }, {
            name: '测功仪30min/20',
            max: 120
          }, {
            name: '测功仪500m',
            max: 120
          }, {
            name: '测功仪10str',
            max: 120
          }, {
            name: '力量',
            max: 120
          }],
          shape: 'circle',
          splitNumber: 5,
          axisName: {
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
.box-card {
  margin: 0 auto;
  width: 100%;
  padding: 10px;
  .main {
    margin-left: 100px;
  }
}
.main {
  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__top {
    margin-bottom: 10px;
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
        width: 600px;
        height: 600px;
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
  padding: 0;
}
/deep/ .testDate {
  font-size: 12px;
}
</style>
