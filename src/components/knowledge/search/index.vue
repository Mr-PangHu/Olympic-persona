<template>
  <div class="one__wrapper">
    <div class="one__topper">
      <div class="one__topper-img"></div>
      <div class="one__topper-overlay"></div>
      <div class="one__topper-title">
        <h1>食物成分检索</h1>
      </div>
    </div>
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row>
        <el-col :span="24">
          <div class="topContent">
              <!-- <h3 style="text-align:center;font-size:36px;color:#666;">营养成分查询平台</h3> -->
              <div class="content">
                <el-form :inline="true" :model="formInline" :rules="rules" ref="ruleForm" class="demo-form-inline">
                    <el-form-item label="第一大类" prop="firstClass">
                    <el-select
                      v-model="formInline.firstClass"
                      placeholder="选择第一大类"
                      filterable
                      clearable
                      @change="getSecondClass"
                      @clear="clearFirst"
                      @focus="focusFirst">
                      <el-option v-for="(item,index) in firstClass"
                        :key="index"
                        :label="item"
                        :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="第二大类" prop="secondClass">
                    <el-select v-model="formInline.secondClass"
                      @change="getFoodName"
                      @clear="clearSecond"
                      @focus="focusSecond"
                      filterable
                      clearable
                      placeholder="选择第二大类">
                      <el-option v-for="(item,index) in secondClass"
                        :key="index"
                        :label="item"
                        :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="食物名字" prop="foodId">
                    <el-select v-model="formInline.foodId"
                      filterable
                      clearable
                      placeholder="选择食物名字"
                      >
                      <el-option v-for="item in food"
                        :key="item.id"
                        :label="item.foodName"
                        :value="item.id"
                        ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="handleClick('ruleForm')">查询</el-button>
                  </el-form-item>
                </el-form>
              </div>
          </div>
        </el-col>
      </el-row>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'search',
  data () {
    return {
      formInline: {
        firstClass: '',
        secondClass: '',
        foodId: ''
      },
      rules: {
        firstClass: [
          { required: true, message: '请选择第一大类', trigger: 'change' }
        ],
        secondClass: [
          { required: true, message: '请选择第二大类', trigger: 'change' }
        ],
        foodId: [
          { required: true, message: '请选择食物名称', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    // 挂载访问接口
    // 我是搜索组件
    this.$store.dispatch('getFoodFirstClass')
  },
  computed: {
    ...mapGetters(['firstClass', 'secondClass', 'food', 'isShow'])
  },
  methods: {
    // 根据第一大类检索出对应的第二大类
    getSecondClass (firstclass) {
      // 根据第一大类获取第二大类
      this.$store.dispatch('getSecondClass', firstclass)
    },
    // 根据第一大类和第二大类获取食物的具体名字
    getFoodName (secondclass) {
      let query = {
        firstclass: this.formInline.firstClass,
        secondclass: secondclass
      }
      this.$store.dispatch('getFoodName', query)
    },
    // 输入三个关键词进行搜索
    async handleClick (ruleForm) {
      //  发送请求
      this.$refs[ruleForm].validate((valid) => {
        // 验证规则正常
        if (valid) {
          this.$router.push({ name: 'searchDetail', params: { foodId: this.formInline.foodId } })
        } else {
          return false
        }
      })
    },
    // 清空级联的二三select数据
    clearFirst () {
      this.$refs['ruleForm'].resetFields()
      // 有个问题 没有清空foodId 下的option 为什么清空了firstclass和secondclass
      this.food.splice(0, this.food.length)
    },
    clearSecond () {
      // 清空foodName
      this.formInline.foodId = ''
      this.food.splice(0, this.food.length)
    },
    focusFirst () {
      // 获取焦点的时候触发清空第二大类和食物名称
      this.formInline.secondClass = ''
      this.secondClass.splice(0, this.secondClass.length)
      // 有个问题 没有清空foodId 下的option 为什么清空了firstclass和secondclass
      // 这里没有清空options为什么
      this.formInline.foodId = ''
      this.food.splice(0, this.food.length)
    },
    focusSecond () {
      this.formInline.foodId = ''
      this.food.splice(0, this.food.length)
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
      background-image: url('../../../assets/images/555.jpg');
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
.box-card {
  margin: 0 auto;
  width: 95%;
  .topContent {
    background-color: rgb(255, 255, 255);
    height: 125px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .content {
      // width: 550px;
      .el-input {
        width: 75%;
        margin-right: 10px;
      }
    }
  }
  .cardContent {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 20px;
    justify-content: space-between;
    .el-card {
      padding: 0;
      width: 18%;
      height: 250px;
      margin-bottom: 20px;
      border: solid 1px #bfa;
      span{
        margin-left: 10px;
        font-size: 16px;
      }
      .detail {
        .text {
          display: inline-block;
          font-size: 14px;
          color: #000;
          width: 50%;
          float: left;
          text-decoration: none;
        }
        .item {
          margin-bottom: 18px;
        }
      }
    }
  }
}
</style>
