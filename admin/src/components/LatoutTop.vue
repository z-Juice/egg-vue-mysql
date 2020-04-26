
<template>
  <div class="layout-top">
    <!-- 左侧标题 -->
    <h3>{{ name }}</h3>

    <!-- 右侧区域 -->
    <slot name="layout-top-right"></slot>
  </div>
</template>

<script>
export default {
  name: 'LatoutTop',
  props: {
    name: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="less" scoped>
.layout-top {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 40px 0 30px;
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  h3 {
    font-size: 18px;
    font-weight: 400;
    color: #333;
  }
}
</style>