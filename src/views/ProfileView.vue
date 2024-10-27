<script setup>
import { ref } from 'vue'
import MainWrapper from '@/components/MainWrapper.vue'

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
              <p class="profile-new">{{ profileData.name }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>User Name</label>
              <p class="profile-new">{{ profileData.username }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Email</label>
              <p class="profile-new">{{ profileData.email }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Mobile Number</label>
              <p class="profile-new">{{ profileData.mobileNumber }}</p>
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
            <p class="profile-new">{{ profileData.companyName }}</p>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>PKPLH / UKL UPL & DPLH</label>
              <p class="profile-new">{{ profileData.pkplhNumber }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>SKKL / AMDAL / DELH</label>
              <p class="profile-new">{{ profileData.skklNumber }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label for="nibFile">NIB</label>
              <p class="profile-new">{{ profileData.nibFile }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Activity Type</label>
              <p class="profile-new">{{ profileData.activityType }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Nama Pimpinan</label>
              <p class="profile-new">{{ profileData.leaderName }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Pemrakarsa</label>
              <p class="profile-new">{{ profileData.proponent }}</p>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group">
              <label>Address</label>
              <p class="profile-new">{{ profileData.address }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>UKL UPL Person In Charge</label>
              <p class="profile-new">{{ profileData.uklUplPIC }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Contact Number</label>
              <p class="profile-new">{{ profileData.contactNumber }}</p>
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
