<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import moment from 'moment'
import MainWrapper from '@/components/MainWrapper.vue'
import { getPencemaranAirVerifikator } from '@/lib/pencemaranAir.js'
import { getCompanies } from '@/lib/company.js'

const $loading = useLoading()

const data = ref([])

const years = ref([])
const months = ref(null)
const companies = ref([])

const filterParams = reactive({
  month: '',
  year: '',
  company_id: ''
})

const loadYears = () => {
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 2000; year--) {
    years.value.push(year);
  }
}

const loadMonths = () => {
  months.value = {
    1: "Januari",
    2: "Februari",
    3: "Maret",
    4: "April",
    5: "Mei",
    6: "Juni",
    7: "Juli",
    8: "Agustus",
    9: "September",
    10: "Oktober",
    11: "November",
    12: "Desember"
  }
}

const loadCompanies = async () => {
  const loader = $loading.show()
  try {
    companies.value = await getCompanies()
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const loadData = async () => {
  const loader = $loading.show()
  try {
    data.value = await getPencemaranAirVerifikator(filterParams)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

watch(filterParams, async (latest, _) => {
  await loadData()
})

onMounted(async () => {
  loadYears()
  loadMonths()
  await loadCompanies()
  await loadData()
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>Data Pemantauan Air</h5>

        </div>

        <div style="width: fit-content">
          <div class="d-flex align-items-center" style="gap: 1rem">
            <p class="m-0">Tahun/Bulan</p>
            <select class="form-control" v-model="filterParams.year">
              <option value="">Semua</option>
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
            <select v-if="months" class="form-control" v-model="filterParams.month">
              <option value="">Semua</option>
              <option v-for="(v, k) in months" :key="k" :value="v">{{ v }}</option>
            </select>
          </div>

          <div class="mt-3">
            <p class="m-0 mb-1">Perusahaan</p>
            <select class="form-control" v-model="filterParams.company_id">
              <option value="">Semua</option>
              <option v-for="c in companies" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="table-resposnive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Perusahaan</th>
                    <th>Bulan</th>
                    <th>Tahun</th>
                    <th>Jenis Usaha</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="d in data" :key="d.id">
                    <td>{{ d.company.name }}</td>
                    <td>{{ d.month }}</td>
                    <td>{{ d.year }}</td>
                    <td>
                      <ul style="list-style-type: disc;">
                        <li v-for="ju in d.company.company_detail?.jenis_usaha">{{ ju.nama }}</li>
                      </ul>
                    </td>
                    <td>{{ d.status }}</td>
                    <td>
                      <RouterLink
                        :to="`/Verifikator/PemantauanAir/${d.id}`"
                        class="btn btn-primary"
                        >Verifikasi</RouterLink
                      >
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
