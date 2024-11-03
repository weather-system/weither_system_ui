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
              <img
                src="@/assets/img/dlh.jpg"
                class="img-fluid"
                alt="Logo"
              />
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
    <!-- /Header -->

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="home-banner">
          <div class="row align-items-center w-100">
            <div class="col-lg-7 col-md-10 mx-auto">
              <div class="section-search aos" data-aos="fade-up">
                <h1>Professional Services For Your Home & Commercial</h1>
                <p>Search From 100 Awesome Verified Ads!</p>
                <div class="search-box">
                  <form action="search.html">
                    <div class="search-input line">
                      <div class="search-group-icon">
                        <i class="feather-map-pin"></i>
                      </div>
                      <div class="form-group mb-0">
                        <label>Your Location</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="America"
                        />
                      </div>
                    </div>
                    <div class="search-input">
                      <div class="search-group-icon search-icon">
                        <i class="feather-search"></i>
                      </div>
                      <div class="form-group mb-0">
                        <label>What are you looking for?</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Car Repair Services"
                        />
                      </div>
                    </div>
                    <div class="search-btn">
                      <button class="btn btn-primary" type="submit">
                        <i class="feather-search me-2"></i>Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="banner-imgs">
                <div class="banner-1 shape-1">
                  <img
                    class="img-fluid"
                    alt="banner"
                    src="@/assets/img/banner1.png"
                  />
                </div>
                <div class="banner-2 shape-3">
                  <img
                    class="img-fluid"
                    alt="banner"
                    src="@/assets/img/banner2.png"
                  />
                </div>
                <div class="banner-3 shape-3">
                  <img
                    class="img-fluid"
                    alt="banner"
                    src="@/assets/img/banner3.png"
                  />
                </div>
                <div class="banner-4 shape-2">
                  <img
                    class="img-responsive"
                    alt="banner"
                    src="@/assets/img/banner4.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /Hero Section -->

    <!-- Feature Section -->
    <section class="feature-section">
      <div class="container">
        <div class="section-heading">
          <div class="row">
            <div class="col-md-6 aos" data-aos="fade-up">
              <h2>Featured Categories</h2>
              <p>What do you need to find?</p>
            </div>
            <div class="col-md-6 text-md-end aos" data-aos="fade-up">
              <a href="categories.html" class="btn btn-primary btn-view"
                >View All<i class="feather-arrow-right-circle"></i
              ></a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-3">
            <a
              href="service-details.html"
              class="feature-box aos"
              data-aos="fade-up"
            >
              <div class="feature-icon">
                <span>
                  <img src="@/assets/img/icons/feature-icon-01.svg" alt="img" />
                </span>
              </div>
              <h5>Construction</h5>
              <div class="feature-overlay">
                <img src="@/assets/img/services/service-02.jpg" alt="img" />
              </div>
            </a>
          </div>
          <div class="col-md-6 col-lg-3">
            <a
              href="service-details.html"
              class="feature-box aos"
              data-aos="fade-up"
            >
              <div class="feature-icon">
                <span>
                  <img src="@/assets/img/icons/feature-icon-02.svg" alt="img" />
                </span>
              </div>
              <h5>Car Wash</h5>
              <div class="feature-overlay">
                <img src="@/assets/img/feature.jpg" alt="img" />
              </div>
            </a>
          </div>
          <div class="col-md-6 col-lg-3">
            <a
              href="service-details.html"
              class="feature-box aos"
              data-aos="fade-up"
            >
              <div class="feature-icon">
                <span>
                  <img src="@/assets/img/icons/feature-icon-03.svg" alt="img" />
                </span>
              </div>
              <h5>Electrical</h5>
              <div class="feature-overlay">
                <img src="@/assets/img/services/service-01.jpg" alt="img" />
              </div>
            </a>
          </div>
          <div class="col-md-6 col-lg-3">
            <a
              href="service-details.html"
              class="feature-box aos"
              data-aos="fade-up"
            >
              <div class="feature-icon">
                <span>
                  <img src="@/assets/img/icons/feature-icon-04.svg" alt="img" />
                </span>
              </div>
              <h5>Cleaning</h5>
              <div class="feature-overlay">
                <img src="@/assets/img/services/service-09.jpg" alt="img" />
              </div>
            </a>
          </div>
          <div class="col-md-6 col-lg-3">
            <a
              href="service-details.html"
              class="feature-box aos"
              data-aos="fade-up"
            >
              <div class="feature-icon">
                <span>
                  <img src="@/assets/img/icons/feature-icon-05.svg" alt="img" />
                </span>
              </div>
              <h5>Interior</h5>
              <div class="feature-overlay">
                <img src="@/assets/img/services/service-07.jpg" alt="img" />
              </div>
            </a>
          </div>
          <div class="col-md-6 col-lg-3">
            <a
              href="service-details.html"
              class="feature-box aos"
              data-aos="fade-up"
            >
              <div class="feature-icon">
                <span>
                  <img src="@/assets/img/icons/feature-icon-06.svg" alt="img" />
                </span>
              </div>
              <h5>Carpentry</h5>
              <div class="feature-overlay">
                <img src="@/assets/img/services/service-03.jpg" alt="img" />
              </div>
            </a>
          </div>
          <div class="col-md-6 col-lg-3">
            <a
              href="service-details.html"
              class="feature-box aos"
              data-aos="fade-up"
            >
              <div class="feature-icon">
                <span>
                  <img src="@/assets/img/icons/feature-icon-07.svg" alt="img" />
                </span>
              </div>
              <h5>Computer</h5>
              <div class="feature-overlay">
                <img src="@/assets/img/services/service-06.jpg" alt="img" />
              </div>
            </a>
          </div>
          <div class="col-md-6 col-lg-3">
            <a
              href="service-details.html"
              class="feature-box aos"
              data-aos="fade-up"
            >
              <div class="feature-icon">
                <span>
                  <img src="@/assets/img/icons/feature-icon-08.svg" alt="img" />
                </span>
              </div>
              <h5>Plumbing</h5>
              <div class="feature-overlay">
                <img src="@/assets/img/services/service-11.jpg" alt="img" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- /Feature Section -->

    <!-- Work Section -->
    <section class="work-section pt-0">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <div class="section-heading aos" data-aos="fade-up">
              <h2>How It Works</h2>
              <p>Aliquam lorem ante, dapibus in, viverra quis</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="work-box aos" data-aos="fade-up">
              <div class="work-icon">
                <span>
                  <img src="@/assets/img/icons/work-icon.svg" alt="img" />
                </span>
              </div>
              <h5>Choose What To Do</h5>
              <p>
                Lorem ipsum dolor amet, consectetur adipiscing tempor labore et
                dolore magna aliqua.
              </p>
              <h4>01</h4>
            </div>
          </div>
          <div class="col-md-4">
            <div class="work-box aos" data-aos="fade-up">
              <div class="work-icon">
                <span>
                  <img src="@/assets/img/icons/find-icon.svg" alt="img" />
                </span>
              </div>
              <h5>Find What You Want</h5>
              <p>
                Lorem ipsum dolor amet, consectetur adipiscing tempor labore et
                dolore magna aliqua.
              </p>
              <h4>02</h4>
            </div>
          </div>
          <div class="col-md-4">
            <div class="work-box aos" data-aos="fade-up">
              <div class="work-icon">
                <span>
                  <img src="@/assets/img/icons/place-icon.svg" alt="img" />
                </span>
              </div>
              <h5>Amazing Places</h5>
              <p>
                Lorem ipsum dolor amet, consectetur adipiscing tempor labore et
                dolore magna aliqua.
              </p>
              <h4>03</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /Work Section -->

    <!-- Blog Section -->
    <section class="blog-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center aos" data-aos="fade-up">
            <div class="section-heading">
              <h2>Latest Blog</h2>
              <p>Lorem ipsum dolor sit amet, consectetur elit</p>
            </div>
          </div>
        </div>
        <div class="row justify-content-between">
          <div class="col-lg-4 col-md-6 d-flex">
            <div class="blog flex-fill aos" data-aos="fade-up">
              <div class="blog-image">
                <a href="blog-details.html"
                  ><img
                    class="img-fluid"
                    src="@/assets/img/blog/blog-01.jpg"
                    alt="Post Image"
                /></a>
              </div>
              <div class="blog-content">
                <ul class="blog-item">
                  <li><i class="feather-calendar"></i>09 Aug 2022</li>
                  <li>
                    <div class="post-author">
                      <a href="#"
                        ><i class="feather-user"></i><span>Hal Lewis</span></a
                      >
                    </div>
                  </li>
                </ul>
                <h3 class="blog-title">
                  <a href="blog-details.html"
                    >How to Choose a Electrical ServiceProvider?</a
                  >
                </h3>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 d-flex">
            <div class="blog flex-fill aos" data-aos="fade-up">
              <div class="blog-image">
                <a href="blog-details.html"
                  ><img
                    class="img-fluid"
                    src="@/assets/img/blog/blog-02.jpg"
                    alt="Post Image"
                /></a>
              </div>
              <div class="blog-content">
                <ul class="blog-item">
                  <li><i class="feather-calendar"></i>09 Aug 2022</li>
                  <li>
                    <div class="post-author">
                      <a href="#"
                        ><i class="feather-user"></i><span>JohnDoe</span></a
                      >
                    </div>
                  </li>
                </ul>
                <h3 class="blog-title">
                  <a href="blog-details.html"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit</a
                  >
                </h3>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 d-flex">
            <div class="blog flex-fill aos" data-aos="fade-up">
              <div class="blog-image">
                <a href="blog-details.html"
                  ><img
                    class="img-fluid"
                    src="@/assets/img/blog/blog-03.jpg"
                    alt="Post Image"
                /></a>
              </div>
              <div class="blog-content">
                <ul class="blog-item">
                  <li><i class="feather-calendar"></i>09 Aug 2022</li>
                  <li>
                    <div class="post-author">
                      <a href="#"
                        ><i class="feather-user"></i><span>Greg Avery</span></a
                      >
                    </div>
                  </li>
                </ul>
                <h3 class="blog-title">
                  <a href="blog-details.html"
                    >Construction Service Scams: How to Avoid Them</a
                  >
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /Blog Section -->

    <!-- Footer -->
    <footer class="footer">
      <!-- Footer Top -->
      <div class="footer-top aos" data-aos="fade-up">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <!-- Footer logo -->
              <div class="footer-logo">
                <img src="@/assets/img/dlh2.png" alt="Logo" class="footer-logo-img" />
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
                      <span><i class="feather-map-pin"></i></span> Dinas Lingkungan Hidup Gd.C 
                      Lt.4 Komplek Perkantoran Pemkot Cimahi Jl. Rd. Demang Hardjakusumah Cibabat Cimahi
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
                      <a href="https://www.instagram.com/dlh_cimahi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank"
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
