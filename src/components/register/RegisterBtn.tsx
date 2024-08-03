import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const RegisterBtn = ({ isScrolled }: { isScrolled: boolean }) => {
  const navigate = useNavigate();

  return (
    <div className="sticky z-50 flex justify-end w-full cursor-pointer bottom-2 right-2">
      <button
        className={`relative text-center text-white rounded-full bg-cheeseYellow transition-all text-button  duration-500 h-16 p-4 ${
          isScrolled ? 'w-full' : 'w-16'
        }`}
        onClick={() => navigate('/register')}
      >
        <span
          className={`absolute inset-0  flex justify-center items-center transition-opacity duration-500 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        >
          경매 등록하기
        </span>
        <span
          className={`absolute inset-0 flex justify-center items-center transition-opacity duration-500 ${
            isScrolled ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <AiOutlinePlus className="size-10" />
        </span>
      </button>
    </div>
  );
};

export default RegisterBtn;
