import axios from 'axios'

export const parameters = [
  {
    name: 'Temperatur Udara Sekitar',
    satuan: 'C',
    field: 'temp_udara',
  },
  {
    name: 'BOD',
    satuan: 'mg/L',
    field: 'bod',
  },
  {
    name: 'COD',
    satuan: 'mg/L',
    field: 'cod',
  },
  {
    name: 'TSS',
    satuan: 'mg/L',
    field: 'tss',
  },
  {
    name: 'Fenol Total',
    satuan: 'mg/L',
    field: 'fenol_total',
  },
  {
    name: 'Krom Total',
    satuan: 'mg/L',
    field: 'krom_total',
  },
  {
    name: 'Amonia Total',
    satuan: 'mg/L',
    field: 'amonia_total',
  },
  {
    name: 'Sulfida',
    satuan: 'mg/L',
    field: 'sulfida',
  },
  {
    name: 'Minyak dan Lemak',
    satuan: 'mg/L',
    field: 'minyak_dan_lemak',
  },
  {
    name: 'Warna',
    satuan: 'Pt-Co',
    field: 'warna',
  },
  {
    name: 'pH',
    satuan: '',
    field: 'ph',
  },
  {
    name: 'Temperatur Air',
    satuan: 'K',
    field: 'temp_air',
  },
]

export const createPencemaranAir = async data => {
  const resp = await axios.post('/api/pencemaranAir', data)
  return resp.data
}

export const getPencemaranAir = async () => {
  const resp = await axios.get('/api/pencemaranAir')
  return resp.data
}

export const getPencemaranAirDetail = async (id) => {
  const resp = await axios.get(`/api/pencemaranAir/${id}`)
  return resp.data
}

export const updatePencemaranAir = async (id, data) => {
  const resp = await axios.put(`/api/pencemaranAir/${id}`, data)
  return resp.data
}

export const deletePencemaranAir = async (id) => {
  const resp = await axios.delete(`/api/pencemaranAir/${id}`)
  return resp.data
}

export const getPencemaranAirVerifikator = async (params) => {
  const resp = await axios.get('/api/pencemaran-airs/verifikator', {
    params,
  })
  return resp.data
}

export const verifikasiPencemaranAir = async (id, data) => {
  const resp = await axios.put(`/api/pencemaran-airs/verifikator/${id}`, data)
  return resp.data
}

export const getStatusPertek = async () => {
  const resp = await axios.get(`/api/statusespertek`)
  return resp.data
}