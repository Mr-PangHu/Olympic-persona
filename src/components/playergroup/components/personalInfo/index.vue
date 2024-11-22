<template>
    <div class="personalInfo__wrapper">
        <!-- <el-descriptions title="运动员基本资料" :labelStyle="labelStyle">
            <el-descriptions-item label="姓名">{{ personInfo.name }}</el-descriptions-item>
            <el-descriptions-item label="出生日期">{{ formatDate(personInfo.birthday) }}</el-descriptions-item>
            <el-descriptions-item label="年龄">{{ getAge(personInfo.birthday) }}</el-descriptions-item>
            <el-descriptions-item label="性别">
            <el-tag size="small">{{ personInfo.gender }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="婚姻状况">{{ personInfo.marital_status }}</el-descriptions-item>
            <el-descriptions-item label="受教育程度">{{ personInfo.education_level }}</el-descriptions-item>
            <el-descriptions-item label="专业训练年限（练赛艇算起）">{{ personInfo.professional_training_years }}年</el-descriptions-item>
            <el-descriptions-item label="训练经历">{{ personInfo.training_experience }}</el-descriptions-item>
            <el-descriptions-item label="运动等级">{{ personInfo.sports_level }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" title="身体形态" :column="4" border :labelStyle="labelBodyShapeStyle" style="margin-top: 50px">
            <el-descriptions-item label="身高（cm）">
                {{ personInfo.height }}
            </el-descriptions-item>
            <el-descriptions-item label="体重（kg）">
                {{ personInfo.weight }}
            </el-descriptions-item>
            <el-descriptions-item label="指距（cm）">
                xx
            </el-descriptions-item>
            <el-descriptions-item label="上肢长（cm）">
                xx
            </el-descriptions-item>
            <el-descriptions-item label="肩宽（cm）">
                xx
            </el-descriptions-item>
            <el-descriptions-item label="髋宽（cm）">
                xx
            </el-descriptions-item>
            <el-descriptions-item label="胸围（cm）">
                xx
            </el-descriptions-item>
            <el-descriptions-item label="腰围（cm）">
                xx
            </el-descriptions-item>
            <el-descriptions-item label="大腿围（cm）">
                xx
            </el-descriptions-item>
            <el-descriptions-item label="小腿围（cm）">
                xx
            </el-descriptions-item>
            <el-descriptions-item label="下肢长B（cm）">
                xx
            </el-descriptions-item>
            <el-descriptions-item label="小腿长A（cm）">
                xx
            </el-descriptions-item>
            <el-descriptions-item label="跟腱长（cm）">
                xx
            </el-descriptions-item>
            <el-descriptions-item label="踝围（cm）">
                xx
            </el-descriptions-item>
            <el-descriptions-item label="下蹲伸臂距（cm）">
                xx
            </el-descriptions-item>
        </el-descriptions> -->
        <div class="personalInfo__topper">
            <div class="personalInfo__topper-info">
                <div class="personalInfo__topper-info-title">个人信息</div>
                <div style="display: flex; justify-content: center">
                    <div class="personalInfo__topper-info-main">
                        <div class="personalInfo__topper-info-main-left">
                            <div class="personalInfo__topper-info-main-left-avatar">
                                <!-- <el-avatar :size="130" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar> -->
                                <el-avatar :size="130">
                                  <img v-if="imageDataUrl" :src="imageDataUrl" alt="Image">
                                  <img v-else src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="Default Image">
                                </el-avatar>
                            </div>
                            <div class="personalInfo__topper-info-main-left-name">
                                {{ personInfo.name }}
                            </div>
                            <div class="personalInfo__topper-info-main-left-location">
                                <i class="el-icon-map-location"></i>
                                <span class="personalInfo__topper-info-main-left-location-detail"></span>
                            </div>
                        </div>
                        <div class="personalInfo__topper-info-main-right">
                            <el-descriptions title="基本资料" :labelStyle="labelStyle" :column="1">
                                <el-descriptions-item label="性别">{{ personInfo.gender }}</el-descriptions-item>
                                <el-descriptions-item label="运动等级">{{ personInfo.sports_level }}</el-descriptions-item>
                                <el-descriptions-item label="年龄">{{ getAge(personInfo.birthday) }}</el-descriptions-item>
                                <el-descriptions-item label="出生日期">{{ formatDate(personInfo.birthday) }}</el-descriptions-item>
                                <el-descriptions-item label="婚姻状况">{{ personInfo.marital_status || '-' }}</el-descriptions-item>
                                <el-descriptions-item label="受教育程度">{{ personInfo.education_level || '-' }}</el-descriptions-item>
                                <el-descriptions-item label="专业训练年限（练赛艇算起）">{{ personInfo.professional_training_years || '-' }}年</el-descriptions-item>
                                <el-descriptions-item label="训练经历">{{ personInfo.training_experience || '-' }}</el-descriptions-item>
                            </el-descriptions>
                        </div>
                    </div>
                </div>
            </div>
            <div class="personalInfo__topper-general">
                <div class="personalInfo__topper-general-title">个人综合评价</div>
                <div class="personalInfo__topper-general-chart" id="general_show"></div>
            </div>
        </div>
        <div class="personalInfo__middle">
            <div class="personalInfo__middle-img"></div>
            <div style="display: flex; justify-content: center">
                <div class="personalInfo__middle-chart" id="bodyShape_show"></div>
            </div>
        </div>
    </div>
</template>

<script>
import myAxios from '@/utils/request'
import { formatDate } from '@/utils/formatDate'
import { getAge } from '@/utils/getAge'
import * as echarts from 'echarts'
export default {
  data () {
    return {
      labelStyle: {
        'font-weight': '700'
      },
      labelBodyShapeStyle: {
        'width': '150px',
        'font-weight': '700'
      },
      personInfo: [],
      chartData: [],
      imageDataUrl: ''
    }
  },
  mounted () {
    this.getPersonInfo()
  },
  methods: {
    getPersonInfo () {
      myAxios.get('/list/getPersonInfo', {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        const d = res.data[0]
        console.log('personinfos')
        console.log(res.data[0])
        this.personInfo = d
        this.getChartData(this.personInfo.athlete_id)
        this.setBodyChart()
        // this.displayImage(this.personInfo.image)
        // console.log(this.personInfo.image)
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    getChartData (athleteId) {
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
        finalResultList.sort((a, b) => {
          return b.totalScore - a.totalScore;
        })
        this.chartData = finalResultList[0]
        this.chartData.cgy30min20str_tresult = this.removeBeforeFirstColon(this.chartData.cgy30min20str_tresult)
        this.chartData.cgy10str_result = this.removeBeforeFirstColon(this.chartData.cgy10str_result)
        this.chartData.cgy2000m_result = this.removeBeforeFirstColon(this.chartData.cgy2000m_result)
        this.chartData.cgy5000m_result = this.removeBeforeFirstColon(this.chartData.cgy5000m_result)
        this.chartData.cgy500m_result = this.removeBeforeFirstColon(this.chartData.cgy500m_result)
        this.setChart()
        console.log('chart')
        console.log(this.chartData)
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
    displayImage (imageBinaryData) {
      // 使用Pillow库将二进制数据转换为图像的data URL
      // console.log(imageBinaryData)
      const imageBuffer = Buffer.from(imageBinaryData) // 将数组转换为 Buffer
      const base64Data = imageBuffer.toString('base64') // 将 Buffer 转换为 Base64 编码的字符串
      this.imageDataUrl = `data:image/jpg;base64,${base64Data}` // 将 Base64 编码的图像数据赋值给 imageDataUrl
    },
    formatDate (d) {
      return formatDate(d)
    },
    getAge (d) {
      return getAge(formatDate(d))
    },
    setChart () {
      var chartDom = document.getElementById('general_show')
      var myChart = echarts.init(chartDom)
      var option

      const data = [
        {
          value: [this.chartData.cgy2000m_score, this.chartData.cgy5000m_score, this.chartData.cgy30min20str_score, this.chartData.cgy500m_score, this.chartData.cgy10str_score, this.chartData.strength_score],
          name: '我',
          areaStyle: {
            color: 'rgba(253, 174, 73, 0.8)'
          }
        },
        {
          value: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          name: '标准'
        }
      ]
      option = {
        color: ['#EDAE49', '#00798C'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 5,
          right: 0,
          data: ['我', '标准'],
          itemGap: 20,
          textStyle: {
            color: '#000',
            fontSize: 14,
            fontWeight: 700
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
            name: '测功仪100m',
            max: 120
          }, {
            name: '力量',
            max: 120
          }],
          axisName: {
            color: '#000',
            fontWeight: '700'
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
    },
    setBodyChart () {
      var chartDom = document.getElementById('bodyShape_show')
      var myChart = echarts.init(chartDom)
      // console.log(this.personInfo)
      var option

      const data = [this.personInfo.squat_reach, this.personInfo.ankle_circumference, this.personInfo.achilles_tendon_length, this.personInfo.lower_leg_length_a, this.personInfo.lower_leg_length_b, this.personInfo.calf_circumference, this.personInfo.thigh_circumference, this.personInfo.waist_circumference, this.personInfo.chest_circumference, this.personInfo.hip_width, this.personInfo.shoulder_width, this.personInfo.upper_arm_length, this.personInfo.finger_length]
      option = {
        color: ['#003D5B'],
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          name: 'cm'
        },
        yAxis: {
          data: [
            '指距',
            '上肢长',
            '肩宽',
            '髋宽',
            '胸围',
            '腰围',
            '大腿围',
            '小腿围',
            '下肢长B',
            '小腿长A',
            '跟腱长',
            '踝围',
            '下蹲伸臂距'
          ].reverse(),
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        series: [
          {
            type: 'bar',
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
.personalInfo {
  &__wrapper {
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    overflow: auto;
  }
  &__topper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    &-info {
        display: flex;
        flex-direction: column;
        flex: 1;
        border-radius: 20px;
        padding: 5px;
        margin: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
        &-title {
            font-size: 20px;
            font-weight: 700;
            color: rgba(144, 144, 144, 0.8);
            padding: 10px;
            border-bottom: 3px solid rgba(0, 0, 0, 0.1);
        }
        &-main {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            height: 400px;
            &-left {
                display: flex;
                flex-direction: column;
                align-items: center;
                min-width: 150px;
                margin: 0 100px;
                &-name {
                    font-size: 24px;
                    font-weight: 700;
                    margin: 20px 0;
                }
                &-location {
                    font-size: 16px;
                    &-detail {
                        font-weight: 700;
                        color: rgba(144, 144, 144, 0.8);
                    }
                }
            }
        }
    }
    &-general {
        display: flex;
        flex-direction: column;
        flex: 1;
        border-radius: 20px;
        padding: 5px;
        margin: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
        &-title {
            font-size: 20px;
            font-weight: 700;
            color: rgba(144, 144, 144, 0.8);
            padding: 10px;
            border-bottom: 3px solid rgba(0, 0, 0, 0.1);
        }
        &-chart {
            align-self: center;
            width: 600px;
            height: 400px;
        }
    }
  }
  &__middle {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    &-img {
        width: 600px;
        height: 600px;
        background-image: url('../../../../assets/images/body.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }
    &-chart {
        width: 700px;
        height: 800px;
    }
  }
}

/deep/ .el-descriptions__body {
  color: black;
}
</style>
