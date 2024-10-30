<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import { registerCompany } from '@/lib/company.js'
import { uploadFile } from '@/lib/filestorage.js'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()
const router = useRouter()

const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false)
const showPassword2 = ref(false)
const urlNIB = ref('')

const kecamatanData = [
  {
    kecamatan: "Cimahi Selatan",
    kelurahan: ["Cibeber", "Cibeureum", "Leuwigajah", "Melong", "Utama"]
  },
  {
    kecamatan: "Cimahi Tengah",
    kelurahan: ["Baros", "Cigugur Tengah", "Cimahi", "Karangmekar", "Padasuka", "Setiamanah"]
  },
  {
    kecamatan: "Cimahi Utara",
    kelurahan: ["Cibabat", "Cipageran", "Citeureup", "Pasirkaliki"]
  }
]

const selectedKecamatan = ref('')
const selectedKelurahan = ref('')
const filteredKelurahan = computed(() => {
  const kecamatan = kecamatanData.find(item => item.kecamatan === selectedKecamatan.value)
  return kecamatan ? kecamatan.kelurahan : []
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
const togglePasswordVisibility2 = () => {
  showPassword2.value = !showPassword2.value
}
const uploadNIB = async (e) => {
  const loader = $loading.show()
  try {
    const url = await uploadFile(e.target.files[0])
    urlNIB.value = url
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}
const isPasswordMatch = computed(() => {
  const match = password.value && password.value === confirmPassword.value;
  return match;
});
const passwordMatchMessage = computed(() =>
  isPasswordMatch.value ? 'Passwords sesuai' : 'Passwords tidak sesuai'
);
const updateKelurahan = () => {
  selectedKelurahan.value = ''
}
const submit = async (e) => {
  const formData = new FormData(e.target)
  console.log("Selected Kecamatan:", selectedKecamatan.value);
  console.log("Selected Kelurahan:", selectedKelurahan.value);
  formData.append('kecamatan', selectedKecamatan.value)
  formData.append('kelurahan', selectedKelurahan.value)
  const formDataObj = Object.fromEntries(formData)
  formDataObj['status'] = 'PENDING';
  console.log("Data to be sent to backend:", { ...formDataObj, nib: urlNIB.value });
  const loader = $loading.show()
  try {
    const data = await registerCompany({ ...formDataObj, nib: urlNIB.value })

    // SweetAlert success message
    Swal.fire({
      title: 'Registrasi Berhasil!',
      text: 'Akun perusahaan Anda telah terdaftar.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      router.push('/Login')
    })
  } catch (e) {
    console.error(e)

    // SweetAlert error message for registration failure
    Swal.fire({
      title: 'Registrasi Gagal!',
      text: 'Terjadi kesalahan saat registrasi. Silakan coba lagi.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  } finally {
    loader.hide()
  }
}
</script>

<template>
  <MainWrapper :header="false" :sidebar="false">
    <div
      class="login-pages d-flex align-items-center justify-content-center min-vh-100"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="login-logo">
            <img
              src="@/assets/img/dlh.jpg"
              alt="img"
              style="width: 200px; height: auto"
            />
          </div>

          <!-- Form Card -->
          <div class="col-lg-6">
            <div class="card shadow-lg p-5">
              <div class="login-contenthead mb-3">
                <h5
                  class="mb-1 text-center"
                  style="font-family: 'Poppins', sans-serif; font-weight: 600"
                >
                  Registrasi
                </h5>
                <p
                  class="text-center"
                  style="
                    font-family: 'Poppins', sans-serif;
                    font-size: 14px;
                    color: #6c757d;
                  "
                >
                  Masukkan detail kegiatan atau usaha dengan benar.
                </p>
              </div>

              <form @submit.prevent="submit">
                <div class="row g-2">
                  <!-- Form Inputs -->
                  <div class="col-md-12">
                    <label class="form-label">Nama Perusahaan</label>
                    <input
                      name="name"
                      type="text"
                      class="form-control"
                      placeholder="Masukkan Nama Perusahaan"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label"
                      >Nomor PKPLH / UKL UPL & DPLH</label
                    >
                    <input
                      name="no_pkplh"
                      type="text"
                      class="form-control"
                      placeholder="Masukkan Nomor PKPLH"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">SKKL / AMDAL / DELH</label>
                    <input
                      name="no_skkl"
                      type="text"
                      class="form-control"
                      placeholder="Masukkan SKKL atau AMDAL"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">NIB</label>
                    <input
                      type="file"
                      class="form-control"
                      @change="uploadNIB"
                    />
                    <small class="text-muted">Sertakan nomor KBLI</small>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Jenis Kegiatan</label>
                    <input
                      name="activity_type"
                      type="text"
                      class="form-control"
                      placeholder="Permen 5/2014"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Pemrakarsa</label>
                    <input
                      name="pemrakarsa"
                      type="text"
                      class="form-control"
                      placeholder="Nama Pemrakarsa"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Nama Pimpinan</label>
                    <input
                      name="leader_name"
                      type="text"
                      class="form-control"
                      placeholder="Nama Pimpinan Perusahaan"
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="form-label">Alamat</label>
                    <input
                      name="address"
                      class="form-control"
                      rows="1"
                      placeholder="Masukkan Alamat"
                    ></input>
                  </div>
                  <div>
                    <div class="col-md-12 mt-3">
                      <label class="form-label">Kecamatan</label>
                      <select v-model="selectedKecamatan" @change="updateKelurahan" class="form-control">
                        <option disabled value="">Pilih Kecamatan</option>
                        <option v-for="kec in kecamatanData" :key="kec.kecamatan" :value="kec.kecamatan">
                          {{ kec.kecamatan }}
                        </option>
                      </select>
                    </div>
                      <div class="col-md-12 mt-3">
                        <label class="form-label">Kelurahan</label>
                        <select v-model="selectedKelurahan" class="form-control" :disabled="!filteredKelurahan.length">
                          <option disabled value="">Pilih Kelurahan</option>
                          <option v-for="kel in filteredKelurahan" :key="kel" :value="kel">
                            {{ kel }}
                          </option>
                        </select>
                      </div>
                    </div>
                  <div class="col-md-6">
                    <label class="form-label">Penanggung Jawab UKL UPL</label>
                    <input
                      name="in_charge_ukl_upl"
                      type="text"
                      class="form-control"
                      placeholder="Nama Penanggung Jawab"
                    />
                  </div>
                  <div class="col-12">
                    <label class="form-label">Nomor Kontak</label>
                    <input
                      name="contact_person"
                      type="text"
                      class="form-control"
                      placeholder="Masukkan Nomor Kontak"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Username</label>
                    <input
                      name="username"
                      type="text"
                      class="form-control"
                      placeholder="Username"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Email Perusahaan</label>
                    <input
                      name="company_email"
                      type="email"
                      class="form-control"
                      placeholder="example@company.com"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Password</label>
                    <div class="pass-group position-relative">
                      <input
                        v-model="password"
                        name="password"
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control"
                        placeholder="********"
                      />
                      <span
                        class="fas toggle-password position-absolute"
                        :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                        @click="togglePasswordVisibility"
                        style="
                          top: 50%;
                          right: 10px;
                          transform: translateY(-50%);
                          cursor: pointer;
                        "
                      ></span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Confirm Password</label>
                    <div class="pass-group position-relative">
                      <input
                        v-model="confirmPassword"
                        name="confirm_password"
                        :type="showPassword2 ? 'text' : 'password'"
                        class="form-control"
                        placeholder="********"
                      />
                      <span
                        class="fas toggle-password position-absolute"
                        :class="showPassword2 ? 'fa-eye' : 'fa-eye-slash'"
                        @click="togglePasswordVisibility2"
                        style="
                          top: 50%;
                          right: 10px;
                          transform: translateY(-50%);
                          cursor: pointer;
                        "
                      ></span>
                      <small
                        v-if="confirmPassword"
                        :class="{'text-success': isPasswordMatch, 'text-danger': !isPasswordMatch}"
                      >
                        {{ passwordMatchMessage }}
                      </small>
                    </div>
                  </div>
                  <div class="col-12 text-center mt-4">
                    <button
                      type="submit"
                      class="btn btn-primary btn-block"
                      :disabled="!isPasswordMatch"
                    >
                      Daftar
                    </button>
                  </div>
                  <div class="login-footer mt-3 text-left">
                <span
                  >Sudah punya akun ?
                  <RouterLink to="/Login" class="signup-link"
                    >Login</RouterLink
                  >
                </span>
              </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
