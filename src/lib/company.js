import axios from 'axios'

export const registerCompany = async (data) => {
  const resp = await axios.post('/api/company/registerCompany', data)
  return resp.data
}
