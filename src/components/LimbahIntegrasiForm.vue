<script setup>
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'

const props = defineProps(['name', 'deleteDetail', 'bahanBakar'])
</script>

<template>
  <div class="table-resposnive table-div">
    <FieldArray :name="props.name" v-slot="{ fields, push, remove }">
      <table class="table datatable">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Kadar Paling Tinggi</th>
            <th>Satuan</th>
            <th>Beban Paling Tinggi</th>
            <th>Satuan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(field, i) in fields" :key="field.key">
            <td>
              <Field
                :name="`${props.name}[${i}].parameter`"
                class="form-control"
              />
              <ErrorMessage :name="`${props.name}[${i}].parameter`" />
            </td>
            <td>
              <Field
                :name="`${props.name}[${i}].kadar_paling_tinggi`"
                class="form-control"
              />
              <ErrorMessage :name="`${props.name}[${i}].kadar_paling_tinggi`" />
            </td>
            <td>
              <Field
                :name="`${props.name}[${i}].satuan_kadar_paling_tinggi`"
                class="form-control"
              />
              <ErrorMessage :name="`${props.name}[${i}].satuan_kadar_paling_tinggi`" />
            </td>
            <td>
              <Field
                :name="`${props.name}[${i}].beban_paling_tinggi`"
                class="form-control"
              />
              <ErrorMessage :name="`${props.name}[${i}].beban_paling_tinggi`" />
            </td>
            <td>
              <Field
                :name="`${props.name}[${i}].satuan_beban_paling_tinggi`"
                class="form-control"
              />
              <ErrorMessage :name="`${props.name}[${i}].satuan_beban_paling_tinggi`" />
            </td>
            <td>
              <button
                @click="props.deleteDetail(remove, i, field.value)"
                type="button"
                class="btn btn-danger"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-2 d-flex justify-content-end">
        <button
          @click="push({})"
          type="button"
          class="btn btn-success"
        >
          Tambah
        </button>
      </div>
    </FieldArray>
  </div>
</template>
