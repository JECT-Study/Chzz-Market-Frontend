import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50">
      <div className="h-full flex justify-center items-end">
        <div className="w-[46rem] min-w-[23rem] h-4/5 bg-white rounded-t-lg shadow-lg p-4 flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
