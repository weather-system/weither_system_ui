import axios from 'axios'

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


export const createPengelolaanLimbahB3 = async data => {
  const resp = await axios.post('/api/pengelolaan-limbah-b3', data)
  return resp.data
}

export const getPengelolaanLimbahB3 = async () => {
  const resp = await axios.get('/api/pengelolaan-limbah-b3')
  return resp.data
}

export const getPengelolaanLimbahB3Detail = async (id) => {
  const resp = await axios.get(`/api/pengelolaan-limbah-b3/${id}`)
  return resp.data
}

export const updatePengelolaanLimbahB3 = async (id, data) => {
  const resp = await axios.put(`/api/pengelolaan-limbah-b3/${id}`, data)
  return resp.data
}

export const deletePengelolaanLimbahB3 = async (id) => {
  const resp = await axios.delete(`/api/pengelolaan-limbah-b3/${id}`)
  return resp.data
}
