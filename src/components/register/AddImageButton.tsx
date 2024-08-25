import { AiOutlinePlus } from 'react-icons/ai';

const AddImageButton = ({
  handleBoxClick,
  length,
}: {
  handleBoxClick: () => void;
  length: number;
}) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center h-32 border-2 rounded cursor-pointer min-w-32"
      onClick={handleBoxClick}
      aria-label="사진 추가 박스 버튼"
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <AiOutlinePlus
          aria-label="plus icon"
          className="font-bold text-heading2 text-gray2"
        />
        <div className="text-[12px] flex ">
          <p aria-label="현재 사진 숫자" className="text-cheeseYellow">
            {length}
          </p>
          /5
        </div>
      </div>
    </button>
  );
};

export default AddImageButton;
