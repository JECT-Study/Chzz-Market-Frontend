import axios from "axios";

export const uploadProfileImage = async (uploadUrl: string, file: File | null) => {
  try {
    const response = await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};