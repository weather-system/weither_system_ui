import axios from 'axios'

export const getReferensiBakuMutu = async (params) => {
  const resp = await axios.get('/api/referensiBakuMutu', {
    params
  })
  return resp.data
}

export const getReferensiBakuMutuDetail = async id => {
  const resp = await axios.get(`/api/referensiBakuMutu/${id}`)
  return resp.data
}

export const createReferensiBakuMutu = async data => {
  const resp = await axios.post('/api/referensiBakuMutu', data)
  return resp.data
}

export const deleteReferensiBakuMutu = async id => {
  const resp = await axios.delete(`/api/referensiBakuMutu/${id}`)
  return resp.data
}

export const deleteReferensiBakuMutuDetail = async id => {
  const resp = await axios.delete(`/api/referensiBakuMutu/deleteDetail/${id}`)
  return resp.data
}

export const updateReferensiBakuMutu = async (id, data) => {
  const resp = await axios.put(`/api/referensiBakuMutu/${id}`, data)
  return resp.data
}

export const getUniqueParameters = async (params) => {
  const resp = await axios.get('/api/referensiBakuMutu/getUniqueParameters', {
    params
  })
  return resp.data
}
