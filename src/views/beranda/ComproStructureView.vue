<script setup>
import HeaderHome from '@/components/HeaderHome.vue'
import '@/assets/css/style.css'
</script>

<style scoped>
@import "@/assets/css/style.css";
</style>

<template>
  <main>
    <HeaderHome />

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
