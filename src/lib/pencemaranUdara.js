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

export const createPencemaranUdara = async data => {
  const resp = await axios.post('/api/pencemaran-udaras', data)
  return resp.data
}

export const getPencemaranUdara = async () => {
  const resp = await axios.get('/api/pencemaran-udaras')
  return resp.data
}

export const updatePencemaranUdara = async (id, data) => {
  const resp = await axios.put(`/api/pencemaran-udaras/${id}`, data)
  return resp.data
}

export const deletePencemaranUdara = async (id) => {
  const resp = await axios.delete(`/api/pencemaran-udaras/${id}`)
  return resp.data
}
export const getStatusPertek = async () => {
  const resp = await axios.get(`/api/statusespertek`)
  return resp.data
}

export const createPencemaranUdaraAmbien = async data => {
  const resp = await axios.post('/api/pencemaran-udara/ambien', data)
  return resp.data
}

export const getPencemaranUdaraAmbienDetail = async (id) => {
  const resp = await axios.get(`/api/pencemaran-udara/ambien/${id}`)
  return resp.data
}

export const updatePencemaranUdaraAmbien = async (id, data) => {
  const resp = await axios.put(`/api/pencemaran-udara/ambien/${id}`, data)
  return resp.data
}