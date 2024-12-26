import axios from 'axios'

export const validateReferensiBakuMutuDetails = (data) => {
  let error = null
  const regex = /^[0-9\s\-.]+$/; // Regex to match numbers, spaces, '-', and '.'
  if (data.jenis == 'Limbah Integrasi') {
    for (const det of data.details) {
      if (!det.kadar_paling_tinggi || !det.beban_paling_tinggi) {
        error = 'Kadar paling tinggi atau beban paling tinggi harus diisi'
        continue
      }
      if (!regex.test(det.kadar_paling_tinggi) || !regex.test(det.beban_paling_tinggi)) {
        error = 'Kadar paling tinggi atau beban paling tinggi hanya boleh numbers, spaces, \'-\', and \'.\''
        continue
      }
    }
  } else {
    for (const det of data.details) {
      if (det.baku_mutu && !regex.test(det.baku_mutu)) {
        error = 'Baku mutu hanya boleh numbers, spaces, \'-\', and \'.\''
      }
    }
  }
  return error
}

export const getReferensiBakuMutu = async (params) => {
  const resp = await axios.get('/api/referensiBakuMutu', {
    params
  })
  return resp.data
}

export const getReferensiBakuMutuDetail = async id => {
  const resp = await axios.get(`/api/referensiBakuMutu/${id}`)
  return resp.data
}

export const createReferensiBakuMutu = async data => {
  const resp = await axios.post('/api/referensiBakuMutu', data)
  return resp.data
}

export const deleteReferensiBakuMutu = async id => {
  const resp = await axios.delete(`/api/referensiBakuMutu/${id}`)
  return resp.data
}

export const deleteReferensiBakuMutuDetail = async id => {
  const resp = await axios.delete(`/api/referensiBakuMutu/deleteDetail/${id}`)
  return resp.data
}

export const updateReferensiBakuMutu = async (id, data) => {
  const resp = await axios.put(`/api/referensiBakuMutu/${id}`, data)
  return resp.data
}

export const getUniqueParameters = async (params) => {
  const resp = await axios.get('/api/referensiBakuMutu/getUniqueParameters', {
    params
  })
  return resp.data
}
