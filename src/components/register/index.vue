<template>
  <div class="bg">
    <div class="logo">
      <img src="../../assets/images/TeamLogo.png" width="300px" height="200px">
    </div>
    <div id="register">
        <h2>注 册</h2>
        <el-form ref="form" :model="form" :rules="regRules" label-width="25%">
        <el-form-item label="用户名:" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密  码:" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="repassword">
            <el-input v-model="form.repassword" type="password" placeholder="请再次确认密码"></el-input>
        </el-form-item>
        </el-form>
        <el-row>
          <el-button type="primary" round @click="register('form')" class="btn">注册</el-button>
          <el-button type="primary" round class="btn" @click="returnLogin">返回登录</el-button>
        </el-row>
    </div>
  </div>
</template>

<script>
import myAxios from '@/utils/request'
export default {
  data () {
    var samePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        // 如果验证失败，则调用 回调函数时，指定一个 Error 对象。
        callback(new Error('两次输入的密码不一致!'))
      } else {
        // 如果验证成功，则直接调用 callback 回调函数即可。
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      isnull: false,
      regRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10位的大小写字母数字',
            trigger: 'blur'
          }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15位的非空字符',
            trigger: 'blur'
          }],
        repassword: [{ required: true, validator: samePwd, trigger: 'blur' }]
      }
    }
  },

  methods: {
    register (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        } else {
          myAxios({
            url: '/register',
            method: 'post',
            data: {
              name: this.form.username,
              password: this.form.password
            }
          }).then(res => {
          // console.log(res.data.message);
            if (res.data.status === 200) {
              this.$alert('是否返回登录页面', '注册成功', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/login')
                }
              })
            } else if (res.data.status === 202) {
              this.$alert('用户名已存在', '注册失败', {
                confirmButtonText: '确定',
                callback: action => {
                  this.form.username = ''
                  this.form.password = ''
                  this.form.repassword = ''
                }
              })
            } else {
              console.log(res.message)
            }
          }).catch(err => {
            console.log('操作失败' + err)
          })
        }
      })
    },
    returnLogin () {
      this.$router.push('/login')
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
    /* background: url('../assets/img/register_bg.jpg');
    background-size: 100% 100%; */
    background: url('../../assets/images/bg2.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat
}
 #register {
  width: 400px;
  height: 400px;
  right: 139px;
  top: 55%;
  margin-top: -320px;
  box-shadow: 0 2px 12px 0 rgba(255,255,255,.9);;
  background: #ffffff;
  opacity: 0.85;
  position: absolute;
  text-align: center;
  display: flex;
  flex-direction: column;/*横向*/
  padding: 30px;
  border-radius: 12px;
  justify-content: space-between;
  }
  #register h2 {
    padding-bottom: 30px;
  }
  .btn {
    width: 47%;
    margin: auto;
  }
  .logo {
    position: absolute;
    top: 80px;
    left: 30px;
  }
  .el-form-item{
    margin-bottom: 45px;
  }
</style>
