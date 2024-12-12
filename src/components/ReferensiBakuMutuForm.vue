<script setup>
import { ref, reactive } from 'vue'
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'
import { useLoading } from 'vue-loading-overlay'
import * as yup from 'yup'
import Swal from 'sweetalert2'
import BakuMutuUdaraEmisiForm from '@/components/BakuMutuUdaraEmisiForm.vue'
import { deleteReferensiBakuMutuDetail } from '@/lib/referensiBakuMutu.js'

const props = defineProps(['isEdit'])

const $loading = useLoading()

const form = ref(null)
const formData = reactive({})

const defaultValues = {
  details: [{}],
  details1: [{}],
  details2: [{}],
  details3: [{}],
  details4: [{}],
  details5: [{}],
  details6: [{}],
}

const schema = yup.object({
  jenis: yup.string().required(),
  referensi: yup.string().required(),
})

const deleteDetail = async (cb, i, data) => {
  if (data.id) {
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
        await deleteReferensiBakuMutuDetail(data.id)
        Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
      } catch (e) {
        console.error(e)
      } finally {
        loader.hide()
        cb(i)
      }
    }
  } else {
    cb(i)
  }
}

const setValues = data => {
  form.value.setValues(data)

  if (data.jenis == 'Kebisingan') {
    formData.jenis_kebisingan = data.jenis_kebisingan
    formData.jenis_kebisingan_detail = data.jenis_kebisingan_detail
  }
}

defineExpose({ setValues })
</script>

