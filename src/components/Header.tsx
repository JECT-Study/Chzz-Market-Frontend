import { ReactNode } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  children?: ReactNode;
  path: string;
  handleModal?: () => void;
}

const Header = ({ children, path, handleModal }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-center p-4 border-b bg-white relative">
      <button
        className="text-gray-500 absolute left-2"
        aria-label="뒤로 가기"
        onClick={() => navigate(path)}
      >
        <AiOutlineLeft />
      </button>
      {children && <h1 className="text-lg font-semibold">{children}</h1>}
      {handleModal && (
        <BsThreeDotsVertical
          className="absolute right-2"
          onClick={handleModal}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  children: null,
  handleModal: null,
};

export default Header;
