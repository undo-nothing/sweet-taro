<template>
  <div class="middle-link">
    <span v-for="genre in genreList" :key="genre.name">
      <div class="item">
        <a class="name" :href="'https://www.bilibili.com' + genre.url" target='_blank' ><span>{{ genre.name }}<em>999+</em></span></a>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'MiddleLink',
  data() {
    return {
      // 分类
      genreList: [
        {'name': '动画', 'url': '/v/douga/'},
        {'name': '番剧', 'url': '/anime/'},
        {'name': '音乐', 'url': '/v/music/'},
        {'name': '国创', 'url': '/guochuang/'},
        {'name': '舞蹈', 'url': '/v/dance/'},
        {'name': '游戏', 'url': '/v/game/'},
        {'name': '知识', 'url': '/v/technology/'},
        {'name': '数码', 'url': '/v/digital/'},
        {'name': '生活', 'url': '/v/life/'},
        {'name': '鬼畜', 'url': '/v/kichiku/'},
        {'name': '时尚', 'url': '/v/fashion/'},
        {'name': '资讯', 'url': '/v/information/'},
        {'name': '娱乐', 'url': '/v/ent/'},
        {'name': '影视', 'url': '/v/cinephile/'},
        {'name': '放映', 'url': '/cinema/'},
        {'name': '美食', 'url': '/v/food/'},
      ]
    }
  },
  created() {
  },
  methods: {
  }
}

</script>

<style lang="scss" scoped>
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
</style>