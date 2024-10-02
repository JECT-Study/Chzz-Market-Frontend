// ConfirmationModal.tsx
import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={onCancel}
      ></div>
      <div className='bg-white p-6 rounded-md shadow-md z-10'>
        <p className='mb-4'>{message}</p>
        <div className='flex justify-end'>
          <button
            className='px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded'
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className='px-4 py-2 text-white bg-red-600 rounded'
            onClick={onConfirm}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
