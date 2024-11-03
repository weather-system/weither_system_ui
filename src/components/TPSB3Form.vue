<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const form = ref(null)

const schema = yup.object({
    jenis_limbah_b3: yup.string().required(),
    sumber_limbah_b3: yup.string().required(),
    koordinat_x: yup.string().required(),
    koordinat_y: yup.string().required(),
    volume: yup.number().required(),
    satuan: yup.string().required(),
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
                    <label class="form-label">Jenis Limbah B3</label>
                    <Field name="jenis_limbah_b3" class="form-control" />
                    <ErrorMessage name="jenis_limbah_b3" />
                </div>
                <div class="col-4">
                    <label class="form-label">Sumber Limbah B3</label>
                    <Field name="sumber_limbah_b3" class="form-control" />
                    <ErrorMessage name="sumber_limbah_b3" />
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
                    <label class="form-label">Volume Limbah B3 Dalam Izin</label>
                    <Field name="volume" class="form-control" type="number" />
                    <ErrorMessage name="volume" />
                </div>
                <div class="col-4">
                    <label class="form-label">Satuan</label>
                    <Field name="satuan" class="form-control" />
                    <ErrorMessage name="satuan" />
                </div>
            </div>
            <div class="mt-4">
              <button class="btn btn-primary">Simpan</button>
            </div>
          </div>
        </Form>
</template>