import axios from 'axios'

export const getPencemaranUdaraVerifikator = async (jenis, params) => {
  const resp = await axios.get('/api/pencemaran-udaras/verifikator', {
    params: {
      jenis,
      ...params
    }
  })
  return resp.data
}

export const getPencemaranUdaraDetail = async (id) => {
  const resp = await axios.get(`/api/pencemaran-udaras/${id}`)
  return resp.data
}

export const verifikasiPencemaranUdara = async (id, data) => {
  const resp = await axios.put(`/api/pencemaran-udaras/verifikator/${id}`, data)
  return resp.data
}

