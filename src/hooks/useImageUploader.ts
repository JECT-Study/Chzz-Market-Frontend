import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';

export const useImageUploader = (
  state: string[],
  setState: (images: string[]) => void,
  files: File[],
  setFiles: Dispatch<SetStateAction<File[]>>,
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertFileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string')
          resolve(reader.result);
        else reject(new Error('File reading failed!'));
      };
      reader.onerror = () => reject(new Error('File reading failed!'));
    });
  };

  const addImages = async (newFiles: File[]) => {
    try {
      const newImages = await Promise.all(
        newFiles.map(async (newFile) => convertFileToDataURL(newFile)),
      );
      const imgArr = Array.from(new Set([...state, ...newImages]));
      const fileArr = Array.from(new Set([...files, ...newFiles]));
      setFiles(fileArr);
      setState(imgArr);
    } catch (error) {
      throw new Error('Error reading file!');
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const curFiles = Array.from(e.target.files);

    addImages(curFiles);
  };

  const deleteImage = (targetIdx: number) => {
    setFiles(files.filter((_, idx) => idx !== targetIdx));
    setState(state.filter((_, idx) => idx !== targetIdx));
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return {
    files,
    fileInputRef,
    deleteImage,
    handleImage,
    handleBoxClick,
  };
};
