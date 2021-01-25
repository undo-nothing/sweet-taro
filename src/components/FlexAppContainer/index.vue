<template>
  <div class="app-container" :style="'height:' + selfHeight">
    <slot />
  </div>
</template>

<script>
// FlexAppContainer能监视浏览器的高度并自动设置自身高度
export default {
  name: 'FlexAppContainer',
  data() {
    return {
      screenHeight: document.documentElement.clientHeight,
      selfHeight: '100%'
    }
  },
  watch: {
    // 监控浏览器高度变化
    screenHeight(val) {
      console.log(val)
    }
  },
  created() {
    this.setSelfHeight()
  },
  mounted() {
    this.getScreenHeight()
  },
  methods: {
    // 动态获取浏览器高度
    getScreenHeight() {
      const that = this
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          that.screenHeight = window.fullHeight
          that.setSelfHeight()
        })()
      }
    },
    setSelfHeight() {
      this.selfHeight = (this.screenHeight - 50).toString() + 'px'
      console.log('set height:', this.selfHeight)
    }
  }
}

</script>
