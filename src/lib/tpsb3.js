import axios from 'axios'

export const getTpsB3 = async () => {
  const resp = await axios.get('/api/companyTpsB3')
  return resp.data
}

export const getTpsB3Detail = async (id) => {
  const resp = await axios.get(`/api/companyTpsB3/${id}`)
  return resp.data
}

export const createTpsB3 = async (data) => {
  const resp = await axios.post('/api/companyTpsB3', data) 
  return resp.data
}

export const updateTpsB3 = async (id, data) => {
  const resp = await axios.put(`/api/companyTpsB3/${id}`, data)
  return resp.data
}

export const deleteTpsB3 = async (id) => {
  const resp = await axios.delete(`/api/companyTpsB3/${id}`)
  return resp.data
}

export const getAllForAdmin = async (company_id) => {
  try {
    const response = await axios.get('/api/master/TpsB3',{
      params: {
        company_id:company_id
      },
  });
    console.log(response.data); 
    return response.data;  
  } catch (error) {
    console.error("Error fetching data:", error);  
    throw new Error('Error fetching data');
  }
}
