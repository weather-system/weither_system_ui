<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import MainWrapper from '@/components/MainWrapper.vue'
import {
  getReferensiBakuMutu,
  deleteReferensiBakuMutu,
} from '@/lib/referensiBakuMutu.js'

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
      await deleteReferensiBakuMutu(id)
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
    data.value = await getReferensiBakuMutu()
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
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>Referensi Baku Mutu</h5>
          <div class="list-btn">
            <ul>
              <li>
                <RouterLink
                  to="/ReferensiBakuMutu/Create"
                  class="btn btn-primary"
                  ><i class="fa fa-plus me-2"></i>Tambah Referensi Baku Mutu
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="table-resposnive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Jenis</th>
                    <th>Referensi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="data.length < 1">
                    <td colspan="3" class="text-center">Data belum ada</td>
                  </tr>
                  <tr v-else v-for="d in data" :key="d.id">
                    <td>{{ d.jenis }}</td>
                    <td>{{ d.referensi }}</td>
                    <td>
                      <RouterLink
                        :to="`/ReferensiBakuMutu/${d.id}`"
                        class="btn btn-success me-2"
                        >Ubah</RouterLink
                      >
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
      </div>
    </div>
  </MainWrapper>
</template>
