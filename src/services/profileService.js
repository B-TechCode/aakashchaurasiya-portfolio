import { getPublicProfile } from "../api/profileApi";

export const fetchPublicProfile = async () => {

  const response = await getPublicProfile();

  return response.data.data;

};