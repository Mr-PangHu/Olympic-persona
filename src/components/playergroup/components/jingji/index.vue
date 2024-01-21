<template>
  <div>
    <el-select
        v-model="category"
        clearable
        collapse-tags
        filterable
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
    <el-table
      :data="tableData"
      style="width: 100%">
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
</template>

<script>
import myAxios from '@/utils/request'
// import * as echarts from 'echarts'
import { formatDate } from '@/utils/formatDate'
export default {
  data () {
    return {
      compResult: [],
      tableData: [],
      CompOptions: [],
      dataShow: [],
      category: null
      // tableData: [{
      //   date: '2022-05-02',
      //   danwei: '江苏',
      //   xiangmu: '单人双桨',
      //   zubie: '甲组男子',
      //   chengji: '07:12.11'
      // }, {
      //   date: '2022-07-08',
      //   danwei: '江苏',
      //   xiangmu: '单人双桨',
      //   zubie: '乙组男子',
      //   chengji: '07:14.93'
      // }, {
      //   date: '2022-08-10',
      //   danwei: '江苏',
      //   xiangmu: '双人双桨',
      //   zubie: '乙组男子',
      //   chengji: '06:35.54'
      // }]
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
          this.getCompResult()
        }).catch(err => {
          console.log('获取数据失败111' + err)
        })
      } else {
        this.id = window.sessionStorage.getItem('id')
        this.getCompResult()
      }
    },
    handleSelectCategoryChange (category) {
      const tmp = this.compResult.filter(item => {
        return item['comp_category'] === category
      })
      // console.log(tmp)
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
    },
    reset () {
      this.category = ''
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
    },
    getCompResult () {
      myAxios.get('/jingji/getCompData', {
        params: {
          id: this.id
        }
      }).then(res => {
        const compResult = res.data
        this.compResult = compResult
        // console.log(compResult)
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
        // console.log(temp)
        this.CompOptions.push.apply(this.CompOptions, temp)// 使用push.apply()方法将temp数组的元素添加到trainDateOptions数组中
        // console.log(this.CompOptions)
        // this.dataShow = this.dataFMS[0]// 默认显示最新的一次测试成绩
        // console.log('moren', this.dataShow)
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
        // console.log(this.tableData)
        // console.log(compResult)
      })
    }
  }
}
</script>

<style>

</style>
