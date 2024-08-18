import axios from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router'
import { ElNotification } from 'element-plus'

const baseURL = 'localhost:8080'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器（用于配置请求参数
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      // 配置请求接口头
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器（用于拦截请求回来的数据）
instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    if (res.data.code === 0) {
      // 请求成功
      return res
    }
    // 错误提示
    ElNotification({
      title: '警告',
      message: res.data.message || '服务器异常',
      type: 'warning'
    })
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    // 401错误,只有err.response存储才会继续代码
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // 默认错误
    ElNotification({
      title: '警告',
      message: err.data.message || '服务器异常',
      type: 'warning'
    })
    return Promise.reject(err)
  }
)

export default instance
