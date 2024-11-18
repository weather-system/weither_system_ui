<template>
    <div id="PdfContent" class="pdf-template" style="display: none">
      <h2>Kop Surat</h2>
      <p>Jl. Contoh No. 123, Kota Contoh</p>
      <hr />
      <div>
        <h3>Data Pencemaran Udara</h3>
        <ul>
          <li v-for="(data, index) in pencemaranUdaraData" :key="index">
            {{ data }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  export const pencemaranUdaraData = ref([]); // Data diambil dari komponen induk
  </script>
  
  <style scoped>
  .pdf-template {
    font-family: Arial, sans-serif;
  }
  </style>
  