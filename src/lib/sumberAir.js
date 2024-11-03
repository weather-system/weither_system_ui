import axios from 'axios'

export const getSumberAir = async () => {
  const resp = await axios.get('/api/companySumberAir')
  return resp.data
}

export const getSumberAirDetail = async (id) => {
  const resp = await axios.get(`/api/companySumberAir/${id}`)
  return resp.data
}

export const createSumberAir = async (data) => {
  const resp = await axios.post('/api/companySumberAir', data) 
  return resp.data
}

export const updateSumberAir = async (id, data) => {
  const resp = await axios.put(`/api/companySumberAir/${id}`, data)
  return resp.data
}

export const deleteSumberAir = async (id) => {
  const resp = await axios.delete(`/api/companySumberAir/${id}`)
  return resp.data
}
