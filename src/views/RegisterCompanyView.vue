<script setup>
import { ref } from 'vue';
import MainWrapper from '@/components/MainWrapper.vue';

// Reactive variable to toggle password visibility
const showPassword = ref(false);

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <MainWrapper :header="false" :sidebar="false">
    <div class="login-pages d-flex align-items-center justify-content-center min-vh-100">
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
                <h5 class="mb-1 text-center" style="font-family: 'Poppins', sans-serif; font-weight: 600;">
                  Registrasi Perusahaan
                </h5>
                <p class="text-center" style="font-family: 'Poppins', sans-serif; font-size: 14px; color: #6c757d;">
                  Masukkan detail perusahaan Anda dengan benar.
                </p>
              </div>

              <form>
                <div class="row g-2">
                  <!-- Form Inputs -->
                  <div class="col-md-6">
                    <label class="form-label">Nomor PKPLH / UKL UPL & DPLH</label>
                    <input type="text" class="form-control" placeholder="Masukkan Nomor PKPLH" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">SKKL / AMDAL / DELH</label>
                    <input type="text" class="form-control" placeholder="Masukkan SKKL atau AMDAL" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">NIB</label>
                    <input type="file" class="form-control" />
                    <small class="text-muted">Sertakan nomor KBLI</small>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Jenis Kegiatan</label>
                    <input type="text" class="form-control" placeholder="Permen 5/2014" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Pemrakarsa</label>
                    <input type="text" class="form-control" placeholder="Nama Pemrakarsa" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Nama Pimpinan</label>
                    <input type="text" class="form-control" placeholder="Nama Pimpinan Perusahaan" />
                  </div>
                  <div class="col-md-12">
                    <label class="form-label">Alamat</label>
                    <textarea class="form-control" rows="2" placeholder="Alamat Perusahaan"></textarea>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Penanggung Jawab UKL UPL</label>
                    <input type="text" class="form-control" placeholder="Nama Penanggung Jawab" />
                  </div>
                  <div class="col-12">
                    <h6 class="fw-bold">Kontak Person</h6>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Username</label>
                    <input type="text" class="form-control" placeholder="Username" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Email Perusahaan</label>
                    <input type="email" class="form-control" placeholder="example@company.com" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Password</label>
                    <div class="pass-group position-relative">
                      <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="********" />
                      <span
                        class="fas toggle-password position-absolute"
                        :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                        @click="togglePasswordVisibility"
                        style="top: 50%; right: 10px; transform: translateY(-50%); cursor: pointer;"
                      ></span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Confirm Password</label>
                    <div class="pass-group position-relative">
                      <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="********" />
                      <span
                        class="fas toggle-password position-absolute"
                        :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                        @click="togglePasswordVisibility"
                        style="top: 50%; right: 10px; transform: translateY(-50%); cursor: pointer;"
                      ></span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="emailActivation" />
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
