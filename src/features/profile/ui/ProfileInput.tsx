import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { AiFillExclamationCircle } from 'react-icons/ai';

interface Props {
  title: string;
  placeholder?: string;
  registerProps: UseFormRegisterReturn;
  value?: string;
  error?: FieldError;
}

export const ProfileInput = ({
  title,
  placeholder = '',
  registerProps,
  value,
  error,
}: Props) => {
  return (
    <div className="w-full">
      <p className="text-gray-600">{title}</p>
      <input
        value={value}
        className={`w-full py-2 h-[40px] border-b ${
          error ? 'border-b-2 border-red-500' : 'border-b'
        }`}
        placeholder={placeholder}
        {...registerProps}
      />
      {error && (
        <div className="flex gap-2 mt-2">
          <AiFillExclamationCircle className="text-red-500" />
          <p className="text-red-500 text-sm">필수 입력 항목입니다.</p>
        </div>
      )}
    </div>
  );
};