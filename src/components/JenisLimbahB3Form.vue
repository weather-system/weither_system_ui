<script setup>
import { ref, reactive, computed } from 'vue'
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'

const form = ref(null)
const formData = reactive({})

const isShowField = (field) => {
  if (field == 'cas') {
    return [
      'B3 Kadaluarsa', 'B3 yang tumpah',
      'B3 yang tidak memenuhi spesifikasi produk yang akan dibuang',
      'Bekas kemasan B3'
    ].includes(formData.jenis)
  }

  if (field == 'sumber_limbah') {
    return [
      'Sumber spesifik Umum',
      'Sumber spesifik Khusus'
    ].includes(formData.jenis)
  }

  if (['kode_industri', 'jenis_industri', 'uraian_limbah'].includes(field)) {
    return [
      'Sumber spesifik Umum'
    ].includes(formData.jenis)
  }

  if (field == 'zat_pencemar') {
    return [
      'Sumber Tidak Spesifik',
      'B3 Kadaluarsa',
      'B3 yang tumpah',
      'B3 yang tidak memenuhi spesifikasi produk yang akan dibuang',
      'Bekas kemasan B3',
    ].includes(formData.jenis)
  }

  if (field == 'jenis_limbah' || field == 'sumber_limbah') {
    return [
      'Sumber spesifik Khusus'
    ].includes(formData.jenis)
  }

  return true
}

const jenis = [
  'Sumber Tidak Spesifik',
  'B3 Kadaluarsa',
  'B3 yang tumpah',
  'B3 yang tidak memenuhi spesifikasi produk yang akan dibuang',
  'Bekas kemasan B3',
  'Sumber spesifik Umum',
  'Sumber spesifik Khusus'
]

const setValues = data => {
  form.value.setValues(data)
}

defineExpose({ setValues })
</script>

<template>
  <Form ref="form">
    <div class="row">
      <div class="col-6">
        <label class="form-label">Jenis LB3 Berdasarkan Sumber</label>
        <Field v-model="formData.jenis" name="jenis" class="form-control" as="select">
          <option value="">Pilih</option>
          <option v-for="j in jenis" :key="j" :value="j">{{ j }}</option>
        </Field>
        <ErrorMessage name="jenis" />
      </div>
    </div>

    <template v-if="formData.jenis">
      <div v-if="isShowField('nama_limbah')" class="row mt-2">
        <div class="col-6">
          <label class="form-label">Nama Limbah</label>
          <Field name="nama_limbah" class="form-control" />
          <ErrorMessage name="nama_limbah" />
        </div>
      </div>
      <div v-if="isShowField('kode_industri')" class="row mt-2">
        <div class="col-6">
          <label class="form-label">Kode Industri/Kegiatan</label>
          <Field name="kode_industri" class="form-control" />
          <ErrorMessage name="kode_industri" />
        </div>
      </div>
      <div v-if="isShowField('jenis_industri')" class="row mt-2">
        <div class="col-6">
          <label class="form-label">Jenis Industri/Kegiatan</label>
          <Field name="jenis_industri" class="form-control" />
          <ErrorMessage name="jenis_industri" />
        </div>
      </div>
      <div v-if="isShowField('sumber_limbah')" class="row mt-2">
        <div class="col-6">
          <label class="form-label">Sumber Limbah</label>
          <Field name="sumber_limbah" class="form-control" />
          <ErrorMessage name="sumber_limbah" />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-6">
          <label class="form-label">Kode Limbah</label>
          <Field name="kode_limbah" class="form-control" />
          <ErrorMessage name="kode_limbah" />
        </div>
      </div>
      <div v-if="isShowField('jenis_limbah')" class="row mt-2">
        <div class="col-6">
          <label class="form-label">Jenis Limbah B3</label>
          <Field name="jenis_limbah" class="form-control" />
          <ErrorMessage name="jenis_limbah" />
        </div>
      </div>
      <div v-if="isShowField('cas')" class="row mt-2">
        <div class="col-6">
          <label class="form-label">Nomor CAS (Chemical Abstract Services)</label>
          <Field name="cas" class="form-control" />
          <ErrorMessage name="cas" />
        </div>
      </div>
      <div class="row mt-2">
        <div v-if="isShowField('zat_pencemar')" class="col-6">
          <label class="form-label">Zat Pencemar</label>
          <Field name="zat_pencemar" class="form-control" />
          <ErrorMessage name="zat_pencemar" />
        </div>
      </div>
      <div v-if="isShowField('uraian_limbah')" class="row mt-2">
        <div class="col-6">
          <label class="form-label">Uraian Limbah</label>
          <Field name="uraian_limbah" class="form-control" />
          <ErrorMessage name="uraian_limbah" />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-6">
          <label class="form-label">Kategori Bahaya</label>
          <Field name="kategori_bahaya" class="form-control" as="select">
            <option value="">Pilih</option>
            <option value="Kategori 1">Kategori 1</option>
            <option value="Kategori 2">Kategori 2</option>
          </Field>
          <ErrorMessage name="kategori_bahaya" />
        </div>
      </div>
    </template>
    <button type="submit" class="mt-2 btn btn-primary">Submit</button>
  </Form>
</template>
