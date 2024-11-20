import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api/pengelolaan-limbah-b3',
  headers: {
    'Content-Type': 'application/json',
  },
})


export const parameters = [
  {
    name: 'Company Detail ID',
    field: 'company_detail_id',
  },
  {
    name: 'Triwulan',
    field: 'triwulan',
  },
  {
    name: 'Tahun',
    field: 'tahun',
  },
  {
    name: 'File Upload',
    field: 'file_upload',
  },
  {
    name: 'Status',
    field: 'status',
  },
]

export const getPengelolaanLimbahB3 = async () => {
  try {
    const response = await apiClient.get('/')
    return response.data
  } catch (error) {
    console.error('Gagal mengambil data:', error)
    throw error
  }
}


export const getPengelolaanLimbahB3Detail = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`)
    return response.data
  } catch (error) {
    console.error(`Gagal mengambil detail data dengan ID ${id}:`, error)
    throw error
  }
}


export const createPengelolaanLimbahB3 = async (formData) => {
  try {
    const response = await apiClient.post('/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  } catch (error) {
    console.error('Gagal membuat data:', error)
    throw error
  }
}


export const updatePengelolaanLimbahB3 = async (id, formData) => {
  try {
    const response = await apiClient.put(`/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  } catch (error) {
    console.error(`Gagal memperbarui data dengan ID ${id}:`, error)
    throw error
  }
}

export const deletePengelolaanLimbahB3 = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`)
    return response.data
  } catch (error) {
    console.error(`Gagal menghapus data dengan ID ${id}:`, error)
    throw error
  }
}
