import api from "../middlewares/protected-interceptor";
import CONFIG_KEYS from "../../config";
import showToast from "../../utils/toast";
export const getPaymentRequestList = async (endpoint, params) => {
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

export const paymentRequestAction = async (endpoint, data) => {
    try {
      const response = await api.post(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, data);
      if (response) {
        return response?.data;
      }
    } catch (error) { }
  };
  
  
  export const getTransactionHistoryList = async (endpoint, params) => {
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

  export const getUserPhoneByNumber = async (endpoint, params) => {
    try {
      const response = await api.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, params);
      if (response?.data?.responseCode === 200) {
        showToast(response?.data?.message, 'success')
        return response?.data;
      } else {
        showToast(response?.data?.message, 'error')
      }
    } catch (error) {
      showToast(error, 'error')
    }
  };

  export const createPayment = async (endpoint, data) => {
    try {
      const response = await api.post(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, data);
      if (response) {
        return response?.data;
      }
    } catch (error) { }
  };
  