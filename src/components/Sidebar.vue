<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { getUserStatus, canCreatePemantauan, getStatusPertek } from '@/lib/company.js'
import '@/assets/css/admin.css'
import Swal from 'sweetalert2'
const handleNavigation = (event) => {
  if (isUserIpalPending.value) {
    event.preventDefault()
    Swal.fire({
      icon: 'warning',
      title: 'Akses Ditolak',
      text: 'Pertek IPAL Anda Statusnya Pending.',
      confirmButtonText: 'OK'
    })
  }
}
const handleNavigationTpsb3 = (event) => {
  if (isUserTpsb3Pending.value) {
    event.preventDefault()
    Swal.fire({
      icon: 'warning',
      title: 'Akses Ditolak',
      text: 'Rintek LB3 Anda Statusnya Pending.',
      confirmButtonText: 'OK'
    })
  }
}
const store = useStore()
const route = useRoute()
const $loading = useLoading()
const router = useRouter()
const userRole = ref('EKSEKUTIF')

const isUserPending = ref(false)
const isUserIpalPending = ref(false)
const isUserTpsb3Pending = ref(false)
const isUserCerobongPending = ref(false)
const canPemantauan = ref(false)

const isPengendalianOpen = ref(false)
const isDataOpen = ref(false)
const isEksekutifOpen = ref(false)

const isperdasOpen = ref(false)
const ispenudaraOpen = ref(false)
const isMasterOpen = ref(false)
const isOperatorOpen = ref(false)
const isKontenOpen = ref(false)
const isReferensiOpen = ref(false)
const isFiturOpen = ref(false)
const isTiketzOpen = ref(false)
const isLearningOpen = ref(false)
const isLogbookOpen = ref(false)
const isImportLogbookOpen = ref(false)
const isTiketOpen = ref(false)
const isVerifikasiOpen = ref(false)
const isSwapantauOpen = ref(false)
const isMonitoringOpen = ref(false)
const isVerifikasiLogOpen = ref(false)
const isReferensiMasterOpen = ref(false)
const isPPUOpen = ref(false)

const toggleSidebarType = ref('')

const dashboardRoute = computed(() => {
  if (store.state.auth.user.role == 'ADMIN') {
    return '/Admin'
  } else if (store.state.auth.user.role == 'EKSEKUTIF') {
    return '/Eksekutif'
  } else if (store.state.auth.user.role == 'PENGAWAS') {
    return '/Pengawas'
  }
  return '/MyCompany'
})

const toggleSidebar = (v) => {
  if (v == toggleSidebarType.value) {
    toggleSidebarType.value = ''
  } else {
    toggleSidebarType.value = v
  }
}

const togglePengendalian = () => {
  console.log('Pengendalian clicked') // Debugging log
  isPengendalianOpen.value = !isPengendalianOpen.value
}
const toggleData = () => {
  console.log('Data clicked') // Debugging log
  isDataOpen.value = !isDataOpen.value
}

const toggleEksekutif = () => {
  console.log('Eksekutif clicked') // Debugging log
  isEksekutifOpen.value = !isEksekutifOpen.value
}

const toggleMaster = () => {
  isMasterOpen.value = !isMasterOpen.value
}

const toggleOperator = () => {
  isOperatorOpen.value = !isOperatorOpen.value
}
const toggleKonten = () => {
  isKontenOpen.value = !isKontenOpen.value
}
const toggleReferensi = () => {
  isReferensiOpen.value = !isReferensiOpen.value
}
const toggleLearning = () => {
  isLearningOpen.value = !isLearningOpen.value
}
const toggleFitur = () => {
  isFiturOpen.value = !isFiturOpen.value
}
const toggleTiketz = () => {
  isTiketzOpen.value = !isTiketzOpen.value
}
const toggleVerifikasi = () => {
  isVerifikasiOpen.value = !isVerifikasiOpen.value
}
const toggleSwapantau = () => {
  isSwapantauOpen.value = !isSwapantauOpen.value
}
const toggleMonitoring = () => {
  isMonitoringOpen.value = !isMonitoringOpen.value
}
const toggleVerifikasiLog = () => {
  isVerifikasiLogOpen.value = !isVerifikasiLogOpen.value
}
const toggleReferensiMaster = () => {
  isReferensiMasterOpen.value = !isReferensiMasterOpen.value
}
const togglePPU = () => {
  isPPUOpen.value = !isPPUOpen.value
}
const togglePerDas = () => {
  console.log('Data clicked')
  isperdasOpen.value = !isperdasOpen.value
  router.push({
    path: '/Data/PersLing',
    query: {
      sidebar: 'perscompany',
    },
  })
}

