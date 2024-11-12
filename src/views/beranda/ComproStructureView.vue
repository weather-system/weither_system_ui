<script setup>
import HeaderHome from '@/components/HeaderHome.vue'
import FooterHome from '@/components/FooterHome.vue'
import '@/assets/css/style.css'
</script>

<style scoped>
@import "@/assets/css/style.css";
</style>

<template>
  <main>
    <HeaderHome />

    <!-- Breadcrumb -->
    <div class="breadcrumb-bar">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-12">
            <h2 class="breadcrumb-title">Profile</h2>
            <nav aria-label="breadcrumb" class="page-breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/Home">Home</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Struktur Organisasi
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <div class="content p-0">
      
    </div>

    <FooterHome/>
  </main>
</template>
