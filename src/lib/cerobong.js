import axios from 'axios'

export const getCerobong = async () => {
  const resp = await axios.get('/api/companyCerobong')
}
