import { AiOutlineLeft } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
  handleBack: () => void;
  handleModal?: () => void;
}

const Header = ({
  children = null,
  handleBack,
  handleModal = undefined,
}: HeaderProps) => {
  return (
    <header className="w-full min-h-[3.375rem] h-[3.375rem] px-8 py-4 shadow-bottom">
      <div className="relative flex items-center justify-center w-full h-full">
        {children !== '치즈 마켓' && (
          <button
            className="absolute left-2"
            aria-label="뒤로 가기"
            onClick={handleBack}
          >
            <AiOutlineLeft size={25} />
          </button>
        )}
        {children && <h2 className="text-heading2 text-gray1">{children}</h2>}
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

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col flex-grow w-full min-h-0 px-8 py-4 overflow-y-scroll">
      {children}
    </main>
  );
};

const Footer = ({
  children,
  type,
}: {
  children: ReactNode;
  type: 'single' | 'double' | 'like';
}) => {
  const style = {
    single: 'w-full h-full',
    double: 'flex items-center justify-center h-full gap-3',
    like: 'flex items-center justify-between h-full',
  };

  return (
    <footer className="w-full min-h-[5rem] h-[5rem] px-[1.25rem] py-[1rem] shadow-top">
      <div className={style[type]}>{children}</div>
    </footer>
  );
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center w-full h-screen">
      <div className="w-[46rem] min-w-[23rem] flex flex-col justify-between h-full border-x border-gray3">
        {children}
      </div>
    </div>
  );
};

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;

export default Layout;
