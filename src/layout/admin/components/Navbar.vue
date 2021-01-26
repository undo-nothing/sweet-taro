<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="!isCollapse" class="hamburger-container" @toggleClick="handleIsCollapse" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown @command="handelUserMenu">
        <span class="el-dropdown-link user_photo" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="change-password"> <svg-icon icon-class="password" /> <span>Password</span></el-dropdown-item>
          <el-dropdown-item command="set-language"> <svg-icon icon-class="international" /> <span>Language</span></el-dropdown-item>
          <el-dropdown-item command="show-about"> <svg-icon icon-class="about" /> About</el-dropdown-item>
          <el-dropdown-item command="show-help"> <svg-icon icon-class="help" /> <span>Help</span></el-dropdown-item>
          <el-dropdown-item command="log-out"> <svg-icon icon-class="log-out" /> Logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import { removeToken } from '@/utils/auth'

export default {
  name: 'Layout',
  components: {
    Hamburger,
    Breadcrumb
  },
  data() {
    return {
      isCollapse: false
    }
  },
  created() {
    // console.log(this.sidebar.opened)
  },
  methods: {
    handleIsCollapse: function() {
      this.isCollapse = !this.isCollapse
      this.$store.dispatch('app/toggleSideBar')
    },
    Logout: function() {
      removeToken()
      this.$router.push('/login')
    },
    handelUserMenu: function(cmd) {
      console.log('cmd', cmd)
      if (cmd === 'log-out') {
        this.Logout()
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
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 44px;
    margin-right: 25px;

    .user_photo {
      height: 36px;
      width: 36px;
      border-radius: 16px;
      background-color: #ececec;
      background-position: -9px -147px;
      vertical-align: middle;
      margin: 1px 3px 2px 8px;
      background-image: url(https://cn.bing.com/sa/simg/hpc27_2x.png);
      background-size: 241px 224px;
      display: inline-block;
    }
  }
}
</style>
