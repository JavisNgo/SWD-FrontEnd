import axios from "axios";

export const getConstructs = async () => {
    try {
        const response = await axios.get("https://localhost:7233/api/v1/constructs/get");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getConstructById = async (constructId) => {
    try {
        const response = await axios.get(`https://localhost:7233/api/v1/constructs/get/id=${constructId}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getConstructsByContractorId = async (contractorId) => {
    try {
        const response = await axios.get(`https://localhost:7233/api/v1/constructs/get/contractorid=${contractorId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}