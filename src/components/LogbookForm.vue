<script setup>
import { ref, onMounted } from 'vue'
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'
import * as yup from 'yup'
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import axios from 'axios'

const $loading = useLoading()
const form = ref(null)
const companyIpalOptions = ref([])

const initialValues = {
  items: [],
}
const fetchCompanyIpalOptions = async () => {
  const loader = $loading.show()
  try {
    const response = await axios.get('/api/data_company_ipals')
    companyIpalOptions.value = response.data
  } catch (error) {
    console.error('Error fetching company IPAL data:', error)
    Swal.fire('Error!', 'Gagal memuat data Sumber Limbah.', 'error')
  } finally {
    loader.hide()
  }
}

const deletetpsb3item = async id => {
  const { isConfirmed } = await Swal.fire({
    title: 'Apa kamu yakin ?',
    text: 'Kamu tidak akan bisa mengembalikan ini!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-secondary',
    },
    buttonsStyling: false,
  })

  if (isConfirmed) {
    const loader = $loading.show()
    try {
      await axios.delete(`api/logbookipaldetail/${id}`)
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
    } catch (error) {
      console.error('Error deleting IPAL:', error)
      Swal.fire('Error!', 'There was an error deleting the IPAL.', 'error')
    } finally {
      loader.hide()
    }
  }
}

const schema = yup.object({
  tanggal: yup.date().required(),
  company_ipal_id: yup.string().required(),
  warna_inlet: yup.string().required(),
  warna_outlet: yup.string().required(),
  ph_inlet: yup.string().required(),
  ph_outlet: yup.string().required(),
  debit_inlet: yup.string().required(),
  debit_outlet: yup.string().required(),
  suhu_inlet: yup.string().required(),
  suhu_outlet: yup.string().required(),
  keterangan_inlet: yup.string().required(),
  keterangan_outlet: yup.string().required(),
  items: yup.array(
    yup.object({
      bahan_kimia_digunakan: yup.string().required(),
      volume: yup.number().required(),
    }),
  ),
})

const setValues = data => {
  form.value.setValues(data)
}
onMounted(() => {
  fetchCompanyIpalOptions()
})
defineExpose({ setValues })
</script>

<template>
  <Form
    ref="form"
    :validation-schema="schema"
    :initial-values="initialValues"
    @invalid-submit="console.log"
  >
    <div class="row">
      <div class="col-12 mt-2">
        <div class="row mb-3">
          <div class="col-md-3">
            <div class="form-group">
              <label class="col-form-label">Tanggal</label>
                  <Field name="tanggal" class="form-control" type="date" />
                  <ErrorMessage name="tanggal" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-10">
              <div class="form-group">
                <label class="col-form-label">Sumber Limbah</label>
                <Field as="select" name="company_ipal_id" class="form-control">
                  <option value="" disabled>Pilih Sumber Limbah</option>
                  <option
                    v-for="company in companyIpalOptions"
                    :key="company.id"
                    :value="company.id"
                  >
                    Type : {{ company.type }}, Nomor Izin : {{ company.no_izin_perusahaan }}, Tahun Pembuatan IPAL : {{ company.year_of_manufacture_of_ipal }}, Kapasitas IPAL : {{ company.capacity_ipal }}
                  </option>
                </Field>
                <ErrorMessage name="company_ipal_id" />
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Warna</th>
                  <th>pH</th>
                  <th>Debit (m3)</th>
                  <th>Suhu (C)</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <FieldArray>
                  <tr>
                    <td>Inlet</td>
                    <td>
                      <Field
                        name="warna_inlet"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage
                        name="warna_inlet"
                      />
                    </td>
                    <td>
                      <Field
                        name="ph_inlet"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage name="ph_inlet" />
                    </td>
                    <td>
                      <Field
                        name="debit_inlet"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage name="debit_inlet" />
                    </td>
                    <td>
                      <Field
                        name="suhu_inlet"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage name="suhu_inlet" />
                    </td>
                    <td>
                      <Field
                        name="keterangan_inlet"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage name="keterangan_inlet" />
                    </td>
                  </tr>
                  <tr>
                    <td>Outlet</td>
                    <td>
                      <Field
                        name="warna_outlet"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage
                        name="warna_outlet"
                      />
                    </td>
                    <td>
                      <Field
                        name="ph_outlet"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage name="ph_outlet" />
                    </td>
                    <td>
                      <Field
                        name="debit_outlet"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage name="debit_outlet" />
                    </td>
                    <td>
                      <Field
                        name="suhu_outlet"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage name="suhu_outlet" />
                    </td>
                    <td>
                      <Field
                        name="keterangan_outlet"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage name="keterangan_outlet" />
                    </td>
                  </tr>
                </FieldArray>
              </tbody>
            </table>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Bahan Kimia Yang Digunakan</th>
                  <th>Volume</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <FieldArray name="items" v-slot="{ fields, push, remove }">
                  <tr v-if="fields.length === 0">
                    <td colspan="3" class="text-center">Data Tidak Ada</td>
                    <td>
                      <button
                        @click="
                          async () => {
                            if (field.value.id) {
                              await deletetpsb3item(field.value.id)
                            }
                              remove(idx)
                            
                          }
                        "
                        type="button"
                        class="btn btn-danger"
                      >
                        -
                      </button>
                      <button
                        @click="
                          push({
                            id: null,
                            bahan_kimia_digunakan: '',
                            volume: '',
                          })
                        "
                        type="button"
                        class="btn btn-success m-2"
                      >
                        +
                      </button>
                    </td>
                  </tr>
                  <tr v-for="(field, idx) in fields" :key="idx">
                    <td>{{ idx + 1 }}</td>
                    <td>
                      <Field
                        :name="`items[${idx}].bahan_kimia_digunakan`"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage
                        :name="`items[${idx}].bahan_kimia_digunakan`"
                      />
                    </td>
                    <td>
                      <Field
                        :name="`items[${idx}].volume`"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage :name="`items[${idx}].volume`" />
                    </td>
                    <td>
                      <button
                        @click="
                          async () => {
                            if (field.value.id) {
                              await deletetpsb3item(field.value.id)
                            }
                              remove(idx)
                            
                          }
                        "
                        type="button"
                        class="btn btn-danger"
                      >
                        -
                      </button>
                      <button
                        @click="
                          push({
                            id: null,
                            bahan_kimia_digunakan: '',
                            volume: '',
                          })
                        "
                        type="button"
                        class="btn btn-success m-2"
                      >
                        +
                      </button>
                    </td>
                  </tr>
                </FieldArray>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="field-btns d-flex justify-content-between">
            <div>
              <button class="btn btn-primary next_btn">Submit</button>
              <router-link to="/Logbook/IPAL" class="btn btn-secondary m-2"
                >Kembali</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>