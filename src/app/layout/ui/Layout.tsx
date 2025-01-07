import { ReactNode, forwardRef } from 'react';

import BackArrowIcon from '@/shared/assets/icons/back_arrow.svg';
import { useNavigate } from 'react-router';

interface HeaderProps {
  title?: string;
  handleBack?: () => void;
  option?: ReactNode
  children?: ReactNode
}

const Header = ({
  title,
  handleBack,
  option,
  children
}: HeaderProps) => {
  const navigate = useNavigate();
  if (!handleBack) handleBack = () => navigate(-1);

  return (
    <header className='w-full h-[3.375rem] p-4 web:p-8  shadow-bottom'>
      <div className='relative flex items-center justify-center w-full h-full'>
        {title !== '치즈 마켓' && (
          <button
            className='absolute left-0'
            aria-label='뒤로 가기'
            onClick={handleBack}
          >
            <img src={BackArrowIcon} alt='뒤로가기 아이콘' className='size-6' />
          </button>
        )}
        {
          children ? children : <>
            <h2 className='text-heading2 text-gray1'>{title}</h2>
            {option}
          </>
        }

      </div>
    </header>
  );
};

const Main = forwardRef<
  HTMLDivElement,
  { children: ReactNode; style?: React.CSSProperties }
>(({ children, style }, ref) => {
  return (
    <main
      className='relative flex flex-col flex-grow w-full min-h-0 px-5 py-3 overflow-y-scroll web:px-8 web:py-6'
      style={style}
      ref={ref}
    >
      {children}
    </main>
  );
});

Main.displayName = 'Main';

const Footer = ({
  children,
  type,
}: {
  children: ReactNode;
  type: 'single' | 'double';
}) => {
  const style = {
    single: 'w-full h-full',
    double: 'flex items-center justify-center h-full gap-3',
  };

  return (
    <footer className='w-full h-[5rem] min-h-[5rem] px-[30px] py-[16px] shadow-top'>
      <div className={style[type]}>{children}</div>
    </footer>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col justify-center w-full h-full border-x border-gray3'>
      {children}
    </div>
  );
};

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;