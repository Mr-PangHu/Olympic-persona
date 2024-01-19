<template>
  <div class="labelsys__wrapper">
    <div class="labelsys__topper">
      <div class="labelsys__topper-img"></div>
      <div class="labelsys__topper-overlay"></div>
      <div class="labelsys__topper-title">
        <h1>运动员总览</h1>
      </div>
    </div>
    <el-card class="box-card">
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true">
          <!-- <el-form-item label="标签分类">
            <el-select v-model="value" placeholder="请选择分类" size="small" @change="handleSelect">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="姓名">
            <el-select
              v-model="playerName"
              placeholder="请输入姓名"
              size="small"
              @change="handleSelectPlayerName"
              filterable
              :disabled="playerNameDisabled"
            >
              <el-option
                v-for="item in playerNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select
              v-model="playerGender"
              placeholder="请选择性别"
              size="small"
              :disabled="playerGenderDisabled"
              @change="handleSelectPlayerGender"
            >
              <el-option
                v-for="item in playerGenderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small" @click="reset">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="goToCompare()" size="small">测试成绩对比</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 标签体系区域 -->
      <el-table
        ref="multipleTable"
        :data="changeinfo.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
        :row-key="(row)=>{ return row.id}"
        height="600"
        tooltip-effect="dark"
        style="width: 90%, margin-left: 50px"
        border
        stripe
        @selection-change="handleSelectionChange"
      >
            <!-- <el-table-column fixed type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="birthday" label="出生日期" align="center"></el-table-column>
            <el-table-column prop="age" label="年龄" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" align="center"></el-table-column>
            <el-table-column prop="marital_status" label="婚姻状况" align="center"></el-table-column>
            <el-table-column prop="education_level" label="受教育程度" align="center"></el-table-column>
            <el-table-column prop="professional_training_years" label="专业训练年限（练赛艇算起）" width="120" align="center"></el-table-column>
            <el-table-column prop="training_experience" label="训练经历" align="center"></el-table-column>
            <el-table-column prop="sports_level" label="运动等级" align="center"></el-table-column>
            <el-table-column prop="height" label="身高" align="center"></el-table-column>
            <el-table-column prop="weight" label="体重" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="150">
                <template slot-scope="scope">
                  <div class="operatin-button">
                    <!-- <div class="addordelete-button">
                      <el-button type="primary" size="mini" @click="editBasicInfo(scope.row)">编辑</el-button>
                      <el-button type="danger" size="mini" @click="deleteBasicInfo(scope.$index, scope.row)">删除</el-button>
                    </div> -->
                    <div class="persona-button">
                      <el-button round size="mini" @click="goToPersona(scope.row)">画像</el-button>
                      <el-button round size="mini" @click="goToChampion(scope.row)">对比</el-button>
                    </div>
                  </div>
                </template>
            </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="currentPage"
        :page-size="pagesize"
        :total="totalData"
        :page-sizes="[5, 10, 20, 30, 40, 50]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper" />
    </el-card>
  </div>
</template>

