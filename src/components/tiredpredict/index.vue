<template>
  <div class="tired__wrapper">
    <div class="tired__topper">
      <div class="tired__topper-img"></div>
      <div class="tired__topper-overlay"></div>
      <div class="tired__topper-title">
        <h1>疲劳预测</h1>
      </div>
    </div>
    <el-card class="box-card">
        <div class="tiredpredict__wrapper">
            <div class="tiredpredict__model">
                <div style="text-align: right; margin-bottom: 1%;">
                  今天日期
                    <el-date-picker
                      v-model="todaydate"
                      type="date"
                      disabled
                      clearable="false"
                      placeholder="今天日期">
                    </el-date-picker>

                    <el-select
                        v-model="selectEvent"
                        clearable
                        collapse-tags
                        filterable
                        placeholder="请选择项目"
                        class="worldhighlevel__model-filter-selector"
                        @change="handleSelectEventChange"
                    >
                        <el-option
                        v-for="item in eventOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="tiredpredict__model-wrapper">
                    <div class="tiredpredict__model-wrapper-echarts">
                      <el-table
                        :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
                        style="width: 100% ">
                        <el-table-column
                          prop="project"
                          label="项目名"
                          width="100"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名"
                          width="80">
                        </el-table-column>
                        <el-table-column
                          prop="id"
                          label="ID"
                          width="100">
                        </el-table-column>
                        <el-table-column
                          prop="sex"
                          label="性别"
                          width="50">
                        </el-table-column>
                        <el-table-column
                          prop="date"
                          label="日期"
                          width="100">
                        </el-table-column>
                        <el-table-column
                          prop="lastmark"
                          label="上次成绩"
                          width="100">
                        </el-table-column>
                        <!-- <el-table-column
                          prop="draw"
                          label="成绩曲线"
                          width="300">
                          <div class = 'tiredpredict_show'></div>
                        </el-table-column> -->
                        <!-- type="expand"  -->
                        <el-table-column label="成绩曲线">
                          <template slot-scope="scope">
                            <div :id="scope.row.id" style="width: 250px; height: 250px;"></div>
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="premark"
                          label="预测成绩"
                          width="100">
                        </el-table-column>
                        <el-table-column
                          prop="reason"
                          label="预测理由">
                        </el-table-column>
                      </el-table>
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableData.length">
                      </el-pagination>
                    </div>

                </div>

            </div>
        </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'
