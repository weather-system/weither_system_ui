import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/Login',
      name: 'LoginView',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/Register',
      name: 'RegisterView',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/RegisterCompany',
      name: 'RegisterCompanyView',
      component: () => import('@/views/RegisterCompanyView.vue'),
    },
    {
      path: '/MyCompany',
      name: 'MyCompanyView',
      component: () => import('@/views/MyCompanyView.vue'),
    },
    {
      path: '/Companies',
      name: 'CompaniesView',
      component: () => import('@/views/CompaniesView.vue'),
    },
  ],
})

export default router
