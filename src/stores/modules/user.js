import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'catHome-user',
  () => {
    const token = ref('')
    //赋值token
    const setUserToken = (value) => {
      token.value = value
    }
    //获取token
    const getUserToken = () => {
      return token.value
    }
    // 删除token
    const removeUserToken = () => {
      token.value = ''
    }

    // 保存登录的个人信息
    const userInfo = ref([])

    const setUserDetailInfo = (value) => {
      userInfo.value = value
    }
    const getUserDetailInfo = () => {
      return userInfo.value
    }

    return {
      token,
      setUserToken,
      getUserToken,
      removeUserToken,
      userInfo,
      setUserDetailInfo,
      getUserDetailInfo
    }
  },
  {
    persist: true
  }
)
