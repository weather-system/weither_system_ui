<script setup>
import { ref } from 'vue'

// Reactive variables to control the submenu visibility
const isPengendalianOpen = ref(false)
const isLogbookOpen = ref(false)
const isImportLogbookOpen = ref(false)
const isTiketOpen = ref(false)

// Function to toggle the visibility of the submenus
const togglePengendalian = () => {
  console.log('Pengendalian clicked') // Debugging log
  isPengendalianOpen.value = !isPengendalianOpen.value
}

const toggleLogbook = () => {
  isLogbookOpen.value = !isLogbookOpen.value
  isPengendalianOpen.value = false
  isImportLogbookOpen.value = false
  isTiketOpen.value = false
}

const toggleImportLogbook = () => {
  isImportLogbookOpen.value = !isImportLogbookOpen.value
  isPengendalianOpen.value = false
  isLogbookOpen.value = false
  isTiketOpen.value = false
}

const toggleTiket = () => {
  isTiketOpen.value = !isTiketOpen.value
  isPengendalianOpen.value = false
  isLogbookOpen.value = false
  isImportLogbookOpen.value = false
}
</script>

<template>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <a href="/">
          <img src="@/assets/img/logo.svg" class="img-fluid logo" alt="" />
        </a>
        <a href="/">
          <img
            src="@/assets/img/logo-small.svg"
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
            <router-link to="/" class="active">
              <i class="fas fa-tachometer-alt"></i>
              <!-- Dashboard Icon -->
              <span>Dashboard</span>
            </router-link>
          </li>

          <li>
            <a href="javascript:void(0);" @click="togglePengendalian">
              <i class="fas fa-cogs"></i>
              <!-- Pengendalian Icon -->
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
                  <router-link to="/pengendalian/air"
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

          <li>
            <a href="javascript:void(0);" @click="toggleLogbook">
              <i class="fas fa-book"></i>
              <!-- Logbook Icon -->
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
                  <router-link to="/logbook/produksi"
                    >Produksi Senyatanya</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/kimia"
                    >Pemakaian Bahan Kimia</router-link
                  >
                </li>
                <li>
                  <router-link to="/logbook/air">Pemakaian Air</router-link>
                </li>
                <li><a href="sub-service1.html">Debit Outlet IPAL</a></li>
                <li><a href="sub-service1.html">Debit Pemakaian Air</a></li>
                <li><a href="sub-service1.html">IPAL</a></li>
                <li><a href="sub-service1.html">Penggunaan B3</a></li>
                <li><a href="sub-service2.html">TPS Limbah B3</a></li>
              </ul>
            </transition>
          </li>

          <li>
            <a href="javascript:void(0);" @click="toggleImportLogbook">
              <i class="fas fa-file-import"></i>
              <!-- Import Logbook Icon -->
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

          <li>
            <a href="javascript:void(0);" @click="toggleTiket">
              <i class="fas fa-ticket-alt"></i>
              <!-- Tiket Icon -->
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
