<template>
  <div class="layout-container" :style="layoutStyle">
    <!-- 左边导航栏 -->
    <Navbar />
    <!-- 子页面 -->
    <router-view />
  </div>
</template>

<script>
import Navbar from './navbar'

export default {
  name: 'Layout',
  data() {
    return {
      layoutStyle: ''
    }
  },
  components: {
    Navbar
  },
  mounted() {
    //设置页面高度
    this.layoutStyle = `height:${window.innerHeight}px;`
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  display: flex;
}
</style>
