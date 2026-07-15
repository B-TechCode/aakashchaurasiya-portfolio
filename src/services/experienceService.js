import { getPublicExperiences } from "../api/experienceApi";

export const fetchPublicExperiences = async () => {
  const response = await getPublicExperiences();
  return response.data.data;
};