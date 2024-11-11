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
            <h2 class="breadcrumb-title">Pelayanan</h2>
            <nav aria-label="breadcrumb" class="page-breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">
                  Izin Lingkungan
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <div class="content">
      <div class="container">
        <!-- How it works-->
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="work-wrap work-wrap-acc">
              <h1>Izin Lingkungan</h1>
              <p class="justify-text">
                Izin lingkungan adalah izin yang wajib dimiliki setiap orang
                yang melakukan usaha dan/atau kegiatan yang wajib amdal atau
                UKL-UPL dalam rangka perlindungan dan pengelolaan lingkungan
                hidup sebagai prasyarat untuk memperoleh izin usaha dan/atau
                kegiatan. Izin lingkungan dipersyaratkan berdasarkan amanat
                Peraturan Pemerintah No. 27 Tahun 2012.
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="work-img">
              <img src="@/assets/img/labling.jpeg" class="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterHome />
  </main>
</template>
