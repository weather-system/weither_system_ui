<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'
import Swal from 'sweetalert2'
import html2pdf from 'html2pdf.js'
import { useStore } from 'vuex'
import { getPencemaranUdara, deletePencemaranUdara, getStatusPertek } from '@/lib/pencemaranUdara.js'

const pencemaranUdara = ref([])
const statuspertek = ref([])
const store = useStore()
const isUserCerobongPending = ref(false)
function cetakPDF() {
  const element = document.getElementById('pdfContent')
  const options = {
    margin: 10,
    filename: 'Pencemaran_Udara.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  }
  element.style.display = 'block'

  html2pdf()
    .set(options)
    .from(element)
    .output('blob')
    .then(pdfBlob => {
      const pdfURL = URL.createObjectURL(pdfBlob)
      window.open(pdfURL, '_blank')
    })
    .finally(() => {
      element.style.display = 'none'
    })
}
const fetchData = async () => {
  const loader = $loading.show()
  try {
    pencemaranUdara.value = await getPencemaranUdara()
  } catch (e) {
    console.error('Error fetching data:', e)
    Swal.fire('Error', 'Gagal mengambil data pencemaran air.', 'error')
  } finally {
    loader.hide()
  }
}
const $loading = useLoading()
const deleteData = async id => {
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
      await deletePencemaranUdara(id)
      await fetchData()
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
    } catch (e) {
      console.error(e)
    } finally {
      loader.hide()
    }
  }
}

onMounted(async () => {
  const loader = $loading.show()
  try {
    statuspertek.value = await getStatusPertek()
    if (statuspertek.value?.company_cerobongs?.includes('PENDING')) {
      isUserCerobongPending.value = true
    }
    if (isUserCerobongPending.value) {
    Swal.fire({
      title: 'Warning!',
      text: 'Pertek IPAL Anda Statusnya Pending.',
      icon: 'warning',
    });
  }

    pencemaranUdara.value = await getPencemaranUdara()
  } catch (e) {
    console.error('Error fetching data:', e)
    Swal.fire('Error', 'Gagal mengambil data pencemaran air.', 'error')
  } finally {
    loader.hide()
  }
})
</script>

<template>
  <MainWrapper>
    <div class="" v-if="isUserCerobongPending">
    </div>
    <div class="page-wrapper page-settings" v-if="!isUserCerobongPending">
      <div class="content">
        <div
          class="content-page-header"
        >
          <h4>
            Pemantauan Pencemaran Air ({{
              store.state.auth.user.company?.name
            }})
          </h4>
        </div>
        <div class="row">
            <div class="d-flex align-items-center gap-2">
              <RouterLink
                class="btn btn-primary"
                to="/Pengendalian/PencemaranUdara/TambahUdaraAmbien"
              >
                Tambah Pemantauan Udara Ambien
              </RouterLink>
              <RouterLink
                class="btn btn-primary"
                to="/Pengendalian/PencemaranUdara/TambahUdaraEmisi"
              >
                Tambah Pemantauan Udara Emisi
              </RouterLink>
              <!-- <RouterLink
                class="btn btn-primary"
                to="/Pengendalian/PencemaranUdara/TambahFlyAshBottomAshDanSludge"
              >
                Tambah Fly Ash, Bottom Ash, dan Sludge
              </RouterLink> -->
            </div>
          </div>

        <div class="row mt-1">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Laporan Bulan</th>
                    <th>Tanggal Pengujian</th>
                    <th>Jenis</th>
                    <th>Laboratorium Penguji</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="pencemaranUdara.length === 0">
                    <td colspan="7" class="text-center">Data Tidak Ada</td>
                  </tr>
                  <tr
                    v-for="(item, index) in pencemaranUdara"
                    :key="item.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.bulan }}</td>
                    <td>{{ item.tanggal_uji }}</td>
                    <td>{{ item.jenis }}</td>
                    <td>{{ item.lab_penguji }}</td>
                    <td>{{ item.status }}</td>
                    <td>
                      <!-- Action buttons -->
                      <!-- <button
                        class="btn btn-primary"
                        v-if="item.status == 'Verifikasi LH'"
                        @click="cetakPDF"
                      >
                        Cetak
                      </button> -->
                      <RouterLink
                        v-if="item.status != 'Verifikasi LH'"
                        :to="{
                          path: '/Pengendalian/PencemaranUdara/EditUdaraEmisi/',
                          query: { id: item.id },
                        }"
                        class="btn btn-primary m-2"
                      >
                        Edit
                      </RouterLink>
                      <button
                        class="btn btn-primary m-2"
                        @click="deleteData(item.id)"
                        v-if="item.status != 'Verifikasi LH'"
                      >
                        Hapus
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
  <div
    id="pdfContent"
    class="pdf-template"
    style="display: none; padding: 20px"
  >
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      "
    >
      <img
        src="@/assets/img/cimahii.png"
        alt="Logo Kota Cimahi"
        style="width: 120px; height: auto; margin-right: 20px"
      />
      <div style="line-height: 1.2; text-align: center; flex-grow: 1">
        <h5 style="margin: 0; font-weight: bold">
          PEMERINTAH DAERAH KOTA CIMAHI
        </h5>
        <h4 style="margin: 0; font-weight: bold">DINAS LINGKUNGAN HIDUP</h4>
        <p style="margin: 2px 0; font-weight: bold">
          Jalan Rd. Demang Hardjakusumah Nomor 3, Kelurahan Cibabat,
        </p>
        <p style="margin: 2px 0; font-weight: bold">
          Kecamatan Cimahi, Kota Cimahi, Provinsi Jawa Barat 40513,
        </p>
        <p style="margin: 2px 0; font-weight: bold">
          Telepon / Fax: (022) 6654274
        </p>
        <p style="margin: 2px 0; font-weight: bold">
          Laman www.cimahikota.go.id, Pos-el setda@cimahikota.go.id
        </p>
      </div>
      <img
        src="@/assets/img/dlh2.png"
        alt="Logo DLH"
        style="width: 110px; height: auto; margin-left: 20px"
      />
    </div>
    <hr />
    <div style="padding: 20px;">
  <h5 style="text-align: center; font-weight: bold; padding-bottom: 40px;">
    TANDA TERIMA LAPORAN ELEKTRONIK
  </h5>
  <ul>
    <li><strong>Perusahaan:</strong> {{  }}</li>
    <li><strong>ID Perusahaan:</strong> {{  }}</li>
    <li><strong>Alamat:</strong> {{  }}</li>
    <li><strong>Bulan:</strong> {{  }}</li>
    <li><strong>Tanggal Cetak:</strong> {{  }}</li>
    <li><strong>Jenis Laporan:</strong> {{  }}</li>
  </ul>
  <div style="display: flex; justify-content: space-between; margin-top: 40px;">
    <div style="width: 45%; display: flex; justify-content: flex-start; align-items: flex-end;">
      <img src="@/assets/img/man.png" alt="QR Code" style="width: 100px; height: auto; margin-bottom: 10px;" />
    </div>
    <div style="width: 87%; display: flex; justify-content: flex-end; align-items: flex-end;">
      <p style="margin-bottom: 10px;">
        Tanda Terima Elektronik (TTE) ini sah, diterbitkan secara elektronik melalui
        Sistem Informasi Lingkungan Dinas Lingkungan Hidup Kota Cimahi sehingga
        tidak memerlukan cap dan tanda tangan basah.
      </p>
    </div>
  </div>
</div>

  </div>
</template>

<style scoped>
.content-page-headersplit {
  display: flex;
  align-items: center;
}
</style>
