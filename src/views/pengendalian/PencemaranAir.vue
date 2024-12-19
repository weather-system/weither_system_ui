<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { useStore } from 'vuex'
import { getPencemaranAir, deletePencemaranAir, getStatusPertek } from '@/lib/pencemaranAir.js'
import MainWrapper from '@/components/MainWrapper.vue' // Import MainWrapper
import Swal from 'sweetalert2'
import { MONTHS, YEARS } from '@/lib/utils.js'

const $loading = useLoading()

const isUserIpalPending = ref(false)
const store = useStore()
const router = useRouter()
const statuspertek = ref([])
const pencemaranAir = ref([])
const fetchData = async () => {
  const loader = $loading.show()
  try {
    pencemaranAir.value = await getPencemaranAir()
  } catch (e) {
    console.error('Error fetching data:', e)
    Swal.fire('Error', 'Gagal mengambil data pencemaran air.', 'error')
  } finally {
    loader.hide()
  }
}

const deleteData = async id => {
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
      await deletePencemaranAir(id)
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
  const loader = $loading.show()
  try {
    statuspertek.value = await getStatusPertek()
    if (statuspertek.value?.company_ipals?.includes('PENDING')) {
      isUserIpalPending.value = true
    }
    if (isUserIpalPending.value) {
    Swal.fire({
      title: 'Warning!',
      text: 'Pertek IPAL Anda Statusnya Pending.',
      icon: 'warning',
    });
  }

    pencemaranAir.value = await getPencemaranAir()
  } catch (e) {
    console.error('Error fetching data:', e)
    Swal.fire('Error', 'Gagal mengambil data pencemaran air.', 'error')
  } finally {
    loader.hide()
  }
})
</script>

<template>
  <MainWrapper>
    <div class="" v-if="isUserIpalPending"></div>
    <div class="page-wrapper page-settings" v-if="!isUserIpalPending">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h4>
            Pemantauan Pencemaran Air ({{
              store.state.auth.user.company?.name
            }})
          </h4>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="list-btn">
            <ul>
              <li>
                <RouterLink
                  class="btn btn-primary"
                  to="/Pengendalian/PencemaranAir/Create"
                >
                  <i class="fa fa-plus me-2"></i>Tambah Pemantauan
                </RouterLink>
              </li>
            </ul>
          </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="table-resposnive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Bulan</th>
                    <th>Tanggal Ukur</th>
                    <th>Debit Terukur</th>
                    <th>Produksi</th>
                    <th>Lab. Pengukur</th>
                    <th>IPAL</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="pencemaranAir.length === 0">
                    <td colspan="8" class="text-center">Data Tidak Ada</td>
                  </tr>
                  <tr v-for="(data, index) in pencemaranAir" :key="data.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.month }} {{ data.year }}</td>
                    <td>{{ data.tgl_pengambilan_contoh }}</td>
                    <td>{{ data.debit_terukur }} {{ data.debit_terukur_satuan }}</td>
                    <td>{{ data.produksi_ton_bulan }} Ton/Bulan</td>
                    <td>{{ data.lab_penguji }}</td>
                    <td>{{ data.company_ipal ? `${data.company_ipal.type} - ${data.company_ipal.system_ipal} - ${data.company_ipal.year_of_manufacture_of_ipal}` : '-' }}</td>
                    <td>{{ data.status }}</td>
                    <td class="d-flex" style="gap: 1rem">
                      <RouterLink
                        v-if="data.status != 'Verifikasi LH'"
                        :to="{
                          path: '/Pengendalian/PencemaranAir/Edit',
                          query: { id: data.id },
                        }"
                        class="btn btn-primary"
                        >Ubah</RouterLink
                      >
                      <button
                        v-if="data.status != 'Verifikasi LH'"
                        @click="deleteData(data.id)"
                        class="btn btn-primary"
                      >
                        Hapus
                      </button>
                      <button v-if="data.status == 'Verifikasi LH'" class="btn btn-primary">Cetak</button>
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
