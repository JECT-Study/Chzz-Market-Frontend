import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

const Popup = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return createPortal(
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div
        className="w-[46rem] min-w-[23rem] h-full z-40 flex items-center justify-center bg-black/50"
        onClick={onClose}
        aria-label="팝업 배경"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Popup;
