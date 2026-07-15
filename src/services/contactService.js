import { sendContactMessage } from "../api/contactApi";

export const submitContactMessage = async (data) => {
  return await sendContactMessage(data);
};