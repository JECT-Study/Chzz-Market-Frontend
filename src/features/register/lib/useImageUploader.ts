import { ChangeEvent, useRef } from 'react';
import { compressAndConvertToWebP, convertFileToDataURL } from '../utils';

import { toast } from 'sonner';

export const useImageUploader = (state: string[], setState: (images: string[]) => void) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImages = async (newFiles: File[]) => {
    const compressedFiles = await Promise.all(newFiles.map((file) => compressAndConvertToWebP(file)));
    const compressedImages = await Promise.all(compressedFiles.map((file) => convertFileToDataURL(file)));

    setState(Array.from(new Set([...state, ...compressedImages])));
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const curFiles = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024;
    for (let file of curFiles) {
      if (file.size > maxSize) {
        toast.error('10MB 이하의 이미지만 가능합니다.');
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
