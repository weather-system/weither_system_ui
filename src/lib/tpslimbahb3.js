import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/tps-limbah-b3");
    tpsLimbahB3Data.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
