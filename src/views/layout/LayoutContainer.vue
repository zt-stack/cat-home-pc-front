<script setup>
import { useUserStore } from '@/stores'
import avatar from '@/assets/default-avatar.png'
import router from '@/router'
import { ElNotification } from 'element-plus'
import {
  Management,
  Promotion,
  UserFilled,
  SwitchButton,
  CaretBottom,
  PieChart,
  User,
  MessageBox
} from '@element-plus/icons-vue'

const userStore = useUserStore()
const handLayoutCommand = (value) => {
  if (value === 'logout') {
    userStore.removeUserToken()
    router.push('/login')
    ElNotification({
      title: '成功',
      message: '退出登录',
      type: 'success'
    })
    return
  }
  router.push(`/user/${value}`)
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <!-- router是开启路由，这样子可以点击跳转，在菜单中通过index跳转 -->
      <!-- default-active是默认显示路由的颜色样式 -->
      <div class="el-aside__logo" style="width: 200px"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/map/catmap">
          <el-icon><Management /></el-icon>
          <span>猫咪地图</span>
        </el-menu-item>
        <el-menu-item index="/cat/list">
          <el-icon><Promotion /></el-icon>
          <span>猫咪管理</span>
        </el-menu-item>
        <el-menu-item index="/dynamic/trends">
          <el-icon><PieChart /></el-icon>
          <span>动态管理</span>
        </el-menu-item>
        <el-menu-item index="/ad/adList">
          <el-icon><MessageBox /></el-icon>
          <span>云养管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <!-- 一级路由用tempalte -->
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <!-- 二级路由则是用这个 -->
          <el-menu-item index="/user/manager">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          Hi ！ <strong>{{ 小帅 }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handLayoutCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 主体内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Copyright © 2024 喵家. All rights reserved</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  background-color: #fff;
  .el-aside {
    background-color: #232323;
    &__logo {
      height: 100px;
      width: 100%;
      background: url('@/assets/logo.jpg') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
