<template>
  <div class="jingji__wrapper">
    <div class="jingji__wrapper-filter">
      <el-select
          v-model="category"
          clearable
          collapse-tags
          filterable
          multiple
          placeholder="请选择赛事类别"
          class="compCategory__model-filter-selector"
          @change="handleSelectCategoryChange"
      >
          <el-option
          v-for="item in CompOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
      </el-select>
      <el-button type="info" size="small" @click="reset">重置</el-button>
    </div>
    <div class="jingji__wrapper-topper">
      <div class="jingji__wrapper-topper-echarts" id="jingji_show"></div>
    </div>
    <div class="jingji__wrapper-bottom">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column
          prop="comp_category"
          label="赛事类别"
          align="center">
        </el-table-column>
        <el-table-column
          prop="date"
          label="比赛日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="xiangmu"
          label="项目名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="rank"
          label="排名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="zubie"
          label="组别"
          align="center">
        </el-table-column>
        <el-table-column
          prop="danwei"
          label="单位"
          align="center">
        </el-table-column>
        <el-table-column
          prop="chengji"
          label="成绩"
          align="center">
        </el-table-column>
        <el-table-column
          prop="difference"
          label="时间差"
          align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import myAxios from '@/utils/request'
import * as echarts from 'echarts'
import { formatDate } from '@/utils/formatDate'
import { formatTime1 } from '@/utils/formatTime'
import { secondToMinute } from '@/utils/secondToMinute'
export default {
  data () {
    return {
      compResult: [],
      tableData: [],
      CompOptions: [],
      dataShow: [],
      category: ['奥运会', '亚运会', '世锦赛'],
      tmpSeries: [],
      dates: []
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
        }).then(res => {
          this.getCompResult()
        }).catch(err => {
          console.log('获取数据失败' + err)
        })
      } else {
        this.id = window.sessionStorage.getItem('id')
        this.getCompResult()
      }
    },
    handleSelectCategoryChange (category) {
      const tmp = this.compResult.filter(item => {
        return category.indexOf(item['comp_category']) !== -1
      })
      this.tableData = []
      tmp.map(item => {
        this.tableData.push({
          date: formatDate(item.date), // 假设要选择key1键的值
          danwei: item.area, // 假设要选择key2键的值
          xiangmu: item.event_type,
          zubie: item.event_name,
          chengji: item.event_result,
          rank: item.rank,
          difference: item.time_diffference,
          comp_category: item.comp_category
          // 选择其他键的值...
        })
      })
      this.setJingJiChart()
    },
    reset () {
      this.category = ['奥运会', '亚运会', '世锦赛']
      this.tableData = []
      this.compResult.map(item => {
        this.tableData.push({
          date: formatDate(item.date), // 假设要选择key1键的值
          danwei: item.area, // 假设要选择key2键的值
          xiangmu: item.event_type,
          zubie: item.event_name,
          chengji: item.event_result,
          rank: item.rank,
          difference: item.time_diffference,
          comp_category: item.comp_category
          // 选择其他键的值...
        })
      })
      this.tableData.sort((a, b) => { // 升序->调换ab降序
        return b.date.localeCompare(a.date)
      })
      this.setJingJiChart()
    },
    getCompResult () {
      myAxios.get('/jingji/getCompData', {
        params: {
          id: this.id
        }
      }).then(res => {
        const compResult = res.data
        this.compResult = compResult
        const tempSet = new Set()
        const temp = compResult.map(item => {
          if (!tempSet.has(item.comp_category)) {
            tempSet.add(item.comp_category)
            return {
              label: item.comp_category,
              value: item.comp_category
            }
          }
          return null
        }).filter(item => item !== null)
        this.CompOptions.push.apply(this.CompOptions, temp)// 使用push.apply()方法将temp数组的元素添加到trainDateOptions数组中
        compResult.map(item => {
          this.tableData.push({
            date: formatDate(item.date), // 假设要选择key1键的值
            danwei: item.area, // 假设要选择key2键的值
            xiangmu: item.event_type,
            zubie: item.event_name,
            chengji: item.event_result,
            rank: item.rank,
            difference: item.time_diffference,
            comp_category: item.comp_category
            // 选择其他键的值...
          })
        })
        this.tableData.sort((a, b) => { // 升序->调换ab降序
          return b.date.localeCompare(a.date)
        })
        setTimeout(() => {
          this.setJingJiChart()
        }, 800)
      })
    },
    setJingJiChart () {
      var chartDom = document.getElementById('jingji_show')
      var myChart = echarts.init(chartDom)
      myChart.clear()
      var option
      let OlympicChengJi = []
      let SJSChengJi = []
      let YYHChengJi = []
      this.dates = []
      this.tableData.forEach((item) => {
        if (!this.dates.includes(item.date) && this.category.indexOf(item.comp_category) !== -1) this.dates.push(item.date)
      })
      this.dates.sort((a, b) => {
        return b.localeCompare(a)
      })
      this.dates.map((d) => {
        const tmp = this.tableData.filter((i) => i.date === d)
        tmp.forEach((item) => {
          if (item.comp_category === '奥运会') OlympicChengJi.push(formatTime1(item.chengji))
          else if (item.comp_category === '亚运会') YYHChengJi.push(formatTime1(item.chengji))
          else if (item.comp_category === '世锦赛') SJSChengJi.push(formatTime1(item.chengji))
        })
        const tmpMaxLength = Math.max(OlympicChengJi.length, YYHChengJi.length, SJSChengJi.length)
        if (OlympicChengJi.length < tmpMaxLength) OlympicChengJi.push(0)
        if (YYHChengJi.length < tmpMaxLength) YYHChengJi.push(0)
        if (SJSChengJi.length < tmpMaxLength) SJSChengJi.push(0)
      })
      this.tmpSeries = []
      this.category.forEach((item) => {
        if (item === '奥运会') {
          this.tmpSeries.push(
            {
              name: '奥运会',
              type: 'line',
              data: OlympicChengJi
            }
          )
        }
        if (item === '亚运会') {
          this.tmpSeries.push(
            {
              name: '亚运会',
              type: 'line',
              data: YYHChengJi
            }
          )
        }
        if (item === '世锦赛') {
          this.tmpSeries.push(
            {
              name: '世锦赛',
              type: 'line',
              data: SJSChengJi
            }
          )
        }
      })
      option = {
        color: ['#003D5B', '#EDAE49', '#D1495B'],
        title: {
          // text: '竞技表现成绩',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var result = params[0].name + '<br>'

            params.forEach(function (item) {
              const seconds = Number(item.value)
              const formatSeconds = secondToMinute(seconds)
              result += '<div style="display:flex;flex-direction:row;justify-content:space-between"><span><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' + item.color + '"></span>' + item.seriesName + '&nbsp;&nbsp;</span>' + '<span style="font-weight:700">' + formatSeconds + '</span></div>'
            })

            return result
          },
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
        legend: {
          data: this.category,
          top: '5%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.dates,
          nameTextStyle: {
            padding: [10, 0, 0, 400]
          },
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 20,
            textStyle: {
              margin: 15,
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function (value) {
              return secondToMinute(value)
            },
            textStyle: {
              color: '#000'
            }
          }
        },
        series: this.tmpSeries
      }
      option && myChart.setOption(option)
    }
  }
}
</script>

<style lang='less' scoped>
.jingji {
  &__wrapper {
    min-height: 300px;
    padding: 10px 10px 50px 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &-filter {
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      .el-select {
        margin-right: 10px;
      }
    }
    &-topper {
      margin-bottom: 30px;
      &-echarts {
        width: 1500px;
        height: 300px;
      }
    }
    &-bottom {
      width: 100%;
    }
  }
}

/deep/ .el-table {
  color: black;
}

/deep/ .el-table__header th {
  color: black;
  font-size: 14px;
}
</style>
