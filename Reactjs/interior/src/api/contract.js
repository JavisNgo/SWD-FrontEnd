import axios from "axios";

export const getContractByRequestId = async (requestId) => {
    try {
        const response = await axios.get(`https://localhost:7233/api/v1/contracts/request/${requestId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateContract = async (contractId, contractData) => {
    try {
        const response = await axios.put(`https://localhost:7233/Contracts/customer/${contractId}`, contractData);
        return response
    } catch (error) {
        throw error
    }
}