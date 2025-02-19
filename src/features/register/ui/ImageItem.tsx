import DeleteIcon from '@/shared/assets/icons/delete.svg';
import { CarouselItem } from '@/shared/ui/carousel';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ImageItemProps {
  image: string;
  index: number;
  deleteImage: (index: number) => void;
}

export const ImageItem = ({ image, index, deleteImage }: ImageItemProps) => {
  // 이 아이템이 정렬 가능한 항목임을 선언
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image });

  // dnd kit가 계산한 좌표값을 DOM에 적용해 실제 아이템이 마우스를 따라 움직이게 한다.
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'grab'
  };

  return (
    <CarouselItem className="pr-2 basis-1/2 image:basis-1/3" key={image}>
      <div
        className="relative flex items-center justify-center h-32 mx-3 duration-200"
        ref={setNodeRef}
        style={style}
        {...attributes}
      >
        <img
          src={image}
          alt={`상품 사진 ${index}`}
          {...listeners}
          className="relative object-cover w-full h-full"
        />
        {index === 0 && (
          <p className="absolute text-[8px] web:text-xs rounded py-1 px-2 text-white bg-[#454545]/90 top-2 left-1/2 transform -translate-x-1/2">
            대표 사진
          </p>
        )}
        <button
          type="button"
          className="absolute top-[-5%] right-[-5%] cursor-pointer text-black size-6"
          onClick={() => deleteImage(index)}
          aria-label={`사진 삭제_${index}`}
        >
          <img src={DeleteIcon} alt="사진 삭제 버튼" />
        </button>
      </div>
    </CarouselItem>
  );
};
