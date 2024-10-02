// SuccessModal.tsx
import React from 'react';

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black opacity-50' onClick={onClose} />
      <div className='bg-white p-6 rounded-md shadow-md z-10'>
        <p className='mb-4'>{message}</p>
        <div className='flex justify-end'>
          <button
            className='px-4 py-2 text-white bg-blue-600 rounded'
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
