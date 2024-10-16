import { LuPencil } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";
import { RefObject } from "react";

interface Props {
  fileInputRef: RefObject<HTMLInputElement>;
  deleteImage: () => void;
  setOnMenu: (item: boolean) => void;
}

const MenuAccordion = ({ fileInputRef, deleteImage, setOnMenu }: Props) => {
  return (
    <div className='absolute left-[-27px] w-52 h-22 bg-white shadow-lg rounded-md z-50 border shadow-slate-200'>
      <div onClick={() => {
        fileInputRef.current?.click();
        setOnMenu(false)
      }} className="flex items-center gap-5 w-full text-gray-700 hover:bg-gray-200 border-b">
        <button className='px-4 py-2 ml-4 text-lg font-bold'>
          사진 수정하기
        </button>
        <LuPencil size={20} />
      </div>
      <div onClick={deleteImage} className="flex items-center gap-5 w-full text-red-600 hover:bg-red-100">
        <button className='px-4 py-2 ml-4 text-lg text-left font-bold'>
          사진 삭제하기
        </button>  
        <BsTrash size={20} />  
      </div>
    </div>
  );
};

export default MenuAccordion