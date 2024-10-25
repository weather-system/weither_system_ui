<script setup>
import { ref } from 'vue'

// Reactive variables to control the submenu visibility
const isPengendalianOpen = ref(false)
const isLogbookOpen = ref(false)
const isImportLogbookOpen = ref(false)
const isTiketOpen = ref(false)

// Function to toggle the visibility of the submenus
const togglePengendalian = () => {
  isPengendalianOpen.value = !isPengendalianOpen.value
  isLogbookOpen.value = false
  isImportLogbookOpen.value = false
  isTiketOpen.value = false
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
        <a href="index.html">
          <img src="@/assets/img/logo.svg" class="img-fluid logo" alt="" />
        </a>
        <a href="index.html">
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
            <a href="index.html" class="active">
              <i class="fe fe-grid"></i> 
              <span >Dashboard</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);" @click="togglePengendalian">
              <i class="fe fe-briefcase"></i> <span>Pengendalian</span>
              <i class="fe" :class="{'fe-chevron-down': !isPengendalianOpen, 'fe-chevron-up': isPengendalianOpen}"></i>
            </a>
            <!-- Transition for Pengendalian submenu -->
            <transition name="slide-fade">
              <ul v-if="isPengendalianOpen" class="submenu d-block ms-4">
                <li><a href="sub-service1.html">Pencemaran Air</a></li>
                <li><a href="sub-service2.html">Pencemaran Udara</a></li>
                <li><a href="sub-service3.html">Pengelolaan Limbah B3</a></li>
              </ul>
            </transition>
          </li>
          <li>
            <a href="javascript:void(0);" @click="toggleLogbook">
              <i class="fe fe-briefcase"></i> <span>Logbook</span>
              <i class="fe" :class="{'fe-chevron-down': !isLogbookOpen, 'fe-chevron-up': isLogbookOpen}"></i>
            </a>
            <!-- Transition for Logbook submenu -->
            <transition name="slide-fade">
              <ul v-if="isLogbookOpen" class="submenu d-block ms-4">
                <li><a href="sub-service1.html">Produksi Senyatanya</a></li>
                <li><a href="sub-service1.html">Pemakaian Bahan Kimia</a></li>
                <li><a href="sub-service1.html">Pemakaian Air</a></li>
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
              <i class="fe fe-briefcase"></i> <span>Import Logbook</span>
              <i class="fe" :class="{'fe-chevron-down': !isImportLogbookOpen, 'fe-chevron-up': isImportLogbookOpen}"></i>
            </a>
            <!-- Transition for Import Logbook submenu -->
            <transition name="slide-fade">
              <ul v-if="isImportLogbookOpen" class="submenu d-block ms-4">
                <li><a href="sub-service1.html">Logbook IPAL</a></li>
                <li><a href="sub-service2.html">Logbook Limbah B3</a></li>
              </ul>
            </transition>
          </li>
          <li>
            <a href="javascript:void(0);" @click="toggleTiket">
              <i class="fe fe-briefcase"></i> <span>Tiket</span>
              <i class="fe" :class="{'fe-chevron-down': !isTiketOpen, 'fe-chevron-up': isTiketOpen}"></i>
            </a>
            <!-- Transition for Tiket submenu -->
            <transition name="slide-fade">
              <ul v-if="isTiketOpen" class="submenu d-block ms-4">
                <li><a href="sub-service1.html">Daftar Pengaduan</a></li>
                <li><a href="sub-service2.html">Pengaduan</a></li>
              </ul>
            </transition>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
