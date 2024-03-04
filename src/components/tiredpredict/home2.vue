<template>
  <div class="fatigueHome__wrapper">
    <div class="fatigueHome__topper">
      <div class="fatigueHome__topper-img"></div>
      <div class="fatigueHome__topper-overlay"></div>
      <div class="fatigueHome__topper-title">
        <h1>疲劳预测</h1>
      </div>
    </div>
    <el-card class="box-card">
      <div class="fatigueHomepredict__wrapper">
        <div class="fatigueHomepredict__model">
          <div style="text-align: right; margin-bottom: 1%; margin-top: 100px;">
            今天日期
            <el-date-picker
              v-model="todaydate"
              type="date"
              disabled
              clearable="false"
              placeholder="今天日期"
            >
            </el-date-picker>
          </div>
          <div class="fatigueHomepredict__model-wrapper">
            <div class="fatigueHomepredict__model-wrapper-echarts">
              <el-table :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" :data="tableData.slice((currentPage - 1) * pageSize,currentPage * pageSize)" style="width: 100%">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                </el-table-column>
                <el-table-column prop="date" label="时间">
                </el-table-column>
                <el-table-column prop="result" label="预测结果（点击查看详细信息）">
                  <template slot-scope="scope">
                    <span class="pointer" @click="enterDetail(scope.$index, scope.row)"
                    style="cursor: pointer;color: blue;font-style: italic;text-decoration: underline;">疲劳</span>
                  </template>
                </el-table-column>
                <el-table-column prop="reason" label="预测原因">
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[12, 24, 36, 48]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length"
              >
              </el-pagination>
            </div>
          </div>
          <div class="msg">
            {{ messages }}
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import axios from "axios"

export default {
  data() {
    return {
      todaydate: new Date(),
      tableData: [],
      pageSize: 12,
      currentPage: 1,
      selectYear: "",
      yearOptions: [],
      selectComp: "",
      compOptions: [],
      selectEvent: "",
      eventOptions: [],
      selectEventName: "",
      country: [],
      cNumber: 0,
      d500m: [],
      d1000m: [],
      d1500m: [],
      d2000m: [],
      series: [],
      defaultValue: null,
      fenduanForm: {
        d500mValue: "",
        d1000mValue: "",
        d1500mValue: "",
        d2000mValue: "",
      },
      messages: ''
    };
  },
  created() {
    this.defaultValue = new Date();
    this.defaultValue.setHours(0);
    this.defaultValue.setMinutes(1);
    this.defaultValue.setSeconds(0);
  },
  async mounted() {
    this.getYear();
    await this.showTable();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getYear () {
      axios.get("http://localhost/cm/getYear").then((res) => {
        const yearArr = res.data;
        this.yearOptions = yearArr.map((item) => ({
          value: item,
          label: item,
        }));
      }).catch((err) => {
        console.log("获取数据失败" + err);
      });
    },
    showTable () {
      axios.get('http://localhost/fatigue_predict/getAllFatigueData2').then(res => {
        // console.log(res.data);
        if (res.data.info != null) {
          // console.log(res.data.info[0]);
          this.messages = res.data.info[0]['message']
        } else {
          for (let i = 0; i < res.data.res.length; i++) {
            this.tableData.push(res.data.res[i])
          }
        }
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    enterDetail (index, data) {
      const params = {
        data: this.tableData[index]
      }
      this.$router.push({
        name: 'specialIndex2',
        params: {
          info: params
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin: 0 auto;
  width: 95%;
}

.fatigueHome {
  &__wrapper {
    width: 100%;
  }

  &__topper {
    height: 80px;
    width: 100%;
    position: fixed;
    z-index: 2;

    &-img {
      height: 100%;
      background-image: url("../../assets/images/777.jpg");
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
      background: transparent
        linear-gradient(
          180deg,
          rgba(0, 57, 124, 0.1),
          rgba(0, 44, 94, 0.3) 22%,
          rgba(0, 37, 79, 0.5) 50%,
          #001d3e
        )
        0 0 no-repeat padding-box;
    }

    &-title {
      width: 100%;
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      h1 {
        width: 80%;
        margin: 0 auto;
        // font-family: "Effra",Arial,sans-serif;
        // font-style: italic;
        font-size: 40px;
        color: white;
        line-height: 75px;
      }
    }
  }
}

.pointer {
  cursor: pointer;
}

/deep/ .el-table__header th {
  color: black;
  font-size: 14px;
}

/deep/ .el-form-item__label {
  color: black;
}

/deep/ .el-table {
  color: black;
}

.msg{
  align-content: center;
  display: block;
  font-size: x-large;
  color: red;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 30px;
}
</style>
