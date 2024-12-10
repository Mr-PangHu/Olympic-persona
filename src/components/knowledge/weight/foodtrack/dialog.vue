<template>
  <div>
    <div class='top'>
      <div class="top-left">
        <div class="custom-span">每日饮食记录</div>
        <el-table :data="temp" border>
            <el-table-column label="日期" prop="date">
            </el-table-column>
            <el-table-column label="餐次" prop="meals">
            </el-table-column>
            <el-table-column label="总热量（千卡）" prop="calories">
            </el-table-column>
            <el-table-column label="蛋白质（克）" prop="protein">
            </el-table-column>
            <el-table-column label="碳水化合物（克）" prop="carbohydrates">
            </el-table-column>
            <el-table-column label="脂肪（克）" prop="fat">
            </el-table-column>
          </el-table>
      </div>
      <div class="top-right">
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
      </div>
    </div>
    <el-dialog :visible.sync="isVisible" title="本餐次的食物记录">
      <el-form :model="intake_record" ref="intake_record" label-width="100px" class="demo-dynamic">
        <el-form-item 
            label="日期" 
            prop="date" 
            :rules="{
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }">
          <div class="block">
            <el-date-picker v-model="intake_record.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item 
          label="餐次" 
          prop="meals"           
          :rules="{
            required: true,
            message: '请选择餐次'
          }">
          <el-select v-model="intake_record.meals">
            <el-option label="早餐" value="0"></el-option>
            <el-option label="午餐" value="1"></el-option>
            <el-option label="晚餐" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-for="(item, index) in intake_record.dishIds.items" :key="index" label="食物名称">
          <template>
            <el-autocomplete 
              v-model='intake_record.dishIds.items[index].name'
              :fetch-suggestions="querySearchAsync" 
              value-key="name" 
              placeholder="请选择食物名称"
              @select="handleSelect">
            </el-autocomplete>
            <el-input
              class="custom-input"
              v-model="intake_record.dishIds.items[index].intake_num" 
              placeholder="份数: 每份100g">
            </el-input>
            <el-button @click.prevent="removeDish(index)">删除</el-button>
            <el-button @click="addDish" type="primary" plain>新增食物</el-button>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('intake_record')">提交</el-button>
          <el-button @click="resetForm('intake_record')">重置</el-button>
          <el-button @click="$emit('close')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      intake_record: {
        meals: '',
        date: '',
        dishIds: { items: [{}] }
      },
      keyword: '', // 存储用户输入的关键词
      selectedResult: null, // 存储用户选择的结果
      food: '',
      timeout: null,
      temp: []
    }
  },
  computed: {
    storeTableData () {
      return this.$store.state.foodtrack.addMealsResults
    },

    allMeals () {
      return this.$store.state.foodtrack.allMeals
    },

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
  },
  created() {
    const storedTemp = sessionStorage.getItem('myTempData');
    if (storedTemp) {
      this.temp = JSON.parse(storedTemp);
    }
  },
  methods: {
    format (percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    },
    // querySearchAsync 函数根据查询字符串对餐点进行异步搜索，并使用回调函数处理搜索结果
    querySearchAsync (queryString, cb) {
      var allMeals = this.allMeals
      var results = queryString ? allMeals.filter(this.createStateFilter(queryString)) : allMeals.slice(0, 100)

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    // createStateFilter 函数用于创建过滤函数，该过滤函数根据查询字符串对食物对象进行过滤
    createStateFilte (queryString) {
      return (food) => {
        return (food.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      const index = this.intake_record.dishIds.items.findIndex((food) => food.name === item.name)
      if (index !== -1) {
        this.intake_record.dishIds.items[index].id = item.id
        this.intake_record.dishIds.items[index].name = item.name
      }
    },
    // 增加餐盘
    addDish () {
      this.intake_record.dishIds.items.push({
        id: '',
        name: '',
        intake_num: ''
      })
    },
    removeDish (index) {
      this.intake_record.dishIds.items.splice(index, 1)
    },
    resetForm (intake_record) {
      this.$refs[intake_record].resetFields();
      if(this.$refs[intake_record].dishIds){
        this.$refs[intake_record].dishIds.resetFields()
      }
    },
    submitForm (intake_record) {
      this.dialogVisible = false
      this.$refs[intake_record].validate((valid) => {
        if (valid) {
          this.$store.dispatch('addMeals', this.intake_record)
          this.$emit('close')
          this.temp.push(this.$store.state.foodtrack.addMealsResults);
          sessionStorage.setItem('myTempData', JSON.stringify(this.temp));
          this.$store.dispatch('getMain')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    this.$store.dispatch('getAllMeals')
    this.$store.dispatch('getMain')
  }
}
</script>

<style scoped>
  .custom-input {
    width: 130px;
  }

  .top {
    display: flex;
    padding: 20px;
  }
  .top-left {
    width: 50vw;
  }
  .top-right {
    margin-left: 30px;
    flex: 1;
  }

  .custom-span {
    font-size: 16px;
    font-weight: bold;
    /* 修改字体大小为 16px */
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
</style>
