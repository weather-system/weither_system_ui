<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import moment from 'moment'
import MainWrapper from '@/components/MainWrapper.vue'
import { getPencemaranUdaraVerifikator } from '@/lib/pencemaranUdara.js'

const $loading = useLoading()

const data = ref([])

onMounted(async () => {
  const loader = $loading.show()
  try {
    data.value = await getPencemaranUdaraVerifikator('Udara Emisi')
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
          <h5>Data Pemantauan Udara Emisi</h5>

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
                        :to="`/Verifikator/PemantauanUdaraEmisi/${d.id}`"
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
