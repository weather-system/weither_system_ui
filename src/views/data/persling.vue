<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useLoading } from 'vue-loading-overlay'
import { getMyCompany } from '@/lib/company.js'
import MainWrapper from '@/components/MainWrapper.vue'

const store = useStore()
const $loading = useLoading()

const company = ref(null)

onMounted(async () => {
  const loader = $loading.show()
  try {
    const data = await getMyCompany()
    if (data) {
      company.value = data
    }
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
})
</script>

<template>
  <MainWrapper>
    <div v-if="company" class="page-wrapper page-settings">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="p-5">
              <div class="login-contenthead mt-3 mb-3">
                <h5
                  class="mb-1 text-center"
                  style="font-family: 'Poppins', sans-serif; font-weight: 600"
                >
                  Data Perusahaan
                </h5>
              </div>

              <!-- Dropdown to select registration type -->
              <div class="row">
                <label
                  class="form-label fw-bold"
                  style="
                    font-family: 'Poppins', sans-serif;
                    font-size: 14px;
                    color: #6c757d;
                  "
                  >Pelaku Usaha :</label
                >
                <!-- Company Signup -->
                <div class="col-md-6" v-if="company.businessmen === 'company'">
                  <div class="choose-signup flex-fill">
                    <h6>Perusahaan</h6>
                    <div class="choose-img">
                      <img src="@/assets/img/company.png" alt="Company Image" />
                    </div>
                  </div>
                </div>
                <!-- /Company Signup -->

                <!-- Individual Signup -->
                <div
                  class="col d-flex justify-content-center align-items-center"
                  v-if="company.businessmen === 'individual'"
                >
                  <div class="choose-signup flex-fill mb-0">
                    <h6>Perseorangan</h6>
                    <div class="center">
                      <img
                        src="@/assets/img/individual.png"
                        alt="Individual Image"
                      />
                    </div>
                  </div>
                </div>
                <!-- /Individual Signup -->
              </div>

              <!-- Company Registration Form -->
              <div v-if="company.businessmen === 'company'">
                <div class="row">
                  <div class="row">
                    <div class="col-md-12" style="margin-top: 20px">
                      <label class="form-label fw-bold">Nama Perusahaan</label>
                      <p>{{ company.name }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6" style="margin-top: 20px">
                      <label class="form-label fw-bold">Nama Pimpinan</label>
                      <p>{{ company.leader_name }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12" style="margin-top: 20px">
                      <label class="form-label fw-bold">Alamat</label>
                      <p>
                        {{ company.address }}, Kec. {{ company.kecamatan }},
                        Kel. {{ company.kelurahan }}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6" style="margin-top: 20px">
                      <label class="form-label fw-bold">Email Perusahaan</label>
                      <p>{{ company.company_email }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      v-if="pj_dokling_name"
                      class="col-md-6"
                      style="margin-top: 20px"
                    >
                      <label class="form-label fw-bold"
                        >Penanggung Jawab Dokumen Lingkungan</label
                      >
                      <p>{{ company.pj_dokling_name }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6" style="margin-top: 20px">
                      <label class="form-label fw-bold"
                        >Besaran Investasi</label
                      >
                      <p>{{ company.activity_type }}</p>
                      <p v-if="company.activity_type === 'Mikro'">
                        Modal usaha maksimal 1.000.000.000
                      </p>
                      <p v-if="company.activity_type === 'Kecil'">
                        Modal usaha antara 1.000.000.000 - 5.000.000.000
                      </p>
                      <p v-if="company.activity_type === 'Menengah'">
                        Modal usaha antara 5.000.000.000 - 10.000.000.000
                      </p>
                      <p v-if="company.activity_type === 'Besar'">
                        Modal usaha lebih dari 10.000.000.000
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 mt-3">
                      <label class="form-label fw-bold">Jenis Dokumen</label>
                      <p>{{ company.document_type }}</p>
                    </div>
                  </div>

                  <!-- Kondisi untuk AMDAL dan DELH -->
                  <div class="row">
                    <div v-if="company.no_skklh" class="row mt-3">
                      <div class="col-md-6">
                        <label class="form-label fw-bold"
                          >Nomor Persetujuan Lingkungan SKKLH</label
                        >
                        <p>{{ company.no_skklh }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div v-if="company.photo_skklh" class="col-md-6">
                        <label class="form-label fw-bold"
                          >Upload File SKKLH</label
                        >
                        <img
                          :src="company.photo_skklh"
                          alt="Uploaded Photo"
                          class="img-thumbnail mt-2"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- Kondisi untuk UKL/UPL dan DPLH -->
                  <div v-if="company.pkplh_number" class="row mt-3">
                    <div class="row">
                      <div class="col-md-6">
                        <label class="form-label fw-bold"
                          >Nomor Persetujuan Lingkungan PKPLH</label
                        >
                        <p>{{ company.pkplh_number }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label class="form-label fw-bold"
                          >Upload File PKPLH</label
                        >
                        <img
                          :src="company.photo_pkplh"
                          alt="Uploaded Photo"
                          class="img-thumbnail mt-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="row mt-3">
                      <div class="col-md-6">
                        <label class="form-label fw-bold">NIB</label>
                        <p>{{ company.nib }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div v-if="company.photo_nib" class="col-md-6">
                        <label class="form-label fw-bold"
                          >Upload File NIB (PDF)</label
                        >
                        <img
                          :src="company.photo_nib"
                          alt="Uploaded Photo"
                          class="img-thumbnail mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Individual Registration Form -->
              <form v-if="company.businessmen === 'individual'">
                <div class="row">
                  <div class="row">
                  <div class="col-md-6" style="margin-top: 20px">
                    <label class="form-label fw-bold">Nama Pimpinan</label>
                    <p>{{ company.leader_name }}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12" style="margin-top: 20px">
                    <label class="form-label fw-bold">Alamat</label>
                    <p>
                      {{ company.address }}, Kec. {{ company.kecamatan }}, Kel.
                      {{ company.kelurahan }}
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6" style="margin-top: 20px">
                    <label class="form-label fw-bold">Email Perusahaan</label>
                    <p>{{ company.company_email }}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6" style="margin-top: 20px">
                    <label class="form-label fw-bold">Nama PJ Dokling</label>
                    <p>{{ company.pj_dokling_name }}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6" style="margin-top: 20px">
                    <label class="form-label fw-bold">Besaran Investasi</label>
                    <p>{{ company.activity_type }}</p>
                    <p v-if="company.activity_type === 'Mikro'">
                      Modal usaha maksimal 1.000.000.000
                    </p>
                    <p v-if="company.activity_type === 'Kecil'">
                      Modal usaha antara 1.000.000.000 - 5.000.000.000
                    </p>
                    <p v-if="company.activity_type === 'Menengah'">
                      Modal usaha antara 5.000.000.000 - 10.000.000.000
                    </p>
                    <p v-if="company.activity_type === 'Besar'">
                      Modal usaha lebih dari 10.000.000.000
                    </p>
                  </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mt-3">
                      <label class="form-label fw-bold">Jenis Dokumen</label>
                      <p>{{ company.document_type }}</p>
                    </div>
                  </div>

                  <!-- Kondisi untuk AMDAL dan DELH -->
                  <div class="row">
                    <div v-if="company.no_skklh" class="row mt-3">
                      <div class="col-md-6">
                        <label class="form-label fw-bold"
                          >Nomor Persetujuan Lingkungan SKKLH</label
                        >
                        <p>{{ company.no_skklh }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div v-if="company.photo_skklh" class="col-md-6">
                        <label class="form-label fw-bold"
                          >Upload File SKKLH</label
                        >
                        <img
                          :src="company.photo_skklh"
                          alt="Uploaded Photo"
                          class="img-thumbnail mt-2"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- Kondisi untuk UKL/UPL dan DPLH -->
                  <div v-if="company.pkplh_number" class="row mt-3">
                    <div class="row">
                      <div class="col-md-6">
                        <label class="form-label fw-bold"
                          >Nomor Persetujuan Lingkungan PKPLH</label
                        >
                        <p>{{ company.pkplh_number }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label class="form-label fw-bold"
                          >Upload File PKPLH</label
                        >
                        <img
                          :src="company.photo_pkplh"
                          alt="Uploaded Photo"
                          class="img-thumbnail mt-2"
                        />
                      </div>
                    </div>
                  </div>
                <div class="row">
                  <div class="row mt-3">
                    <div class="col-md-6">
                      <label class="form-label fw-bold">NIB</label>
                      <p>{{ company.nib }}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Upload File NIB</label>
                      <img
                        :src="company.photo_nib"
                        alt="Uploaded Photo"
                        class="img-thumbnail mt-2"
                      />
                    </div>
                  </div>
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

<style scoped>
.login-pages {
  background-color: #f8f9fa;
  min-height: 100vh; /* Pastikan ketinggian minimum memenuhi layar */
}
.card {
  border-radius: 10px;
}
.shadow-sm {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
