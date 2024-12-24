<template>
  <div id="app">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-title">
        <i class="fas fa-cloud-sun"></i> Weather Dashboard
      </div>
      <a href="#" class="active"><i class="fas fa-home"></i> Home</a>
      <a href="#"><i class="fas fa-chart-line"></i> Analytics</a>
      <a href="#"><i class="fas fa-file-alt"></i> Reports</a>
      <a href="#"><i class="fas fa-cogs"></i> Settings</a>
      <a href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>
    </div>

    <!-- Content -->
    <div class="content">
      <h1 class="mb-4">Weather Data Dashboard</h1>

      <!-- Info Panels -->
      <div class="row mb-4">
        <div class="col-md-3 mb-3" v-for="info in weatherInfo" :key="info.title">
          <div class="card-info text-center">
            <h5>{{ info.title }}</h5>
            <h3>{{ info.value }}</h3>
          </div>
        </div>
      </div>

      <!-- Chart and Table -->
      <div class="row">
        <div class="col-lg-8">
          <h5 class="text-center">Grafik Tren Cuaca</h5>
          <div class="chart-container">
            <canvas id="weatherChart"></canvas>
          </div>
        </div>
        <div class="col-lg-4">
          <h5 class="text-center">Tabel Data Cuaca</h5>
          <table class="table table-bordered table-hover">
            <thead class="table-dark">
              <tr>
                <th>No</th>
                <th>Waktu</th>
                <th>Suhu (°C)</th>
                <th>Kelembapan (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in weatherTable" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ data.time }}</td>
                <td>{{ data.temperature }}</td>
                <td>{{ data.humidity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      weatherInfo: [
        { title: 'Kecepatan Angin', value: '12 m/s' },
        { title: 'Suhu', value: '28 °C' },
        { title: 'Kelembapan', value: '65%' },
        { title: 'Curah Hujan', value: '20 mm' },
      ],
      weatherTable: [
        { time: '05 Des 12:00', temperature: 28, humidity: 65 },
        { time: '05 Des 13:00', temperature: 30, humidity: 70 },
        { time: '05 Des 14:00', temperature: 27, humidity: 60 },
      ],
    };
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById('weatherChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['05 Des 12:00', '05 Des 13:00', '05 Des 14:00'],
          datasets: [
            {
              label: 'Suhu (°C)',
              data: [28, 30, 27],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
              label: 'Kelembapan (%)',
              data: [65, 70, 60],
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    },
  },
  mounted() {
    this.renderChart();
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}

/* Sidebar Styling */
.sidebar {
  height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #1e2a47, #34495e);
  padding-top: 20px;
  box-shadow: 2px 0px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.sidebar .sidebar-title {
  text-align: center;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
}

.sidebar .sidebar-title i {
  margin-right: 10px;
}

.sidebar a {
  display: block;
  color: #fff;
  padding: 15px 20px;
  font-size: 16px;
  text-decoration: none;
  border-bottom: 1px solid #4b5a6d;
  transition: background-color 0.3s, padding-left 0.3s;
}

.sidebar a:hover {
  background-color: #2c3e50;
  padding-left: 30px;
}

.sidebar a.active {
  background-color: #2980b9;
  padding-left: 30px;
}

.sidebar a i {
  margin-right: 10px;
}

/* Content Area */
.content {
  margin-left: 260px;
  padding: 20px;
}

/* Info Panels Styling */
.row.mb-4 .col-md-3 {
  margin-bottom: 20px; /* Adding margin to each widget */
}

.card-info {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Chart Container */
.chart-container {
  height: 400px;
  margin-top: 30px;
}

/* Add subtle hover shadow effect to sidebar */
.sidebar a:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.sidebar a:active {
  background-color: #2980b9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>

<!-- Font Awesome for Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
