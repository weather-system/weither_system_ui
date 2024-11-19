<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import MainWrapper from '@/components/MainWrapper.vue'

const formData = ref({
  bulan: '',
  tahun: '',
  lab_penguji: '',
  tanggal_uji: '',
  file_hasil_pemeriksaan_lab: '',
  file_dokumentasi_sampling: '',
  pencemaranudaraDetails: [],
})

const route = useRoute()

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await axios.get(
      `/api/data-pencemaran-udara/${id}`, 
    )
    Object.assign(formData.value, response.data.data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="content-page-header mb-2">
              <h3>Detail Pemantauan Pencemaran Udara - Emisi</h3>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Bulan</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.bulan"
                    disabled
                  />
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Tahun</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.tahun"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">Laboratorium Penguji</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.lab_penguji"
                    disabled
                  />
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Tanggal Pengujian</label>
                  <input
                    type="date"
                    class="form-control"
                    :value="formData.tanggal_uji"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="photo">Hasil Pemeriksaan Lab</label>
                  <img
                    :src="formData.file_hasil_pemeriksaan_lab"
                    alt="Hasil Pemeriksaan"
                    class="img-fluid"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="photo">Dokumentasi Sampling</label>
                  <img
                    :src="formData.file_dokumentasi_sampling"
                    alt="Dokumentasi Sampling"
                    class="img-fluid"
                  />
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-bordered mb-4">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Parameter Udara Emisi</th>
                    <th>Satuan</th>
                    <th>Ekspresi</th>
                    <th>Hasil Pengujian</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(detail, index) in formData.details" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ detail.parameter_udara }}</td>
                    <td>{{ detail.satuan }}</td>
                    <td>{{ detail.ekspresi1 || '-' }}</td>
                    <td>{{ detail.hasil_pengujian1 || '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="text-right">
              <router-link
                to="/Pengendalian/PencemaranUdara"
                class="btn btn-secondary m-2"
                >Kembali</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
