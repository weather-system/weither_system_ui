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
  '/Logbook/IPAL/IPALCreate',
  '/Logbook/IPAL/IPALEdit',
  '/Logbook/PenggunaanB3',
  '/Logbook/TPSLimbahB3',
  '/Logbook/TPSLimbahB3/TPSLimbahB3Create',
  '/Logbook/TPSLimbahB3/TPSLimbahB3Edit',
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
  '/Master/User',
  '/tiket/Pengaduan',
  '/tiket/PengaduanCreate',
  '/Admin',
  '/Data/PKKPR',
  '/Data/PersLing',
  '/Pengawas',
]

// Array untuk halaman utama
const mainRoutes = [
  '/',
  '/beranda/ComproView',
  '/beranda/ComproStructureView',
  '/beranda/Contact',
  '/beranda/LaboratoryView',
  '/beranda/IzinLingkunganView',
  '/beranda/BeritaView',
  '/beranda/ArtikelView',
  '/beranda/PengumumanView',
  '/beranda/DownloadView',
  '/beranda/AgendaView',
  '/tiket/PengaduanBaru'
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
      path: '/Admin',
      name: 'AdminView',
      component: () => import('@/views/AdminView.vue'),
    },
    {
      path: '/Pengawas',
      name: 'PengawasView',
      component: () => import('@/views/PengawasView.vue'),
    },
    {
      path: '/ReferensiBakuMutu',
      name: 'ReferensiBakuMutu',
      component: () => import('@/views/ReferensiBakuMutu.vue'),
    },
    {
      path: '/ReferensiBakuMutu/Create',
      name: 'ReferensiBakuMutuCreate',
      component: () => import('@/views/ReferensiBakuMutu/Create.vue'),
    },
    {
      path: '/ReferensiBakuMutu/:id',
      name: 'ReferensiBakuMutuEdit',
      component: () => import('@/views/ReferensiBakuMutu/Edit.vue'),
    },
    {
      path: '/Verifikator/PertekIPAL',
      name: 'VerifikatorPertekIPAL',
      component: () => import('@/views/Verifikator/PertekIPAL.vue'),
    },
    {
      path: '/Verifikator/PertekIPAL/:id',
      name: 'VerifikatorPertekIPALDetail',
      component: () => import('@/views/Verifikator/PertekIPALDetail.vue'),
    },
    {
      path: '/Verifikator/PemantauanAir',
      name: 'VerifikatorPemantauanAir',
      component: () => import('@/views/Verifikator/PemantauanAir.vue'),
    },
    {
      path: '/Verifikator/PemantauanAir/:id',
      name: 'VerifikatorPemantauanAirDetail',
      component: () => import('@/views/Verifikator/PemantauanAirDetail.vue'),
    },
    {
      path: '/Verifikator/PemantauanUdaraAmbien',
      name: 'VerifikatorPemantauanUdaraAmbien',
      component: () => import('@/views/Verifikator/PemantauanUdaraAmbien.vue'),
    },
    {
      path: '/Verifikator/PemantauanUdaraAmbien/:id',
      name: 'VerifikatorPemantauanUdaraAmbienDetail',
      component: () => import('@/views/Verifikator/PemantauanUdaraAmbienDetail.vue'),
    },
    {
      path: '/Verifikator/PemantauanUdaraEmisi',
      name: 'VerifikatorPemantauanUdaraEmisi',
      component: () => import('@/views/Verifikator/PemantauanUdaraEmisi.vue'),
    },
    {
      path: '/Verifikator/PemantauanUdaraEmisi/:id',
      name: 'VerifikatorPemantauanUdaraEmisiDetail',
      component: () => import('@/views/Verifikator/PemantauanUdaraEmisiDetail.vue'),
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
      path: '/beranda/LaboratoryView',
      name: 'LaboratoryView',
      component: () => import('@/views/beranda/LaboratoryView.vue'),
    },
    {
      path: '/beranda/IzinLingkunganView',
      name: 'IzinLingkunganView',
      component: () => import('@/views/beranda/IzinLingkunganView.vue'),
    },
    {
      path: '/beranda/BeritaView',
      name: 'BeritaView',
      component: () => import('@/views/beranda/BeritaView.vue'),
    },
    {
      path: '/beranda/ArtikelView',
      name: 'ArtikelView',
      component: () => import('@/views/beranda/ArtikelView.vue'),
    },
    {
      path: '/beranda/DownloadView',
      name: 'DownloadView',
      component: () => import('@/views/beranda/DownloadView.vue'),
    },
    {
      path: '/beranda/PengumumanView',
      name: 'PengumumanView',
      component: () => import('@/views/beranda/PengumumanView.vue'),
    },
    {
      path: '/beranda/AgendaView',
      name: 'AgendaView',
      component: () => import('@/views/beranda/AgendaView.vue'),
    },
    {
      path: '/beranda/Contact',
      name: 'Contact',
      component: () => import('@/views/beranda/Contact.vue'),
    },
    {
      path: '/beranda/ComproStructureView',
      name: 'ComproStructureView',
      component: () => import('@/views/beranda/ComproStructureView.vue'),
    },
    {
      path: '/tiket/Pengaduan',
      name: 'Pengaduan',
      component: () => import('@/views/tiket/Pengaduan.vue'),
    },
    {
      path: '/tiket/PengaduanCreate',
      name: 'PengaduanCreate',
      component: () => import('@/views/tiket/PengaduanCreate.vue'),
    },
    {
      path: '/tiket/PengaduanBaru',
      name: 'PengaduanBaru',
      component: () => import('@/views/tiket/PengaduanBaru.vue'),
    },
    {
      path: '/tiket/PengaduanDetail/:id',
      name: 'PengaduanDetail',
      component: () => import('@/views/tiket/PengaduanDetail.vue'),
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
      path: '/Logbook/IPAL/IPALCreate',
      name: 'IPALCreate',
      component: () => import('@/views/Logbook/IPAL/IPALCreate.vue'),
    },
    {
      path: '/Logbook/IPAL/IPALEdit/:id',
      name: 'IPALEdit',
      component: () => import('@/views/Logbook/IPAL/IPALEdit.vue'),
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
      path: '/Logbook/TPSLimbahB3/TPSLimbahB3Create',
      name: 'TPSLimbahB3Create',
      component: () => import('@/views/Logbook/TPSLimbahB3/TPSLimbahCreate.vue'),
    },
    {
      path: '/Logbook/TPSLimbahB3Edit',
      name: 'TPSLimbahB3Edit',
      component: () => import('@/views/Logbook/TPSLimbahB3/TPSLimbahEdit.vue'),
    },
    {
      path: '/Data/Company',
      name: 'DataCompany',
      component: () => import('@/views/data/Company.vue'),
    },
    {
      path: '/Data/PKKPR',
      name: 'DataPKKPR',
      component: () => import('@/views/data/PKKPR.vue'),
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
      path: '/Pengendalian/PengelolaanLimbahB3',
      name: 'PengendalianPengelolaanLimbahB3',
      component: () => import('@/views/pengendalian/PengelolaanLimbahB3.vue'),
    },
    {
      path: '/Pengendalian/PengelolaanLimbahB3/PengelolaanLimbahB3Create',
      name: 'PengendalianPengelolaanLimbahB3Create',
      component: () => import('@/views/pengendalian/PengelolaanLimbahB3Create.vue'),
    },
    {
      path: '/Pengendalian/PengelolaanLimbahB3/Edit/:id',
      name: 'PengendalianPengelolaanLimbahB3Edit',
      component: () => import('@/views/pengendalian/PengelolaanLimbahB3Edit.vue'),
      props: true,
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
      path: '/Master/Monitoring',
      name: 'MonitoringSwapantauView',
      component: () => import('@/views/Master/MonitoringSwapantau.vue'),
    },
    {
      path: '/Master/User/Create',
      name: 'MasterUserCreateView',
      component: () => import('@/views/Master/UserCreateView.vue'),
    },
    {
      path: '/Master/Operator/Agenda',
      name: 'OperatorAgendaView',
      component: () => import('@/views/Master/Operator/OperatorAgenda.vue'),
    },
    {
      path: '/Master/Operator/Artikel',
      name: 'OperatorArtikelView',
      component: () => import('@/views/Master/Operator/OperatorArtikel.vue'),
    },
    {
      path: '/Master/Operator/Berita',
      name: 'OperatorBeritaView',
      component: () => import('@/views/Master/Operator/OperatorBerita.vue'),
    },
    {
      path: '/Master/Operator/Halaman',
      name: 'OperatorHalamanView',
      component: () => import('@/views/Master/Operator/OperatorHalaman.vue'),
    },
    {
      path: '/Master/Operator/Pengumuman',
      name: 'OperatorPengumumanView',
      component: () => import('@/views/Master/Operator/OperatorPengumuman.vue'),
    },
    {
      path: '/Master/Operator/Kategori',
      name: 'OperatorKategoriView',
      component: () => import('@/views/Master/Operator/OperatorKategori.vue'),
    },
    {
      path: '/Master/Operator/Status',
      name: 'OperatorStatusView',
      component: () => import('@/views/Master/Operator/OperatorStatus.vue'),
    },
    {
      path: '/Master/Operator/Prioritas',
      name: 'OperatorPrioritasView',
      component: () => import('@/views/Master/Operator/OperatorPrioritas.vue'),
    },
    {
      path: '/Master/Operator/EBook',
      name: 'OperatorEBookView',
      component: () => import('@/views/Master/Operator/OperatorEBook.vue'),
    },
    {
      path: '/Master/Operator/Video',
      name: 'OperatorVideoView',
      component: () => import('@/views/Master/Operator/OperatorVideo.vue'),
    },
    {
      path: '/Master/Operator/Download',
      name: 'OperatorDownloadView',
      component: () => import('@/views/Master/Operator/OperatorDownload.vue'),
    },
    {
      path: '/Master/Operator/Link',
      name: 'OperatorLinkView',
      component: () => import('@/views/Master/Operator/OperatorLink.vue'),
    },
    {
      path: '/Master/Operator/Sosmed',
      name: 'OperatorSosmedView',
      component: () => import('@/views/Master/Operator/OperatorSosmed.vue'),
    },
    {
      path: '/Master/Operator/Slide',
      name: 'OperatorSlideView',
      component: () => import('@/views/Master/Operator/OperatorSlide.vue'),
    },
    {
      path: '/Master/Operator/Banner',
      name: 'OperatorBannerView',
      component: () => import('@/views/Master/Operator/OperatorBanner.vue'),
    },
    {
      path: '/Master/Operator/Tiket',
      name: 'OperatorTiketView',
      component: () => import('@/views/Master/Operator/OperatorTiket.vue'),
    },
    {
      path: '/Master/Operator/Galeri',
      name: 'OperatorGaleriView',
      component: () => import('@/views/Master/Operator/OperatorGaleri.vue'),
    },
    {
      path: '/Master/User/:id',
      name: 'MasterUserEditView',
      component: () => import('@/views/Master/UserEditView.vue'),
    },
    {
      path: '/Master/Ipal',
      name: 'MasterIpalView',
      component: () => import('@/views/Master/MasterIpal.vue'),
    },
    {
      path: '/Master/Emisi',
      name: 'MasterEmisiView',
      component: () => import('@/views/Master/MasterEmisi.vue'),
    },
    {
      path: '/Master/LB3',
      name: 'MasterLB3View',
      component: () => import('@/views/Master/MasterLB3.vue'),
    },
    {
      path: '/Pengendalian/PencemaranUdara/TambahUdaraAmbien',
      name: 'TambahUdaraAmbien',
      component: () => import('@/views/pengendalian/pencemaranudara/pencemaranudaraambien.vue'),
    },
    {
      path: '/Pengendalian/PencemaranUdara/TambahUdaraEmisi',
      name: 'TambahUdaraEmisi',
      component: () => import('@/views/pengendalian/pencemaranudara/pencemaranudaraemisi.vue'),
    },
    {
      path: '/Pengendalian/PencemaranUdara/TambahFlyAshBottomAshDanSludge',
      name: 'TambahFlyAshBottomAshDanSludge',
      component: () => import('@/views/pengendalian/pencemaranudara/pencemaranudaraflyash.vue'),
    },
    {
      path: '/Pengendalian/PencemaranUdara/DetailFlyash/:id',
      name: 'PencemaranUdaraDetailFlyash',
      component: () => import('@/views/pengendalian/pencemaranudara/detail/flyash.vue'),
    },
    {
      path: '/Pengendalian/PencemaranUdara/DetailAmbien/:id',
      name: 'PencemaranUdaraDetailAmbien',
      component: () => import('@/views/pengendalian/pencemaranudara/detail/ambien.vue'),
    },
    {
      path: '/Pengendalian/PencemaranUdara/DetailEmisi/:id',
      name: 'PencemaranUdaraDetailEmisi',
      component: () => import('@/views/pengendalian/pencemaranudara/detail/emisi.vue'),
    },
    {
      path: '/Pengendalian/PencemaranUdara/Edit/:id',
      name: 'PencemaranUdaraEdit',
      component: () => import('@/views/pengendalian/pencemaranudara/editpencemaranudara.vue'),
    },
    {
      path: '/Master/Companies',
      name: 'MasterCompaniesView',
      component: () => import('@/views/Master/CompaniesView.vue'),
    },
    {
      path: '/Master/Companies/Create',
      name: 'MasterCompaniesCreateView',
      component: () => import('@/views/Master/CompaniesCreateView.vue'),
    },
    {
      path: '/Master/CompaniesView/:id',
      name: 'MasterCompaniesEditView',
      component: () => import('@/views/Master/CompaniesEditView.vue'),
    },
    {
      path: '/Master/CompaniesView/:id',
      name: 'MasterCompaniesEditView',
      component: () => import('@/views/Master/CompaniesDetailView.vue'),
    },
    {
      path: '/Eksekutif',
      name: 'EksekutifView',
      component: () => import('@/views/EksekutifView.vue'),
    },
    {
      path: '/Eksekutif/Cerobong',
      name: 'CerobongView',
      component: () => import('@/views/Eksekutif/Cerobong.vue'),
    },
    {
      path: '/Eksekutif/PenataanIPAL',
      name: 'PenataanIPALView',
      component: () => import('@/views/Eksekutif/PenataanIPAL.vue'),
    },
    {
      path: '/Eksekutif/RTH',
      name: 'RTHView',
      component: () => import('@/views/Eksekutif/RTH.vue'),
    },
    {
      path: '/Eksekutif/TPSB3',
      name: 'TPSB3View',
      component: () => import('@/views/Eksekutif/TPSB3.vue'),
    },
    {
      path: '/Data/PersLing',
      name: 'PersetujuanLingkunganView',
      component: () => import('@/views/data/persling.vue'),
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

  if (to.path === '/Login' || to.path === '/RegisterCompany' || mainRoutes.includes(to.path)) {
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
