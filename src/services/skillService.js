import { getPublicSkills } from "../api/skillApi";

export const fetchPublicSkills = async () => {
  const response = await getPublicSkills();
  return response.data.data;
};