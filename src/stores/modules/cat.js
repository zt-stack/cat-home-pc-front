import { ref } from 'vue'
import { defineStore } from 'pinia'

// 猫咪存储pinia
export const useCatStore = defineStore('catHome-cat', () => {
  // 猫咪信息存储
  const catList = ref([])
  const total = ref()
  const setCatList = (value) => {
    catList.value = value
  }
  const getCatList = () => {
    return catList.value
  }
  const setCatTotal = (value) => {
    total.value = value
  }

  return {
    catList,
    setCatList,
    getCatList,
    total,
    setCatTotal
  }
})
