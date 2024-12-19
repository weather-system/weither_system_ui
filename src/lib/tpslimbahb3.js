import axios from "axios";

export const getTpsB3 = async () => {
  const resp = await axios.get("/api/tpslimbahb3");
  return resp.data;
}

export const createTpsLimbahB3 = async (data) => {
  const resp = await axios.post("/api/tpslimbahb3", data);
  return resp.data;
}

export const updateTpsB3 = async (id, data) => {
  const resp = await axios.put(`/api/tpslimbahb3/${id}`, data);
  return resp.data;
}

export const deleteTpsB3 = async (id) => {
  const resp = await axios.delete(`/api/tpslimbahb3/${id}`)
  return resp.data
}
export const getJenisLimbah = async () => {
  const resp = await axios.get("/api/getItemstpsb3");
  return resp.data;
}

export const getTpsB3Detail = async (id) => {
  const resp = await axios.get(`/api/tpslimbahb3/${id}`)
  return resp.data
}

