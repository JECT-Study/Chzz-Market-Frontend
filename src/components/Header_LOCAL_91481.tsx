import { AiOutlineLeft } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  children?: ReactNode;
  path: string;
  handleModal?: () => void;
}

const Header = ({ children, path, handleModal }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="w-full min-h-[5rem] h-[5rem] px-8 py-4 shadow-bottom">
      <div className="relative flex items-center justify-center w-full h-full">
        <button
          className="absolute left-0"
          aria-label="뒤로 가기"
          onClick={() => navigate(path)}
        >
          <AiOutlineLeft size={25} />
        </button>
        {children && <h1 className="text-heading2">{children}</h1>}
        {handleModal && (
          <BsThreeDotsVertical
            className="absolute right-0"
            onClick={handleModal}
            size={25}
          />
        )}
      </div>
    </header>
  );
};

Header.defaultProps = {
  children: null,
  handleModal: null,
};

export default Header;
