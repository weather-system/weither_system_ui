<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const form = ref(null);
const lubangSampling = ref('');

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
  kedalaman_lubang_sampling: yup.number(),
  satuan_kedalaman_lubang_sampling: yup.string(),
  stage: yup.string().required(),
  jenis_bahan_bakar: yup.string().required(),
});

const setValues = (data) => {
  form.value.setValues(data);
};

defineExpose({ setValues });
</script>

<template>

  <Form ref="form" :validation-schema="schema">
    <MainWrapper>
      <div class="page-wrapper page-settings">
        <div class="content">
          <div class="row">
            <div class="col-lg-10 mx-auto">
              <div class="content-page-header mb-2">
                <h3>Edit Persetujuan Teknis Boiler</h3>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Jenis Boiler</label>
                    <Field name="jenis_boiler" class="form-control" />
                    <ErrorMessage name="jenis_boiler" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Jumlah Boiler</label>
                    <Field name="jumlah_boiler" class="form-control" type="number" />
                    <ErrorMessage name="jumlah_boiler" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Merk Boiler</label>
                    <Field name="merk_boiler" class="form-control" />
                    <ErrorMessage name="merk_boiler" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Tinggi Cerobong</label>
                    <Field name="tinggi_cerobong" class="form-control" type="number" />
                    <ErrorMessage name="tinggi_cerobong" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Satuan Tinggi Cerobong</label>
                    <Field name="satuan_tinggi_cerobong" class="form-control" />
                    <ErrorMessage name="satuan_tinggi_cerobong" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Diameter Cerobong</label>
                    <Field name="diameter_cerbong" class="form-control" type="number" />
                    <ErrorMessage name="diameter_cerbong" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Satuan Diameter Cerobong</label>
                    <Field name="satuan_diameter_cerobong" class="form-control" />
                    <ErrorMessage name="satuan_diameter_cerobong" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Kapasitas Boiler</label>
                    <Field name="kapasitas_boiler" class="form-control" type="number" />
                    <ErrorMessage name="kapasitas_boiler" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="col-form-label">Satuan Kapasitas Boiler</label>
                    <Field name="satuan_kapasitas_boiler" class="form-control" type="text" />
                    <ErrorMessage name="satuan_kapasitas_boiler" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Koordinat X</label>
                    <Field name="koordinat_x" class="form-control" type="number" />
                    <ErrorMessage name="koordinat_x" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Koordinat Y</label>
                    <Field name="koordinat_y" class="form-control" type="text" />
                    <ErrorMessage name="koordinat_y" />
                  </div>
                </div>
                </div>


        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-form-label">Pengendalian Emisi Cerobong</label>
              <Field name="pengendalian_emisi_cerobong" as="select" class="form-control">
                <option value="">Pilih</option>
                <option value="Filter Udara">Filter Udara</option>
                <option value="Pengendap Silikon">Pengendap Silikon</option>
                <option value="Filter Basah">Filter Basah</option>
                <option value="Pengendap Sistem Gravitasi">Pengendap Sistem Gravitasi</option>
                <option value="Pengendap Elektrostatik">Pengendap Elektrostatik</option>
              </Field>
              <ErrorMessage name="pengendalian_emisi_cerobong" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-form-label">Lubang Sampling</label>
              <Field name="lubang_sampling" as="select" class="form-control" v-model="lubangSampling">
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
              <label class="col-form-label">Kedalaman Lubang Sampling</label>
              <Field name="kedalaman_lubang_sampling" class="form-control" type="number" />
              <ErrorMessage name="kedalaman_lubang_sampling" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-form-label">Satuan Kedalaman Lubang Sampling</label>
              <Field name="satuan_kedalaman_lubang_sampling" class="form-control" />
              <ErrorMessage name="satuan_kedalaman_lubang_sampling" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">e
              <label class="col-form-label">Tangga Cerobong/Stage</label>
              <Field name="stage" class="form-control">
              </Field>
              <ErrorMessage name="stage" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-form-label">Jenis Bahan Bakar</label>
              <Field name="jenis_bahan_bakar" as="select" class="form-control">
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
        </div>

        <div class="mt-4">
          <button class="btn btn-primary">Simpan</button>
        </div>
      </div>
      </div>
      </div>
      </div>
    </MainWrapper>
  </Form>
</template>
