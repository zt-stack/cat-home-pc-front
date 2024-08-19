<script setup>
import { ref, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
// import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'
import { userLoginService, userRegisterService } from '@/api/user.js'
import { useUserStore } from '@/stores'
import { ElNotification } from 'element-plus'

const router = useRouter()
const form = ref() //绑定表单属性

// 绑定表单数值
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

const isRegister = ref(true)
const userStore = useUserStore()

// 表单校验
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名长度必须是3-10位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    // 自定义校验
    {
      validate: (rule, value, callback) => {
        // 校验密码
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
// 登录
const login = async () => {
  // 校验表单
  await form.value.validate()
  const obj = {
    managerName: formModel.value.username,
    password: formModel.value.password
  }
  const res = await userLoginService(obj)

  //提示登录成功
  ElNotification({
    title: '成功',
    message: '登录成功！！',
    type: 'success'
  })

  //   存储token
  userStore.setUserToken(res.data.data)
  router.push('/')
}

// 注册
const register = async () => {
  await form.value.validate() //校验是否填写信息
  console.log(formModel.value)

  const obj = {
    managerName: formModel.value.username,
    password: formModel.value.password,
    repassword: formModel.value.repassword
  }

  // 将个人信息插入数据库
  const res = await userRegisterService(obj)

  ElNotification({
    title: '成功',
    message: '注册成功！！',
    type: 'success'
  })
  this.isRegister = true
  console.log(res)
}

// 登陆注册切换，原先数据清除
watch(
  isRegister,
  () => {
    formModel.value = {
      username: '',
      password: '',
      repassword: ''
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" class="form" :offset="3">
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        :model="formModel"
        :rules="rules"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="login"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-else
        :model="formModel"
        class="formData"
        :rules="rules"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
            v-model="formModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="register"
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  //   background: linear-gradient(to bottom, #f5ecd8, white);
  .bg {
    background: url('@/assets/login/R-C.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .formData {
      background: rgba(255, 255, 255, 0.1);
    }
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
