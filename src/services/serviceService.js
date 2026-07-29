import { getPublicServices } from "../api/serviceApi";

export const fetchPublicServices = async () => {
  const response = await getPublicServices();

  return response.data.data;
};
