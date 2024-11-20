<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'
import CompanyForm from '@/components/CompanyForm.vue'
import { getCompany } from '@/lib/company.js'

const $loading = useLoading()
const route = useRoute()

const company = ref(null)

onMounted(async () => {
  const loader = $loading.show()
  try {
    company.value = await getCompany(route.params.id)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header mb-2">
          <h3>Edit Perusahaan</h3>
        </div>

        <CompanyForm v-if="company" :is-edit="true" :company="company" />
      </div>
    </div>
  </MainWrapper>
</template>
