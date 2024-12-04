<script setup>
import { ref } from "vue";
import MainWrapper from "@/components/MainWrapper.vue";

const ipalDataModal = ref(false);
const tableData = ref([
  { warna: "", pH: "", debit: "", suhu: "", keterangan: "" },
  { warna: "", pH: "", debit: "", suhu: "", keterangan: "" },
]);

const addRow = () => {
  tableData.value.push({ warna: "", pH: "", debit: "", suhu: "", keterangan: "" });
};

const removeRow = (index) => {
  if (tableData.value.length > 1) {
    tableData.value.splice(index, 1);
  }
};
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>Form LOG IPAL</h5>
          <div class="list-btn">
            <ul>
              <li>
                <router-link class="btn btn-secondary" to="/Logbook/IPAL">
                  <i class="fa fa-arrow-left me-2"></i>Kembali
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <form>
          <div class="mb-3">
            <label for="tanggal" class="form-label">Tanggal</label>
            <input type="date" id="tanggal" class="form-control" />
          </div>

          <div class="mb-3">
            <label for="sumber-limbah" class="form-label">Sumber Limbah</label>
            <div class="d-flex align-items-center">
              <input
                type="text"
                id="sumber-limbah"
                class="form-control me-2"
                placeholder="Pilih Sumber Limbah"
              />
              <button
                type="button"
                class="btn btn-sm btn-primary"
                style="font-size: 12px; padding: 5px 10px"
                @click="ipalDataModal = true"
              >
                Pilih Data IPAL
              </button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Warna</th>
                  <th>pH</th>
                  <th>Debit (m³)</th>
                  <th>Suhu (°C)</th>
                  <th>Keterangan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in tableData" :key="index">
                  <td><input type="text" class="form-control" v-model="row.warna" /></td>
                  <td><input type="text" class="form-control" v-model="row.pH" /></td>
                  <td><input type="text" class="form-control" v-model="row.debit" /></td>
                  <td><input type="text" class="form-control" v-model="row.suhu" /></td>
                  <td>
                    <input type="text" class="form-control" v-model="row.keterangan" />
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-sm btn-success me-1"
                      @click="addRow"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-danger"
                      @click="removeRow(index)"
                      :disabled="tableData.length === 1"
                    >
                      -
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-4 d-flex gap-3">
            <button type="submit" class="btn btn-primary">Simpan</button>
            <button type="reset" class="btn btn-danger">Batal</button>
          </div>
        </form>

        <!-- Modal Pilih Data IPAL -->
        <div v-if="ipalDataModal" class="modal-backdrop">
          <div class="modal-content">
            <div class="modal-header">
              <h5>Data IPAL</h5>
              <button
                type="button"
                class="btn-close"
                @click="ipalDataModal = false"
              ></button>
            </div>
            <div class="modal-body">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sumber Air Limbah</th>
                    <th>Sistem IPAL</th>
                    <th>Kapasitas IPAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Produksi</td>
                    <td>1200m³/hari</td>
                    <td>Fisika, Kimia, Biologi</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="ipalDataModal = false"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
}
</style>
