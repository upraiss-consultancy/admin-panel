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
        data: { message, responseData: { bookingId } },

      } = response;
      console.log(response, "responseMessage")
      if (status === 200) {
        return { message: message, bookingId: bookingId };
      }
    }
  } catch (error) { }
};


export const assignRide = async (endpoint, rideData) => {
  try {
    const response = await api.post(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, rideData);
    if (response) {
      const {
        status,
      } = response;
      if (status === 200) {
        return true;
      }
    }
  } catch (error) { }
};

export const interestedRides = async (endpoint) => {
  try {
    const response = await api.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`);
    if (response) {
      const {
        statusText,
        data: { responseData: responseData },
      } = response;
      if (statusText === "OK") {
        return responseData[0]?.data;
      }
    }
  } catch (error) { }
};


