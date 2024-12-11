<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import MainWrapper from "@/components/MainWrapper.vue";

const tpsForm = ref({
  tgl_input: "",
  jenis_lb3: "",
  kemasan: "",
  jumlah: "",
  satuan: "",
  jenis: "",
});

const jenisOptions = [
  "Disimpan",
  "Dimanfaatkan",
  "Diolah",
  "Ditimbun",
  "Diserahkan ke pihak ke tiga",
  "Lainnya",
  "Masuk",
];

// Mengambil data awal (Simulasi atau panggil API)
onMounted(async () => {
  try {
    const response = await axios.get("/api/tps-limbah-b3/1"); // ganti 1 dengan id yang sesuai
    tpsForm.value = response.data;
  } catch (error) {
    console.error("Error mengambil data:", error);
  }
});

const updateForm = async () => {
  try {
    const response = await axios.put(
      `/api/tps-limbah-b3/${tpsForm.value.id}`,
      tpsForm.value
    );
    console.log("Data berhasil diperbarui:", response.data);
    // Tambahkan logic untuk feedback kepada user setelah data diperbarui
  } catch (error) {
    console.error("Error memperbarui data:", error);
    // Tambahkan logic untuk feedback jika terjadi error
  }
};
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>Form Edit TPS Limbah B3</h5>
        </div>

        <form @submit.prevent="updateForm">
          <div class="mb-3">
            <label for="tanggal" class="form-label">Tanggal</label>
            <input
              type="date"
              id="tgl_input"
              class="form-control"
              v-model="tpsForm.tgl_input"
            />
          </div>

          <div class="mb-3">
            <label for="jenis-limbah" class="form-label">Jenis Limbah B3</label>
            <input
              type="text"
              id="jenis-limbah"
              class="form-control"
              v-model="tpsForm.jenis_lb3"
            />
          </div>

          <div class="mb-3">
            <label for="kemasan" class="form-label">Kemasan</label>
            <input
              type="text"
              id="kemasan"
              class="form-control"
              v-model="tpsForm.kemasan"
            />
          </div>

          <div class="mb-3 d-flex gap-3">
            <div>
              <label for="jumlah" class="form-label">Jumlah Limbah</label>
              <input
                type="number"
                id="jumlah"
                class="form-control"
                v-model="tpsForm.jumlah"
              />
            </div>
            <div>
              <label for="satuan" class="form-label">Satuan</label>
              <input
                type="text"
                id="satuan"
                class="form-control"
                v-model="tpsForm.satuan"
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="jenis" class="form-label">Jenis</label>
            <select id="jenis" class="form-select" v-model="tpsForm.jenis">
              <option value="" disabled>Pilih Jenis</option>
              <option v-for="jenis in jenisOptions" :key="jenis" :value="jenis">
                {{ jenis }}
              </option>
            </select>
          </div>

          <div class="mt-4">
            <button type="submit" class="btn btn-success">Perbarui</button>
            <button type="reset" class="btn btn-warning">Batal</button>
          </div>
        </form>
      </div>
    </div>
  </MainWrapper>
</template>
