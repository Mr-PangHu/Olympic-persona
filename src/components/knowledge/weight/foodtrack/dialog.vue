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
            <el-form-item label="餐次">
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
        <el-row>
          <el-col :span="8">
            <el-form-item label="食物名称">
              <el-autocomplete
                v-model="food"
                :fetch-suggestions="querySearchAsync"
                value-key="name"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数量">
              <el-input
                v-model="intake_record.dishes[0].intake_num"
                placeholder="每份100g"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button @click.prevent="removeDish(dish)">删除</el-button>
          </el-col>
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
        dishes: [{
          id: '',
          name: '',
          intake_num: ''
        }],
        meals: '',
        date: ''
      },
      // value: '',
      // input: '',
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
    querySearchAsync (queryString, cb) {
      var allMeals = this.allMeals
      var results = queryString ? allMeals.filter(this.createStateFilter(queryString)) : allMeals.slice(0, 100)

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilte (queryString) {
      return (food) => {
        return (food.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      console.log(item)
      this.intake_record.dishes[0].id = item.id
      this.intake_record.dishes[0].name = item.name
    },
    // 增加餐盘
    addDish () {
      this.intake_record.dishes.push({
        value: '',
        key: Date.now()
      })
    },
    removeDish (item) {
      var index = this.intake_record.dishes.indexOf(item)
      if (index !== -1) {
        this.intake_record.dishes.splice(index, 1)
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      console.log('gyfyf', this.intake_record)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // this.getMeals(); //调用创建餐次记录的api方法
          this.$store.dispatch('addMeals', this.intake_record)
        //   this.total_data.push(this.tableData[0])
        //   this.dialogVisible = false // 隐藏表单
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
