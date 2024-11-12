<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import moment from 'moment'
import MainWrapper from '@/components/MainWrapper.vue'
import { getUsers, deleteUser } from '@/lib/user.js'

const $loading = useLoading()

const users = ref([])

const deleteData = async (id) => {
  const loader = $loading.show()
  try {
    await deleteUser(id)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

onMounted(async () => {
  const loader = $loading.show()
  try {
    users.value = await getUsers()
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
        <div class="content-page-header content-page-headersplit">
          <h5>Data User</h5>
          <div class="list-btn">
            <ul>
              <li>
                <RouterLink class="btn btn-primary" to="/Master/User/Create"
                  ><i class="fa fa-plus me-2"></i>Tambah User
                </RouterLink>
              </li>
            </ul>
          </div>

        </div>
<div class="row">
          <div class="col-12">
            <div class="table-resposnive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Perusahaan</th>
                    <th>Dibuat Tanggal</th>
                    <th>Diubah Tanggal</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>{{ user.company?.name }}</td>
                    <td>{{ moment(user.created_at).format('DD MMMM YYYY') }}</td>
                    <td>{{ moment(user.updated_at).format('DD MMMM YYYY') }}</td>
                    <td>
                      <router-link
                        :to="`/Master/User/${user.id}`"
                        class="btn btn-primary"
                        >Edit</router-link
                      >
                      <button
                        class="btn btn-danger m-2"
                        @click="deleteData(user.id)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
