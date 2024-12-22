import axios from 'axios'

export const getJenisUsaha = async () => {
  const resp = await axios.get('/api/jenisUsaha')
  return resp.data
}

export const getJenisUsahaDetail = async id => {
  const resp = await axios.get(`/api/jenisUsaha/${id}`)
  return resp.data
}

export const createJenisUsaha = async data => {
  const resp = await axios.post('/api/jenisUsaha', data)
  return resp.data
}

export const updateJenisUsaha = async (id, data) => {
  const resp = await axios.put(`/api/jenisUsaha/${id}`, data)
  return resp.data
}

export const deleteJenisUsaha = async id => {
  const resp = await axios.delete(`/api/jenisUsaha/${id}`)
  return resp.data
}
