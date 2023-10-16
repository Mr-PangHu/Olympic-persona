<template>
  <div>
    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">
        <span>个体画像</span>
      </div>
      <div class="main">
        <img src="../../assets/images/图片1.png" alt="">
      </div> -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个人信息" name="first">
          <el-descriptions title="运动员基本资料" :labelStyle="labelStyle">
              <el-descriptions-item label="姓名">王ZB</el-descriptions-item>
              <el-descriptions-item label="出生日期">1998.10.22</el-descriptions-item>
              <el-descriptions-item label="年龄">25</el-descriptions-item>
              <el-descriptions-item label="性别">
                <el-tag size="small">男</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="婚姻状况">未婚</el-descriptions-item>
              <el-descriptions-item label="受教育程度">硕士研究生</el-descriptions-item>
              <el-descriptions-item label="专业训练年限（练赛艇算起）">10年</el-descriptions-item>
              <el-descriptions-item label="训练经历">2013.09-2015.09 上海赛艇 | 2016.09-至今 中国赛艇</el-descriptions-item>
              <el-descriptions-item label="运动等级">男子公开级</el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" title="身体形态" :column="4" border :labelStyle="labelBodyShapeStyle" style="margin-top: 50px">
            <el-descriptions-item label="身高（cm）">
              198
            </el-descriptions-item>
            <el-descriptions-item label="体重（kg）">
              78
            </el-descriptions-item>
            <el-descriptions-item label="指距（cm）">
              xx
            </el-descriptions-item>
            <el-descriptions-item label="上肢长（cm）">
              xx
            </el-descriptions-item>
            <el-descriptions-item label="肩宽（cm）">
              xx
            </el-descriptions-item>
            <el-descriptions-item label="髋宽（cm）">
              xx
            </el-descriptions-item>
            <el-descriptions-item label="胸围（cm）">
              xx
            </el-descriptions-item>
            <el-descriptions-item label="腰围（cm）">
              xx
            </el-descriptions-item>
            <el-descriptions-item label="大腿围（cm）">
              xx
            </el-descriptions-item>
            <el-descriptions-item label="小腿围（cm）">
              xx
            </el-descriptions-item>
            <el-descriptions-item label="下肢长B（cm）">
              xx
            </el-descriptions-item>
            <el-descriptions-item label="小腿长A（cm）">
              xx
            </el-descriptions-item>
            <el-descriptions-item label="跟腱长（cm）">
              xx
            </el-descriptions-item>
            <el-descriptions-item label="踝围（cm）">
              xx
            </el-descriptions-item>
            <el-descriptions-item label="下蹲伸臂距（cm）">
              xx
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="专项训练" name="second">
          <ZhuanXiang />
        </el-tab-pane>
        <el-tab-pane label="机能监控" name="third">
          <JiNeng />
        </el-tab-pane>
        <el-tab-pane label="体能" name="fourth">
          <TiNeng />
        </el-tab-pane>
        <el-tab-pane label="伤病" name="fifth">
          <ShangBing />
        </el-tab-pane>
        <el-tab-pane label="竞技表现" name="sixth">
          <JingJi />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ShangBing from './components/shangbing'
import JiNeng from './components/jineng'
import TiNeng from './components/tineng'
import ZhuanXiang from './components/zhuanxiang'
import JingJi from './components/jingji'
export default {
  components: {
    ShangBing,
    JiNeng,
    TiNeng,
    ZhuanXiang,
    JingJi
  },
  data () {
    return {
      activeName: 'first',
      labelStyle: {
        'font-weight': '700'
      },
      labelBodyShapeStyle: {
        'width': '150px',
        'font-weight': '700'
      }
    }
  },
  mounted () {
  },
  methods: {
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
