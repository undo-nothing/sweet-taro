<template>
  <div :class="{'bili-header mini-header':isMini, 'bili-header':!isMini}">
    <el-row :gutter="0" class="nav-header">
      <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
        <el-menu
          :default-active="activeIndex"
          class="my-el-menu"
          mode="horizontal"
          text-color="#fff"
          active-text-color="#fff"
        >
          <el-menu-item index="1" ><i class="el-icon-menu" /><span>主站</span></el-menu-item>
          <el-menu-item index="2">
            <span>动画</span></el-menu-item>
          <el-menu-item index="3"><span>漫画</span></el-menu-item>
          <el-menu-item index="4"><span>游戏</span></el-menu-item>
          <el-menu-item index="5"><span>壁纸</span></el-menu-item>
          <el-submenu popper-class="submenu-popper" index="7">
            <template slot="title"><span>其他</span></template>
            <el-menu-item index="2-1">维护公告</el-menu-item>
            <el-menu-item index="2-2">报告bug</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :xs="0" :sm="2" :md="4" :lg="6" :xl="6">
        <div class="nav-search-box">
          <el-input placeholder="请输入内容" v-model="search.value" class="nav-search">
            <el-select v-model="search.type" slot="prepend" placeholder="请选择">
              <el-option label="动画" value="1"></el-option>
              <el-option label="漫画" value="2"></el-option>
              <el-option label="游戏" value="3"></el-option>
              <el-option label="壁纸" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
        <div class="nav-user-center">
          <img class="user_photo" src="//static.hdslb.com/images/akari.jpg">
          <div class="nav-link">
            <ul class="nav-link-ul">
              <li>
                <a href="" target="_blank" class="link">登录</a>
              </li>
              <li>
                <a href="" target="_blank" class="link">注册</a>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="banner-area" >
      <div class="taper-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BiliHeader',
  props: {
    'mini': Boolean
  },
  data() {
    return {
      isMini: this.mini,
      activeIndex: '1',
      search: {},
    };
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

.bili-header {
}

.nav-header {
  // background-color: #000;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 56px;
}

.my-el-menu {
  background-color:transparent !important;
  border-bottom: 0px;
  margin-left: 30px;

  .el-menu-item {
    height: 56px;
    line-height: 56px;
    padding: 0px 8px;
    border-bottom: 0px;
    background-color:transparent !important;
    i {
      color: inherit;
    }
  }
  .is-active {
    span::after{
      content: "";
      position: absolute;
      background: #f12349;
      left: 0;
      right: 0;
      bottom: 10px;
      width: 4px;
      height: 4px;
      border-radius: 10px;
      margin: 0 auto;
      opacity: 1;
    }
  }
}

.nav-search-box {
  width: 100%;
  height: 56px;
  .nav-search {
    margin: 8px 0px;
  }
}

.nav-user-center {
  width: 300px;
  height: 56px;
  float: right;

  .user_photo {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    margin-right: 12px;
  }

  .nav-link {
    display: inline-block;
    .nav-link-ul{
      padding:0px;
      margin: 18px 0px;
      display: inline-flex;

      li {
        margin-right: 12px;
        .link {
          padding: 9px 0px;
          color: #fff;
        }
      }
    }

  }
}

.banner-area {
  // display: none;
  min-height: 56px;
  height: calc(100vw * 0.09375);
  min-width: 999px;
  background-color: #f9f9f9;
  background-repeat: no-repeat;
  background-position: center 0;
  background-size: cover;
  background-image: url('http://127.0.0.1:8000/media/image/header1.png');
  // background: #fff;

  .taper-line {
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 56px;
    background: linear-gradient(rgba(0, 0, 0, 0.5), transparent);
  }
}

.mini-header .banner-area {
  height: 56px;
}

</style>

<style lang="scss">
.my-el-menu {
  .el-submenu {
    .el-submenu__title {
      background-color: transparent !important;
      height: 56px;
      line-height: 56px;
      padding: 0px 8px;
    }

    .el-submenu__icon-arrow {
      margin-left: 1px;
      margin-top: 0px;
      color: inherit;
    }
  }
}

.nav-search-box {
  .el-input__inner, .el-input-group__prepend, .el-input-group__append {
    border: 0px;
  }
  .el-input__inner:focus {
    border: 0px;
  }
  .el-input__inner:hover {
    border: 0px;
  }
}

.submenu-popper {
  .el-menu--popup {
    background-color: rgba(0, 0, 0, 0.5);
    min-width: 100px;
  }
  .el-menu-item {
    background-color: transparent !important;
  }
}
</style>
