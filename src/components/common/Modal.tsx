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
        <div className="w-[46rem] min-w-[23rem] h-2/4 bg-white rounded-lg shadow-lg">
          <form className="flex justify-end p-2 pr-4">
            <button className="text-2xl" onClick={onClose}>
              X
            </button>
          </form>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
