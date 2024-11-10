<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'
import * as yup from 'yup'

const form = ref(null)

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string(),
    role: yup.string().required()
})

const setValues = (data) => {
  form.value.setValues(data)
}

defineExpose({ setValues })
</script>

<template>
  <Form ref="form" :validation-schema="schema">
    <div class="row">
      <div class="mt-2">
      <div class="col-4">
          <label class="form-label">Name</label>
          <Field name="name" class="form-control" />
          <ErrorMessage name="name" />
      </div>
      <div class="col-4">
          <label class="form-label">Email</label>
          <Field name="email" class="form-control" />
          <ErrorMessage name="email" />
      </div>
      <div class="col-4">
          <label class="form-label">Password</label>
          <Field name="password" class="form-control" type="password" />
          <ErrorMessage name="password" />
      </div>
      <div class="col-4">
          <label class="form-label">Role</label>
          <Field name="role" class="form-control" as="select">
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
            <option value="EKSEKUTIF">EKSEKUTIF</option>
          </Field>
          <ErrorMessage name="role" />
      </div>
      <div class="mt-4">
          <button class="btn btn-primary">Simpan</button>
        </div>
      </div>
    </div>
  </Form>
</template>
