import { ref, onMounted, reactive } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { getCompanies } from '@/lib/company.js'

export const usePemantauanFilter = () => {
  const $loading = useLoading()

  const years = ref([])
  const months = ref(null)
  const companies = ref([])

  const filterParams = reactive({
    month: '',
    year: '',
    company_id: '',
    search_query: ''
  })

  const loadYears = () => {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2000; year--) {
      years.value.push(year);
    }
  }

  const loadMonths = () => {
    months.value = {
      1: "Januari",
      2: "Februari",
      3: "Maret",
      4: "April",
      5: "Mei",
      6: "Juni",
      7: "Juli",
      8: "Agustus",
      9: "September",
      10: "Oktober",
      11: "November",
      12: "Desember"
    }
  }

  const loadCompanies = async () => {
    const loader = $loading.show()
    try {
      companies.value = await getCompanies()
    } catch (e) {
      console.error(e)
    } finally {
      loader.hide()
    }
  }

  onMounted(async () => {
    loadYears()
    loadMonths()
    await loadCompanies()
  })

  return { years, months, companies, filterParams }
}