const togglePenUdara = (event) => {
  if (isUserCerobongPending.value) {
    event.preventDefault()
    Swal.fire({
      icon: 'warning',
      title: 'Akses Ditolak',
      text: 'Pertek Emisi Anda Statusnya Pending.',
      confirmButtonText: 'OK'
    })
  } else {
    ispenudaraOpen.value = !ispenudaraOpen.value
    console.log(ispenudaraOpen)
    router.push({
      path: '/Pengendalian/PencemaranUdara',
      query: {
        sidebar: 'PencemaranUdara'
      }
    });
  }
}
watch(() => route.query.sidebar, (latest, _) => {
  if (latest === 'perscompany') {
    isDataOpen.value   = true;
    isperdasOpen.value = true;
  } else {
    isperdasOpen.value = false;
  }

  if (latest === 'PencemaranUdara') {
    isPengendalianOpen.value = true;
    ispenudaraOpen.value = true;
  } else {
    ispenudaraOpen.value = false;
  }
}, {
  immediate: true
});

const toggleLogbook = () => {
  isLogbookOpen.value = !isLogbookOpen.value
  isDataOpen.value = false
  isPengendalianOpen.value = false
  isImportLogbookOpen.value = false
  isTiketOpen.value = false
}

const toggleImportLogbook = () => {
  isImportLogbookOpen.value = !isImportLogbookOpen.value
  isDataOpen.value = false
  isPengendalianOpen.value = false
  isLogbookOpen.value = false
  isTiketOpen.value = false
}

const toggleTiket = () => {
  isTiketOpen.value = !isTiketOpen.value
  isDataOpen.value = false
  isPengendalianOpen.value = false
  isLogbookOpen.value = false
  isImportLogbookOpen.value = false
}

