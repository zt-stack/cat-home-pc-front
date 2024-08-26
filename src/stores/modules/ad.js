import { ref } from 'vue'
import { defineStore } from 'pinia'

// 猫咪存储pinia
export const useAdStore = defineStore('catHome-ad', () => {
  // 广告列表
  const adList = ref([])
  const setAdList = (value) => {
    adList.value = value
  }
  const total = ref()
  const setTotalService = (value) => {
    total.value = value
  }
  return {
    adList,
    setAdList,
    total,
    setTotalService
  }
})
