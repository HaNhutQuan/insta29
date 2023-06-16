import axios from "axios";

const fetchData = {
  getData: async (url, token) => {
    const res = await axios.get(`/v1/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  },

  postData: async (url, data, token) => {
    const res = await axios.post(`/v1/${url}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res;
  },
  patchData: async (url, data, token) => {
    const res = await axios.patch(`/v1/${url}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  },
  deleteData: async (url, token) => {
    const res = await axios.delete(`/v1/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  },
};

export default fetchData;
