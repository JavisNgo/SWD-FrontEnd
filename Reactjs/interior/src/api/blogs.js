import axios from "axios";

export const getBlogs = async () => {
    try {
        const response = await axios.get("https://localhost:7233/api/v1/blogs/get");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}