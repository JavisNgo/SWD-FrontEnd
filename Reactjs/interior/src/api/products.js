import axios from "axios"

export const getProductsByContractorId = async ( contractorId ) => {
    try {
        const response = await axios.get(`https://localhost:7233/api/v1/products/get/contractorid=${contractorId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}