import { formatTime } from '@/utils/formatTime'
export default {
  data () {
    return {
      todaydate: new Date(),
      tableData: [],
      pageSize: 5,
      currentPage: 1,
      selectYear: '',
      yearOptions: [],
      selectComp: '',
      compOptions: [],
      selectEvent: '',
      eventOptions: [],
      selectEventName: '',
      country: [],
      cNumber: 0,
      d500m: [],
      d1000m: [],
      d1500m: [],
      d2000m: [],
      series: [],
      defaultValue: null,
      fenduanForm: {
        d500mValue: '',
        d1000mValue: '',
        d1500mValue: '',
        d2000mValue: ''
      }
    }
  },
  created () {
    this.defaultValue = new Date()
    this.defaultValue.setHours(0)
    this.defaultValue.setMinutes(1)
    this.defaultValue.setSeconds(0)
  },
  mounted () {
    this.getYear()
    this.gettiredpredict()
    this.getResultsByEvent()
  },
  methods: {
    handleSelectYearChange () {
      this.getCompByYear()
    },
    handleSelectCompChange () {
      this.getEventById()
    },
    handleSelectEventChange (id) {
      const event = this.eventOptions.filter(item => item.value === id)[0].label
      this.selectEventName = event
      this.getResultsByEvent(id, event)
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleCompare () {
      if (!this.fenduanForm.d500mValue || !this.fenduanForm.d1000mValue || !this.fenduanForm.d1500mValue || !this.fenduanForm.d2000mValue) return
      const d500mTime = formatTime(this.fenduanForm.d500mValue)
      const d1000mTime = formatTime(this.fenduanForm.d1000mValue)
      const d1500mTime = formatTime(this.fenduanForm.d1500mValue)
      const d2000mTime = formatTime(this.fenduanForm.d2000mValue)
      if (this.series.length > this.cNumber) {
        this.series.pop()
        this.country.pop()
      }
      this.series.push({
        name: 'Me',
        type: 'line',
        data: [d500mTime, d1000mTime, d1500mTime, d2000mTime]
      })
      this.country.push('Me')
      this.settiredpredictChart()
    },
    getYear () {
      axios.get('http://localhost/cm/getYear').then(res => {
        const yearArr = res.data
        this.yearOptions = yearArr.map(item => (
          {
            value: item,
            label: item
          }
        ))
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    getCompByYear () {
      axios.get('http://localhost/cm/getCompByYear', {
        params: {
          year: this.selectYear
        }
      }).then(res => {
        const compArr = res.data
        this.compOptions = compArr.map(item => (
          {
            value: item.comp_name,
            label: item.comp_name
          }
        ))
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    getEventById () {
      axios.get('http://localhost/cm/getEventById', {
        params: {
          comp: this.selectComp
        }
      }).then(res => {
        const eventArr = res.data
        this.eventOptions = eventArr.map(item => (
          {
            value: item.id,
            label: item.event_type
          }
        ))
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    getResultsByEvent (id, event) {
      axios.get('http://localhost/cm/getResultsByEventPre', {
        params: {
          id,
          event
        }
      }).then(res => {
        const tmp = res.data
        this.country = tmp.map(item => {
          return item.country
        })
        this.d500m = tmp.map(item => {
          return item.d500m ? Number(formatTime(item.d500m).toFixed(2)) : 0
        })
        this.d1000m = tmp.map(item => {
          return item.d1000m ? Number(formatTime(item.d1000m).toFixed(2)) : 0
        })
        this.d1500m = tmp.map(item => {
          return item.d1500m ? Number(formatTime(item.d1500m).toFixed(2)) : 0
        })
        this.d2000m = tmp.map(item => {
          return item.d2000m ? Number(formatTime(item.d2000m).toFixed(2)) : 0
        })
      }).then(
        () => {
          this.series = this.country.map((item, index) => {
            const tmp = {
              name: item,
              type: 'line',
              data: [this.d500m[index], this.d1000m[index], this.d1500m[index], this.d2000m[index]]
            }
            return tmp
          })
          this.cNumber = this.country.length
          console.log(this.series)
          this.settiredpredictChart('tiredpredict_show1')
          this.settiredpredictChart('tiredpredict_show2')
          this.settiredpredictChart('tiredpredict_show3')
          this.settiredpredictChart('tiredpredict_show4')
          this.settiredpredictChart('tiredpredict_show5')
          this.settiredpredictChart('tiredpredict_show6')
          this.settiredpredictChart('tiredpredict_show7')
          this.settiredpredictChart('tiredpredict_show8')
          this.settiredpredictChart('tiredpredict_show9')
          this.settiredpredictChart('tiredpredict_show10')
        }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    settiredpredictChart (idvar) {
      // var chartDom = document.getElementsByName('tiredpredict_show')
      // var myChart = echarts.init(chartDom)
      // var myChart = echarts.init(document.getElementsByName('tiredpredict_show'))
      var myChart = echarts.init(document.getElementById(idvar))

      var option

      option = {
        title: {
          text: this.selectComp + this.selectEventName
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var result = params[0].name + '<br>'

            params.forEach(function (item) {
              result += '<span style="display:inline-block;margin-right:0px;border-radius:50%;width:0px;height:0px;left:0px;background-color:' + item.color + '"></span>' + item.seriesName + ': ' + '<span style="align-self:flex-end;font-weight:700">' + item.value + '</span>'
            })

            return result
          }
        },
        grid: {
          top: '4%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: true,
          top: '5%',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          name: '分段',
          type: 'category',
          boundaryGap: false,
          data: ['2022-10', '2022-11', '2022-12', '2023-01']
        },
        yAxis: {
          name: '成绩/s',
          type: 'value'
        },
        series: this.series.slice(0, 1)
      }

      option && myChart.setOption(option)
      console.log('aaaaaaaaaaaa')
    },
    gettiredpredict () {
      this.tableData = [{
        project: '世锦赛2023',
        date: '2016-05-03',
        id: 'tiredpredict_show' + 1,
        name: '张三',
        sex: '男',
        lastmark: 273,
        premark: 271,
        reason: '50米跑成绩增加：7s->6.8s'
      }, {
        project: '世锦赛2023',
        date: '2016-05-02',
        id: 'tiredpredict_show' + 2,
        name: '李四',
        sex: '男',
        lastmark: 273,
        premark: 271,
        reason: '500米测功仪成绩增加：65s->63s'
      }, {
        project: '世锦赛2023',
        date: '2016-05-04',
        id: 'tiredpredict_show' + 3,
        name: '王小虎',
        sex: '男',
        lastmark: 273,
        premark: 271,
        reason: '500米测功仪成绩增加：65s->63s'
      }, {
        project: '世锦赛2023',
        date: '2016-05-01',
        id: 'tiredpredict_show' + 4,
        name: '李老六',
        sex: '男',
        lastmark: 273,
        premark: 271,
        reason: '500米测功仪成绩增加：65s->63s'
      }, {
        project: '世锦赛2023',
        date: '2016-05-02',
        id: 'tiredpredict_show' + 5,
        name: '李四',
        sex: '男',
        lastmark: 273,
        premark: 271,
        reason: '500米测功仪成绩增加：65s->63s'
      }, {
        project: '世锦赛2023',
        date: '2016-05-04',
        id: 'tiredpredict_show' + 6,
        name: '王小虎',
        sex: '男',
        lastmark: 273,
        premark: 271,
        reason: '500米测功仪成绩增加：65s->63s'
      }, {
        project: '世锦赛2023',
        date: '2016-05-01',
        id: 'tiredpredict_show' + 7,
        name: '李老六',
        sex: '男',
        lastmark: 273,
        premark: 271,
        reason: '500米测功仪成绩增加：65s->63s'
      }, {
        project: '世锦赛2023',
        date: '2016-05-02',
        id: 'tiredpredict_show' + 8,
        name: '李四',
        sex: '男',
        lastmark: 273,
        premark: 271,
        reason: '500米测功仪成绩增加：65s->63s'
      }, {
        project: '世锦赛2023',
        date: '2016-05-04',
        id: 'tiredpredict_show' + 9,
        name: '王小虎',
        sex: '男',
        lastmark: 273,
        premark: 271,
        reason: '500米测功仪成绩增加：65s->63s'
      }, {
        project: '世锦赛2023',
        date: '2016-05-01',
        id: 'tiredpredict_show' + 10,
        name: '李老六',
        sex: '男',
        lastmark: 273,
        premark: 271,
        reason: '500米测功仪成绩增加：65s->63s'
      }]
    }
  }
}
</script>

<style lang='less' scoped>

.box-card {
  margin: 0 auto;
  width: 95%;
}

.tired {
  &__wrapper {
    width: 100%;
  }
  &__topper {
    height: 600px;
    width: 100%;
    position: relative;
    &-img {
      height: 100%;
      background-image: url('../../assets/images/777.jpg');
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
      bottom: 60px;
      left: 0;
      right: 0;
      h1 {
        width: 80%;
        margin: 0 auto;
        font-family: "Effra",Arial,sans-serif;
        font-style: italic;
        font-size: 50px;
        color: white;
        line-height: 75px;
      }
    }
  }
}
.tiredpredict {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    // padding: 2%;
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
            width: 90%
        }
    }
  }
}
</style>
