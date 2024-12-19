<script setup>
import { ref, reactive, onMounted, computed  } from 'vue'
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'
import { useLoading } from 'vue-loading-overlay'
import * as yup from 'yup'
import { getJenisLimbah } from '@/lib/tpslimbahb3.js'

const props = defineProps({
  initialValues: Object,
  jenis: String 
});
const emit = defineEmits('uploaded-document')
const $loading = useLoading()
const form = ref(null)
const jenisLb3Options = ref([])
const jenisData = computed(() => props.jenis)
const initialData = ref({
    jenis: props.jenis
})
const schema = yup.object({
    jenis_lb3: yup.string().required(),
    jumlah: yup.number().nullable(),
    tgl_input: yup.string().nullable(),
    satuan: yup.string().nullable(),
    satuan_output: yup.string().nullable(),
    tujuan_penyerahan: yup.string().nullable(),
    bukti_nomer_dokumen: yup.string().nullable(),
    pengangkut: yup.string().nullable(),
})

const loadJenisLimbah = async () => {
  const loader = $loading.show()
  try {
    jenisLb3Options.value = await getJenisLimbah()
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const setValues = (data) => {
  form.value.setValues(data)
}

defineExpose({ setValues })

onMounted(async () => {
  await loadJenisLimbah()
})
</script>

<template>
    <Form
    ref="form"
    :validation-schema="schema"
    :initial-values="initialData"
    @invalid-submit="console.log"
  >
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="jenis-limbah" class="form-label">Jenis Limbah B3</label>
                <Field
                    name="jenis_lb3"
                    class="form-control"
                    as="select"
                >
                  <option value="" disabled>Pilih Jenis Limbah B3</option>
                  <option v-for="(jenis,index) in jenisLb3Options" :key="jenis.jenis" :value="jenis.jenis">
                    {{ index + 1 }}, {{ jenis.jenis }}
                  </option>
                </Field>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="tanggal" class="form-label">Tanggal {{ jenis }}</label>
                <Field name="tgl_input" class="form-control" type="date" />
                <ErrorMessage name="tgl_input" />
              </div>
            </div>
            <!-- <div class="col-md-4" v-if="jenisData === 'Limbah Keluar'"> -->
          </div>

          <div class="row">
            <div class="col-md-5">
              <div class="form-group">
                <div>
                  <label for="jumlah" class="form-label">Jumlah {{  jenis }}</label>
                  <Field type="number" name="jumlah" class="form-control" />
                  <ErrorMessage name="tahun" />
                </div>
              </div>
            </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="satuan" class="form-label">Satuan</label>
                  <Field name="satuan" class="form-control" />
                  <ErrorMessage name="satuan" />
                </div>
              </div>
          </div>
          <div v-if="jenisData === 'Limbah Keluar'">
            <div class="row">
                <div class="col-md-8">
                    <div class="form-group">
                        <label for="satuan" class="form-label">Tujuan Penyerahan</label>
                        <Field name="tujuan_penyerahan" class="form-control" />
                        <ErrorMessage name="tujuan_penyerahan" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="form-group">
                        <label for="satuan" class="form-label">Bukti Nomor Document</label>
                        <Field name="bukti_nomer_dokumen" class="form-control" />
                        <ErrorMessage name="bukti_nomer_dokumen" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="form-group">
                        <label for="satuan" class="form-label">Pengangkut</label>
                        <Field name="pengangkut" class="form-control" />
                        <ErrorMessage name="pengangkut" />
                    </div>
                </div>
            </div>
          </div>

          <div class="mt-4">
            <button class="btn btn-primary ">
              Simpan
            </button>
            <router-link to="/logbook/TPSLimbahB3?sidebar=logbooklb3" class="btn btn-secondary m-2"
                >Kembali</router-link
              >
          </div>
        </Form>
</template>
