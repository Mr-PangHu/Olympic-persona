<template>
    <div class="shangbing__wrapper">
        <div class="shangbing__FMS" >
            <div class="search-box" style="text-align: right;">
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
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="info" size="small" @click="reset">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="shangbing__FMS-title" style="text-align: right;">FMS测试 {{this.dataShow['date']}}</div>
            <div class="shangbing__FMS-point" style="text-align: right;">{{this.dataFMS[0]['name']}} 综合得分：{{this.dataShow['composite_score']}}</div>
            <div class="shangbing__FMS-wrapper">
                <div class="shangbing__FMS-wrapper-table">
                    <el-table :data="tableData" style="width: 100%" :header-cell-style="rowClass" :span-method="arraySpanMethod">
                        <el-table-column label="项目" align="center">
                            <el-table-column prop="proj_1"  width="110" align="center"></el-table-column>
                            <el-table-column prop="proj_2"  width="80" align="center"></el-table-column>
                        </el-table-column>
                        <el-table-column label="得分" align="center">
                            <el-table-column prop="score_1" width="80" align="center"></el-table-column>
                            <el-table-column prop="score_2" width="80" align="center"></el-table-column>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注"  width="80" align="center"></el-table-column>
                    </el-table>
                </div>
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
      tableData_moren: [],
      tableData: [
        // {
        //   proj_1: '深蹲',
        //   proj_2: '1',
        //   score_1: '',
        //   score_2: '',
        //   remark: ''
        // },
        // {
        //   proj_1: '跨栏步',
        //   proj_2: '左侧',
        //   score_1: '1',
        //   score_2: '1',
        //   remark: ''
        // },
        // {
        //   proj_1: '',
        //   proj_2: '右侧',
        //   score_1: '',
        //   score_2: '1',
        //   remark: ''
        // },
        // {
        //   proj_1: '跨栏步',
        //   proj_2: '左侧',
        //   score_1: '1',
        //   score_2: '1',
        //   remark: ''
        // },
        // {
        //   proj_1: '',
        //   proj_2: '右侧',
        //   score_1: '',
        //   score_2: '1',
        //   remark: ''
        // },
        // {
        //   proj_1: '跨栏步',
        //   proj_2: '左侧',
        //   score_1: '1',
        //   score_2: '1',
        //   remark: ''
        // },
        // {
        //   proj_1: '',
        //   proj_2: '右侧',
        //   score_1: '',
        //   score_2: '1',
        //   remark: ''
        // }
      ],
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
    rowClass ({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 1) {
        return {
          display: 'none'
        }
      }
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 || rowIndex === 9) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [1, 2]
        } else {
          return [1, 1]
        }
      }
      if (columnIndex === 0 || columnIndex === 2) {
        if (rowIndex % 2 === 1 && rowIndex < 9) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex === 10) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
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
          console.log('获取数据失败' + err)
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
        console.log(this.dataFMS)
        this.dataFMS.sort((a, b) => {
          return b.date.localeCompare(a.date)
        })
        const temp = this.dataFMS.map(item => {
          return {
            label: formatDate(item.date),
            value: formatDate(item.date)
          }
        })
        this.trainDateOptions.push.apply(this.trainDateOptions, temp)// 使用push.apply()方法将temp数组的元素添加到trainDateOptions数组中
        // console.log(this.trainDateOptions)
        this.date = this.dataShow['date']
        this.dataShow = this.dataFMS[0]// 默认显示最新的一次测试成绩
        // console.log('moren', this.dataShow)
        this.dataShow['date'] = formatDate(this.dataShow['date'])
        this.tableData_moren = []
        this.tableData = []
        this.tableData.push({
          proj_1: '深蹲',
          proj_2: this.dataShow['squat_score']
        })
        this.tableData.push({
          proj_1: '跨栏步',
          proj_2: '左侧',
          score_1: this.dataShow['hurdle_step_score'],
          score_2: this.dataShow['hurdle_step_left']
        })
        this.tableData.push({
          proj_1: '跨栏步',
          proj_2: '右侧',
          score_1: this.dataShow['hurdle_step_score'],
          score_2: this.dataShow['hurdle_step_right']
        })
        this.tableData.push({
          proj_1: '线性弓步',
          proj_2: '左侧',
          score_1: this.dataShow['in_line_lunge_score'],
          score_2: this.dataShow['in_line_lunge_left']
        })
        this.tableData.push({
          proj_1: '线性弓步',
          proj_2: '右侧',
          score_1: this.dataShow['in_line_lunge_score'],
          score_2: this.dataShow['in_line_lunge_right']
        })
        this.tableData.push({
          proj_1: '肩部灵活性',
          proj_2: '左侧',
          score_1: this.dataShow['shoulder_flexibility_score'],
          score_2: this.dataShow['shoulder_flexibility_left']
        })
        this.tableData.push({
          proj_1: '肩部灵活性',
          proj_2: '右侧',
          score_1: this.dataShow['shoulder_flexibility_score'],
          score_2: this.dataShow['shoulder_flexibility_right']
        })
        this.tableData.push({
          proj_1: '主动直腿抬高',
          proj_2: '左侧',
          score_1: this.dataShow['active_straight_leg_raise_score'],
          score_2: this.dataShow['active_straight_leg_raise_left']
        })
        this.tableData.push({
          proj_1: '主动直腿抬高',
          proj_2: '右侧',
          score_1: this.dataShow['active_straight_leg_raise_score'],
          score_2: this.dataShow['active_straight_leg_raise_right']
        })
        this.tableData.push({
          proj_1: '躯干稳定俯卧撑',
          proj_2: this.dataShow['trunk_stability_pushup_score']
        })
        this.tableData.push({
          proj_1: '旋转稳定性',
          proj_2: '左侧',
          score_1: this.dataShow['rotary_stability_score'],
          score_2: this.dataShow['rotary_stability_left']
        })
        this.tableData.push({
          proj_1: '旋转稳定性',
          proj_2: '右侧',
          score_1: this.dataShow['rotary_stability_score'],
          score_2: this.dataShow['rotary_stability_right']
        })
        this.tableData_moren = this.tableData
        console.log('biefen', this.tableData_moren)
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
      this.tableData = []
      this.tableData.push({
        proj_1: '深蹲',
        proj_2: this.dataShow['squat_score']
      })
      this.tableData.push({
        proj_1: '跨栏步',
        proj_2: '左侧',
        score_1: this.dataShow['hurdle_step_score'],
        score_2: this.dataShow['hurdle_step_left']
      })
      this.tableData.push({
        proj_1: '跨栏步',
        proj_2: '右侧',
        score_1: this.dataShow['hurdle_step_score'],
        score_2: this.dataShow['hurdle_step_right']
      })
      this.tableData.push({
        proj_1: '线性弓步',
        proj_2: '左侧',
        score_1: this.dataShow['in_line_lunge_score'],
        score_2: this.dataShow['in_line_lunge_left']
      })
      this.tableData.push({
        proj_1: '线性弓步',
        proj_2: '右侧',
        score_1: this.dataShow['in_line_lunge_score'],
        score_2: this.dataShow['in_line_lunge_right']
      })
      this.tableData.push({
        proj_1: '肩部灵活性',
        proj_2: '左侧',
        score_1: this.dataShow['shoulder_flexibility_score'],
        score_2: this.dataShow['shoulder_flexibility_left']
      })
      this.tableData.push({
        proj_1: '肩部灵活性',
        proj_2: '右侧',
        score_1: this.dataShow['shoulder_flexibility_score'],
        score_2: this.dataShow['shoulder_flexibility_right']
      })
      this.tableData.push({
        proj_1: '主动直腿抬高',
        proj_2: '左侧',
        score_1: this.dataShow['active_straight_leg_raise_score'],
        score_2: this.dataShow['active_straight_leg_raise_left']
      })
      this.tableData.push({
        proj_1: '主动直腿抬高',
        proj_2: '右侧',
        score_1: this.dataShow['active_straight_leg_raise_score'],
        score_2: this.dataShow['active_straight_leg_raise_right']
      })
      this.tableData.push({
        proj_1: '躯干稳定俯卧撑',
        proj_2: this.dataShow['trunk_stability_pushup_score']
      })
      this.tableData.push({
        proj_1: '旋转稳定性',
        proj_2: '左侧',
        score_1: this.dataShow['rotary_stability_score'],
        score_2: this.dataShow['rotary_stability_left']
      })
      this.tableData.push({
        proj_1: '旋转稳定性',
        proj_2: '右侧',
        score_1: this.dataShow['rotary_stability_score'],
        score_2: this.dataShow['rotary_stability_right']
      })
      // console.log('dsd', this.dataShow)
      this.setFMSChart()
    },
    reset () {
      this.date = ''
      this.dataShow = this.dataFMS[0]
      this.tableData = this.tableData_moren
      console.log('ss', this.tableData)
      this.setFMSChart()
    },
    setFMSChart () {
      var chartDom = document.getElementById('FMS_show')
      var myChart = echarts.init(chartDom)
      var option

      var data = [this.dataShow['squat_score'], this.dataShow['hurdle_step_left'], this.dataShow['hurdle_step_right'], this.dataShow['hurdle_step_score'], this.dataShow['in_line_lunge_left'], this.dataShow['in_line_lunge_right'], this.dataShow['in_line_lunge_score'], this.dataShow['shoulder_flexibility_left'], this.dataShow['shoulder_flexibility_right'], this.dataShow['shoulder_flexibility_score'], this.dataShow['active_straight_leg_raise_left'], this.dataShow['active_straight_leg_raise_right'], this.dataShow['active_straight_leg_raise_score'], this.dataShow['trunk_stability_pushup_score'], this.dataShow['rotary_stability_left'], this.dataShow['rotary_stability_right'], this.dataShow['rotary_stability_score']]
      var titlename = ['深蹲得分', '跨栏步得分', '线性弓步得分', '肩部灵活性得分', '主动直腿抬高', '躯干稳定俯卧撑', '旋转稳定性得分']
      var valdata = [1, 2, 1, 2, 3, 3, 3]
      var myColor = ['#1089E7', '#F57474', '#56D2E3', '#F8B448', '#8B78F6', '#558484', '#32B666']
      option = {
        backgroundColor: '#fff',
        xAxis: {
          show: false
        },
        yAxis: [{
          show: true,
          data: titlename,
          inverse: true,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#427999',
            rich: {
              lg: {
                backgroundColor: '#339911',
                color: '#fff',
                borderRadius: 15,
                // padding: 50,
                align: 'center',
                width: 50,
                height: 15
              }
            }
          }
        }, {
          show: true,
          inverse: true,
          data: valdata,
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '条',
          type: 'bar',
          yAxisIndex: 0,
          data: data,
          barWidth: 30,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: function (params) {
                var num = myColor.length
                return myColor[params.dataIndex % num]
              }
            }
          },
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{c}',
              color: '#fff'
            }
          }
        }, {
          name: '框',
          type: 'bar',
          yAxisIndex: 1,
          barGap: '-100%',
          data: [3, 3, 3, 3, 3, 3, 3],
          barWidth: 40,
          itemStyle: {
            normal: {
              color: 'none',
              borderColor: '#00c1de',
              borderWidth: 3,
              barBorderRadius: 15
            }
          }
        }]
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
    padding: 30px 10px;
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
            width: 500px;
            height: 800px;
        }
        &-echarts {
            width: 1000px;
            height: 800px;
        }
    }
  }
}
</style>
