<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from "chart.js";
  
  export default {
    props: {
      chartType: {
        type: String,
        default: "line", // Bisa diubah ke "bar", "doughnut", dll.
      },
      chartData: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      this.registerChartComponents();
      this.renderChart();
    },
    methods: {
      registerChartComponents() {
        // Mendaftarkan semua elemen, controller, scale, dll.
        Chart.register(...registerables);
      },
      renderChart() {
        new Chart(this.$refs.chartCanvas, {
          type: this.chartType,
          data: this.chartData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  canvas {
    max-width: 100%;
    height: 200px;
  }
  </style>
  