<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useLoading } from 'vue-loading-overlay';
import { uploadFile } from '@/lib/filestorage.js';
import Swal from 'sweetalert2';
import MainWrapper from '@/components/MainWrapper.vue';

const formData = ref({
  ipalTypes: [],
  system_ipal: '',
  company_licence_id: '',
  waste_discharge_measuring_instrument_inlet_name: '',
  waste_discharge_measuring_instrument_outlet_name: '',
  year_of_manufacture_of_ipal: '',
  capacity_ipal: '',
  unit_in_capacity: '',
  permissible_waste_water_discharge: '',
  waste_water_source: '',
  recycle_efforts: '',
  longitude: '',
  latitude: '',
  water_bodies_receiving_liquid_waste: '',
  ipal_sludge_storage_site: '',
  amount_of_mud_sludge: '',
  waste_discharge_measuring_instrument_inlet: null,
  waste_discharge_measuring_instrument_outlet: null,
  ipal_design_note: '',
  company_detail_id: '',
  ipalDetails: [], // Will hold details including chemicals
});

// State variables
const licenseOptions = ref([]);
const errorMessage = ref('');
const $loading = useLoading();
const router = useRouter();
const urlNIB = ref('');
const isInletChecked = ref(false);
const isOutletChecked = ref(false);

// Fetch company licenses for the dropdown
const fetchCompanyLicences = async () => {
  const loader = $loading.show();
  try {
    const response = await axios.get('http://localhost:8000/api/company_licence');
    licenseOptions.value = response.data || [];
  } catch (error) {
    console.error('Error fetching company licenses:', error);
  } finally {
    loader.hide();
  }
};

const fetchCompanyDetailsID = async () => {
  const loader = $loading.show();
  try {
    const response = await axios.get('http://localhost:8000/api/company_detail');
    console.log("API Response:", response.data);
    
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      formData.value.company_detail_id = response.data[0].company_detail_id;
      console.log("Company detail ID fetched: ", formData.value.company_detail_id);
    } else if (response.data && typeof response.data === 'object' && response.data.company_detail_id) {
      formData.value.company_detail_id = response.data.company_detail_id;
      console.log("Company detail ID fetched: ", formData.value.company_detail_id);
    } else {
      console.warn("No company details found or invalid response format.");
      formData.value.company_detail_id = null;
    }
  } catch (error) {
    console.error('Error fetching company details:', error);
  } finally {
    loader.hide();
  }
};

// Fetch initial data
fetchCompanyLicences();
fetchCompanyDetailsID();

// Prepare IPAL entry creation
const createIpalEntry = async () => {
  const loader = $loading.show();
  try {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      Swal.fire('Error', 'Silakan login ulang.', 'error');
      return;
    }

    formData.value.system_ipal = formData.value.ipalTypes.join(',');

    // Prepare ipalDetails from chemicalDetails
    formData.value.ipalDetails = chemicalDetails.value.map(chemical => ({
      chemicals_used: chemical.chemicals_used,
      use_of_chemicals: chemical.use_of_chemicals,
      unit_in_use_of_chemicals: chemical.unit_in_use_of_chemicals,
    }));

    const response = await axios.post('http://localhost:8000/api/company_ipals', formData.value, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('Company IPAL created:', response.data);
    console.log(response.data.id)
    if (response.data && response.data.id) {
      const companyIpalId = response.data.id;

      // Send ipalDetails
      for (const detail of formData.value.ipalDetails) {
        const detailData = {
          company_ipal_id: companyIpalId,
          ...detail,
        };

        try {
          const detailResponse = await axios.post('http://localhost:8000/api/ipal-details', detailData);
          console.log('IPAL detail added:', detailResponse.data);
        } catch (detailError) {
          console.error('Error adding IPAL detail:', detailError);
        }
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'IPAL entry created successfully!',
      });
      router.push('/Data/IPAL');
    } else {
      console.log('Condition not met, response data:', response.data);
    }
  } catch (error) {
    console.error('Error creating IPAL entry:', error);
    errorMessage.value = 'Failed to create IPAL entry. Please try again.';
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to create IPAL entry. Please try again.',
    });
  } finally {
    loader.hide();
  }
};

// Toggle functions for inlet and outlet
const toggleInlet = () => {
  if (!isInletChecked.value) {
    formData.value.waste_discharge_measuring_instrument_inlet_name = '';
  }
};

const toggleOutlet = () => {
  if (!isOutletChecked.value) {
    formData.value.waste_discharge_measuring_instrument_outlet_name = '';
  }
};

// Upload NIB file
const uploadNIB = async e => {
  const loader = $loading.show();
  try {
    const url = await uploadFile(e.target.files[0]);
    urlNIB.value = url;
    formData.value.ipal_design_note = urlNIB.value;
    console.log('Uploaded URL:', urlNIB.value);
  } catch (e) {
    console.error(e);
  } finally {
    loader.hide();
  }
};

// Chemical details management
const chemicalDetails = ref([{ chemicals_used: '', use_of_chemicals: '', unit_in_use_of_chemicals: '' }]);

const addChemical = () => {
  chemicalDetails.value.push({ chemicals_used: '', use_of_chemicals: '', unit_in_use_of_chemicals: '' });
};

const removeChemical = (index) => {
  chemicalDetails.value.splice(index, 1);
};

