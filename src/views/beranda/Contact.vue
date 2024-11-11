<script setup>
import HeaderHome from '@/components/HeaderHome.vue'
import FooterHome from '@/components/FooterHome.vue'
import '@/assets/css/admin.css'
</script>

<style scoped>
@import '@/assets/css/admin.css';
</style>

<template>
  <main>
    <HeaderHome />
    <!-- /Header -->

    <div class="breadcrumb-bar">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-12">
            <h2 class="breadcrumb-title">Kontak</h2>
            <nav aria-label="breadcrumb" class="page-breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">
                  Kontak
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <div class="content">
      <div class="container">
        <!-- Contact Details -->
        <div class="contact-details">
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-4 d-flex">
              <div class="contact-info flex-fill">
                <span><i class="feather-phone"></i></span>
                <div class="contact-data">
                  <h4>Phone Number</h4>
                  <p>(022) 6632614</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 d-flex">
              <div class="contact-info flex-fill">
                <span><i class="feather-mail"></i></span>
                <div class="contact-data">
                  <h4>Email Address</h4>
                  <p>
                    <a href="mailto:johnsmith@example.com"
                      >dlh@cimahikota.go.id</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 d-flex">
              <div class="contact-info flex-fill">
                <span><i class="feather-map-pin"></i></span>
                <div class="contact-data">
                  <h4>Address</h4>
                  <p>Dinas Lingkungan Hidup Gd.C Lt.4 Komplek Perkantoran Pemkot Cimahi Jl. Rd. Demang Hardjakusumah Cibabat Cimahi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Contact Details -->

        <!-- Get In Touch -->
        <div class="row">
          <div class="col-md-6">
            <div class="contact-img">
              <img src="@/assets/img/522.svg" class="img-fluid" alt="img" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="contact-queries">
              <h2>Get In Touch</h2>
              <form action="contact-us.html">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="col-form-label">Name</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Enter Name*"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="col-form-label">Email</label>
                      <input
                        class="form-control"
                        type="email"
                        placeholder="Enter Email Address*"
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="col-form-label">Phone Number</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Enter Phone Number"
                      />
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">Message</label>
                      <textarea
                        class="form-control"
                        rows="4"
                        placeholder="Type Message"
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <button class="btn btn-primary" type="submit">
                      Send Message<i
                        class="feather-arrow-right-circle ms-2"
                      ></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterHome/>
  </main>
</template>
