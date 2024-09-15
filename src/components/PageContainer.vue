<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
        <div class="header-button">
          <!-- 具名插槽定制功能 -->
          <slot name="button"></slot>
        </div>
      </div>
    </template>
    <!-- 主题内容 -->
    <div class="header-main">
      <!-- 普通插槽 -->
      <slot></slot>
    </div>
  </el-card>
</template>
<style scoped lang="scss">
.page-container {
  width: 85%;
  height: 100%;
  position: fixed;
}
.header {
  width: 100%;
  height: 100%;
  display: flex;
  .card-header,
  .header-button {
    width: 50%;
    height: 100%;
  }
  .header-button {
    text-align: right;
  }
}
</style>
