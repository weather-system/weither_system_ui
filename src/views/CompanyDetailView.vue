<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { getCompany } from '@/lib/company.js'
import MainWrapper from '@/components/MainWrapper.vue'

const route = useRoute()
const $loading = useLoading()

const company = ref({})

watch(
  () => route.query.id,
  async (latest, _) => {
    const loader = $loading.show()
    try {
      const data = await getCompany(latest)
      company.value = data
    } catch (e) {
      console.error(e)
    } finally {
      loader.hide()
    }
  },
  { immediate: true },
)
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content w-100">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-grouphead">
              <h2>Company Information</h2>
            </div>
          </div>
          <div class="form-group">
            <label>Company Name</label>
            <p class="profile-new">{{ company.name }}</p>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>PKPLH / UKL UPL & DPLH</label>
              <p class="profile-new">{{ company.no_pkplh }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>SKKL / AMDAL / DELH</label>
              <p class="profile-new">{{ company.no_skkl }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label for="nibFile">NIB</label>
              <p class="profile-new">{{ company.nib }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Activity Type</label>
              <p class="profile-new">{{ company.activity_type }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Nama Pimpinan</label>
              <p class="profile-new">{{ company.leader_name }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Pemrakarsa</label>
              <p class="profile-new">{{ company.pemrakarsa }}</p>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group">
              <label>Address</label>
              <p class="profile-new">{{ company.address }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>UKL UPL Person In Charge</label>
              <p class="profile-new">{{ company.in_charge_ukl_upl }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Contact Number</label>
              <p class="profile-new">{{ company.contact_person }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
