<template>
  <div>
    <el-dialog :visible.sync="$store.state.foodtrack.dialogVisible" title="本餐次的食物记录">
      <el-form
        :model="intake_record"
        ref="formName"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="日期"
              prop="date"
              :rules="{
                required: true,
                message: '请选择日期',
                trigger: 'change'
              }"
            >
              <div class="block">
                <el-date-picker
                  v-model="intake_record.date"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="餐次" prop="meals">
              <el-select
                v-model="intake_record.meals"
                placeholder="请选择餐次："
              >
                <el-option label="早餐" value="0"></el-option>
                <el-option label="午餐" value="1"></el-option>
                <el-option label="晚餐" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-for="(item, index) in intake_record.dishIds.items" :key="index">
          <el-form
          :inline="true"
          :model="intake_record.dishIds.items[index]"
          :rules="rules"
          ref="dishIds"
          label-width="100px"
          class="demo-form-inline"
          size="small"
          >
          <el-row>
          <el-col :span="8">
            <el-form-item label="食物名称" props="name">
              <el-autocomplete
                v-model='intake_record.dishIds.items[index].name'
                :fetch-suggestions="querySearchAsync"
                value-key="name"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="份数" prop="intake_num">
              <el-input
                v-model="intake_record.dishIds.items[index].intake_num"
                placeholder="每份100g"
                class="custom-input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button @click.prevent="removeDish(dish)">删除</el-button>
          </el-col>
        </el-row>
          </el-form>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formName')"
            >提交</el-button>
          <el-button @click="addDish">新增食物</el-button>
          <el-button @click="resetForm('intake_record')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  data () {
    return {
      intake_record: {
        meals: '',
        date: '',
        dishIds: { items: [{}] }
        // food: ''
      },
      keyword: '', // 存储用户输入的关键词
      selectedResult: null, // 存储用户选择的结果
      food: '',
      timeout: null
    }
  },
  computed: {
    allMeals () {
      return this.$store.state.foodtrack.allMeals
    }
    // dialogVisible () {
    //   return this.$store.state.foodtrack.dialogVisible
    // }
  },
  methods: {
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
      // this.intake_record.dishes[0].id = item.id
      // this.intake_record.dishes[0].name = item.name
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
    resetForm (formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.$refs.dishIds.forEach((ref) => {
          ref.resetFields()
        })
      })
    },
    submitForm (formName) {
      console.log('intake_record', this.intake_record)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('addMeals', this.intake_record)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    this.$store.dispatch('getAllMeals')
  }
}
</script>

<style scoped>
  .custom-input {
    width: 200px;
  }
</style>
