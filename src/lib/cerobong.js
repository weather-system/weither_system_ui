import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()

export const getCerobong = async () => {
  const resp = await axios.get('/api/companyCerobong')
  return resp.data
}

export const getCerobongDetail = async (id) => {
  const resp = await axios.get(`/api/companyCerobong/${id}`)
  return resp.data
}

export const createCerobong = async (data) => {
  const resp = await axios.post('/api/companyCerobong', data) 
  return resp.data
}

export const updateCerobong = async (id, data) => {
  const resp = await axios.put(`/api/companyCerobong/${id}`, data)
  return resp.data
}

export const deleteCerobong = async (id) => {
  const resp = await axios.delete(`/api/companyCerobong/${id}`)
  return resp.data
}

export const getAllCerobong = async () => {
  const route = useRoute(); 
  const companyId = route.query.company_id; 

  try {
    const response = await axios.get(`/api/master/cerobong`, {
      params: {
        company_id: companyId
      }
    })
    console.log('Data cerobong:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data cerobong:', error);
    throw error;
  }
}

