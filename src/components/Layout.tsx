import { ReactNode } from 'react';

interface LayoutProps {
  header: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

const Layout = ({ header, children, footer }: LayoutProps) => {
  return (
    <div className="flex justify-center w-full h-screen">
      <div className="w-[46rem] min-w-[23rem] flex flex-col justify-between h-full border-x border-gray3">
        {header}
        <main className="flex flex-col flex-grow w-full min-h-0 gap-4 px-8 py-4 overflow-y-scroll">
          {children}
        </main>
        {footer && footer}
      </div>
    </div>
  );
};

Layout.defaultProps = {
  footer: null,
};

export default Layout;
