<script setup>
import { ref, reactive } from 'vue'
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'
import { useLoading } from 'vue-loading-overlay'
import * as yup from 'yup'
import Swal from 'sweetalert2'

const $loading = useLoading()

const form = ref(null)

const schema = yup.object({
  jenis: yup.string().required(),
  satuan: yup.string().required(),
})

const setValues = data => {
  form.value.setValues(data)
}

defineExpose({ setValues })
</script>

<template>
  <Form ref="form" :validation-schema="schema">
    <div class="row">
      <div class="col-6">
        <label class="form-label">Jenis Usaha dan/atau Kegiatan</label>
        <Field name="jenis" class="form-control" />
        <ErrorMessage name="jenis" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-6">
        <label class="form-label">Satuan</label>
        <Field name="satuan" class="form-control" />
        <ErrorMessage name="satuan" />
      </div>
    </div>
    <div class="mt-4">
      <button class="btn btn-primary">Simpan</button>
    </div>
  </Form>
</template>
