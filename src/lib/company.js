import axios from 'axios'

export const getCompanies = async query => {
  const resp = await axios.get('/api/companies', {
    params: {
      ...query,
    },
  })
  return resp.data
}
export const getCompaniesbylogin = async query => {
  const resp = await axios.get('/api/companiesid', {
    params: {
      ...query,
    },
  })
  return resp.data
}
export const getCompany = async id => {
  const resp = await axios.get(`/api/companies/${id}`)
  return resp.data
}

export const registerCompany = async data => {
  const resp = await axios.post('/api/company/registerCompany', data)
  return resp.data
}

export const fetchCompanies = async params => {
  const response = await axios.get('/api/companies', { params })
  return response.data
}

export const updateCompanyStatus = async (id, action) => {
  const url = `/api/companies/${id}/${action}`
  await axios.put(url)
}

export const getUserStatus = async () => {
  const resp = await axios.get('/api/user/status')
  return resp.data
}

export const getMyCompany = async () => {
  const resp = await axios.get('/api/companies/myCompany')
  return resp.data
}

export const getPertekData = async () => {
  const resp = await axios.get('/api/companies/details/getPertekData')
  return resp.data
}

export const canCreatePemantauan = async () => {
  const resp = await axios.get('/api/companies/canCreatePemantauan')
  return resp.data
}

export const getMasterCompanies = async () => {
  const resp = await axios.get('/api/companies/getMaster')
  return resp.data
}

export const deleteCompany = async (id) => {
  const resp = await axios.delete(`/api/companies/${id}`)
  return resp.data
}

export const updateCompany = async (id, data) => {
  const resp = await axios.put(`/api/company/updateCompany/${id}`, data)
  return resp.data
}

export const getStatusPertek = async () => {
  const resp = await axios.get(`/api/statusespertek`)
  return resp.data
}