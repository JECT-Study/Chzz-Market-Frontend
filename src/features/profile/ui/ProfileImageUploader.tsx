import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { Icon } from '@/shared/ui/Icon';
import { MenuAccordion } from '@/shared/ui/MenuAccordion';
import { Input } from '../../../shared/ui/input';
import { useProfileImageUploader } from '../lib';

interface ImageUploaderProps {
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

export const ProfileImageUploader = ({
  file,
  setFile,
  image,
  setImage
}: ImageUploaderProps) => {
  const [onMenu, setOnMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { fileInputRef, deleteImage, handleImage, handleBoxClick } =
    useProfileImageUploader(image, setImage, file, setFile, setOnMenu);

  const onClickImage = () => {
    if (!onMenu) {
      setOnMenu(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOnMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="flex flex-col items-center gap-4">
      {image ? (
        <div
          className="relative w-[5.88rem] h-[5.88rem] web:w-[8.1rem] web:h-[8.1rem] cursor-pointer"
          onClick={onClickImage}
        >
          <img
            src={image}
            alt="프로필 사진"
            className="object-cover w-full h-full rounded-full"
          />
          <Icon name='profile_edit' ariaLabel='프로필 사진 옆 카메라' style='w-[1.87rem] h-[1.87rem] web:w-12 web:h-12 absolute bottom-0 right-0' />
          {onMenu && (
            <div ref={menuRef}>
              <MenuAccordion
                fileInputRef={fileInputRef}
                deleteImage={deleteImage}
                setOnMenu={setOnMenu}
              />
            </div>
          )}
        </div>
      ) : (
        <div
          className="relative w-[5.88rem] h-[5.88rem] web:w-[8.1rem] web:h-[8.1rem] cursor-pointer"
          onClick={handleBoxClick}
        >
          <Icon name='profile' ariaLabel='프로필 사진' style='relative object-cover w-full h-full rounded-full' />
          <Icon name='profile_edit' ariaLabel='프로필 사진 옆 카메라' style='w-[1.87rem] h-[1.87rem] web:w-12 web:h-12 absolute bottom-0 right-0' />
        </div>
      )}
      <Input
        ref={fileInputRef}
        type="file"
        id="사진"
        className="hidden"
        accept="image/jpeg, image/png, image/webp"
        onChange={handleImage} // 다수의 파일을 받지 않음
        aria-label="프로필 사진 업로드 인풋"
        role="button"
      />
    </div>
  );
};
