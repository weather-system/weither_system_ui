<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'
import { getMasterCompanies, deleteCompany } from '@/lib/company.js'

const router = useRouter()
const $loading = useLoading()

const companies = ref([])

const deleteData = async id => {
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
                <RouterLink
                  class="btn btn-primary"
                  to="/Master/Companies/Create"
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
                      <ul style="list-style-type: disc">
                        <li
                          v-for="j in data.company_detail?.jenis_usaha"
                          :key="j.id"
                        >
                          {{ j.nama }}
                        </li>
                      </ul>
                    </td>
                    <td>
                      {{ data.address }} {{ data.kelurahan }}
                      {{ data.kecamatan }}
                    </td>
                    <td>
                      <div class="dropdown">
                        <button
                          class="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Aksi
                        </button>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li>
                            <router-link
                              :to="`/Master/Companies/${data.id}`"
                              class="dropdown-item"
                            >
                              Detail
                            </router-link>
                          </li>
                          <li>
                            <router-link
                              :to="`/Master/Companies/${data.id}`"
                              class="dropdown-item"
                            >
                              Perizinan
                            </router-link>
                          </li>
                          <li>
                            <router-link
                              :to="`/Master/Ipal/?company_id=${data.id}`"
                              class="dropdown-item"
                            >
                              Data IPAL
                            </router-link>
                          </li>
                          <li>
                            <router-link
                              :to="`/Master/Emisi/?company_id=${data.id}`"
                              class="dropdown-item"
                            >
                              Data Emisi
                            </router-link>
                          </li>
                          <li>
                            <router-link
                              :to="`/Master/LB3/?company_id=${data.id}`"
                              class="dropdown-item"
                            >
                              Data LB3
                            </router-link>
                          </li>
                          <li>
                            <router-link
                              :to="`/Master/Companies/${data.id}`"
                              class="dropdown-item"
                            >
                              Sumber Air Baku
                            </router-link>
                          </li>
                          <li>
                            <router-link
                              :to="`/Master/Companies/${data.id}`"
                              class="dropdown-item"
                            >
                              Cetak
                            </router-link>
                          </li>
                          <li>
                            <router-link
                              :to="`/Master/Companies/${data.id}`"
                              class="dropdown-item"
                            >
                              Edit
                            </router-link>
                          </li>
                          <li>
                            <button
                              @click="deleteData(data.id)"
                              class="dropdown-item text-danger"
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
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
