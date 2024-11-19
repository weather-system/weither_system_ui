<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RegisterCompanyForm from '@/components/RegisterCompanyForm.vue'
import CompanyDetailForm from '@/components/CompanyDetailForm.vue'

const props = defineProps(['company', 'isEdit'])

const route = useRoute()
const router = useRouter()

const showCompanyDetailForm = ref(false)

const onCreatedCompany = (data) => {
  router.push({
    path: '/Master/Companies/Create',
    query: {
      company_id: data.id
    }
  })
}

watch(() => route.query.company_id, (latest, _) => {
  if (latest) {
    showCompanyDetailForm.value = true
  }
}, {
  immediate: true
})
</script>

<template>
  <RegisterCompanyForm v-if="!showCompanyDetailForm" :is-admin="true" :is-edit="props.isEdit" :company="props.company" @created="onCreatedCompany" />
  <CompanyDetailForm v-if="props.isEdit || showCompanyDetailForm" :is-admin="true" :company-id="route.query.company_id" />
</template>
