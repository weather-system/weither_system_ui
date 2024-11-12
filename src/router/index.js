import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import { me } from '@/lib/auth.js'
import store from '@/store'

// Array untuk halaman admin
const adminRoutes = [
  '/MyCompany',
  '/Companies',
  '/CompanyDetail',
  '/ProfileEdit',
  '/Profile',
  '/Pengendalian/PencemaranAir',
  '/Pengendalian/PencemaranAir/Create',
  '/Logbook/ProduksiSenyatanya',
  '/Logbook/PemakaianBahanKimia',
  '/Logbook/PemakaianAir',
  '/Logbook/DebitOutletIPAL',
  '/Logbook/DebitPemakaianAir',
  '/Logbook/IPAL',
  '/Logbook/PenggunaanB3',
  '/Logbook/TPSLimbahB3',
  '/Data/Company',
  '/Data/Ipal/:company_detail_id',
  '/Data/Perizinan',
  '/Data/Perizinan/Edit/:id',
  '/Data/Perizinan/Tambah',
  '/Data/Cerobong',
  '/Data/Cerobong/Tambah',
  '/Pengendalian/PencemaranAir/Edit',
  '/Login',
  '/Register',
  '/RegisterCompany',
  '/Master/User'
]

// Array untuk halaman utama
const mainRoutes = [
  '/',
  '/Compro'
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/LandingPage',
      name: 'LandingPage',
      component: () => import('@/views/LandingPage.vue'),
    },
    {
      path: '/beranda/ComproView',
      name: 'ComproView',
      component: () => import('@/views/beranda/ComproView.vue'),
    },
    {
      path: '/beranda/ComproStructureView',
      name: 'ComproStructureView',
      component: () => import('@/views/beranda/ComproStructureView.vue'),
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
      path: '/Logbook/PenggunaanB3',
      name: 'PenggunaanB3',
      component: () => import('@/views/Logbook/PenggunaanB3.vue'),
    },

    {
      path: '/Logbook/TPSLimbahB3',
      name: 'TPSLimbahB3',
      component: () => import('@/views/Logbook/TPSLimbahB3.vue'),
    },
    {
      path: '/Data/Company',
      name: 'DataCompany',
      component: () => import('@/views/data/Company.vue'),
    },
    {
      path: '/Data/Ipal/:company_detail_id',
      name: 'DataIpal',
      component: () => import('@/views/data/ipal/Ipal.vue'),
    },
    {
      path: '/Data/Perizinan',
      name: 'DataPerizinan',
      component: () => import('@/views/data/Perizinan.vue'),
    },
    {
      path: '/Data/Perizinan/Edit/:id',
      name: 'EditLicense',
      component: () => import('@/views/data/perizinan/edit.vue'),
    },
    {
      path: '/Data/Perizinan/Tambah',
      name: 'AddLicense',
      component: () => import('@/views/data/perizinan/create.vue'),
    },
    {
      path: '/Data/Cerobong',
      name: 'DataCerobong',
      component: () => import('@/views/data/Cerobong.vue'),
    },
    {
      path: '/Data/Cerobong/Edit/:id',
      name: 'DataCerobongEdit',
      component: () => import('@/views/data/cerobong/edit.vue'),
    },
    {
      path: '/Data/Cerobong/Tambah',
      name: 'DataCerobongTambah',
      component: () => import('@/views/data/cerobong/create.vue'),
    },
    {
      path: '/Data/TPSB3',
      name: 'DataTPSB3',
      component: () => import('@/views/data/TPSB3.vue'),
    },
    {
      path: '/Data/TPSB3/Edit/:id',
      name: 'DataTPSB3Edit',
      component: () => import('@/views/data/tpsb3/edit.vue'),
    },
    {
      path: '/Data/TPSB3/Tambah',
      name: 'DataTPSB3Tambah',
      component: () => import('@/views/data/tpsb3/create.vue'),
    },
    {
      path: '/Data/SumberAir',
      name: 'DataSumberAir',
      component: () => import('@/views/data/SumberAir.vue'),
    },
    {
      path: '/Data/SumberAir/Edit/:id',
      name: 'DataSumberAirEdit',
      component: () => import('@/views/data/sumber-air/edit.vue'),
    },
    {
      path: '/Data/SumberAir/Tambah',
      name: 'DataSumberAirTambah',
      component: () => import('@/views/data/sumber-air/create.vue'),
    },
    {
      path: '/Pengendalian/PencemaranAir/Edit',
      name: 'PengendalianPencemaranAirEdit',
      component: () => import('@/views/pengendalian/PencemaranAirEdit.vue'),
    },

    {
      path: '/Pengendalian/PencemaranUdara',
      name: 'PengendalianPencemaranUdara',
      component: () => import('@/views/pengendalian/PencemaranUdara.vue'),
    },
    {
      path: '/Data/IPAL',
      name: 'DataIPAL',
      component: () => import('@/views/data/ipal/Ipal.vue'),
    },
    {
      path: '/Data/IPAL/Edit/:id',
      name: 'DataIPALEdit',
      component: () => import('@/views/data/ipal/edit.vue'),
    },
    {
      path: '/Data/IPAL/Tambah',
      name: 'DataIPALTambah',
      component: () => import('@/views/data/ipal/create.vue'),
    },
    {
      path: '/Master/User',
      name: 'MasterUserView',
      component: () => import('@/views/Master/UserView.vue'),
    },
    {
      path: '/Master/User/Create',
      name: 'MasterUserCreateView',
      component: () => import('@/views/Master/UserCreateView.vue'),
    },
    {
      path: '/Master/User/:id',
      name: 'MasterUserEditView',
      component: () => import('@/views/Master/UserEditView.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  // Bersihkan CSS sebelumnya
  document.querySelectorAll('link[data-dynamic-css]').forEach(link => link.remove())

  // Tentukan CSS berdasarkan jenis halaman
  let cssFile = ''
  if (adminRoutes.includes(to.path)) {
    cssFile = await import('@/assets/css/admin.css')
  } else if (mainRoutes.includes(to.path)) {
    cssFile = await import('@/assets/css/style.css')
  }

  // Memuat file CSS yang ditentukan
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = cssFile.default
  link.dataset.dynamicCss = true
  document.head.appendChild(link)

  if (to.path === '/Login' || to.path === '/RegisterCompany' || to.path === '/') {
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
