<script setup>
import { ref } from "vue";
import MainWrapper from "@/components/MainWrapper.vue";

const ipalDataModal = ref(false);

// Data ini bisa diisi dari API atau parameter route
const ipalData = ref({
  tanggal: "2024-12-03",
  sumberLimbah: "Produksi",
  inlet: { warna: "Keruh", pH: 7, debit: 1200, suhu: 30, keterangan: "Normal" },
  outlet: { warna: "Bening", pH: 6.8, debit: 1180, suhu: 28, keterangan: "Normal" },
});
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>Edit LOG IPAL</h5>
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
            <input
              type="date"
              id="tanggal"
              class="form-control"
              v-model="ipalData.tanggal"
            />
          </div>

          <div class="mb-3">
            <label for="sumber-limbah" class="form-label">Sumber Limbah</label>
            <div class="d-flex">
              <input
                type="text"
                id="sumber-limbah"
                class="form-control me-2"
                v-model="ipalData.sumberLimbah"
              />
              <button type="button" class="btn btn-primary" @click="ipalDataModal = true">
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Inlet"
                      v-model="ipalData.inlet.warna"
                    />
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="ipalData.inlet.pH" />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      v-model="ipalData.inlet.debit"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      v-model="ipalData.inlet.suhu"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      v-model="ipalData.inlet.keterangan"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Outlet"
                      v-model="ipalData.outlet.warna"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      v-model="ipalData.outlet.pH"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      v-model="ipalData.outlet.debit"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      v-model="ipalData.outlet.suhu"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      v-model="ipalData.outlet.keterangan"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
