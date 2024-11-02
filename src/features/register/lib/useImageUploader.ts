import { ChangeEvent, useRef } from 'react';
import { toast } from 'sonner';

export const useImageUploader = (state: string[], setState: (images: string[]) => void) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertFileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') resolve(reader.result);
        else reject(new Error('File reading failed!'));
      };
      reader.onerror = () => reject(new Error('File reading failed!'));
    });
  };

  const addImages = async (newFiles: File[]) => {
    try {
      const newImages = await Promise.all(newFiles.map(async (newFile) => convertFileToDataURL(newFile)));
      const imgArr = Array.from(new Set([...state, ...newImages]));
      setState(imgArr);
    } catch (error) {
      throw new Error('Error reading file!');
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const curFiles = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024;
    for (let file of curFiles) {
      if (file.size > maxSize) {
        toast.error('파일 크기는 10MB를 초과할 수 없습니다.');
        return;
      }
    }

    addImages(curFiles);
  };

  const deleteImage = (targetIdx: number) => {
    setState(state.filter((_, idx) => idx !== targetIdx));
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    deleteImage,
    handleImage,
    handleBoxClick,
  };
};
