import CONFIG_KEYS from "../../config";
import authInstanceAxios from "../middlewares/interceptor";
import api from "../middlewares/protected-interceptor";

export const adminLogin = async (
    endpoint,
    adminLoginInfo
  ) => {
    const response = await authInstanceAxios.post(
      `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
      adminLoginInfo
    );
    return response;
  };

  export const adminRegister = async (
    endpoint,
    adminData
  ) => {
    const response = await authInstanceAxios.post(
      `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
      adminData
    );
    return response;
  };
  

  export const adminLogout = async (
    endpoint,
    adminLogout
  ) => {
    const response = await api.post(
      `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
      adminLogout
    );
    return response;
  };