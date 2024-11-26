<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import moment from 'moment'
import MainWrapper from '@/components/MainWrapper.vue'
import { getPencemaranUdaraVerifikator } from '@/lib/pencemaranUdara.js'
import { usePemantauanFilter } from '@/hooks/usePemantauan.js'

const $loading = useLoading()
const { years, months, companies, filterParams } = usePemantauanFilter()

const data = ref([])

const loadData = async () => {
  const loader = $loading.show()
  try {
    data.value = await getPencemaranUdaraVerifikator('Udara Ambien', filterParams)
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
  await loadData()
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>Data Pemantauan Udara Ambien</h5>

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
                    <th>Tanggal Pengujian</th>
                    <th>Laboratorium Penguji</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="d in data" :key="d.id">
                    <td>{{ d.company.name }}</td>
                    <td>{{ moment(d.tanggal_uji).format('DD MMMM YYYY') }}</td>
                    <td>{{ d.lab_penguji }}</td>
                    <td>{{ d.status }}</td>
                    <td>
                      <RouterLink
                        :to="`/Verifikator/PemantauanUdaraAmbien/${d.id}`"
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
