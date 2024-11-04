<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'
import { login, me } from '@/lib/auth.js'
import Swal from 'sweetalert2'

const router = useRouter()
const $loading = useLoading()

// State for password visibility and CAPTCHA
const showPassword = ref(false)
const captcha = ref(generateCaptcha())

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Generate random CAPTCHA
function generateCaptcha() {
  return Math.floor(1000 + Math.random() * 9000) // Generates a 4-digit random number
}

// Refresh CAPTCHA
const refreshCaptcha = () => {
  captcha.value = generateCaptcha()
}

// Handle form submission
const submit = async e => {
  const formData = new FormData(e.target)
  const enteredCaptcha = formData.get('captcha')
  const loader = $loading.show()

  // Verify CAPTCHA
  if (parseInt(enteredCaptcha) !== captcha.value) {
    Swal.fire({
      title: 'CAPTCHA Salah!',
      text: 'Harap masukkan CAPTCHA yang benar.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
    loader.hide()
    return
  }

  try {
    // Login logic
    await login({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    const user = await me()
    Swal.fire({
      title: 'Login Berhasil!',
      text: `Selamat datang, ${user.name || 'pengguna'}!`,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      // Redirect based on user role
      router.push(user.role === 'USER' ? '/MyCompany' : '/Companies')
    })
  } catch (e) {
    Swal.fire({
      title: 'Login Gagal!',
      text: 'Email atau password yang Anda masukkan salah. Silakan coba lagi.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
    console.error(e)
  } finally {
    loader.hide()
  }
}
</script>

<template>
  <MainWrapper :header="false" :sidebar="false">
    <div class="login-pages">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <div class="login-logo">
              <img src="@/assets/img/dlh.jpg" alt="img" style="width: 200px; height: auto" />
            </div>
          </div>
          <div class="col-lg-6 col-xl-7">
            <div class="login-images">
              <img src="@/assets/img/login-banner.png" alt="img" />
            </div>
          </div>
          <form @submit.prevent="submit" class="col-lg-6 col-xl-5">
            <div class="login-content">
              <div class="login-contenthead">
                <h5>Login</h5>
                <h6>Masukan Email dan Password Anda.</h6>
              </div>
              <div class="login-input">
                <div class="form-group">
                  <label>E-mail</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="example@email.com"
                    name="email"
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
                      name="password"
                    />
                    <span
                      class="fas toggle-password"
                      :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                      @click="togglePasswordVisibility"
                    ></span>
                  </div>
                </div>
              </div>
              <!-- CAPTCHA Section -->
              <div class="form-group captcha-group">
                <label>CAPTCHA</label>
                <div class="captcha-placeholder">
                  <span class="captcha-code">{{ captcha }}</span>
                  <button type="button" @click="refreshCaptcha" class="refresh-captcha">
                    &#x21bb; <!-- Refresh icon -->
                  </button>
                  <input
                    type="text"
                    class="form-control mt-2"
                    placeholder="Enter CAPTCHA"
                    name="captcha"
                  />
                </div>
              </div>
              <div class="login-button">
                <button class="btn btn-login">Login</button>
              </div>
              <!-- Forgot password and sign up section -->
              <div class="login-footer mt-3 text-left">
                <a href="forget-password.html" class="d-block mb-2">Lupa password?</a>
                <span>Belum punya akun perusahaan?
                  <RouterLink to="/RegisterCompany" class="signup-link">Daftar</RouterLink>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>

<style>
.captcha-group {
  margin-bottom: 20px;
}

.captcha-placeholder {
  display: flex;
  align-items: center;
  gap: 10px;
}

.captcha-code {
  font-weight: bold;
  font-size: 1.2em;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.refresh-captcha {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  color: #007bff;
}
</style>