</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="content-page-header mb-2">
              <h3>Tambah Persetujuan Teknis IPAL</h3>
            </div>
            <form @submit.prevent="createIpalEntry">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Jenis IPAL</label>
                    <select
                      class="form-control"
                      v-model="formData.type"
                      required
                    >
                      <option value="" disabled>Pilih Jenis IPAL</option>
                      <option value="Domestik">Domestik</option>
                      <option value="Industri">Industri</option>
                      <option value="Integrasi">Integrasi</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="form-group">
                    <label class="col-form-label">Izin Perusahaan</label>
                    <select
                      class="form-control"
                      v-model="formData.company_licence_id"
                    >
                      <option value="">Pilih Data Izin</option>
                      <option
                        v-for="license in licenseOptions"
                        :key="license.id"
                        :value="license.id"
                      >
                        {{ license.license_number }} - {{ license.type }} -
                        {{ license.issuing_agency }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Tahun Pembuatan IPAL</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.year_of_manufacture_of_ipal"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Kapasitas IPAL</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="formData.capacity_ipal"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Satuan Kapasitas</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.unit_in_capacity"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label"
                      >Debit Air Limbah Yang Diijinkan</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.permissible_waste_water_discharge"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Sumber Air Limbah</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.waste_water_source"
                    />
                  </div>
                </div>
              </div>
              <div class="row service-count">
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="col-form-label">Sistem Ipal</label>
                    <div class="d-flex flex-wrap">
                      <div class="form-check me-3">
                        <label>
                          <input
                            type="checkbox"
                            id="checkboxFisika"
                            value="Fisika"
                            v-model="formData.ipalTypes"
                          />
                          Fisika
                        </label>
                      </div>
                      <div class="form-check me-3">
                        <label>
                          <input
                            type="checkbox"
                            id="checkboxKimia"
                            value="Kimia"
                            v-model="formData.ipalTypes"
                          />
                          Kimia
                        </label>
                      </div>
                      <div class="form-check">
                        <label>
                          <input
                            type="checkbox"
                            id="checkboxBiologi"
                            value="Biologi"
                            v-model="formData.ipalTypes"
                          />
                          Biologi
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Longitude</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.longitude"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Latitude</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.latitude"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-form-label">Upaya Daur Ulang</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.recycle_efforts"
                />
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="col-form-label">Alat Ukur Debit Limbah</label>
                    <div class="d-flex align-items-center">
                      <div class="form-check me-3">
                        <label>
                          <input
                            type="checkbox"
                            id="inletCheckbox"
                            v-model="isInletChecked"
                            @change="toggleInlet"
                          />
                          Inlet
                        </label>
                      </div>
                      <div class="col-md-6">
                        <div v-if="isInletChecked" class="form-group">
                          <input
                            type="text"
                            class="form-control input-dark-placeholder"
                            v-model="
                              formData.waste_discharge_measuring_instrument_inlet_name
                            "
                            placeholder="Masukkan Nama Alat Ukur Pembuangan Limbah Masuk"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <div class="d-flex align-items-center">
                      <div class="form-check me-3">
                        <label>
                          <input
                            type="checkbox"
                            id="outletCheckbox"
                            v-model="isOutletChecked"
                            @change="toggleOutlet"
                          />
                          Outlet</label
                        >
                      </div>
                      <div class="col-md-6">
                        <div v-if="isOutletChecked" class="form-group">
                          <input
                            type="text"
                            class="form-control input-dark-placeholder"
                            placeholder="Masukkan Nama Alat Ukur Pembuangan Limbah Keluar"
                            v-model="
                              formData.waste_discharge_measuring_instrument_outlet_name
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="photo">Upload Nota Design IPAL</label>
                    <input
                      type="file"
                      @change="uploadNIB"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label></label>
                    <img :src="formData.ipal_design_note" class="" />
                  </div>
                </div>
              </div>
              <div>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Bahan Kimia Yang Digunakan</th>
                      <th>Pemakaian Bahan Kimia</th>
                      <th>Satuan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(chemical, index) in chemicalDetails"
                      :key="index"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          v-model="chemical.chemicals_used"
                          placeholder="Enter Chemicals Used"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          v-model="chemical.use_of_chemicals"
                          placeholder="Enter Use of Chemicals"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          v-model="chemical.unit_in_use_of_chemicals"
                          placeholder="Enter Unit of Chemicals"
                        />
                      </td>
                      <td>
                        <button
                          @click="removeChemical(index)"
                          class="btn btn-danger"
                        >
                          -
                        </button>
                        <button @click="addChemical" class="btn btn-success">
                          +
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="form-group">
                <label class="col-form-label"
                  >Badan Air Yang Menerima Limbah Cair</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.water_bodies_receiving_liquid_waste"
                />
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Tempat Penampungan Lumpur IPAL</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.ipal_sludge_storage_site"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label class="col-form-label">Jumlah Lumpur</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="formData.amount_of_mud_sludge"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label class="col-form-label">Satuan Jumlah Lumpur</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.unit_in_amount_of_mud_sludge"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-form-label"
                  >Penanganan Lumpur Selanjutnya</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.further_sludge_handling"
                />
              </div>
              <button type="submit" class="btn btn-primary">Simpan</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>

<style scoped>
.service-count {
  margin-top: 20px;
}
.table {
  width: 100%;
  margin-top: 20px;
}
.btn {
  margin-left: 5px; /* Adjust spacing between buttons */
}
</style>
