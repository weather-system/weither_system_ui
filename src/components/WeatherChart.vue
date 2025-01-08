<template>
    <div class="weather-chart">
      <div class="row">
        <!-- Bar Chart -->
        <div class="col-lg-6">
          <apexchart type="bar" height="350" :options="barChartOptions" :series="barChartSeries" />
        </div>
  
        <!-- Donut Chart -->
        <div class="col-lg-6">
          <apexchart type="donut" height="350" :options="donutChartOptions" :series="donutChartSeries" />
        </div>
      </div>
  
      <div class="row mt-4">
        <!-- Radial Bar Chart -->
        <div class="col-lg-6">
          <apexchart type="radialBar" height="350" :options="radialBarOptions" :series="radialBarSeries" />
        </div>
  
        <!-- Area Chart -->
        <div class="col-lg-6">
          <apexchart type="area" height="350" :options="areaChartOptions" :series="areaChartSeries" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import VueApexCharts from "vue3-apexcharts";
  
  export default {
    name: "WeatherChart",
    components: { apexchart: VueApexCharts },
    data() {
      return {
        barChartOptions: {
          chart: { toolbar: { show: false } },
          xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
          colors: ["#4CAF50"],
        },
        barChartSeries: [{ name: "Kecepatan Angin", data: [10, 15, 25, 20, 30, 40] }],
  
        donutChartOptions: {
          labels: ["Utara", "Selatan", "Barat", "Timur"],
          colors: ["#FFC107", "#03A9F4", "#E91E63", "#8BC34A"],
        },
        donutChartSeries: [35, 25, 20, 20],
  
        radialBarOptions: {
          chart: { toolbar: { show: false } },
          plotOptions: {
            radialBar: {
              hollow: { size: "50%" },
              dataLabels: { name: { fontSize: "16px" }, value: { fontSize: "14px" } },
            },
          },
          colors: ["#FF5722"],
        },
        radialBarSeries: [70],
  
        areaChartOptions: {
          chart: { toolbar: { show: false } },
          xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
          colors: ["#2196F3"],
        },
        areaChartSeries: [{ name: "Curah Hujan", data: [20, 30, 40, 25, 35, 50] }],
      };
    },
  };
  </script>
  
  <style scoped>
  .weather-chart {
    padding: 20px;
  }
  </style>
  