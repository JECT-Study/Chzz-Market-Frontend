import { ChangeEvent, useRef, useState } from 'react';
import { toast } from 'sonner';
import { compressAndConvertToWebP } from '../utils/compressAndConvertToWebp';
import { convertFileToDataURL } from '../utils/convertFileToDataURL';

export const useImageUploader = (
  state: string[],
  setState: (images: string[]) => void
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [_completedCount, setCompletedCount] = useState(0);

  const addImages = async (newFiles: File[]) => {
    setProgress(0);
    setIsReading(true);
    setCompletedCount(0);
    const totalFiles = newFiles.length;

    const compressedAllFiles = await Promise.all(
      newFiles.map(async (file) => {
        const compressed = await compressAndConvertToWebP(file);
        const dataUrl = await convertFileToDataURL(compressed);

        setCompletedCount((prev) => {
          const newCompletedCount = prev + 1;
          setProgress(Math.round((newCompletedCount / totalFiles) * 100));
          return newCompletedCount;
        });

        return dataUrl;
      })
    );
    setState(Array.from(new Set([...state, ...compressedAllFiles])));
    setProgress(100);
    setIsReading(false);
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const curFiles = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024;
    for (const file of curFiles) {
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
    progress,
    isReading
  };
};
