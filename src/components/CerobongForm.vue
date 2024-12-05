<script setup>
import { ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { uploadFile } from '@/lib/filestorage.js'

const $loading = useLoading()

const form = ref(null)
const lubangSampling = ref('')

const initialData = {
  satuan_tinggi_cerobong: 'm',
  satuan_diameter_cerobong: 'm',
  satuan_kedalaman_lubang_sampling: 'm2',
  kedalaman_lubang_sampling: null,
}

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
  kedalaman_lubang_sampling: yup.string()
    .nullable(),
  nrOfApples: yup
    .number()
    .nullable(true)
    .transform((_, val) => val === Number(val) ? val : null),
  satuan_kedalaman_lubang_sampling: yup.string(),
  stage: yup.string().nullable(),
  jenis_bahan_bakar: yup.string().required(),
})

const uploadFileWrapped = async e => {
  const loader = $loading.show()
  try {
    const url = await uploadFile(e.target.files[0])
    return url
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const setValues = data => {
  form.value.setValues(data)
}

defineExpose({ setValues })
</script>

<template>
  <Form ref="form" :validation-schema="schema" :initial-values="initialData">
    <MainWrapper>
      <div class="page-wrapper page-settings">
        <div class="content">
          <div class="row">
            <div class="col-lg-10 mx-auto">
              <div class="content-page-header mb-3">
                <h3>Data Pertek Emisi</h3>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">No. Pertek Emisi</label>
                    <Field name="no_pertek_emisi" class="form-control" />
                    <ErrorMessage name="no_pertek_emisi" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">File Pertek Emisi</label>
                    <Field
                      name="file_pertek_emisi"
                      v-slot="{ field, handleChange }"
                    >
                      <input
                        @change="
                          async $event =>
                            handleChange(await uploadFileWrapped($event))
                        "
                        type="file"
                        class="form-control"
                      />
                    </Field>
                    <ErrorMessage name="file_pertek_emisi" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label"
                      >Jenis Boiler Berdasarkan Tube Boiler</label
                    >
                    <Field
                      name="jenis_boiler"
                      as="select"
                      class="form-control"
                    >
                      <option value="">Pilih</option>
                      <option value="Pipa Api">Pipa Api</option>
                      <option value="Boiler Pipa Air">Boiler Pipa Air</option>
                    </Field>
                    <ErrorMessage name="jenis_boiler" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label"
                      >Jenis Boiler Berdasarkan Bahan Bakar</label
                    >
                    <Field
                      name="jenis_bahan_bakar"
                      as="select"
                      class="form-control"
                    >
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
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Jumlah Boiler</label>
                    <Field
                      name="jumlah_boiler"
                      class="form-control"
                      type="number"
                    />
                    <ErrorMessage name="jumlah_boiler" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Merk Boiler</label>
                    <Field name="merk_boiler" class="form-control" />
                    <ErrorMessage name="merk_boiler" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Tinggi Cerobong</label>
                    <div class="form-duration">
                    <Field
                      name="tinggi_cerobong"
                      class="form-control"
                      type="number"
                    /><span class="mins">m</span>
                  </div>
                    <ErrorMessage name="tinggi_cerobong" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Diameter Cerobong</label>
                    <div class = "form-duration">
                    <Field
                      name="diameter_cerbong"
                      class="form-control"
                      type="number"
                    />
                    <span class="mins">m</span>
                  </div>
                    <ErrorMessage name="diameter_cerbong" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Kapasitas Boiler</label>
                    <Field
                      name="kapasitas_boiler"
                      class="form-control"
                      type="number"
                    />
                    <ErrorMessage name="kapasitas_boiler" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label"
                      >Satuan Kapasitas Boiler</label
                    >
                    <Field
                      name="satuan_kapasitas_boiler"
                      class="form-control"
                      type="text"
                    />
                    <ErrorMessage name="satuan_kapasitas_boiler" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label"
                    >Longitude (Ex. -123.21312)</label
                  >
                  <Field name="koordinat_x" class="form-control" />
                  <a
                    href="https://www.yogantara.info/"
                    class="text-small"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Konvert dari derajat ke decimal Link</a
                  >
                    <ErrorMessage name="koordinat_x" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Latitude (Ex. -123.21312)</label>
                    <Field
                      name="koordinat_y"
                      class="form-control"
                      type="text"
                    />
                    <ErrorMessage name="koordinat_y" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label"
                      >Pengendalian Emisi Cerobong</label
                    >
                    <Field
                      name="pengendalian_emisi_cerobong"
                      as="select"
                      class="form-control"
                    >
                      <option value="">Pilih</option>
                      <option value="Filter Udara">Filter Udara</option>
                      <option value="Pengendap Silikon">
                        Pengendap Silikon
                      </option>
                      <option value="Filter Basah">Filter Basah</option>
                      <option value="Pengendap Sistem Gravitasi">
                        Pengendap Sistem Gravitasi
                      </option>
                      <option value="Pengendap Elektrostatik">
                        Pengendap Elektrostatik
                      </option>
                    </Field>
                    <ErrorMessage name="pengendalian_emisi_cerobong" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Lubang Sampling</label>
                    <Field
                      name="lubang_sampling"
                      as="select"
                      class="form-control"
                      v-model="lubangSampling"
                    >
                      <option value="">Pilih</option>
                      <option value="Ada">Ada</option>
                      <option value="Tidak">Tidak</option>
                    </Field>
                    <ErrorMessage name="lubang_sampling" />
                  </div>
                </div>
              </div>

              <div class="row" v-if="lubangSampling === 'Ada'">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label"
                      >Kedalaman Lubang Sampling</label
                    >
                    <div class="form-duration">
                    <Field
                      name="kedalaman_lubang_sampling"
                      class="form-control"
                      type="number"
                    />
                    <span class="mins">m2</span>
                  </div>
                    <ErrorMessage name="kedalaman_lubang_sampling" />
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Tangga Cerobong/Stage</label>
                    <Field name="stage" class="form-control"> </Field>
                    <ErrorMessage name="stage" />
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <button class="btn btn-primary">Simpan</button>
                <router-link to="/Data/Cerobong" class="btn btn-secondary m-2"
                        >Kembali</router-link
                      >
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  </Form>
</template>
