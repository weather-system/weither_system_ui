import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DashboardView',
      component: () => import('@/views/beranda/DashboardView.vue'),
    },
    {
      path: '/devtest',
      name: 'DevTest',
      component: () => import('@/views/DevTest.vue'),
    },
  ],
})


export default router
