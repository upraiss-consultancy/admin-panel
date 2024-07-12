import api from "../middlewares/protected-interceptor";
import CONFIG_KEYS from "../../config";
import authInstanceAxios from "../middlewares/interceptor";
export const getAllRides = async (endpoint) => {
    try {

        const response = await api.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`);
        if (response) {
            const { statusText, data: { responseData: responseData } } = response;
            console.log(responseData, "responseData")
            if (statusText === 'OK') {
                return responseData[0]?.data;
            }
        }
    } catch (error) {

    }
}

export const deleteRide = async (endpoint, id) => {
    try {
        const response = await authInstanceAxios.delete(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${id}`);
        if (response) {
            const { statusText, data: { responseData: responseData } } = response;
            console.log(responseData, "responseData")
            if (statusText === 'OK') {
                return responseData[0]?.data;
            }
        }
    } catch (error) {

    }
}
