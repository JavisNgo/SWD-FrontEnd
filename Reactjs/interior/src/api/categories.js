import axios from "axios"

export const getCategories = async () => {
    try {
        const response = await axios.get("https://localhost:7233/api/v1/categories/get");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}