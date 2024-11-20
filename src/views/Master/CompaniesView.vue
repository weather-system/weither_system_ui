<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'
import { getMasterCompanies, deleteCompany } from '@/lib/company.js'

const router = useRouter()
const $loading = useLoading()

const companies = ref([])

const deleteData = async (id) => {
  const loader = $loading.show()
  try {
    await deleteCompany(id)
    router.go()
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

onMounted(async () => {
  const loader = $loading.show()
  try {
    companies.value = await getMasterCompanies()
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
        <div class="content-page-header content-page-headersplit">
          <h5>Data Perusahaan</h5>
          <div class="list-btn">
            <ul>
              <li>
                <RouterLink class="btn btn-primary" to="/Master/Companies/Create"
                  ><i class="fa fa-plus me-2"></i>Tambah Perusahaan
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
                    <th>Nama / NPWP / Email</th>
                    <th>Jenis Usaha</th>
                    <th>Alamat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in companies" :key="data.id">
                    <td>
                      <p class="m-0 fw-bold">{{ data.name }}</p>
                      <p class="m-0">NPWP: {{ data.company_detail?.npwp }}</p>
                      <p class="m-0">{{ data.company_email }}</p>
                    </td>
                    <td>
                      <ul style="list-style-type: disc;">
                        <li v-for="j in data.company_detail?.jenis_usaha" :key="j.id">{{ j.nama }}</li>
                      </ul>
                    </td>
                    <td>{{ data.address }} {{ data.kelurahan }} {{ data.kecamatan }}</td>
                    <td>
                      <router-link
                        :to="`/Master/Companies/${data.id}`"
                        class="btn btn-primary"
                        >Edit</router-link
                      >
                      <button
                        @click="deleteData(data.id)"
                        class="btn btn-danger m-2"
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
