import { AiOutlinePlus } from 'react-icons/ai';

interface AddImageButtonProps {
  handleBoxClick: () => void;
  length: number;
}

export const AddImageButton = ({ handleBoxClick, length }: AddImageButtonProps) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-full h-32 border-2 rounded cursor-pointer web:w-32"
      onClick={handleBoxClick}
      aria-label="사진 추가 박스 버튼"
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <AiOutlinePlus
          aria-label="plus icon"
          className=" text-gray2 text-heading2 web:text-heading3"
        />
        <div className="text-body1 web:text-[.75rem] flex">
          <p aria-label="현재 사진 숫자" className="text-cheeseYellow">
            {length}
          </p>
          /5
        </div>
      </div>
    </button>
  );
};