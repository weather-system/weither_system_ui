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
            <router-link to="/home" class="navbar-brand logo">
              <img src="@/assets/img/dlh.jpg" class="img-fluid" alt="Logo" />
            </router-link>
            <router-link to="/home" class="navbar-brand logo-small">
              <img src="@/assets/img/dlh.jpg" class="img-fluid" alt="Logo" />
            </router-link>
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
                  Visi dan Misi
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <div class="content p-0">
      <!-- About -->
      <div class="about-sec">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="about-img">
                <div class="about-exp"></div>
                <div class="abt-img">
                  <img
                    src="@/assets/img/cimahii.png"
                    class="img-fluid"
                    alt="img"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="about-content">
                <h6>TENTANG KAMI</h6>
                <h2>Visi dan Misi</h2>
                <h4>Visi</h4>
                <p>MEWUJUDKAN CIMAHI BARU MAJU, AGAMIS DAN BERBUDAYA</p>
                <h4>Misi</h4>
                <div class="row">
                  <div class="col-md-12">
                    <ul>
                      <li class="custom-icon">
                        Meningkatkan kualitas sumber daya manusia yang
                        berkepribadian, berakhlak mulia, cerdas, sehat dan
                        unggul.
                      </li>
                      <li class="custom-icon">
                        Meningkatkan penyelenggaraan pemerintahan yang amanah,
                        profesional, efektif, efisien, dan ekonomis yang
                        berbasis pada sistem penganggaran yang pro publik dengan
                        3 dimensi:
                        <ol class="numbered-list">
                          <li>
                            Dimensi struktural meliputi tata hubungan antara
                            Pemerintah Pusat dengan Pemerintah Daerah, struktur
                            hubungan antara eksekutif dengan legislatif ataupun
                            struktur hubungan antara pemerintahan dengan
                            masyarakat.
                          </li>
                          <li>
                            Dimensi fungsional yang menyangkut perubahan fungsi
                            yang dijalankan oleh Pemerintah Pusat, Pemerintah
                            Daerah maupun masyarakat dan ketiga, perubahan
                            kultural menyangkut perubahan pada tata nilai dan
                            budaya yang melandasi hubungan kerja intra
                            organisasi, antar organisasi maupun ekstra
                            organisasi, untuk mengendalikan perubahan kultural
                            diperlukan kepemimpinan yang kuat, amanah dan
                            memiliki visi.
                          </li>
                          <li>
                            Dimensi Tata Laksana Pemerintahan harus mampu
                            mewujudkan Kepemerintahan yang Baik (good
                            governance) dan Pemerintahan yang Bersih (clean
                            government), anti korupsi dan bebas KKN, serta
                            menjunjung tinggi prinsip partisipasi, rule of law,
                            transparansi, daya tanggap, berorientasi pada
                            konsensus, keadilan, efektif dan efisien,
                            akuntabilitas serta visi strategis.
                          </li>
                        </ol>
                      </li>
                      <li class="custom-icon">
                        Memberdayakan perekonomian daerah berbasis ekonomi
                        kerakyatan yang berorientasi pada pengembangan sektor
                        jasa berbasis teknologi informasi dan industri kecil
                        menengah dalam upaya pengentasan kemiskinan.
                      </li>
                      <li class="custom-icon">
                        Mewujudkan pembangunan berkelanjutan berwawasan
                        lingkungan meningkatkan kualitas derajat kehidupan
                        masyarakat yang berkeadilan.
                      </li>
                      <li class="custom-icon">
                        Peningkatan kapasitas pemerintahan dan pemberdayaan
                        masyarakat secara berkesinambungan dan berkelanjutan.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /About -->
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
