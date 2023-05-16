<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <!-- <img src="../assets/images/logo.png" alt="" style="width:12%" /> -->
      <span class='name'>运动员画像系统</span>
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <!-- <img src="../assets/logo.png" alt="" class="avatar" /> -->
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="1-2"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="1-3"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="2" @click="logoutFn"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <div class="user-box">
          <!-- <img src="../../assets/images/head.png" alt="" v-else /> -->
          <span>欢迎</span>
        </div>
        <!-- 左侧导航菜单 -->
        <el-menu
          :default-active="1"
          class="el-menu-vertical-demo"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
        >
          <template>
            <!-- 不包含子菜单的“一级菜单” -->
            <el-menu-item index="/home">
              <i class="el-icon-s-home"></i>首页
            </el-menu-item>

            <!-- 包含子菜单的“一级菜单” -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-price-tag"></i>标签体系
              </template>
              <!-- 循环渲染“二级菜单” -->
              <el-menu-item index="/label">
                <i></i>一级标签
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-data-analysis"></i>运动员分群
              </template>
              <!-- 循环渲染“二级菜单” -->
              <el-menu-item index="/player-one">
                <i></i>个人画像
              </el-menu-item>
              <el-menu-item index="/player-groups">
                <i></i>群体画像
              </el-menu-item>
            </el-submenu>
            <el-menu-item>
              <i class="el-icon-s-platform"></i>智能推荐
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-custom"></i>个人中心
              </template>
              <!-- 循环渲染“二级菜单” -->
              <el-menu-item>
                <i class="el-icon-s-operation"></i>基本资料
              </el-menu-item>
              <el-menu-item index="/updatepwd">
                <i class="el-icon-key"></i>重置密码
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <!-- 二级路由挂载点 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>华东理工大学·信息科学与工程学院</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  name: 'my-homepage',
  methods: {
    logoutFn () {
      // 询问用户是否退出登录
      this.$confirm('您确认退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // TODO：执行退出登录的操作
          // 1. 清空 token
          this.$store.commit('LOGOUT')
          // 2. 跳转到登录页面
          this.$router.push('/login')
        })
        .catch((err) => err)
    }
  }
}
</script>

<style lang='less' scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
    .name {
    padding-left: 15px;
    color: white;
    font-size: 24px;
    font-weight: 900;
    line-height: 60px;
  }
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  background-color: #23262e;
  user-select: none;
//   img {
//     width: 35px;
//     height: 35px;
//     border-radius: 50%;
//     background-color: #fff;
//     margin-right: 15px;
//     object-fit: cover;
//   }
  span {
    color: white;
    font-size: 12px;
  }
}
.container-fluid {
    padding: 10px;
}
// 侧边栏菜单的样式
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}
</style>
