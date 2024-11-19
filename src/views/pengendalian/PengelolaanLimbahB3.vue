<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()

const dataEntries = ref([
  {
    id: 1,
    year: '2019',
    quarter: '1',
    url: 'https://simpel.menlhk.go.id',
    status: 'Ajuan Baru',
  },
  // Add other entries as needed
])

const selectedYear = ref('')
onMounted(async () => {
  const loader = $loading.show()
  try {
    // Load actual data here as needed
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
        <div v-if="$loading.isLoading" class="loading-overlay">Loading...</div>

        <!-- Align Dropdown, Button, and Link on the same row -->
        <div class="content-page-header content-page-headersplit d-flex align-items-center mb-4">
          <div class="d-flex align-items-center gap-2">
            <select class="form-select" v-model="selectedYear" style="width: auto;">
              <option value="">Pilih Tahun</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>

            <RouterLink class="btn btn-primary" to="/Pengendalian/PengelolaanLimbahB3/PengelolaanLimbahB3Create">
              <i class="fa fa-plus me-2"></i>Tambah
            </RouterLink>

            <a href="https://simpel.menlhk.go.id" class="btn btn-link" target="_blank">
              https://simpel.menlhk.go.id
            </a>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Tahun</th>
                    <th>Triwulan</th>
                    <th>URL</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(entry, index) in dataEntries" :key="entry.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ entry.year }}</td>
                    <td>{{ entry.quarter }}</td>
                    <td><a :href="entry.url" target="_blank">{{ entry.url }}</a></td>
                    <td>{{ entry.status }}</td>
                    <td class="d-flex" style="gap: 1rem">
                      <RouterLink :to="{ name: 'PengendalianPengelolaanLimbahB3Edit', params: { id: entry.id } }" class="btn btn-success">
                        Edit
                      </RouterLink>
                      <button class="btn btn-danger">Hapus</button>
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

<style scoped>
.content-page-headersplit {
  display: flex;
  align-items: center;
}
</style>
