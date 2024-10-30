import axios from 'axios'

export const createPencemaranAir = async data => {
  const resp = await axios.post('/api/pencemaranAir', data)
  return resp.data
}

export const getPencemaranAir = async () => {
  const resp = await axios.get('/api/pencemaranAir')
  return resp.data
}
