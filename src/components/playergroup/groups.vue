<template>
  <div>
    <h2 align="center">测试成绩</h2>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="test_date"
      label="测试日期"
      width="100">
    </el-table-column>
    <el-table-column
      prop="athlete_name"
      label="姓名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="test_rank"
      label="测试排名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="cgy500m_result"
      label="测功仪500m成绩"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy500m_pace"
      label="测功仪500m配速"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy2000m_result"
      label="测功仪2000m成绩"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy2000m_pace"
      label="测功仪2000m配速"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy5000m_result"
      label="测功仪5000m成绩"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy5000m_pace"
      label="测功仪5000m配速"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy30min20str_result"
      label="测功仪30分钟20桨频成绩"
      width="190">
    </el-table-column>
    <el-table-column
      prop="cgy30min20str_pace"
      label="测功仪30分钟20桨频配速"
      width="190">
    </el-table-column>
    <el-table-column
      prop="cgy10str_result"
      label="测功仪10桨频成绩"
      width="140">
    </el-table-column>
    <el-table-column
      prop="cgy10str_pace"
      label="测功仪10桨频配速"
      width="140">
    </el-table-column>
    <el-table-column
      prop="squat_result"
      label="深蹲"
      width="60">
    </el-table-column>
    <el-table-column
      prop="press_result"
      label="卧推"
      width="60">
    </el-table-column>
    <el-table-column
      prop="pull_result"
      label="卧拉"
      width="60">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import myAxios from '@/utils/request'
// import { formatBySpilt } from '@/utils/formatDate'
export default {
  data () {
    return {
      ids: [],
      data: [],
      tableData: []
    }
  },
  created () {
    this.ids = this.$route.params.ids
    // console.log(this.ids)
  },
  mounted () {
    this.getTestDataByIds()
    this.getTableData()
  },
  methods: {
    getTestDataByIds () {
      this.data = []
      const ids = this.ids
      myAxios.get('/compare/getTestDataById', {
        params: {
          ids
        }
      }).then(res => {
        this.data = res.data
        console.log(this.data)
      })
    },
    getTableData () {
      this.tableData = []
      const ids = this.ids
      myAxios.get('/compare/getTableData', {
        params: {
          ids
        }
      }).then(res => {
        this.tableData = res.data
        this.tableData.forEach(item => {
          item.test_date = item.test_date.split('T')[0]
        })
        console.log(this.tableData)
      })
    }
  }
}
</script>

<style lang='less' scoped>

.box-card {
  margin: 0 auto;
  width: 100%;
  .main img{
    width: 100%;
  }
}
</style>
