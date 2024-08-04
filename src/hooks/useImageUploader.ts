import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';

export const useImageUploader = (
  state: string[],
  setState: Dispatch<SetStateAction<string[]>>,
  max: number,
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const deleteImage = (target: string) => {
    setState((cur) => cur.filter((img: string) => img !== target));
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (state.length + files.length > max) {
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();

      // 파일을 불러오는 메서드, 종료되는 시점에 readyState는 Done(2)이 되고 onLoad 시작
      reader.readAsDataURL(file);
      reader.onload = (onloadEvent: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2) {
          // 파일 onLoad가 성공하면 2, 진행 중은 1, 실패는 0 반환
          const result = onloadEvent.target?.result;
          if (typeof result === 'string' && !state.includes(result)) {
            setState((cur) => [...cur, result]);
          }
        }
      };
    });
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
