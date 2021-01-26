<template>
  <div>
    <bili-header :mini="true" />
    <div class="main-area">
      <div class="top-banner">
        <img src="http://127.0.0.1:8000/media/image/rl_top.png">
      </div>
      <div class="title-line">
        <span class="tit" style="font-size: 38px;">登录</span>
      </div>
      <div class="login-box clearfix">
        <div class="login-left">
          <div class="qrcode-login">
            <i class="tv-icon" />
            <div class="qrcode-img">
              <img src="http://127.0.0.1:8000/media/image/qr_code.jpg">
            </div>
          </div>
          <div class="qrcode-footer">
            <p class="app-link">
              请使用
              <a href="//app.bilibili.com/" target="_blank">哔哩哔哩客户端</a>
              <br>扫码登录<br>
              或扫码下载APP
            </p>
          </div>
        </div>
        <div class="line" />
        <div class="login-right">
          <div class="form-login">
            <el-tabs v-model="loginForm.type" class="input-box">
              <el-tab-pane label="密码登录" name="password">
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
                  <el-form-item prop="username">
                    <el-input
                      ref="username"
                      v-model="loginForm.username"
                      placeholder="用户名/手机号/邮箱"
                      name="username"
                      type="text"
                    />
                  </el-form-item>

                  <el-form-item prop="password">
                    <el-tooltip v-model="capsTooltip" content="Caps lock on" placement="right" manual>
                      <el-input
                        v-model="loginForm.password"
                        placeholder="密码"
                        name="password"
                        type="password"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip=false"
                        @keyup.enter.native="handleLogin"
                      />
                    </el-tooltip>
                  </el-form-item>

                  <el-form-item style="margin-bottom: 0px;">
                    <el-checkbox v-model="remenberme">记住我</el-checkbox>
                    <span style="color: #bbb; font-size: 12px; padding-right: 20px;"> 不是自己的电脑上不要勾选此项</span>
                    <span class='link-type'> 无法验证？</span>
                    <span class='link-type'> 忘记密码？</span>
                  </el-form-item>

                  <el-button type="primary" class="login-button" @click.native.prevent="handleLogin">登录</el-button>
                  <el-button type="plain" class="login-button" @click.native.prevent="handleLogin">注册</el-button>

                </el-form>
              </el-tab-pane>
              <el-tab-pane label="短信登录" name="phone">
                短信登录
              </el-tab-pane>
            </el-tabs>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BiliHeader from '@/components/BiliHeader'

import { getJwtToken } from '@/api/user'
import { setToken } from '@/utils/auth'

export default {
  components: {
    BiliHeader
  },
  data() {
    return {
      capsTooltip: false,
      remenberme: true,
      loginForm: {
        type: 'password',
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'none', message: '请输入注册时用的邮箱或者手机号呀' }],
        password: [{ required: true, trigger: 'none', message: '喵，你没输入密码么？' }]
      },
      addLoading: false,
    }
  },
  created() {
    console.log('created')
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log(this.loginForm)
          getJwtToken(this.loginForm).then(response => {
            var jwtToken = response.data.token
            setToken(jwtToken)
            this.$router.push({ path: this.redirect || '/admin/', query: this.otherQuery })
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    checkCapslock({ shiftKey, key } = {}) {
      console.log(shiftKey, key)
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>

.top-banner {
  background: #00a0d8;
  height: 86px;
  text-align: center;
  margin-bottom: 20px;
}
.title-line {
  width: 980px;
  height: 28px;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
  margin-bottom: 28px;
  text-align: center;
}
.title-line .tit {
    height: 56px;
    line-height: 56px;
    margin: 0 auto;
    padding: 0 20px;
    font-size: 40px;
    background: #fff;
    text-align: center;
}

.login-box {
    position: relative;
    width: 980px;
    margin: 0 auto;
}

.login-box .login-left {
    float: left;
    width: 489px;
    text-align: center;
}

.login-box .line {
    float: left;
    border-right: 1px solid #ddd;
    height: 300px;
    margin-top: 28px;
}

.qrcode-login .qrcode-img {
}

.qrcode-login .qrcode-img img {
    margin-top: 70px;
    width: 140px;
    height: 140px;
    position: relative;
}

.qrcode-login .tv-icon {
    position: absolute;
    width: 70px;
    height: 70px;
    left: 160px;
    top: 10px;
    background: url(http://127.0.0.1:8000/media/image/phone.png) no-repeat;
}

.qrcode-footer {
    width: 480px;
    height: 155px;
    background: url(http://127.0.0.1:8000/media/image/2233login.png) 0 -7px no-repeat;
}

.login-box .login-right {
    float: left;
    padding-left: 45px;
    width: 490px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.form-login {
    position: relative;
}

.form-login .input-box {
    margin-top: 35px;
    width: 414px;
}

.login-box .type-tab {
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start-end;
    -webkit-justify-content: start-end;
    -moz-box-pack: start-end;
    -ms-flex-pack: start-end;
    justify-content: start-end;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 12px;
}

.el-form-item {
  margin-bottom: 32px;
}

.login-button {
  width: 200px;
}

</style>

<style scoped>

.login-right >>> .el-tabs__active-bar, .login-right >>> .el-tabs__nav-wrap::after {
  height: 0px;
}
.login-right >>> .el-tabs__header {
  margin-bottom: 4px;
}
</style>
