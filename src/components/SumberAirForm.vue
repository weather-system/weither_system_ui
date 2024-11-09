<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const form = ref(null)
const type = ref('')

const schema = yup.object({
    jenis: yup.string().required(),
    nama: yup.string().nullable(),
    kedalaman: yup.number().nullable(),
    kapasitas: yup.number().nullable(),
    debit_dalam_izin: yup.number().nullable(),
    koordinat_x: yup.string().nullable(),
    koordinat_y: yup.string().nullable(),
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
                    <label class="form-label">Jenis</label>
                    <Field v-model="type" name="jenis" class="form-control" />
                    <ErrorMessage name="jenis" />
                </div>
                <div v-if="['Air Permukaan/Sungai', 'Penyedian Air(PDAM/Swasta)'].includes(type)" class="col-4">
                    <label class="form-label">Nama</label>
                    <Field name="nama" class="form-control" />
                    <ErrorMessage name="nama" />
                </div>
                <div v-if="type == 'Air Tanah'" class="col-4">
                    <label class="form-label">Kedalaman</label>
                    <Field name="kedalaman" class="form-control" type="number" />
                    <ErrorMessage name="kedalaman" />
                </div>
                <div v-if="type == 'Air Hujan'" class="col-4">
                    <label class="form-label">Kapasitas</label>
                    <Field name="kapasitas" class="form-control" type="number" />
                    <ErrorMessage name="kapasitas" />
                </div>
                <div class="col-4">
                    <label class="form-label">Debit Dalam Izin (M3/Bulan)</label>
                    <Field name="debit_dalam_izin" class="form-control" type="number" />
                    <ErrorMessage name="debit_dalam_izin" />
                </div>
                <div v-if="['Air Tanah', 'Air Permukaan/Sungai', 'Penyedian Air(PDAM/Swasta)', 'Air Hujan'].includes(type)" class="col-4">
                    <label class="form-label">Koordinat X</label>
                    <Field name="koordinat_x" class="form-control" />
                    <ErrorMessage name="koordinat_x" />
                </div>
                <div v-if="['Air Tanah', 'Air Permukaan/Sungai', 'Penyedian Air(PDAM/Swasta)', 'Air Hujan'].includes(type)" class="col-4">
                    <label class="form-label">Koordinat Y</label>
                    <Field name="koordinat_y" class="form-control" />
                    <ErrorMessage name="koordinat_y" />
                </div>
            </div>
            <div class="mt-4">
              <button class="btn btn-primary">Simpan</button>
            </div>
          </div>
        </Form>
</template>
