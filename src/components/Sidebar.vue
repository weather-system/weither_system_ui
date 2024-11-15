<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { getUserStatus } from '@/lib/company.js'
import '@/assets/css/admin.css'

const store = useStore()
const route = useRoute()
const $loading = useLoading()

const isUserPending = ref(false)

const isPengendalianOpen = ref(false)
const isDataOpen = ref(false)
const isMasterOpen = ref(false)
const isLogbookOpen = ref(false)
const isImportLogbookOpen = ref(false)
const isTiketOpen = ref(false)

const dashboardRoute = computed(() => {
  if (store.state.auth.user.role == 'ADMIN') {
    return '/Companies'
  }
  return '/MyCompany'
})

const togglePengendalian = () => {
  console.log('Pengendalian clicked') // Debugging log
  isPengendalianOpen.value = !isPengendalianOpen.value
}
const toggleData = () => {
  console.log('Data clicked') // Debugging log
  isDataOpen.value = !isDataOpen.value
}

const toggleMaster = () => {
  isMasterOpen.value = !isMasterOpen.value
}

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
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
})
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
          <li v-if="store.state.auth.user.role == 'ADMIN'">
            <a
              href="javascript:void(0);"
              @click="toggleMaster"
              :class="{ active: route.path.startsWith('/Master') }"
            >
              <i class="fas fa-book-bookmark"></i>
              <span>Master</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isMasterOpen,
                  'fe-chevron-up': isMasterOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="isMasterOpen" class="submenu d-block ms-4">
                <li>
                  <router-link
                    to="/Master/User"
                    activeClass="active">
                    <i class="fas fa-chevron-right me-2"></i>
                    User</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>

          <li v-if="!isUserPending && store.state.auth.user.role !== 'ADMIN'">
            <a
              href="javascript:void(0);"
              @click="toggleData"
              :class="{ active: route.path.startsWith('/Data') }"
            >
              <i class="fas fa-book-bookmark"></i>
              <span>Data</span>
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
                </li>
              </ul>
            </transition>
          </li>

          <li v-if="!isUserPending && store.state.auth.user.role !== 'ADMIN'">
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

          <li v-if="!isUserPending && store.state.auth.user.role !== 'ADMIN'">
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
                    IPAL</router-link>
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

          <li v-if="!isUserPending && store.state.auth.user.role !== 'ADMIN'">
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

          <li v-if="!isUserPending && store.state.auth.user.role !== 'ADMIN'">
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
                  <router-link to="/tiket/pengaduan-baru">
                    <i class="fas fa-chevron-right me-2"></i>
                    Pengaduan</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
