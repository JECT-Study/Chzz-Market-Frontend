import { RefObject } from "react";
import { BsTrash } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";

interface Props {
  fileInputRef: RefObject<HTMLInputElement>;
  deleteImage: () => void;
  setOnMenu: (item: boolean) => void;
}

export const MenuAccordion = ({ fileInputRef, deleteImage, setOnMenu }: Props) => {
  return (
    <div className='absolute left-[-27px] w-52 h-22 bg-white shadow-lg rounded-md z-50 border shadow-slate-200'>
      <div onClick={() => {
        fileInputRef.current?.click();
        setOnMenu(false)
      }} className="flex items-center w-full gap-5 text-gray-700 border-b hover:bg-gray-200">
        <button className='px-4 py-2 ml-4 text-heading3'>
          사진 수정하기
        </button>
        <LuPencil size={20} />
      </div>
      <div onClick={deleteImage} className="flex items-center w-full gap-5 text-red-600 hover:bg-red-100">
        <button className='px-4 py-2 ml-4 text-left text-heading3'>
          사진 삭제하기
        </button>
        <BsTrash size={20} />
      </div>
    </div>
  );
};