<template>
    <div class="myDiv">
        <el-row>
            <p style="color:red;margin-left:20px;">！！！第一次进入页面请先点击获取样图按钮后，再进行搜索</p>
        </el-row>
        <el-form label-width="10%" :model="formInline" class="demo-form-inline">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Cypher:">
                        <el-select
                            style="width: 300px"
                            v-model="formInline.input"
                            placeholder="选择搜索语句"
                            filterable
                            clearable>
                            <el-option v-for="(item,index) in option"
                                :key="index"
                                :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                        <!-- <el-input type="textarea" :rows="2" v-model="formInline.input" placeholder="请输入内容"></el-input> -->
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item class="btn">
                        <el-button :disabled="isClicked" type="primary" icon="el-icon-search" @click="submit">搜索</el-button>
                        <el-button type="primary" icon="el-icon-check" @click="draw">获取样图</el-button>

                        <!-- <el-button type="primary" icon="el-icon-check" @click="stabilize">stabilize</el-button> -->
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div id="viz"></div>
    </div>
</template>

<script>
// import config from './neo4j.config.js'
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
      option: [
        {
          value: 'MATCH (n:Food) RETURN n LIMIT 25',
          label: '检索前25个食物节点'
        },
        {
          value: 'MATCH p=()-[r:`亮氨酸`]->() RETURN p LIMIT 25',
          label: '检索含有亮氨酸的前25个关系节点'
        },
        {
          value: 'MATCH p=()-[r:HasEffect]->() RETURN p LIMIT 25',
          label: '小麦胚粉影响的前25个疾病'
        },
        {
          value: 'MATCH p=()-[r:need_check]->() RETURN p LIMIT 25',
          label: '需要做哪些检查'
        }
      ]
    }
  },
  mounted () {
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
      // this.viz.render()
      // // 点击完搜索全图之后 才能开启搜索功能
      // this.isClicked = false
    }
  }
}
</script>
<style lang="less" scoped>
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

</style>
