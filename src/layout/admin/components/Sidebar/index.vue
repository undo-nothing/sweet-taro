<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        default-active="2"
        :collapse="isCollapse"
        background-color="rgb(48, 65, 86)"
        text-color="rgb(191, 203, 217)"
        :unique-opened="false"
        active-text-color="rgb(64, 158, 255)"
        class="el-menu-uncollapse"
        router
      >
        <el-menu-item index="/admin/dashboard">
          <svg-icon icon-class="dashboard" />
          <span slot="title">首页</span>
        </el-menu-item>

        <el-menu-item index="/admin/bingwapper">
          <svg-icon icon-class="image" />
          <span slot="title">壁纸</span>
        </el-menu-item>

        <el-submenu index="account">
          <template slot="title">
            <svg-icon icon-class="user" />
            <span slot="title">账户</span>
          </template>
          <el-menu-item index="/admin/account/group">用户组</el-menu-item>
          <el-menu-item index="/admin/account/user">用户</el-menu-item>
        </el-submenu>

        <el-menu-item index="/admin/icon">
          <svg-icon icon-class="icon" />
          <span slot="title">图标</span>
        </el-menu-item>

      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
  }
}
</script>
