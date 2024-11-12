<script setup>
import MainWrapper from '@/components/MainWrapper.vue'
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
              <div class="profile-upload-content">
                <div class="profile-upload-btn">
                  <div class="profile-upload-file">
                    <input type="file" id="imgInp" />
                    <a href="javascript:void(0);" class="btn btn-upload"
                      >Upload</a
                    >
                  </div>
                  <a href="javascript:void(0);" class="btn btn-remove"
                    >Remove</a
                  >
                </div>
                <div class="profile-upload-para">
                  <p>
                    *image size should be at least 320px big,and less then
                    500kb. Allowed files .png and .jpg.
                  </p>
                </div>
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
              <input
                type="text"
                class="form-control"
                placeholder="Enter your name"
              />
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>User Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your user name"
              />
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Email</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your Email"
              />
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your Number"
              />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="btn-path">
              <a href="javascript:void(0);" class="btn btn-primary"
                >Save Changes</a
              >
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-grouphead">
              <h2>Company Information</h2>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group">
              <label>Company Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your Company Name"
              />
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>PKPLH / UKL UPL & DPLH</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter the Number"
              />
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>SKKL / AMDAL / DELH</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter the Number"
              />
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label for="nibFile">NIB</label>
              <input
                type="file"
                class="form-control"
                id="nibFile"
                placeholder="Upload NIB file"
              />
              <small class="form-text text-muted">Maksimal ukuran file: 20MB</small>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Activity Type</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your Pincode"
              />
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Nama Pimpinan</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your City"
              />
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Pemrakarsa</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your Pincode"
              />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group">
              <label>Address</label>
              <textarea
                class="form-control"
                rows="2"
                placeholder="Enter your address here"
              ></textarea>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>UKL UPL Person In Charge</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your City"
              />
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your Pincode"
              />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="btn-path">
              <a href="javascript:void(0);" class="btn btn-cancel me-3"
                >Cancel</a
              >
              <a href="javascript:void(0);" class="btn btn-primary"
                >Save Changes</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
