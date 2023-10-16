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
export default {
  data () {
    return {
      tableData: [{
        date: '2022-05-02',
        danwei: '江苏',
        xiangmu: '单人双桨',
        zubie: '甲组男子',
        chengji: '07:12.11'
      }, {
        date: '2022-07-08',
        danwei: '江苏',
        xiangmu: '单人双桨',
        zubie: '乙组男子',
        chengji: '07:14.93'
      }, {
        date: '2022-08-10',
        danwei: '江苏',
        xiangmu: '双人双桨',
        zubie: '乙组男子',
        chengji: '06:35.54'
      }]
    }
  }
}
</script>

<style>

</style>
