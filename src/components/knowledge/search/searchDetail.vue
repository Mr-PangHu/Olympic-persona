<template>
  <div>
      <el-row class="top">
        <el-col :span="8">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <i class="el-icon-menu"></i>
                <span >{{detail.firstClass}}</span>
              </div>
              <div class="detail" >
                <div class="list" v-for="(item,index) in secondClass" :key="index">
                  <span class="item">{{item}}</span>
                </div>
              </div>
            </el-card>
        </el-col>
        <el-col :span="16">
          <div class="topContent">
            <img src="@/assets/images/imgNone.png"/>
            <div>
              <div class="r-content">
                <div class="r-content-top">
                  <h1>{{detail.foodName}}</h1>
                  <span>食物类:{{detail.firstClass}}</span>
                  <span>亚类:{{detail.secondClass}}</span>
                </div>
                <div class="statement">
                    <p>
                      <i>声明:</i>
                      本网站食物营养成分数据来源于中国疾病预防控制中心营养与健康所建立的中国食物成分表，
                      未经中国疾病预防控制中心营养与健康所允许，任何单位和个人不得用于商业目的。
                    </p>
                </div>
              </div>
            </div>
        </div>
        </el-col>
      </el-row>
      <!-- 五个card -->
      <div id="content">
        <common-card :list="jibenyingyang" :name="'基本营养'"/>
        <common-card :list="kuangwuzhi" :name="'矿物质'"/>
        <common-card :list="zhilei" :name="'脂类'"/>
        <common-card :list="weishengsu" :name="'维生素'"/>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import commonCard from '../commonCard'
export default {
  name: 'searchDetail',
  components: {
    commonCard
  },
  data () {
    return {
      detailData: [],
      isOpen: false,
      max: 5
    }
  },
  mounted () {
    // 挂载的时候 根据路由传参 获取对应的详细信息
    this.getData()
  },
  computed: {
    ...mapGetters(['detail', 'secondClass']),
    jibenyingyang () {
      return JSON.parse(this.detail.jibenyingyang)
    },
    kuangwuzhi () {
      return JSON.parse(this.detail.kuangwuzhi)
    },
    zhilei () {
      return JSON.parse(this.detail.zhilei)
    },
    weishengsu () {
      return JSON.parse(this.detail.weishengsu)
    },
    gongxiao () {
      return JSON.parse(this.detail.gongxiao)
    },
    displayedItems () {
      if (this.isCollapsed) {
        return this.items.slice(0, 5) // 只显示前五条数据
      } else {
        return this.items // 显示所有数据
      }
    }
  },
  methods: {
    getData () {
      this.$store.dispatch('getFoodDetail', this.$route.params.foodId)
    },
    toggleCollapse () {
      this.isCollapsed = !this.isCollapsed
    }
  },
  // 为了发送新的请求 监听路由的变化
  watch: {
    // 监听路由信息 是否发生变化，如果发生变化，再次发起请求
    $route () {
      // 再次发送请求之前需要再次整理参数
      Object.assign(this.$route.query, this.$route.params)
      // 发送请求
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.top{
    margin-top: 20px;
    .el-card {
      height: 250px;
      .detail {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        span {
          font-size: 15px;
          margin: 20px 0;
          display: inline-block;
        }
      }
    }
    .topContent {
      display: flex;
      flex-direction: row;
      margin-left: 10px;
      img {
        width: 250px;
        height: 250px;
      }
      .r-content {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .r-content-top {
          display: flex;
          flex-direction: column;
        }
        .statement {
          width: 100%;
          border: 1px solid #98d281;
          background-color: #f5fceb;
          i {
            font-style: normal;
            color: #ef6519;
          }
          p {
            padding: 0 10px 10px 10px;
          }
        }
        span {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
