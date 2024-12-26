<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'
import { getTpsB3Detail, updateTpsB3 } from '@/lib/tpsb3'

const $loading = useLoading()
const route = useRoute()
const router = useRouter()

const formData = ref(null)
const status = ref('')

const updateStatus = async () => {
  const loader = $loading.show();
  try {
    // Ambil nilai volume limbah, pastikan tidak undefined atau null
    const volumeLimbah = formData.value?.volume_limbah_dalam_izin || 0; // Pastikan ada nilai default

    const payload = {
      status: status.value || undefined,
      sumber_limbah_b3: formData.value?.sumber_limbah_b3 || undefined,
      koordinat_x: formData.value?.koordinat_x || undefined,
      koordinat_y: formData.value?.koordinat_y || undefined,
      volume_limbah_dalam_izin: volumeLimbah, // Pastikan mengirimkan nilai default 0 jika kosong
    };

    console.log("Payload:", payload); // Debug untuk melihat nilai payload

    await updateTpsB3(route.params.id, payload);
    router.push('/Verifikator/RintekLB3');
  } catch (e) {
    console.error(e);
  } finally {
    loader.hide();
  }
};





const loadData = async () => {
  const loader = $loading.show()
  try {
    formData.value = await getTpsB3Detail(route.params.id)
    status.value = formData.value.status
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
              <h3>Verifikasi Pertek IPAL</h3>
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
                  <label class="col-form-label">No. Rintek LB3</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.no_rintek"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group d-flex flex-column align-items-start">
                  <label class="col-form-label">File Rintek LB3</label>
                  <a
                    :href="formData.file_rintek"
                    target="_blank"
                    class="btn btn-secondary"
                    >Lihat File</a
                  >
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
                    v-model="formData.koordinat_x"
                    disabled
                  />
                  <a
                    href="https://www.yogantara.info/"
                    class="text-small"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Konvert dari derajat ke decimal Link</a
                  >
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
                    v-model="formData.koordinat_y"
                    disabled
                  />
                </div>
              </div>
              <div>
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Jenis Pengelolaan Limbah</th>
                        <th>Dokumen Izin</th>
                        <th>Tanggal Izin</th>
                        <th>Tanggal Izin Berakhir</th>
                        <th>Nama Pihak Ke-3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="!formData.items.length">
                        <td colspan="4" class="text-center">
                          Data Tidak Ditemukan
                        </td>
                      </tr>
                      <tr
                        v-for="(detail, index) in formData.itemz"
                        :key="index"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ detail.jenis || '-' }}</td>
                        <td>
                          <a
                            v-if="detail.photo_izin"
                            :href="detail.photo_izin"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-secondary"
                          >
                            Lihat Dokumen
                          </a>
                          <span v-else>-</span>
                        </td>
                        <td>{{ detail.tanggal_izin || '-' }}</td>
                        <td>{{ detail.tanggal_berakhir_izin || '-' }}</td>
                        <td>{{ detail.pihak_ke3 || '-' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">Masa Berlaku Kerja Sama</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.masa_berlaku"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group d-flex flex-column align-items-start">
                  <label class="col-form-label"
                    >File Sertifikat Kerja Sama</label
                  >
                  <a
                    :href="formData.sertifikat_dokumen"
                    target="_blank"
                    class="btn btn-secondary"
                    >Lihat File</a
                  >
                </div>
              </div>
              <div>
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Jenis Limbah Berdasarkan Sumber</th>
                        <th>Jenis Limbah B3</th>
                        <th>Volume Limbah Dalam Izin</th>
                        <th>Satuan Limbah Dalam Izin</th>
                        <th>Masa Simpan Hari</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="!formData.items.length">
                        <td colspan="4" class="text-center">
                          Data Tidak Ditemukan
                        </td>
                      </tr>
                      <tr
                        v-for="(detail, index) in formData.items"
                        :key="index"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ detail.jenis || '-' }}</td>
                        <td>{{ detail.jenis_limbah_berdasarkan_sumber || '-' }}</td>
                        <td>{{ detail.volume || '-' }}</td>
                        <td>{{ detail.satuan || '-' }}</td>
                        <td>{{ detail.masa_simpan || '-' }}</td>
                      </tr>
                    </tbody>
                  </table>
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
                      to="/Verifikator/PertekIPAL"
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
