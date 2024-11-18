<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useLoading } from 'vue-loading-overlay';
import { uploadFile } from '@/lib/filestorage.js';
import Swal from 'sweetalert2';
import MainWrapper from '@/components/MainWrapper.vue';

const formData = ref({
  bulan: '',
  tahun: '',
  jenis: 'Fly Ash, Bottom Ash, dan Sludge',
  lab_penguji: '',
  tanggal_uji: '',
  file_hasil_pemeriksaan_lab: '',
  file_dokumentasi_sampling: '',
  company_id:'',
  pencemaranudaraDetails: [
    {
      parameter_udara: 'Arsen',
      satuan: 'mg/L',
      ekspresi1: '',
      hasil_pengujian1: '',
      ekspresi2: '',
      hasil_pengujian2: '',
      ekspresi3: '',
      hasil_pengujian3: ''
    },
    {
      parameter_udara: 'Barium (Ba)',
      satuan: 'mg/L',
      ekspresi1: '',
      hasil_pengujian1: '',
      ekspresi2: '',
      hasil_pengujian2: '',
      ekspresi3: '',
      hasil_pengujian3: ''
    },
    {
      parameter_udara: 'Kadmium (Cd)',
      satuan: 'mg/L',
      ekspresi1: '',
      hasil_pengujian1: '',
      ekspresi2: '',
      hasil_pengujian2: '',
      ekspresi3: '',
      hasil_pengujian3: ''
    },
    {
      parameter_udara: 'Krom Total (Cr-T)',
      satuan: 'mg/L',
      ekspresi1: '',
      hasil_pengujian1: '',
      ekspresi2: '',
      hasil_pengujian2: '',
      ekspresi3: '',
      hasil_pengujian3: ''
    },
    {
      parameter_udara: 'Nikel (Ni)',
      satuan: 'mg/L',
      ekspresi1: '',
      hasil_pengujian1: '',
      ekspresi2: '',
      hasil_pengujian2: '',
      ekspresi3: '',
      hasil_pengujian3: ''
    },
    {
      parameter_udara: 'Tembaga (Cu)',
      satuan: 'mg/L',
      ekspresi1: '',
      hasil_pengujian1: '',
      ekspresi2: '',
      hasil_pengujian2: '',
      ekspresi3: '',
      hasil_pengujian3: ''
    },
    {
      parameter_udara: 'Timbal (Pb)',
      satuan: 'mg/L',
      ekspresi1: '',
      hasil_pengujian1: '',
      ekspresi2: '',
      hasil_pengujian2: '',
      ekspresi3: '',
      hasil_pengujian3: ''
    },
    {
      parameter_udara: 'Raksa (Hg)',
      satuan: 'mg/L',
      ekspresi1: '',
      hasil_pengujian1: '',
      ekspresi2: '',
      hasil_pengujian2: '',
      ekspresi3: '',
      hasil_pengujian3: ''
    },
    {
      parameter_udara: 'Selenium (Se)',
      satuan: 'mg/L',
      ekspresi1: '',
      hasil_pengujian1: '',
      ekspresi2: '',
      hasil_pengujian2: '',
      ekspresi3: '',
      hasil_pengujian3: ''
    },
    {
      parameter_udara: 'Seng (Zn)',
      satuan: 'mg/L',
      ekspresi1: '',
      hasil_pengujian1: '',
      ekspresi2: '',
      hasil_pengujian2: '',
      ekspresi3: '',
      hasil_pengujian3: ''
    },
  ]
});

const $loading = useLoading();
const router = useRouter();

const fetchCompanyId = async () => {
  try {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      Swal.fire('Error', 'Silakan login ulang.', 'error');
      return;
    }
    const response = await axios.get('/api/companiesgetID', {
      headers: { Authorization: `Bearer ${token}` },
    });
      formData.value.company_id = response.data.id;
      console.log("dataaaaaaaa",formData.value.company_id)
  } catch (error) {
    console.error('Error fetching company data:', error);
  }
};
const submitForm = async () => {
  const loader = $loading.show();
  try {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      Swal.fire('Error', 'Silakan login ulang.', 'error');
      return;
    }
    const response = await axios.post('/api/pencemaran-udaras', formData.value, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('Pencemaran Udara created:', response.data);
    console.log('ini data ',response.data);
    console.log('ini data id',response.data.data.id);
    if (response.data && response.data.data.id) {
      const PencemaranUdaraId = response.data.data.id;
      for (const detail of formData.value.pencemaranudaraDetails) {
        const detailData = {
          pencemaran_udara_id: PencemaranUdaraId,
          ...detail,
        };

        try {
          const detailResponse = await axios.post('/api/pencemaran-udara-detail', detailData);
          console.log('Pencemaran udara detail added:', detailResponse.data);
        } catch (detailError) {
          console.error('Error adding Pencemaran udara detail:', detailError);
        }
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data Pencemaran Udara Berhasil dibuat!',
      });
      router.push('/Pengendalian/PencemaranUdara');
    }
  } catch (error) {
    console.error('Error creating pencemaran udara entry:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Terjadi Kesalahan.',
    });
  } finally {
    loader.hide();
  }
};

