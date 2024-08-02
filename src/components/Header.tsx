import { AiOutlineLeft } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  children?: ReactNode;
  path: string;
  handleModal?: () => void;
}

const Header = ({
  children = null,
  path,
  handleModal = undefined,
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="w-full min-h-[5rem] h-[5rem] px-8 py-4 shadow-bottom">
      <div className="relative flex items-center justify-center w-full h-full">
        <button
          className="absolute left-2"
          aria-label="뒤로 가기"
          onClick={() => navigate(path)}
        >
          <AiOutlineLeft size={25} />
        </button>
        {children && <h1 className="text-heading2">{children}</h1>}
        {handleModal && (
          <button
            aria-label="옵션"
            onClick={handleModal}
            className="absolute right-2"
          >
            <BsThreeDotsVertical size={25} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
