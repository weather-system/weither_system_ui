<script setup>
import { ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { closeModal, Modal } from "jenesius-vue-modal";
import { searchKbli } from '@/lib/kbli.js'

const $loading = useLoading()

const emit = defineEmits([Modal.EVENT_PROMPT])
const query = ref('')
const kbli = ref([])

const search = async () => {
  const loader = $loading.show()
  try {
    const data = await searchKbli(query.value)
    kbli.value = data.data.result.map((v) => {
      return {
        kode: v._source.kode,
        judul: v._source.localization.id.judul,
        uraian: v._source.localization.id.uraian
      }
    })
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const addKbli = (data) => {
  emit(Modal.EVENT_PROMPT, data)
}
</script>

<template>
  <div class="p-4 bg-white text-black rounded" style="width: 600px;">
    <h1 class="fs-5">Tambah KBLI</h1>

    <div class="d-flex">
      <input v-model="query" class="form-control" placeholder="Cari KBLI" />
      <button @click="search" class="btn btn-primary ms-3">Cari</button>
    </div>

    <div class="mt-3" style="max-height: 500px; overflow-y: auto;">
      <div v-for="data in kbli" :key="data.kode" class="card mb-3">
        <div class="card-header p-2">{{ data.kode }} - {{ data.judul }}</div>
        <div class="card-body p-2">
          <p class="card-text">{{ data.uraian }}</p>
          <div class="d-flex justify-content-end">
            <button @click="addKbli(data)" type="button" class="btn btn-primary">Tambah</button>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end mt-3">
      <button @click="closeModal" class="btn btn-danger">Close</button>
    </div>
  </div>
</template>

<style>
.modal-container {
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.6);
}
</style>
