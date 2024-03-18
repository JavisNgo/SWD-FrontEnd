import axios from "axios"

export const getContractorById = async (contractorId) => {
    try {
        const response = await axios.get(`https://localhost:7233/api/v1/contractors/id=${contractorId}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getContractors = async () => {
    try {
        const response = await axios.get(`https://localhost:7233/api/v1/contractors`)
        return response.data;
    } catch (error) {
        throw error;
    }
}