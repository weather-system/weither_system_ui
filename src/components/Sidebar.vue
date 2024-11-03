<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { getUserStatus } from '@/lib/company.js'

const route = useRoute()
const $loading = useLoading()

const isUserPending = ref(false)

const isPengendalianOpen = ref(false)
const isDataOpen = ref(false)
const isLogbookOpen = ref(false)
const isImportLogbookOpen = ref(false)
const isTiketOpen = ref(false)

const togglePengendalian = () => {
  console.log('Pengendalian clicked') // Debugging log
  isPengendalianOpen.value = !isPengendalianOpen.value
}
const toggleData = () => {
  console.log('Data clicked') // Debugging log
  isDataOpen.value = !isDataOpen.value
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

<template>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <a href="index.html">
          <img src="@/assets/img/dlh2.png" class="img-fluid logo" alt="" />
        </a>
        <a href="index.html">
          <img
            src="@/assets/img/dlh2.png"
            class="img-fluid logo-small"
            alt=""
          />
        </a>
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
            <router-link to="/MyCompany" activeClass="active">
              <i class="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </router-link>
          </li>

          <li v-if="!isUserPending">
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
              <ul v-if="isDataOpen" class="submenu d-block ms-4">
                <!-- <li>
                  <router-link
                    to="/Data/Company"
                    activeClass="active"
                    >Usaha</router-link
                  >
                </li> -->
                <li>
                  <router-link
                    to="/Data/Perizinan"
                    activeClass="active"
                    >Perizinan</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/Data/IPAL"
                    activeClass="active"
                    >IPAL</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/Data/Cerobong"
                    activeClass="active"
                    >Cerobong</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/Data/TPSB3"
                    activeClass="active"
                    >TPS B3</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/Data/SumberAir"
                    activeClass="active"
                    >Sumber Air</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>

          <li v-if="!isUserPending">
            <a
              href="javascript:void(0);"
              @click="togglePengendalian"
              :class="{ active: route.path.startsWith('/Pengendalian') }"
            >
              <i class="fas fa-cogs"></i>
              <span>Pengendalian</span>
              <i
                class="fe"
                :class="{
                  'fe-chevron-down': !isPengendalianOpen,
                  'fe-chevron-up': isPengendalianOpen,
                }"
              ></i>
            </a>
            <transition name="slide-fade">
              <ul v-if="isPengendalianOpen" class="submenu d-block ms-4">
                <li>
                  <router-link
                    to="/Pengendalian/PencemaranAir"
                    activeClass="active"
                    >Pencemaran Air</router-link
                  >
                </li>
                <li>
                  <router-link to="/pengendalian/udara"
                    >Pencemaran Udara</router-link
                  >
                </li>
                <li>
                  <router-link to="/pengendalian/limbah-b3"
                    >Pengelolaan Limbah B3</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>

          <li v-if="!isUserPending">
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
              <ul v-if="isLogbookOpen" class="submenu d-block ms-4">
                <li>
                  <router-link to="/logbook/produksisenyatanya"
                    >Produksi Senyatanya</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/PemakaianBahanKimia"
                    >Pemakaian Bahan Kimia</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/PemakaianAir">Pemakaian Air</router-link>
                </li>
                <li>
                  <router-link to="/logbook/DebitOutletIPAL">Debit Outlet IPAL</router-link>
                </li>
                <li>
                  <router-link to="/logbook/DebitPemakaianAir"
                    >DebitPemakaian Air</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/IPAL"
                    >IPAL</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/PenggunaanB3"
                    >Penggunaan B3</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/TPSLimbahB3"
                    >TPS Limbah B3</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>

          <li v-if="!isUserPending">
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
              <ul v-if="isImportLogbookOpen" class="submenu d-block ms-4">
                <li>
                  <router-link to="/import-logbook/ipal"
                    >Logbook IPAL</router-link
                  >
                </li>
                <li>
                  <router-link to="/import-logbook/limbah-b3"
                    >Logbook Limbah B3</router-link
                  >
                </li>
              </ul>
            </transition>
          </li>

          <li v-if="!isUserPending">
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
              <ul v-if="isTiketOpen" class="submenu d-block ms-4">
                <li>
                  <router-link to="/tiket/pengaduan"
                    >Daftar Pengaduan</router-link
                  >
                </li>
                <li>
                  <router-link to="/tiket/pengaduan-baru"
                    >Pengaduan</router-link
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
