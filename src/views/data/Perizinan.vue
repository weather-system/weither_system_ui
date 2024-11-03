<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import axios from 'axios'
import MainWrapper from '@/components/MainWrapper.vue'
import Swal from 'sweetalert2' // Import SweetAlert

const $loading = useLoading()
const route = useRoute()

const companyLicences = ref([]) // Holds the company licenses for the logged-in user
const userCompanies = ref([]) // Filters the user's companies based on some criteria
const loggedInUserId = 3 // Change this to fetch the logged-in user's ID dynamically

// Fetch the user's companies
const fetchUserCompanies = async () => {
  const loader = $loading.show()
  try {
    const response = await axios.get('http://localhost:8000/api/companies') // Adjust the endpoint if needed
    const companies = response.data

    // Filter to get user companies
    userCompanies.value = companies.filter(
      company => company.user_id === loggedInUserId,
    )

    console.log('User Companies:', JSON.stringify(userCompanies.value, null, 2))

    // Fetch company licenses for the first user's company (if exists)
    if (userCompanies.value.length > 0) {
      await fetchCompanyLicences(userCompanies.value[0].id)
    }
  } catch (error) {
    console.error('Error fetching companies:', error)
  } finally {
    loader.hide()
  }
}

// Fetch company licenses based on companyId
const fetchCompanyLicences = async companyId => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/company_licence?company_id=${companyId}`,
    ) // Adjust endpoint if needed
    companyLicences.value = response.data

    console.log(
      `Fetched Company Licences for Company ID ${companyId}:`,
      companyLicences.value,
    )
  } catch (error) {
    console.error('Error fetching company licenses:', error)
  }
}

// Watch for changes in user companies to fetch new licenses when they change
watch(
  userCompanies,
  newValue => {
    if (newValue.length > 0) {
      fetchCompanyLicences(newValue[0].id) // Fetch licenses for the first company
    } else {
      companyLicences.value = [] // Reset licenses if no companies
    }
  },
  { immediate: true },
)

// Fetch user companies on mount
onMounted(() => {
  fetchUserCompanies()
})

// Delete License Function
const deleteLicence = async id => {
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
      await axios.delete(`http://localhost:8000/api/company_licence/${id}`)
      await fetchCompanyLicences(userCompanies.value[0].id) // Refresh the licenses after deletion
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
    } catch (error) {
      console.error('Error deleting license:', error)
      Swal.fire('Error!', 'There was an error deleting the license.', 'error')
    }
  }
}
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit mb-2">
          <h3>Data Perizinan</h3>
          <div class="list-btn">
            <ul>
              <li>
                <router-link class="btn btn-primary" to="perizinan/tambah">
                  <!-- Change route as necessary -->
                  <i class="fa fa-plus me-2"></i>Tambah Perizinan
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
                    <th>Foto</th>
                    <th>Jenis</th>
                    <th>Nomor Izin</th>
                    <th>Instansi Yang Mengeluarkan</th>
                    <th>Tanggal Izin</th>
                    <th>Tanggal Izin Berakhir</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(licence, index) in companyLicences"
                    :key="licence.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>
                      <img
                        :src="licence.photo"
                        alt="License Photo"
                        class="img img-fluid"
                      />
                    </td>
                    <td>{{ licence.type }}</td>
                    <td>{{ licence.license_number }}</td>
                    <td>{{ licence.issuing_agency }}</td>
                    <td>
                      {{ new Date(licence.permit_date).toLocaleDateString() }}
                    </td>
                    <td>
                      {{
                        new Date(
                          licence.permit_date_expired,
                        ).toLocaleDateString()
                      }}
                    </td>
                    <td>
                      <router-link
                        :to="`/data/perizinan/edit/${licence.id}`"
                        class="btn btn-primary"
                        >Edit</router-link
                      >
                      <button
                        @click="deleteLicence(licence.id)"
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