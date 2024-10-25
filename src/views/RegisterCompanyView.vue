<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { registerCompany } from '@/lib/company.js'
import { uploadFile } from '@/lib/filestorage.js'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()
const router = useRouter()

// Reactive variable to toggle password visibility
const showPassword = ref(false)
const urlNIB = ref('')

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const uploadNIB = async e => {
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

const submit = async e => {
  const formData = new FormData(e.target)
  const formDataObj = {}
  formData.forEach((value, key) => (formDataObj[key] = value))

  const loader = $loading.show()
  try {
    const data = await registerCompany({ ...formDataObj, nib: urlNIB.value })
    router.push('/Login')
  } catch (e) {
    console.error(e)
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
                  Registrasi Perusahaan
                </h5>
                <p
                  class="text-center"
                  style="
                    font-family: 'Poppins', sans-serif;
                    font-size: 14px;
                    color: #6c757d;
                  "
                >
                  Masukkan detail perusahaan Anda dengan benar.
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
                    <textarea
                      name="address"
                      class="form-control"
                      rows="2"
                      placeholder="Alamat Perusahaan"
                    ></textarea>
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
                    <label class="form-label">Nomer Kontak</label>
                    <input
                      name="contact_person"
                      type="text"
                      class="form-control"
                      placeholder="Masukkan Nomer Kontak"
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
                        name="confirm_password"
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
                  <div class="col-12">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="emailActivation"
                      />
                      <label class="form-check-label" for="emailActivation">
                        Perlu aktivasi via email?
                      </label>
                    </div>
                  </div>
                  <div class="col-12 text-center mt-4">
                    <button type="submit" class="btn btn-primary btn-block">
                      Daftar Perusahaan
                    </button>
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
