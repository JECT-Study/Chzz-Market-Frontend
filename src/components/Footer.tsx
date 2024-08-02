import { ReactNode } from 'react';

const Footer = ({ children }: { children: ReactNode }) => {
  return (
    <footer className="w-full min-h-[4.5rem] h-[4.5rem] px-8 py-4 shadow-top">
      {children}
    </footer>
  );
};

export default Footer;
