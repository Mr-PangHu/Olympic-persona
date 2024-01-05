<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>群体画像</span>
      </div>
      <div class="main">
        <img src="../../assets/images/图片2.png" alt="">
      </div>
    </el-card>
  </div>
</template>
<script>
import myAxios from '@/utils/request'
export default {
  data () {
    return {
      ids: []
    }
  },
  created () {
    this.ids = this.$route.params.ids
    console.log(this.ids)
  },
  mounted () {
    this.getTestDataByIds()
  },
  methods: {
    getTestDataByIds () {
      const ids = this.ids
      myAxios.get('/compare/getTestDataById', {
        params: {
          ids
        }
      }).then(res => {
        const tmp = res.data
        console.log(tmp)
      })
    }
  }
}
</script>

<style lang='less' scoped>

.box-card {
  margin: 0 auto;
  width: 100%;
  .main img{
    width: 100%;
  }
}
</style>
