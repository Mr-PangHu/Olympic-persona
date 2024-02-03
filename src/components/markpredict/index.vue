<template>
  <div class="mark__wrapper">
    <div class="mark__topper">
      <div class="mark__topper-img"></div>
      <div class="mark__topper-overlay"></div>
      <div class="mark__topper-title">
        <h1>成绩预测</h1>
      </div>
    </div>
    <el-card class="box-card">
        <div class="markpredict__wrapper">
            <div class="markpredict__model">
                <div style="text-align: right; margin-bottom: 1%;">
                  今天日期
                    <el-date-picker
                      v-model="todaydate"
                      type="date"
                      disabled
                      clearable="false"
                      placeholder="今天日期">
                    </el-date-picker>

                    <!-- <el-select
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
                    </el-select> -->
                </div>
                <div class="markpredict__model-wrapper">
                    <div class="markpredict__model-wrapper-echarts">
                      <!-- :header-cell-style="{'fontSize': '16px', 'color': '#FFFFFF','text-align':'center','fontFamily': 'HYQihei 50S','background-color': '#343336'}" -->
                      <el-table
                        :header-cell-style="{'fontSize': '16px', 'text-align':'center','fontFamily': 'HYQihei 50S'}"
                        :cell-style="{'text-align':'center','color': '#333'}"
                        :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
                        :default-sort="{ prop: 'id', order: 'ascending' }"
                        style="width: 100% " @sort-change="sortChange" @filter-change='handleFilterChange' @expand-change='handleExpandChange'>
                        <el-table-column
                          prop="project"
                          label="项目名"
                          width="150"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名"
                          width="100">
                        </el-table-column>
                        <el-table-column
                          prop="id"
                          label="ID"
                          width="100"  sortable='custom'>
                        </el-table-column>
                        <el-table-column
                          prop="sex"
                          label="性别"
                          width="70"
                        ></el-table-column>
                        <el-table-column
                          width = "150%"
                          prop="date"
                          label="日期">
                        </el-table-column>
                        <el-table-column
                          prop="lastmark"
                          label="上次成绩"
                          width="100">
                        </el-table-column>
                        <el-table-column width = "150%" type = "expand" label="成绩曲线">
                          <template slot-scope="scope">
                            <div :id="scope.row.id" style="width: 60%; height: 300%;left: 20%;" ></div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="premark"
                          label="预测成绩"
                          width="140" sortable='custom'>
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
                        :page-sizes="[10, 15, 20]"
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
import myAxios from '@/utils/request'
import axios from 'axios'
import * as echarts from 'echarts'
import { formatTime } from '@/utils/formatTime'
import { formatDate } from '@/utils/formatDate'
export default {
  data () {
    return {
      todaydate: new Date(),
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      selectYear: '',
      yearOptions: [],
      selectComp: '',
      compOptions: [],
      selectEvent: '',
      eventOptions: [],
      pageData: [],
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
    // this.getTableInfo()
    this.getPredictInfo()
    // this.train()
  },
  methods: {
    train () {
      myAxios.get('/mp/getPlayersHisDataAll').then((res) => {
        console.log(res)
      })
    },
    handleExpandChange (row, rows) {
      // 假设每行数据中有一个id属性
      const isExpend = rows.some(r => r.id === row.id) // 判断当前行展开状态
      if (isExpend) {
        this.getLines(row.id)
      } else {
        console.log('not expend')
      }
    },
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
      this.setmarkpredictChart()
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
    getResultsByEvent () {
      console.log('logloglog')
      this.series = [1, 2, 3, 4].map((item, index) => {
        const tmp = {
          name: item,
          type: 'line',
          data: [{name: '2020-01-16', value: 270}, {name: '2020-01-17', value: 275}, {name: '2020-01-18', value: 273}, {name: '2020-01-19', value: 271, itemStyle: {color: 'blue'}}]
        }
        return tmp
      })
      console.log('loglog')
      this.setmarkpredictChart(16, ['2020-01-16', '2020-01-17', '2020-01-18', '2020-01-19'], this.series)
      this.setmarkpredictChart(17, ['2020-01-16', '2020-01-17', '2020-01-18', '2020-01-19'], this.series)
      this.setmarkpredictChart(18, ['2020-01-16', '2020-01-17', '2020-01-18', '2020-01-19'], this.series)
      this.setmarkpredictChart(19, ['2020-01-16', '2020-01-17', '2020-01-18', '2020-01-19'], this.series)
      this.setmarkpredictChart(20, ['2020-01-16', '2020-01-17', '2020-01-18', '2020-01-19'], this.series)
    },
    getLines (id) {
      myAxios.get('/mp/getPlayersHisData', {
        params: {
          id
        }
      }).then((result) => {
        console.log('logloglog')
        // console.log(result.data)
        var hisData = []
        for (let i = result.data.length - 1; i >= 0; --i) {
          hisData.push(({name: result.data[i]['date'], value: result.data[i]['dynamometer_2000m']}))
        }
        // console.log(hisData)
        // [{name: '2020-01-16', value: 270}, {name: '2020-01-17', value: 275}, {name: '2020-01-18', value: 273}, {name: '2020-01-19', value: 271, itemStyle: {color: 'blue'}}]
        return hisData
      }).then((result) => {
        let arr = []
        let dates = []
        for (let i = 0; i < result.length; ++i) {
          arr.push(this.convertToSeconds(result[i]['value']))
          dates.push(this.convertToDate(result[i]['name']))
        }
        this.series = [{
          data: arr,
          type: 'line'
        }]
        return dates
        // this.$nextTick(() => this.setmarkpredictChart(id, ['2020-01-16', '2020-01-17', '2020-01-18', '2020-01-19'], this.series))
      }).then((dates) => {
        // console.log(dates)
        // console.log(this.series)
        this.setmarkpredictChart(id, dates, this.series)
      }).then(() => {
        myAxios.get('/mp/predictByID', {
          params: {
            id: id
          }
        }).then((res) => {
          console.log('----------')
          console.log(res.data[0])
        })
      })
    },
    sortByNum (val1, val2) {
      return val1 - val2
    },
    sortChange (column) {
      this.pageIndex = 1 // 排序后返回第一页
      if (column.order === 'descending') {
        this.tableData.sort((a, b) => b[column.prop] - a[column.prop])
      } else if (column.order === 'ascending') {
        this.tableData.sort((a, b) => a[column.prop] - b[column.prop])
      }
    },
    // 筛选函数
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    // 处理筛选变化
    handleFilterChange (filters) {
      // 获取筛选条件
      const filterKey = Object.keys(filters)
      // 如果没有筛选条件，恢复原始数据
      if (!filterKey.length) {
        this.filterData = this.tableData
      } else {
        // 如果有筛选条件，根据条件过滤数据
        this.filterData = this.tableData.filter(row => {
          return filterKey.some(key => {
            return filters[key].some(value => {
              return this.filterHandler(value, row, { property: key })
            })
          })
        })
      }
    },
    setmarkpredictChart (idvar, dateList, valueList) {
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
          // top: '4%',
          // left: '3%',
          // right: '4%',
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
          // name: '',
          name: '时间',
          type: 'category',
          boundaryGap: false,
          data: dateList
        },
        yAxis: {
          name: '成绩/s',
          type: 'value'
          // min: 240
        },
        series: valueList
        // series: this.series.slice(0, 1)
      }
      console.log(option.series)
      option && myChart.setOption(option)
    },
    getTableInfo () {
      myAxios.get('/list/getBasicInfo').then(res => {
        const tmp = res.data
        console.log(tmp)
        let needList = []
        for (let i = 0; i < tmp.length; i++) {
          needList.push({project: '2000m', id: tmp[i]['athlete_id'], name: tmp[i]['name'], sex: tmp[i]['gender'], lastmark: 273, premark: 271, reason: this.getReason(), date: '2020-1-19'})
        }
        this.tableData = needList
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    getPredictInfo () {
      myAxios.get('/mp/getPredictMark').then(res => {
        let needList = res.data
        this.tableData = needList.sort((a, b) => a['id'] - b['id'])
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    convertToSeconds (str) {
      // 去除字符串尾部的 \r
      str = str.trim()
      // 将分和秒分别提取出来
      const [minutes, seconds] = str.split("'")
      // 计算总秒数
      const totalSeconds = parseInt(minutes * 60) + parseInt(seconds)
      return totalSeconds
    },
    convertToDate (str) {
      const date = new Date(str)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    getBasicInfo () {
      myAxios.get('/list/getBasicInfo').then(res => {
        // console.log(res.data)
        const tmp = res.data
        const formatTmp = tmp.map(item => (
          {
            ...item,
            birthday: formatDate(item.birthday)
          }))
        console.log(formatTmp)
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    getReason () {
      return '50米跑成绩增加：7s->6.8s'
    }
  }
}
</script>

<style lang='less' scoped>

.box-card {
  margin: 0 auto;
  width: 95%;
}

.mark {
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
.markpredict {
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
