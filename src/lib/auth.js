import axios from 'axios'
import store from '@/store'

export const login = async data => {
  const resp = await axios.post('/api/login', data)
  localStorage.setItem('TOKEN', resp.data.access_token)
  store.commit('auth/setUser', resp.data)
  return resp.data
}

export const me = async () => {
  const resp = await axios.get('/api/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    },
  })
  store.commit('auth/setUser', resp.data)
  return resp.data
}

export const logout = async () => {
  const resp = await axios.post('/api/logout')
  localStorage.removeItem('TOKEN')
  store.commit('auth/setUser', null)
  return resp.data
}
export const statusCompanies = async () => {
  const response = await fetch('/api/status-companies', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${yourToken}` },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch company status')
  }

  const data = await response.json()
  return data
}
