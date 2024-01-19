<template>
  <div class="one__wrapper">
    <div class="one__topper">
      <div class="one__topper-img"></div>
      <div class="one__topper-overlay"></div>
      <div class="one__topper-title">
        <h1>日常监控</h1>
      </div>
    </div>
    <div class="top-section">
      <!-- <div class="left-section">
      </div> -->
      <el-card>
        <div class="vertical-div">
          <el-row :gutter="24">
            <el-col :span="12">
              <div class="text">
                <i class="el-icon-s-custom"></i>
                <label class="custom-span" for="height">身高（cm）：183</label>
                <!-- <el-input v-model="input" placeholder="请输入身高"></el-input> -->
              </div>
            </el-col>
            <el-col :span="12">
              <div class="text">
                <i class="el-icon-s-custom"></i>
                <label for="weight" class="custom-span">体重（kg）：80</label>
                <!-- <el-input v-model="input" placeholder="请输入体重"></el-input> -->
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <div class="content">
        <el-card class="box-card1">
          <div class="vertical-div">
            <el-row>
              <!-- <el-col :span="8">
              <span class="custom-span">一日三餐记录</span>
            </el-col> -->
              <el-col :span="8">
                <el-button class="custom-button" type="primary" @click="showForm">新增进餐记录</el-button>
              </el-col>
              <el-col :span="8">
                <!-- <input  v-model="keyword" placeholder="输入关键词"> -->
                <el-input class="custom-input" type="text" v-model="keyword" placeholder="请输入关键字"></el-input>
                <!-- <button >搜索</button> -->
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                <ul>
                  <li v-for="result in searchResults" :key="result.id" @click="selectItem(result)">
                    {{ result.name }}
                  </li>
                </ul>
              </el-col>
            </el-row>
            <el-dialog :visible.sync="dialogVisible" title="本餐次的食物记录">
              <el-form :model="intake_record" ref="intake_record" label-width="100px" class="demo-dynamic">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="日期" prop='date' :rules="{ required: true, message: '请选择日期', trigger: 'change' }">
                      <div class="block">
                        <el-date-picker v-model="intake_record.date" type="date" placeholder="选择日期">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="餐次">
                      <el-select v-model="value" placeholder="请选择餐次：">
                        <el-option v-for="item in intake_record.meals" :key="item.value" :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item v-for="dish in intake_record.dishes" label="食物名称" :key="dish.id" :prop="dish.name" :rules="{
                  required: true, message: '食物名称不能为空', trigger: 'blur'
                }">
                  <el-row :gutter="4">
                    <el-col :span="6">
                      <el-select v-model="dishesName.name" @focus="getDishesName" placeholder="请选择">
                        <el-option v-for="item in dishesName" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="6">
                      <!-- <el-input-number v-model="intake_record.dishes.intake_num" @change="handleChange" :min="1" :max="10"
                      label="描述文字"></el-input-number> -->
                      <el-select v-model="intake_record.dishes.intake_num" @change="handleChange" placeholder="请选择">
                        <el-option label="100g" value="100g"></el-option>
                        <el-option label="1小碗" value="1小碗"></el-option>
                        <el-option label="1大碗" value="1大碗"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="6">
                      <el-button @click.prevent="removeDish(dish)">删除</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('intake_record')">提交</el-button>
                  <el-button @click="addDish">新增食物</el-button>
                  <el-button @click="resetForm('intake_record')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
          <div>
            <el-row :gutter="24">
              <el-col :span="14">
                <span class="custom-span">一日三餐记录</span>
                <el-table :data="total_data" style="width: 100%">
                  <!-- <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="日期">
                        <span>{{ props.row.intake_date }}</span>
                      </el-form-item>
                      <el-form-item label="餐次">
                        <span>{{ props.row.meals_id }}</span>
                      </el-form-item>
                      <el-form-item label="热量（千卡）">
                        <span>{{ props.row.intake_data.main_ingredient.热量 }}</span>
                      </el-form-item>
                      <el-form-item label="碳水化合物（克）">
                        <span>{{ props.row.intake_data.main_ingredient.碳水化合物 }}</span>
                      </el-form-item>
                      <el-form-item label="蛋白质（克）">
                        <span>{{ props.row.intake_data.main_ingredient.蛋白质 }}</span>
                      </el-form-item>
                      <el-form-item label="脂肪（克）">
                        <span>{{ props.row.intake_data.main_ingredient.脂肪 }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column> -->
                  <el-table-column label="日期" prop="intake_date">
                  </el-table-column>
                  <el-table-column label="餐次" prop="meals_id">
                  </el-table-column>
                  <el-table-column label="总热量（千卡）" prop="intake_data.main_ingredient.热量">
                  </el-table-column>
                  <el-table-column label="蛋白质（克）" prop="intake_data.main_ingredient.蛋白质">
                  </el-table-column>
                  <el-table-column label="碳水化合物（克）" prop="intake_data.main_ingredient.碳水化合物">
                  </el-table-column>
                  <el-table-column label="脂肪（克）" prop="intake_data.main_ingredient.脂肪">
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="10">
                <echarts></echarts>
              </el-col>
            </el-row>

          </div>
        </el-card>
        <!-- </div> -->
      </div>
    </div>
    <div class="content">
      <!-- 下方内容 内容为详细的营养分析-->
      <el-row :gutter="4">
        <el-col :span="12">
          <el-card>
            <!-- <el-divider direction="vertical"></el-divider> -->
            <div class="custom-span">热量&三大营养素分析</div>
            <div class="dashboard">
              <div class="dashboard-item">
                <div class="progress-wrapper">
                  <el-progress type="circle" :percentage="25"></el-progress>
                </div>
                <div class="content-wrapper">
                  <p>卡路里（kcal）</p>
                  <div class="rate">
                    <h6>+1.78%</h6>
                    <h3>{{ total_cal }}</h3>
                  </div>
                  <p>实际摄入量</p>

                </div>
              </div>
              <div class="dashboard-item">
                <div class="progress-wrapper">
                  <el-progress type="circle" :percentage="100" status="success"></el-progress>
                </div>
                <div class="content-wrapper">
                  <p>碳水化合物（g）</p>
                  <div class="rate">
                    <h6>+1.78%</h6>
                    <h3>37.9</h3>
                  </div>
                  <p>实际摄入量</p>
                </div>

              </div>
              <div class="dashboard-item">
                <div class="progress-wrapper">
                  <el-progress type="circle" :percentage="70" status="warning"></el-progress>
                </div>
                <div class="content-wrapper">
                  <p>蛋白质（g）</p>
                  <div class="rate">
                    <h6>-10.8%</h6>
                    <h3>38</h3>
                  </div>

                  <p>实际摄入量</p>
                </div>
              </div>
              <div class="dashboard-item">
                <div class="progress-wrapper">
                  <el-progress type="circle" :percentage="50" status="exception"></el-progress>
                </div>
                <div class="content-wrapper">

                  <p>脂肪（g）</p>
                  <div class="rate">
                    <h6>+1.78%</h6>
                    <h3>10</h3>
                  </div>
                  <p>实际摄入量</p>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="nutrition-card">

            <div class="important">
              <!-- <el-divider direction="vertical"></el-divider> -->
              <div class="custom-span">重点营养素分析</div>
            </div>
            <minirals></minirals>
            <!-- <el-progress class="nutrition-progress" :percentage="50"></el-progress>
            <el-progress class="nutrition-progress" :percentage="100" :format="format"></el-progress>
            <el-progress class="nutrition-progress" :percentage="100" status="success"></el-progress>
            <el-progress class="nutrition-progress" :percentage="100" status="warning"></el-progress>
            <el-progress class="nutrition-progress" :percentage="50" status="exception"></el-progress> -->
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import echarts from '../echarts/index.vue'
import minirals from '@/components/knowledge/weight/minirals/index.vue'
export default {

  components: {
    echarts,
    minirals

  },
  data () {
    return {
      activeName: 'qv',
      total_data: [],
      dialogVisible: false, // 控制对话框的显示和隐藏
      // num: 1,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: '',
      intake_record: {
        dishes: [{
          id: '',
          name: '',
          intake_num: ''
        }],
        meals: [{
          value: '选项1',
          label: '早餐'
        }, {
          value: '选项2',
          label: '午餐'
        }, {
          value: '选项3',
          label: '晚餐'
        }],
        date: ''
      },
      value: '',
      // input: '',
      keyword: '', // 存储用户输入的关键词
      // searchResults: [], // 存储搜索结果
      selectedResult: null // 存储用户选择的结果
    }
  },
  mounted () {
  },
  methods: {
    format (percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    },
    showForm () {
      this.dialogVisible = true // 点击按钮时显示表单对话框
    },
    handleChange (value) {
      console.log(value)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // this.getMeals(); //调用创建餐次记录的api方法
          this.$store.dispatch('getMeals', formName)
          this.total_data.push(this.tableData[0])
          this.showForm = false // 隐藏表单
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDish (item) {
      var index = this.intake_record.dishes.indexOf(item)
      if (index !== -1) {
        this.intake_record.dishes.splice(index, 1)
      }
    },
    addDish () {
      this.intake_record.dishes.push({
        value: '',
        key: Date.now()
      })
    },
    getDishesName () {
      this.$store.dispatch('getDishesName')
    },
    getMeals () {
      this.$store.dispatch('getMeals')
    },
    getCurrentDate () {
      let today = new Date()
      let year = today.getFullYear()
      let month = ('0' + (today.getMonth() + 1)).slice(-2)
      let day = ('0' + today.getDate()).slice(-2)
      let formattedDate = year + '-' + month + '-' + day
      return formattedDate
    },
    search () {
      // 发起请求到后端进行模糊查询，并更新搜索结果
      // 这里假设使用 axios 库发送请求到后端的 /api/search 接口
      this.$store.dispatch('search')
    },
    selectItem (item) {
      this.selectedResult = item
      // 执行您希望的其他操作，例如显示选中结果的详细信息等
    }
  },
  computed: {
    ...mapState({
      dishesName: (state) => state.foodtrack.dishesName,
      tableData: (state) => state.meals.meals || [],
      searchResults: (state) => state.meals_vage.searchResults
    }),
    total_cal () {
      let date = this.getCurrentDate()
      let newarr = this.total_data.filter(item => item.intake_date === date)
      console.log('hivgcfcf', this.total_data)
      console.log('hihuih', newarr)
      let num = 0
      newarr.forEach(element => {
        num += parseInt(element.total_intake.main_ingredient.热量)
      })
      return num
    }
  }
}
</script>

<style lang='less' scoped>
.one {
  &__wrapper {
    width: 100%;
  }

  &__topper {
    height: 600px;
    width: 100%;
    position: relative;

    &-img {
      height: 100%;
      background-image: url('../../../../assets/images/555.jpg');
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
      background: transparent linear-gradient(180deg, rgba(0, 57, 124, .1), rgba(0, 44, 94, .3) 22%, rgba(0, 37, 79, .5) 50%, #001d3e) 0 0 no-repeat padding-box;
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
        font-family: "Effra", Arial, sans-serif;
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

.el-icon-s-custom {
  font-size: 16px;
}

.custom-button {
  width: 200px;
  margin-left: 16px;
  font-size: 16px;
}

.custom-input {
  width: 300px;
  /* 自定义宽度 */

}

.important {
  margin-bottom: 8px;
}

.nutrition-progress {
  margin-bottom: 8px;
  /* 添加底部间距为10像素 */
}

.nutrition-card {
  margin-bottom: 16px;
  height: 668px;
  /* 添加底部间距为20像素 */
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.custom-span {
  font-size: 16px;
  font-weight: bold;
  /* 修改字体大小为 16px */
}

.vertical-div {
  margin-bottom: 16px;
  /* 调整竖直方向的间距，这里设为 20px */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.top-section {
  width: 100%;
  height: auto;
  /* display: flex; */
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
}

.dashboard-item {
  padding: 20px;
  border-radius: 8px;
}

.progress-wrapper {
  margin-right: 8px;
  /* 可选样式，用于控制进度条与文字之间的间距 */
}

.content-wrapper {
  flex: 1;

  .rate {
    position: relative;
  }

  .rate h6 {
    position: absolute;
    top: 0;
    right: 60%;
    margin: 0;
    color: rgb(37, 166, 37);
  }
}

.content-wrapper p {
  font-size: 16px;
  /* 设置字体大小 */
  color: rgb(111, 111, 123);
  /* 设置字体颜色 */
}

.content {
  margin-top: 8px;
  /* 可根据需要调整内容与上方部分的间距 */
}</style>
