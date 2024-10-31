import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import { me } from '@/lib/auth.js'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/LandingPage',
      name: 'LandingPage',
      component: () => import('@/views/LandingPage.vue'),
    },
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
    {
      path: '/CompanyDetail',
      name: 'CompaniesDetail',
      component: () => import('@/views/CompanyDetailView.vue'),
    },
    {
      path: '/ProfileEdit',
      name: 'ProfileVEditiew',
      component: () => import('@/views/ProfileEditView.vue'),
    },
    {
      path: '/Profile',
      name: 'ProfileView',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/Pengendalian/PencemaranAir',
      name: 'PengendalianPencemaranAir',
      component: () => import('@/views/pengendalian/PencemaranAir.vue'),
    },
    {
      path: '/Pengendalian/PencemaranAir/Create',
      name: 'PengendalianPencemaranAirCreate',
      component: () => import('@/views/pengendalian/PencemaranAirCreate.vue'),
    },

    {
      path: '/Logbook/ProduksiSenyatanya',
      name: 'ProduksiSenyatanya',
      component: () => import('@/views/Logbook/ProduksiSenyatanya.vue'),
    },

    {
      path: '/Logbook/PemakaianBahanKimia',
      name: 'PemakaianBahanKimia',
      component: () => import('@/views/Logbook/PemakaianBahanKimia.vue'),
    },

    {
      path: '/Logbook/PemakaianAir',
      name: 'PemakaianAir',
      component: () => import('@/views/Logbook/PemakaianAir.vue'),
    },

    {
      path: '/Logbook/DebitOutletIPAL',
      name: 'DebitOutletIPAL',
      component: () => import('@/views/Logbook/DebitOutletIPAL.vue'),
    },

    {
      path: '/Logbook/DebitPemakaianAir',
      name: 'DebitPemakaianAir',
      component: () => import('@/views/Logbook/DebitPemakaianAir.vue'),
    },

    {
      path: '/Logbook/IPAL',
      name: 'IPAL',
      component: () => import('@/views/Logbook/IPAL.vue'),
    },


    {
      path: '/Data/Company',
      name: 'DataCompany',
      component: () => import('@/views/data/Company.vue'),
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
