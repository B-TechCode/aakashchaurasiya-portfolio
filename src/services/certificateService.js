import { getPublicCertificates } from "../api/certificateApi";

export const fetchPublicCertificates = async () => {

  const response = await getPublicCertificates();

  return response.data.data;

};