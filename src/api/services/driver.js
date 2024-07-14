import api from "../middlewares/protected-interceptor";
import CONFIG_KEYS from "../../config";
export const getDriverList = async (endpoint) => {
    try {
      const response = await api.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`);
      console.log(response , 'response')
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


