import { ChangeEvent, useRef } from 'react';

export const useImageUploader = (
  state: string[],
  setState: (images: string[]) => void,
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

  const addImages = async (files: File[]) => {
    try {
      const newImages = await Promise.all(
        files.map(async (file) => {
          const dataUrl = await convertFileToDataURL(file);
          return state.includes(dataUrl) ? null : dataUrl;
        }),
      );
      const validNewImages = newImages.filter(
        (image): image is string => image !== null,
      );

      setState([...state, ...validNewImages]);
    } catch (error) {
      throw new Error('Error reading file!');
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    addImages(files);
  };

  const deleteImage = (target: string) => {
    setState(state.filter((img: string) => img !== target));
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
