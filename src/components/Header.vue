<script setup>
import { useStore } from 'vuex'
import { useLoading } from 'vue-loading-overlay'
import { useRouter } from 'vue-router'
import { logout as authLogout } from '@/lib/auth.js'
import Swal from 'sweetalert2'
import '@/assets/css/admin.css'

const $loading = useLoading()
const store = useStore()
const router = useRouter()

const logout = async () => {
  const loader = $loading.show()
  try {
    await authLogout()
    Swal.fire({
      icon: 'success',
      title: 'Logout berhasil',
      text: 'Anda telah keluar dengan sukses.',
      timer: 2000,
      showConfirmButton: false,
    })
    router.push('/Login')
  } catch (e) {
    alert('error logout')
    console.error(e)
  } finally {
    loader.hide()
  }
}
</script>

<style scoped>
@import "@/assets/css/admin.css";
</style>

<template>
  <div class="header">
    <div class="header-left">
      <a href="index.html" class="logo">
        <img src="@/assets/img/logo.svg" alt="Logo" width="30" height="30" />
      </a>
      <a href="index.html" class="logo-small">
        <img
          src="@/assets/img/logo-small.svg"
          alt="Logo"
          width="30"
          height="30"
        />
      </a>
    </div>
    <a class="mobile_btn" id="mobile_btn" href="javascript:void(0);">
      <i class="fas fa-align-left"></i>
    </a>
    <div class="header-split">
      <div class="page-headers">
        <div class="search-bar">
          <span><i class="fe fe-search"></i></span>
          <input type="text" placeholder="Search" class="form-control" />
        </div>
      </div>
      <ul class="nav user-menu">
        <!-- User Menu -->
        <li class="nav-item dropdown">
          <a
            href="javascript:void(0)"
            class="user-link nav-link"
            data-bs-toggle="dropdown"
          >
            <span class="user-img">
              <img
                class="rounded-circle"
                src="@/assets/img/user.jpg"
                width="40"
                alt="Admin"
              />
              <span class="animate-circle"></span>
            </span>
            <span class="user-content">
              <span class="user-name">{{ store.state.auth.user.name }}</span>
              <span class="user-details">{{ store.state.auth.user.role }}</span>
            </span>
          </a>
          <div class="dropdown-menu menu-drop-user">
            <div class="profilemenu">
              <div class="subscription-menu">
                <ul>
                  <li>
                    <router-link to="/Profile">Profile</router-link>
                  </li>
                  <li>
                    <a href="localization.html">Settings</a>
                  </li>
                </ul>
              </div>
              <div class="subscription-logout">
                <a @click="logout" href="#">Log Out</a>
              </div>
            </div>
          </div>
        </li>
        <!-- /User Menu -->
      </ul>
    </div>
  </div>
</template>

