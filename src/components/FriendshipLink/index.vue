<template>
  <div class="friendship-link">
    <span>
      <div class="item"><a class="name" href="https://www.bilibili.com" target='_blank'><svg-icon icon-class="bilibili"/><span>Bilibili</span></a></div>
    </span>
    <span>
      <div class="item"><a class="name" href="https://element.eleme.cn/" target='_blank'><svg-icon icon-class="eleme" /><span>Element</span></a></div>
    </span>
    <span>
      <div class="item"><a class="name" href="https://cn.vuejs.org/" target='_blank'><svg-icon icon-class="vuejs" /><span>Vuejs</span></a></div>
    </span>
    <span>
      <div class="item"><a class="name" href="https://cn.bing.com/"><svg-icon icon-class="bing" target='_blank' /><span>Bing</span></a></div>
    </span>
    <span>
      <div class="item"><a class="name" href="https://www.python.org/" target='_blank'><svg-icon icon-class="python" /><span>Python</span></a></div>
    </span>
    <span>
      <div class="item"><a class="name" href="https://www.djangoproject.com/" target='_blank'><svg-icon icon-class="django" /><span>Django</span></a></div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'FriendshipLink',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}

</script>

<style lang="scss" scoped>
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
      span {
        margin-left: 3px;
      }
    }
  }
}
</style>