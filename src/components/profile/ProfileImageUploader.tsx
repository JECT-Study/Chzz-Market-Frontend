import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { useProfileImageUploader } from '@/hooks/useProfileImageUploader';
import ProfileEdit from '@/assets/icons/profile_edit.svg';
import Profile from '@/assets/icons/profile.svg';
import MenuAccordion from '../common/MenuAccordion';

interface ImageUploaderProps {
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

const ProfileImageUploader = ({ file, setFile, image, setImage }: ImageUploaderProps) => {
  const [onMenu, setOnMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { fileInputRef, deleteImage, handleImage, handleBoxClick } = useProfileImageUploader(image, setImage, file, setFile, setOnMenu);

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
        <div className="relative w-40 h-40 cursor-pointer" onClick={onClickImage}>
          <img src={image} alt="프로필 사진" className="object-cover w-full h-full rounded-full" />
          <img src={ProfileEdit} alt='프로필 사진 옆 카메라' className='w-14 h-14 absolute bottom-0 right-0' />
          {onMenu && 
            <div ref={menuRef}>
              <MenuAccordion fileInputRef={fileInputRef} deleteImage={deleteImage} setOnMenu={setOnMenu} />
            </div>
          }
        </div>
      ) : (
        <div className="relative w-40 h-40 cursor-pointer" onClick={handleBoxClick}>
          <img src={Profile} alt="프로필 사진" className="relative object-cover w-full h-full rounded-full" />
          <img src={ProfileEdit} alt='프로필 사진 옆 카메라' className='w-14 h-14 absolute bottom-0 right-0' />
        </div>
      )}
      <Input
        ref={fileInputRef}
        type="file"
        id="사진"
        className="hidden"
        accept='image/jpeg, image/png, image/webp'
        onChange={handleImage} // 다수의 파일을 받지 않음
        aria-label="프로필 사진 업로드 인풋"
        role="button"
      />
    </div>
  );
};

export default ProfileImageUploader;