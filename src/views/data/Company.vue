<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLoading } from 'vue-loading-overlay';
import axios from 'axios';
import { getCompaniesbylogin } from '@/lib/company.js';
import MainWrapper from '@/components/MainWrapper.vue';

const $loading = useLoading();
const route = useRoute();

const companies = ref([]); // Holds the companies for the logged-in user
const companyDetails = ref([]); // Holds details for the selected company
const userCompanies = ref([]); // Filters the user's companies based on some criteria
const loggedInUserId = 3;

// Fetch the user's companies
const fetchUserCompanies = async () => {
  const loader = $loading.show();
  try {
    companies.value = await getCompaniesbylogin({ status: route.query.status?.toUpperCase() });
    
    console.log('Fetched Companies:', JSON.stringify(companies.value, null, 2));
    
    // Filter to get user companies
    userCompanies.value = companies.value.filter(company => company.user_id === loggedInUserId);
    
    console.log('User Companies:', JSON.stringify(userCompanies.value, null, 2));
    
    // Fetch company details for the first user's company (if exists)
    if (userCompanies.value.length > 0) {
      await fetchCompanyDetails(userCompanies.value[0].id);
    }
  } catch (error) {
    console.error('Error fetching companies:', error);
  } finally {
    loader.hide();
  }
};

// Fetch company details based on companyId
const fetchCompanyDetails = async (companyId) => {
  try {
    const response = await axios.get(`/api/company_details/${companyId}`);
    companyDetails.value = response.data;

    console.log(`Fetched Company Details for ID ${companyId}:`, companyDetails.value);
  } catch (error) {
    console.error('Error fetching company details:', error);
  }
};

// Watch for changes in user companies to fetch new details when they change
watch(userCompanies, (newValue) => {
  if (newValue.length > 0) {
    fetchCompanyDetails(newValue[0].id); // Fetch details for the first company
  } else {
    companyDetails.value = []; // Reset details if no companies
  }
}, { immediate: true });

// Fetch user companies on mount
onMounted(() => {
  fetchUserCompanies();
});
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit mb-2">
          <h3>Data Usaha</h3>
          <div class="list-btn">
            <ul>
              <li>
                <router-link class="btn btn-primary" to="add-service.html">
                  <i class="fa fa-plus me-2"></i>Tambah Perusahaan
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ul>
            <li v-for="company in userCompanies" :key="company.id">
              <strong>Nama:</strong> {{ company.name }} <br>
              <strong>No PKPLH:</strong> {{ company.no_pkplh }} <br>
              <strong>No SKKL:</strong> {{ company.no_skkl }} <br>
              <strong>NIB:</strong> {{ company.nib }} <br>
              <strong>Jenis Aktivitas:</strong> {{ company.activity_type }} <br>
              <strong>Pemrakarsa:</strong> {{ company.pemrakarsa }} <br>
              <strong>Nama Pemimpin:</strong> {{ company.leader_name }} <br>
              <strong>Alamat:</strong> {{ company.address }} Kel.{{ company.kelurahan }} Kec.{{ company.kecamatan }} Kota Cimahi<br>
              <strong>Penanggung Jawab UKL/UPL:</strong> {{ company.in_charge_ukl_upl }} <br>
              <strong>Kontak Person:</strong> {{ company.contact_person }} <br>
              <strong>Email Perusahaan:</strong> {{ company.company_email }} <br>
              <hr>
            </li>
          </ul>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>NPWP</th>
                    <th>NPWP Lokal</th>
                    <th>Jenis Aktivitas</th>
                    <th>Kapasitas Produksi</th>
                    <th>Total Karyawan</th>
                    <th>Luas Tanah</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="detail in companyDetails" :key="detail.id">
                    <td>{{ detail.npwp }}</td>
                    <td>{{ detail.local_npwp }}</td>
                    <td>{{ detail.activity_type }}</td>
                    <td>{{ detail.production_capacity }}</td>
                    <td>{{ detail.employees_total }}</td>
                    <td>{{ detail.land_area }}</td>
                    <td>
                      <router-link :to="`/Data/Ipal/${detail.id}`" class="btn btn-info m-2">Persetujuan IPAL</router-link>
                      <router-link to="/Data/TSPB3" class="btn btn-info m-2">Persetujuan TPSB3</router-link>
                      <router-link to="/Data/Emisi" class="btn btn-info m-2">Persetujuan Emisi</router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
