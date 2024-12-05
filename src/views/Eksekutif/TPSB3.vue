<script setup>
import MainWrapper from '@/components/MainWrapper.vue';
import { onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const userRole = "EKSEKUTIF";

const masterData = [
  { companyName: "Perusahaan A", businessType: "Manufaktur", status: "Aktif" },
  { companyName: "Perusahaan B", businessType: "Pertanian", status: "Non-Aktif" },
];
const sebaranTPSB3 = [
  { lat: -6.200, lng: 106.800, label: "TPS B3 - A" },
  { lat: -6.300, lng: 106.700, label: "TPS B3 - B" },
];
const sebaranCerobong = [
  { lat: -6.400, lng: 106.900, label: "Cerobong - A" },
  { lat: -6.500, lng: 107.000, label: "Cerobong - B" },
];
const sebaranIPAL = [
  { lat: -6.600, lng: 107.100, label: "IPAL - A" },
  { lat: -6.700, lng: 107.200, label: "IPAL - B" },
];
const luasanRTHPrivat = 15.5;

onMounted(() => {
  // Initialize Leaflet Map
  const map = L.map("map").setView([-6.200, 106.800], 10);

  // Add Tile Layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  // Add Markers
  const allPoints = [...sebaranTPSB3, ...sebaranCerobong, ...sebaranIPAL];
  allPoints.forEach((point) => {
    L.marker([point.lat, point.lng])
      .addTo(map)
      .bindPopup(`<strong>${point.label}</strong>`);
  });
});
</script>

<template>
  <div>
    <div v-if="userRole === 'EKSEKUTIF'">
      <MainWrapper>
        <div class="page-wrapper">
          <div class="content">
            <div class="container">
              <div class="row">
                <h1 class="mb-4 text-center">Selamat Datang di Dashboard Eksekutif</h1>

                <!-- Widget Section -->
                <div class="row">
                  <!-- Widget: Master Data -->
                  <div class="col-md-6 col-lg-4">
                    <div class="card card-widget">
                      <div class="card-body text-center">
                        <i class="fas fa-database fa-2x mb-3 text-primary"></i>
                        <h5>Master Data</h5>
                        <p>{{ masterData.length }} Perusahaan</p>
                        <a href="/master-data" class="btn btn-sm btn-primary">Lihat Detail</a>
                      </div>
                    </div>
                  </div>

                  <!-- Widget: Sebaran Titik TPS B3 -->
                  <div class="col-md-6 col-lg-4">
                    <div class="card card-widget">
                      <div class="card-body text-center">
                        <i class="fas fa-map-marker-alt fa-2x mb-3 text-danger"></i>
                        <h5>Sebaran TPS B3</h5>
                        <p>{{ sebaranTPSB3.length }} Titik</p>
                        <a href="/sebaran-tpsb3" class="btn btn-sm btn-danger">Lihat Detail</a>
                      </div>
                    </div>
                  </div>

                  <!-- Widget: Sebaran Cerobong -->
                  <div class="col-md-6 col-lg-4">
                    <div class="card card-widget">
                      <div class="card-body text-center">
                        <i class="fas fa-industry fa-2x mb-3 text-success"></i>
                        <h5>Sebaran Cerobong</h5>
                        <p>{{ sebaranCerobong.length }} Titik</p>
                        <a href="/sebaran-cerobong" class="btn btn-sm btn-success">Lihat Detail</a>
                      </div>
                    </div>
                  </div>

                  <!-- Widget: Luasan RTH -->
                  <div class="col-md-6 col-lg-4">
                    <div class="card card-widget">
                      <div class="card-body text-center">
                        <i class="fas fa-tree fa-2x mb-3 text-success"></i>
                        <h5>Luasan RTH Privat</h5>
                        <p>{{ luasanRTHPrivat }}%</p>
                        <a href="/rth-privat" class="btn btn-sm btn-success">Lihat Detail</a>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Map Section -->
                <div class="row mt-5">
                  <div class="col-md-12">
                    <div class="card">
                      <div class="card-header">
                        <h5>Peta Sebaran Titik</h5>
                      </div>
                      <div class="card-body">
                        <div id="map" style="height: 500px; width: 100%;"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainWrapper>
    </div>
  </div>
</template>
