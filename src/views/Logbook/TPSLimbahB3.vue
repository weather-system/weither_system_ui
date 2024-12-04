<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useLoading } from "vue-loading-overlay";
import MainWrapper from "@/components/MainWrapper.vue";

const $loading = useLoading();

const tpsLimbahB3Data = ref([]);
const selectedMonth = ref("");
const selectedYear = ref("");

onMounted(async () => {
  const loader = $loading.show();
  try {
    // Dummy data, ganti dengan panggilan API Anda
    tpsLimbahB3Data.value = [
      {
        id: 1,
        company: "PT ALLINSTUDIO",
        jenis_lb3: "Limbah A",
        jumlah: "50",
        kemasan: "Drum",
        jenis_transaksi: "Pengiriman",
        tgl_input: "2023-11-20 08:30:00",
      },
      {
        id: 2,
        company: "PT XYZ",
        jenis_lb3: "Limbah B",
        jumlah: "30",
        kemasan: "Kantong",
        jenis_transaksi: "Penerimaan",
        tgl_input: "2023-11-25 14:15:00",
      },
      // Tambahkan data dummy lainnya sesuai kebutuhan
    ];
  } catch (e) {
    console.error(e);
  } finally {
    loader.hide();
  }
});
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div v-if="$loading.isLoading" class="loading-overlay">Loading...</div>

        <div class="content-page-header content-page-headersplit">
          <h5>TPS Limbah B3</h5>
          <div class="list-btn">
            <ul>
              <li>
                <RouterLink
                  class="btn btn-primary"
                  to="/Logbook/TPSLimbahB3/TPSLimbahB3Create"
                >
                  <i class="fa fa-plus me-2"></i>Tambah
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-4">
            <select class="form-select" v-model="selectedMonth">
              <option value="">Pilih Bulan</option>
              <option value="Januari">Januari</option>
              <option value="Februari">Februari</option>
              <option value="Maret">Maret</option>
              <option value="April">April</option>
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
              <option value="Juli">Juli</option>
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
              <option value="November">November</option>
              <option value="Desember">Desember</option>
            </select>
          </div>
          <div class="col-md-4">
            <select class="form-select" v-model="selectedYear">
              <option value="">Pilih Tahun</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <!-- Tambahkan opsi tahun lainnya jika diperlukan -->
            </select>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Tanggal Input</th>
                    <th>Perusahaan</th>
                    <th>Jenis LB3</th>
                    <th>Jumlah</th>
                    <th>Kemasan</th>
                    <th>Jenis Transaksi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in tpsLimbahB3Data" :key="data.id">
                    <td>{{ data.tgl_input }}</td>
                    <td>{{ data.company }}</td>
                    <td>{{ data.jenis_lb3 }}</td>
                    <td>{{ data.jumlah }}</td>
                    <td>{{ data.kemasan }}</td>
                    <td>{{ data.jenis_transaksi }}</td>
                    <td class="d-flex" style="gap: 1rem">
                      <button class="btn btn-success">Edit</button>
                      <button class="btn btn-danger">Hapus</button>
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
