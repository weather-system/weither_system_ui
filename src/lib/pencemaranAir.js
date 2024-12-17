import axios from 'axios'


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