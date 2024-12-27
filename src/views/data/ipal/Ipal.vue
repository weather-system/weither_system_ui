<script setup>
import { ref, onMounted } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { getIpal, deleteIpal } from '@/lib/ipal'
import MainWrapper from '@/components/MainWrapper.vue'
import Swal from 'sweetalert2'

const $loading = useLoading()

const ipal = ref([])
const rejectedItems = ref([])

const fetchData = async () => {
  const loader = $loading.show()
  try {
    ipal.value = await getIpal()
    rejectedItems.value = ipal.value.filter(item => item.status === 'DITOLAK')
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
      await deleteIpal(id)
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
    ipal.value = await getIpal()

    // Perbarui daftar data yang "DITOLAK"
    rejectedItems.value = ipal.value.filter(item => item.status === 'DITOLAK')

    // Menampilkan SweetAlert jika ada data yang "DITOLAK"
    if (rejectedItems.value.length > 0) {
      Swal.fire({
        title: 'Perhatian!',
        text: `Ada ${rejectedItems.value.length} data yang ditolak. Harap segera lakukan tindakan.`,
        icon: 'warning',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    }
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <!-- Banner Notifikasi -->
        <div
          v-if="rejectedItems.length > 0"
          class="alert alert-warning mb-3"
          role="alert"
        >
          <strong>Perhatian!</strong> Ada {{ rejectedItems.length }} data yang
          ditolak. Harap segera lakukan tindakan.
        </div>

        <div class="content-page-header content-page-headersplit mb-2">
          <h3>Persetujuan Teknis IPAL</h3>
          <div class="list-btn">
            <!-- <ul>
              <li>
                <router-link class="btn btn-primary" to="IPAL/Tambah">
                  <i class="fa fa-plus me-2"></i>Tambah IPAL
                </router-link>
              </li>
            </ul> -->
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Jenis</th>
                    <th>Nomor Izin</th>
                    <th>Tahun Pembuatan IPAL</th>
                    <th>Kapasitas IPAL</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(data, index) in ipal" :key="data.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.type }}</td>
                    <td>{{ data.no_izin_perusahaan }}</td>
                    <td>{{ data.year_of_manufacture_of_ipal }}</td>
                    <td>{{ data.capacity_ipal }}</td>
                    <td>{{ data.status }}</td>
                    <td>
                      <router-link
                        v-if="data.status !== 'DITERIMA'"
                        :to="
                          data.id
                            ? `/Data/IPAL/Edit/${data.id}`
                            : '/Data/IPAL/Tambah'
                        "
                        class="btn btn-primary"
                        >Edit</router-link
                      >
                      <button
                        @click="deleteData(data.id)"
                        class="btn btn-primary m-2"
                      >
                        Delete
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

<style>
.img {
  width: 140px;
  height: 140px;
  object-fit: cover;
}
</style>
