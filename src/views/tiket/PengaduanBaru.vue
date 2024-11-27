<script setup>
import { useRouter } from 'vue-router'; // Impor useRouter untuk mengakses router
import MainWrapper from '@/components/MainWrapper.vue';

const router = useRouter(); // Inisialisasi router

// Fungsi untuk mengarahkan ke halaman /tiket/pengaduancreate
const goToPengaduanCreate = () => {
  router.push('/tiket/pengaduancreate'); // Mengarahkan ke halaman yang dituju
};
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h3>Tiket Pengaduan</h3>
        </div>
        <div class="row">
          <!-- Price List -->
          <div class="col-md-3 d-flex">
            <div class="price-card flex-fill">
              <div class="price-head">
                <h3>Frequently Asked Question</h3>
              </div>
              <div class="price-body">
                <ul>
                  Tiket untuk pertanyaan terkait prosedur atau aturan yang berlaku.
                </ul>
                <div class="text-center">
                  <a
                    href="javascript:void(0);"
                    class="btn btn-choose"
                    @click="goToPengaduanCreate"
                    >Choose</a
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- /Price List -->

          <!-- Price List -->
          <div class="col-md-3 d-flex">
            <div class="price-card flex-fill">
              <div class="price-head">
                <h3>Administrasi Dokumen</h3>
              </div>
              <div class="price-body">
                <ul>
                  Tiket untuk informasi seputar administrasi pengaduan dan dokumen.
                </ul>
                <div class="text-center">
                  <a
                    href="javascript:void(0);"
                    class="btn btn-choose"
                    @click="goToPengaduanCreate"
                    >Choose</a
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- /Price List -->

          <!-- Price List -->
          <div class="col-md-3 d-flex">
            <div class="price-card flex-fill">
              <div class="price-head">
                <h3>Informasi dan Dokumentasi</h3>
              </div>
              <div class="price-body">
                <ul>
                  Tiket untuk permohonan informasi dan dokumentasi sesuai PPID Cimahi.
                </ul>
                <div class="text-center">
                  <a
                    href="javascript:void(0);"
                    class="btn btn-choose"
                    @click="goToPengaduanCreate"
                    >Choose</a
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- /Price List -->

          <!-- Price List -->
          <div class="col-md-3 d-flex">
            <div class="price-card flex-fill">
              <div class="price-head">
                <h3>Pembayaran Biaya Penggandaan</h3>
              </div>
              <div class="price-body">
                <ul>
                  Tiket untuk pengurusan pembayaran biaya penggandaan dokumen.
                </ul>
                <div class="text-center">
                  <a
                    href="javascript:void(0);"
                    class="btn btn-choose"
                    @click="goToPengaduanCreate"
                    >Choose</a
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- /Price List -->
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
