<template>
  <div class="one__wrapper">
    <div class="one__topper">
      <div class="one__topper-img"></div>
      <div class="one__topper-overlay"></div>
      <div class="one__topper-title">
        <h1>知识图谱展示</h1>
      </div>
    </div>
    <el-card class="box-card">
      <div class="myDiv">
        <el-row>
          <p style="color:red;margin-left:20px;">！！！第一次进入页面请先点击获取样图按钮后，再进行搜索</p>
        </el-row>
        <el-form label-width="10%" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="Cypher:">
                <el-select style="width: 300px" v-model="formInline.input" placeholder="选择搜索语句" filterable clearable>
                  <el-option v-for="(item,index) in option" :key="index" :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
                <!-- <el-input type="textarea" :rows="2" v-model="formInline.input" placeholder="请输入内容"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="btn">
                <el-button :disabled="isClicked" type="primary" icon="el-icon-search" @click="submit"
                  style="background-color: #00254FCC;" border-color: #00254FCC;>搜索</el-button>
                <el-button type="primary" icon="el-icon-check" @click="draw"
                  style="background-color: #00254FCC;border-color: #00254FCC;">获取样图</el-button>
                <!-- <el-button type="primary" icon="el-icon-check" @click="stabilize">stabilize</el-button> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div id="viz"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import config from '@/components/knowledge/display/neo4j.config.js'

export default {
  name: 'knowledge',
  data () {
    return {
      formInline: {
        input: ''
      },
      viz: {}, // 定义一个viz对象,
      // 是否点击该按钮
      isClicked: true,
      option: config.option
    }
  },
  mounted () {
    console.log(config.option)
  },
  methods: {
    submit () {
      let cypher = this.formInline.input
      if (cypher.length > 3) {
        this.viz.renderWithCypher(cypher)
      } else {
        this.viz.reload()
      }
    },
    stabilize () {
      this.viz.stabilize()
    },
    draw () {
      // this.viz = new NeoVis.default(config)
      this.viz.render()
      // 点击完搜索全图之后 才能开启搜索功能
      this.isClicked = false
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
          /* // font-family: "Effra",Arial,sans-serif;
          // font-style: italic; */
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

    .myDiv {
      width: 100%;
      height: 800px;
    }

    #viz {
      width: 100%;
      height: 80%;
      border: 1px solid #000;
      font: 22pt arial;
  }
}
</style>
