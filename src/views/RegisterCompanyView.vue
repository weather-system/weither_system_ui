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
    <div class="login-pages py-5">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-5 text-center mb-4">
            <img src="@/assets/img/dlh.jpg" alt="Logo" style="width: 200px; height: auto" />
          </div>
          <div class="col-lg-7">
            <div class="card shadow p-4">
              <div class="login-contenthead mb-3">
                <h5 class="mb-1 text-center">Registrasi Perusahaan</h5>
                <p class="text-center">Masukkan detail perusahaan Anda dengan benar.</p>
              </div>

              <form>
                <div class="row g-3">
                  <!-- Nomor PKPLH / UKL UPL & DPLH -->
                  <div class="col-md-6">
                    <label class="form-label">Nomor PKPLH / UKL UPL & DPLH</label>
                    <input type="text" class="form-control" placeholder="Masukkan Nomor PKPLH" />
                  </div>

                  <!-- SKKL / AMDAL / DELH -->
                  <div class="col-md-6">
                    <label class="form-label">SKKL / AMDAL / DELH</label>
                    <input type="text" class="form-control" placeholder="Masukkan SKKL atau AMDAL" />
                  </div>

                  <!-- NIB dengan Upload -->
                  <div class="col-md-6">
                    <label class="form-label">NIB</label>
                    <input type="file" class="form-control" />
                    <small class="text-muted">Sertakan nomor KBLI</small>
                  </div>

                  <!-- Jenis Kegiatan -->
                  <div class="col-md-6">
                    <label class="form-label">Jenis Kegiatan</label>
                    <input type="text" class="form-control" placeholder="Permen 5/2014" />
                  </div>

                  <!-- Pemrakarsa -->
                  <div class="col-md-6">
                    <label class="form-label">Pemrakarsa</label>
                    <input type="text" class="form-control" placeholder="Nama Pemrakarsa" />
                  </div>

                  <!-- Nama Pimpinan -->
                  <div class="col-md-6">
                    <label class="form-label">Nama Pimpinan</label>
                    <input type="text" class="form-control" placeholder="Nama Pimpinan Perusahaan" />
                  </div>

                  <!-- Alamat -->
                  <div class="col-md-12">
                    <label class="form-label">Alamat</label>
                    <textarea class="form-control" rows="2" placeholder="Alamat Perusahaan"></textarea>
                  </div>

                  <!-- Penanggung jawab UKL UPL -->
                  <div class="col-md-6">
                    <label class="form-label">Penanggung Jawab UKL UPL</label>
                    <input type="text" class="form-control" placeholder="Nama Penanggung Jawab" />
                  </div>

                  <!-- Kontak Person -->
                  <div class="col-md-6">
                    <label class="form-label">Kontak Person</label>
                    <input type="text" class="form-control" placeholder="Kontak Person" />
                  </div>

                  <!-- Username -->
                  <div class="col-md-6">
                    <label class="form-label">Username</label>
                    <input type="text" class="form-control" placeholder="Username" />
                  </div>

                  <!-- Email Perusahaan -->
                  <div class="col-md-6">
                    <label class="form-label">Email Perusahaan</label>
                    <input type="email" class="form-control" placeholder="example@company.com" />
                  </div>

                  <!-- Password -->
                  <div class="col-md-6">
                    <label class="form-label">Password</label>
                    <div class="pass-group position-relative">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control"
                        placeholder="********"
                      />
                      <span
                        class="fas toggle-password position-absolute"
                        :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                        @click="togglePasswordVisibility"
                        style="top: 50%; right: 10px; transform: translateY(-50%); cursor: pointer;"
                      ></span>
                    </div>
                  </div>

                  <!-- Confirm Password -->
                  <div class="col-md-6">
                    <label class="form-label">Confirm Password</label>
                    <div class="pass-group position-relative">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control"
                        placeholder="********"
                      />
                      <span
                        class="fas toggle-password position-absolute"
                        :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                        @click="togglePasswordVisibility"
                        style="top: 50%; right: 10px; transform: translateY(-50%); cursor: pointer;"
                      ></span>
                    </div>
                  </div>

                  <!-- Checkbox Aktivasi -->
                  <div class="col-12">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="emailActivation" />
                      <label class="form-check-label" for="emailActivation">
                        Perlu aktivasi via email?
                      </label>
                    </div>
                  </div>

                  <!-- Submit Button -->
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
