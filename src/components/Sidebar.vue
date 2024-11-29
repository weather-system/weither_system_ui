<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { getUserStatus, canCreatePemantauan } from '@/lib/company.js'
import '@/assets/css/admin.css'

const store = useStore()
const route = useRoute()
const $loading = useLoading()
const router = useRouter()
const userRole = ref('EKSEKUTIF');

const isUserPending = ref(false)
const canPemantauan = ref(false)


const isPengendalianOpen = ref(false)
const isDataOpen = ref(false)
const isEksekutifOpen = ref(false)

const isperdasOpen = ref(false)
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

const dashboardRoute = computed(() => {
  if (store.state.auth.user.role == 'ADMIN') {
    return '/Admin';
  } else if (store.state.auth.user.role == 'EKSEKUTIF') {
    return '/Eksekutif';
  } else if (store.state.auth.user.role == 'PENGAWAS') {
    return '/Pengawas'
  }
  return '/MyCompany';
});

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
const togglePerDas = () => {
  console.log('Data clicked')
  isperdasOpen.value = !isperdasOpen.value
  router.push({
    path: '/Data/PersLing',
    query: {
      sidebar: 'perscompany'
    }
  });
}
watch(() => route.query.sidebar, (latest,_) =>{
  if (latest=='perscompany'){
    isDataOpen.value=true
    isperdasOpen.value=true
  }
  else {
    isperdasOpen.value=false
  }
}, {
  immediate: true
})
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
            <router-link to="/Verifikator/PemantauanAir" activeClass="active">
              <i class="fas fa-tachometer-alt"></i>
              <span>Pem. Air</span>
            </router-link>
          </li>
          <li v-if="store.state.auth.user.role == 'PENGAWAS'">
            <router-link to="/Verifikator/PemantauanUdaraAmbien" activeClass="active">
              <i class="fas fa-tachometer-alt"></i>
              <span>Pem. Udara Ambien</span>
            </router-link>
          </li>
          <li v-if="store.state.auth.user.role == 'PENGAWAS'">
            <router-link to="/Verifikator/PemantauanUdaraEmisi" activeClass="active">
              <i class="fas fa-tachometer-alt"></i>
              <span>Pem. Udara Emisi</span>
            </router-link>
          </li>
          <li v-if="store.state.auth.user.role == 'ADMIN'">
            <router-link to="/Companies" activeClass="active">
              <i class="fas fa-user-tie"></i>
              <span>Perusahaan Pemohon</span>
            </router-link>
          </li>
          <li v-if="store.state.auth.user.role == 'ADMIN'">
            <a
              href="javascript:void(0);"
              @click="toggleMaster"
              :class="{ active: route.path.startsWith('/Master') }"
            >
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
                  <router-link to="/Master/Companies" activeClass="active">
                    <i class="fas fa-chevron-right"></i>
                    Perusahaan DPMPTSP</router-link
                  >
                </li>
                <li>
                  <router-link to="/Master/Companies" activeClass="active">
                    <i class="fas fa-chevron-right"></i>
                    Izin DPMPTSP</router-link
                  >
                </li>
                <li>
                  <router-link to="/Master/Ipal" activeClass="active">
                    <i class="fas fa-chevron-right"></i>
                    Izin Ipal</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>
          <li v-if="store.state.auth.user.role === 'ADMIN'">
            <a
              href="javascript:void(0);"
              @click="toggleVerifikasi"
              :class="{ active: route.path.startsWith('/Master/Operator') }"
            >
              <i class="fas fa-check"></i>
              <span>Verifikasi</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isVerifikasiOpen,
                  'fe-chevron-up': isVerifikasiOpen,
                }"
              ></i>
            </a>

            <!-- Transisi Submenu -->
            <transition name="slide-fade">
              <ul v-if="isVerifikasiOpen" class="submenu d-block">
                <!-- Swapantau -->
                <li>
                  <a href="javascript:void(0);" @click="toggleSwapantau">
                    <i class="fas fa-chevron-right me-2"></i>
                    <span>Swapantau</span>
                    <i
                      class="fe"
                      :class="{
                        'fe-chevron-down': !isSwapantauOpen,
                        'fe-chevron-up': isSwapantauOpen,
                      }"
                    ></i>
                  </a>
                  <transition name="slide-fade">
                    <ul v-if="isSwapantauOpen" class="submenu d-block ms-3">
                      <li>
                        <router-link
                          to="/Master/Swapantau/Bulanan"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Bulanan
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Swapantau/PPA"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Swapantau PPA
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Swapantau/PPU"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Swapantau PPU
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Swapantau/B3"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Swapantau LB3
                        </router-link>
                      </li>
                    </ul>
                  </transition>
                </li>

                <!-- VerifikasiLog -->
                <li>
                  <a href="javascript:void(0);" @click="toggleVerifikasiLog">
                    <i class="fas fa-chevron-right me-2"></i>
                    <span>Verifikasi Logbook</span>
                    <i
                      class="fe"
                      :class="{
                        'fe-chevron-down': !isVerifikasiLogOpen,
                        'fe-chevron-up': isVerifikasiLogOpen,
                      }"
                    ></i>
                  </a>
                  <transition name="slide-fade">
                    <ul v-if="isVerifikasiLogOpen" class="submenu d-block ms-3">
                      <li>
                        <router-link
                          to="/Master/Verifikasi/pal"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> IPAL
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Verifikasi/lb"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Limbah B3
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Verifikasi/Senyatanya"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Produksi
                          Senyatanya
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Verifikasi/DebitIPAL"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Debit Outlet IPAL
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Verifikasi/DebitAir"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Debit Pemakaian
                          Air
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Verifikasi/IPAL2"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> IPAL
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Verifikasi/PenggunaanB3"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Penggunaan B3
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Verifikasi/TPSB3"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> TPS LB3
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Verifikasi/PengolaB3"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Pengelolaan LB3
                        </router-link>
                      </li>
                    </ul>
                  </transition>
                </li>

                <!-- Monitoring Logbook -->
                <li>
                  <a href="javascript:void(0);" @click="toggleMonitoring">
                    <i class="fas fa-chevron-right me-2"></i>
                    <span>Monitoring Logbook</span>
                    <i
                      class="fe"
                      :class="{
                        'fe-chevron-down': !isMonitoringOpen,
                        'fe-chevron-up': isMonitoringOpen,
                      }"
                    ></i>
                  </a>
                  <transition name="slide-fade">
                    <ul v-if="isMonitoringOpen" class="submenu d-block ms-3">
                      <li>
                        <router-link
                          to="/Master/Monitoring/IPAL"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> IPAL
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          to="/Master/Monitoring/LB3"
                          active-class="active"
                        >
                          <i class="fas fa-chevron-right"></i> Limbah B3
                        </router-link>
                      </li>
                    </ul>
                  </transition>
                </li>
              </ul>
            </transition>
          </li>
          <li v-if="store.state.auth.user.role === 'ADMIN'">
            <router-link to="/Master/Monitoring" activeClass="active"> <!-- GATAU INI ROLE APA -->
              <i class="fas fa-eye"></i>
              <span>Monitoring Swapantau</span>
            </router-link>
          </li>
          <li v-if="store.state.auth.user.role === 'ADMIN'">
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

            <!-- Transisi Submenu -->
            <transition name="slide-fade">
              <ul v-if="isOperatorOpen" class="submenu d-block">
                <!-- Konten -->
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

                <!-- Referensi Tiket -->
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

                <!-- E Learning -->
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

                <!-- Fitur -->
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

                <!-- Tiket -->
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

                <!-- Galeri -->
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
          </li>

          <li v-if="!isUserPending && store.state.auth.user.role == 'USER' && companyDetail">
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
                    style="cursor:pointer"
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
                        <router-link to="/Data/Ipal" activeClass="active">
                          <i class="fas fa-chevron-right"></i>
                          Pertek IPAL</router-link
                        >
                      </li>
                      <li>
                        <router-link to="/Data/Cerobong" activeClass="active">
                          <i class="fas fa-chevron-right"></i>
                          Pertek Emisi</router-link
                        >
                      </li>
                      <li>
                        <router-link to="/Data/TPSB3" activeClass="active">
                          <i class="fas fa-chevron-right"></i>
                          Rintek LB3</router-link
                        >
                      </li>
                    </ul>
                  </transition>
                </li>
                <li>
                  <router-link to="/Data/PKKPR" activeClass="active">
                    <i class="fas fa-chevron-right me-2"></i>
                    PKKPR</router-link
                  >
                </li>
                <li>
                  <router-link to="/Data/PKKPR" activeClass="active">
                    <i class="fas fa-chevron-right me-2"></i>
                    PBG</router-link
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
                    to="/Pengendalian/PencemaranAir"
                    activeClass="active"
                  >
                    <i class="fas fa-chevron-right me-2"></i>
                    <!-- Panah ke kanan -->
                    Pencemaran Air
                  </router-link>
                </li>
                <li>
                  <router-link to="/Pengendalian/PencemaranUdara">
                    <i class="fas fa-chevron-right me-2"></i>
                    <!-- Panah ke kanan -->
                    Pencemaran Udara
                  </router-link>
                </li>
                <li>
                  <router-link to="/pengendalian/PengelolaanLimbahB3">
                    <i class="fas fa-chevron-right me-2"></i>
                    <!-- Panah ke kanan -->
                    Pengelolaan Limbah B3
                  </router-link>
                </li>
              </ul>
            </transition>
          </li>

          <li v-if="!isUserPending && store.state.auth.user.role == 'USER' && companyDetail">
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
                  <router-link to="/logbook/produksisenyatanya">
                    <i class="fas fa-chevron-right me-2"></i>
                    Produksi Senyatanya</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/PemakaianBahanKimia">
                    <i class="fas fa-chevron-right me-2"></i>
                    Pemakaian Kimia</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/PemakaianAir">
                    <i class="fas fa-chevron-right me-2"></i>
                    Pemakaian Air</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/DebitOutletIPAL">
                    <i class="fas fa-chevron-right me-2"></i>
                    Debit Outlet IPAL</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/DebitPemakaianAir">
                    <i class="fas fa-chevron-right me-2"></i>
                    Debit Pemakaian Air</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/IPAL">
                    <i class="fas fa-chevron-right me-2"></i>
                    IPAL</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/PenggunaanB3">
                    <i class="fas fa-chevron-right me-2"></i>
                    Penggunaan B3</router-link
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

          <li v-if="!isUserPending && store.state.auth.user.role == 'USER' && companyDetail">
            <a href="javascript:void(0);" @click="toggleImportLogbook">
              <i class="fas fa-file-import"></i>
              <span>Import Logbook</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isImportLogbookOpen,
                  'fe-chevron-up': isImportLogbookOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="isImportLogbookOpen" class="submenu d-block ms-0">
                <li>
                  <router-link to="/import-logbook/ipal">
                    <i class="fas fa-chevron-right me-2"></i>
                    Logbook IPAL</router-link
                  >
                </li>
                <li>
                  <router-link to="/import-logbook/limbah-b3">
                    <i class="fas fa-chevron-right me-2"></i>
                    Logbook Limbah B3</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>

          <li v-if="!isUserPending && store.state.auth.user.role == 'USER' && companyDetail">
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
                :class="{ 'fe-chevron-down': !isMasterOpen, 'fe-chevron-up': isMasterOpen }"
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
                :class="{ 'fe-chevron-down': !isEksekutifOpen, 'fe-chevron-up': isEksekutifOpen }"
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
                  <router-link to="/Eksekutif/PenaatanIPAL" activeClass="active">
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
