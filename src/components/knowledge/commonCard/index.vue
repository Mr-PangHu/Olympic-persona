<template>
  <div class="content">
    <img src="../search/images/kuangwuzhi.jpg"/>
    <el-card class="box-card" :body-style="elcardbody">
      <div slot="header" class="clearfix">
        <h1>{{name}}</h1>
      </div>
      <template v-if="Object.keys(list).length > max && !isOpenCountry">
        <p v-for="(value, index) in Object.entries(list).slice(0, max)" :key="index">
          <span :style="cardspanleft">{{ index + 1 }}</span>
          <span :style="cardspanleft">{{ value[0] }}</span>
          <span :style="cardspanright">{{ value[1] }}</span>
        </p>
      </template>
      <template v-else>
        <p v-for="(value, index) in Object.entries(list)" :key="index">
          <span :style="cardspanleft">{{ index + 1 }}</span>
          <span :style="cardspanleft">{{ value[0] }}</span>
          <span :style="cardspanright">{{ value[1] }}</span>
        </p>
      </template>
      <p :style="arrow" v-if="Object.keys(list).length  > max">
        <i
          v-show="!isOpenCountry"
          @click="isOpenCountry = true"
          class="el-icon-arrow-down"
        ></i>
        <i
          v-show="isOpenCountry"
          @click="isOpenCountry = false"
          class="el-icon-arrow-up"
        ></i>
      </p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'commonCard',
  props: ['list', 'name'],
  data () {
    return {
      isOpenCountry: false, // 控制展开状态
      max: 5, // 折叠显示的最大数量
      elcardbody: {
        padding: '20px'
      },
      cardspanleft: {
        display: 'inline-block',
        width: '100px'
      },
      cardspanright: {
        marginLeft: '20px'
      },
      arrow: {
        textAlign: 'center',
        borderTop: '1px solid #EBEEF5'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 15px;
  .box-card {
    width:60%;
  }
  img{
    width: 28%;
    height: 320px;
  }
}
</style>
