import { useState } from 'react';
import { AiFillExclamationCircle } from 'react-icons/ai';

interface Props {
  title: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}

const ProfileInput = ({
  title,
  value,
  placeholder = '',
  required = false,
  onChange,
}: Props) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [isInvalid, setIsInvalid] = useState<boolean | undefined>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (required) {
      setIsInvalid(e.target.value === '');
    }
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="w-full">
      <p className="text-gray-600">{title}</p>
      <input
        className={`w-full py-2 h-[40px] border-b ${isInvalid ? 'border-b-2 border-red-500' : 'border-b'}`}
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
      />
      {isInvalid && (
        <div className="flex gap-2 mt-2">
          <AiFillExclamationCircle className="text-red-500" />
          <p className="text-red-500 text-sm">필수 입력 항목입니다.</p>
        </div>
      )}
    </div>
  );
};

export default ProfileInput;
