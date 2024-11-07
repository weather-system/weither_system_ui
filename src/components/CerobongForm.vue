<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const form = ref(null)
const lubangSampling = ref('')

const schema = yup.object({
    jenis_boiler: yup.string().required(),
    jumlah_boiler: yup.number().required(),
    merk_boiler: yup.string().required(),
    tinggi_cerobong: yup.number().required(),
    satuan_tinggi_cerobong: yup.string().required(),
    diameter_cerbong: yup.number().required(),
    satuan_diameter_cerobong: yup.string().required(),
    kapasitas_boiler: yup.number().required(),
    satuan_kapasitas_boiler: yup.string().required(),
    pengendalian_emisi_cerobong: yup.string().required(),
    lubang_sampling: yup.string().required(),
    kedalaman_lubang_sampling: yup.number(),
    satuan_kedalaman_lubang_sampling: yup.string(),
    stage: yup.string().required(),
    jenis_bahan_bakar: yup.string().required(),
})

const setValues = (data) => {
  form.value.setValues(data)
}

defineExpose({ setValues })
</script>

<template>
    <Form
    ref="form"
        :validation-schema="schema"
        >
          <div class="row">
            <div class="mt-2">
                <div class="col-4">
                    <label class="form-label">Jenis Boiler</label>
                    <Field name="jenis_boiler" class="form-control" />
                    <ErrorMessage name="jenis_boiler" />
                </div>
                <div class="col-4">
                    <label class="form-label">Jumlah Boiler</label>
                    <Field name="jumlah_boiler" class="form-control" type="number" />
                    <ErrorMessage name="jumlah_boiler" />
                </div>
                <div class="col-4">
                    <label class="form-label">Merk Boiler</label>
                    <Field name="merk_boiler" class="form-control" />
                    <ErrorMessage name="merk_boiler" />
                </div>
                <div class="col-4">
                    <label class="form-label">Tinggi Cerobong</label>
                    <Field name="tinggi_cerobong" class="form-control" type="number" />
                    <ErrorMessage name="tinggi_cerobong" />
                </div>
                <div class="col-4">
                    <label class="form-label">Satuan Tinggi Cerobong</label>
                    <Field name="satuan_tinggi_cerobong" class="form-control" />
                    <ErrorMessage name="satuan_tinggi_cerobong" />
                </div>
                <div class="col-4">
                    <label class="form-label">Diameter Cerobong</label>
                    <Field name="diameter_cerbong" class="form-control" type="number" />
                    <ErrorMessage name="diameter_cerbong" />
                </div>
                <div class="col-4">
                    <label class="form-label">Satuan Diameter Cerobong</label>
                    <Field name="satuan_diameter_cerobong" class="form-control" />
                    <ErrorMessage name="satuan_diameter_cerobong" />
                </div>
                <div class="col-4">
                    <label class="form-label">Kapasitas Boiler</label>
                    <Field name="kapasitas_boiler" class="form-control" type="number" />
                    <ErrorMessage name="kapasitas_boiler" />
                </div>
                <div class="col-4">
                    <label class="form-label">Satuan Kapasitas Boiler</label>
                    <Field name="satuan_kapasitas_boiler" class="form-control" />
                    <ErrorMessage name="satuan_kapasitas_boiler" />
                </div>
                <div class="col-4">
                    <label class="form-label">Koordinat X</label>
                    <Field name="koordinat_x" class="form-control" />
                    <ErrorMessage name="koordinat_x" />
                </div>
                <div class="col-4">
                    <label class="form-label">Koordinat Y</label>
                    <Field name="koordinat_y" class="form-control" />
                    <ErrorMessage name="koordinat_y" />
                </div>
                <div class="col-4">
                    <label class="form-label">Pengendalian Emisi Cerobong</label>
                    <Field name="pengendalian_emisi_cerobong" class="form-control" as="select">
                      <option value="">Pilih</option>
                      <option value="Filter Udara">Filter Udara</option>
                      <option value="Pengendap Silikon">Pengendap Silikon</option>
                      <option value="Filter Basah">Filter Basah</option>
                      <option value="Pengendap Sistem Gravitasi">Pengendap Sistem Gravitasi</option>
                      <option value="Pengendap Elektrostatik">Pengendap Elektrostatik</option>
                    </Field>
                    <ErrorMessage name="pengendalian_emisi_cerobong" />
                </div>
                <div class="col-4">
                    <label class="form-label">Lubang Sampling</label>
                    <Field name="lubang_sampling" class="form-control" as="select" v-model="lubangSampling">
                        <option value="">Pilih</option>
                        <option value="Ada">Ada</option>
                        <option value="Tidak">Tidak</option>
                    </Field>
                    <ErrorMessage name="lubang_sampling" />
                </div>
                <div class="col-4" v-if="lubangSampling == 'Ada'">
                    <label class="form-label">Kedalaman Lubang Sampling</label>
                    <Field name="kedalaman_lubang_sampling" class="form-control" type="number" />
                    <ErrorMessage name="kedalaman_lubang_sampling" />
                </div>
                <div class="col-4" v-if="lubangSampling == 'Ada'">
                    <label class="form-label">Satuan Kedalaman Lubang Sampling</label>
                    <Field name="satuan_kedalaman_lubang_sampling" class="form-control" />
                    <ErrorMessage name="satuan_kedalaman_lubang_sampling" />
                </div>
                <div class="col-4">
                    <label class="form-label">Tangga Cerobong/Stage</label>
                    <Field name="stage" class="form-control" />
                    <ErrorMessage name="stage" />
                </div>
                <div class="col-4">
                    <label class="form-label">Jenis Bahan Bakar</label>
                    <Field name="jenis_bahan_bakar" class="form-control" as="select">
                        <option value="">Pilih</option>
                        <option value="Batubara">Batubara</option>
                        <option value="Briket">Briket</option>
                        <option value="Gas">Gas</option>
                        <option value="Solar">Solar</option>
                        <option value="Bensin">Bensin</option>
                        <option value="LPG">LPG</option>
                        <option value="Biomassa">Biomassa</option>
                        <option value="Listrik">Listrik</option>
                    </Field>
                    <ErrorMessage name="jenis_bahan_bakar" />
                </div>
            </div>
            <div class="mt-4">
              <button class="btn btn-primary">Simpan</button>
            </div>
          </div>
        </Form>
</template>
