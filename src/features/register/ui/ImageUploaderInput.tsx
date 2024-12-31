import { CustomCarousel, Input } from "@/shared";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDragAndDrop, useImageUploader } from '../lib';

import { AddImageButton } from '.';
import { ImageItem } from "./ImageItem";
import { ImageOverlay } from "./ImageOverlay";

interface ImageUploaderProps {
  images: string[];
  setImages: (value: string[]) => void;
}

export const ImageUploaderInput = ({ images, setImages }: ImageUploaderProps) => {
  const { fileInputRef, deleteImage, handleImage, handleBoxClick, progress, isReading } = useImageUploader(images, setImages);
  const { activeId, handleDragCancel, handleDragEnd, handleDragStart, sensors } = useDragAndDrop(images, setImages);


  return (
    <div className='flex flex-col items-center gap-5 web:flex-row web:h-32'>
      {/* 이미지 추가 버튼 */}
      <AddImageButton handleBoxClick={handleBoxClick} length={images.length} progress={progress} isReading={isReading} />

      {/* dnd kit의 최상위 컨테이너, 센서 지정하고 내부에서 드래그 이벤트 추적 및 콜백 호출 */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragCancel={handleDragCancel}>
        {/* 정렬 가능한 리스트를 감싸는 컴포넌트, 정렬 로직 지정, 내부 아이템이 useSortable 훅 사용하면 정렬 가능 */}
        <SortableContext items={images} strategy={verticalListSortingStrategy}>
          <CustomCarousel contentStyle='py-3' length={images.length}>
            {images.map((image: string, index: number) => (
              <ImageItem key={image} image={image} index={index} deleteImage={deleteImage} />
            ))}
          </CustomCarousel>
        </SortableContext>

        {/* 드래그 중인 아이템을 overlay layer로 띄워서 리스트 구조와 분리 */}
        <DragOverlay>
          {activeId && <ImageOverlay image={activeId} />}
        </DragOverlay>
      </DndContext>

      <Input
        ref={fileInputRef}
        type='file'
        id='사진'
        className='hidden'
        accept='image/jpeg, image/png, image/webp'
        multiple
        onChange={handleImage}
        aria-label='사진 업로드 인풋'
        role='button'
      />
    </div>
  );
};