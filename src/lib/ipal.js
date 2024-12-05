import axios from 'axios'

export const getIpal = async () => {
  const resp = await axios.get('/api/company_ipals')
  return resp.data
}

export const getIpalDetail = async (id) => {
  const resp = await axios.get(`/api/company_ipals/${id}`)
  return resp.data
}

export const createTpsB3 = async (data) => {
  const resp = await axios.post('/api/companyTpsB3', data) 
  return resp.data
}

export const updateIpal = async (id, data) => {
  const resp = await axios.put(`/api/company_ipals/${id}`, data)
  return resp.data
}

export const deleteIpal = async (id) => {
  const resp = await axios.delete(`/api/ipals/${id}`)
  return resp.data
}
