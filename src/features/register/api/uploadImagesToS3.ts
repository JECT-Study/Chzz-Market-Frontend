import axios from 'axios';

export const uploadImagesToS3 = async (urls: string[], files: File[]) => {
  const uploadPromises = urls.map(async (url, idx) => {
    const file = files[idx];
    const response = await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    return response.status === 200;
  });

  return Promise.all(uploadPromises);
};
