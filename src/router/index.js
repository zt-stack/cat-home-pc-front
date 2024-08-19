import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一级路由
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      // 二级路由
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/map/catmap',
      children: [
        // 三级路由
        {
          path: 'map/catmap',
          component: () => import('@/views/map/MapPage.vue')
        },
        {
          path: 'cat/list',
          component: () => import('@/views/cat/CatListPage.vue')
        },
        {
          path: 'dynamic/trends',
          component: () => import('@/views/dynamic/DynamicPage.vue')
        },
        {
          path: 'ad/adList',
          component: () => import('@/views/ad/AdManagePage.vue')
        },
        {
          path: 'user/manager',
          component: () => import('@/views/manager/ManagerListPage.vue')
        }
      ]
    }
  ]
})

export default router
