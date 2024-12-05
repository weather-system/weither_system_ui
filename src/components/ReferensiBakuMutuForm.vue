<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'
import * as yup from 'yup'

const form = ref(null)

const schema = yup.object({
    parameter: yup.string().required(),
    baku_mutu: yup.number().required(),
    satuan: yup.string().required(),
    jenis_uji: yup.string().required()
})

const setValues = (data) => {
  form.value.setValues(data)
}

defineExpose({ setValues })
</script>

<template>
  <Form ref="form" :validation-schema="schema">
    <div class="row">
      <div class="col-4">
          <label class="form-label">Parameter</label>
          <Field name="parameter" class="form-control" />
          <ErrorMessage name="parameter" />
      </div>
      <div class="row mt-2">
        <div class="col-2">
            <label class="form-label">Baku Mutu</label>
            <Field name="baku_mutu" type="number" class="form-control" />
            <ErrorMessage name="baku_mutu" />
        </div>
        <div class="col-2">
            <label class="form-label">Satuan</label>
            <Field name="satuan" class="form-control" />
            <ErrorMessage name="satuan" />
        </div>
      </div>
      <div class="col-4 mt-2">
          <label class="form-label">Jenis Uji</label>
          <Field name="jenis_uji" class="form-control" />
          <ErrorMessage name="jenis_uji" />
      </div>
      <div class="mt-4">
          <button class="btn btn-primary">Simpan</button>
        </div>
      </div>
  </Form>
</template>
