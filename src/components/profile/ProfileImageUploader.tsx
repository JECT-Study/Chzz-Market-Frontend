import { Dispatch, SetStateAction } from 'react';
import { Input } from '../ui/input';
import { useProfileImageUploader } from '@/hooks/useProfileImageUploader';
import { Button } from '../ui/button';

interface ImageUploaderProps {
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

const ProfileImageUploader = ({ file, setFile, image, setImage }: ImageUploaderProps) => {
  const { fileInputRef, deleteImage, handleImage, handleBoxClick } = useProfileImageUploader(image, setImage, file, setFile);

  return (
    <div className="flex flex-col items-center gap-4">
      {image ? (
        <div className="relative w-40 h-40">
          <img src={image} alt="프로필 사진" className="object-cover w-full h-full rounded-full" />
          <Button
            type='button'
            className="absolute top-[-5%] right-[-5%] bg-red-500 text-white rounded-full p-1 cursor-pointer"
            onClick={deleteImage}
            aria-label="프로필 사진 삭제"
          >
            삭제
          </Button>
        </div>
      ) : (
        <button type='button' className="w-40 h-40 bg-gray-200 rounded-full" onClick={handleBoxClick}>
          프로필 사진 추가
        </button>
      )}
      <Input
        ref={fileInputRef}
        type="file"
        id="사진"
        className="hidden"
        accept="image/*"
        onChange={handleImage} // 다수의 파일을 받지 않음
        aria-label="프로필 사진 업로드 인풋"
        role="button"
      />
    </div>
  );
};

export default ProfileImageUploader;