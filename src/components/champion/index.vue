<template>
  <div>
    <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="冠军模型" name="first">
                <ChampionModel />
            </el-tab-pane>
        </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ChampionModel from './components/champion-model'
export default {
  components: {
    ChampionModel
  },
  data () {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin: 0 auto;
  width: 100%;
  padding: 10px;
  .main {
    margin-left: 100px;
  }
}
</style>
