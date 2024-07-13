import api from "../middlewares/protected-interceptor";
import CONFIG_KEYS from "../../config";
export const getAllRides = async (endpoint) => {
  try {
    const response = await api.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`);
    if (response) {
      const {
        statusText,
        data: { responseData: responseData },
      } = response;
      console.log(responseData, "responseData");
      if (statusText === "OK") {
        return responseData[0]?.data;
      }
    }
  } catch (error) { }
};

export const deleteRide = async (endpoint, id) => {
  try {
    const response = await api.delete(
      `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${id}`
    );
    if (response) {
      const { statusText, data: responseData } = response;
      if (statusText === "OK") {
        return responseData;
      }
    }
  } catch (error) { }
};

export const cancelRide = async (endpoint, id) => {
  try {
    const response = await api.delete(
      `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${id}`
    );
    if (response) {
      const { statusText, data: responseData } = response;
      if (statusText === "OK") {
        return responseData;
      }
    }
  } catch (error) { }
};


export const createRide = async (endpoint, rideData) => {
  try {
    const response = await api.post(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, rideData);
    if (response) {
      const {
        status,
        data: { message },
      } = response;
      if (status === 200) {
        return message;
      }
    }
  } catch (error) { }
};


export const assignRide = async (endpoint, rideData) => {
  try {
    const response = await api.post(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, rideData);
    if (response) {
      console.log(response , "Response")
      const {
        status,
        data: { message },
      } = response;
      if (status === 200) {
        return message;
      }
    }
  } catch (error) { }
};


