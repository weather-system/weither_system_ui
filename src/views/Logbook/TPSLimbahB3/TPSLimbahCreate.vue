<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
import { createTpsLimbahB3 } from '@/lib/tpslimbahb3'
import MainWrapper from '@/components/MainWrapper.vue'
import Swal from 'sweetalert2';
import axios from 'axios';

const tpsForm = ref({
  tgl_input: '',
  jenis_lb3: '',
  kemasan: '',
  jumlah: '',
  satuan: '',
  jenis: '',
})

const router = useRouter()

const jenisOptions = [
  'Disimpan',
  'Dimanfaatkan',
  'Diolah',
  'Ditimbun',
  'Diserahkan ke pihak ke tiga',
  'Lainnya',
  'Masuk',
]

const saveForm = async () => {
  try {
    await createTpsLimbahB3(tpsForm.value)
    await Swal.fire({
      title: 'Success!',
      text: 'Data berhasil ditambahkan!',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    router.push('/logbook/TPSLimbahB3')
  } catch (error) {
    Swal.close()
    console.error('Error while saving form:', error)
    await Swal.fire({
      title: 'Error!',
      text: error.message || 'Gagal menambahkan Data.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  }
}
const jenisLb3Options = ref([])
const fetchJenisLimbah = async () => {
  try {
    const response = await axios.get('/api/getItemstpsb3')
    jenisLb3Options.value = response.data.map(item => item.jenis) 
  } catch (error) {
    console.error('Gagal mengambil data Jenis Limbah B3:', error)
  }
}
onMounted(() => {
  fetchJenisLimbah()
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h3>Tambah Logbook TPS Limbah B3</h3>
        </div>

        <form @submit.prevent="saveForm">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="tanggal" class="form-label">Tanggal</label>
                <input
                  type="date"
                  id="tgl_input"
                  class="form-control"
                  v-model="tpsForm.tgl_input"
                />
              </div>
            </div>

            <div class="col-md-5">
              <div class="form-group">
                <label for="jenis-limbah" class="form-label">Jenis Limbah B3</label>
                <select
                  id="jenis-limbah"
                  class="form-control"
                  v-model="tpsForm.jenis_lb3"
                >
                  <option value="" disabled>Pilih Jenis Limbah B3</option>
                  <option v-for="jenis in jenisLb3Options" :key="jenis" :value="jenis">
                    {{ jenis }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="form-group">
              <div class="col-md-9">
                <label for="kemasan" class="form-label">Kemasan</label>
                <input
                  type="text"
                  id="kemasan"
                  class="form-control"
                  v-model="tpsForm.kemasan"
                  placeholder="Masukkan Kemasan"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-5">
              <div class="form-group">
                <div>
                  <label for="jumlah" class="form-label">Jumlah Limbah</label>
                  <input
                    type="number"
                    id="jumlah"
                    class="form-control"
                    v-model="tpsForm.jumlah"
                    placeholder="Masukkan Jumlah Limbah"
                  />
                </div>
              </div>
            </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="satuan" class="form-label">Satuan</label>
                  <input
                    type="text"
                    id="satuan"
                    class="form-control"
                    v-model="tpsForm.satuan"
                    placeholder="Masukkan Satuan"
                  />
                </div>
              </div>
          </div>
          <div class="row">
            <div class="col-md-9">
              <div class="form-group">
                <label for="jenis" class="form-label">Jenis</label>
                <select id="jenis" class="form-control" v-model="tpsForm.jenis">
                  <option value="" disabled>Pilih Jenis</option>
                  <option v-for="jenis in jenisOptions" :key="jenis" :value="jenis">
                    {{ jenis }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <button type="submit" class="btn btn-primary next_btn">
              Simpan
            </button>
            <router-link to="/logbook/TPSLimbahB3" class="btn btn-secondary m-2"
                >Kembali</router-link
              >
          </div>
        </form>
      </div>
    </div>
  </MainWrapper>
</template>
