import axios from "../api/axios";

export const fetchSocialLinks = async () => {
  const response = await axios.get("/public/social-links");
  return response.data.data;
};