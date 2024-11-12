<script setup>
import { useRouter } from 'vue-router';
import { useLoading } from 'vue-loading-overlay';
import MainWrapper from '@/components/MainWrapper.vue'
import UserForm from '@/components/UserForm.vue'
import { createUser } from '@/lib/user.js'

const $loading = useLoading()
const router = useRouter()

const submit = async (data) => {
  const loader = $loading.show()
  try {
    await createUser(data)
    router.push('/Master/User')
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
        <div class="content-page-header mb-2">
          <h3>Tambah User</h3>
        </div>

        <UserForm @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
