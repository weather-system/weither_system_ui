<script setup>
import MainWrapper from '@/components/MainWrapper.vue'
import { onMounted, ref } from "vue";
import { logout as authLogout } from '@/lib/auth.js';
import Chart from "chart.js/auto";
const userRole = "EKSEKUTIF";

const masterData = [
  { companyName: "Perusahaan A", businessType: "Manufaktur", status: "Aktif" },
  { companyName: "Perusahaan B", businessType: "Pertanian", status: "Non-Aktif" },
];
const sebaranTPSB3 = ["-6.200, 106.800", "-6.300, 106.700"];
const sebaranCerobong = ["-6.400, 106.900", "-6.500, 107.000"];
const sebaranIPAL = ["-6.600, 107.100", "-6.700, 107.200"];
const luasanRTHPrivat = 15.5;

const logout = async () => {
  try {
    await authLogout();
    alert('Logout berhasil');
    window.location.href = "/login";
  } catch (error) {
    console.error('Logout gagal:', error);
  }
};

onMounted(() => {
  const sebaranChartCtx = document.getElementById("sebaranChart").getContext("2d");
  new Chart(sebaranChartCtx, {
    type: "pie",
    data: {
      labels: ['TPS B3', 'Cerobong', 'IPAL'],
      datasets: [
        {
          label: "Sebaran Titik",
          data: [sebaranTPSB3.length, sebaranCerobong.length, sebaranIPAL.length],
          backgroundColor: ["#FF5733", "#33FF57", "#3357FF"],
          borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
          borderWidth: 1
        }
      ]
    }
  });

  const luasanChartCtx = document.getElementById("luasanChart").getContext("2d");
  new Chart(luasanChartCtx, {
    type: "doughnut",
    data: {
      labels: ["RTH Privat", "Sisa Luas"],
      datasets: [
        {
          label: "Luasan RTH Privat",
          data: [luasanRTHPrivat, 100 - luasanRTHPrivat],
          backgroundColor: ["#2D9CDB", "#E0E0E0"],
          borderColor: ["#FFFFFF", "#FFFFFF"],
          borderWidth: 1
        }
      ]
    }
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

                <!-- Grafik Section -->
                <div class="row mt-5">
                  <!-- Grafik Sebaran -->
                  <div class="col-md-6">
                    <div class="card">
                      <div class="card-header">
                        <h5>Grafik Sebaran Titik</h5>
                      </div>
                      <div class="card-body">
                        <canvas id="sebaranChart"></canvas>
                      </div>
                    </div>
                  </div>

                  <!-- Grafik Luasan RTH -->
                  <div class="col-md-6">
                    <div class="card">
                      <div class="card-header">
                        <h5>Persentase Luasan RTH Privat</h5>
                      </div>
                      <div class="card-body text-center">
                        <canvas id="luasanChart"></canvas>
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
