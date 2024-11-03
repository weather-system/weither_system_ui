import axios from 'axios'

export const getCerobong = async () => {
  const resp = await axios.get('/api/companyCerobong')
  return resp.data
}

export const getCerobongDetail = async (id) => {
  const resp = await axios.get(`/api/companyCerobong/${id}`)
  return resp.data
}

export const createCerobong = async (data) => {
  const resp = await axios.post('/api/companyCerobong', data) 
  return resp.data
}

export const updateCerobong = async (id, data) => {
  const resp = await axios.put(`/api/companyCerobong/${id}`, data)
  return resp.data
}

export const deleteCerobong = async (id) => {
  const resp = await axios.delete(`/api/companyCerobong/${id}`)
  return resp.data
}
