import axios from 'axios'


export const createLogbookIpal = async (data) => {
  const resp = await axios.post('/api/logbookipal', data) 
  return resp.data
}
  
export const getLogbookIpal = async () => {
  const resp = await axios.get('/api/logbookipal')
  return resp.data
}

export const getLogbookIpalDetail = async (id) => {
  const resp = await axios.get(`/api/logbookipaldetail/${id}`)
  return resp.data
}

export const updateLogbookIpal = async (id, data) => {
  const resp = await axios.put(`/api/logbookipal/${id}`, data)
  return resp.data
}

export const deleteLogbookIpal = async (id) => {
  const resp = await axios.delete(`/api/logbookipal/${id}`)
  return resp.data
}
