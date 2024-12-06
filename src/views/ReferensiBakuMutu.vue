<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue';
import { getReferensiBakuMutu } from '@/lib/referensiBakuMutu.js'

const $loading = useLoading()

const data = ref([])

const loadReferensiBakuMutu = async () => {
  const loader = $loading.show()
  try {
    data.value = await getReferensiBakuMutu()
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

onMounted(async () => {
  await loadReferensiBakuMutu()
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>Referensi Baku Mutu</h5>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="table-resposnive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Baku Mutu</th>
                    <th>Satuan</th>
                    <th>Jenis Uji</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(d, i) in data" :key="i">
                    <td>{{ d.parameter }}</td>
                    <td>{{ d.baku_mutu }}</td>
                    <td>{{ d.satuan }}</td>
                    <td>{{ d.jenis_uji }}</td>
                    <td class="d-flex" style="gap: 1rem">
                      <RouterLink
                        :to="{
                          path: d.id ? `/ReferensiBakuMutu/${d.id}` : '/ReferensiBakuMutu/Create',
                          query: d.id ? null : {
                            ...d
                          }
                        }"
                        class="btn btn-success"
                        >Ubah</RouterLink
                      >
                      <!-- <button
                        v-if="data.status != 'Verifikasi LH'"
                        @click="deleteData(data.id)"
                        class="btn btn-danger"
                      >
                        Hapus
                      </button> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
