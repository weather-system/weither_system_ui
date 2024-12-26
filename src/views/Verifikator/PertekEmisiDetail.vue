<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'
import { getCerobongDetail, updateCerobong } from '@/lib/cerobong.js'
import axios from 'axios'

const $loading = useLoading()
const route = useRoute()
const router = useRouter()

const formData = ref(null)
const status = ref('')
const referensiBakuMutu = ref([])

const updateStatus = async () => {
  const loader = $loading.show()
  try {
    // Hanya kirim field yang memiliki nilai
    const updateData = {
      status: status.value,
      jenis_boiler: formData.value.jenis_boiler || undefined,
      jenis_bahan_bakar: formData.value.jenis_bahan_bakar || undefined,
      jumlah_boiler: formData.value.jumlah_boiler || undefined,
      kapasitas_boiler: formData.value.kapasitas_boiler || undefined,
      merk_boiler: formData.value.merk_boiler || undefined,
      tinggi_cerobong: formData.value.tinggi_cerobong || undefined,
      diameter_cerbong: formData.value.diameter_cerbong || undefined,
      pengendalian_emisi_cerobong:
        formData.value.pengendalian_emisi_cerobong || undefined,
      lubang_sampling: formData.value.lubang_sampling || undefined,
      kedalaman_lubang_sampling:
        formData.value.kedalaman_lubang_sampling || undefined,
      stage: formData.value.stage || undefined,
      referensi_baku_mutu_id:
        formData.value.referensi_baku_mutu_id || undefined,
      satuan_diameter_cerobong:
        formData.value.satuan_diameter_cerobong || undefined,
      satuan_kapasitas_boiler:
        formData.value.satuan_kapasitas_boiler || undefined,
      satuan_tinggi_cerobong:
        formData.value.satuan_tinggi_cerobong || undefined,
    }

    // Melakukan request untuk update cerobong dengan data yang sudah disiapkan
    await updateCerobong(route.params.id, updateData)
    router.push('/Verifikator/PertekEmisi')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const loadData = async () => {
  const loader = $loading.show()
  try {
    formData.value = await getCerobongDetail(route.params.id)
    status.value = formData.value.status

    const response = await axios.get(
      '/api/referensiBakuMutu?jenis_baku_mutu=Emisi',
    )
    referensiBakuMutu.value = response.data
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

onMounted(async () => {
  await loadData()
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div v-if="formData" class="row">
          <div class="col-lg-10 mx-auto">
            <div class="content-page-header mb-2">
              <h3>Verifikasi Pertek Emisi</h3>
            </div>
            <div class="row">
              <div class="form-group">
                <label class="col-form-label">Status</label>
                <select v-model="status" class="form-control">
                  <option value="">Pilih Status</option>
                  <option value="PENDING">PENDING</option>
                  <option value="DITERIMA">DITERIMA</option>
                  <option value="DITOLAK">DITOLAK</option>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label">Catatan Perbaikan</label>
                <textarea class="form-control"></textarea>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">No. Pertek Emisi</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.no_pertek_emisi"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group d-flex flex-column align-items-start">
                  <label class="col-form-label">File Pertek Emisi</label>
                  <a
                    :href="formData.file_pertek_emisi"
                    target="_blank"
                    class="btn btn-secondary"
                    >Lihat File</a
                  >
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label class="col-form-label">Acuan Buku Mutu</label>
                <select name="referensi_baku_mutu_id" class="form-control" disabled>
                  <option value="" disabled>Acuan Buku Mutu</option>
                  <option
                    v-for="referensi_baku_mutus in referensiBakuMutu"
                    :key="referensi_baku_mutus.id"
                    :value="referensi_baku_mutus.id"
                  >
                    Type : {{ referensi_baku_mutus.jenis }},
                    {{ referensi_baku_mutus.referensi }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Jenis Boiler Berdasarkan Tube Boiler</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.jenis_boiler"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Jenis Boiler Berdasarkan Bahan Bakar</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.jenis_bahan_bakar"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <div class="form-group">
                  <label class="col-form-label">Jumlah Boiler</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.jumlah_boiler"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-5">
                <div class="form-group">
                  <label class="col-form-label">Merk Boiler</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.merk_boiler"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <label class="col-form-label">Kapasitas Boiler</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.kapasitas_boiler"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="col-form-label">Satuan Kapasitas Boiler</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.satuan_kapasitas_boiler"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-form-label">Pengendap Emisi Cerobong</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.pengendalian_emisi_cerobong"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">Tinggi Cerobong</label>
                  <div class="form-duration">
                    <input
                      type="number"
                      class="form-control"
                      name="tinggi_cerbong"
                      :value="formData.tinggi_cerobong"
                      disabled
                    />
                    <span class="mins">m</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">Diameter Cerobong</label>
                  <div class="form-duration">
                    <input
                      type="number"
                      class="form-control"
                      name="diameter_cerbong"
                      :value="formData.diameter_cerbong"
                      disabled
                    />
                    <span class="mins">m</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Longitude (Ex. -123.21312)</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.koordinat_x"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Latitude (Ex. -123.21312)</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.koordinat_y"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">Lubang Sampling</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.lubang_sampling"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Kedalaman Lubang Sampling</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.kedalaman_lubang_sampling"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">Tangga Cerobong/Stage</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="formData.stage"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="field-btns d-flex justify-content-between">
                  <div>
                    <button
                      class="btn btn-primary next_btn"
                      @click="updateStatus"
                    >
                      Update
                    </button>
                    <router-link
                      to="/Verifikator/PertekEmisi"
                      class="btn btn-secondary m-2"
                      >Kembali</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
