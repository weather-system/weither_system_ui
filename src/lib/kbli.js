import axios from 'axios'

export const searchKbli = async (query) => {
  const resp = await axios.get('/api/companyKbli/searchKbli', {
    params: {
      query,
    }
  })
  return resp.data
}
