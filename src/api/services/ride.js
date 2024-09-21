import api from "../middlewares/protected-interceptor";
import CONFIG_KEYS from "../../config";
export const getAllRides = async (endpoint, params) => {
  try {
    const response = await api.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, params);
    if (response) {
      const {
        statusText,
        data: { responseData: responseData },
      } = response;
      if (response?.status === 200) {
        return { data: responseData[0]?.data, metadata: responseData[0]?.metadata };
      }
    }
  } catch (error) { }
};

export const deleteRide = async (endpoint, payload) => {
  try {
    const response = await api.delete(
      `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
      {
        data: payload
      }
    );
    if (response) {
      const { statusText, data: responseData } = response;
      if (statusText === "OK") {
        return responseData;
      }
    }
  } catch (error) { }
};

export const cancelRide = async (endpoint, payload) => {
  try {
    const response = await api.delete(
      `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, {
      data: payload
    }
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
      if (status === 200) {
        return { message: message, bookingId: bookingId };
      }
    }
  } catch (error) {

  }
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

export const unAssignRide = async (endpoint, payload) => {
  try {
    const response = await api.delete(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, {
      data: payload
    });
    if (response) {
      return response;
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

export const interestedDriverList = async (endpoint, params) => {
  try {
    const response = await api.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, params);
    if (response) {
      const {
        statusText,
        status,
        data: { responseData },
      } = response;
      if (status === 200) {
        return {
          data: responseData[0]?.data, rideData:
            responseData[0]?.metadata
        };
      }
    }
  } catch (error) { }
};


export const AssignInterestedDrivers = async (endpoint, data) => {
  try {
    const response = await api.post(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, data);
    if (response) {
      const {
        statusText,
        data: { responseData: responseData, responseCode, message },
      } = response;
      if (responseCode === 200) {
        return responseCode;
      }
    }
  } catch (error) { }
};


export const UpdateFare = async (endpoint, data) => {
  try {
    const response = await api.post(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, data);
    if (response) {
      const {
        statusText,
        data: { responseData: responseData, responseCode, message },
      } = response;
      if (responseCode === 200) {
        return { responseData: responseData, message: message, responseCode: responseCode };
      }
    }
  } catch (error) { }
};

export const getRidesCount = async (endpoint, params) => {
  try {
    const response = await api.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, params);
    if (response) {
      return response;
    }
  } catch (error) { }
};