const uploadHasilPemeriksaanLab = async e => {
  const loader = $loading.show();
  try {
    const url = await uploadFile(e.target.files[0]);
    formData.value.file_hasil_pemeriksaan_lab = url;
  } catch (e) {
    console.error(e);
  } finally {
    loader.hide();
  }
};

const uploadDokumentasiSampling = async e => {
  const loader = $loading.show();
  try {
    const url = await uploadFile(e.target.files[0]);
    formData.value.file_dokumentasi_sampling = url;
  } catch (e) {
    console.error(e);
  } finally {
    loader.hide();
  }
};
onMounted(() => {
  fetchCompanyId();
});
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="row">
          <div class="col-lg-12 mx-auto">
            <div class="content-page-header mb-2">
              <h3>Tambah Pemantauan Pencemaran Udara - Fly Ash, Bottom Ash, dan Sludge</h3>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Bulan</label>
                  <select class="form-control" v-model="formData.bulan" required>
                    <option value="" disabled>Pilih Bulan</option>
                    <option v-for="month in ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']" :key="month" :value="month">{{ month }}</option>
                  </select>
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Tahun</label>
                  <input type="text" class="form-control" v-model="formData.tahun" />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">Laboratorium Penguji</label>
                  <input type="text" class="form-control" v-model="formData.lab_penguji" />
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Tanggal Pengujian</label>
                  <input type="date" class="form-control" v-model="formData.tanggal_uji" />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="photo">Upload Hasil Pemeriksaan Lab</label>
                  <input type="file" @change="uploadHasilPemeriksaanLab" class="form-control" />
                  <small class="form-text text-muted">Maksimal ukuran file: 20MB</small>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <img :src="formData.file_hasil_pemeriksaan_lab" alt="" />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="photo">Upload Dokumentasi Sampling</label>
                  <input type="file" @change="uploadDokumentasiSampling" class="form-control" />
                  <small class="form-text text-muted">Maksimal ukuran file: 20MB</small>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <img :src="formData.file_dokumentasi_sampling" alt="" />
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-bordered mb-2">
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
                  <tr v-for="(detail, index) in formData.pencemaranudaraDetails" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ detail.parameter_udara }}</td>
                    <td>{{ detail.satuan }}</td>
                    <td>
                      <select v-model="detail.ekspresi1" class="form-control">
                        <option value="" disabled>Pilih Ekspresi</option>
                        <option value="=">=</option>
                        <option value=">">></option>
                        <option value="<"><</option>
                        <option value=">=">>=</option>
                        <option value="<="><=</option>
                      </select>
                    </td>
                    <td>
                      <input v-model="detail.hasil_pengujian1" class="form-control" placeholder="Enter Hasil Pengujian" />
                    </td>
                    <td>
                      <select v-model="detail.ekspresi2" class="form-control">
                        <option value="" disabled>Pilih Ekspresi</option>
                        <option value="=">=</option>
                        <option value=">">></option>
                        <option value="<"><</option>
                        <option value=">=">>=</option>
                        <option value="<="><=</option>
                      </select>
                    </td>
                    <td>
                      <input v-model="detail.hasil_pengujian2" class="form-control" placeholder="Enter Hasil Pengujian" />
                    </td>
                    <td>
                      <select v-model="detail.ekspresi3" class="form-control">
                        <option value="" disabled>Pilih Ekspresi</option>
                        <option value="=">=</option>
                        <option value=">">></option>
                        <option value="<"><</option>
                        <option value=">=">>=</option>
                        <option value="<="><=</option>
                      </select>
                    </td>
                    <td>
                      <input v-model="detail.hasil_pengujian3" class="form-control" placeholder="Enter Hasil Pengujian" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="text-right">
                <button @click="submitForm" class="btn btn-primary">Simpan</button>
              
              <router-link to="/Pengendalian/PencemaranUdara" class="btn btn-secondary m-2"
                        >Kembali</router-link
                      >
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
