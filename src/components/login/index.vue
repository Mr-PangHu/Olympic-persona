<template>
  <div class="bg">
    <div id="login">
        <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin-bottom: 30px">
          <span style="color: #222; font-weight: 600; font-size: 24px">登 录</span>
        </div>
        <el-form ref="form" :model="form" label-width="20%">
        <!-- <el-form ref="form" :model="form" :rules="loginRules" label-width="20%"> -->
          <el-form-item label="用户名:" prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密  码:" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="角  色:" prop="roleValue" class="role">
            <el-radio-group v-model="form.roleValue">
              <el-radio :label="2">教练员</el-radio>
              <el-radio :label="3">运动员</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-button type="primary" round @click="login" class="btn1">登录</el-button>
        <el-button type="primary" round @click="register" class="btn2">去注册</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        roleValue: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10位的字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur' }
        ],
        roleValue: [
          { required: true, message: '请选择你的角色' }
        ]
      }
    }
  },

  methods: {
    // ...mapMutations(['changeLogin']),
    login () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        } else {
          axios.post('http://127.0.0.1/login', {
            params: {
              name: this.form.username,
              password: this.form.password,
              role: this.form.roleValue
            }
          }).then(res => {
            if (res.data.status === 200) {
              // console.log(res)
              // 保存到vuex中
              this.$store.commit('SET_TOKEN', res.data.token)
              this.$store.commit('SET_AUTH', res.data.data.auth)
              this.$store.commit('SET_ID', res.data.data.id)
              this.$router.push({
                path: '/home',
                query: {
                  name: this.form.username
                }
              })
            } else {
              this.$alert(res.data.message, '登录失败', {
                confirmButtonText: '确定',
                callback: action => {
                  this.form.username = ''
                  this.form.password = ''
                  this.form.roleValue = ''
                }
              })
            }
          }).catch(err => {
            console.log('登录失败' + err)
          })
        }
      })
    },
    register () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang='less' scoped>
.bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.el-form-item.role > .el-form-item__content {
  text-align: left;
}
 #login {
    height: 350px;
    width: 350px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
    background: #ffffff;
    opacity: 0.85;
    position: absolute;
    top: 20%;
    left: 40%;
    // text-align: center;
    display: flex;
    flex-direction: column;/*横向*/
    padding: 30px;
    border-radius: 16px;
  }

  .btn1 {
    margin: auto;
    width: 336px;
    height: 48px;
    /* line-height: 48px; */
    background: #4e6ef2;
    border-radius: 10px;
    box-shadow: 0 6px 16px 0 rgb(78 111 242 / 30%);
    font-size: 17px;
    font-weight: 800;
    border: 0;
    color: #fff;
    cursor: pointer;
    background-color: #4e6ef2;
  }
  .btn2 {
    margin: 10px auto;
    width: 336px;
    height: 48px;
    /* line-height: 48px; */
    background: #4e6ef2;
    border-radius: 10px;
    box-shadow: 0 6px 16px 0 rgb(78 111 242 / 30%);
    font-size: 17px;
    font-weight: 800;
    border: 0;
    color: #fff;
    cursor: pointer;
    background-color: #4e6ef2;
  }
  .reg {
    color: red;
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor:pointer;
  }
</style>
