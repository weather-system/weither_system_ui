<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { RouterLink } from 'vue-router'
import moment from 'moment'
import MainWrapper from '@/components/MainWrapper.vue'
import { getPencemaranUdaraDetail, verifikasiPencemaranUdara } from '@/lib/pencemaranUdara.js'

const $loading = useLoading()
const route = useRoute()
const router = useRouter()

const data = ref(null)
const status = ref('')

const submit = async () => {
  const loader = $loading.show()
  try {
    await verifikasiPencemaranUdara(data.value.id, { status: status.value })
    router.push('/Verifikator/PemantauanUdaraAmbien')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

onMounted(async () => {
  const loader = $loading.show()
  try {
    data.value = await getPencemaranUdaraDetail(route.params.id)
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
          <h5>Data Pemantauan Udara Ambien - {{ data?.company.name }}</h5>
        </div>

        <div v-if="data">
         <div class="card">
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label"><strong>Nama Perusahaan</strong></label>
                <p>{{ data.company.name }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Tanggal Uji</strong></label>
                <p>{{ moment(data.tanggal_uji).format('DD MMMM YYYY') }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Bulan</strong></label>
                <p>{{ data.bulan }} - {{ data.tahun }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Lab Penguji</strong></label>
                <p>{{ data.lab_penguji }}</p>
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
                    <th>No</th>
                    <th>Parameter Udara Ambien</th>
                    <th>Kelompok</th>
                    <th>Baku Mutu</th>
                    <th>Ekspresi</th>
                    <th>Hasil Pengujian</th>
                    <th>Satuan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(detail, index) in data.details" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ detail.parameter_udara }}</td>
                    <td>{{ detail.kelompok }}</td>
                    <td>{{ detail.referensi_baku_mutu?.baku_mutu }}</td>
                    <td>{{ detail.ekspresi1 || '-' }}</td>
                    <td>{{ detail.hasil_pengujian1 || '-' }}</td>
                    <td>{{ detail.satuan }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button @click="router.back()" class="btn btn-secondary me-2">Kembali</button>
            <button @click="submit" class="btn btn-primary">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
