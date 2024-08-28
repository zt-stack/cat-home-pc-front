<script setup>
import { useUserStore } from '@/stores'
import avatar from '@/assets/default-avatar.png'
import router from '@/router'
import { ElNotification } from 'element-plus'
import { updateManagerService } from '@/api/user'
import { onMounted } from 'vue'
import {
  Aim,
  Promotion,
  SwitchButton,
  CaretBottom,
  PieChart,
  User,
  MessageBox,
  Odometer,
  Plus
} from '@element-plus/icons-vue'
import { ref } from 'vue'

onMounted(() => {
  userForm.value = userStore.userInfo[0]
})

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
  dialogTableVisible.value = true
}

// 弹窗修改个人信息
const dialogTableVisible = ref(false)
const userForm = ref({
  id: userStore.userInfo[0].id,
  managerName: '',
  name: '',
  password: '',
  image: '',
  gender: ''
})
// 照片上传
const imgUrl = ref()
const token = ref({ Authorization: userStore.token })
const handleAvatarSuccess = (res) => {
  imgUrl.value = res.data
  userForm.value.image = res.data
}

// 提交按钮
const onSubmit = async () => {
  try {
    await updateManagerService(userForm.value)
    dialogTableVisible.value = false
    ElNotification({
      title: '成功',
      message: '修改成功',
      type: 'success'
    })
  } catch (error) {
    ElNotification({
      title: '失败',
      message: '修改失败',
      type: 'warning'
    })
  }
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
        <el-menu-item index="/map/catmap" class="distance">
          <el-icon><Aim /></el-icon>
          <span>猫咪地图</span>
        </el-menu-item>
        <el-menu-item index="/cat/list" class="distance">
          <el-icon><Promotion /></el-icon>
          <span>猫咪管理</span>
        </el-menu-item>

        <el-menu-item index="/user/manager" class="distance">
          <el-icon><MessageBox /></el-icon>
          <span>广告管理</span>
        </el-menu-item>

        <el-sub-menu index="/dynamic" class="distance">
          <!-- 一级路由用tempalte -->
          <template #title>
            <el-icon><PieChart /></el-icon>
            <span>动态管理</span>
          </template>
          <!-- 二级路由则是用这个 -->
          <el-menu-item index="/dynamic/trends">
            <el-icon><Odometer /></el-icon>
            <span>动态数据</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          Hi ！ <strong>{{ userStore.userInfo[0].managerName || '' }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handLayoutCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.userInfo[0].image || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="manager" :icon="User"
                >修改信息</el-dropdown-item
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
  <!-- 弹窗 -->
  <el-dialog
    v-model="dialogTableVisible"
    title="修改信息"
    width="800"
    style="border-radius: 20px"
  >
    <el-form
      label-position="right"
      label-width="auto"
      style="margin-left: 80px"
    >
      <el-form-item label="照片" label-position="left" class="distance-form">
        <el-upload
          ref="upload"
          class="avatar-uploader"
          action="http://localhost:8080/upload"
          name="image"
          :headers="token"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          style="
            border: 2px solid #f5f5ff;
            width: 180px;
            height: 180px;
            border-radius: 50%;
          "
        >
          <img
            v-if="userForm.image"
            :src="userForm.image || imgUrl"
            class="avatar"
            style="width: 180px; height: 180px; border-radius: 50%"
          />
          <el-icon
            v-else
            class="avatar-uploader-icon"
            style="width: 180px; height: 180px"
            ><Plus
          /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名" label-position="left" class="distance-form">
        <el-input
          style="width: 400px"
          size="large"
          v-model="userForm.managerName"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" label-position="left" class="distance-form">
        <el-input
          v-model="userForm.name"
          style="width: 400px"
          size="large"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" label-position="left" class="distance-form">
        <el-input
          v-model="userForm.password"
          style="width: 400px"
          size="large"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" label-position="left" class="distance-form">
        <el-select style="width: 400px" size="large" v-model="userForm.gender">
          <el-option label="男生" value="男生"></el-option>
          <el-option label="女生" value="女生"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="distance-form"
        style="width: 100%; height: 100%; margin-left: 180px"
      >
        <el-button
          type="primary"
          @click="onSubmit"
          class="size-button"
          style="margin-right: 30px"
          >提交</el-button
        >
        <el-button
          size="large"
          class="size-button"
          @click="dialogTableVisible = false"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
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
.distance {
  margin-top: 10px;
}
.distance-form {
  margin-top: 30px;
}
.size-button {
  width: 100px;
  height: 50px;
}
</style>
