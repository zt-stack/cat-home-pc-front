import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist) //持久化存储

//统一导出pinia
export default pinia

//导出其他模块
export * from './modules/user'
