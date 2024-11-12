<script setup>
import HeaderHome from '@/components/HeaderHome.vue'
import FooterHome from '@/components/FooterHome.vue'
import '@/assets/css/style.css'
</script>

<style scoped>
@import '@/assets/css/style.css';
</style>

<template>
  <main>
    <HeaderHome />
    <!-- Breadcrumb -->
    <div class="breadcrumb-bar">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-12">
            <h2 class="breadcrumb-title">Info Publik</h2>
            <nav aria-label="breadcrumb" class="page-breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item" aria-current="page">Berita</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-12">
            <!-- Blog Post -->
            <div class="blog blog-list">
              <div class="blog-image">
                <a href="blog-details.html"
                  ><img
                    class="img-fluid"
                    src="@/assets/img/lh.png"
                    alt="Post Image"
                /></a>
              </div>
              <div class="blog-content">
                <div class="blog-category">
                  <ul>
                    <li><span class="cat-blog">Pemerintah</span></li>
                    <li><i class="feather-calendar me-1"></i>05 November 2024</li>
                  </ul>
                </div>
                <h3 class="blog-title">
                  <a href="blog-details.html"
                    >Kementerian Lingkungan Hidup Soroti Kendala TPPAS Legok
                    Nangka</a
                  >
                </h3>
                <p>
                  Wakil Menteri Lingkungan Hidup atau Wakil Kepala Badan
                  Pengendalian Lingkungan Hidup (Wamen LH/Waka BPLH) Diaz
                  Hendropriyono berkunjung ke Gedung Sate pada Selasa
                  (5/11/2024). Penjabat Gubernur Jabar, Bey Machmudin menyambut
                  kehadirannya untuk bersama membahas percepatan pembangunan
                  Pengolah Sampah Menjadi Energi Listrik (PSEL) Legok Nangka.
                </p>
                <div class="blog-info">
                  <ul>
                    <li>
                      <div class="post-author">
                        <a href="#"
                          ><img
                            src="@/assets/img/profiles/avatar-02.jpg"
                            alt="Post Author"
                          /><span>Admin</span></a
                        >
                      </div>
                    </li>
                    <li>
                      <a href="#"
                        ><i class="feather-thumbs-up me-1"></i>25 Like(s)</a
                      >
                    </li>
                    <li>
                      <a href="#"
                        ><i class="feather-message-circle me-1"></i>20
                        Comment(s)</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /Blog Post -->

            <!-- Blog Post -->
            <div class="blog blog-list">
              <div class="blog-image">
                <a href="blog-details.html"
                  ><img
                    class="img-fluid"
                    src="@/assets/img/blog/blog-07.jpg"
                    alt="Post Image"
                /></a>
              </div>
              <div class="blog-content">
                <div class="blog-category">
                  <ul>
                    <li><span class="cat-blog">Construction</span></li>
                    <li><i class="feather-calendar me-1"></i>28 Sep 2022</li>
                  </ul>
                </div>
                <h3 class="blog-title">
                  <a href="blog-details.html"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua veniam,</a
                  >
                </h3>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa aspernatur aut odit aut fugit, sed quia consequuntur
                  magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <div class="blog-info">
                  <ul>
                    <li>
                      <div class="post-author">
                        <a href="#"
                          ><img
                            src="@/assets/img/profiles/avatar-02.jpg"
                            alt="Post Author"
                          /><span>Admin</span></a
                        >
                      </div>
                    </li>
                    <li>
                      <a href="#"
                        ><i class="feather-thumbs-up me-1"></i>25 Like(s)</a
                      >
                    </li>
                    <li>
                      <a href="#"
                        ><i class="feather-message-circle me-1"></i>20
                        Comment(s)</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /Blog Post -->

            <!-- Blog Post -->
            <div class="blog blog-list">
              <div class="blog-image">
                <a href="blog-details.html"
                  ><img
                    class="img-fluid"
                    src="@/assets/img/blog/blog-06.jpg"
                    alt="Post Image"
                /></a>
              </div>
              <div class="blog-content">
                <div class="blog-category">
                  <ul>
                    <li><span class="cat-blog">Cleaning</span></li>
                    <li><i class="feather-calendar me-1"></i>28 Sep 2022</li>
                  </ul>
                </div>
                <h3 class="blog-title">
                  <a href="blog-details.html"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua veniam,</a
                  >
                </h3>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa aspernatur aut odit aut fugit, sed quia consequuntur
                  magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <div class="blog-info">
                  <ul>
                    <li>
                      <div class="post-author">
                        <a href="#"
                          ><img
                            src="@/assets/img/profiles/avatar-02.jpg"
                            alt="Post Author"
                          /><span>Admin</span></a
                        >
                      </div>
                    </li>
                    <li>
                      <a href="#"
                        ><i class="feather-thumbs-up me-1"></i>25 Like(s)</a
                      >
                    </li>
                    <li>
                      <a href="#"
                        ><i class="feather-message-circle me-1"></i>20
                        Comment(s)</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /Blog Post -->

            <!-- Blog Post -->
            <div class="blog blog-list">
              <div class="blog-image">
                <a href="blog-details.html"
                  ><img
                    class="img-fluid"
                    src="@/assets/img/blog/blog-08.jpg"
                    alt="Post Image"
                /></a>
              </div>
              <div class="blog-content">
                <div class="blog-category">
                  <ul>
                    <li><span class="cat-blog">Carpentry</span></li>
                    <li><i class="feather-calendar me-1"></i>28 Sep 2022</li>
                  </ul>
                </div>
                <h3 class="blog-title">
                  <a href="blog-details.html"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua veniam,</a
                  >
                </h3>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa aspernatur aut odit aut fugit, sed quia consequuntur
                  magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <div class="blog-info">
                  <ul>
                    <li>
                      <div class="post-author">
                        <a href="#"
                          ><img
                            src="@/assets/img/profiles/avatar-02.jpg"
                            alt="Post Author"
                          /><span>Admin</span></a
                        >
                      </div>
                    </li>
                    <li>
                      <a href="javascript:void(0);"
                        ><i class="feather-thumbs-up me-1"></i>35 Like(s)</a
                      >
                    </li>
                    <li>
                      <a href="#"
                        ><i class="feather-message-circle me-1"></i>10
                        Comment(s)</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /Blog Post -->

            <div class="blog-pagination">
              <nav>
                <ul class="pagination justify-content-center">
                  <li class="page-item disabled">
                    <a class="page-link page-prev" href="#" tabindex="-1"
                      ><i class="fa-solid fa-arrow-left me-1"></i> PREV</a
                    >
                  </li>
                  <li class="page-item active">
                    <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">2</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">3</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link page-next" href="#"
                      >NEXT <i class="fa-solid fa-arrow-right ms-1"></i
                    ></a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <!-- Blog Sidebar -->
          <div class="col-lg-4 col-md-12 blog-sidebar theiaStickySidebar">
            <!-- Search -->
            <div class="card search-widget">
              <div class="card-body">
                <form class="search-form">
                  <div class="input-group">
                    <input
                      type="text"
                      placeholder="Search your keyword"
                      class="form-control"
                    />
                    <button type="submit" class="btn btn-primary">
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <!-- /Search -->

            <!-- Categories -->
            <div class="card category-widget">
              <div class="card-body">
                <h4 class="side-title">Categories</h4>
                <ul class="categories">
                  <li><a href="categories.html">Car Wash</a></li>
                  <li><a href="categories.html">Plumbing</a></li>
                  <li><a href="categories.html">Carpenter</a></li>
                  <li><a href="categories.html">Computer Service</a></li>
                </ul>
              </div>
            </div>
            <!-- /Categories -->

            <!-- Latest Posts -->
            <div class="card post-widget">
              <div class="card-body">
                <h4 class="side-title">Latest News</h4>
                <ul class="latest-posts">
                  <li>
                    <div class="post-thumb">
                      <a href="blog-details.html">
                        <img
                          class="img-fluid"
                          src="@/assets/img/services/service-01.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="post-info">
                      <p>06 Nov 2022</p>
                      <h4>
                        <a href="blog-details.html"
                          >Lorem ipsum dolor amet, consectetur adipiscing elit.
                          Amet.</a
                        >
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div class="post-thumb">
                      <a href="blog-details.html">
                        <img
                          class="img-fluid"
                          src="@/assets/img/services/service-02.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="post-info">
                      <p>06 Nov 2022</p>
                      <h4>
                        <a href="blog-details.html"
                          >Lorem ipsum dolor amet, consectetur adipiscing elit.
                          Amet.</a
                        >
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div class="post-thumb">
                      <a href="blog-details.html">
                        <img
                          class="img-fluid"
                          src="@/assets/img/services/service-03.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="post-info">
                      <p>06 Nov 2022</p>
                      <h4>
                        <a href="blog-details.html"
                          >Lorem ipsum dolor amet, consectetur adipiscing elit.
                          Amet.</a
                        >
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div class="post-thumb">
                      <a href="blog-details.html">
                        <img
                          class="img-fluid"
                          src="@/assets/img/services/service-04.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="post-info">
                      <p>06 Nov 2022</p>
                      <h4>
                        <a href="blog-details.html"
                          >Lorem ipsum dolor amet, consectetur adipiscing elit.
                          Amet.</a
                        >
                      </h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- /Latest Posts -->

            <!-- Tags -->
            <div class="card tags-widget">
              <div class="card-body">
                <h4 class="side-title">Tags</h4>
                <ul class="tags">
                  <li><a href="#" class="tag">Consulting</a></li>
                  <li><a href="#" class="tag">Design</a></li>
                </ul>
              </div>
            </div>
            <!-- /Tags -->

            <!-- Archives -->
            <div class="card widget widget-archive mb-0">
              <div class="card-body">
                <h4 class="side-title">Archives</h4>
                <ul>
                  <li><a href="javascript:void(0);">January 2023</a></li>
                </ul>
              </div>
            </div>
            <!-- /Archives -->
          </div>
          <!-- /Blog Sidebar -->
        </div>
      </div>
    </div>
    <FooterHome />
  </main>
</template>
