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
                <li class="breadcrumb-item" aria-current="page">Agenda</li>
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
              <div class="blog-content">
                <div class="blog-category">
                  <ul>
                    <li><span class="cat-blog">Special</span></li>
                    <li><i class="feather-calendar me-1"></i>21 Februari</li>
                  </ul>
                </div>
                <h3 class="blog-title">
                  <a href="blog-details.html">Hari Sampah Nasional</a>
                </h3>
                <p>
                  Hari Sampah Nasional Indonesia, diperingati setiap 21 Februari
                  untuk mengenang tragedi longsornya TPA Leuwigajah pada 2005,
                  menjadi momentum bagi masyarakat untuk meningkatkan kesadaran
                  dan aksi nyata dalam pengelolaan sampah yang berkelanjutan.
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
              <div class="blog-content">
                <div class="blog-category">
                  <ul>
                    <li><span class="cat-blog">Special</span></li>
                    <li><i class="feather-calendar me-1"></i>16 September</li>
                  </ul>
                </div>
                <h3 class="blog-title">
                  <a href="blog-details.html">Hari Ozon Internasional</a>
                </h3>
                <p>
                  Hari Ozon Internasional diperingati setiap 16 September untuk
                  meningkatkan kesadaran global tentang pentingnya lapisan ozon
                  dan mendukung upaya perlindungannya melalui Protokol Montreal
                  agar bumi terlindungi dari dampak sinar ultraviolet berbahaya.
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
              <div class="blog-content">
                <div class="blog-category">
                  <ul>
                    <li><span class="cat-blog">Special</span></li>
                    <li><i class="feather-calendar me-1"></i>10 Agustus</li>
                  </ul>
                </div>
                <h3 class="blog-title">
                  <a href="blog-details.html">Hari Konservasi Alam Nasional</a>
                </h3>
                <p>
                  Hari Konservasi Alam Nasional, yang diperingati setiap 10
                  Agustus di Indonesia, bertujuan untuk meningkatkan kesadaran
                  akan pentingnya pelestarian keanekaragaman hayati dan
                  perlindungan ekosistem demi keberlanjutan alam bagi generasi
                  mendatang.
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
              <div class="blog-content">
                <div class="blog-category">
                  <ul>
                    <li><span class="cat-blog">Spesial</span></li>
                    <li><i class="feather-calendar me-1"></i>5 Juni</li>
                  </ul>
                </div>
                <h3 class="blog-title">
                  <a href="blog-details.html">Hari Lingkungan Hidup</a>
                </h3>
                <p>
                  Hari Lingkungan Hidup Sedunia, diperingati setiap 5 Juni,
                  bertujuan untuk meningkatkan kesadaran dan aksi global dalam
                  melindungi lingkungan dari polusi, perubahan iklim, dan
                  ancaman terhadap keanekaragaman hayati demi keberlanjutan
                  bumi.
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

            <!-- Latest Posts -->
            <div class="card post-widget">
              <div class="card-body">
                <h4 class="side-title">Agenda Terdekat</h4>
                <ul class="latest-posts">
                  <li>
                    <div class="post-info-tes">
                      <p>21 Februari 2025</p>
                      <h4>
                        <a href="blog-details.html"
                          >Hari Sampah Nasional</a
                        >
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div class="post-info-tes">
                      <p>5 Juni 2025</p>
                      <h4>
                        <a href="blog-details.html"
                          >Hari Lingkungan Hidup</a
                        >
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div class="post-info-tes">
                      <p>10 Agustus 2025</p>
                      <h4>
                        <a href="blog-details.html"
                          >Hari Konservasi Alam Nasional</a
                        >
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div class="post-info-tes">
                      <p>16 September 2025</p>
                      <h4>
                        <a href="blog-details.html"
                          >Hari Ozon Internasional</a
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
                  <li><a href="#" class="tag">Special</a></li>
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
