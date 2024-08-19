import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'catHome-user',
  () => {
    const token = ref('')
    const userInfo = ref()

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

    return {
      token,
      setUserToken,
      getUserToken,
      removeUserToken,
      userInfo
    }
  },
  {
    persist: true
  }
)
