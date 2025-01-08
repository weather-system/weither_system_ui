<script>
import { defineComponent } from 'vue';
import MainWrapper from "./MainWrapper.vue";
import ApexCharts from 'apexcharts';

export default defineComponent({
  name: 'WeatherDashboard',
  components: { 
    MainWrapper
  },
  data() {
    return {
      charts: {},
      weatherData: {
        windSpeed: 30,
        windDirection: 30,
        rainfall: 30,
        temperature: 25,
        humidity: 18,
        lightIntensity: 650
      }
    }
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      // Bar Chart
      const barOptions = {
        series: [{
          name: 'Wind Speed',
          data: [30, 25, 35, 28, 32, 28, 30]
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
          text: 'Wind Speed Trends'
        },
        xaxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        }
      };

      // Donut Chart
      const donutOptions = {
        series: [44, 55, 13, 43, 22],
        chart: {
          type: 'donut',
          height: 350
        },
        title: {
          text: 'Weather Distribution'
        },
        labels: ['Sunny', 'Cloudy', 'Rainy', 'Windy', 'Stormy']
      };

      // Radial Bar Chart
      const radialOptions = {
        series: [70],
        chart: {
          height: 350,
          type: 'radialBar',
        },
        title: {
          text: 'Humidity Level'
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
        labels: ['Humidity']
      };

      // Initialize Charts
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
          <div class="row mt-4">
            <div class="col-md-2" v-for="(value, key) in weatherData" :key="key">
              <div class="box shadow p-3">
                <h6 class="text-muted text-uppercase">{{ key }}</h6>
                <h3>{{ value }}</h3>
              </div>
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
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
}

@media (min-width: 768px) {
  .content-area {
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .content-area {
    padding: 2rem;
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
  padding: 1rem;
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