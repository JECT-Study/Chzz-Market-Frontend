import { AiFillCloseCircle } from 'react-icons/ai';
import { Dispatch, SetStateAction } from 'react';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useImageUploader } from '@/hooks/useImageUploader';
import { Input } from '../ui/input';
import RegisterLabel from './RegisterLabel';

interface ImageUploaderProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}

const ImageUploader = ({ images, setImages }: ImageUploaderProps) => {
  const {
    handleDragStart,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    hoveredIndex,
  } = useDragAndDrop(images, setImages);
  const { fileInputRef, deleteImage, handleImage, handleBoxClick } =
    useImageUploader(images, setImages, 5);

  return (
    <RegisterLabel title="사진">
      <div className="flex items-center gap-3 overflow-scroll min-h-36">
        <button
          className="flex items-center justify-center h-32 border-2 rounded cursor-pointer min-w-32"
          onClick={handleBoxClick}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray2 font-bold text-[20px]">+</div>
            <div className="text-[12px]">
              <span className="text-cheeseYellow">{images.length}</span>
              /5
            </div>
          </div>
        </button>
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
            <AiFillCloseCircle
              className="absolute top-[-5%] right-[-5%] cursor-pointer text-black"
              size={25}
              onClick={() => deleteImage(image)}
            />
          </div>
        ))}
      </div>
      <Input
        ref={fileInputRef}
        type="file"
        id="사진"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleImage}
      />
    </RegisterLabel>
  );
};

export default ImageUploader;
