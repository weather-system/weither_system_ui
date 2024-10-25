<script setup>
import { ref } from 'vue'

// Reactive variables to control the submenu visibility
const isPengendalianOpen = ref(false)
const isLogbookOpen = ref(false)
const isImportLogbookOpen = ref(false)
const isTiketOpen = ref(false)

// Function to toggle the visibility of the submenus
const togglePengendalian = () => {
  console.log("Pengendalian clicked"); // Debugging log
  isPengendalianOpen.value = !isPengendalianOpen.value;
};


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
              <i class="fe fe-grid"></i> <span>Dashboard</span>
            </router-link>
          </li>

          <li>
            <a href="javascript:void(0);" @click="togglePengendalian">
              <i class="fe fe-briefcase"></i> <span>Pengendalian</span>
              <i class="fe" :class="{
                'fe-chevron-down': !isPengendalianOpen,
                'fe-chevron-up': isPengendalianOpen
              }"></i>
            </a>
            <ul v-if="isPengendalianOpen" class="d-block ms-4">
              <li>
                <router-link to="/pengendalian/air">Pencemaran Air</router-link>
              </li>
              <li>
                <router-link to="/pengendalian/udara">Pencemaran Udara</router-link>
              </li>
              <li>
                <router-link to="/pengendalian/limbah-b3">Pengelolaan Limbah B3</router-link>
              </li>
            </ul>
          </li>

          <li>
            <a href="javascript:void(0);" @click="toggleLogbook">
              <i class="fe fe-briefcase"></i> <span>Logbook</span>
              <i class="fe" :class="{
                'fe-chevron-down': !isLogbookOpen,
                'fe-chevron-up': isLogbookOpen
              }"></i>
            </a>
            <ul v-if="isLogbookOpen" class="d-block ms-4">
              <li><router-link to="/logbook/produksi">Produksi Senyatanya</router-link></li>
              <li><router-link to="/logbook/kimia">Pemakaian Bahan Kimia</router-link></li>
              <li><router-link to="/logbook/air">Pemakaian Air</router-link></li>
            </ul>
          </li>

          <li>
            <a href="javascript:void(0);" @click="toggleImportLogbook">
              <i class="fe fe-briefcase"></i> <span>Import Logbook</span>
              <i class="fe" :class="{
                'fe-chevron-down': !isImportLogbookOpen,
                'fe-chevron-up': isImportLogbookOpen
              }"></i>
            </a>
            <ul v-if="isImportLogbookOpen" class="d-block ms-4">
              <li><router-link to="/import-logbook/ipal">Logbook IPAL</router-link></li>
              <li><router-link to="/import-logbook/limbah-b3">Logbook Limbah B3</router-link></li>
            </ul>
          </li>

          <li>
            <a href="javascript:void(0);" @click="toggleTiket">
              <i class="fe fe-briefcase"></i> <span>Tiket</span>
              <i class="fe" :class="{
                'fe-chevron-down': !isTiketOpen,
                'fe-chevron-up': isTiketOpen
              }"></i>
            </a>
            <ul v-if="isTiketOpen" class="d-block ms-4">
              <li><router-link to="/tiket/pengaduan">Daftar Pengaduan</router-link></li>
              <li><router-link to="/tiket/pengaduan-baru">Pengaduan</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

