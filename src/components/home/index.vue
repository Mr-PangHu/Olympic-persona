<template>
  <div>
    <header>
      <nav>
        <el-menu
          unique-opened
          router
          mode="horizontal"
          text-color="#fff"
          background-color="#00000033"
        >
            <el-menu-item index="/home">首页</el-menu-item>
            <el-submenu index="1">
              <template slot="title">运动员信息</template>
              <el-menu-item index="/label">基础信息</el-menu-item>
            </el-submenu>
            <el-submenu index="2" v-if="showPersona">
              <template slot="title">运动员画像</template>
              <el-menu-item :index="personaPath">个人画像</el-menu-item>
            </el-submenu>
            <el-menu-item :index="championPath" v-if="showChampion">画像模型</el-menu-item>
            <el-menu-item index="/worldhighlevel">世界高水平</el-menu-item>
            <el-submenu index="4">
              <template slot="title">决策辅助</template>
              <el-menu-item index="/tiredpredict">疲劳预测（demo）</el-menu-item>
              <el-menu-item index="/tiredpredict2">疲劳预测</el-menu-item>
              <el-menu-item index="/markpredict">成绩预测</el-menu-item>
            </el-submenu>
            <!-- <el-menu-item index="/markpredict">成绩预测</el-menu-item> -->
            <!-- <el-menu-item index="/knowledge">知识图谱模块</el-menu-item> -->
            <el-submenu index="5">
              <template slot="title">
                知识图谱
              </template>
              <el-menu-item
                v-for="item in menuData " :key="item.name"
                :index="item.path">
                <span slot="title">{{ item.label }}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="/info">个人中心</el-menu-item>
            <!-- <el-submenu index="3">
              <template slot="title">个人中心</template>
              <el-menu-item index="/info">基本资料</el-menu-item>
              <el-menu-item index="/updatepwd">重置密码</el-menu-item>
            </el-submenu> -->
            <el-menu-item @click="logoutFn">切换账号</el-menu-item>
        </el-menu>
      </nav>
    </header>
    <div class="carousel__container" v-if="isHomePage">
      <el-carousel height="100vh" interval=5000>
        <el-carousel-item v-for="(item, index) in carouselItems" :key="index">
          <img :src="require(`@/assets/images/${item.src}`)" alt="Slide" />
          <div class="item__info">
            <div class="item__info-title">{{item.title}}</div>
            <div class="item__info-content">{{item.content}}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div v-else class="router__container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import myAxios from '@/utils/request'
export default {
  data () {
    return {
      showPersona: true,
      showChampion: true,
      personaPath: '',
      championPath: '',
      carouselItems: [
        {
          src: '111.jpg',
          title: 'Entries open for 2024 World Rowing Indoor Championships, presented by Concept 2',
          content: 'Following the tremendous success of the 2023 edition, World Rowing, the governing body of the sport of Rowing, announced...'
        },
        {
          src: '222.png',
          title: 'Husein Alireza and Valent Sinkovic proposed for IOC Athletes’ Commission',
          content: 'Husein Alireza of Saudi Arabia and Valent Sinkovic of Croatia will be aiming for election to the IOC Athletes’...'
        },
        {
          src: '333.jpg',
          title: ' Where are they now: Kathrin Boron',
          content: 'She sits in fourth place on the all-time Olympic gold medal count for women with four Olympic golds and...'
        }
      ],
      menuData: [
        {
          path: '/display',
          name: 'display',
          label: '知识图谱展示',
          icon: 'data-line'
        },
        {
          path: '/search',
          name: 'search',
          label: '食物成分查询',
          icon: 'search'
        },
        {
          path: '/foodtrack',
          name: 'foodtrack',
          label: '日常营养',
          icon: 's-home'
        },
      ]
    }
  },
  computed: {
    isHomePage () {
      return this.$route.path === '/home'
    }
  },
  mounted () {
    this.getShowPersona()
    this.getPersonaPath()
  },
  methods: {
    getShowPersona () {
      const auth = window.sessionStorage.getItem('auth')
      if (auth === '2') {
        this.showPersona = false
        this.showChampion = false
      }
    },
    getPersonaPath () {
      if (!this.showPersona) return
      const athleteId = window.sessionStorage.getItem('id')
      myAxios.get('/list/getId', {
        params: {
          athleteId
        }
      }).then(res => {
        const id = res.data[0].id
        this.personaPath = '/player-one/' + id
        this.championPath = '/champion/' + id
      }).catch(err => {
        console.log(err)
      })
    },
    getCurrentDateTimeForDatabase() {
      var date = new Date();
      var year = date.getFullYear();
      var month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth()是0-based
      var day = date.getDate().toString().padStart(2, '0');
      var hours = date.getHours().toString().padStart(2, '0');
      var minutes = date.getMinutes().toString().padStart(2, '0');
      var seconds = date.getSeconds().toString().padStart(2, '0');

      // 格式化为 YYYY-MM-DD HH:MM:SS
      var dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return dateTimeString;
    },
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
          const name = window.sessionStorage.getItem('name')
          console.log(name)
          console.log("---------------")
          myAxios.post('/updateLoginoutTime', {
            params: {
              name
            }
          }).then(res => {
            this.$store.commit('LOGOUT')
            // 2. 跳转到登录页面
            this.$router.push('/login')
          }).catch(err => {
            console.log("*************")
            console.log(err)
          })
          // this.$store.commit('LOGOUT')
          // // 2. 跳转到登录页面
          // this.$router.push('/login')
        })
        .catch((err) => err)
    }
  }
}
</script>

<style lang="less" scoped>
/* 添加样式以美化你的页面 */
body, html {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

header {
  width: 100%;
  background-color: rgba(51, 51, 51, 0.3);
  padding: 10px;
  color: white;
  text-align: right;
  position: fixed;
  z-index: 5;
}

nav {
  display: flex;
  justify-content: flex-end;
  position: relative;
  padding-right: 30px;
}
.carousel__container {
  position: relative;
  overflow: hidden;
}
.carousel__container img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/deep/ .el-carousel__item::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  height: 100%;
  background: linear-gradient(270deg,transparent,#001d3e 90%);
  z-index: 3;
}

.item {
  &__info {
    position: absolute;
    z-index: 5;
    width: 50%;
    height: 20%;
    left: 10%;
    top: 40%;
    color: white;
    &-title {
      font-family: "Effra",Arial,sans-serif;
      font-weight: 900;
      font-style: italic;
      font-size: 35px;
      line-height: 40px;
      margin-bottom: 20px;
    }
    &-content {
      font-family: "Effra","Helvetica Neue",Arial,sans-serif;
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
    }
  }
}

/deep/ .el-menu {
  background: rgba(51, 51, 51, 0) !important;
  border-bottom: 0px;
}

.el-menu-item,
/deep/ .el-submenu__title {
  background-color: rgba(51, 51, 51, 0) !important;
  font-weight: 700 !important;
  font-size: 20px;
}
.el-menu-item:hover,
/deep/ .el-submenu__title:hover {
  background-color: rgba(144, 144, 144, 0.5) !important;
  border-radius: 8px;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
/deep/ .el-submenu__title:focus {
  color: white;
}
.el-menu--horizontal>.el-menu-item.is-active,
.el-menu--horizontal .el-menu .el-menu-item.is-active,
/deep/ .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
  color: white;
  border: 0px;
}
.router__container {
  width: 100%;
}
</style>
