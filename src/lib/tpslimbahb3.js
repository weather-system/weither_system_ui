import axios from "axios";

export const getTpsB3 = async () => {
  const response = await axios.get("/api/tpslimbahb3");
  return response.data;
};

export const createTpsLimbahB3 = async (data) => {
  const response = await axios.post("/api/tpslimbahb3", data);
  return response.data;
};

export const updateTpsB3 = async (id, data) => {
  const response = await axios.put(`/api/tpslimbahb3/${id}`, data);
  return response.data;
};

export const deleteTpsB3 = async (id) => {
  const response = await axios.delete(`/api/tpslimbahb3/${id}`);
  return response.data;
};
