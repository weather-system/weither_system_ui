<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
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
    const response = await axios.get("/api/tpslimbahb3");
    tpsLimbahB3Data.value = response.data;
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
          <!-- Filter bulan dan tahun -->
          <!-- ... -->
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
                      <RouterLink
                        :to="`/Logbook/TPSLimbahB3/TPSLimbahB3Edit/${data.id}`"
                        class="btn btn-success"
                        >Edit</RouterLink
                      >
                      <button class="btn btn-danger" @click="deleteData(data.id)">
                        Hapus
                      </button>
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
