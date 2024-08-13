import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PopupProps {
  children: ReactNode;
  width?: string;
  height?: string;
  title: string;
}

const Popup = ({ children, title, width, height }: PopupProps) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div
        className="bg-white p-5 rounded-lg shadow-lg"
        style={{ width, height }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="w-full mb-5 text-2xl font-bold">{title}</h2>
        {children}
      </div>
    </div>,
    document.getElementById('root')!,
  );
};

Popup.defaultProps = {
  width: '300px',
  height: '210px',
};

export default Popup;
