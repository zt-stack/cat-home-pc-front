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

    return {
      token,
      setUserToken,
      getUserToken
    }
  },
  {
    persist: true
  }
)
