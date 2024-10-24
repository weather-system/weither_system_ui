<script setup>
import MainWrapper from '@/components/MainWrapper.vue'
import { ref } from 'vue'

// Reactive variable to toggle password visibility
const showPassword = ref(false)

// Function to toggle the password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <MainWrapper :header="false" :sidebar="false">
    <div class="login-pages">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <div class="login-logo">
              <img src="@/assets/img/dlh.jpg" alt="img" style="width: 200px; height: auto;" />
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
                <h5>Login Perusahaan</h5>
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
                  </div>
                  <div class="pass-group">
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control pass-input"
                      placeholder="********"
                    />
                    <span 
                      class="fas toggle-password"
                      :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                      @click="togglePasswordVisibility"
                    ></span>                    
                  </div>
                </div>
              </div>
              <div class="login-button">
                <a href="index.html" class="btn btn-login">Login</a>
              </div>
              <!-- Forgot password and sign up section -->
              <div class="login-footer mt-3 text-left">
                <a href="forget-password.html" class="d-block mb-2">Forgot password?</a>
                <span>Belum punya akun perusahaan? 
                  <a href="sign-up.html" class="signup-link">Sign Up</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
