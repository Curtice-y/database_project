<template>
  <el-container>
    <!-- 头部区 -->
    <el-header>
      <span>E-commerce Website for SCUT</span>
      <el-button type="info" @click="exit">退出登录</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区 -->
        <el-menu default-active="userinfo" background-color="#333744" text-color="#fff" active-text-color="#409EFF" :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>个人信息</span>
            </template>
            <el-menu-item index="userinfo">个人信息修改</el-menu-item>
            <el-menu-item index="purchasehis">购买记录</el-menu-item>
            <el-menu-item index="putaway">上架商品</el-menu-item>
          </el-submenu>
          <el-menu-item index="shop">
            <i class="el-icon-menu"></i>
            <span slot="title">商店</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧主体区 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    exit () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
// 全局
.el-container {
  height: 100%;
  width: 100%;
}
// 头部
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
  }
}
// 左侧边栏
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
// 右侧主体区
.el-main {
  background-color: #eaedf1;
}
</style>
