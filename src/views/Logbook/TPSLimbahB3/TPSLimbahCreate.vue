<script setup>
import { ref } from "vue";
import MainWrapper from "@/components/MainWrapper.vue";

const tpsForm = ref({
  tanggal: "",
  jenisLimbahB3: "",
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

const saveForm = () => {
  console.log("Data yang akan disimpan:", tpsForm.value);
  // Tambahkan logic untuk menyimpan data ke database
};
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>Form Tambah TPS Limbah B3</h5>
        </div>

        <form @submit.prevent="saveForm">
          <div class="mb-3">
            <label for="tanggal" class="form-label">Tanggal</label>
            <input
              type="date"
              id="tanggal"
              class="form-control"
              v-model="tpsForm.tanggal"
            />
          </div>

          <div class="mb-3">
            <label for="jenis-limbah" class="form-label">Jenis Limbah B3</label>
            <input
              type="text"
              id="jenis-limbah"
              class="form-control"
              v-model="tpsForm.jenisLimbahB3"
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
            <button type="submit" class="btn btn-primary">Simpan</button>
            <button type="reset" class="btn btn-danger">Batal</button>
          </div>
        </form>
      </div>
    </div>
  </MainWrapper>
</template>
