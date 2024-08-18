<script setup>
// import axios from 'axios'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { RouterView } from 'vue-router'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
.global {
  width: 100%;
  height: 100vh;
  background-color: pink;
}
</style>
