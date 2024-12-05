<script setup>
import MainWrapper from "@/components/MainWrapper.vue";
import { onMounted, ref } from "vue";
import { logout as authLogout } from "@/lib/auth.js";
import Chart from "chart.js/auto";

// Role User
const userRole = "EKSEKUTIF";

// Data Master
const masterData = [
  { companyName: "Perusahaan A", businessType: "Manufaktur", status: "Aktif" },
  { companyName: "Perusahaan B", businessType: "Pertanian", status: "Non-Aktif" },
];

// Data Sebaran per Kecamatan
const kecamatanLabels = [
  "Kecamatan Cimahi Utara",
  "Kecamatan Cimahi Tengah",
  "Kecamatan Cimahi Selatan",
];
const dataTPSB3 = [5, 3, 7];
const dataCerobong = [4, 6, 5];
const dataIPAL = [3, 4, 8];

// Data Luasan RTH Privat
const luasKotaCimahi = 100; // Total Luas Kota Cimahi dalam persen
const luasanRTHPrivat = 15.5; // Luas RTH Privat dalam persen

// Fungsi Logout
const logout = async () => {
  try {
    await authLogout();
    alert("Logout berhasil");
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout gagal:", error);
  }
};

// Inisialisasi Grafik
onMounted(() => {
  // Grafik Sebaran Titik (Bar Horizontal)
  const sebaranChartCtx = document.getElementById("sebaranChart").getContext("2d");
  new Chart(sebaranChartCtx, {
    type: "bar",
    data: {
      labels: kecamatanLabels,
      datasets: [
        {
          label: "TPS B3",
          data: dataTPSB3,
          backgroundColor: "#FF5733",
          borderColor: "#FFFFFF",
          borderWidth: 1,
        },
        {
          label: "Cerobong",
          data: dataCerobong,
          backgroundColor: "#33FF57",
          borderColor: "#FFFFFF",
          borderWidth: 1,
        },
        {
          label: "IPAL",
          data: dataIPAL,
          backgroundColor: "#3357FF",
          borderColor: "#FFFFFF",
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "x",
      responsive: true,
      plugins: {
        legend: { position: "top" },
        tooltip: { enabled: true },
      },
      scales: {
        x: { title: { display: true, text: "" } },
        y: {
          title: { display: true, text: "Jumlah" },
          beginAtZero: true,
        },
      },
    },
  });

  // Grafik Luasan RTH Privat
  const luasanChartCtx = document.getElementById("luasanChart").getContext("2d");
  new Chart(luasanChartCtx, {
    type: "doughnut",
    data: {
      labels: ["Luas RTH Privat", "Luas Kota Cimahi (Sisa)"],
      datasets: [
        {
          label: "Luasan RTH Privat",
          data: [luasanRTHPrivat, luasKotaCimahi - luasanRTHPrivat],
          backgroundColor: ["#2D9CDB", "#E0E0E0"],
          borderColor: ["#FFFFFF", "#FFFFFF"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: { enabled: true },
        legend: { position: "top" },
      },
    },
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
                        <a href="/master-data" class="btn btn-sm btn-primary"
                          >Lihat Detail</a
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Widget: Sebaran Titik TPS B3 -->
                  <div class="col-md-6 col-lg-4">
                    <div class="card card-widget">
                      <div class="card-body text-center">
                        <i class="fas fa-map-marker-alt fa-2x mb-3 text-danger"></i>
                        <h5>Sebaran TPS B3</h5>
                        <p>{{ dataTPSB3.reduce((a, b) => a + b, 0) }} Titik</p>
                        <a href="/sebaran-tpsb3" class="btn btn-sm btn-danger"
                          >Lihat Detail</a
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Widget: Sebaran Cerobong -->
                  <div class="col-md-6 col-lg-4">
                    <div class="card card-widget">
                      <div class="card-body text-center">
                        <i class="fas fa-industry fa-2x mb-3 text-success"></i>
                        <h5>Sebaran Cerobong</h5>
                        <p>{{ dataCerobong.reduce((a, b) => a + b, 0) }} Titik</p>
                        <a href="/sebaran-cerobong" class="btn btn-sm btn-success"
                          >Lihat Detail</a
                        >
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
                        <a href="/rth-privat" class="btn btn-sm btn-success"
                          >Lihat Detail</a
                        >
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
                        <canvas id="sebaranChart" width="100%" height="117"></canvas>
                      </div>
                    </div>
                  </div>

                  <!-- Grafik Luasan RTH -->
                  <div class="col-md-6">
                    <div class="card">
                      <div class="card-header">
                        <h5>Persentase Luasan RTH Privat / Luas Kota Cimahi</h5>
                      </div>
                      <div class="card-body text-center">
                        <canvas id="luasanChart"></canvas>
                        <p class="mt-3">
                          Luas RTH Privat: {{ luasanRTHPrivat }}% dari Luas Kota Cimahi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Logout Button -->
              <div class="text-center mt-4">
                <button class="btn btn-danger" @click="logout">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </MainWrapper>
    </div>
  </div>
</template>
