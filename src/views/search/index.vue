<template>
  <div>
    <bili-header :mini="false" />
    <div class="main-area">
      <div class="sub-nav-wrap">
        <div class="sub-nav-link">
          <ul>
            <li>
              <a href="/">
                <div class="round"><i class="el-icon-s-home" style="color: #fff" /></div>
                <span>首页</span>
              </a>
            </li>
            <li>
              <a href="/">
                <div class="round"><i class="el-icon-s-grid" style="color: #fff" /></div>
                <span>分类</span>
              </a>
            </li>
            <li>
              <a href="/">
                <div class="round"><i class="el-icon-s-data" style="color: #fff" /></div>
                <span>排行</span>
              </a>
            </li>
            <li>
              <a href="/">
                <div class="round"><i class="el-icon-s-data" style="color: #fff" /></div>
                <span>今日</span>
              </a>
            </li>
          </ul>
        </div>
        <span class="tab-line" />
        <div class="middle-link">
          <span v-for="genre in genreList" :key="genre.id">
            <div class="item">
              <a class="name"><span>{{ genre.genre_name }}<em>999+</em></span></a>
            </div>
          </span>
        </div>
        <span class="tab-line" />
        <div class="friendship-link">
          <span>
            <div class="item"><a class="name"><span>动画</span></a></div>
          </span>
          <span>
            <div class="item"><a class="name"><span>动画</span></a></div>
          </span>
          <span>
            <div class="item"><a class="name"><span>动画</span></a></div>
          </span>
          <span>
            <div class="item"><a class="name"><span>动画</span></a></div>
          </span>
          <span>
            <div class="item"><a class="name"><span>动画</span></a></div>
          </span>
          <span>
            <div class="item"><a class="name"><span>动画</span></a></div>
          </span>
        </div>
      </div>
      <div id="main_video">
        <header class="common-header">
          全部 / 视频
        </header>
        <div class="common-list-box">
          <div v-for="item in list" :key="item.id" class="common-card" @click="gotoVideoPage(item.id)">
            <div class="card-pic">
              <a>
                <img :src="getThumb(item.id36)" alt="">
              </a>
            </div>
            <div class="card-content">
              <div class="content-body">{{ item.title }}</div>
              <div class="content-footer">{{ item.code }} / {{ item.issue_date }}</div>
            </div>
          </div>
        </div>

        <div class="page-box">
          <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="fetchList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import BiliHeader from '@/components/BiliHeader'
import { commonFetchList } from '@/utils/common_curd'
import { commonFetchListApi } from '@/api/common_curd'

export default {
  components: {
    Pagination,
    BiliHeader
  },
  data() {
    return {
      // 分类
      genreList: [],

      // 数据显示
      list: null,
      listLoading: true,
      total: 0,
      page: 1,
      limit: 16,
      filters: {}
    }
  },
  created() {
    this.fetchGenreList()
    this.fetchList()
  },
  methods: {
    // 获取
    fetchList() {
      const url_path = '/v1.0/videos/simple/?ordering=-id'
      const params = this.filters
      commonFetchList(this, url_path, params)
    },
    fetchGenreList() {
      const url_path = '/v1.0/genres/'
      commonFetchListApi(url_path, { limit: 20 }).then(response => {
        this.genreList = response.data.data
      })
    },
    gotoVideoPage(video_code) {
      console.log(video_code)
      this.$router.push({ path: '/video/' + video_code })
    },
    getThumb(id36) {
      return 'https://pics.javcdn.pw/thumb/' + id36 + '.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-nav-wrap {
  display: inline-flex;
  align-items: center;
  padding: 20px 0;
  width: 100%;

  .sub-nav-link {
    display: flex;
    align-items: center;

    ul {
      display: inline-flex;
      margin: 0;
      padding: 0;
      li {
        width: 66px;
        height: 68px;
        text-align: center;

        .round {
          width: 36px;
          height: 36px;
          background: #ff5c7c;
          border-radius: 36px;
          margin: 0 auto 4px;
          font-size: 26px;
        }
      }
    }
  }

  .tab-line {
    display: inline-block;
    height: 46px;
    border-left: 1px solid #e7e7e7;
    margin-right: 20px;
  }

  .middle-link {
    display: inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 68px;
    -ms-flex: 1;
    flex: 1;

    .item {
      cursor: pointer;
      display: flex;
      height: 34px;

      .name {
        display: flex;
        align-items: center;

        em {
          font-style: normal;
          font-size: 12px;
          display: inline-block;
          background: #73c9e5;
          border-radius: 2px;
          color: #fff;
          margin-left: 1px;
          transform: scale(.85);
          width: 32px;
          text-align: center;
        }
      }
    }
  }

  .friendship-link {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 68px;
    width: 289px;

    .item {
      cursor: pointer;
      display: flex;
      height: 34px;

      .name {
        font-size: 14px;
        display: flex;
        align-items: center;
      }
    }
  }
}

.main-area {
  width: 1630px;
  height: 100%;
  margin: auto;

  .page-box {
    padding-top: 20px;
  }
}

.common-list-box {
  display: flex;
  flex-wrap: wrap;
}

.common-header {
  margin-left: 10px;
}

.common-card {
  width: 180px;
  height: 345px;
  cursor: pointer;
  margin: 8px;
  box-shadow: 0 5px 40px -1px rgba(2,10,18,.15);
  border-radius: 3px;

  .card-pic a img {
    width: 100%;
    padding: 5px;
  }
  .card-content {
    padding: 0px 10px;
    .content-body {
      height: 62px;
      overflow: hidden;
      text-overflow: ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:3;
    }
    .content-footer {
      margin-top: 10px;
      font-size: 13px;
      color: #6d7685;
    }
  }
}

</style>
