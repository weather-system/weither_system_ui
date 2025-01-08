<script>
import { defineComponent } from 'vue';
import MainWrapper from "./MainWrapper.vue";
import axios from 'axios';
import ApexCharts from 'apexcharts';

export default defineComponent({
  name: 'WeatherDashboard',
  components: { 
    MainWrapper
  },
  data() {
    return {
      charts: {},
      weatherData: null, // Initial state untuk data cuaca
    }
  },
  mounted() {
    this.fetchWeatherData();
  },
  methods: {
    async fetchWeatherData() {
      try {
        // Fetch data dari API Laravel
        const response = await axios.get('http://127.0.0.1:8000/api/weather-get');
        const data = response.data.data; // Ambil data dari response
        
        // Set weather data untuk kartu cuaca
        this.weatherData = data;

        // Gunakan data cuaca untuk grafik
        this.initCharts(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    initCharts(data) {
      // Pastikan data terisi sebelum membuat grafik
      if (!data || !data.length) return;

      const lastWeekData = data.slice(-7); // Ambil data 7 hari terakhir

      // Bar Chart
      const barOptions = {
        series: [{
          name: 'Kecepatan Angin',
          data: lastWeekData.map(d => d.kecepatan_angin)
        }],
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        title: {
          text: 'Kecepatan Angin'
        },
        xaxis: {
          categories: lastWeekData.map(d => new Date(d.created_at).toLocaleDateString()),
        }
      };

      // Donut Chart
      const donutOptions = {
        series: [
          data.reduce((sum, d) => sum + d.kecepatan_angin, 0), 
          data.reduce((sum, d) => sum + d.curah_hujan, 0)
        ],
        chart: {
          type: 'donut',
          height: 450
        },
        title: {
          text: 'Distribusi Cuaca'
        },
        labels: ['Kecepatan Angin', 'Curah Hujan']
      };

      // Radial Bar Chart
      const radialOptions = {
        series: [data[data.length - 1].kelembapan || 0],
        chart: {
          height: 450,
          type: 'radialBar',
        },
        title: {
          text: 'Kelembapan'
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
        labels: ['Kelembapan']
      };

      // Line Chart
      const lineOptions = {
        series: [{
          name: 'Suhu',
          data: lastWeekData.map(d => d.suhu)
        }],
        chart: {
          type: 'line',
          height: 350
        },
        title: {
          text: 'Tren Suhu'
        },
        xaxis: {
          categories: lastWeekData.map(d => new Date(d.created_at).toLocaleDateString()),
        },
        stroke: {
          curve: 'smooth'
        },
        colors: ['#FF4560']
      };

      // Initialize Charts
      this.charts.lineChart = new ApexCharts(document.querySelector("#lineChart"), lineOptions);
      this.charts.barChart = new ApexCharts(document.querySelector("#bar"), barOptions);
      this.charts.donutChart = new ApexCharts(document.querySelector("#donutTop"), donutOptions);
      this.charts.radialChart = new ApexCharts(document.querySelector("#radialBar1"), radialOptions);

      // Render Charts
      Object.values(this.charts).forEach(chart => chart.render());
    }
  },
  beforeUnmount() {
    // Cleanup charts
    Object.values(this.charts).forEach(chart => chart.destroy());
  }
});
</script>


<template>
  <MainWrapper>
    <div class="content-area">
      <div class="container-fluid">
        <div class="main">
          <div class="row mt-4">
            <!-- Bar Chart -->
            <div class="col-md-5">
              <div class="box shadow">
                <div id="bar"></div>
              </div>
            </div>
            <!-- Donut Chart -->
            <div class="col-md-4">
              <div class="box shadow">
                <div id="donutTop"></div>
              </div>
            </div>
            <!-- Radial Bar Chart -->
            <div class="col-md-3">
              <div class="box shadow">
                <div id="radialBar1"></div>
              </div>
            </div>
          </div>

          <!-- Weather Data Cards -->
          <div class="row mt-4" v-if="weatherData">
            <div class="col-md-2" v-for="item in weatherData" :key="item.id">
              <div class="box shadow p-3">
                <h6 class="text-muted text-uppercase">{{ item.arah_angin }}</h6>
                <h3>{{ item.kecepatan_angin }}</h3>
              </div>
            </div>
          </div>

          <!-- Line Chart -->
          <div class="col-mt-6">
            <div class="box shadow">
              <div id="lineChart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>

<style scoped>
/* styles.css */
body {
  background: #F9FAFB;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
}

.content-area {
  display: flex;
  flex-direction: column;
  margin-top: 70px; /* Sesuaikan tinggi header */
  margin-left: 280px; /* Sesuaikan lebar sidebar */
  padding: 1rem;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
  }
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px; /* Sesuaikan lebar sidebar */
  height: 100%;
  background-color: #1E293B;
  z-index: 1000;
}

.header {
  position: fixed;
  top: 0;
  left: 250px; /* Sesuaikan lebar sidebar */
  right: 0;
  height: 70px; /* Sesuaikan tinggi header */
  background-color: #F3F4F6;
  z-index: 1000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .header {
    left: 0;
  }
}

.box {
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  height: 100%;
  transition: all 0.3s ease;
}

.shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.box:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Weather Cards */
.weather-card {
  padding: 3rem;
  text-align: center;
}

.weather-card h6 {
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6B7280;
}

@media (min-width: 768px) {
  .weather-card h6 {
    font-size: 0.875rem;
  }
}

.weather-card h3 {
  margin: 0;
  font-weight: 600;
  color: #2563EB;
  font-size: 1.25rem;
}

@media (min-width: 768px) {
  .weather-card h3 {
    font-size: 1.5rem;
  }
}

/* Chart Containers */
.chart-box {
  min-height: 250px;
  padding: 1rem;
}

@media (min-width: 768px) {
  .chart-box {
    min-height: 350px;
    padding: 1.5rem;
  }
}

/* Chart Responsiveness */
#bar, #donutTop, #radialBar1 {
  width: 100%;
  min-height: 250px;
}

@media (min-width: 768px) {
  #bar, #donutTop, #radialBar1 {
    min-height: 350px;
  }
}

/* Container Spacing */
.weather-summary {
  margin-bottom: 1.5rem;
}

.charts-container {
  margin-bottom: 2rem;
}

/* Utility Classes */
.text-uppercase {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Loading State */
.loading {
  opacity: 0.7;
  pointer-events: none;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.weather-card, .chart-box {
  animation: fadeIn 0.5s ease-out;
}
</style>