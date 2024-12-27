<script setup>
import { ref, onMounted } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { getCerobong, deleteCerobong } from '@/lib/cerobong.js'
import { getPertekData } from '@/lib/company.js'
import MainWrapper from '@/components/MainWrapper.vue'
import Swal from 'sweetalert2'
const $loading = useLoading()

const cerobong = ref([])
const rejectedItems = ref([])
const totalCerobong = ref(0)

const fetchData = async () => {
  const loader = $loading.show()
  try {
    cerobong.value = await getCerobong()
    // Perbarui daftar data yang "DITOLAK"
    rejectedItems.value = cerobong.value.filter(
      item => item.status === 'DITOLAK',
    )
  } catch (e) {
    console.error('Error fetching data:', e)
    Swal.fire('Error', 'Gagal mengambil data.', 'error')
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
      await deleteCerobong(id)
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
    cerobong.value = await getCerobong()
    const pertekData = await getPertekData()
    if (pertekData) {
      totalCerobong.value = pertekData.cerobong_total

      const n = pertekData.cerobong_total - cerobong.value.length
      if (n > 0) {
        cerobong.value = cerobong.value.concat(
          Array(n).fill({
            jenis_boiler: '-',
            jumlah_boiler: '-',
            tinggi_cerobong: '-',
            diameter_cerbong: '-',
            kapasitas_boiler: '-',
            merk_boiler: '-',
            pengendalian_emisi_cerobong: '-',
            lubang_sampling: '-',
          }),
        )
      }
      // Perbarui daftar data yang "DITOLAK"
      rejectedItems.value = cerobong.value.filter(
        item => item.status === 'DITOLAK',
      )

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

        <!-- Header -->
        <div class="content-page-header content-page-headersplit mb-2">
          <div>
            <h3>Persetujuan Teknis Emisi</h3>
          </div>
        </div>

        <!-- Tabel -->
        <div class="row">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Jenis Boiler/Jumlah Boiler(Buah)</th>
                    <th>Tinggi/Diameter/Kap. Boiler</th>
                    <th>Merk Boiler</th>
                    <th>Sistem Pengendalian Emisi Cerobong</th>
                    <th>Lubang Sampling</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in cerobong" :key="data.id">
                    <td>{{ data.jenis_boiler }} ({{ data.jumlah_boiler }})</td>
                    <td>
                      T: {{ data.tinggi_cerobong }} D:
                      {{ data.diameter_cerbong }} Kap:
                      {{ data.kapasitas_boiler }}
                    </td>
                    <td>{{ data.merk_boiler }}</td>
                    <td>{{ data.pengendalian_emisi_cerobong }}</td>
                    <td>{{ data.lubang_sampling }}</td>
                    <td>{{ data.status }}</td>
                    <td>
                      <router-link
                        v-if="data.status !== 'DITERIMA'"
                        :to="
                          data.id
                            ? `/Data/Cerobong/Edit/${data.id}`
                            : '/Data/Cerobong/Tambah'
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
