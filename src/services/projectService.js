import { getPublicProjects } from "../api/projectApi";

export const fetchPublicProjects = async () => {

  const response = await getPublicProjects();

  return response.data.data;

};