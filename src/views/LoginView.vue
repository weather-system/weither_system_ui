<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'
import { login, me } from '@/lib/auth.js'

const router = useRouter()
const $loading = useLoading()

// Reactive variable to toggle password visibility
const showPassword = ref(false)

// Function to toggle the password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const submit = async e => {
  const formData = new FormData(e.target)

  const loader = $loading.show()
  try {
    await login({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    const user = await me()
    if (user.role === 'USER') {
      router.push('/MyCompany')
      return
    }
    router.push('/Companies')
  } catch (e) {
    alert('error login')
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
              <img
                src="@/assets/img/dlh.jpg"
                alt="img"
                style="width: 200px; height: auto"
              />
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
              <div class="login-button">
                <button class="btn btn-login">Login</button>
              </div>
              <!-- Forgot password and sign up section -->
              <div class="login-footer mt-3 text-left">
                <a href="forget-password.html" class="d-block mb-2"
                  >Forgot password?</a
                >
                <span
                  >Belum punya akun perusahaan?
                  <RouterLink to="/RegisterCompany" class="signup-link"
                    >Sign Up</RouterLink
                  >
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
