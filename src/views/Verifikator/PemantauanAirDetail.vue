<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { RouterLink } from 'vue-router'
import moment from 'moment'
import MainWrapper from '@/components/MainWrapper.vue'
import { getPencemaranAirDetail, verifikasiPencemaranAir } from '@/lib/pencemaranAir.js'

const $loading = useLoading()
const route = useRoute()

const data = ref(null)
const status = ref('')

const submit = async () => {
  const loader = $loading.show()
  try {
    await verifikasiPencemaranAir(data.value.id, { status: status.value })
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

onMounted(async () => {
  const loader = $loading.show()
  try {
    data.value = await getPencemaranAirDetail(route.params.id)
    status.value = data.value.status
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
          <h5>Data Pemantauan Air - {{ data?.company.name }}</h5>
        </div>

        <div v-if="data">
         <div class="card">
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label"><strong>Nama Perusahaan</strong></label>
                <p>{{ data.company.name }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Bulan / Tahun</strong></label>
                <p>{{ data.month }} {{ data.year }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Debit Terukur</strong></label>
                <p>{{ data.debit_terukur }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Produksi/Bulan (Ton)</strong></label>
                <p>{{ data.produksi_ton_bulan }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Lab Penguji</strong></label>
                <p>{{ data.lab_penguji }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Tanggal Ambil Contoh</strong></label>
                <p>{{ moment(data.tgl_pengambilan_contoh).format('DD MMMM YYYY') }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Alamat</strong></label>
                <p>{{ data.company.address }} {{ data.company.kelurahan }} {{ data.company.kecamatan }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Email Perusahaan</strong></label>
                <p>{{ data.company.company_email }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Status Verifikasi</strong></label>
                <select class="form-control" v-model="status">
                  <option>Ajuan Baru</option>
                  <option>Verifikasi LH</option>
                  <option>Dikembalikan</option>
                </select>
              </div>
              <div class="row">
                <div class="col">
                  <label class="form-label"><strong>File Hasil Pemeriksaan Lab (PDF)</strong></label>
                  <div>
                    <a :href="data.file_hasil_pemeriksaan_lab" download target="_blank" class="btn btn-secondary btn-sm">Lihat File</a>
                  </div>
                </div>
                <div class="col">
                  <label class="form-label"><strong>File Dokumentasi Sampling (PDF)</strong></label>
                  <div>
                    <a :href="data.file_dokumentasi_sampling" download target="_blank" class="btn btn-secondary btn-sm">Lihat File</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Ekspresi</th>
                    <th>Hasil Pengukuran</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="d in data.details" :key="d.id">
                    <td>{{ d.parameter }}</td>
                    <td>{{ d.ekspresi }}</td>
                    <td>{{ d.hasil_pengukuran }} {{ d.satuan }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button @click="submit" class="btn btn-primary">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
