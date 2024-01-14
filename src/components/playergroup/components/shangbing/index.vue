<template>
    <div class="shangbing__wrapper">
        <div class="shangbing__FMS">
            <div class="search-box">
              <el-form :inline="true">
                <el-form-item label="">
                  <el-select
                    v-model="date"
                    placeholder="示例: 2023-10-25"
                    size="small"
                    @change="handleSelectTrainDate"
                    filterable
                    :disabled="trainDateDisabled"
                  >
                    <el-option
                      v-for="item in trainDateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      <!-- :selected="item.value === dataFMS[0]['date']"> -->
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="info" size="small" @click="reset">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="shangbing__FMS-title">FMS测试 {{this.dataShow['date']}}</div>
            <div class="shangbing__FMS-point">综合得分：{{this.dataShow['composite_score']}}</div>
            <div class="shangbing__FMS-wrapper">
                <div class="shangbing__FMS-wrapper-echarts" id="FMS_show"></div>
            </div>
        </div>
    </div>
</template>

<script>
import myAxios from '@/utils/request'
import * as echarts from 'echarts'
import { formatDate } from '@/utils/formatDate'
export default {
  data () {
    return {
      // squat_score: [],
      // hurdle_step_left: [],
      // hurdle_step_right: [],
      // hurdle_step_score: [],
      // in_line_lunge_left: [],
      // in_line_lunge_right: [],
      // in_line_lunge_score: [],
      // shoulder_flexibility_left: [],
      // shoulder_flexibility_right: [],
      // shoulder_flexibility_score: [],
      // active_straight_leg_raise_left: [],
      // active_straight_leg_raise_right: [],
      // active_straight_leg_raise_score: [],
      // trunk_stability_pushup_score: [],
      // rotary_stability_left: [],
      // rotary_stability_right: [],
      // rotary_stability_score: [],
      // composite_score: [],
      // date: [],
      dataFMS: [],
      trainDateOptions: [],
      dataShow: [],
      date: null
    }
  },
  mounted () {
    this.getPlayerId()
    // this.setFMSChart()
  },
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
          // console.log(this.id)
        }).then(res => {
          this.getShangBingData()
        }).catch(err => {
          console.log('获取数据失败111' + err)
        })
      } else {
        this.id = window.sessionStorage.getItem('id')
        this.getShangBingData()
      }
    },
    getShangBingData () {
      myAxios.get('/shangbing/getFMSData', {
        params: {
          id: this.id
        }
      }).then(res => {
        this.dataFMS = res.data
        // console.log(this.dataFMS)
        const temp = this.dataFMS.map(item => {
          return {
            label: formatDate(item.date),
            value: formatDate(item.date)
          }
        })
        this.trainDateOptions.push.apply(this.trainDateOptions, temp)// 使用push.apply()方法将temp数组的元素添加到trainDateOptions数组中
        // console.log(this.trainDateOptions)
        this.dataShow = this.dataFMS[0]// 默认显示最新的一次测试成绩
        console.log('moren', this.dataShow)
        this.dataShow['date'] = formatDate(this.dataShow['date'])
        // this.squat_score.push(dataFMS[0].squat_score)
        // this.hurdle_step_left.push(dataFMS[0].hurdle_step_left)
        // this.hurdle_step_right.push(dataFMS[0].hurdle_step_right)
        // this.hurdle_step_score.push(dataFMS[0].hurdle_step_score)
        // this.in_line_lunge_left.push(dataFMS[0].in_line_lunge_left)
        // this.in_line_lunge_right.push(dataFMS[0].in_line_lunge_right)
        // this.in_line_lunge_score.push(dataFMS[0].in_line_lunge_score)
        // this.shoulder_flexibility_left.push(dataFMS[0].shoulder_flexibility_left)
        // this.shoulder_flexibility_right.push(dataFMS[0].shoulder_flexibility_right)
        // this.shoulder_flexibility_score.push(dataFMS[0].shoulder_flexibility_score)
        // this.active_straight_leg_raise_left.push(dataFMS[0].active_straight_leg_raise_left)
        // this.active_straight_leg_raise_right.push(dataFMS[0].active_straight_leg_raise_right)
        // this.active_straight_leg_raise_score.push(dataFMS[0].active_straight_leg_raise_score)
        // this.trunk_stability_pushup_score.push(dataFMS[0].trunk_stability_pushup_score)
        // this.rotary_stability_left.push(dataFMS[0].rotary_stability_left)
        // this.rotary_stability_right.push(dataFMS[0].rotary_stability_right)
        // this.rotary_stability_score.push(dataFMS[0].rotary_stability_score)
        // this.composite_score.push(dataFMS[0].composite_score)
        // this.date.push(formatDate(dataFMS[0].date))
        // console.log(this.composite_score)
      }).then(res => {
        this.setFMSChart()
      })
    },
    handleSelectTrainDate (date) {
      // console.log(date)
      const tmp = this.dataFMS.filter(item => {
        return formatDate(item['date']) === date
      })
      this.dataShow = tmp[0]
      this.dataShow['date'] = formatDate(this.dataShow['date'])
      console.log('dsd', this.dataShow)
      this.setFMSChart()
    },
    reset () {
      this.date = ''
      this.dataShow = this.dataFMS[0]
      this.setFMSChart()
    },
    setFMSChart () {
      var chartDom = document.getElementById('FMS_show')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['深蹲得分', '跨栏步左侧', '跨栏步右侧', '跨栏步得分', '线性弓步左侧', '线性弓步右侧', '线性弓步得分', '肩部灵活性左侧', '肩部灵活性右侧', '肩部灵活性得分', '主动直腿抬高左侧', '主动直腿抬高右侧', '主动直腿抬高得分', '躯干稳定俯卧撑得分', '旋转稳定性左侧', '旋转稳定性右侧', '旋转稳定性得分'],
          axisLabel: {
            rotate: 20
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '得分',
            // data: [this.squat_score[0], this.hurdle_step_left[0], this.hurdle_step_right[0], this.hurdle_step_score[0], this.in_line_lunge_left[0], this.in_line_lunge_right[0], this.in_line_lunge_score[0], this.shoulder_flexibility_left[0], this.shoulder_flexibility_right[0], this.shoulder_flexibility_score[0], this.active_straight_leg_raise_left[0], this.active_straight_leg_raise_right[0], this.active_straight_leg_raise_score[0], this.trunk_stability_pushup_score[0], this.rotary_stability_left[0], this.rotary_stability_right[0], this.rotary_stability_score[0]],
            data: [this.dataShow['squat_score'], this.dataShow['hurdle_step_left'], this.dataShow['hurdle_step_right'], this.dataShow['hurdle_step_score'], this.dataShow['in_line_lunge_left'], this.dataShow['in_line_lunge_right'], this.dataShow['in_line_lunge_score'], this.dataShow['shoulder_flexibility_left'], this.dataShow['shoulder_flexibility_right'], this.dataShow['shoulder_flexibility_score'], this.dataShow['active_straight_leg_raise_left'], this.dataShow['active_straight_leg_raise_right'], this.dataShow['active_straight_leg_raise_score'], this.dataShow['trunk_stability_pushup_score'], this.dataShow['rotary_stability_left'], this.dataShow['rotary_stability_right'], this.dataShow['rotary_stability_score']],
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            }
          }
        ]
      }

      option && myChart.setOption(option)
    }
  }
}
</script>

<style lang='less' scoped>
.shangbing {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
  &__FMS {
    display: flex;
    flex-direction: column;
    width: 100%;
    &-title {
        font-size: 20px;
        font-weight: 700;
    }
    &-point {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 700;
    }
    &-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        &-echarts {
            width: 1000px;
            height: 400px;
        }
    }
  }
}
</style>
