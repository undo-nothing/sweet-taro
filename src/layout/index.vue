<template>
  <el-container>
    <el-aside width="elAsideWidth">
      <sidebar :is-collapse="isCollapse" class="sidebar-container" />
    </el-aside>

    <el-container>
      <el-header style="background-color: #B3C0D1;">
        <div class="navbar">
          <hamburger id="hamburger-container" :is-active="!isCollapse" class="hamburger-container" @toggleClick="handleIsCollapse" />
          <el-breadcrumb separator="/" style="height: 100%; line-height: 47px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>Test1</el-breadcrumb-item>
            <el-breadcrumb-item>Test2</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Sidebar } from './components'
import Hamburger from '@/components/Hamburger'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Hamburger
  },
  data() {
    return {
      isCollapse: false,
      elAsideWidth: '210px'
    }
  },
  created() {
    // console.log(this.sidebar.opened)
  },
  methods: {
    handleIsCollapse: function() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.elAsideWidth = '64px'
      } else {
        this.elAsideWidth = '210px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0 0px;
  height: 46px !important;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }
}
</style>
