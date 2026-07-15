import axios from "../api/axios";

export const fetchLatestResume = async () => {
    const response = await axios.get("/public/resume/latest");
    return response.data.data;
};