onMounted(async () => {
  const loader = $loading.show()
  try {
    const dataa = await getStatusPertek()
    console.log(dataa);
    if (dataa?.company_ipals?.includes('PENDING')) {
      isUserIpalPending.value = true;
    }
    if (dataa?.company_cerobongs?.includes('PENDING')) {
      isUserCerobongPending.value = true;
    }
    if (dataa?.company_tps_b3_s?.includes('PENDING')) {
      isUserTpsb3Pending.value = true;
    }
    const data = await getUserStatus()
    if (data.status === 'PENDING') {
      isUserPending.value = true
    }

    await fetchUserStatus()
    const canPemantauanResult = await canCreatePemantauan()
    canPemantauan.value = canPemantauanResult.result
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
})

const companyDetail = ref(false)
const fetchUserStatus = async () => {
  const token = localStorage.getItem('TOKEN')
  if (!token) return

  try {
    const response = await axios.get('/api/user/status', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    companyDetail.value = response.data.detail
  } catch (error) {
    console.error('Error fetching user status:', error)
  }
}
</script>

<style scoped>
@import '@/assets/css/admin.css';
</style>

<template>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <router-link to="/MyCompany">
          <img
            src="@/assets/img/dlh2.png"
            class="img-fluid logo"
            alt=""
            style="max-width: 80%; height: auto"
          />
        </router-link>
        <router-link to="/MyCompany">
          <img
            src="@/assets/img/dlh2.png"
            class="img-fluid logo-small"
            alt=""
          />
        </router-link>
      </div>
      <div class="siderbar-toggle">
        <label class="switch" id="toggle_btn">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div class="sidebar-inner slimscroll">
      <div id="sidebar-menu" class="sidebar-menu">
        <ul>
          <li class="menu-title m-0">
            <h6>Home</h6>
          </li>
          <li>
            <router-link :to="dashboardRoute" activeClass="active">
              <i class="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li v-if="store.state.auth.user.role == 'PENGAWAS'">
            <router-link to="/Verifikator/PertekIPAL" activeClass="active">
              <i class="fas fa-tachometer-alt"></i>
              <span>Pertek IPAL</span>
            </router-link>
          </li>
          <li v-if="store.state.auth.user.role == 'PENGAWAS'">
            <router-link to="/Verifikator/PertekEmisi" activeClass="active">
              <i class="fas fa-tachometer-alt"></i>
              <span>Pertek Emisi</span>
            </router-link>
          </li>
          <li v-if="store.state.auth.user.role == 'PENGAWAS'">
            <router-link to="/Verifikator/RintekLB3" activeClass="active">
              <i class="fas fa-tachometer-alt"></i>
              <span>Rintek LB3</span>
            </router-link>
          </li>
          <li v-if="store.state.auth.user.role == 'PENGAWAS'">
            <router-link to="/Verifikator/PemantauanAir" activeClass="active">
              <i class="fas fa-tachometer-alt"></i>
              <span>Pem. Air</span>
            </router-link>
          </li>
          <li v-if="store.state.auth.user.role == 'PENGAWAS'">
            <router-link
              to="/Verifikator/PemantauanUdaraAmbien"
              activeClass="active"
            >
              <i class="fas fa-tachometer-alt"></i>
              <span>Pem. Udara Ambien</span>
            </router-link>
          </li>
          <li v-if="store.state.auth.user.role == 'PENGAWAS'">
            <router-link
              to="/Verifikator/PemantauanUdaraEmisi"
              activeClass="active"
            >
              <i class="fas fa-tachometer-alt"></i>
              <span>Pem. Udara Emisi</span>
            </router-link>
          </li>
          <!-- <li v-if="store.state.auth.user.role == 'ADMIN'">
            <router-link to="/Companies" activeClass="active">
              <i class="fas fa-user-tie"></i>
              <span>Perusahaan Pemohon</span>
            </router-link>
          </li> -->
          <li v-if="store.state.auth.user.role == 'ADMIN'">
            <a href="javascript:void(0);" @click="toggleMaster">
              <i class="fas fa-book-bookmark"></i>
              <span>Data Master</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isMasterOpen,
                  'fe-chevron-up': isMasterOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="isMasterOpen" class="submenu d-block">
                <li>
                  <router-link to="/Master/User" activeClass="active">
                    <i class="fas fa-chevron-right"></i>
                    User</router-link
                  >
                </li>
                <li>
                  <router-link to="/Master/Companies" activeClass="active">
                    <i class="fas fa-chevron-right"></i>
                    Perusahaan</router-link
                  >
                </li>
                <li>
                  <router-link to="/Master/Ipal" activeClass="active">
                    <i class="fas fa-chevron-right"></i>
                    Pertek Ipal</router-link
                  >
                </li>
                <li>
                  <router-link to="/Master/Emisi" activeClass="active">
                    <i class="fas fa-chevron-right"></i>
                    Pertek Emisi</router-link
                  >
                </li>
                <li>
                  <router-link to="/Master/LB3" activeClass="active">
                    <i class="fas fa-chevron-right"></i>
                    Rintek LB3</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>
          <li v-if="store.state.auth.user.role == 'ADMIN'">
            <a href="javascript:void(0);" @click="toggleSidebar('Data Pelaku Usaha')">
              <i class="fas fa-book-bookmark"></i>
              <span>Data Pelaku Usaha</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isMasterOpen,
                  'fe-chevron-up': isMasterOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="toggleSidebarType == 'Data Pelaku Usaha'" class="submenu d-block">
                <li>
                  <router-link :to="{
                      path: '/Companies',
                      query: {
                        status: 'diterima'
                      }
                    }" :class="{'active': route.path == '/Companies' && route.query.status == 'diterima'}">
                    <i class="fas fa-chevron-right"></i>
                    Pelaku Usaha Terverifikasi</router-link
                  >
                </li>
                <li>
                  <router-link :to="{
                      path: '/Companies',
                      query: {
                        status: 'pending'
                      }
                      }" :class="{'active': route.path == '/Companies' && route.query.status == 'pending'}">
                    <i class="fas fa-chevron-right"></i>
                    Permohonan Akun Perusahaan</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>
          <li v-if="store.state.auth.user.role == 'ADMIN'">
            <a href="javascript:void(0);" @click="toggleSidebar('Rincian Teknis Limbah B3')">
              <i class="fas fa-book-bookmark"></i>
              <span>Rincian Teknis Limbah B3</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isMasterOpen,
                  'fe-chevron-up': isMasterOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="toggleSidebarType == 'Rincian Teknis Limbah B3'" class="submenu d-block">
                <li>
                  <router-link to="/" active-class="active">
                    <i class="fas fa-chevron-right"></i>
                    Jenis Limbah B3</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>
          <li v-if="store.state.auth.user.role == 'ADMIN'">
            <a href="javascript:void(0);" @click="toggleSidebar('Persetujuan Teknis IPAL')">
              <i class="fas fa-book-bookmark"></i>
              <span>Persetujuan Teknis IPAL</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isMasterOpen,
                  'fe-chevron-up': isMasterOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="toggleSidebarType == 'Persetujuan Teknis IPAL'" class="submenu d-block">
                <li>
                  <router-link :to="{
                      path: '/ReferensiBakuMutu',
                      query: {
                        jenis_baku_mutu: 'IPAL'
                      }
                    }" active-class="active">
                    <i class="fas fa-chevron-right"></i>
                    Referensi Baku Mutu IPAL</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>
          <li v-if="store.state.auth.user.role == 'ADMIN'">
            <a href="javascript:void(0);" @click="toggleSidebar('Persetujuan Teknis Emisi')">
              <i class="fas fa-book-bookmark"></i>
              <span>Persetujuan Teknis Emisi</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isMasterOpen,
                  'fe-chevron-up': isMasterOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="toggleSidebarType == 'Persetujuan Teknis Emisi'" class="submenu d-block">
                <li>
                  <router-link :to="{
                      path: '/ReferensiBakuMutu',
                      query: {
                        jenis_baku_mutu: 'Udara'
                      }
                    }" active-class="active">
                    <i class="fas fa-chevron-right"></i>
                    Referensi Baku Mutu Emisi</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>
          <!-- <li v-if="store.state.auth.user.role === 'ADMIN'">
            <a href="javascript:void(0);" @click="toggleVerifikasi">
              <i class="fas fa-check"></i>
              <span>Referensi Baku Mutu</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isVerifikasiOpen,
                  'fe-chevron-up': isVerifikasiOpen,
                }"
              ></i>
            </a>

            <transition name="slide-fade">
              <ul v-if="isVerifikasiOpen" class="submenu d-block">
                <li>
                  <router-link
                    to="/Master/Swapantau/Bulanan"
                    active-class="active"
                  >
                    <i class="fas fa-chevron-right"></i> Limbah Domestik
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/Master/Swapantau/Bulanan"
                    active-class="active"
                  >
                    <i class="fas fa-chevron-right"></i> Limbah Industri
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/Master/Swapantau/Bulanan"
                    active-class="active"
                  >
                    <i class="fas fa-chevron-right"></i> Limbah Integrasi
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/Master/Swapantau/Bulanan"
                    active-class="active"
                  >
                    <i class="fas fa-chevron-right"></i> Udara Ambien
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/Master/Swapantau/Bulanan"
                    active-class="active"
                  >
                    <i class="fas fa-chevron-right"></i> Udara Emisi
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/Master/Swapantau/Bulanan"
                    active-class="active"
                  >
                    <i class="fas fa-chevron-right"></i> Kebisingan
                  </router-link>
                </li>
              </ul>
            </transition>
          </li> -->
          <!-- <li v-if="store.state.auth.user.role === 'ADMIN'">
            <router-link to="/Master/Monitoring" activeClass="active">
              <i class="fas fa-eye"></i>
              <span>Monitoring Swapantau</span>
            </router-link>
          </li> -->
          <!-- <li v-if="store.state.auth.user.role === 'ADMIN'">
            <a
              href="javascript:void(0);"
              @click="toggleOperator"
              :class="{ active: route.path.startsWith('/Master/Operator') }"
            >
              <i class="fas fa-user-cog"></i>
              <span>Website Operator</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isOperatorOpen,
                  'fe-chevron-up': isOperatorOpen,
                }"
              ></i>
            </a>

            <transition name="slide-fade">
              <ul v-if="isOperatorOpen" class="submenu d-block">
                <li>
                  <a href="javascript:void(0);" @click="toggleKonten">
                    <i class="fas fa-chevron-right me-2"></i>
                    <span>Konten</span>
                    <i
                      class="fe"
                      :class="{
                        'fe-chevron-down': !isKontenOpen,
                        'fe-chevron-up': isKontenOpen,
                      }"
                    ></i>
                  </a>
                  <transition name="slide-fade">
                    <ul v-if="isKontenOpen" class="submenu d-block ms-3">
                      <li>
                        <router-link
                          to="/Master/Operator/Berita"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Berita
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Operator/Artikel"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Artikel
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Operator/Agenda"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Agenda
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Operator/Pengumuman"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Pengumuman
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Operator/Halaman"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Halaman
                        </router-link>
                      </li>
                    </ul>
                  </transition>
                </li>

                <li>
                  <a href="javascript:void(0);" @click="toggleReferensi">
                    <i class="fas fa-chevron-right me-2"></i>
                    <span>Referensi Tiket</span>
                    <i
                      class="fe"
                      :class="{
                        'fe-chevron-down': !isReferensiOpen,
                        'fe-chevron-up': isReferensiOpen,
                      }"
                    ></i>
                  </a>
                  <transition name="slide-fade">
                    <ul v-if="isReferensiOpen" class="submenu d-block ms-3">
                      <li>
                        <router-link
                          to="/Master/Operator/Kategori"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Kategori Tiket
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Operator/Status"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Status Tiket
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Operator/Prioritas"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Prioritas Tiket
                        </router-link>
                      </li>
                    </ul>
                  </transition>
                </li>

                <li>
                  <a href="javascript:void(0);" @click="toggleLearning">
                    <i class="fas fa-chevron-right me-2"></i>
                    <span>E-Learning</span>
                    <i
                      class="fe"
                      :class="{
                        'fe-chevron-down': !isLearningOpen,
                        'fe-chevron-up': isLearningOpen,
                      }"
                    ></i>
                  </a>
                  <transition name="slide-fade">
                    <ul v-if="isLearningOpen" class="submenu d-block ms-3">
                      <li>
                        <router-link
                          to="/Master/Operator/EBook"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> E-Book
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Operator/Video"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Video
                        </router-link>
                      </li>
                    </ul>
                  </transition>
                </li>

                <li>
                  <a href="javascript:void(0);" @click="toggleFitur">
                    <i class="fas fa-chevron-right me-2"></i>
                    <span>Fitur</span>
                    <i
                      class="fe"
                      :class="{
                        'fe-chevron-down': !isFiturOpen,
                        'fe-chevron-up': isFiturOpen,
                      }"
                    ></i>
                  </a>
                  <transition name="slide-fade">
                    <ul v-if="isFiturOpen" class="submenu d-block ms-3">
                      <li>
                        <router-link
                          to="/Master/Operator/Download"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Download
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Operator/Link"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Link Terkait
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Operator/Sosmed"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Link Sosmed
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Operator/Slide"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Slide
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Operator/Banner"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Banner
                        </router-link>
                      </li>
                    </ul>
                  </transition>
                </li>

                <li>
                  <a href="javascript:void(0);" @click="toggleTiketz">
                    <i class="fas fa-chevron-right me-2"></i>
                    <span>Tiket</span>
                    <i
                      class="fe"
                      :class="{
                        'fe-chevron-down': !isTiketzOpen,
                        'fe-chevron-up': isTiketzOpen,
                      }"
                    ></i>
                  </a>
                  <transition name="slide-fade">
                    <ul v-if="isTiketzOpen" class="submenu d-block ms-3">
                      <li>
                        <router-link
                          to="/Master/Operator/Tiket"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Daftar Tiket
                        </router-link>
                      </li>
                    </ul>
                  </transition>
                </li>

                <li>
                  <router-link
                    to="/Master/Operator/Galeri"
                    activeClass="active"
                  >
                    <i class="fas fa-chevron-right me-2"></i>
                    Galeri</router-link
                  >
                </li>
              </ul>
            </transition>
          </li> -->

          <li
            v-if="
              !isUserPending &&
              store.state.auth.user.role == 'USER' &&
              companyDetail
            "
          >
            <a
              href="javascript:void(0);"
              @click="toggleData"
              :class="{ active: route.path.startsWith('/Data') }"
            >
              <i class="fas fa-book-bookmark"></i>
              <span>Persyaratan Dasar</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isDataOpen,
                  'fe-chevron-up': isDataOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="isDataOpen" class="submenu d-block ms-0">
                <!-- <li>
                  <router-link
                    to="/Data/Company"
                    activeClass="active"
                    >Usaha</router-link
                  >
                </li> -->
                <li>
                  <a
                    @click="togglePerDas"
                    :class="{ active: route.path.startsWith('/Data/Persling') }"
                    style="cursor: pointer"
                  >
                    <i class="fas fa-chevron-right me-2"></i>
                    <span>Pers. Lingkungan</span>
                    <i
                      class="fe"
                      :class="{
                        'fe-chevron-down': !isperdasOpen,
                        'fe-chevron-up': isperdasOpen,
                      }"
                    ></i>
                  </a>
                  <transition name="slide-fade">
                    <ul
                      v-if="isDataOpen && isperdasOpen"
                      class="submenu d-block ms-3"
                    >
                      <li>
                        <router-link to="/Data/Ipal?sidebar=perscompany" activeClass="active">
                          <i class="fas fa-chevron-right"></i>
                          Pertek IPAL</router-link
                        >
                      </li>
                      <li>
                        <router-link to="/Data/Cerobong?sidebar=perscompany" activeClass="active">
                          <i class="fas fa-chevron-right"></i>
                          Pertek Emisi</router-link
                        >
                      </li>
                      <li>
                        <router-link to="/Data/TPSB3?sidebar=perscompany" activeClass="active">
                          <i class="fas fa-chevron-right"></i>
                          Rintek LB3</router-link
                        >
                      </li>
                    </ul>
                  </transition>
                </li>
                <li>
                  <router-link to="/Data/PKKPR" activeClass="active">
                    <i class="fas fa-chevron-right me-2"></i>PKKPR</router-link
                  >
                </li>
                <li>
                  <router-link to="/Data/PKKPR" activeClass="active">
                    <i class="fas fa-chevron-right me-2"></i>PBG</router-link
                  >
                </li>
                <!-- <li>
                  <router-link to="/Data/Perizinan" activeClass="active">
                    <i class="fas fa-chevron-right me-2"></i>
                    Perizinan</router-link
                  >
                </li>
                <li>
                  <router-link to="/Data/IPAL" activeClass="active">
                    <i class="fas fa-chevron-right me-2"></i>
                    IPAL</router-link
                  >
                </li>
                <li>
                  <router-link to="/Data/Cerobong" activeClass="active">
                    <i class="fas fa-chevron-right me-2"></i>
                    Cerobong</router-link
                  >
                </li>
                <li>
                  <router-link to="/Data/TPSB3" activeClass="active">
                    <i class="fas fa-chevron-right me-2"></i>
                    TPS B3</router-link
                  >
                </li>
                <li>
                  <router-link to="/Data/SumberAir" activeClass="active">
                    <i class="fas fa-chevron-right me-2"></i>
                    Sumber Air</router-link
                  >
                </li> -->
              </ul>
            </transition>
          </li>

          <li
            v-if="
              !isUserPending &&
              store.state.auth.user.role !== 'ADMIN' &&
              canPemantauan
            "
          >
            <a
              href="javascript:void(0);"
              @click="togglePengendalian"
              :class="{ active: route.path.startsWith('/Pengendalian') }"
            >
              <i class="fas fa-cogs"></i>
              <span>Pemantauan</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isPengendalianOpen,
                  'fe-chevron-up': isPengendalianOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="isPengendalianOpen" class="submenu d-block ms-0">
                <li>
                  <router-link
                    :to="!isUserIpalPending ? '/Pengendalian/PencemaranAir' : ''"
                    @click="handleNavigation"
                    tag="span"
                  >
                    <i class="fas fa-chevron-right me-2"></i>Pencemaran Air
                  </router-link>
                </li>
                <li>
                  <a
                    @click="togglePenUdara"

                    :to="!isUserCerobongPending ? '/Pengendalian/PencemaranUdara' : ''"
                    style="cursor:pointer"
                  >
                    <i class="fas fa-chevron-right me-2"></i>
                    <span>Pencemaran Udara</span>
                    <i
                      class="fe"
                      :class="{
                        'fe-chevron-down': !ispenudaraOpen,
                        'fe-chevron-up': ispenudaraOpen,
                      }"
                    ></i>
                  </a>
                  <transition name="slide-fade">
                    <ul
                      v-if="isPengendalianOpen && ispenudaraOpen"
                      class="submenu d-block ms-3"
                    >
                      <li>
                        <router-link to="/Pengendalian/PencemaranUdara/TambahUdaraEmisi?sidebar=PencemaranUdara" activeClass="active">
                          <i class="fas fa-chevron-right"></i>
                          Emisi</router-link
                        >
                      </li>
                      <li>
                        <router-link to="/Pengendalian/PencemaranUdara/TambahUdaraAmbien?sidebar=PencemaranUdara" activeClass="active">
                          <i class="fas fa-chevron-right"></i>
                          Ambien</router-link
                        >
                      </li>
                    </ul>
                  </transition>
                </li>

                <li>
                  <router-link
                    :to="!isUserTpsb3Pending ? '/pengendalian/PengelolaanLimbahB3' : ''"
                    @click="handleNavigationTpsb3"
                    tag="span">
                    <i class="fas fa-chevron-right me-2"></i>Pengelolaan Limbah B3
                  </router-link>
                </li>
              </ul>
            </transition>
          </li>

          <li
            v-if="
              !isUserPending &&
              store.state.auth.user.role == 'USER' &&
              companyDetail
            "
          >
            <a href="javascript:void(0);" @click="toggleLogbook">
              <i class="fas fa-book"></i>
              <span>Logbook</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isLogbookOpen,
                  'fe-chevron-up': isLogbookOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="isLogbookOpen" class="submenu d-block ms-0">
                <li>
                  <router-link to="/logbook/IPAL">
                    <i class="fas fa-chevron-right me-2"></i>
                    IPAL</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/TPSLimbahB3">
                    <i class="fas fa-chevron-right me-2"></i>
                    TPS Limbah B3</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>

          <li
            v-if="
              !isUserPending &&
              store.state.auth.user.role == 'USER' &&
              companyDetail
            "
          >
          </li>

          <li
            v-if="
              !isUserPending &&
              store.state.auth.user.role == 'USER' &&
              companyDetail
            "
          >
            <a href="javascript:void(0);" @click="toggleTiket">
              <i class="fas fa-ticket-alt"></i>
              <span>Tiket</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isTiketOpen,
                  'fe-chevron-up': isTiketOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="isTiketOpen" class="submenu d-block ms-0">
                <li>
                  <router-link to="/tiket/pengaduan">
                    <i class="fas fa-chevron-right me-2"></i>
                    Daftar Pengaduan</router-link
                  >
                </li>
                <li>
                  <router-link to="/tiket/pengaduanbaru">
                    <i class="fas fa-chevron-right me-2"></i>
                    Pengaduan</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>
          <li v-if="store.state.auth.user.role === 'EKSEKUTIF'">
            <a href="javascript:void(0);" @click="toggleMaster">
              <i class="fas fa-database"></i>
              <span>Master Data</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isMasterOpen,
                  'fe-chevron-up': isMasterOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="isMasterOpen" class="submenu d-block">
                <li>
                  <router-link to="/Eksekutif/MasterData" activeClass="active">
                    <i class="fas fa-table"></i>
                    Rekap Tabel Master Data
                  </router-link>
                </li>
              </ul>
            </transition>
          </li>

          <li v-if="store.state.auth.user.role === 'EKSEKUTIF'">
            <a href="javascript:void(0);" @click="toggleEksekutif">
              <i class="fas fa-map-marker-alt"></i>
              <span>Sebaran Titik</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isEksekutifOpen,
                  'fe-chevron-up': isEksekutifOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="isEksekutifOpen" class="submenu d-block">
                <li>
                  <router-link to="/Eksekutif/TPSB3" activeClass="active">
                    <i class="fas fa-map-pin"></i>
                    Titik TPS B3
                  </router-link>
                </li>
                <li>
                  <router-link to="/Eksekutif/Cerobong" activeClass="active">
                    <i class="fas fa-smog"></i>
                    Titik Cerobong
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/Eksekutif/PenaatanIPAL"
                    activeClass="active"
                  >
                    <i class="fas fa-water"></i>
                    Titik Penaatan IPAL
                  </router-link>
                </li>
                <li>
                  <router-link to="/Eksekutif/RTH" activeClass="active">
                    <i class="fas fa-tree"></i>
                    Luasan RTH Privat
                  </router-link>
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
