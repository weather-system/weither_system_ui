<script setup>
import { RouterLink } from 'vue-router'
import MainWrapper from '@/components/MainWrapper.vue'
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>Data Pemantauan Air</h5>

        </div>
        <div class="row">
          <div class="col-12">
            <div class="table-resposnive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Perusahaan</th>
                    <th>Bulan</th>
                    <th>Tahun</th>
                    <th>Jenis Usaha</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PT. Santex</td>
                    <td>Maret</td>
                    <td>2024</td>
                    <td>test</td>
                    <td>Ajuan Baru</td>
                    <td>
                      <RouterLink
                        to="/"
                        class="btn btn-primary"
                        >Verifikasi</RouterLink
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
