import { ReactNode } from 'react';

function Layout({
  header,
  children,
  footer,
}: {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="max-w-[600px] min-w-[375px] h-[100vh]">
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}

export default Layout;
