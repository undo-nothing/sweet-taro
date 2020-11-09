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
            <i class="tv-icon"></i>
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
        <div class="line"></div>
        <div class="login-right">
          <div class="form-login">
            <div class="input-box">
              <div>
                <div class="type-tab">
                  <span class="active">密码登录</span>
                  <span class="">短信登录</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BiliHeader from '@/components/BiliHeader'

export default {
  components: {
    BiliHeader,
  },
  data() {
    return {
    };
  },
  created() {
    console.log('created')
  },
  methods: {
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
    margin-top: 50px;
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
</style>