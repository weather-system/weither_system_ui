<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useLoading } from 'vue-loading-overlay'
import { uploadFile } from '@/lib/filestorage.js'
import MainWrapper from '@/components/MainWrapper.vue'
import Swal from 'sweetalert2'
import Ambien from './detail/ambien.vue'
const formData = reactive({
  bulan: '',
  tahun: '',
  jenis: 'Udara Ambien',
  lab_penguji: '',
  tanggal_uji: '',
  file_hasil_pemeriksaan_lab: '',
  file_dokumentasi_sampling: '',
  details: [],
})

const $loading = useLoading()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await axios.get(`/api/data-pencemaran-udara/${id}`)
    Object.assign(formData, response.data.data)
    formData.details = response.data.data.details || []
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

const updateData = async () => {
  const id = route.params.id
  const loader = $loading.show()
  try {
    await axios.put(`/api/pencemaran-udaras/${id}`, formData)

    // for (const detail of formData.pencemaranudaraDetails) {
    //   await axios.put(`/api/pencemaran-udara-detail/${detail.id}`, detail)
    // }

    Swal.fire({
      title: 'Success!',
      text: 'Upaya Pengelolaan updated successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    router.push('/Pengendalian/PencemaranUdara')
  } catch (error) {
    console.error('Error updating IPAL detail:', error)
    Swal.fire({
      title: 'Error!',
      text: error.response?.data?.message || 'Failed to update IPAL detail.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  } finally {
    loader.hide()
  }
}

const uploadHasilPemeriksaanLab = async e => {
  const loader = $loading.show()
  try {
    const url = await uploadFile(e.target.files[0])
    formData.file_hasil_pemeriksaan_lab = url
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const uploadDokumentasiSampling = async e => {
  const loader = $loading.show()
  try {
    const url = await uploadFile(e.target.files[0])
    formData.file_dokumentasi_sampling = url
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const updatePencemaranUdaraDetails = async detailId => {
  const loader = $loading.show()
  try {
    const detailToUpdate = formData.details.find(
      detail => detail.id === detailId,
    )
    if (!detailToUpdate) {
      throw new Error('Detail not found')
    }

    const updatedDetail = {
      parameter_udara: detailToUpdate.parameter_udara,
      kelompok: detailToUpdate.kelompok,
      satuan: detailToUpdate.satuan,
      ekspresi1: detailToUpdate.ekspresi1,
      hasil_pengujian1: detailToUpdate.hasil_pengujian1,
      ekspresi1: detailToUpdate.ekspresi2,
      hasil_pengujian1: detailToUpdate.hasil_pengujian2,
      ekspresi1: detailToUpdate.ekspresi3,
      hasil_pengujian1: detailToUpdate.hasil_pengujian3,
    }

    await axios.put(`/api/pencemaran-udara-detail/${detailId}`, updatedDetail)

    Swal.fire({
      title: 'Success!',
      text: 'Pencemaran Udara Detail berhasil diperbarui!',
      icon: 'success',
      confirmButtonText: 'OK',
    })
  } catch (error) {
    console.error('Error updating detail:', error)
    Swal.fire({
      title: 'Error!',
      text: error.response?.data?.message || 'Gagal memperbarui detail.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  } finally {
    loader.hide()
  }
}
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="content-page-header mb-2">
              <h3>Edit Pemantauan Pencemaran {{ formData.jenis }}</h3>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="bulan">Bulan</label>
                  <select class="form-control" v-model="formData.bulan">
                    <option disabled value="">Pilih Bulan</option>
                    <option value="Januari">Januari</option>
                    <option value="Februari">Februari</option>
                    <option value="Maret">Maret</option>
                    <option value="April">April</option>
                    <option value="Mei">Mei</option>
                    <option value="Juni">Juni</option>
                    <option value="Juli">Juli</option>
                    <option value="Agustus">Agustus</option>
                    <option value="September">September</option>
                    <option value="Oktober">Oktober</option>
                    <option value="November">November</option>
                    <option value="Desember">Desember</option>
                  </select>
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Tahun</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.tahun"
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
                    v-model="formData.lab_penguji"
                  />
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Tanggal Pengujian</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="formData.tanggal_uji"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="file_hasil_pemeriksaan_lab"
                    >Hasil Pemeriksaan Lab</label
                  >
                  <input
                    type="file"
                    @change="uploadHasilPemeriksaanLab"
                    class="form-control"
                  /><small class="form-text text-muted"
                    >Maksimal ukuran file: 20MB</small
                  >
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="file_dokumentasi_sampling"
                    >Dokumentasi Sampling</label
                  >
                  <input
                    type="file"
                    @change="uploadDokumentasiSampling"
                    class="form-control"
                  /><small class="form-text text-muted"
                    >Maksimal ukuran file: 20MB</small
                  >
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-md-6">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label></label>
                      <img :src="formData.file_hasil_pemeriksaan_lab" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label></label>
                      <img :src="formData.file_dokumentasi_sampling" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="formData.jenis == 'Udara Ambien'" class="table-responsive">
              <table class="table table-bordered mb-4">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Parameter Udara Ambien</th>
                    <th>Kelompok</th>
                    <th>Satuan</th>
                    <th>Ekspresi</th>
                    <th>Hasil Pengujian</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(detail, index) in formData.details" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <input
                        v-model="detail.parameter_udara"
                        type="text"
                        class="form-control"
                        placeholder="Parameter Udara"
                        readonly
                      />
                    </td>
                    <td>
                      <input
                        v-model="detail.kelompok"
                        type="text"
                        class="form-control"
                        placeholder="Kelompok"
                        readonly
                      />
                    </td>
                    <td>
                      <input
                        v-model="detail.satuan"
                        type="text"
                        class="form-control"
                        placeholder="Satuan"
                        readonly
                      />
                    </td>
                    <td>
                      <select
                        v-model="detail.ekspresi1"
                        @blur="updatePencemaranUdaraDetails(detail.id)"
                        class="form-control"
                      >
                        <option disabled value="">Pilih Ekspresi</option>
                        <option value="=">=</option>
                        <option value=">">></option>
                        <option value="<"><</option>
                        <option value=">=">>=</option>
                        <option value="<="><=</option>
                      </select>
                    </td>
                    <td>
                      <input
                        v-model="detail.hasil_pengujian1"
                        type="text"
                        class="form-control"
                        placeholder="Hasil Pengujian"
                        @blur="updatePencemaranUdaraDetails(detail.id)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div v-if="formData.jenis == 'Udara Emisi'" class="table-responsive">
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
                    <td>
                      <input
                        v-model="detail.parameter_udara"
                        type="text"
                        class="form-control"
                        placeholder="Parameter Udara"
                        readonly
                      />
                    </td>
                    <td>
                      <input
                        v-model="detail.satuan"
                        type="text"
                        class="form-control"
                        placeholder="Satuan"
                        readonly
                      />
                    </td>
                    <td>
                      <select
                        v-model="detail.ekspresi1"
                        @blur="updatePencemaranUdaraDetails(detail.id)"
                        class="form-control"
                      >
                        <option disabled value="">Pilih Ekspresi</option>
                        <option value="=">=</option>
                        <option value=">">></option>
                        <option value="<"><</option>
                        <option value=">=">>=</option>
                        <option value="<="><=</option>
                      </select>
                    </td>
                    <td>
                      <input
                        v-model="detail.hasil_pengujian1"
                        type="text"
                        class="form-control"
                        placeholder="Hasil Pengujian"
                        @blur="updatePencemaranUdaraDetails(detail.id)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div v-if="formData.jenis == 'Fly Ash, Bottom Ash, dan Sludge'" class="table-responsive">
              <table class="table table-bordered mb-4">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Parameter Fly Ash, Bottom Ash dan Sludge</th>
                    <th>Satuan</th>
                    <th>Ekspresi</th>
                    <th>Hasil Pengujian 1</th>
                    <th>Ekspresi</th>
                    <th>Hasil Pengujian 2</th>
                    <th>Ekspresi</th>
                    <th>Hasil Pengujian 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(detail, index) in formData.details" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <input
                        v-model="detail.parameter_udara"
                        type="text"
                        class="form-control"
                        placeholder="Parameter Udara"
                        readonly
                      />
                    </td>
                    <td>
                      <input
                        v-model="detail.satuan"
                        type="text"
                        class="form-control"
                        placeholder="Satuan"
                        readonly
                      />
                    </td>
                    <td>
                      <select
                        v-model="detail.ekspresi1"
                        @blur="updatePencemaranUdaraDetails(detail.id)"
                        class="form-control"
                      >
                        <option disabled value="">Pilih Ekspresi</option>
                        <option value="=">=</option>
                        <option value=">">></option>
                        <option value="<"><</option>
                        <option value=">=">>=</option>
                        <option value="<="><=</option>
                      </select>
                    </td>
                    <td>
                      <input
                        v-model="detail.hasil_pengujian1"
                        type="text"
                        class="form-control"
                        placeholder="Hasil Pengujian"
                        @blur="updatePencemaranUdaraDetails(detail.id)"
                      />
                    </td>
                    <td>
                      <select
                        v-model="detail.ekspresi2"
                        @blur="updatePencemaranUdaraDetails(detail.id)"
                        class="form-control"
                      >
                        <option disabled value="">Pilih Ekspresi</option>
                        <option value="=">=</option>
                        <option value=">">></option>
                        <option value="<"><</option>
                        <option value=">=">>=</option>
                        <option value="<="><=</option>
                      </select>
                    </td>
                    <td>
                      <input
                        v-model="detail.hasil_pengujian2"
                        type="text"
                        class="form-control"
                        placeholder="Hasil Pengujian"
                        @blur="updatePencemaranUdaraDetails(detail.id)"
                      />
                    </td>
                    <td>
                      <select
                        v-model="detail.ekspresi3"
                        @blur="updatePencemaranUdaraDetails(detail.id)"
                        class="form-control"
                      >
                        <option disabled value="">Pilih Ekspresi</option>
                        <option value="=">=</option>
                        <option value=">">></option>
                        <option value="<"><</option>
                        <option value=">=">>=</option>
                        <option value="<="><=</option>
                      </select>
                    </td>
                    <td>
                      <input
                        v-model="detail.hasil_pengujian3"
                        type="text"
                        class="form-control"
                        placeholder="Hasil Pengujian"
                        @blur="updatePencemaranUdaraDetails(detail.id)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-right">
              <button @click="updateData" class="btn btn-primary m-2">
                Simpan
              </button>
              <router-link
                to="/Pengendalian/PencemaranUdara"
                class="btn btn-secondary m-2"
              >
                Kembali
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
<style>
  .table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; /* Smooth scrolling for iOS */
  }
  table.table {
    min-width: 800px; /* Sesuaikan dengan lebar minimal tabel */
  }
</style>
