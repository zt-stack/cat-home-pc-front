import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('delivery-user', () => {
  const token = ref('')

  //赋值token
  const setUserToken = (token) => {
    token.value = token
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
})
