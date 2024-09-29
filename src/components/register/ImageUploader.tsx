import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useImageUploader } from '@/hooks/useImageUploader';
import DeleteIcon from '@/assets/icons/delete.svg';
import { Dispatch, SetStateAction } from 'react';
import { Input } from '../ui/input';
import AddImageButton from './AddImageButton';

interface ImageUploaderProps {
  images: string[];
  setImages: (value: string[]) => void;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const ImageUploader = ({
  files,
  setFiles,
  images,
  setImages,
}: ImageUploaderProps) => {
  const {
    handleDragStart,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    hoveredIndex,
  } = useDragAndDrop(images, setImages);
  const { fileInputRef, deleteImage, handleImage, handleBoxClick } =
    useImageUploader(images, setImages, files, setFiles);

  return (
    <div className="flex items-center gap-3 overflow-scroll min-h-36">
      <AddImageButton handleBoxClick={handleBoxClick} length={images.length} />
      {images.map((image: string, index: number) => (
        <div
          className={`relative h-32 transition-transform duration-400 min-w-32 w-32 ${
            index === hoveredIndex ? 'transform scale-105' : ''
          }`}
          draggable
          key={image}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => {
            e.preventDefault();
            handleDragOver(e, index);
          }}
          onDragLeave={handleDragLeave}
          onDrop={() => handleDrop(index)}
        >
          <img
            src={image}
            alt={`상품 사진 ${index}`}
            className="object-cover w-full h-full border-2 rounded"
          />
          {index === 0 && (
            <p className="absolute text-xs rounded py-1 px-2 text-white bg-[#454545]/90  top-[10%] left-[2.125rem]">
              대표 사진
            </p>
          )}
          <button
            className="absolute top-[-5%] right-[-5%] cursor-pointer text-black size-6"
            onClick={() => deleteImage(index)}
            aria-label={`사진 삭제 ${index}`}
          >
            <img src={DeleteIcon} alt="사진 삭제 버튼" />
          </button>
        </div>
      ))}
      <Input
        ref={fileInputRef}
        type="file"
        id="사진"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleImage}
        aria-label="사진 업로드 인풋"
        role="button"
      />
    </div>
  );
};

export default ImageUploader;
