<script setup>
import HeaderHome from '@/components/HeaderHome.vue'
import FooterHome from '@/components/FooterHome.vue'
import '@/assets/css/admin.css'

</script>

<style scoped>
@import "@/assets/css/admin.css";
</style>

<template>
  <main>
    <HeaderHome />
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

    <FooterHome/>
  </main>
</template>
