import axios from 'axios'

export const getCompanies = async query => {
  const resp = await axios.get('/api/companies', {
    params: {
      ...query,
    },
  })
  return resp.data
}

export const registerCompany = async data => {
  const resp = await axios.post('/api/company/registerCompany', data)
  return resp.data
}

export const fetchCompanies = async (params) => {
  const response = await axios.get('/api/companies', { params });
  return response.data;
};

export const updateCompanyStatus = async (id, action) => {
  const url = `/api/companies/${id}/${action}`;
  await axios.put(url);
};

export const getMyCompany = async () => {
  const resp = await axios.get('/api/companies/myCompany');
  return resp.data
}
