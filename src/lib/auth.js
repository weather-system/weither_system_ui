import axios from 'axios'

export const login = async data => {
  const resp = await axios.post('/api/login', data)
  localStorage.setItem('TOKEN', resp.data.access_token)
  return resp.data
}

export const me = async () => {
  const resp = await axios.get('/api/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    },
  })
  return resp.data
}

export const logout = async () => {
  const resp = await axios.post('/api/logout')
  localStorage.removeItem('TOKEN')
  return resp.data
}
