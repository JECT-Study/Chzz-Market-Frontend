import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import { toast } from 'sonner';

export const useProfileImageUploader = (
  _state: string | null,
  setState: Dispatch<SetStateAction<string | null>>,
  file: File | null,
  setFile: Dispatch<SetStateAction<File | null>>
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertFileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('File reading failed!'));
        }
      };
      reader.onerror = () => reject(new Error('File reading failed!'));
    });
  };

  const addImage = async (newFile: File) => {
    try {
      const newImage = await convertFileToDataURL(newFile);
      setFile(newFile);
      setState(newImage);
    } catch (error) {
      throw new Error('Error reading file!');
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFile = e.target.files[0];

    const maxSize = 10 * 1024 * 1024;
    if (newFile.size > maxSize) {
      toast.error('파일 크기는 10MB를 초과할 수 없습니다.');
      return;
    }

    addImage(newFile);
  };

  const deleteImage = () => {
    setFile(null);
    setState(null);
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return {
    file,
    fileInputRef,
    deleteImage,
    handleImage,
    handleBoxClick,
  };
};
