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
        <span class="tab-line"></span>
        <div class="middle-link">
          <span v-for="genre in 20" :key="genre">
            <div class="item">
              <a class="name"><span>{{ }}测试<em>999+</em></span></a>
            </div>
          </span>
        </div>
        <span class="tab-line"></span>
        <div class="friendship-link">
          <span>
            <div class="item"><a class="name"><span>测试</span></a></div>
          </span>
          <span>
            <div class="item"><a class="name"><span>测试</span></a></div>
          </span>
          <span>
            <div class="item"><a class="name"><span>测试</span></a></div>
          </span>
          <span>
            <div class="item"><a class="name"><span>测试</span></a></div>
          </span>
          <span>
            <div class="item"><a class="name"><span>测试</span></a></div>
          </span>
          <span>
            <div class="item"><a class="name"><span>测试</span></a></div>
          </span>
        </div>
      </div>
      <ul class="sort-banner clearfix">
        <li @click="orderChange('date')">
          <sort-item :class='dateSortClass'>发行日期</sort-item>
        </li>
        <li>
          <sort-item class=''>收藏数量</sort-item>
        </li>
        <li>
          <sort-item class=''>喜欢数量</sort-item>
        </li>
      </ul>
      <div id="main_video">
        <el-row>
          <el-col :span="19">
            <div class="common-list-box">
              <div v-for="item in list" :key="item.id" @click="gotoDetailPage(item.date)" class="wapper-card-small">
                <div class="card-pic">
                  <a>
                    <img :src="getWapperUrl(item.filename)" alt="">
                  </a>
                </div>
                <div class="card-content">
                  <div class="content-body">{{ item.title }}</div>
                  <div class="content-footer">{{ item.date }}</div>
                </div>
              </div>
            </div>
            <div class="page-box">
              <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" :page-sizes="pageSizes" @pagination="fetchList" />
            </div>
          </el-col>
          <el-col :span="5">
            <div class="filter-wrapper">
              <div class="filter-title">筛选</div>
              <div class="filter-list">
                <div class="filter-block">
                  <div class="filter-name">年</div>
                  <ul class="filter-item-wrapper">
                    <li @click="filterYear('')" title="全部" :class="[{ 'on': !filters.year }, 'filter-item']">全部</li>
                    <li v-for="year in years" title="year" :key="year" @click="filterYear(year)" :class="[{ 'on': filters.year === year }, 'filter-item']">{{ year }}</li>
                  </ul>
                </div>
                <div class="filter-block">
                  <div class="filter-name">月</div>
                  <ul class="filter-item-wrapper">
                    <li @click="filterMonth('')" title="全部"  :class="[{ 'on': !filters.month }, 'filter-item']">全部</li>
                    <li v-for="month in 12" title="month" :key="month" @click="filterMonth(month)" :class="[{ 'on': filters.month === month }, 'filter-item']">{{ month }}</li>
                  </ul>
                </div>
                <div class="filter-block">
                  <div class="filter-name">日</div>
                  <ul class="filter-item-wrapper">
                    <li @click="filterDay('')" title="全部" :class="[{ 'on': !filters.day }, 'filter-item']">全部</li>
                    <li v-for="day in 31" title="day" :key="day" @click="filterDay(day)" :class="[{ 'on': filters.day === day }, 'filter-item']">{{ day }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import BiliHeader from '@/components/BiliHeader'
import SortItem from '@/components/SortItem'
import { commonFetchList } from '@/utils/common_curd'

export default {
  components: {
    Pagination,
    BiliHeader,
    SortItem
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
      limit: 12,
      pageSizes: [12, 24, 36, 48],
      filters: {},

      years: [],

      // 分类筛选数据
      filterList: [],
      orderingField: 'date',
      orderingValue: 1,
    };
  },
  created() {
    this.fetchList();
    let today = new Date;
    let nowYear = today.getFullYear()
    for (var i = 0; i < 8; i++) {
      this.years.push(nowYear - i)
    }
  },
  methods: {
    // 获取
    fetchList() {
      let url_path = '/v1.0/bingwappers/'
      let params = this.filters
      if (this.orderingValue === -1) {
        params['ordering'] = '-' + this.orderingField
      } else if (this.orderingValue === 1) {
        params['ordering'] = this.orderingField
      }
      console.log(params)
      commonFetchList(this, url_path, params)
    },
    getList() {
      console.log('getList')
    },
    gotoDetailPage(date) {
      this.$router.push({ path: '/bingwapper/' + date })
    },
    getWapperUrl(filename) {
      return "http://127.0.0.1:8000/media/bingwapper/" + filename + ".jpg"
    },
    orderChange(field) {
      if (this.orderingField === field) {
        if (this.orderingValue === -1) {
          this.orderingValue = 0;
        } else if (this.orderingValue === 1) {
          this.orderingValue = -1;
        } else {
          this.orderingValue = 1;
        }
      } else {
        this.orderingField = field;
        this.orderingValue = 0;
      }
      this.fetchList();
    },
    filterYear(year) {
      this.filters['year'] = year;
      this.fetchList();
    },
    filterMonth(month) {
      this.filters['month'] = month;
      this.fetchList();
    },
    filterDay(day) {
      this.filters['day'] = day;
      this.fetchList();
    },
  },
  computed: {
    // 计算属性的 getter
    dateSortClass: function () {
      // `this` 指向 vm 实例
      if (this.orderingField === 'date') {
        if (this.orderingValue === 1) {
          return 'ascending';
        } else if (this.orderingValue === -1) {
          return 'descending';
        }
      }
      return ''
    }
  },
  watch: {
    $route() {
      this.getList()
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
  width: 1520px;
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

.wapper-card-small {
  width: 280px;
  height: 240px;
  cursor: pointer;
  margin: 8px;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, .15);
  border-radius: 3px;

  .card-pic a img {
    width: 100%;
    padding: 5px;
  }

  .card-content {
    padding: 0px 10px;

    .content-body {
      height: 42px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .content-footer {
      margin-top: 10px;
      font-size: 13px;
      color: #6d7685;
    }
  }
}
</style>
<style lang="scss" scoped>

.sort-banner {
  height: 44px;
  margin-left: 20px;
}



.filter-wrapper .filter-title {
  height: 44px;
  line-height: 1;
  font-size: 18px;
  color: #222;
}

.filter-block {
  position: relative;
  margin-bottom: 16px;
  overflow: hidden;

  .filter-name {
    display: block;
    float: left;
    width: 52px;
    height: 30px;
    line-height: 1;
    font-size: 12px;
    color: #99a2aa;
  }

  .on {
    color: #00a1d6;
  }

  .filter-item-wrapper {
    margin-top: 0;
    width: 264px;
    float: right;

    .filter-item {
      display: inline-block;
      vertical-align: top;
      line-height: 1;
      text-align: left;
      width: 50px;
      height: 30px;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      padding-right: 2px;
      cursor: pointer;
      outline: 0;
    }
  }
}
</style>