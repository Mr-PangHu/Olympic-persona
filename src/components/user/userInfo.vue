<!-- // 源码（版权所有）：
<template>
  <div class="personalCenter">
    <el-container>
      <el-header>个人中心</el-header>
      <el-container>
        <el-aside width="400px">
          <el-col :span="12">
            <div class="sub-title"></div>
            <div class="demo-basic--circle">
              <div class="img">
                <el-avatar
                  :size="100"
                  :src="circleUrl"
                  align="center"
                ></el-avatar>
              </div>
              <div class="block">
                <span>ADMIN</span>
              </div>
            </div>
          </el-col>
          <el-input
            v-model="input1"
            type="text"
            placeholder="用户ID"
            maxlength="6"
            show-word-limit
          ></el-input>
          <el-input
            v-model="input2"
            type="text"
            placeholder="用户昵称"
            show-word-limit
          ></el-input>
          <el-input
            v-model="input3"
            type="text"
            placeholder="用户昵称"
            show-word-limit
          ></el-input>
          <el-input
            v-model="input4"
            placeholder="请输入密码"
            show-password
          ></el-input>
          <el-input
            v-model="input5"
            type="text"
            placeholder="用户姓名"
            show-word-limit
          ></el-input>
          <el-input
            v-model="input6"
            type="text"
            placeholder="用户权限"
            maxlength="2"
            show-word-limit
          ></el-input>
          <el-input v-model="input7" placeholder="邮箱">
            <template slot="append">@163.com</template>
          </el-input>
          <el-input
            v-model="input8"
            type="text"
            placeholder="手机号码"
            maxlength="20"
            show-word-limit
          ></el-input>
          <el-input
            v-model="input9"
            type="text"
            placeholder="固定电话"
            maxlength="20"
            show-word-limit
          ></el-input>
          <el-button-group style="float: right; padding: 3px 0" type="text">
            <el-button type="primary" size="medium" round>保存</el-button>
          </el-button-group>
        </el-aside>
        <el-container>
          <el-main>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="float: left"><b>账号绑定</b></span>
                <el-button-group
                  style="float: right; padding: 3px 0"
                  type="text"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="medium"
                    round
                  >
                    修改信息
                  </el-button>
                  <el-button
                    type="primary"
                    icon="el-icon-check"
                    size="medium"
                    round
                  >
                    确认修改
                  </el-button>
                </el-button-group>
              </div>
              <div v-for="o in 1" :key="o" class="text item">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column label="账号名" width="180">
                    <template slot-scope="scope">
                      <p>{{ scope.row.name1 }}</p>
                      <div slot="reference" class="name-wrapper"></div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                      >
                        编辑
                      </el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                      >
                        解绑
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="更多" align="center">
                    <el-row>
                      <el-button
                        type="info"
                        icon="el-icon-message"
                        circle
                      ></el-button>
                      <el-button
                        type="warning"
                        icon="el-icon-star-off"
                        circle
                      ></el-button>
                      <el-button
                        type="share"
                        icon="el-icon-share"
                        circle
                      ></el-button>
                    </el-row>
                  </el-table-column>
                </el-table>
              </div>
              <div v-for="o in 1" :key="o" class="text item">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column label="账号名" width="180">
                    <template slot-scope="scope">
                      <p>{{ scope.row.name2 }}</p>
                      <div slot="reference" class="name-wrapper"></div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                      >
                        编辑
                      </el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                      >
                        解绑
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="更多" align="center">
                    <el-row>
                      <el-button
                        type="info"
                        icon="el-icon-message"
                        circle
                      ></el-button>
                      <el-button
                        type="warning"
                        icon="el-icon-star-off"
                        circle
                      ></el-button>
                      <el-button
                        type="share"
                        icon="el-icon-share"
                        circle
                      ></el-button>
                    </el-row>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
            <el-card class="box-card">
              <div>
                <span style="float: left" shadow="hover"><b>个人说明</b></span>
                <br />
                <br />
                <span>螃蟹在剥我的壳</span>
                <el-divider></el-divider>
                <span>笔记本在写我</span>
                <el-divider></el-divider>
                <span>漫天的我落在枫叶的雪花上</span>
              </div>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'PersonalCenter',
  data() {
    return {
      text: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
      circleUrl:
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      sizeList: ['large'],
      tableData: [
        {
          date: '2016-05-03',
          name1: 'Wechat',
          name2: 'Github',
        },
      ],
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
  },
}
</script>
<style>
  .el-header {
    line-height: 60px;
    text-align: center;
    background-color: #b3c0d1;
  }
  .el-aside {
    line-height: 44px;
    text-align: center;
    background-color: #d3dce6;
  }
  .el-main {
    line-height: 36px;
    text-align: center;
    background-color: #e9eef3;
  }

  .demo-basic--circle {
    align: 'center';
    margin-top: 30px;
    margin-left: 150px;
  }
  .block {
    margin-left: 25px;
    font-weight: bold;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 1368px;
    border-radius: 30px;
  }
