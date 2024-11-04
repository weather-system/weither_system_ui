<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import axios from 'axios'
import MainWrapper from '@/components/MainWrapper.vue'
import Swal from 'sweetalert2' // Import SweetAlert

const $loading = useLoading()
const route = useRoute()

const ipals = ref([]) // Holds the IPAL data for the logged-in user
const loggedInUserId = 3 // Change this to fetch the logged-in user's ID dynamically

// Fetch IPAL data for the logged-in user's company
const fetchIpals = async () => {
  const loader = $loading.show()
  try {
    const response = await axios.get('http://localhost:8000/api/data_company_ipals') // Adjust endpoint if needed
    ipals.value = response.data
    console.log('Fetched IPALs:', ipals.value)
  } catch (error) {
    console.error('Error fetching IPALs:', error)
  } finally {
    loader.hide()
  }
}

// Delete IPAL Function
const deleteIpal = async id => {
  const { isConfirmed } = await Swal.fire({
    title: 'Apa kamu yakin ?',
    text: "Kamu tidak akan bisa mengembalikan ini!",
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
    try {
      await axios.delete(`http://localhost:8000/api/ipals/${id}`) // Adjust endpoint for deleting IPALs
      await fetchIpals() // Refresh the IPALs after deletion
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
    } catch (error) {
      console.error('Error deleting IPAL:', error)
      Swal.fire('Error!', 'There was an error deleting the IPAL.', 'error')
    }
  }
}

// Fetch IPALs on mount
onMounted(() => {
  fetchIpals()
})
</script>


<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit mb-2">
          <h3>Persetujuan Teknis IPAL</h3>
          <div class="list-btn">
            <ul>
              <li>
                <router-link class="btn btn-primary" to="IPAL/Tambah">
                  <i class="fa fa-plus me-2"></i>Tambah IPAL
                </router-link>
              </li>
            </ul>
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
                    <th>Instansi Yang Mengeluarkan</th>
                    <th>Tanggal Izin</th>
                    <th>Tanggal Izin Berakhir</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(ipal, index) in ipals" :key="ipal.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ ipal.type }}</td>
                    <td>{{ ipal.company_licence ? ipal.company_licence.license_number : 'N/A' }}</td>
                    <td>{{ ipal.company_licence ? ipal.company_licence.issuing_agency : 'N/A' }}</td>
                    <td>{{ new Date(ipal.permit_date).toLocaleDateString() }}</td>
                    <td>{{ new Date(ipal.permit_date_expired).toLocaleDateString() }}</td>
                    <td>
                      <router-link :to="`/Data/IPAL/Edit/${ipal.id}`" class="btn btn-primary">Edit</router-link>
                      <button @click="deleteIpal(ipal.id)" class="btn btn-primary m-2">Delete</button>
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
