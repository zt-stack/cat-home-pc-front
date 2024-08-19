import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

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

// 路由守卫，确认是否登陆
// 1.如果返回值是undefined 或者 true 直接放行
// 2.如果返回值是false 则拦截当前页面，不能跳转
router.beforeEach((to) => {
  // 如果没有登录页，且访问的是非登录页则拦截
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }
})

export default router
