<script setup>
import { ref, onMounted } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { RouterLink } from 'vue-router'
import Swal from 'sweetalert2'
import PageHeader from '@/components/PageHeader.vue'
import {
  getJenisUsaha,
  deleteJenisUsaha,
} from '@/lib/jenisUsaha.js'

const $loading = useLoading()

const data = ref([])

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
      await deleteJenisUsaha(id)
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
    } catch (e) {
      console.error(e)
    } finally {
      loader.hide()
      await loadData()
    }
  }
}

const loadData = async () => {
  const loader = $loading.show()
  try {
    data.value = await getJenisUsaha()
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

onMounted(async () => {
  await loadData()
})
</script>

<template>
  <PageHeader>
    <h3>Daftar Jenis Usaha</h3>
    <div class="list-btn">
      <ul>
        <li>
          <RouterLink
            to="/w/DaftarJenisUsaha/Create"
            class="btn btn-primary"
            ><i class="fa fa-plus me-2"></i>Tambah Jenis Usaha
          </RouterLink>
        </li>
      </ul>
    </div>
  </PageHeader>

  <div class="row">
    <div class="col-12">
      <div class="table-responsive table-div">
        <table class="table datatable">
          <thead>
            <tr>
              <th>Jenis Usaha dan/atau Kegiatan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="data.length < 1">
              <td colspan="2" class="text-center">Data belum ada</td>
            </tr>
            <tr v-else v-for="d in data" :key="d.id">
              <td>{{ d.jenis }}</td>
              <td>
                <RouterLink :to="`/w/DaftarJenisUsaha/${d.id}`" class="btn btn-success me-2">
                  Ubah
                </RouterLink>
                <button class="btn btn-danger" @click="deleteData(d.id)">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
