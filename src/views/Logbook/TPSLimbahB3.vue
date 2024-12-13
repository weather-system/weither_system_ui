<script setup>
import { ref, onMounted } from "vue";
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
                <RouterLink
                  class="btn btn-primary"
                  to="/Logbook/TPSLimbahB3/TPSLimbahB3Create"
                >
                  <i class="fa fa-plus me-3"></i>Tambah
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Tanggal Input</th>
                    <th>Jenis LB3</th>
                    <th>Jumlah</th>
                    <th>Satuan</th>
                    <th>Kemasan</th>
                    <th>Jenis</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="tpsLimbahB3Data.length > 0" v-for="data in tpsLimbahB3Data" :key="data.id">
                    <td>{{ data.tgl_input }}</td>
                    <td>{{ data.jenis_lb3 }}</td>
                    <td>{{ data.jumlah }}</td>
                    <td>{{ data.satuan }}</td>
                    <td>{{ data.kemasan }}</td>
                    <td>{{ data.jenis }}</td>
                    <td class="d-flex" style="gap: 1rem">
                      <RouterLink
                        :to="`/Logbook/TPSLimbahB3/TPSLimbahB3Edit/${data.id}`"
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
