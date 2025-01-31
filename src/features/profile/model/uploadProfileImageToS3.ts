import axios from 'axios';

export const uploadProfileImageToS3 = async (
  uploadUrl: string,
  file: File | null
) => {
  const response = await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file?.type
    }
  });

  return response.status === 200;
};
