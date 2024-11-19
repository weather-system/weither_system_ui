<script setup>
import { ref } from 'vue';
import '@/assets/css/style.css'
const menuOpened = ref(false);
const toggleMenu = () => {
  menuOpened.value = !menuOpened.value;
};
</script>

<style scoped>
@import '@/assets/css/style.css';
</style>

<template>
  <header>
    <div class="container">
      <nav class="navbar navbar-expand-lg header-nav">
        <div class="navbar-header">
          <a id="mobile_btn" href="javascript:void(0);" @click="toggleMenu">
            <span class="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <router-link to="/" class="navbar-brand logo">
            <img src="@/assets/img/dlh.jpg" class="img-fluid" alt="Logo" />
          </router-link>
          <router-link to="/" class="navbar-brand logo-small">
            <img src="@/assets/img/dlh.jpg" class="img-fluid" alt="Logo" />
          </router-link>
        </div>
        <div class="main-menu-wrapper">
          <div class="menu-header">
            <a href="/" class="menu-logo small">
              <img src="@/assets/img/dlh.jpg" class="img-fluid" alt="Logo" />
            </a>
            <a id="menu_close" class="menu-close" href="javascript:void(0);">
              <i class="fas fa-times"></i
            ></a>
          </div>
          <ul class="main-nav">
            <li class="has-submenu">
              <a href="javascript:void(0);"
                >Profile <i class="fas fa-chevron-down"></i
              ></a>
              <ul class="submenu">
                <li>
                  <router-link to="/beranda/ComproView"
                    >Visi dan Misi</router-link
                  >
                </li>
                <li>
                  <router-link to="/beranda/ComproStructureView"
                    >Struktur Organisasi</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="has-submenu">
              <a href="">Pelayanan <i class="fas fa-chevron-down"></i></a>
              <ul class="submenu">
                <li>
                  <router-link to="/beranda/IzinLingkunganView"
                    >Izin Lingkungan</router-link
                  >
                </li>
                <li>
                  <router-link to="/beranda/LaboratoryView"
                    >Laboratorium Lingkungan</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="has-submenu">
              <a href="">Info Publik <i class="fas fa-chevron-down"></i></a>
              <ul class="submenu">
                <li>
                  <router-link to="/beranda/BeritaView">Berita</router-link>
                </li>
                <li>
                  <router-link to="/beranda/AgendaView">Agenda</router-link>
                </li>
                <li>
                  <router-link to="/beranda/ArtikelView">Artikel</router-link>
                </li>
                <li>
                  <router-link to="/beranda/PengumumanView">Pengumuman</router-link>
                </li>
              </ul>
            </li>
            <li class="has-submenu">
              <a href="">Multimedia <i class="fas fa-chevron-down"></i></a>
              <ul class="submenu">
                <li>
                  <router-link to="/beranda/DownloadView">Download</router-link>
                </li>
                <li><a href="contact-us.html">Galeri</a></li>
              </ul>
            </li>
            <li>
              <router-link to="/beranda/Contact">Kontak</router-link>
            </li>
            <li class="nav-item" v-if="menuOpened">
            <router-link class="nav-link header-reg" to="/RegisterCompany"
              >Register</router-link
            >
          </li>
          <li class="nav-item" v-if="menuOpened">
            <router-link class="nav-link header-login" to="/Login">
              <i class=""></i>Login
            </router-link>
          </li>
          </ul>
        </div>
        <ul class="nav header-navbar-rht">
          <li class="nav-item">
            <router-link class="nav-link header-reg" to="/RegisterCompany"
              >Register</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link header-login" to="/Login">
              <i class="fa-regular fa-circle-user me-2"></i>Login
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
