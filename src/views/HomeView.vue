<script setup>
import HeaderHome from '@/components/HeaderHome.vue'
import FooterHome from '@/components/FooterHome.vue'
import '@/assets/css/style.css'
</script>

<style scoped>
@import "@/assets/css/style.css";
</style>

<template>
  <main>
    <HeaderHome />
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

    <FooterHome/>
  </main>
</template>
