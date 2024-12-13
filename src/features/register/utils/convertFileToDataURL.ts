import { toast } from 'sonner';

export const convertFileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') resolve(reader.result);
      else reject(toast.error('이미지를 읽지 못했습니다.'));
    };
    reader.onerror = () => reject(toast.error('이미지를 읽지 못했습니다.'));
  });
};
