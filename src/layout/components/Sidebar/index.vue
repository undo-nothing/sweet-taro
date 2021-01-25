<template>
  <div>
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
      <el-menu-item index="/dashboard">
        <svg-icon icon-class="dashboard" />
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="adultvideo">
        <template slot="title">
          <svg-icon icon-class="peoples" />
          <span slot="title">组织</span>
        </template>
        <el-menu-item index="/adultvideo/star">女优</el-menu-item>
        <el-menu-item index="/adultvideo/genre">分类</el-menu-item>
        <el-menu-item index="/adultvideo/video">影片</el-menu-item>
      </el-submenu>

      <el-menu-item index="/icon/index">
        <svg-icon icon-class="icon" />
        <span slot="title">图标</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>

export default {
  props: {
    isCollapse: Boolean
  },
  created() {
    console.log('Hello', this.isCollapse)
  }
}
</script>

<style>
.el-menu-uncollapse:not(.el-menu--collapse) {
  width: 230px;
}
</style>>
