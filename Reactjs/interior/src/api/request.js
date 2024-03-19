import axios from "axios"

export const postRequest = async (request) => {
    try {
        const response = await axios.post('https://localhost:7233/Requests',request);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getRequestByCustomerId = async (customerId) => {
    try {
        const response = await axios.get(`https://localhost:7233/api/v1/requests/customer/${customerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}