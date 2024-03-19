import axios from "axios";

export const getCustomerByUsername = async (username) => {
    try {
        const response = await axios.get(`https://localhost:7233/api/v1/accounts/get/username=${username}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}