<template>
  <div class="bing-wapper-detail" :style="{ backgroundImage: 'url(' + bgUrl + ')' }">
    <div class="header-box">
      <div class="header-left">
        <el-row>
          <el-button icon="el-icon-arrow-left" @click="handleBack">首页</el-button>
        </el-row>
      </div>
      <div class="header-right">
        <el-row>
          <el-button icon="el-icon-share" @click="handleShare">分享</el-button>
          <el-button @click="handleLike"><svg-icon icon-class="xihuan" :class="{'red-icon': isLike}" /> 999+</el-button>
          <el-button @click="handleDownload"><svg-icon icon-class="download" />下载</el-button>
        </el-row>
      </div>
    </div>

    <div class="search_box">
      <div>
        <el-image
          :src="logo_src"
          fix="contain"
          class="search_logo"
        />
      </div>
      <div class="search_input" @keyup.enter="handleSearch">
        <el-input v-model="input" :placeholder="detail.author">
          <el-select slot="prepend" v-model="engine" placeholder="" @change="changeEngine">
            <el-option label="Baidu" value="baidu" />
            <el-option label="Google" value="google" />
            <el-option label="Bing" value="bing" />
          </el-select>
          <el-button slot="append" size="large" @click="handleSearch"><svg-icon icon-class="search" class="search_btn_icon" /></el-button>
        </el-input>
      </div>
    </div>

    <div class="footer-box">
      <div class="footer-right">
        <el-row>
          <el-button type="info" icon="el-icon-location">{{ detail.author }}</el-button>
          <el-date-picker
            v-model="dateText"
            type="date"
            placeholder=""
            :clearable="false"
            @change="changeDate"
          />
          <el-button type="info" icon="el-icon-arrow-left" circle @click="lastDay" />
          <el-button type="info" circle @click="randomDay"><svg-icon icon-class="random" /></el-button>
          <el-button type="info" icon="el-icon-arrow-right" :disabled="nextButtonDisable" circle @click="nextDay" />
        </el-row>
      </div>
    </div>

    <el-dialog
      title="分享"
      :visible.sync="shareDialogVisible"
      width="30%"
    >
      <el-input
        v-model="shareText"
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="shareDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClipboard($event)">复 制</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
import clipboard from '@/utils/clipboard'
import { commonGetOne } from '@/utils/common_curd'
import { strfdate, strpdate, randomDate } from '@/utils/datetime'
import { downloadFile } from '@/api/utils'

