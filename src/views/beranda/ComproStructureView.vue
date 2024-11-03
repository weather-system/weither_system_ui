<script setup></script>

<template>
  <main>
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
            <a href="index.html" class="navbar-brand logo">
              <img src="@/assets/img/dlh.jpg" class="img-fluid" alt="Logo" />
            </a>
            <a href="index.html" class="navbar-brand logo-small">
              <img src="@/assets/img/dlh.jpg" class="img-fluid" alt="Logo" />
            </a>
          </div>
          <div class="main-menu-wrapper">
            <div class="menu-header">
              <a href="index.html" class="menu-logo">
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
    <!-- /Header -->

    <!-- Breadcrumb -->
    <div class="breadcrumb-bar">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-12">
            <h2 class="breadcrumb-title">Profile</h2>
            <nav aria-label="breadcrumb" class="page-breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/Home">Home</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Struktur Organisasi
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <div class="content p-0">
      
    </div>

    <!-- Footer -->
    <footer class="footer">
      <!-- Footer Top -->
      <div class="footer-top aos" data-aos="fade-up">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <!-- Footer logo -->
              <div class="footer-logo">
                <img
                  src="@/assets/img/dlh2.png"
                  alt="Logo"
                  class="footer-logo-img"
                />
              </div>
              <!-- /Footer logo -->
            </div>
            <div class="col-lg-2 col-md-6">
              <!-- Footer Widget -->
              <div class="footer-widget footer-menu">
                <h2 class="footer-title">Quick Links</h2>
                <ul>
                  <li>
                    <a href="about-us.html">Izin Lingkungan</a>
                  </li>
                  <li>
                    <a href="blog-grid.html">Berita</a>
                  </li>
                  <li>
                    <a href="contact-us.html">Kontak Kami</a>
                  </li>
                  <li>
                    <a href="provider-signup.html">Peraturan Perundangan</a>
                  </li>
                  <li>
                    <a href="user-signup.html">Formulir</a>
                  </li>
                </ul>
              </div>
              <!-- /Footer Widget -->
            </div>
            <div class="col-lg-3 col-md-6">
              <!-- Footer Widget -->
              <div class="footer-widget footer-contact">
                <h2 class="footer-title">Contact Us</h2>
                <div class="footer-contact-info">
                  <div class="footer-address">
                    <p>
                      <span><i class="feather-map-pin"></i></span> Dinas
                      Lingkungan Hidup Gd.C Lt.4 Komplek Perkantoran Pemkot
                      Cimahi Jl. Rd. Demang Hardjakusumah Cibabat Cimahi
                    </p>
                  </div>
                  <p>
                    <span><i class="feather-phone"></i></span> (022) 6632614
                  </p>
                  <p class="mb-0">
                    <span><i class="feather-mail"></i></span>
                    dlh@cimahikota.go.id
                  </p>
                </div>
              </div>
              <!-- /Footer Widget -->
            </div>
            <div class="col-lg-3 col-md-6">
              <!-- Footer Widget -->
              <div class="footer-widget">
                <h2 class="footer-title">Ikuti Kami</h2>
                <div class="social-icon">
                  <ul>
                    <li>
                      <a href="#" target="_blank"
                        ><i class="fa-brands fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/dlh_cimahi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        ><i class="fa-brands fa-instagram"></i
                      ></a>
                    </li>
                    <li>
                      <a href="#" target="_blank"
                        ><i class="fa-brands fa-linkedin"></i
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- /Footer Widget -->
            </div>
          </div>
        </div>
      </div>
      <!-- /Footer Top -->
    </footer>
    <!-- /Footer -->

    <!-- Cursor -->
    <div class="mouse-cursor cursor-outer"></div>
    <div class="mouse-cursor cursor-inner"></div>
    <!-- /Cursor -->
  </main>
</template>
