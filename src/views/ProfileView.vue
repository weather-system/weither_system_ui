<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useLoading } from 'vue-loading-overlay'
import { getMyCompany } from '@/lib/company.js'
import MainWrapper from '@/components/MainWrapper.vue'

const store = useStore()
const $loading = useLoading()

const company = ref({})

// Data reactive untuk menampung input form
const profileData = ref({
  profilePicture: '',
  name: 'MUHAMMAD AZHARI',
  username: 'azhariganteng',
  email: 'azhari.admin@mail.com',
  mobileNumber: '08165579856',
  companyName: 'PT. CEK TEZZ ORGANIZATION',
  pkplhNumber: '152328492149',
  skklNumber: '2897753124876',
  nibFile: 'nomerNIB.pdf',
  activityType: 'INDUSTRI TEKSTIL',
  leaderName: 'RIZKYA WILDANI YAHYA',
  proponent: 'PT. ARDI FAJAR MAULANA',
  address:
    'Jalan. PHH. Mustsofa No.4, RT. 10, RW. 09, KELURAHAN PASIRLAYUNG, KECAMATAN CIBEUNYING KIDUL',
  uklUplPIC: 'MUHAMAD RAMADIKA ARDIANSYAH',
  contactNumber: '081210638156',
})

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
    <div class="page-wrapper page-settings">
      <div class="content w-100">
        <div class="content-page-header">
          <h5>Profile Settings</h5>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="form-grouphead">
              <h2>Profile Picture</h2>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="profile-upload">
              <div class="profile-upload-img">
                <img
                  src="@/assets/img/customer/user-01.jpg"
                  alt="img"
                  id="blah"
                />
              </div>
            </div>
          </div>

          <div class="col-lg-12">
            <div class="form-grouphead">
              <h2>Profile</h2>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Name</label>
              <p class="profile-new">{{ store.state.auth.user.name }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>User Name</label>
              <p class="profile-new">{{ company.username }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Email</label>
              <p class="profile-new">{{ store.state.auth.user.email }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Mobile Number</label>
              <p class="profile-new">{{ company.contact_person }}</p>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="btn-path">
              <a href="javascript:void(0);" class="btn btn-primary"
                >Edit Profile</a
              >
            </div>
          </div>
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
          <div class="col-lg-12">
            <div class="btn-path">
              <a href="javascript:void(0);" class="btn btn-primary"
                >Edit Company Profile</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