</style> -->
<template>
  <div class="user__wrapper">
    <div class="user__topper">
      <div class="user__topper-img"></div>
      <div class="user__topper-overlay"></div>
      <div class="user__topper-title">
        <h1>个人中心</h1>
      </div>
    </div>
    <div class="user__mid" >
      <div class="user__left-container">
        <el-card>
          <div slot="header" class="clearfix">
            <span>个人基本信息</span>
          </div>
          <el-form :label-position="labelPosition" label-width="80px" :model="userInfo">
            <el-form-item label="姓名:">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="角色:">
              <el-input v-model="userInfo.role"></el-input>
            </el-form-item>
            <el-form-item label="年龄:">
              <el-input v-model="userInfo.role"></el-input>
            </el-form-item>
            <el-form-item label="性别:">
              <el-input v-model="userInfo.role"></el-input>
            </el-form-item>
            <el-form-item label="组别:">
              <el-input v-model="userInfo.role"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
        <!-- <el-radio-group v-model="labelPosition" size="small">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group> -->
        <!-- <div style="margin: 20px;"></div> -->
      </div>
    </div>
    <div class="user__foot" >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>重置密码</span>
        </div>
        <!-- 表单 -->
        <el-form :model="pwdForm" :rules="pwdFormRules" ref="pwdFormRef" label-width="100px">
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updatePwdFn">修改密码</el-button>
            <el-button @click="resetFn">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import myAxios from '@/utils/request'
export default {
  data() {
    // 检测新旧密码是否相同
    const samePwd = (rule, value, callback) => {
      if (value === this.pwdForm.old_pwd) {
        return callback(new Error('新旧密码不能相同！'))
      }
      callback()
    }
    // 检测两次新密码是否一致
    const rePwd = (rule, value, callback) => {
      if (value !== this.pwdForm.new_pwd) {
        return callback(new Error('两次新密码不一致！'))
      }
      callback()
    }
    return {
      labelPosition: 'right',
      userInfo: [],
      // 表单的数据对象
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      // 表单的验证规则对象
      pwdFormRules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: samePwd, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请再次确认新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: rePwd, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      const userId = window.sessionStorage.getItem('id')
      console.log(userId)
      myAxios.get('/list/getByUserId', {
        params: {
          id: userId
        }
      }).then(res => {
        this.userInfo = res.data[0]
        console.log(this.userInfo)
      }).catch(err => {
        console.log('获取数据失败' + err)
      })
    },
    updatePwdFn () {
      this.$refs.pwdFormRef.validate((valid) => {
        if (!valid) {
          return false // 未通过校验拦住
        } else {
          console.log(window.sessionStorage.getItem('id'))
          console.log(this.pwdForm.new_pwd)
          myAxios({
            url: '/updatePwd',
            method: 'post',
            data: {
              id: window.sessionStorage.getItem('id'),
              password: this.pwdForm.new_pwd
            }
          }).then(res => {
            console.log(res.data)
            if (res.data.status === 200) {
              this.$alert('是否返回登录页面', '修改密码成功', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/login')
                }
              })
            } else if (res.data.status === 202) {
              this.$alert('用户名不存在', '修改密码失败', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$refs.pwdFormRef.resetFields()
                }
              })
            } else {
              console.log(res.message)
            }
          }).catch(err => {
            console.log('操作失败' + err)
          })

        // const { data: res } = await updatePwdAPI(this.pwdForm)
        // if (res.code !== 0) return this.$message.error('更新密码失败！')

        // this.$message.success('更新密码成功！')
        // this.$refs.pwdFormRef.resetFields()
        }
      })
    },
    // 重置按钮->点击事件
    resetFn () {
      this.$refs.pwdFormRef.resetFields()
    }
  }
};
</script>

<style lang='less' scoped>
.user{
  &__wrapper {
    width: 100%;
  }
  &__topper {
    height: 80px;
    width: 100%;
    position: fixed;
    z-index: 2;
    &-img {
      height: 100%;
      background-image: url('../../assets/images/666.jpg');
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
        font-size: 40px;
        color: white;
        line-height: 75px;
      }
    }
  }
  &__mid {
    margin-top: 0 auto;
    width: 100%;
    top: 85px;
    height: 400px;
    position: relative;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  &__foot {
    margin-top:100px;
    width: 100%;
    height: 400px;
    position: relative;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
/deep/ .el-form-item__label {
  color: black;
  font-size: 14px;
}
/deep/ .el-input__inner{
  color:black;
  font-size: 14px;
}
</style>