<script>
import myAxios from '@/utils/request'
import { formatDate } from '@/utils/formatDate'
import { getAge } from '@/utils/getAge'
export default {
  data () {
    return {
      checked: false,
      info: [],
      athleteIds: [], // 使用多人对比时需要获取多个运动员的id
      multipleSelection: [],
      dialogaddVisible: false,
      dialogupdateVisible: false,
      basicInfo: {
        name: '',
        birthday: '',
        age: '',
        gender: '',
        marital_status: '',
        education_level: '',
        professional_training_years: '',
        training_experience: '',
        sports_level: '',
        height: 0,
        weight: 0
      },
      totalData: 10,
      currentPage: 1, //  el-pagination 第几页
      pagesize: 10, //  el-pagination 每页的数据
      options: [{
        label: '重点培养',
        value: '重点培养'
      }],
      value: '',
      changeinfo: [],
      HuiXianid: '',
      formLabelWidth: '120px',
      playerName: '',
      playerNameDisabled: false,
      playerNameOptions: [],
      playerGender: '',
      playerGenderDisabled: false,
      playerGenderOptions: [{
        label: '男',
        value: '男'
      },
      {
        label: '女',
        value: '女'
      }],
      educationLevelOptions: [{
        label: '初中',
        value: '初中'
      },
      {
        label: '高中',
        value: '高中'
      },
      {
        label: '中专',
        value: '中专'
      },
      {
        label: '大专',
        value: '大专'
      }]
    }
  },
  mounted () {
    this.getGroup()
    this.getPlayerName()
    // this.getBasicInfo()
  },
  watch: {
    playerName: {
      handler (newValue, oldValue) {
        if (this.playerName) this.playerGenderDisabled = true
      },
      deep: true
    },
    playerGender: {
      handler (newValue, oldValue) {
        if (this.playerGender) this.playerNameDisabled = true
      },
      deep: true
    }
  },
  methods: {
    handleSelectPlayerGender (gender) {
      this.changeinfo = this.info.filter(item => {
        return item.gender === gender
      })
      this.totalData = this.changeinfo.length
    },
    getGroup () {
      const id = window.sessionStorage.getItem('id')
      myAxios.get('/list/getByUserId', {
        params: {
          id
        }
      }).then(res => {
        const group = res.data[0].group_id
        this.group = group
        if (group === 0) {
          this.getBasicInfo()
        } else {
          myAxios.get('/list/getGroupMember', {
            params: {
              group
            }
          }).then(res => {
            const tmp = res.data
            // console.log(tmp)
            const formatTmp = tmp.map(item => (
              {
                ...item,
                birthday: formatDate(item.birthday)
              }))
            this.info = formatTmp
            this.changeinfo = formatTmp
            this.totalData = res.data.length
          })
        }
      }
      ).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    getPlayerName () {
      myAxios.get('/list/searchName').then(res => {
        const temp = res.data.data.map(item => {
          return {
            label: item.name,
            value: item.name
          }
        })
        this.playerNameOptions = temp
        // console.log(this.playerNameOptions)
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    handleSelectPlayerName (name) {
      this.changeinfo = this.info.filter(item => {
        return item.name === name
      })
      this.totalData = this.changeinfo.length
    },
    reset () {
      this.value = ''
      this.playerName = ''
      this.playerGender = ''
      this.playerNameDisabled = false
      this.playerGenderDisabled = false
      this.changeinfo = this.info
      this.totalData = this.changeinfo.length
    },
    goToCompare () {
      const ids = this.multipleSelection.map(item => item.athlete_id)
      if (ids.length === 0) window.alert('请选择运动员')
      else this.$router.push({ name: 'playergroup-groups', params: { ids: ids } })
    },
    goToPersona (row) {
      this.$router.push({ name: 'playergroup-one', params: { id: row.id } })
    },
    goToChampion (row) {
      this.$router.push({ name: 'champion-model', params: { id: row.id } })
    },
    handleSelect (value) {
      if (value === '重点培养') {
        this.changeinfo = this.info.filter(item => {
          return parseFloat(item.VO2MAX) > 4
        })
        this.changeinfo.sort((a, b) => b.VO2MAX - a.VO2MAX)
        this.totalData = this.changeinfo.length
      }
    },
    handleSizeChange (size) {
      this.pagesize = size
      // 每次改变页码大小,重定向第一页
      // this.currentPage = 1
    },
    // 点击第几页把页码传进来，发送接口请求改变数据
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    // 清空表单数据
    ClearForm (formName) {
      this.dialogaddVisible = false
      this.dialogupdateVisible = false
      this.$refs[formName].resetFields()// 点击取消按钮，清空el-input
    },
    getBasicInfo () { // 查找info表全部数据
      myAxios.get('/list/getBasicInfo').then(res => {
        // console.log(res.data)
        const tmp = res.data
        const formatTmp = tmp.map(item => (
          {
            ...item,
            birthday: formatDate(item.birthday)
          }))
        this.info = formatTmp
        this.changeinfo = formatTmp
        this.totalData = res.data.length
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection)
      this.athleteIds = []
      for (let item of this.multipleSelection) {
        const athleteId = item['athlete_id']
        this.athleteIds.push(athleteId)
      }
      // console.log(this.athleteIds)
    },
    // rowClass ({ rowIndex, columnIndex }) {
    //   if (rowIndex === 0) {
    //     if (columnIndex === 9 || columnIndex === 13) {
    //       return {color: 'red'}
    //     }
    //   }
    // },
    // cellStyle ({row, column, rowIndex, columnIndex}) {
    //   if (column.property === 'VO2MAX' || column.property === 'CGY') {
    //     return {color: 'red', 'font-weight': 700}
    //   }
    // },
    getAge (e) {
      this.basicInfo.age = getAge(e)
    },
    deleteBasicInfo (index, row) { // 删除操作
      // console.log(index, row)
      myAxios.get('/list/deleteBasicInfo', {
        params: {
          id: row.id
        }
      }).then(res => {
        if (res.data.status === 200) {
          this.$message({
            message: '删除成功'
          })
          this.getBasicInfo()
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log('操作失败' + err)
      })
    },
    addBasicInfo () { // 添加操作
      // console.log(this.basicInfo.age)
      myAxios.get('/list/addBasicInfo', {
        params: {
          name: this.basicInfo.name,
          birthday: this.basicInfo.birthday,
          age: this.basicInfo.age,
          gender: this.basicInfo.gender,
          marital_status: this.basicInfo.marital_status,
          education_level: this.basicInfo.education_level,
          professional_training_years: this.basicInfo.professional_training_years,
          training_experience: this.basicInfo.training_experience,
          sports_level: this.basicInfo.sports_level,
          height: this.basicInfo.height,
          weight: this.basicInfo.weight
        }
      }).then(res => {
        if (res.data.status === 200) {
          this.$message({
            message: '添加成功'
          })
          this.dialogaddVisible = false
          this.getBasicInfo()
          this.ClearForm(this.basicInfo)
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log('操作失败' + err)
      })
    },
    editBasicInfo (row) { // 回显数据
      this.dialogupdateVisible = true
      this.HuiXianid = row.id
      this.$nextTick(() => {
        // 先让对话框出现, 它绑定空值的对象, 才能resetFields清空用初始空值
        this.basicInfo.name = row.name
        this.basicInfo.birthday = row.birthday
        this.basicInfo.age = row.age
        this.basicInfo.gender = row.gender
        this.basicInfo.marital_status = row.marital_status
        this.basicInfo.education_level = row.education_level
        this.basicInfo.professional_training_years = row.professional_training_years
        this.basicInfo.training_experience = row.training_experience
        this.basicInfo.sports_level = row.sports_level
        this.basicInfo.height = row.height
        this.basicInfo.weight = row.weight
      })
    },
    updateBasicInfo () { // 修改操作
      myAxios.get('/list/updateBasicInfo', {
        params: {
          id: this.HuiXianid,
          name: this.basicInfo.name,
          birthday: this.basicInfo.birthday,
          age: this.basicInfo.age,
          gender: this.basicInfo.gender,
          marital_status: this.basicInfo.marital_status,
          education_level: this.basicInfo.education_level,
          professional_training_years: this.basicInfo.professional_training_years,
          training_experience: this.basicInfo.training_experience,
          sports_level: this.basicInfo.sports_level,
          height: this.basicInfo.height,
          weight: this.basicInfo.weight
        }
      }).then(res => {
        if (res.data.status === 200) {
          this.$message({
            message: '修改成功'
          })
          this.dialogupdateVisible = false
          this.getBasicInfo()
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log('操作失败' + err)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.labelsys {
  &__wrapper {
    width: 100%;
  }
  &__topper {
    height: 600px;
    width: 100%;
    position: relative;
    &-img {
      height: 100%;
      background-image: url('../../assets/images/444.jpg');
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

.box-card {
  margin: 0 auto;
  width: 95%;
}

.operatin-button {
  width: 100%;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
}
// .addordelete-button {
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   margin-bottom: 5px;
// }
.persona-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