export default {
  components: {
  },
  data() {
    return {
      apiPath: 'bingwappers/',
      detail: {},
      date: null,
      dateText: null,
      isLike: true,
      shareDialogVisible: false,
      shareText: '',

      logo_src: this.mediaBaseUrl + 'image/logo_bing.png',
      input_placeholder: '',
      input: '',
      engine: 'baidu',
      engine_url: {
        bing: 'https://cn.bing.com/search?q=',
        google: 'https://www.google.com.hk/search?q=',
        baidu: 'https://www.baidu.com/s?wd='
      }
    }
  },
  computed: {
    nextButtonDisable: function() {
      return strfdate() === strfdate(this.date)
    },
    bgUrl: function() {
      return this.detail.filename ? this.mediaBaseUrl + 'bingwapper/' + this.detail.filename + '.jpg' : ''
    }
  },
  watch: {
    detail() {
      if (this.detail.date) {
        var new_date = strpdate(this.detail.date)
        if (strfdate(this.date) !== strfdate(new_date)) {
          this.date = new_date
        }
      }
    },
    date() {
      this.dateText = strfdate(this.date)
      this.$router.push({ name: 'search-page', params: { date: strfdate(this.date) }})
      this.getDetail()
    }
  },
  created() {
    this.init()
    this.getDetail()
  },
  methods: {
    init() {
      if (!this.$route.params.date) {
        this.$route.params.date = strfdate()
      }
      this.date = strpdate(this.$route.params.date)
    },
    getDetail() {
      var url_path = this.apiPath
      var params = {}
      params['date'] = this.$route.params.date
      params['default'] = 'latest'
      commonGetOne(this, url_path, params)
    },
    lastDay() {
      this.date = this.date.subtract(1, 'day')
    },
    randomDay() {
      var start_date = strpdate('2016-08-08')
      this.date = randomDate(start_date, strpdate())
    },
    nextDay() {
      this.date = this.date.add(1, 'day')
    },
    changeDate() {
      this.date = strpdate(this.dateText)
    },
    handleClipboard(event) {
      this.shareDialogVisible = false
      clipboard(this.shareText, event)
    },
    handleBack() {
      this.$router.push({ name: 'bingwapper-index' })
    },
    handleShare() {
      this.shareText = `#必应壁纸# ${this.detail.date} / ${this.detail.author} \n${window.location.href}`
      this.shareDialogVisible = true
    },
    handleDownload() {
      var url = this.detail.filename ? this.mediaBaseUrl + 'bingwapper/' + this.detail.filename + '.jpg' : ''
      downloadFile(url)
    },
    handleLike() {
      this.isLike = !this.isLike
    },
    getShareText() {
      return this.shareText
    },
    changeEngine(value) {
      if (value === 'bing') {
        this.logo_src = this.mediaBaseUrl + 'image/logo_bing.png'
      } else if (value === 'google') {
        this.logo_src = this.mediaBaseUrl + 'image/logo_google.png'
      } else {
        this.logo_src = this.mediaBaseUrl + 'image/logo_bing.png'
      }
    },
    handleSearch() {
      if (!this.input) {
        this.input = this.detail.author
      }
      window.open(this.engine_url[this.engine] + this.input, '_blank')
      this.input = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.bing-wapper-detail {
  height: 100%;
  width: 100%;
  background-color: #666;
  background-repeat: no-repeat;
  background-position:center center;
  background-size: cover;
  padding: 0px;
  overflow: hidden;
}

.header-box {
  .header-left {
    float: left;
    margin: 10px;
  }
  .header-right {
    float: right;
    margin: 10px;
  }
  .el-button {
    background-color: rgba(255, 255, 255, 0.8);
    border-color: transparent;
    color: #0C8484;
    font-size: 14px;
    padding: 8px;
  }
  .el-button:hover {
    background: #fff;
  }
  .red-icon {
    color: #f15151;
  }
}

.search_box {
  width: 800px;
  position: absolute;
  left: 15%;
  top: 210px;
  margin-left: 40px;

  .search_logo {
    width: 120px;
    float: left;
  }

  .search_input {
    width: 650px;
    float: right;
  }
  .search_btn_icon {
    font-size: 28px;
    color: rgb(0, 125, 170)
  }
}

.footer-box {
  color: #333;
  text-align: center;
  line-height: 60px;
  position:absolute;
  bottom:0;
  width: 100%;
  .footer-right {
    float: right;
    margin-right: 20px;
    .el-button {
      background-color: rgba(34,34,34,.55);
      border-color: transparent;
    }
    .el-date-editor {
      width: 140px;
      line-height: 42px;
      margin: 0px 10px;
    }
  }
}

</style>

<style scoped>
.footer-right >>> .el-input__inner{
  background-color: rgba(34,34,34,.55);
  border-color: transparent;
  color: #FFFFFF;
}

.search_box >>> .el-input-group__append, .search_box >>> .el-input__inner, .search_box >>>  .el-input-group__prepend {
  background-color: rgb(255, 255, 255);
  border-color: transparent;
  height: 55px;
}
</style>

<style scoped>
@media screen and (min-height: 1081px){
  .search_box {
    top: 280px;
    width: 850px;
  }
  .search_box .search_input {
    width: 700px;
  }
  .search_box .search_logo {
    width: 130px;
  }
  .search_box .search_btn_icon {
    font-size: 30px;
  }
  .search_box >>> .el-input-group__append, .search_box >>> .el-input__inner, .search_box >>>  .el-input-group__prepend {
    height: 59px;
  }
}
@media screen and (max-height: 901px){
  .search_box {
    top: 160px;
    width: 620px;
  }
  .search_box .search_input {
    width: 490px;
  }
  .search_box .search_logo {
    width: 100px;
  }
  .search_box .search_btn_icon {
    font-size: 25px;
  }
  .search_box >>> .el-input-group__append, .search_box >>> .el-input__inner, .search_box >>>  .el-input-group__prepend {
    height: 48px;
  }
}
</style>
