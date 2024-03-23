<template>
  <div class="one__wrapper">
    <div class="one__topper">
      <div class="one__topper-img"></div>
      <div class="one__topper-overlay"></div>
      <div class="one__topper-title">
        <h1>日常营养监控</h1>
      </div>
    </div>
    <div class="container">
      <div class="top-section">
        <el-card>
          <el-row :gutter="24">
            <el-col :span="12">
              <div class="text">
                <i class="el-icon-s-custom"></i>
                <label class="custom-span" for="height">身高（cm）：183</label>
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
        </el-card>
      </div>
      <div class="content">
        <el-card>
          <div class="vertical-div">
            <el-row>
              <el-col :span="10">
                <el-button class="custom-button" type="primary" @click="showForm"
                  style="background-color: #00254FCC;border-color: #00254FCC;">新增进餐记录</el-button>
              </el-col>
              <el-col :span="10">
                <el-input class="custom-input" type="text" v-model="keyword" placeholder="请输入关键字"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search"
                  style="background-color: #00254FCC;border-color: #00254FCC;">搜索</el-button>
                <ul>
                  <li v-for="result in searchResults" :key="result.id" @click="selectItem(result)">
                    {{ result.name }}
                  </li>
                </ul>
              </el-col>
            </el-row>
            <Dialog></Dialog>
          </div>
        </el-card>
        <!-- 下方内容 内容为详细的营养分析-->
        <el-row :gutter="4">
          <el-col :span="12">
            <el-card>
              <div class="custom-span">热量&三大营养素分析</div>
              <div class="dashboard">
                <div class="dashboard-item">
                  <div class="progress-wrapper">
                    <el-progress type="circle" :percentage="computedCal"></el-progress>
                  </div>
                  <div class="content-wrapper">
                    <p>卡路里（kcal）</p>
                    <div class="rate">
                      <h3>{{ total_cal }}</h3>
                    </div>
                    <p>实际摄入量</p>
                  </div>
                </div>
                <div class="dashboard-item">
                  <div class="progress-wrapper">
                    <el-progress type="circle" :percentage="computedCarbs"></el-progress>
                  </div>
                  <div class="content-wrapper">
                    <p>碳水化合物（g）</p>
                    <div class="rate">
                      <h3>{{ total_carbs }}</h3>
                    </div>
                    <p>实际摄入量</p>
                  </div>
                </div>
                <div class="dashboard-item">
                  <div class="progress-wrapper">
                    <el-progress type="circle" :percentage="computedProtein"></el-progress>
                  </div>
                  <div class="content-wrapper">
                    <p>蛋白质（g）</p>
                    <div class="rate">
                      <h3>{{ total_protein }}</h3>
                    </div>
                    <p>实际摄入量</p>
                  </div>
                </div>
                <div class="dashboard-item">
                  <div class="progress-wrapper">
                    <el-progress type="circle" :percentage="computedFat"></el-progress>
                  </div>
                  <div class="content-wrapper">
                    <p>脂肪（g）</p>
                    <div class="rate">
                      <h3>{{ total_fat }}</h3>
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
                <div class="custom-span">重点营养素分析</div>
              </div>
              <minirals></minirals>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import minirals from '@/components/knowledge/weight/minirals/index.vue'
import Dialog from './dialog.vue'
export default {
  components: {
    minirals,
    Dialog
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
      keyword: '', // 存储用户输入的关键词
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
      this.$store.state.foodtrack.dialogVisible = true // 点击按钮时显示表单对话框
    },
    handleChange (value) {
      console.log(value)
    },
    getDishesName () {
      this.$store.dispatch('getDishesName')
    },
    getMeals () {
      this.$store.dispatch('getMeals')
    },
    search () {
      // 发起请求到后端进行模糊查询，并更新搜索结果
      // 这里假设使用 axios 库发送请求到后端的 /api/search 接口
      console.log(this.keyword)
      this.$store.dispatch('search', this.keyword)
    },
    selectItem (item) {
      this.selectedResult = item
    }
  },
  computed: {
    ...mapState({
      dishesName: (state) => state.foodtrack.dishesName,
      tableData: (state) => state.meals.meals || [],
      searchResults: (state) => state.mealsVage.searchResults || [],
    }),
    total_cal () {
      // const cal = this.$store.state.foodtrack.mainIngredient.ingredient.calories
      // return parseFloat(cal).toFixed(2);
      const ingredient = this.$store.state.foodtrack.mainIngredient.ingredient;
      let cal = 0;
      if (ingredient && ingredient.calories) {
        cal = parseFloat(ingredient.calories).toFixed(2);
      }
      return cal;
    },
    computedCal () {
      const stdCal = 4200;
      const ratio = this.total_cal / stdCal;
      const percentage = ratio * 100;
      return parseFloat(percentage).toFixed(1);
    },
    total_fat () {
      // const fat = this.$store.state.foodtrack.mainIngredient.ingredient.fat
      // return parseFloat(fat).toFixed(2);
      const ingredient = this.$store.state.foodtrack.mainIngredient.ingredient;
      let fat = 0;

      if (ingredient && ingredient.fat) {
        fat = parseFloat(ingredient.fat).toFixed(2);
      }

      return fat;
    },
    computedFat () {
      const stdFat = 128.5;
      const ratio = this.total_fat / stdFat;
      const percentage = ratio * 100;
      return parseFloat(percentage).toFixed(1);
    },
    total_carbs () {
      // const carbs = this.$store.state.foodtrack.mainIngredient.ingredient.carbohydrates
      // return parseFloat(carbs).toFixed(2);
      const ingredient = this.$store.state.foodtrack.mainIngredient.ingredient;
      let carbs = 0;

      if (ingredient && ingredient.carbohydrates !== undefined) {
        carbs = parseFloat(ingredient.carbohydrates).toFixed(2);
      }

      return carbs;
    },
    computedCarbs () {
      const stdCarbs = 627.5;
      const ratio = this.total_carbs / stdCarbs;
      const percentage = ratio * 100;
      return parseFloat(percentage).toFixed(1);
    },
    total_protein () {
      // const protein = this.$store.state.foodtrack.mainIngredient.ingredient.protein
      // return parseFloat(protein).toFixed(2);
      const ingredient = this.$store.state.foodtrack.mainIngredient.ingredient;
      let carbs = 0;

      if (ingredient && ingredient.carbohydrates) {
        carbs = parseFloat(ingredient.carbohydrates).toFixed(2);
      }

      return carbs;
    },
    computedProtein () {
      const stdProtein = 142
      const ratio = this.total_protein / stdProtein
      const percentage = ratio * 100
      return parseFloat(percentage).toFixed(1)
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
      height: 80px;
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

  .container {
    display: flex;
    flex-direction: column;
  }

  .top-section {
    height: 80px;
  }

  .content {
    flex: 1;
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
    margin-bottom: 20px;
    /* 调整竖直方向的间距，这里设为 20px */
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
</style>
