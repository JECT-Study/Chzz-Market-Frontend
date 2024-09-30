import { ReactNode } from 'react';
import ErrorMessage from '../common/loadingAndError/ErrorMessage';

const RegisterLabel = ({ label, children, error }: { label: string; children: ReactNode; error?: string }) => {
  return (
    <div className='relative flex flex-col gap-2'>
      <label htmlFor={label} className='cursor-pointer text-heading3'>
        {label}
      </label>
      {children}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default RegisterLabel;