<template>
  <Form ref="form" :validation-schema="schema" :initial-values="defaultValues">
    <div class="row">
      <div class="col-6">
        <label class="form-label">Jenis</label>
        <Field
          v-model="formData.jenis"
          name="jenis"
          class="form-control"
          as="select"
          :disabled="props.isEdit"
        >
          <option value="">Pilih</option>
          <option value="Udara Ambien">Udara Ambien</option>
          <option value="Udara Emisi">Udara Emisi</option>
          <option value="Kebisingan">Kebisingan</option>
          <option value="Limbah Domestik Tersendiri">
            Limbah Domestik Tersendiri
          </option>
        </Field>
        <ErrorMessage name="jenis" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-6">
        <label class="form-label">Referensi</label>
        <Field name="referensi" class="form-control" />
        <ErrorMessage name="referensi" />
      </div>
    </div>

    <div class="row mt-2" v-if="formData.jenis == 'Udara Ambien'">
      <div class="col-6">
        <label class="form-label">Waktu Pengukuran</label>
        <Field name="waktu_pengukuran" class="form-control" as="select">
          <option value="">Pilih</option>
          <option value="1 Jam">1 Jam</option>
          <option value="3 Jam">3 Jam</option>
          <option value="8 Jam">8 Jam</option>
          <option value="24 Jam">24 Jam</option>
          <option value="1 Hari">1 Hari</option>
        </Field>
        <ErrorMessage name="waktu_pengukuran" />
      </div>
    </div>

    <!-- <div class="row mt-2" v-if="formData.jenis == 'Udara Emisi'">
      <div class="col-6">
        <label class="form-label">Bahan Bakar</label>
        <Field name="bahan_bakar" class="form-control" as="select">
          <option value="">Pilih</option>
          <option value="Biomassa berupa serabut dan/atau Cangkang">
            Biomassa berupa serabut dan/atau Cangkang
          </option>
          <option value="Biomassa berupa ampas dan/atau daun tebu kering">
            Biomassa berupa ampas dan/atau daun tebu kering
          </option>
          <option value="Biomassa selain poin 1 & 2">
            Biomassa selain poin 1 & 2
          </option>
          <option value="Batu Bara">Batu Bara</option>
          <option value="Minyak">Minyak</option>
          <option value="Gas">Gas</option>
          <option value="Gabungan">Gabungan</option>
        </Field>
        <ErrorMessage name="bahan_bakar" />
      </div>
    </div> -->

    <div class="row mt-2" v-if="formData.jenis == 'Kebisingan'">
      <div class="col-3">
        <label class="form-label">Jenis Kebisingan</label>
        <Field
          v-model="formData.jenis_kebisingan"
          name="jenis_kebisingan"
          class="form-control"
          as="select"
        >
          <option value="">Pilih</option>
          <option value="Peruntukan Kawasan">Peruntukan Kawasan</option>
          <option value="Lingkungan Kegiatan">Lingkungan Kegiatan</option>
        </Field>
        <ErrorMessage name="jenis_kebisingan" />
      </div>
      <div class="col-3" v-if="formData.jenis_kebisingan">
        <label class="form-label">Detail</label>
        <Field name="jenis_kebisingan_detail" class="form-control" as="select">
          <option value="">Pilih</option>
          <template v-if="formData.jenis_kebisingan == 'Peruntukan Kawasan'">
            <option value="Perumahan & Pemukiman">Perumahan & Pemukiman</option>
            <option value="Perdagangan & Jasa">Perdagangan & Jasa</option>
            <option value="Perkantoran & Perdagangan">
              Perkantoran & Perdagangan
            </option>
            <option value="Ruang Terbuka Hijau">Ruang Terbuka Hijau</option>
            <option value="Industri">Industri</option>
            <option value="Pemerintahan & Fasilitas Umum">
              Pemerintahan & Fasilitas Umum
            </option>
            <option value="Stasiun Kereta">Stasiun Kereta</option>
          </template>
          <template v-if="formData.jenis_kebisingan == 'Lingkungan Kegiatan'">
            <option value="Rumah Sakit atau sejenisnya">
              Rumah Sakit atau sejenisnya
            </option>
            <option value="Sekolah atau sejenisnya">
              Sekolah atau sejenisnya
            </option>
            <option value="Tempat ibadah atau sejenisnya">
              Tempat ibadah atau sejenisnya
            </option>
          </template>
        </Field>
        <ErrorMessage name="jenis_kebisingan_detail" />
      </div>
    </div>

    <div v-if="formData.jenis">
      <div class="table-resposnive table-div">
        <p v-if="formData.jenis == 'Udara Emisi'">
          Bahan Bakar: Biomassa berupa serabut dan/atau Cangkang
        </p>
        <FieldArray name="details" v-slot="{ fields, push, remove }">
          <table class="table datatable">
            <thead>
              <tr>
                <th>No</th>
                <th
                  v-if="
                    [
                      'Udara Emisi',
                      'Udara Ambien',
                      'Limbah Domestik Tersendiri',
                    ].includes(formData.jenis)
                  "
                >
                  Parameter
                </th>
                <th v-if="formData.jenis == 'Kebisingan'">
                  Tingkat Kebisingan (dbA)
                </th>
                <th
                  v-if="
                    ['Udara Emisi', 'Limbah Domestik Tersendiri'].includes(
                      formData.jenis,
                    )
                  "
                >
                  Satuan
                </th>
                <th
                  v-if="
                    ['Udara Emisi', 'Udara Ambien'].includes(formData.jenis)
                  "
                >
                  Baku Mutu
                </th>
                <th v-if="formData.jenis == 'Udara Ambien'">
                  Sistem Pengukuran
                </th>
                <th v-if="formData.jenis == 'Limbah Domestik Tersendiri'">
                  Kadar Maksimum
                </th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(field, i) in fields" :key="field.key">
                <td>{{ i + 1 }}</td>
                <td
                  v-if="
                    [
                      'Udara Emisi',
                      'Udara Ambien',
                      'Limbah Domestik Tersendiri',
                    ].includes(formData.jenis)
                  "
                >
                  <Field
                    :name="`details[${i}].parameter`"
                    class="form-control"
                  />
                  <ErrorMessage :name="`details[${i}].parameter`" />
                </td>
                <td v-if="formData.jenis == 'Kebisingan'">
                  <Field
                    :name="`details[${i}].tingkat_kebisingan`"
                    class="form-control"
                    type="number"
                  />
                  <ErrorMessage :name="`details[${i}].tingkat_kebisingan`" />
                </td>
                <td
                  v-if="
                    ['Udara Emisi', 'Limbah Domestik Tersendiri'].includes(
                      formData.jenis,
                    )
                  "
                >
                  <Field :name="`details[${i}].satuan`" class="form-control" />
                  <ErrorMessage :name="`details[${i}].satuan`" />
                </td>
                <td
                  v-if="
                    ['Udara Emisi', 'Udara Ambien'].includes(formData.jenis)
                  "
                >
                  <Field
                    :name="`details[${i}].baku_mutu`"
                    class="form-control"
                    type="number"
                  />
                  <ErrorMessage :name="`details[${i}].baku_mutu`" />
                </td>
                <td v-if="formData.jenis == 'Udara Emisi'" class="d-none">
                  <Field
                    :name="`details[${i}].bahan_bakar`"
                    class="form-control"
                    value="Biomassa berupa serabut dan/atau Cangkang"
                  />
                  <ErrorMessage :name="`details[${i}].baku_mutu`" />
                </td>
                <td v-if="formData.jenis == 'Udara Ambien'">
                  <Field
                    :name="`details[${i}].sistem_pengukuran`"
                    class="form-control"
                    as="select"
                  >
                    <option value="">Pilih</option>
                    <option value="Aktif Manual">Aktif Manual</option>
                    <option value="Aktif Kontinu">Aktif Kontinu</option>
                  </Field>
                  <ErrorMessage :name="`details[${i}].sistem_pengukuran`" />
                </td>
                <td v-if="formData.jenis == 'Limbah Domestik Tersendiri'">
                  <Field
                    :name="`details[${i}].kadar_maksimum`"
                    class="form-control"
                    type="number"
                  />
                  <ErrorMessage :name="`details[${i}].kadar_maksimum`" />
                </td>
                <td>
                  <button
                    @click="deleteDetail(remove, i, field.value)"
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
              @click="
                formData.jenis == 'Udara Emisi'
                  ? push({
                      bahan_bakar: 'Biomassa berupa serabut dan/atau Cangkang',
                    })
                  : push({})
              "
              type="button"
              class="btn btn-success"
            >
              Tambah
            </button>
          </div>
        </FieldArray>
      </div>
    </div>

    <div v-if="formData.jenis == 'Udara Emisi'">
      <BakuMutuUdaraEmisiForm
        name="details1"
        :delete-detail="deleteDetail"
        bahan-bakar="Biomassa berupa ampas dan/atau daun tebu kering"
      />
      <BakuMutuUdaraEmisiForm
        name="details2"
        :delete-detail="deleteDetail"
        bahan-bakar="Biomassa selain poin 1 & 2"
      />
      <BakuMutuUdaraEmisiForm
        name="details3"
        :delete-detail="deleteDetail"
        bahan-bakar="Batu Bara"
      />
      <BakuMutuUdaraEmisiForm
        name="details4"
        :delete-detail="deleteDetail"
        bahan-bakar="Minyak"
      />
      <BakuMutuUdaraEmisiForm
        name="details5"
        :delete-detail="deleteDetail"
        bahan-bakar="Gas"
      />
      <BakuMutuUdaraEmisiForm
        name="details6"
        :delete-detail="deleteDetail"
        bahan-bakar="Gabungan"
      />
    </div>

    <div class="mt-4">
      <button class="btn btn-primary">Simpan</button>
    </div>
  </Form>
</template>
