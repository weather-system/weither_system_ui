import axios from 'axios'

export const getCompanies = async (query) => {
  const resp = await axios.get('/api/companies', {
    params: {
      ...query
    }
  })
  return resp.data
}

export const registerCompany = async (data) => {
  const resp = await axios.post('/api/company/registerCompany', data)
  return resp.data
}
