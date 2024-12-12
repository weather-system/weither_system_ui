<script setup>
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'

const props = defineProps(['name', 'deleteDetail', 'bahanBakar'])
</script>

<template>
  <div class="table-resposnive table-div">
    <p>Bahan Bakar: {{ props.bahanBakar }}</p>
    <FieldArray :name="props.name" v-slot="{ fields, push, remove }">
      <table class="table datatable">
        <thead>
          <tr>
            <th>No</th>
            <th>Parameter</th>
            <th>Satuan</th>
            <th>Baku Mutu</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(field, i) in fields" :key="field.key">
            <td>{{ i + 1 }}</td>
            <td>
              <Field
                :name="`${props.name}[${i}].parameter`"
                class="form-control"
              />
              <ErrorMessage :name="`${props.name}[${i}].parameter`" />
            </td>
            <td>
              <Field
                :name="`${props.name}[${i}].satuan`"
                class="form-control"
              />
              <ErrorMessage :name="`${props.name}[${i}].satuan`" />
            </td>
            <td>
              <Field
                :name="`${props.name}[${i}].baku_mutu`"
                class="form-control"
                type="number"
              />
              <ErrorMessage :name="`${props.name}[${i}].baku_mutu`" />
            </td>
            <td class="d-none">
              <Field
                :name="`${props.name}[${i}].bahan_bakar`"
                class="form-control"
                :value="props.bahanBakar"
              />
              <ErrorMessage :name="`${props.name}[${i}].baku_mutu`" />
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
          @click="push({ bahan_bakar: props.bahanBakar })"
          type="button"
          class="btn btn-success"
        >
          Tambah
        </button>
      </div>
    </FieldArray>
  </div>
</template>
