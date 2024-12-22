<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";
import { useLoading } from "vue-loading-overlay";
import MainWrapper from "@/components/MainWrapper.vue";
import { deleteTpsB3, getTpsB3 } from '@/lib/tpslimbahb3'
import Swal from "sweetalert2";

const $loading = useLoading();
const tpsLimbahB3Data = ref([]);

const fetchData = async () => {
  const loader = $loading.show()
  try {
    const response = await axios.get("/api/tpslimbahb3");
    tpsLimbahB3Data.value = response.data;
  } catch (e) {
    console.error(e);
  } finally {
    loader.hide();
  }
}

const deleteData = async (id) => {
  const { isConfirmed } = await Swal.fire({
    title: 'Apa kamu yakin ?',
    text: 'Kamu tidak akan bisa mengembalikan ini!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-secondary',
    },
    buttonsStyling: false,
  })

  if (isConfirmed) {
    const loader = $loading.show()
  try {
    await deleteTpsB3(id)
    await fetchData()
    Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}
}
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

const limbahMasuk = computed(() =>
  tpsLimbahB3Data.value.filter((data) => data.jenis === "Limbah Masuk")
);

const limbahKeluar = computed(() =>
  tpsLimbahB3Data.value.filter((data) => data.jenis === "Limbah Keluar")
);
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit mb-2">
          <h3>Data Logbook TPS Limbah B3</h3>
          <div class="list-btn">
            <ul>
              <li>
                <router-link class="btn btn-primary" to="/Logbook/TPSLimbahB3/TPSLimbahB3Create">
                  <i class="fa fa-plus me-2"></i>Tambah Data Limbah Masuk
                </router-link>
              </li>
              <li>
                <router-link class="btn btn-primary" to="/Logbook/TPSLimbahB3/TPSLimbahB3KeluarCreate">
                  <i class="fa fa-plus me-2"></i>Tambah Data Limbah Keluar
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-6">
            <div class="table-responsive table-div">
              <h4>Semua Limbah Masuk</h4>
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Jenis LB3</th>
                    <th>Tanggal Masuk LB3</th>
                    <th>Sumber Limbah B3</th>
                    <th>Jumlah</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="tpsLimbahB3Data.length > 0" v-for="(data,i) in limbahMasuk" :key="data.id">
                    <td>{{ i + 1 }}</td>
                    <td>{{ data.item.jenis }}</td>
                    <td>{{ data.tgl_input }}</td>
                    <td>{{ data.item.jenis_limbah.jenis }}</td>
                    <td>{{ data.jumlah }} {{ data.satuan }}</td>
                    <td class="d-flex" style="gap: 1rem">
                      <RouterLink
                        :to="{
                          path: '/Logbook/TPSLimbahB3/TPSLimbahB3Edit/',
                          query: { id: data.id },
                        }"
                        class="btn btn-primary"
                        >Edit</RouterLink
                      >
                      <button class="btn btn-primary" @click="deleteData(data.id)">
                        Hapus
                      </button>
                    </td>
                  </tr>
                  <tr v-else>
                    <td colspan="7" class="text-center">Tidak ada data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-6">
            <div class="table-responsive table-div">
              <h4>Semua Limbah Keluar</h4>
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Tanggal Input</th>
                    <th>Jenis LB3</th>
                    <th>Jumlah</th>
                    <th>Satuan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="tpsLimbahB3Data.length > 0" v-for="(data,i) in limbahKeluar" :key="data.id">
                    <td>{{ i + 1 }}</td>
                    <td>{{ data.tgl_input }}</td>
                    <td>{{ data.item.jenis }}</td>
                    <td>{{ data.jumlah }}</td>
                    <td>{{ data.satuan }}</td>
                    <td class="d-flex" style="gap: 1rem">
                      <RouterLink
                        :to="{
                          path: '/Logbook/TPSLimbahB3/TPSLimbahB3Edit/',
                          query: { id: data.id },
                        }"
                        class="btn btn-primary"
                        >Edit</RouterLink
                      >
                      <button class="btn btn-primary" @click="deleteData(data.id)">
                        Hapus
                      </button>
                    </td>
                  </tr>
                  <tr v-else>
                    <td colspan="7" class="text-center">Tidak ada data</td>
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
