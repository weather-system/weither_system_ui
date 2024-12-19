import axios from 'axios'

export const getJenisLimbahB3 = async () => {
  const resp = await axios.get('/api/jenisLimbahB3')
  return resp.data
}

export const getJenisLimbahB3Detail = async id => {
  const resp = await axios.get(`/api/jenisLimbahB3/${id}`)
  return resp.data
}

export const createJenisLimbahB3 = async data => {
  const resp = await axios.post('/api/jenisLimbahB3', data)
  return resp.data
}

export const updateJenisLimbahB3 = async (id, data) => {
  const resp = await axios.put(`/api/jenisLimbahB3/${id}`, data)
  return resp.data
}

export const deleteJenisLimbahB3 = async id => {
  const resp = await axios.delete(`/api/jenisLimbahB3/${id}`)
  return resp.data
}
