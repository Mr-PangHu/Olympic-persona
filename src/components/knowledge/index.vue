<template>
  <div class="one__wrapper">
    <div class="one__topper">
      <div class="one__topper-img"></div>
      <div class="one__topper-overlay"></div>
      <div class="one__topper-title">
        <h1>知识图谱模块</h1>
      </div>
    </div>
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="食物成分检索" name="first">
          <Search />
        </el-tab-pane>
        <el-tab-pane label="知识图谱检索" name="second">
          <Display />
        </el-tab-pane>
        <!-- <el-tab-pane label="营养监控" name="third">
          <Big-model />
        </el-tab-pane> -->
        <el-tab-pane label="营养监控" name="third">
          <Weight />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import Search from './components/search'
  import Display from './components/display'
  import Weight from './components/weight'
  export default {
    components: {
      Search,
      Display,
      Weight
    },
    data () {
      return {
        activeName: 'qv'
      }
    },
    mounted () {
    },
    methods: {
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
        background-image: url('../../assets/images/555.jpg');
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
        bottom: 5px;
        left: 0;
        right: 0;

        h1 {
          width: 80%;
          margin: 0 auto;
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
  }
</style>