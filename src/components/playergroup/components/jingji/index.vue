<template>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="比赛日期"
        align="center">
      </el-table-column>
      <el-table-column
        prop="danwei"
        label="单位"
        align="center">
      </el-table-column>
      <el-table-column
        prop="xiangmu"
        label="项目"
        align="center">
      </el-table-column>
      <el-table-column
        prop="zubie"
        label="比赛组别"
        align="center">
      </el-table-column>
      <el-table-column
        prop="chengji"
        label="成绩"
        align="center">
      </el-table-column>
    </el-table>
</template>

<script>
import myAxios from '@/utils/request'
// import * as echarts from 'echarts'
import { formatDate } from '@/utils/formatDate'
export default {
  data () {
    return {
      tableData: []
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
    getCompResult () {
      myAxios.get('/jingji/getCompData', {
        params: {
          id: this.id
        }
      }).then(res => {
        const compResult = res.data
        compResult.map(item => {
          this.tableData.push({
            date: formatDate(item.date), // 假设要选择key1键的值
            danwei: item.area, // 假设要选择key2键的值
            xiangmu: item.event_type,
            zubie: item.event_name,
            chengji: item.event_result
            // 选择其他键的值...
          })
        })
        console.log(this.tableData)
        // console.log(compResult)
      })
    }
  }
}
</script>

<style>

</style>
