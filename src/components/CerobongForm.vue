<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const form = ref(null)

const schema = yup.object({
    jenis_boiler: yup.string().required(),
    jumlah_boiler: yup.number().required(),
    merk_boiler: yup.string().required(),
    tinggi_cerobong: yup.number().required(),
    diameter_cerbong: yup.number().required(),
    kapasitas_boiler: yup.number().required(),
    pengendalian_emisi_cerobong: yup.string().required(),
    lubang_sampling: yup.string().required(),
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
                    <Field name="merk_boiler" class="form-control" type="number" />
                    <ErrorMessage name="merk_boiler" />
                </div>
                <div class="col-4">
                    <label class="form-label">Tinggi Cerobong</label>
                    <Field name="tinggi_cerobong" class="form-control" type="number" />
                    <ErrorMessage name="tinggi_cerobong" />
                </div>
                <div class="col-4">
                    <label class="form-label">Diameter Cerobong</label>
                    <Field name="diameter_cerbong" class="form-control" type="number" />
                    <ErrorMessage name="diameter_cerbong" />
                </div>
                <div class="col-4">
                    <label class="form-label">Kapasitas Boiler</label>
                    <Field name="kapasitas_boiler" class="form-control" type="number" />
                    <ErrorMessage name="kapasitas_boiler" />
                </div>
                <div class="col-4">
                    <label class="form-label">Pengendalian Emisi Cerobong</label>
                    <Field name="pengendalian_emisi_cerobong" class="form-control" />
                    <ErrorMessage name="pengendalian_emisi_cerobong" />
                </div>
                <div class="col-4">
                    <label class="form-label">Lubang Sampling</label>
                    <Field name="lubang_sampling" class="form-control" as="select">
                        <option value="">Pilih</option>
                        <option value="Ada">Ada</option>
                        <option value="Tidak">Tidak</option>
                    </Field>
                    <ErrorMessage name="lubang_sampling" />
                </div>
                <div class="col-4">
                    <label class="form-label">Tangga Cerobong/Stage</label>
                    <Field name="stage" class="form-control" />
                    <ErrorMessage name="stage" />
                </div>
                <div class="col-4">
                    <label class="form-label">Jenis Bahan Bakar</label>
                    <Field name="jenis_bahan_bakar" class="form-control" />
                    <ErrorMessage name="jenis_bahan_bakar" />
                </div>
            </div>
            <div class="mt-4">
              <button class="btn btn-primary">Simpan</button>
            </div>
          </div>
        </Form>
</template>