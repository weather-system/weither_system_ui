import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import { me } from '@/lib/auth.js'
import store from '@/store'

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

router.beforeEach(async (to, from, next) => {
  if (to.path === '/Login' || to.path === '/RegisterCompany') {
    next()
    return
  }
  const token = localStorage.getItem('TOKEN')
  if (!token) {
    next('/Login')
    return
  }

  axios.defaults.headers['Authorization'] = `Bearer ${token}`

  if (store.state.auth.user) {
    next()
    return
  }

  try {
    const user = await me()
    store.commit('auth/setUser', user)
  } catch (err) {
    next('/Login')
    return
  }

  next()
})

export default router
