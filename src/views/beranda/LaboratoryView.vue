<script setup>
import HeaderHome from '@/components/HeaderHome.vue'
import FooterHome from '@/components/FooterHome.vue'
import '@/assets/css/admin.css'
</script>

<style scoped>
@import '@/assets/css/admin.css';
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
                  Laboratorium Lingkungan
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
              <!-- <span>01</span> -->
              <h1>Laboratorium Lingkungan</h1>
              <p class="justify-text">
                Unit Pelaksana Teknis Dinas (UPTD) Laboratorium Lingkungan Dinas
                Lingkungan Hidup (DLH) Kota Cimahi bertujuan sebagai penunjang
                kinerja DLH dalam memberikan pelayanan kepada masyarakat,
                khususnya yang berkaitan dengan pengujian parameter kualitas
                lingkungan. UPTD Laboratorium Lingkungan Kota Cimahi telah
                terakreditasi dari Komite Akreditasi Nasional pada tanggal 23
                Agustus 2017 dengan Nomor LP-1138-IDN.
              </p>
              <p>
                Laboratorium Lingkungan Dinas Lingkungan Hidup Kota Cimahi
                beralamat: Jl.Raden Demang Hardjakusumah, Komplek Perkantoran
                Pemerintah Daerah Kota Cimahi, Gedung D, Cimahi-40513 Telp/Fax:
                Telp : (022) 6650060 e-mail: lablinglh@cimahikota.go.id/
                lablingkotacimahi@yahoo.co.id
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
