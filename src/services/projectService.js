import axios from "../api/axios";

// ==============================
// PUBLIC PROJECTS
// ==============================

export const fetchPublicProjects = async () => {

  const response = await axios.get("/public/projects");

  return response.data.data;

};