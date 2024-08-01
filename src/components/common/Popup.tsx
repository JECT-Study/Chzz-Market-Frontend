import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PopupProps {
  children: ReactNode;
  width?: string;
  height?: string;
}

const Popup = ({ children, width, height }: PopupProps) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div
        className="bg-white p-5 rounded-lg shadow-lg"
        style={{ width, height }}
        onClick={(e) => e.stopPropagation()}
      >
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
