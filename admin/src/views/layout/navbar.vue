<template>
  <div class="layout-navbar">
    <div class="layout-navbar-logo">
      <h1>后台管理系统</h1>
      <!-- <img src="@/assets/images/icon/nav_logo.png" alt /> -->
    </div>

    <ul class="layout-navbar-menu">
      <router-link to="/activity" tag="li">
        <img src="@/assets/images/icon/nav_menu_activity.png" alt />
        <h2>活动管理</h2>
      </router-link>
      <router-link to="/user" tag="li">
        <img src="@/assets/images/icon/nav_menu_user.png" alt />
        <h2>用户管理</h2>
      </router-link>
      <router-link to="/config" tag="li">
        <img src="@/assets/images/icon/nav_menu_config.png" alt />
        <h2>网站配置</h2>
      </router-link>
    </ul>

    <ul class="layout-navbar-user">
      <li @click="service">
        <img src="@/assets/images/icon/nav_user_service.png" alt />
        <h2>在线客服</h2>
      </li>
      <li @click="logout">
        <img src="@/assets/images/icon/nav_user_exit.png" alt />
        <h2>退出</h2>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  methods: {
    service() {
      // window.open('https://t.me/webounty')
    },
    logout() {
      this.$confirm('是否确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/logout').then(() => {
          this.$router.push({ name: 'login' });
        })
      }).catch(() => {
        
      })
    }
  }
};
</script>

<style lang="less" scoped>
.layout-navbar {
  position: relative;
  width: 256px;
  height: 100%;
  padding-bottom: 160px;
  background-color: #001529;
  overflow-y: auto;
  .layout-navbar-logo {
    display: flex;
    align-items: center;
    height: 64px;
    padding: 0 25px;
    h1 {
      color: #fff;
      font-size: 24px;
    }
  }
  .layout-navbar-menu {
    li {
      display: flex;
      align-items: center;
      height: 46px;
      padding: 0 20px;
      font-size: 0;
      border-left: 10px solid #001529;
      cursor: pointer;
      &.router-link-active {
        border-left: 10px solid #135eca;
        background-color: #357ce1;
      }
      img {
        margin-right: 10px;
      }
      h2 {
        font-size: 14px;
        font-weight: 400;
        color: #f0f2f5;
      }
    }
  }
  .layout-navbar-user {
    width: 100%;
    position: absolute;
    bottom: 64px;
    padding: 0 30px;
    li {
      display: flex;
      align-items: center;
      height: 46px;
      font-size: 0;
      border-bottom: 1px solid #646464;
      cursor: pointer;
      &:last-child {
        border-bottom: none;
      }
      img {
        margin-right: 10px;
      }
      h2 {
        font-size: 14px;
        font-weight: 400;
        color: #f0f2f5;
      }
    }
  }
}
</style>
