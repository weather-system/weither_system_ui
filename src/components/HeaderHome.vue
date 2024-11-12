<template>
  <header>
      <div class="container">
        <nav class="navbar navbar-expand-lg header-nav">
          <div class="navbar-header">
            <a id="mobile_btn" href="javascript:void(0);">
              <span class="bar-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </a>
            <a href="/" class="dlh">
              <img src="@/assets/img/dlh.jpg" class="img-fluid" alt="Logo" />
            </a>
            <a href="/" class="navbar-brand logo-small">
              <img
                src="@/assets/img/dlh.jpg"
                class="img-fluid"
                alt="Logo"
              />
            </a>
          </div>
          <div class="main-menu-wrapper">
            <div class="menu-header">
              <a href="/" class="menu-logo">
                <img src="@/assets/img/logo.svg" class="img-fluid" alt="Logo" />
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
                  <li><router-link to="/beranda/ComproView">Visi dan Misi</router-link></li>
                  <li><router-link to="/beranda/ComproStructureView">Struktur Organisasi</router-link></li>
                </ul>
              </li>
              <li class="has-submenu">
                <a href="">Pelayanan <i class="fas fa-chevron-down"></i></a>
                <ul class="submenu">
                  <li><a href="customer-dashboard.html">Izin Lingkungan</a></li>
                  <li>
                    <a href="customer-booking.html">Laboratorium Lingkungan</a>
                  </li>
                </ul>
              </li>
              <li class="has-submenu">
                <a href="">Info Publik <i class="fas fa-chevron-down"></i></a>
                <ul class="submenu">
                  <li><a href="provider-dashboard.html">Berita</a></li>
                  <li><a href="provider-services.html">Agenda</a></li>
                  <li><a href="provider-booking.html">Pengumuman</a></li>
                  <li><a href="provider-payout.html">Artikel</a></li>
                </ul>
              </li>
              <li class="has-submenu">
                <a href="">Download <i class="fas fa-chevron-down"></i></a>
                <ul class="submenu">
                  <li><a href="about-us.html">Peraturan Perundang</a></li>
                  <li><a href="contact-us.html">Formulir</a></li>
                </ul>
              </li>
              <li><a href="admin/index.html">Multimedia</a></li>
              <li><a href="admin/index.html">Kontak</a></li>
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
