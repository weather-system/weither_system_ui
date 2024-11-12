import axios from 'axios'

export const getUsers = async () => {
  const resp = await axios.get('/api/users')
  return resp.data
}

export const getUserDetail = async (id) => {
  const resp = await axios.get(`/api/users/${id}`)
  return resp.data
}

export const createUser = async (data) => {
  const resp = await axios.post('/api/users', data)
  return resp.data
}

export const updateUser = async (id, data) => {
  const resp = await axios.put(`/api/users/${id}`, data)
  return resp.data
}

export const deleteUser = async (id) => {
  const resp = await axios.delete(`/api/users/${id}`)
  return resp.data
}
