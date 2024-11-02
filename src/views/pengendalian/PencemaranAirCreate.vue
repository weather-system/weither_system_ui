<script setup>
import { ref, computed, reactive } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useLoading } from 'vue-loading-overlay'
import { useStore } from 'vuex'
import * as yup from 'yup'
import { createPencemaranAir, parameters } from '@/lib/pencemaranAir.js'
import { uploadFile } from '@/lib/filestorage.js'
import MainWrapper from '@/components/MainWrapper.vue'
import PencemaranAirForm from '@/components/PencemaranAirForm.vue'

const $loading = useLoading()
const store = useStore()

const initialValues = parameters.reduce((v, parameter) => {
    const key = `${parameter.field}_expr`
    return {
      ...v,
      [key]: '=',
    }
  }, {})

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

  try {
    const data = await createPencemaranAir(payload)
    console.log(data)
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
            <h5>
              Form Swapantau Pengendalian Pencemaran Air ({{
                store.state.auth.user.company?.name
              }})
            </h5>
            <p>Usaha dan/atau Kegiatan : Industri Tekstil (Q<=100 m3/hari)</p>
          </div>
        </div>

        <PencemaranAirForm @submit="submit" :initial-values="initialValues" @uploaded-document="uploadedDocument" />
      </div>
    </div>
  </MainWrapper>
</template>
