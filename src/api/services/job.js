import api from "../middlewares/protected-interceptor";
import CONFIG_KEYS from "../../config";
import showToast from "../../utils/toast";
export const getJob = async (endpoint, params) => {
  try {
    const response = await api.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, params);
    if (response?.data?.responseCode === 200) {
      console.log(response, "RESPSPS")
      showToast(response?.data?.message, 'success')
      return response?.data?.responseData[0];
    } else {
      showToast(response?.data?.message, 'error')
    }
  } catch (error) {
    showToast(error, 'error')
  }
};


export const createJob = async (endpoint, data) => {
  try {
    const response = await api.post(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, data);
    if (response) {
      return response?.data;
    }
  } catch (error) { }
};

export const toggleShortlistStatus = async (endpoint, data) => {
  try {
    const response = await api.post(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, data);
    if (response) {
      if (response?.data?.responseCode === 200) {
        showToast(response?.data?.message, 'success')
      } else {
        showToast(response?.data?.message, 'error')
      }
      return response?.data;
    }
  } catch (error) { 
    showToast(error, 'error')
  }
};




export const deleteJob = async (endpoint, data) => {
  try {
    const response = await api.delete(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, data);
    if (response) {
      return response?.data;
    }
  } catch (error) { }
};


export const allApplicantList = async (endpoint, params) => {
  try {
    const response = await api.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, params);
    if (response?.data?.responseCode === 200) {
      console.log(response, "RESPSPS" , response?.data?.responseData[0])
      showToast(response?.data?.message, 'success')
      return response?.data?.responseData[0];
    } else {
      showToast(response?.data?.message, 'error')
    }
  } catch (error) {
    showToast(error, 'error')
  }
};



