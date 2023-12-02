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
              <el-descriptions-item label="姓名">{{ personInfo.name }}</el-descriptions-item>
              <el-descriptions-item label="出生日期">{{ formatDate(personInfo.birthday) }}</el-descriptions-item>
              <el-descriptions-item label="年龄">{{ getAge(personInfo.birthday) }}</el-descriptions-item>
              <el-descriptions-item label="性别">
                <el-tag size="small">{{ personInfo.gender }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="婚姻状况">{{ personInfo.marital_status }}</el-descriptions-item>
              <el-descriptions-item label="受教育程度">{{ personInfo.education_level }}</el-descriptions-item>
              <el-descriptions-item label="专业训练年限（练赛艇算起）">{{ personInfo.professional_training_years }}年</el-descriptions-item>
              <el-descriptions-item label="训练经历">{{ personInfo.training_experience }}</el-descriptions-item>
              <el-descriptions-item label="运动等级">{{ personInfo.sports_level }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" title="身体形态" :column="4" border :labelStyle="labelBodyShapeStyle" style="margin-top: 50px">
            <el-descriptions-item label="身高（cm）">
              {{ personInfo.height }}
            </el-descriptions-item>
            <el-descriptions-item label="体重（kg）">
              {{ personInfo.weight }}
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
import axios from 'axios'
import { formatDate } from '@/utils/formatDate'
import { getAge } from '@/utils/getAge'
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
      },
      personInfo: {}
    }
  },
  mounted () {
    this.getPersonInfo()
  },
  methods: {
    getPersonInfo () {
      axios.get('http://127.0.0.1/list/getPersonInfo', {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        const d = res.data[0]
        this.personInfo = d
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    formatDate (d) {
      return formatDate(d)
    },
    getAge (d) {
      return getAge(formatDate(d))
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
