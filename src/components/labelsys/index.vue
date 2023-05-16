<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>标签列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true">
          <el-form-item label="标签分类">
            <el-select v-model="value" placeholder="请选择分类" size="small" @change="handleSelect">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="all">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 添加运动员的按钮 -->
        <el-button type="primary" size="small" class="btn-pub" @click="dialogaddVisible = 'true'">添加</el-button>
      </div>

      <!-- 标签体系区域 -->
      <el-table
        ref="multipleTable"
        :data="changeinfo.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
        height="600"
        tooltip-effect="dark"
        style="width: 90%, margin-left: 50px"
        border
        stripe
        @selection-change="handleSelectionChange"
        :header-cell-style="rowClass"
        :cell-style="cellStyle">
            <el-table-column fixed type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>
            <el-table-column prop="age" label="年龄" width="120" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" width="120" align="center"></el-table-column>
            <el-table-column prop="level" label="级别" width="120" align="center"></el-table-column>
            <el-table-column prop="event" label="项目" width="120" align="center"></el-table-column>
            <el-table-column prop="height" label="身高" width="120" align="center"></el-table-column>
            <el-table-column prop="shoulder" label="肩宽" width="120" align="center"></el-table-column>
            <el-table-column prop="weight" label="体重" width="120" align="center"></el-table-column>
            <el-table-column prop="VO2MAX" label="最大摄氧量（L/min）" width="120" align="center"></el-table-column>
            <el-table-column prop="WYF" label="无氧阀功率（W）" width="120" align="center"></el-table-column>
            <el-table-column prop="WL" label="卧拉（kg）" width="120" align="center"></el-table-column>
            <el-table-column prop="SD" label="深蹲（kg）" width="120" align="center"></el-table-column>
            <el-table-column prop="CGY" label="测功仪2000m（mm:ss）" width="120" align="center"></el-table-column>
            <el-table-column prop="power" label="力量（分）" width="120" align="center"></el-table-column>
            <el-table-column prop="NL" label="耐力（分）" width="120" align="center"></el-table-column>
            <el-table-column prop="perform" label="比赛成绩" width="160" align="center"></el-table-column>
            <el-table-column prop="SBBW" label="伤病部位" width="120" align="center"></el-table-column>
            <el-table-column prop="SBtime" label="受伤时间" width="120" align="center"></el-table-column>
            <el-table-column prop="ZLZK" label="治疗状况" width="120" align="center"></el-table-column>
            <el-table-column prop="ZLtime" label="治疗时长" width="120" align="center"></el-table-column>
            <!-- <el-table-column prop="address" label="地址" align="center" show-overflow-tooltip></el-table-column> -->
            <!-- <el-table-column label="状态" prop="state"></el-table-column> -->
            <el-table-column fixed="right" label="操作" align="center" width="150">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="HuiXian(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="del(scope.$index, scope.row)">删除</el-button>
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
      <!-- 新增标签区域 -->
      <el-dialog title="新增标签" :visible.sync="dialogaddVisible">
        <el-form :model="label_add" ref="label_add">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="label_add.name" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" :label-width="formLabelWidth" prop="date">
              <el-date-picker v-model="label_add.date" type="date" placeholder="选择日期" @change="getAge" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
              <el-radio-group v-model="label_add.gender" size="small">
                <el-radio label="男" border>男</el-radio>
                <el-radio label="女" border>女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="级别" :label-width="formLabelWidth" prop="level">
              <el-select v-model="label_add.level" placeholder="请选择级别">
                <el-option label="轻量级" value="轻量级"></el-option>
                <el-option label="公开级" value="公开级"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主力项目" :label-width="formLabelWidth" prop="event">
              <el-checkbox-group v-model="label_add.event" size="small">
                <el-checkbox label="单人单桨" border></el-checkbox>
                <el-checkbox label="单人双桨" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="身高" :label-width="formLabelWidth" prop="height">
              <el-input v-model="label_add.height" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="肩宽" :label-width="formLabelWidth" prop="shoulder">
              <el-input v-model="label_add.shoulder" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="体重" :label-width="formLabelWidth" prop="weight">
              <el-input v-model="label_add.weight" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="最大摄氧量" :label-width="formLabelWidth" prop="VO2MAX">
              <el-input v-model="label_add.VO2MAX" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="无氧阀功率" :label-width="formLabelWidth" prop="WYF">
              <el-input v-model="label_add.WYF" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="卧拉" :label-width="formLabelWidth" prop="WL">
              <el-input v-model="label_add.WL" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="深蹲" :label-width="formLabelWidth" prop="SD">
              <el-input v-model="label_add.SD" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="测功仪2000m" :label-width="formLabelWidth" prop="CGY">
              <el-input v-model="label_add.CGY" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="力量" :label-width="formLabelWidth" prop="power">
              <el-input v-model="label_add.power" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="耐力" :label-width="formLabelWidth" prop="NL">
              <el-input v-model="label_add.NL" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="比赛成绩" :label-width="formLabelWidth" prop="perform">
              <el-input v-model="label_add.perform" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="伤病部位" :label-width="formLabelWidth" prop="SBBW">
              <el-input v-model="label_add.SBBW" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="受伤时间" :label-width="formLabelWidth" prop="SBtime">
              <el-input v-model="label_add.SBtime" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="治疗状况" :label-width="formLabelWidth" prop="ZLZK">
              <el-input v-model="label_add.ZLZK" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="治疗时长" :label-width="formLabelWidth" prop="ZLtime">
              <el-input v-model="label_add.ZLtime" style="width: 180px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="ClearForm('label_add')">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改标签区域 -->
      <el-dialog title="修改标签" :visible.sync="dialogupdateVisible">
        <el-form :model="label_add" ref="label_add">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="label_add.name" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
              <el-input v-model="label_add.age" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
              <el-radio-group v-model="label_add.gender" size="small">
                <el-radio label="男" border>男</el-radio>
                <el-radio label="女" border>女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="级别" :label-width="formLabelWidth" prop="level">
              <el-select v-model="label_add.level" placeholder="请选择级别">
                <el-option label="轻量级" value="轻量级"></el-option>
                <el-option label="公开级" value="公开级"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主力项目" :label-width="formLabelWidth" prop="event">
              <el-input v-model="label_add.event" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="身高" :label-width="formLabelWidth" prop="height">
              <el-input v-model="label_add.height" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="肩宽" :label-width="formLabelWidth" prop="shoulder">
              <el-input v-model="label_add.shoulder" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="体重" :label-width="formLabelWidth" prop="weight">
              <el-input v-model="label_add.weight" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="最大摄氧量" :label-width="formLabelWidth" prop="VO2MAX">
              <el-input v-model="label_add.VO2MAX" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="无氧阀功率" :label-width="formLabelWidth" prop="WYF">
              <el-input v-model="label_add.WYF" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="卧拉" :label-width="formLabelWidth" prop="WL">
              <el-input v-model="label_add.WL" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="深蹲" :label-width="formLabelWidth" prop="SD">
              <el-input v-model="label_add.SD" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="测功仪2000m" :label-width="formLabelWidth" prop="CGY">
              <el-input v-model="label_add.CGY" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="力量" :label-width="formLabelWidth" prop="power">
              <el-input v-model="label_add.power" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="耐力" :label-width="formLabelWidth" prop="NL">
              <el-input v-model="label_add.NL" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="比赛成绩" :label-width="formLabelWidth" prop="perform">
              <el-input v-model="label_add.perform" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="伤病部位" :label-width="formLabelWidth" prop="SBBW">
              <el-input v-model="label_add.SBBW" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="受伤时间" :label-width="formLabelWidth" prop="SBtime">
              <el-input v-model="label_add.SBtime" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="治疗状况" :label-width="formLabelWidth" prop="ZLZK">
              <el-input v-model="label_add.ZLZK" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="治疗时长" :label-width="formLabelWidth" prop="ZLtime">
              <el-input v-model="label_add.ZLtime" style="width: 180px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="ClearForm('label_add')">取 消</el-button>
            <el-button type="primary" @click="update">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      id: '',
      name: '',
      age: '',
      gender: '',
      level: '',
      event: '',
      height: '',
      shoulder: '',
      weight: '',
      VO2MAX: '',
      WYF: '',
      WL: '',
      SD: '',
      CGY: '',
      power: '',
      NL: '',
      perform: '',
      SBBW: '',
      SBtime: '',
      ZLZK: '',
      ZLtime: '',
      info: [],
      multipleSelection: [],
      dialogaddVisible: false,
      dialogupdateVisible: false,
      label_add: {
        name: '',
        age: '',
        date: '',
        gender: '',
        level: '',
        event: [],
        height: 0,
        shoulder: 0,
        weight: 0,
        VO2MAX: 0,
        WYF: 0,
        WL: 0,
        SD: 0,
        CGY: '',
        power: 0,
        NL: 0,
        perform: '',
        SBBW: '',
        SBtime: '',
        ZLZK: '',
        ZLtime: ''
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
      formLabelWidth: '120px'
    }
  },

  methods: {
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
      // // 调用接口数据
      // this.all()
    },
    // 点击第几页把页码传进来，发送接口请求改变数据
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      // // 调用接口数据
      // this.all()
    },
    // 清空表单数据
    ClearForm (formName) {
      this.dialogaddVisible = false
      this.dialogupdateVisible = false
      this.$refs[formName].resetFields()// 点击取消按钮，清空el-input
    },
    all () { // 查找info表全部数据
      axios.get('http://127.0.0.1/list/all').then(res => {
        // console.log(res.data)
        this.info = res.data
        this.changeinfo = res.data
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
    },
    rowClass ({ rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 9 || columnIndex === 13) {
          return {color: 'red'}
        }
      }
    },
    cellStyle ({row, column, rowIndex, columnIndex}) {
      if (column.property === 'VO2MAX' || column.property === 'CGY') {
        return {color: 'red', 'font-weight': 700}
      }
    },
    getAge (e) {
      var date = new Date()
      var year = date.getFullYear()
      var ayear = e.substring(0, 4)
      this.label_add.age = year - Number(ayear)
    },
    get () {
      axios.get('http://127.0.0.1/user').then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    del (index, row) { // 删除操作
      // console.log(index, row)
      axios.get('http://127.0.0.1/list/del', {
        params: {
          id: row.id
        }
      }).then(res => {
        if (res.data.status === 200) {
          this.$message({
            message: '删除成功'
          })
          this.all()
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
    add () { // 添加操作
      // console.log(this.label_add.age)
      axios.get('http://127.0.0.1/list/add', {
        params: {
          name: this.label_add.name,
          age: this.label_add.age,
          gender: this.label_add.gender,
          level: this.label_add.level,
          event: this.label_add.event.join('/'),
          height: this.label_add.height,
          shoulder: this.label_add.shoulder,
          weight: this.label_add.weight,
          VO2MAX: this.label_add.VO2MAX,
          WYF: this.label_add.WYF,
          WL: this.label_add.WL,
          SD: this.label_add.SD,
          CGY: this.label_add.CGY,
          power: this.label_add.power,
          NL: this.label_add.NL,
          perform: this.label_add.perform,
          SBBW: this.label_add.SBBW,
          SBtime: this.label_add.SBtime,
          ZLZK: this.label_add.ZLZK,
          ZLtime: this.label_add.ZLtime
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.status === 200) {
          this.$message({
            message: '添加成功'
          })
          this.dialogaddVisible = false
          this.all()
          this.ClearForm(this.label_add)
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
    HuiXian (row) { // 回显数据
      this.dialogupdateVisible = true
      this.HuiXianid = row.id
      this.$nextTick(() => {
        // 先让对话框出现, 它绑定空值的对象, 才能resetFields清空用初始空值
        this.label_add.name = row.name
        this.label_add.age = row.age
        this.label_add.gender = row.gender
        this.label_add.level = row.level
        this.label_add.event = row.event
        this.label_add.height = row.height
        this.label_add.shoulder = row.shoulder
        this.label_add.weight = row.weight
        this.label_add.VO2MAX = row.VO2MAX
        this.label_add.WYF = row.WYF
        this.label_add.WL = row.WL
        this.label_add.SD = row.SD
        this.label_add.CGY = row.CGY
        this.label_add.power = row.power
        this.label_add.NL = row.NL
        this.label_add.perform = row.perform
        this.label_add.SBBW = row.SBBW
        this.label_add.SBtime = row.SBtime
        this.label_add.ZLZK = row.ZLZK
        this.label_add.ZLtime = row.ZLtime
      })
    },
    update () { // 修改操作
      axios.get('http://127.0.0.1/list/update', {
        params: {
          id: this.HuiXianid,
          name: this.label_add.name,
          age: this.label_add.age,
          gender: this.label_add.gender,
          level: this.label_add.level,
          event: this.label_add.event,
          height: this.label_add.height,
          shoulder: this.label_add.shoulder,
          weight: this.label_add.weight,
          VO2MAX: this.label_add.VO2MAX,
          WYF: this.label_add.WYF,
          WL: this.label_add.WL,
          SD: this.label_add.SD,
          CGY: this.label_add.CGY,
          power: this.label_add.power,
          NL: this.label_add.NL,
          perform: this.label_add.perform,
          SBBW: this.label_add.SBBW,
          SBtime: this.label_add.SBtime,
          ZLZK: this.label_add.ZLZK,
          ZLtime: this.label_add.ZLtime
        }
      }).then(res => {
        // console.log(res.data);
        if (res.data.status === 200) {
          this.$message({
            message: '修改成功'
          })
          this.dialogupdateVisible = false
          this.all()
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
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
    .name {
      padding-left: 15px;
      color: white;
      font-size: 24px;
      font-weight: 900;
      line-height: 60px;
    }
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  background-color: #23262e;
  user-select: none;
  //   img {
  //     width: 35px;
  //     height: 35px;
  //     border-radius: 50%;
  //     background-color: #fff;
  //     margin-right: 15px;
  //     object-fit: cover;
  //   }
  span {
    color: white;
    font-size: 12px;
  }
}

// 侧边栏菜单的样式
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}

.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}

.box-card {
  margin: 0 auto;
  width: 100%;
}

</style>
