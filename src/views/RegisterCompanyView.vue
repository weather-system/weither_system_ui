<script setup>
import { ref } from 'vue';
import MainWrapper from '@/components/MainWrapper.vue';

// Define a reactive variable to toggle password visibility
const showPassword = ref(false);

// Method to toggle the password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <MainWrapper :header="false" :sidebar="false">
    <div class="login-pages">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <div class="login-logo">
              <img src="@/assets/img/logo-login.png" alt="img" />
            </div>
          </div>
          <div class="col-lg-6 col-xl-7">
            <div class="login-images">
              <img src="@/assets/img/login-banner.png" alt="img" />
            </div>
          </div>
          <div class="col-lg-6 col-xl-5">
            <div class="login-content">
              <div class="login-contenthead">
                <h5>Registrasi Perusahaan</h5>
                <h6>Masukan Email dan Password Anda.</h6>
              </div>
              <div class="login-input">
                <div class="form-group">
                  <label>E-mail</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="example@email.com"
                  />
                </div>
                <div class="form-group">
                  <div class="d-flex justify-content-between">
                    <label>Password</label>
                    <a class="forgetpassword-link" href="forget-password.html"
                      >Forgot password?</a
                    >
                  </div>
                  <div class="pass-group">
                    <!-- Bind the input type to show/hide password -->
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control pass-input"
                      placeholder="********"
                    />
                    <!-- Eye icon for toggling password visibility -->
                    <span 
                      class="fas toggle-password" 
                      :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                      @click="togglePasswordVisibility"
                      style="cursor: pointer;"
                    ></span>
                  </div>
                </div>
                <div class="filter-checkbox m-0">
                </div>
              </div>
              <div class="login-button">
                <a href="index.html" class="btn btn-login">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
