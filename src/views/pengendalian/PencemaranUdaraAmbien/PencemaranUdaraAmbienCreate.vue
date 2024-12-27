<script setup>
import { ref, computed, reactive } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useLoading } from 'vue-loading-overlay'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { createPencemaranUdaraAmbien } from '@/lib/pencemaranUdara.js'
import { uploadFile } from '@/lib/filestorage.js'
import MainWrapper from '@/components/MainWrapper.vue'
import PencemaranUdaraAmbienForm from '@/components/PencemaranUdaraAmbienForm.vue'
import Swal from 'sweetalert2'
const $loading = useLoading()
const store = useStore()
const router = useRouter()

const document = reactive({})

const uploadedDocument = (data) => {
  document[data.key] = data.url
}

const submit = async payload => {
  const loader = $loading.show()

  payload = {
    ...payload,
    ...document,
  }
  delete payload.titik_uji.referensi_baku_mutu_id
  try {
    const data = await createPencemaranUdaraAmbien(payload)
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data Pencemaran Berhasil dibuat!',
      });
    router.push('/Pengendalian/PencemaranUdara?sidebar=PencemaranUdara')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <div>
            <h4>
              Form Pemantauan Pencemaran Udara Ambien ({{
                store.state.auth.user.company?.name
              }})
            </h4>
          </div>
        </div>

        <PencemaranUdaraAmbienForm @submit="submit" @uploaded-document="uploadedDocument" />
      </div>
    </div>
  </MainWrapper>
</template>
