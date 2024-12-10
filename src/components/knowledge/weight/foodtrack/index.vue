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
      <div class="content">
        <el-card>
          <el-button class="custom-button" type="primary" @click="showForm">新增进餐记录</el-button>
          <div class="vertical-div">
            <Dialog :is-visible='isVisible' @close="closeDialog"></Dialog>
          </div>
        </el-card>
        <!-- 下方内容 内容为详细的营养分析-->
        <el-card style="margin-top: 10px;">
          <div class="bottom">
            <div class="bottom-left">
              <span class="custom-span">微量元素分析</span>
              <minirals></minirals>
            </div>
            <div class="bottom-right">
              <span class="custom-span">基本营养素分析</span>
              <echarts></echarts>
            </div>
          </div>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import minirals from '@/components/knowledge/weight/minirals/index.vue'
import echarts from '@/components/knowledge/weight/echarts/index.vue'
import Dialog from './dialog.vue'
export default {
  components: {
    minirals,
    Dialog,
    echarts,
  },
  data () {
    return {
      activeName: 'qv',
      total_data: [],
      isVisible: false, // 控制对话框的显示和隐藏
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
      selectedResult: null, // 存储用户选择的结果
      addMealDialogVisible: false,
    }
  },
  mounted () {
  },
  methods: {
    format (percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    },
    showForm () {
      // this.$store.state.foodtrack.dialogVisible = true // 点击按钮时显示表单对话框
      this.isVisible = true
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
    },
    closeDialog() {
      this.isVisible = false;
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

  .content {
    flex: 1;
  }

  .el-icon-s-custom {
    font-size: 16px;
  }

  .custom-button {
    width: 200px;
    margin-left: 16px;
    font-size: 16px;
    background-color: #00254FCC;
    border-color: #00254FCC;
  }

  .custom-span {
    font-size: 16px;
    font-weight: bold;
  }

  .vertical-div {
    margin-bottom: 20px;
  }
  
  .bottom {
    display: flex;
  }

  .bottom-left {
    width: 50vw;
  }

  .bottom-right {
    flex: 1;
    margin-left: 20px;
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
