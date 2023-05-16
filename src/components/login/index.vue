<template>
  <div class="bg">
    <div id="login">
        <h2>登 录</h2>
        <el-form ref="form" :model="form" :rules="loginRules" label-width="20%">
        <el-form-item label="用户名:" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密  码:" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
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
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
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
              password: this.form.password
            }
          }).then(res => {
            if (res.data.status === 200) {
              console.log(res)
              // 保存到vuex中
              this.$store.commit('SET_TOKEN', res.data.token)
              this.$store.commit('GET_USER', res.data.body.params.name)
              this.$router.push({
                path: '/home',
                query: {
                  name: this.form.username
                }
              })
            } else {
              this.$alert('用户名或密码错误', '登录失败', {
                confirmButtonText: '确定',
                callback: action => {
                  this.form.username = ''
                  this.form.password = ''
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

<style scoped>
.bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* background: url('../assets/img/login_bg.jpg'); */
    /* background-size: 100% 100%; */
}
 #login {
    height: 300px;
    width: 350px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
    background: #ffffff;
    opacity: 0.85;
    position: absolute;
    top: 20%;
    left: 40%;
    text-align: center;
    display: flex;
    flex-direction: column;/*横向*/
    padding: 30px;
  }
  #login h2 {
    padding-bottom: 30px;
  }
  .btn1 {
    width: 60%;
    margin: auto;
  }
  .btn2 {
    width: 60%;
    margin: 10px auto;
  }
  .reg {
    color: red;
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor:pointer;
  }
</style>
